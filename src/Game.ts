import 'p2';
import 'pixi';
import 'phaser';
import '../assets/yeti/yeti.png';
import '../assets/skier/skier.png';

import EntityPool from './Pools/EntityPool';
import { IGameConfig } from '../config/game.config';
import YetiFactory from './Factories/YetiFactory';
import { ILobbyPlayerCollection, IPlayer } from './Components/Lobby/Lobby';
import Network from './Services/Network';
import IEntity from './Entities/IEntity';
import Player from './Server/Entities/Player';
import { IMessageResponse } from './server';
import Yeti from './Agents/Yeti';

// let entities: {
//     YETI: Yeti;
// };
// let factories: {
//     [index: string]: AbstractEntityFactory;
// };
// let ui: {
//     SPEED_BAR: SpeedBar,
//     SCORE: Score
// };
//
// function create () {
//     entities = {
//         YETI: new Yeti(
//             new YetiMovementManager(
//                 new StateStack(5)
//             ),
//             new FollowingState(),
//             new Phaser.Sprite(GAME, 0, 0, 'yeti_run'),
//             GAME,
//             new Animator(config.FPS),
//             config.YETI.SPEED,
//             config.YETI.SPEED_FALLOFF,
//             config.YETI.MAX_SPEED
//         )
//     };
//
//     factories = {
//         SKIER: new SkierFactory()
//     };
//
//     ui = {
//         SPEED_BAR: new SpeedBar(GAME, entities.YETI, config.UI.SPEED_BAR.WIDTH),
//         SCORE: new Score(GAME, entities.YETI)
//     };
//
//     // Pools
//     GAME.skierEntityPool = new EntityPool(GAME, factories.SKIER, 10);
//     GAME.skierEntityPool.init();
//
//     // Setup entities
//     entities.YETI.init();
//     ui.SPEED_BAR.init();
//     ui.SCORE.init();
//
//     for (let s: number = 0; s < GAME.skierEntityPool.getSize(); s++) {
//         const skier = GAME.skierEntityPool.getAll()[s] as Skier;
//         skier.init();
//     }
// }
//
// function update () {
//     GAME.time.fps = 12;
//
//     entities.YETI.update();
//     ui.SPEED_BAR.update();
//     ui.SCORE.update();
//
//     for (let s: number = 0; s < GAME.skierEntityPool.getSize(); s++) {
//         const skier = GAME.skierEntityPool.getAll()[s] as Skier;
//         skier.update();
//     }
// }

export default class Game {
    public phaser: Phaser.Game;
    private active: boolean = false;
    private network: Network;
    private frame: number = 0;
    private username: string;
    private player: Yeti;
    private players: ILobbyPlayerCollection;
    private socket: SocketIOClient.Socket;
    private loaded: boolean = false;

    private yetis: EntityPool;

    constructor (
        private config: IGameConfig
    ) {}

    public start (username: string, players: ILobbyPlayerCollection, socket: SocketIOClient.Socket) {
        this.active = true;
        this.socket = socket;
        this.players = players;
        this.username = username;
        this.yetis = new EntityPool(this, socket, new YetiFactory(), Object.keys(players).length);
        this.phaser = new Phaser.Game(
            this.config.WIDTH,
            this.config.HEIGHT,
            Phaser.AUTO,
            'Skifree 2: Return of the Yeti',
            {
                preload: this.preload.bind(this),
                create: this.create.bind(this),
                update: this.update.bind(this)
            }
        );
    }

    private preload () {
        this.phaser.load.spritesheet('yeti_run', 'yeti.png', 32, 43);
        this.phaser.load.spritesheet('skier_ski', 'skier.png', 24, 34);
        this.phaser.stage.backgroundColor = 0xffffff;
        this.phaser.antialias = false;
        this.phaser.physics.startSystem(Phaser.Physics.ARCADE);
    }

    private create () {
        this.player = this.yetis.create(this.socket.id) as Yeti;
        this.player.setUsername(this.username);
        this.socket.emit('game:playerCreated', this.config.WIDTH, this.config.HEIGHT, (response: IMessageResponse) => {
            const player = response.payload.player as IPlayer;
            const point: Phaser.Point = new Phaser.Point(player.position.x, player.position.y);
            this.player.updatePosition(point);
        });

        this.socket.on('game:playersLoaded', (players: ILobbyPlayerCollection) => {
            Object.keys(players)
                .filter((p) => p !== this.player.getId())
                .forEach((id: string) => {
                    const yeti: Yeti = this.yetis.create(id) as Yeti;

                    yeti.updatePosition(new Phaser.Point(
                        players[id].position.x, players[id].position.y));
                    yeti.setUsername(players[id].username);
                });

            this.network = new Network(this.socket, this.player, this.yetis);
            this.loaded = true;
        });

        // this.socket.on('game:playersLoaded', (players: ) => {
        //     this.loaded = true;
        // });

        // this.yetis.create().then(() => {
        //     const otherPlayers: Array<Promise<void>> = [];
        //
        //     this.network = new Network(this.socket, this.playerId, [this.yetis]);
        //     this.socket.on('game:playersLoaded', (players: string[]) => {
        //         players.filter((e) => e !== this.playerId).forEach(() => {
        //             otherPlayers.push(this.yetis.create());
        //         });
        //
        //         Promise.all(otherPlayers).then(() => {
        //             this.network.init();
        //             this.loaded = true;
        //         });
        //     });
        // });

        // TODO: test with 2 real clients, RAF stopping is an issue

        // for (let p = 0; p < this.players.length - 1; p++) {
        //     this.yetis.create();
        // }
//
//     factories = {
//         SKIER: new SkierFactory()
//     };
//
//     ui = {
//         SPEED_BAR: new SpeedBar(GAME, entities.YETI, config.UI.SPEED_BAR.WIDTH),
//         SCORE: new Score(GAME, entities.YETI)
//     };
//
//     // Pools
//     GAME.skierEntityPool = new EntityPool(GAME, factories.SKIER, 10);
//     GAME.skierEntityPool.init();
//
//     // Setup entities
//     entities.YETI.init();
//     ui.SPEED_BAR.init();
//     ui.SCORE.init();
//
//     for (let s: number = 0; s < GAME.skierEntityPool.getSize(); s++) {
//         const skier = GAME.skierEntityPool.getAll()[s] as Skier;
//         skier.init();
//     }
//
    }

    private update () {
        if (!this.loaded) {
            return;
        }

        this.phaser.time.fps = 12;
        this.player.inputController.update(new Phaser.Point(
            this.phaser.input.activePointer.x, this.phaser.input.activePointer.y));
        this.player.update();

        // 30fps update
        if (this.frame === 0 || this.frame % 2 === 0) {
            this.network.update();
        }

        this.frame++;
//
//     entities.YETI.update();
//     ui.SPEED_BAR.update();
//     ui.SCORE.update();
//
//     for (let s: number = 0; s < GAME.skierEntityPool.getSize(); s++) {
//         const skier = GAME.skierEntityPool.getAll()[s] as Skier;
//         skier.update();
//     }
    }
}
