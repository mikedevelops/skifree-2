import LobbyService from '../../../src/Server/Services/LobbyService';

describe('LobbyService', () => {
    let lobby: LobbyService;

    beforeEach(() => {
        lobby = new LobbyService();
    });

    describe('getAllOtherPlayers', () => {
        test('should return all other players', () => {
            lobby.addPlayer('foo', '1');
            lobby.addPlayer('bar', '2');
            lobby.addPlayer('baz', '3');

            expect(lobby.getAllOtherPlayers('2')).toEqual({
                '1': lobby.getPlayerById('1'),
                '3': lobby.getPlayerById('3')
            });
        });
    });
});
