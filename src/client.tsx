// import 'p2';
// import 'pixi';
// import 'phaser';
// import config from '../config/game.config';
// import Yeti from './Agents/Yeti';
// import YetiMovementManager from './StateManagers/YetiMovementManager';
// import StateStack from './State/StateStack';
// import FollowingState from './State/FollowingState';
// import '../assets/yeti/yeti';
// import '../assets/skier/skier';
// import Animator from './Services/Animator';
// import { default as SkierFactory } from './Factories/SkierFactory';
// import EntityPool from './Pools/EntityPool';
// import Skier from './Agents/Skier';
// import AbstractEntityFactory from './Factories/AbstractEntityFactory';
// import GameComponent from './GameComponent';
// import SpeedBar from './UI/SpeedBar';
// import Score from './UI/Score';
//
// const GAME = new GameComponent(config, { preload: preload, create: create, update: update});
//

import * as React from 'react';
import { render } from 'react-dom';
import * as io from 'socket.io-client';
import GameComponent from './Components/Game/GameComponent';
import Game from './Game';
import config from '../config/game.config';

const socket = io();
const game = new Game(config);

render(
    <GameComponent socket={socket} game={game}/>,
    document.getElementById('lobby')
);
