import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import AbstractEntity from '../Entities/AbstractEntity';

export interface IEntityCollection {
    [index: string]: AbstractEntity;
}

export default class EntityManager {
    private entities: IEntityCollection = {};

    public addPlayer (entity: AbstractEntity): void {
        if (Object.hasOwnProperty.call(this.entities, entity.getId())) {
            return;
        }

        this.entities[entity.getId()] = entity;
    }

    public getEntity (id: string): AbstractEntity {
        if (!Object.hasOwnProperty.call(this.entities, id)) {
            throw new EntityNotFoundException(id);
        }

        return this.entities[id];
    }

    public getEntities (): AbstractEntity[] {
        return Object.keys(this.entities).map((id) => this.entities[id]);
    }
}
