Note on Business Logic:

WebSocket Connections: The socketServer.ts file sets up a WebSocket server that authenticates clients upon connection. It uses JWT tokens to identify users and manages their connections using a Map. This allows us to efficiently send messages to connected clients.

Event Handling: The service listens to various events (SOCKET_MESSAGE, MESSAGE_SENT, NOTIFICATION_DISPATCHED, USER_CREATED, USER_UPDATED) and handles them in consumers.ts. It delivers messages and notifications to clients in real-time and updates user statuses.

User Presence: When a client connects or disconnects, the service updates the user's status in the database and publishes USER_ONLINE and USER_OFFLINE events. This allows other services to be aware of user presence.

Message Delivery: Messages and notifications are sent to clients via WebSocket. After successful delivery, the service publishes a MESSAGE_DELIVERED event.

Database: The service uses a MongoDB collection to store user information, including their online/offline status. This information can be retrieved via the /online-users endpoint.