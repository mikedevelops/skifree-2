import StateManager from './StateManager';
import StateStack from '../State/StateStack';

export default class SkierMovementManager extends StateManager {
    public constructor (
        stateStack: StateStack
    ) {
        super(stateStack);
    }
}
