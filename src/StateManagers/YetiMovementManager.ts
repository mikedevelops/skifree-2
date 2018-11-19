import StateManager from './StateManager';
import StateStack from '../State/StateStack';

export default class YetiMovementManager extends StateManager {
    public constructor (
        stateStack: StateStack
    ) {
        super(stateStack);
    }
}
