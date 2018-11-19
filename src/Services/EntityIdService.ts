export default class EntityIdService {
    private entities: number = 0;

    public getEntityId (): number {
        return ++this.entities;
    }
}
