import IEntity from '../Entities/IEntity';
import Game from '../Game';
import AbstractInputController from '../Controllers/AbstractInputController';

export default abstract class AbstractEntityFactory {
    public abstract create (game: Game, inputController: AbstractInputController): IEntity;
}
