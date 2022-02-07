import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import express from 'express';
import App from '../client/app';

import path from 'path';
import fs from 'fs';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import PageRoutes from '../src/routes';

import {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
	getAllUsers
} from './users';

import {
	addRoom,
	deleteRoom,
	getRoom,
	getRooms
} from './rooms';

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${port}`,
		credentials: true
  }
});

const HTML = (req, context) => {
	const body = renderToString(
		<StaticRouter location={req.url} context={context}>
			<App/>
		</StaticRouter>
	);

	const clientBundleStyle = `<link rel="stylesheet" href="http://localhost:3001/styles/bundle.css">`;
	const clientBundleScript = `<script type="text/javascript" src="http://localhost:3001/scripts/bundle.js"></script>`;

	return (`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv='X-UA-Compatible' content='ie=edge'>
				<title>My SSR App</title>
				<meta name='description' content='Socket.io chat'>
				${clientBundleStyle}
			</head>
			<body>
				<div id='ssr-app'>${body}</div>
				${clientBundleScript}
			</body>
		</html>
	`);
};

const context = {};

app.use(express.static('../build/server'));

PageRoutes.forEach(route => {
	app.get(route.url, (req, res) => {
		return res.send(HTML(req, context));
	});
});

app.get('*', (req, res) => {
	return res.send(HTML({ url: '/404' }, context));
});

io.on('connection', (socket) => {
	socket.on('create-user', ({ name, room }) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) {
			return error;
		}
		// const users = getAllUsers();
		const rooms = getRooms();
		io.emit('take-rooms', rooms);
	});

  socket.on('join-room', ({ name, room }) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) {
			return error;
		}

		socket.join(user.room);
		socket.emit('notification', {
			user: 'Admin',
			text: `${user.name.toUpperCase()}, Welcome to ${user.room} room.`
		});
		socket.broadcast.to(user.room).emit('notification', {
			user: 'Admin',
			text: `${user.name.toUpperCase()} has joined!`
		});
		socket.to(user.room).emit('room', {
			room: user.room,
			users: getUsersInRoom(user.room)
		});
  });

	socket.on('create-room', ({ name, room }) => {
		addRoom({ id: socket.id, name, room });
		const rooms = getRooms();
		io.emit('take-rooms', rooms);
	})

  socket.on('send-message', (data) => {
		socket.to(data.room).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

		if (user) {
			socket.to(user.room).emit('receive-message', {
				user: 'Admin',
				text: `${user.name} has left.`
			});
			socket.to(user.room).emit('room', {
				room: user.room,
				users: getUsersInRoom(user.room)
			});
		}
  });
});

server.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});