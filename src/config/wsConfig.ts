import WebSocket, {WebSocketServer} from 'ws';


const socketConfig = (wss: WebSocketServer) => {

    wss.on('connection', (ws: WebSocket)=> {
        console.log('socket connected.');
        ws.on('message', (message: string)=> {
            console.log(`Received: ${message}`);
        })
        ws.on('close', ()=> {
            console.log('Socket disconnected.')
        })

    })

}

export default socketConfig; 

