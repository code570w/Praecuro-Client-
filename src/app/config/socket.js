import socketIOClient from "socket.io-client";
// const PORT = 5000;
const PORT = 4000;
const SERVER = 'localhost';
const socket = socketIOClient(`http://${SERVER}:${PORT}`);
export default socket;