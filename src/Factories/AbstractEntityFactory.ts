import IEntity from '../Entities/IEntity';
import Game from '../Game';

export default abstract class AbstractEntityFactory {
    public abstract create (game: Game): IEntity;
}
