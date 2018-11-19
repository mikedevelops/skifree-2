import YetiMovementManager from '../StateManagers/YetiMovementManager';
import Animator from '../Services/Animator';
import AbstractState from '../State/AbstractState';
import AbstractPhysicsAgent from './AbstractPhysicsAgent';
import Game from '../Game';

export default class Yeti extends AbstractPhysicsAgent {
    private score: number = 0;

    public constructor (
        movementManager: YetiMovementManager,
        private startState: AbstractState,
        sprite: Phaser.Sprite,
        game: Game,
        animator: Animator,
        speed: number,
        speedFalloff: number,
        maxSpeed: number
    ) {
        super(movementManager, speed, speedFalloff, maxSpeed, 'YETI', sprite, game, animator);
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
