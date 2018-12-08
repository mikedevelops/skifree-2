import * as React from 'react';
import RegisterPlayer from '../Player/RegisterPlayer';
import { IMessageResponse } from '../../server';
import { IGameConfig } from '../../../config/game.config';
import { IVector2 } from '../../Server/Entities/Player';
import Socket = SocketIOClient.Socket;

interface ILobbyProps {
    socket: Socket;
    startGame: (username: string, players: ILobbyPlayerCollection) => void;
    config: IGameConfig;
}

export interface ILobbyPlayerCollection {
    [index: string]: IPlayer;
}

interface ILobbyState {
    players: ILobbyPlayerCollection;
    connected: boolean;
    ready: boolean;
}

export interface IPlayer {
    id: string;
    username: string;
    ready: boolean;
    position?: IVector2;
}

interface ILobby {
    players: ILobbyPlayerCollection;
}

export default class Lobby extends React.Component<ILobbyProps, ILobbyState> {
    private username: string;
    private ready: boolean = false;

    constructor (props: ILobbyProps) {
        super(props);

        props.socket.on('connect', this.handleConnection.bind(this));
        props.socket.on('lobby:addPlayer', this.updateLobby.bind(this));
        props.socket.on('lobby:removePlayer', this.updateLobby.bind(this));
        props.socket.on('lobby:playerReady', this.updateLobby.bind(this));

        this.state = {
            players: {},
            connected: false,
            ready: false
        };
    }

    public componentWillUnmount () {
        console.log('removing socket listeners');
        this.props.socket.removeAllListeners();
    }

    public render () {
        const status = { color: this.state.connected ? 'green' : 'red' };

        return (
            <div>
                <pre><span style={status}>● </span>Players</pre>
                <ul>
                    { Object.keys(this.state.players)
                        .sort(this.sortPlayers.bind(this))
                        .map(this.renderPlayer.bind(this)) }
                </ul>

                { this.renderAction() }
            </div>
        );
    }

    private renderAction (): JSX.Element {
        if (this.username === undefined) {
            return <RegisterPlayer submit={this.handleNewPlayer.bind(this)}/>;
        }

        if (!this.ready) {
            return <button onClick={this.handlePlayerReady.bind(this)}>Ready!</button>;
        }

        if (!this.state.ready) {
            return <button disabled={true}>Waiting for players...</button>;
        }

        return null;
    }

    private sortPlayers (id: string): number {
        const player: IPlayer = this.state.players[id];

        if (this.username === undefined) {
            return 0;
        }

        if (player.username === this.username) {
            return -1;
        }

        return 0;
    }

    private renderPlayer (id: string) {
        const player: IPlayer = this.state.players[id];
        const style = {
            fontWeight: this.username !== undefined && this.username === player.username ? 700 : 400,
            color: player.ready ? 'green' : 'black'
        };

        return <li style={style} key={player.username}>
            { player.ready && '✔ ' }
            { player.username }
        </li>;
    }

    private handleConnection (): void {
        this.props.socket.emit('lobby:getAll', (response: IMessageResponse) => {
            this.updateLobby(response.payload);
        });
    }

    private updateLobby (players: ILobbyPlayerCollection): void {
        // If we have more than 1 player and they are all ready
        let ready: boolean = Object.keys(players).length >= this.props.config.MIN_PLAYERS;

        for (const id in players) {
            if (!players[id].ready) {
                ready = false;
            }
        }

        if (ready) {
            this.props.startGame(this.username, this.state.players);
            return;
        }

        this.setState((state) => Object.assign({}, state, {
            players: players,
            connected: true
        }));
    }

    private handleNewPlayer (username: string): void {
        this.props.socket.emit('lobby:addPlayer', username, (response: IMessageResponse) => {
            if (response.error) {
                // TODO: UI error
                throw new Error(response.message);
            }

            this.username = username;
            this.updateLobby(response.payload);
        });
    }

    private handlePlayerReady (): void {
        this.ready = true;
        this.props.socket.emit('lobby:playerReady', (response: IMessageResponse) => {
            this.updateLobby(response.payload);
        });
    }
}
