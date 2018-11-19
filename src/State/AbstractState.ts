import AbstractAgent from '../Agents/AbstractAgent';

export default abstract class AbstractState {
    public enter (agent: AbstractAgent): void {}

    public exit (agent: AbstractAgent): void {}

    public handleInput (agent: AbstractAgent, input: Phaser.Input): void {}

    public update (agent: AbstractAgent): void {}
}
