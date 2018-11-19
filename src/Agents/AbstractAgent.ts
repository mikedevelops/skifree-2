import Animator from '../Services/Animator';
import IEntity from '../Entities/IEntity';
import Game from '../Game';
import EntityWithoutIdException from '../Exceptions/EntityWithoutIdException';

export interface ITransformedAgent {
    id: string;
    position: Phaser.Point;
}

export default abstract class AbstractAgent implements IEntity {
    private enabled: boolean = false;
    private id: string;

    protected constructor (
        private name: string,
        public sprite: Phaser.Sprite,
        public game: Game,
        public animator: Animator
    ) {}

    public init (): void {
        this.enabled = true;
        this.game.phaser.stage.add(this.sprite);
        this.animator.init(this.sprite);
    }

    public getName (): string {
        return this.name;
    }

    public isEnabled (): boolean {
        return this.enabled;
    }

    public enable (): void {
        this.enabled = true;
    }

    public disable (): void {
        this.sprite.kill();
        this.enabled = false;
    }

    public reset (): void {
        this.enabled = true;
    }

    public update (): void {
        throw new Error('Implement update! for ' + this.getName());
    }

    public transform (): ITransformedAgent {
        return {
            position: this.sprite.position,
            id: this.id
        };
    }

    public getId (): string {
        if (this.id === undefined) {
            throw new EntityWithoutIdException(this);
        }

        return this.id;
    }

    public setId (id: string): void {
        this.id = id;
        this.sprite.addChild(new Phaser.Text(this.game.phaser, -5, -5, this.id.toString(), {
           fontSize: 12
        }));
    }

    public updatePosition (position: Phaser.Point): void {
        this.sprite.position = position;
    }
}
