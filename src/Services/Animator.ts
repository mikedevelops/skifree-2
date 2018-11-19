import 'phaser-ce';

export default class Animator {
    private sprite: Phaser.Sprite;

    public constructor (
        private fps: number,
    ) {}

    public init (sprite: Phaser.Sprite): void {
        this.sprite = sprite;
    }
}
