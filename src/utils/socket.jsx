import { io } from 'socket.io-client'

const spaceSocket = io('http://127.0.0.1:5000', {autoConnect: false});

export default spaceSocket;


