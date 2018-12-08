export default abstract class AbstractInputController {
    protected buffer: Phaser.Point = new Phaser.Point(0, 0);

    public update (position: Phaser.Point): void {
        this.buffer = position;
    }

    public getInput (): Phaser.Point {
        return this.buffer;
    }
}
