import { ITransformedAgent } from '../Agents/AbstractAgent';

export default interface IEntity {
    getName (): string;
    getId (): string;
    setId (id: string): void;
    isEnabled (): boolean;
    enable (): void;
    disable (): void;
    reset (): void;
    update (): void;
    updatePosition (position: Phaser.Point): void;
    init (): void;
    transform (): ITransformedAgent;
}
