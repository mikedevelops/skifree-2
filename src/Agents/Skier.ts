import AbstractPhysicsAgent from './AbstractPhysicsAgent';
import SkierMovementManager from '../StateManagers/SkierMovementManager';
import AbstractState from '../State/AbstractState';
import Animator from '../Services/Animator';
import Game from '../Game';
import IConsumable from './IConsumable';
import AbstractInputController from '../Controllers/AbstractInputController';

export default class Skier extends AbstractPhysicsAgent implements IConsumable {
    public constructor (
        movementManager: SkierMovementManager,
        inputController: AbstractInputController,
        private startState: AbstractState,
        sprite: Phaser.Sprite,
        game: Game,
        animator: Animator,
        speed: number,
        speedFalloff: number,
        maxSpeed: number,
        private value: number
    ) {
        super(
            movementManager,
            inputController,
            game.phaser.rnd.realInRange(
                speed - (speed / 100) * 50,
                speed + (speed / 100) * 50
            ),
            game.phaser.rnd.realInRange(
                speedFalloff - (speedFalloff / 100) * 50,
                speedFalloff + (speedFalloff / 100) * 50
            ),
            game.phaser.rnd.realInRange(
                maxSpeed - (maxSpeed / 100) * 50,
                maxSpeed + (maxSpeed / 100) * 50
            ),
            'SKIER',
            sprite,
            game,
            animator
        );
    }

    public init (): void {
        super.init();

        this.sprite.animations.add('down', [3]);
        this.sprite.animations.add('left', [2]);
        this.sprite.animations.add('right', [1]);

        this.movementManager.setState(this, this.startState);
        // TODO: create spawner and spawn within a rect
        this.sprite.position.setTo(
            this.sprite.game.rnd.integerInRange(10, this.sprite.game.width - 10),
            this.sprite.game.rnd.integerInRange(10, this.sprite.game.height - 10)
        );
        // this.sprite.position.setTo(this.game.width / 2, 50);
    }

    public update (): void {
        this.movementManager.update(this);
    }

    public getValue (): number {
        return this.value;
    }
}
