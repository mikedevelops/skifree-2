import 'phaser-ce';
import AbstractState from './AbstractState';
import AbstractPhysicsAgent from '../Agents/AbstractPhysicsAgent';
import Yeti from '../Agents/Yeti';
import Point = Phaser.Point;

export default class FollowingState extends AbstractState {
    private fps: number = 12;

    public update (agent: AbstractPhysicsAgent): void {
        // Move to pointer
        const agentPosition: Point = new Point(
            agent.sprite.worldPosition.x, agent.sprite.worldPosition.y);
        const pointerPosition = agent.inputController.getInput();
        const distance: number = agentPosition.distance(pointerPosition);

        if (distance > 20) {
            agent.sprite.position = this.follow(
                new Point(agentPosition.x, agentPosition.y),
                new Point(pointerPosition.x, pointerPosition.y),
                agent.getSpeed());
        }

        this.setDirection(agent, pointerPosition);

        if (agent instanceof Yeti) {
            agent.updateSpeed();
        }

        this.updateAnimationSpeed(agent);

        if (agent.getPercentageSpeed() < 50 && this.fps > 6) {
            this.fps = 6;
            agent.sprite.animations.stop('run');
            agent.sprite.animations.play('run', this.fps, true);
        }

        this.handleCollision(agent);
    }

    public enter (agent: AbstractPhysicsAgent): void {
        agent.sprite.animations.play('run', this.fps, true);
    }

    private follow (source: Point, target: Point, speed: number): Point {
        const heading: Point = target.subtract(
            source.x, source.y);
        const direction: Point = heading.normalize();

        return source.add(direction.x * speed, direction.y * speed);
    }

    private handleCollision (agent: AbstractPhysicsAgent): void {
        // const others: AbstractPhysicsAgent[] = agent.game.skierEntityPool.checkCollision(agent);
        //
        // if (others.length) {
        //     const other: AbstractPhysicsAgent = others.pop();
        //
        //     if (other instanceof Skier) {
        //         agent.updateSpeed(other.getValue());
        //     }
        //
        //     agent.movementManager.setState(agent, new EatingState());
        //     other.movementManager.setState(other, new EatenState());
        // }
    }

    private setDirection (agent: AbstractPhysicsAgent, pointer: Phaser.Point): void {
        if (agent.sprite.position.x - pointer.x > 0) {
            agent.sprite.scale.setTo(-1, 1);
        } else {
            agent.sprite.scale.setTo(1, 1);
        }
    }

    private updateAnimationSpeed (agent: AbstractPhysicsAgent): void {
        const speed: number = agent.getPercentageSpeed();
        let fps: number = 12;

        if (speed < 75) {
            fps = 8;
        }

        if (speed < 50) {
            fps = 6;
        }

        if (speed < 25) {
            fps = 3;
        }

        if (fps !== this.fps) {
            this.fps = fps;
            agent.sprite.animations.stop('run');
            agent.sprite.animations.play('run', this.fps, true);
        }
    }
}
