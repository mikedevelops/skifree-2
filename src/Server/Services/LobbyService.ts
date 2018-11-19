import Player from '../Entities/Player';
import DuplicateUsernameException from '../../Exceptions/DuplicateUsernameException';
import DuplicateIdException from '../../Exceptions/DuplicateIdException';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';

export interface IPlayerCollection {
    [index: string]: Player;
}

export default class LobbyService {
    private players: IPlayerCollection = {};

    public addPlayer (username: string, id: string): void {
        if (this.playerExists(id)) {
            throw new DuplicateIdException(id);
        }

        if (this.getPlayerByUsername(username) !== null) {
            throw new DuplicateUsernameException(username);
        }

        this.players[id] = new Player(username, id);
    }

    public removePlayer (id: string): void {
        if (!this.playerExists(id)) {
            return;
        }

        delete this.players[id];
    }

    public setPlayerReady (id: string): void {
        if (!this.playerExists(id)) {
            return;
        }

        this.players[id].setReady(true);
    }

    public getPlayerById (id: string): Player {
        if (!this.playerExists(id)) {
            throw new EntityNotFoundException(id);
        }

        return this.players[id];
    }

    public getAllPlayers (): IPlayerCollection {
        return this.players;
    }

    public getAllOtherPlayers (id: string): IPlayerCollection {
        const others: IPlayerCollection = {};

        for (const playerId in this.players) {
            if (!Object.hasOwnProperty.call(this.players, playerId)) {
                continue;
            }

            const player: Player = this.players[playerId];

            if (player.getId() !== id) {
                others[player.getId()] = player;
            }
        }

        return others;
    }

    public getPlayerCount (): number {
        return Object.keys(this.players).length;
    }

    private getPlayerByUsername (username: string): Player|null {
        for (const player in this.players) {
            if (this.players[player].getUsername() === username) {
                return this.players[player];
            }
        }

        return null;
    }

    private playerExists (id: string): boolean {
        return Object.hasOwnProperty.call(this.players, id);
    }
}
