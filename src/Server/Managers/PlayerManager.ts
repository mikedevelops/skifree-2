import Player from '../Entities/Player';

export interface IPlayerCollection {
    [index: string]: Player;
}

export default class PlayerManager {
    private players: IPlayerCollection = {};

    public addPlayer (player: Player): void {
        if (Object.hasOwnProperty.call(this.players, player.getId())) {
            return;
        }

        this.players[player.getId()] = player;
    }

    public getPlayers (): IPlayerCollection {
        return this.players;
    }

    public getPlayerCount (): number {
        return Object.keys(this.players).length;
    }
}
