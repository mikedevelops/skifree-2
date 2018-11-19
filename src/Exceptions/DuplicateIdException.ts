export default class DuplicateIdException extends Error {
    constructor (
        id: string
    ) {
        super(`Player with ID "${id}" already exists in the lobby`);
    }
}
