export default class DuplicateUsernameException extends Error {
    constructor (
        username: string
    ) {
        super(`User with username "${username}" already exists in the lobby`);
    }
}
