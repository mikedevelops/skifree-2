import AbstractState from './AbstractState';
import AbstractAgent from '../Agents/AbstractAgent';

export default class EatenState extends AbstractState {
    public enter (agent: AbstractAgent): void {
        agent.disable();
    }
}
