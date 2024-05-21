import mongoose from 'mongoose';
import WebSocket from 'ws';

const MONGO_URI = process.env.MONGO_URI;

export const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log('Already Connected to Database');
        return;
    }
    if (connectionState === 2) {
        console.log('Connecting...');
        return;
    }
    try {
        await mongoose.connect(MONGO_URI!, {
            dbName: 'Ticket'
        });
        console.log('Connected to Database');

        mongoose.connection.on('connected', () => {
            console.log('Mongoose Connected to DB');
        });
        mongoose.connection.on('error', (err) => {
            console.log('Mongoose Connection error', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from DB');
        });

        // Create a WebSocket server
        const wss = new WebSocket.Server({ port: 8080 });

        wss.on('connection', (ws) => {
            console.log('WebSocket connected');

            ws.on('message', (message) => {
                console.log('Received message:', message);
                // Handle WebSocket message
            });

            ws.on('close', () => {
                console.log('WebSocket closed');
            });
        });

    } catch (error) {
        console.log('Error occurred while connecting to Database', error);
        throw new Error('Error occurred while connecting to Database');
    }
};
