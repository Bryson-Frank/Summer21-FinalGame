class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player', './assets/walkerRound.png');
    }

    create() {
        this.add.sprite(260, 420, 'player');
    }
}