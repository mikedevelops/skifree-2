import EntityPool from '../Pools/EntityPool';
import { ITransformedAgent } from '../Agents/AbstractAgent';
import { IUpdate } from '../server';
import IEntity from '../Entities/IEntity';
import EntityNotFoundException from '../Exceptions/EntityNotFoundException';

export default class Network {
    private buffer: ITransformedAgent[] = [];

    constructor (
        private socket: SocketIOClient.Socket,
        private player: IEntity,
        private pools: EntityPool[],
    ) {}

    public init () {
        this.socket.on('game:update', (update: IUpdate) => {
            this.buffer = this.buffer.concat(update.entities);
        });
    }

    public update () {
        this.socket.emit('game:update', {
            entities: this.pools.reduce((entities, pool) => {
                entities = entities.concat(pool.transform());
                return entities;
            }, [])
        });

        // Flatten buffer and update
        this.buffer.forEach((update: ITransformedAgent) => {
            if (update.id !== this.player.getId()) {
                this.searchPools(update.id).updatePosition(update.position);
            }
        });
    }

    private otherPlayers (entity: ITransformedAgent): boolean {
        return entity.id !== this.player.getId();
    }

    private searchPools (id: string): IEntity {
        let entity: IEntity;

        this.pools.forEach((pool) => {
            const e: IEntity = pool.getById(id);

            if (e !== undefined) {
                entity = e;
            }
        });

        if (entity === undefined) {
            throw new EntityNotFoundException(id);
        }

        return entity;
    }
}
