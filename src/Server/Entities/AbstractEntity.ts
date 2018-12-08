export default abstract class AbstractEntity {
    protected constructor (
        protected id: string
    ) {}

    public getId (): string {
        return this.id;
    }
}
