import * as React from 'react';
import { FormEvent } from 'react';

interface IRegisterPlayerState {
    username: string;
}

interface IRegisterPlayerProps {
    submit: (username: string) => void;
}

export default class RegisterPlayer extends React.Component<IRegisterPlayerProps, IRegisterPlayerState> {
    constructor (props: IRegisterPlayerProps) {
        super(props);

        this.state = {
            username: ''
        };
    }

    public render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor='username'>Player name: </label>
                <input
                    id='username'
                    name='username'
                    value={this.state.username}
                    onChange={this.handleInput.bind(this)}
                />
                <button>Start Game</button>
            </form>
        );
    }

    private handleInput (event: KeyboardEvent): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;

        this.setState((state) =>
            Object.assign({}, state, {
                username: input.value
            }));
    }

    private handleSubmit (event: FormEvent): void {
        event.preventDefault();
        this.props.submit(this.state.username);
    }
}
