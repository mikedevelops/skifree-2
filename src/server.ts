import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import { Server } from 'http';
import * as socketIo from 'socket.io';
import { Socket } from 'socket.io';
import LobbyService, { IPlayerCollection } from './Server/Services/LobbyService';
import DuplicateUsernameException from './Exceptions/DuplicateUsernameException';
import { ITransformedAgent } from './Agents/AbstractAgent';
import PlayerManager from './Server/Managers/PlayerManager';
import Player from './Server/Entities/Player';

const app = express();

const http = new Server(app);
const port = 8123;
const io = socketIo(http);
const lobby = new LobbyService();
const playerManager = new PlayerManager();

function range (min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export interface IMessageResponse {
    error: boolean;
    payload: any;
    message?: string;
}

export interface IUpdate {
    entities: ITransformedAgent[];
}

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

io.on('connection', (socket: Socket) => {
    console.log(`Connected "${socket.id}"`);

    socket.on('lobby:getAll', (done) => {
        done({ error: false, payload: lobby.getAllPlayers() });
    });

    socket.on('lobby:addPlayer', (username: string, done) => {
        try {
            lobby.addPlayer(username, socket.id);
        } catch (error) {
            if (error instanceof DuplicateUsernameException) {
                return done({ error: true, message: error.message });
            }

            throw error;
        }

        done({ error: false, payload: lobby.getAllPlayers() });
        socket.broadcast.emit('lobby:addPlayer', lobby.getAllPlayers());
    });

    socket.on('lobby:playerReady', (done) => {
        lobby.setPlayerReady(socket.id);

        done({ error: false, payload: lobby.getAllPlayers() });
        socket.broadcast.emit('lobby:playerReady', lobby.getAllPlayers());
    });

    socket.on('game:playerCreated', (width, height, done) => {
        const position = {
            x: range(0, width),
            y: range(0, height)
        };
        const player: Player = lobby.getPlayerById(socket.id);

        console.log('set player position: ', socket.id, position.x, position.y);
        player.setPosition(position);
        done({ error: false, payload: { player: player }});

        let playersPositioned: boolean = true;
        const players: IPlayerCollection = lobby.getAllPlayers();

        Object.keys(players).forEach((id: string) => {
            if (players[id].getPosition() === undefined) {
                playersPositioned = false;
            }
        });

        if (playersPositioned) {
            console.log('players loaded & positioned');
            io.emit('game:playersLoaded', lobby.getAllPlayers());
        }
    });

    socket.on('game:update', (update: IUpdate) => {
        update.entities.forEach((e) => console.log('updating: ', e.id, e.position));
        socket.broadcast.emit('game:update', update);
    });

    socket.on('disconnect', () => {
        lobby.removePlayer(socket.id);
        socket.broadcast.emit('lobby:removePlayer', lobby.getAllPlayers());
    });
});

http.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
