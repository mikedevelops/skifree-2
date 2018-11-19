import AbstractState from './AbstractState';

export default class StateStack {
    private states: AbstractState[] = [];

    public constructor (
        private size: number
    ) {}

    public push (state: AbstractState): void {
        this.states.unshift(state);

        if (this.states.length === this.size) {
            this.states.pop();
        }
    }

    public peek (): AbstractState {
        return this.states[0];
    }

    public getSize (): number {
        return this.states.length;
    }
}
