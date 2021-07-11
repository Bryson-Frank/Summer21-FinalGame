class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player', './assets/walkerRound.png');
    }

    create() {
        this.add.sprite(240, 420, 'player');
    }
}