import AbstractState from './AbstractState';
import AbstractAgent from '../Agents/AbstractAgent';
import AbstractPhysicsAgent from '../Agents/AbstractPhysicsAgent';
import FollowingState from './FollowingState';
import Yeti from '../Agents/Yeti';

export default class EatingState extends AbstractState {
    public enter (agent: AbstractAgent): void {
        const animation = agent.sprite.animations.add('eat', [2, 3, 4, 5, 6, 7]);

        if (agent instanceof Yeti) {
            agent.updateScore(1);
        }

        if (agent instanceof AbstractPhysicsAgent) {
            animation.onComplete.add(() => {
                agent.movementManager.setState(agent, new FollowingState());
            });

            agent.sprite.body.velocity.setTo(0, 0);
            agent.sprite.animations.play('eat', 6);
        }
    }
}
