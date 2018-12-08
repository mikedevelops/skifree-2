import YetiMovementManager from '../StateManagers/YetiMovementManager';
import Animator from '../Services/Animator';
import AbstractState from '../State/AbstractState';
import AbstractPhysicsAgent from './AbstractPhysicsAgent';
import Game from '../Game';
import AbstractInputController from '../Controllers/AbstractInputController';

export default class Yeti extends AbstractPhysicsAgent {
    private score: number = 0;
    private username: string;

    public constructor (
        movementManager: YetiMovementManager,
        inputController: AbstractInputController,
        private startState: AbstractState,
        sprite: Phaser.Sprite,
        game: Game,
        animator: Animator,
        speed: number,
        speedFalloff: number,
        maxSpeed: number
    ) {
        super(movementManager, inputController, speed, speedFalloff, maxSpeed, 'YETI', sprite, game, animator);
    }

    public init (): void {
        // Setup sprite
        super.init();

        // Setup animations
        this.sprite.animations.add('run', [0, 1]);

        // Init state
        this.movementManager.setState(this, this.startState);

        this.sprite.position.setTo(0, 0);
    }

    public setUsername (name: string): void {
        this.username = name;
        this.sprite.addChild(
            new Phaser.Text(
                this.game.phaser,
                -this.sprite.width / 2,
                -this.sprite.height,
                this.username, {
                    fontSize: 12
                }
        ));
    }

    public update (): void {
        this.movementManager.update(this);
    }

    public updateScore (score: number): void {
        this.score += score;
    }

    public getScore (): number {
        return this.score;
    }
}
