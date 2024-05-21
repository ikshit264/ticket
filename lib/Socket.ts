import express from 'express';
import {WebSocketServer} from 'ws';
import http from 'http';

const server = http.createServer();
const wsServer = new WebSocketServer({server})