import IEntity from '../Entities/IEntity';
import AbstractEntityFactory from '../Factories/AbstractEntityFactory';
import 'phaser-ce';
import AbstractPhysicsAgent from '../Agents/AbstractPhysicsAgent';
import Game from '../Game';
import { ITransformedAgent } from '../Agents/AbstractAgent';
import PlayerInputController from '../Controllers/PlayerInputController';

export default class EntityPool {
    private pool: IEntity[] = [];

    public constructor (
        private game: Game,
        private socket: SocketIOClient.Socket,
        private factory: AbstractEntityFactory,
        private poolSize: number
    ) {}

    public create (id: string, player: boolean = false): IEntity {
        if (this.pool.length >= this.poolSize) {
            throw new Error(`Attempted to add entity "${0}" to the pool but it is full!`);
        }

        const entity: IEntity = this.factory.create(
            this.game,
            new PlayerInputController()
        );

        entity.init();
        entity.enable();
        entity.setId(id);
        this.add(entity);
        return entity;
    }

    public add (entity: IEntity): void {
        if (this.pool.length >= this.poolSize) {
            throw new Error(`Attempted to add entity "${0}" to the pool but it is full!`);
        }

        this.pool.push(entity);
    }

    public get (): IEntity {
        const entity: IEntity = this.pool[0];

        entity.reset();
        return entity;
    }

    public getSize (): number {
        return this.pool.filter(this.enabled).length;
    }

    public getAll (): IEntity[] {
        return this.pool.filter(this.enabled);
    }

    public update (): void {
        this.pool.filter(this.enabled)
            .forEach((entity) => entity.update());
    }

    public getById (id: string): IEntity {
        return this.pool.find((e) => e.getId() === id);
    }

    public checkCollision (source: AbstractPhysicsAgent): AbstractPhysicsAgent[] {
        const overlap: AbstractPhysicsAgent[] = [];

        this.pool.filter((entity) => entity.isEnabled() && entity instanceof AbstractPhysicsAgent)
            .forEach((physicsAgent: AbstractPhysicsAgent) => {
                if (this.game.phaser.physics.arcade.overlap(source.sprite, physicsAgent.sprite)) {
                    overlap.push(physicsAgent);
                }
            });

        return overlap;
    }

    public transform (): ITransformedAgent[] {
        return this.pool.filter(this.enabled).map((entity) => entity.transform());
    }

    private enabled (entity: IEntity): boolean {
        return entity.isEnabled();
    }
}
