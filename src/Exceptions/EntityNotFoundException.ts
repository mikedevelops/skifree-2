export default class EntityNotFoundException extends Error {
    constructor (
        id: string
    ) {
        super(`Entity with id "${id}" was not found`);
    }
}
