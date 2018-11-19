import 'p2';
import 'pixi';
import 'phaser';
import * as React from 'react';
import Lobby, { ILobbyPlayerCollection } from '../Lobby/Lobby';
import Game from '../../Game';
import config from '../../../config/game.config';

interface IGameProps {
    socket: SocketIOClient.Socket;
    game: Game;
}

interface IGameState {
    start: boolean;
}

export default class GameComponent extends React.Component<IGameProps, IGameState> {
    constructor (props: IGameProps) {
        super(props);

        this.state = {
            start: false
        };
    }

    public render () {
        return this.state.start ?
            <pre>game</pre> :
            <Lobby
                socket={this.props.socket}
                config={config}
                startGame={this.handleStartGame.bind(this)}/>;
    }

    private handleStartGame (players: ILobbyPlayerCollection): void {
        this.props.game.start(this.props.socket.id, players, this.props.socket);
        this.setState({
            start: true
        });
    }
}
