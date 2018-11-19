import IEntity from '../Entities/IEntity';

export default class EntityWithoutIdException extends Error {
    constructor (
        entity: IEntity
    ) {
        super(`Entity "${entity.getName()}" does not have an ID assigned`);
    }
}
