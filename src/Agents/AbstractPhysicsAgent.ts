import AbstractAgent from './AbstractAgent';
import YetiMovementManager from '../StateManagers/YetiMovementManager';
import Game from '../Game';
import Animator from '../Services/Animator';

export default abstract class AbstractPhysicsAgent extends AbstractAgent {
    protected constructor (
        public movementManager: YetiMovementManager,
        private speed: number,
        private speedFalloff: number,
        private maxSpeed: number,
        name: string,
        sprite: Phaser.Sprite,
        game: Game,
        animator: Animator
    ) {
        super(name, sprite, game, animator);
    }

    public init (): void {
        // Enable physics
        this.game.phaser.physics.arcade.enable(this.sprite);
        super.init();
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.allowRotation = false;
    }

    public getSpeed (): number {
        return this.speed;
    }

    public updateSpeed (speed?: number): void {
        // if (speed === undefined) {
        //     if (this.speed - this.speedFalloff <= 0) {
        //         this.speed =  0;
        //         return;
        //     }
        //
        //     this.speed -= this.speedFalloff;
        //     return;
        // }
        //
        // if (this.speed + speed >= this.maxSpeed) {
        //     this.speed = this.maxSpeed;
        //     return;
        // }
        //
        // this.speed += speed;
    }

    public getPercentageSpeed (): number {
        return (this.speed / this.maxSpeed) * 100;
    }
}
