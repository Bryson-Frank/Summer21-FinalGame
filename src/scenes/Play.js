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
        //camera.setBounds(x, y, width, height)
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        let groundTile = this.add.sprite(0, 475, 'ground').setOrigin(0);
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        // animation config
        this.anims.create({
            key: 'walk',
            frames:  this.anims.generateFrameNumbers('walking', { start: 0, end: 6, first: 0}),
            frameRate: 15
        });
        this.walker.body.velocity.x = 0;
    }

    update() {
        this.isWalking = false;
        if (!(this.walker.anims.isPlaying && this.walker.anims.currentAnim.key === 'walk')) {
            //console.log('Player is walking');
            this.walker.body.velocity.x = 0;
        }
        if ((Phaser.Input.Keyboard.JustDown(this.spaceKey)) 
        && (!(this.walker.anims.isPlaying && this.walker.anims.currentAnim.key === 'walk'))) {
            this.walker.body.velocity.x = 500;
            this.walker.anims.play('walk');
        }
        if (this.walker.x > game.config.width) {
            this.scene.start('GameOverScene');
        }
    }
}