import 'phaser-ce';
import Yeti from '../Agents/Yeti';

export default class SpeedBar {
    private bar: Phaser.Graphics;

    constructor (
        private game: Phaser.Game,
        private yeti: Yeti,
        private width: number
    ) {}

    public init () {
        const label = new Phaser.Text(this.game, 10, 10, 'Speed: ');
        const box = new Phaser.Graphics(this.game, 53, 13);

        box.lineStyle(1, 0xff0000, 1);
        box.drawRect(0, 0, this.width, 10);
        label.fontSize = 12;

        this.bar = new Phaser.Graphics(this.game, 53, 13);
        this.draw();
        this.game.stage.add(label);
        this.game.stage.add(this.bar);
        this.game.stage.add(box);
    }

    public draw () {
        const percentage: number = this.yeti.getPercentageSpeed();

        this.bar.clear();
        this.bar.beginFill(0xff0000);
        this.bar.drawRect(0, 0, (this.width / 100) * percentage, 10);
        this.bar.endFill();
    }

    public update () {
        this.draw();
    }
}
