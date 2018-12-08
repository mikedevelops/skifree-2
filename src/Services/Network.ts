import EntityPool from '../Pools/EntityPool';
import { ITransformedAgent } from '../Agents/AbstractAgent';
import IEntity from '../Entities/IEntity';
import { IMessageResponse } from '../server';
import AbstractPhysicsAgent from '../Agents/AbstractPhysicsAgent';
import Point = Phaser.Point;

export default class Network {
    constructor (
        private socket: SocketIOClient.Socket,
        private player: IEntity,
        private playerPool: EntityPool,
    ) {}

    public update () {
        this.socket.emit('game:update', {
            entities: this.playerPool.transform()
                .filter((player) => player.id === this.player.getId())
        }, (response: IMessageResponse) => {
            // Process the other entity positions
            response.payload.agents.forEach((agent: ITransformedAgent) => {
                const entity = this.playerPool.getById(agent.id);

                if (entity instanceof AbstractPhysicsAgent) {
                    entity.updatePosition(new Point(agent.position.x, agent.position.y));
                }
            });
        });
    }
}
