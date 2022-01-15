import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import express from 'express';
import App from '../client/app';

import Routes from '../src/routes';

import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

const HTML = (req, context) => {
	const body = renderToString(
		<Router location={req.url} context={context}>
			<App/>
		</Router>
	);

	const clientBundleStyle = `<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">`;
	const clientBundleScript = `<script src="http://localhost:8080/scripts/bundle.js"></script>`;

	return (`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>My SSR App</title>
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

app.get('*', (req, res) => {
	return res.send(HTML({ url: '/404' }, context));
});

Routes.forEach(route => {
	console.log('6', route);
	app.get(route.url, (req, res) => {
		console.log('7', req, res);
		return res.send(HTML(req, context));
	});
});

console.log('8');

app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});