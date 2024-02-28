import { io } from 'socket.io-client';

const socket = io('wss://cdn-route.crophub.in');
// socket.connect().then(() => {
//     console.log('Socket Connected in Utilities');
// });
export default socket;
