import StateStack from '../State/StateStack';
import AbstractAgent from '../Agents/AbstractAgent';
import AbstractState from '../State/AbstractState';

export default abstract class StateManager {
    protected constructor (
        protected stack: StateStack
    ) {}

    public update (agent: AbstractAgent): void {
        this.stack.peek().update(agent);
    }

    public handleInput (agent: AbstractAgent, input: Phaser.Input): void {
        this.stack.peek().handleInput(agent, input);
    }

    public setState (agent: AbstractAgent, state: AbstractState) {
        if (this.stack.getSize() > 0) {
            // Exit current state
            this.stack.peek().exit(agent);
        }

        // Add new state
        this.stack.push(state);
        // Enter new state
        state.enter(agent);
    }
}
