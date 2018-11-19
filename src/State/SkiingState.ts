import AbstractState from './AbstractState';
import AbstractPhysicsAgent from '../Agents/AbstractPhysicsAgent';
import config from '../../config/game.config';

export default class SkiingState extends AbstractState {
    private frames: number = 0;
    private direction: number = 0;
    private transitionFrames: number = 0;

    public enter (agent: AbstractPhysicsAgent): void {
        this.transitionFrames = agent.game.phaser.rnd.integerInRange(
            config.STATE.SKIING.TRANSITION_FRAMES - (config.STATE.SKIING.TRANSITION_FRAMES / 100) * 50,
            config.STATE.SKIING.TRANSITION_FRAMES + (config.STATE.SKIING.TRANSITION_FRAMES / 100) * 50
        );
        this.updateDirection();
        this.updateSprite(agent);
    }

    public update (agent: AbstractPhysicsAgent): void {
        if (this.frames >= this.transitionFrames) {
            this.updateDirection();
            this.updateSprite(agent);
            this.frames = 0;
        }

        let horizontalMovement: number = 0;
        let verticalMovement: number = agent.getSpeed();

        if (this.direction !== 0) {
            horizontalMovement = (agent.getSpeed() / 2) * this.direction;
            verticalMovement = agent.getSpeed() / 2;
        }

        agent.sprite.position.setTo(
            agent.sprite.position.x + horizontalMovement,
            agent.sprite.position.y + verticalMovement);

        this.frames++;
    }

    private updateDirection (): void {
        if (this.direction !== 0) {
            this.direction = 0;
            return;
        }

        this.direction = Math.random() > 0.5 ? 1 : -1;
    }

    private updateSprite (agent: AbstractPhysicsAgent): void {
        switch (this.direction) {
            case -1:
                agent.sprite.animations.play('left');
                return;
            case 0:
                agent.sprite.animations.play('down');
                return;
            case 1:
                agent.sprite.animations.play('right');
                return;
        }
    }
}
