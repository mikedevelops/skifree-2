import { ITransformedAgent } from '../../Agents/AbstractAgent';
import AbstractEntity from './AbstractEntity';

export interface IVector2 {
    x: number;
    y: number;
}

export default class Player extends AbstractEntity {
    private ready: boolean = false;
    private position: IVector2;

    constructor (
        private username: string,
        id: string
    ) {
        super(id);
    }

    public getUsername (): string {
        return this.username;
    }

    public transform (): ITransformedAgent {
        return {
            id: this.id,
            position: this.position as Phaser.Point
        };
    }

    public isReady (): boolean {
        return this.ready;
    }

    public setReady (ready: boolean): void {
        this.ready = ready;
    }

    public setPosition (position: IVector2): void {
        this.position = position;
    }

    public getPosition (): IVector2 {
        return this.position;
    }
}
