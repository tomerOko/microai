// socketServer.ts
import WebSocket, { Server } from 'ws';
import jwt from 'jsonwebtoken';

import {
  addUserConnection,
  handleClientConnection,
  handleClientDisconnection,
  removeUserConnection,
} from './service';
import { functionWrapper } from 'common-lib-tomeroko3';

const wss = new Server({ port: 8080 });

wss.on('connection', (ws: WebSocket, req) => {
  functionWrapper(async () => {
    const token = getTokenFromRequest(req);
    if (!token) {
      ws.close(1008, 'Unauthorized');
      return;
    }

    let userID: string;
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userID: string };
      userID = payload.userID;
    } catch (err) {
      ws.close(1008, 'Unauthorized');
      return;
    }

    addUserConnection(userID, ws);
    await handleClientConnection(userID);

    ws.on('close', async () => {
      removeUserConnection(userID);
      await handleClientDisconnection(userID);
    });

    ws.on('message', (message) => {
      handleClientMessage(userID, message);
    });
  });
});

function getTokenFromRequest(req): string | null {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');
  if (token) {
    return token;
  }
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

function handleClientMessage(userID: string, message: WebSocket.Data) {
  console.log(`Received message from user ${userID}: ${message}`);
  // Process client messages if needed
}
