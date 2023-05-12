import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*'
            }
        });
        
    this.io.use((socket, next) => {
        const token = socket.handshake.auth.token; // 보이지않게 감춘다 토큰을, 감춰갖고 토큰을 보낸다 따로 보내면 이거 중요한 값인데 보일수밖에 없어서
        if(!token){
            return next(new Error('Authenticaiton Error'));
        }
        jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
            if(error){
                return next(new Error('Authentication Error'));
            }
            next();
        });
        });

        this.io.on('connection', (socket) => { console.log('Socket Client connected');
    });
    }
}

let socket;
export function initSocket(server){
    if(!socket){
        socket = new Socket(server);
    }
}

export function getSocketIO(server){
    if(!socket){
        throw new Error('init를 먼저 호출해주세요!');
    }
    return socket.io;
}