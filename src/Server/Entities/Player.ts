import { ISerializedEntity } from '../ISerializableEntity';

export interface IVector2 {
    x: number;
    y: number;
}

export default class Player implements ISerializedEntity {
    private ready: boolean = false;
    private position: IVector2;

    constructor (
        private username: string,
        private id: string
    ) {}

    public getUsername (): string {
        return this.username;
    }

    public serialize (): string {
        return JSON.stringify({
            username: this.username,
            id: this.id
        });
    }

    public isReady (): boolean {
        return this.ready;
    }

    public setReady (ready: boolean): void {
        this.ready = ready;
    }

    public getId (): string {
        return this.id;
    }

    public setPosition (position: IVector2): void {
        this.position = position;
    }

    public getPosition (): IVector2 {
        return this.position;
    }
}
