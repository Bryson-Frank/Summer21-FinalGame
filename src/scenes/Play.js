class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player', './assets/walker.png');
        this.load.image('background', './assets/background.png');
        this.load.image('ground', './assets/ground.png');
        this.load.spritesheet('walking', './assets/walker7Frames-01.png', {frameWidth: 110, frameHeight: 187, startFrame: 0, endFrame: 7});
        }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        let groundTile = this.add.sprite(0, 475, 'ground').setOrigin(0);
        this.walker = this.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        // animation config
        this.anims.create({
            key: 'walk',
            frames:  this.anims.generateFrameNumbers('walking', { start: 0, end: 7, first: 0}),
            frameRate: 30
        });
    }

    update() {
        this.frames += 1;
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.walker.alpha = 0;
            let w = this.add.sprite(this.walker.x, this.walker.y, 'explosion').setOrigin(0, 0);
            w.anims.play('walk');
            this.walker.x += 10;
            setTimeout(() => {this.walker.alpha = 1}, 210);
        };
    }

}