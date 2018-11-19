import Yeti from '../Agents/Yeti';
import 'phaser-ce';

export default class Score {
    private cachedScore: number;
    private score: Phaser.Text;

    constructor (
        private game: Phaser.Game,
        private yeti: Yeti
    ) {}

    public init () {
        const label = new Phaser.Text(this.game, 10, 30, 'Score: ');

        label.fontSize = 12;
        this.cachedScore = this.yeti.getScore();
        this.score = new Phaser.Text(this.game, 50, 30, this.cachedScore.toString());
        this.score.fontSize = 12;
        this.game.stage.add(label);
        this.game.stage.add(this.score);
    }

    public draw (): void {
        this.score.text = this.cachedScore.toString();
    }

    public update () {
        if (this.yeti.getScore() !== this.cachedScore) {
            this.cachedScore = this.yeti.getScore();
            this.draw();
        }
    }
}
