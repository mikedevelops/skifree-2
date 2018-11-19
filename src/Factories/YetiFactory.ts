import AbstractEntityFactory from './AbstractEntityFactory';
import Yeti from '../Agents/Yeti';
import FollowingState from '../State/FollowingState';
import StateStack from '../State/StateStack';
import YetiMovementManager from '../StateManagers/YetiMovementManager';
import Animator from '../Services/Animator';
import Game from '../Game';
import IEntity from '../Entities/IEntity';
import config from '../../config/game.config';

export default class YetiFactory extends AbstractEntityFactory {
    public create (game: Game): IEntity {
        return new Yeti(
            new YetiMovementManager(
                new StateStack(5)
            ),
            new FollowingState(),
            new Phaser.Sprite(game.phaser, 0, 0, 'yeti_run'),
            game,
            new Animator(config.FPS),
            config.YETI.SPEED,
            config.YETI.SPEED_FALLOFF,
            config.YETI.MAX_SPEED
        );
    }
}
