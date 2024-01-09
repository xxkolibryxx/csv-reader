import { WebSocketServer } from 'ws';
import fetch from 'node-fetch';
import csv from 'csv-parser';
import highland from 'highland';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
	ws.on('message', async (message) => {
		try {
			const fileUrl = message.toString();

			const response = await fetch(fileUrl);
			if (!response.ok) {
				throw new Error('Ошибка загрузки файла. Пожалуйста, проверьте URL.');
			}

			const data = [];
			highland(response.body)
				.through(csv())
				.map((row) => {
					const modifiedRow = Object.keys(row).reduce((acc, key) => {
						acc[key] = row[key].toUpperCase();
						return acc;
					}, {});
					data.push(modifiedRow);
				})
				.collect()
				.toCallback((err) => {
					if (err) {
						throw new Error('Ошибка обработки файла.');
					}

					const lineCount = data.length;

					const result = {
						lineCount: lineCount,
						data: data,
					};

					ws.send(JSON.stringify(result));
				});
		} catch (error) {
			ws.send(JSON.stringify({ error: error.message }));
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
