class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player', './assets/walker.png');
        this.load.image('background', './assets/background.png');
        this.load.image('ground', './assets/ground.png');
        }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        }
}