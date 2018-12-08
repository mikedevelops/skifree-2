import AbstractEntityFactory from './AbstractEntityFactory';
import IEntity from '../Entities/IEntity';
import Skier from '../Agents/Skier';
import SkierMovementManager from '../StateManagers/SkierMovementManager';
import StateStack from '../State/StateStack';
import SkiingState from '../State/SkiingState';
import Animator from '../Services/Animator';
import config from '../../config/game.config';
import Game from '../Game';
import AbstractInputController from '../Controllers/AbstractInputController';

export default class SkierFactory extends AbstractEntityFactory {
    public create (game: Game, inputController: AbstractInputController): IEntity {
        return new Skier(
            new SkierMovementManager(
                new StateStack(2)
            ),
            inputController,
            new SkiingState(),
            new Phaser.Sprite(game.phaser, 0, 0, 'skier_ski'),
            game,
            new Animator(config.FPS),
            config.SKIER.SPEED,
            config.SKIER.SPEED_FALLOFF,
            config.SKIER.MAX_SPEED,
            config.SKIER.VALUE
        );
    }
}
