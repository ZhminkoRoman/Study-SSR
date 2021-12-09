import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import { StaticRouter } from 'react-router';
import express from 'express';
import App from '../client/components/App';

import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     const app = ReactDOMServer.renderToString(<App />);
//     const indexFile = path.resolve('./build/index.html');
  
//     fs.readFile(indexFile, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Something went wrong:', err);
//         return res.status(500).send('Oops, better luck next time!');
//       }
  
//       return res.send(
//         data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
//       );
//     });
// });

// app.use(express.static('./build'));

app.get('/', (req, res) => {
    const app  = ReactDOMServer.renderToString(
        <App />
    );
    
    const clientBundleStyle = `<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">`;
    const clientBundleScript = `<script src="http://localhost:8080/scripts/bundle.js"></script>`;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My SSR App</title>
                ${clientBundleStyle}
            </head>
            <body>
                <div id='ssr-app'>${app}</div>
                ${clientBundleScript}
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});