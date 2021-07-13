class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('player', './assets/walker.png');
        this.load.image('background', './assets/background.png');
        this.load.image('ground', './assets/ground.png');
        this.load.spritesheet('walking', './assets/walker7Frames-01.png', {frameWidth: 110, frameHeight: 187, startFrame: 0, endFrame: 7});
        this.load.image('breathe', './assets/breathe_button.png');
        this.load.spritesheet('rhythm', './assets/outer_ring.png', {frameWidth: 298, frameHeight: 400, startFrame: 0, endFrame: 7});
        }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.sprite(0, 475, 'ground').setOrigin(0);

        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        // breathe button
        this.breathe = this.physics.add.sprite((game.config.height/4) - 140, (game.config.width/4) - 280, 'breathe').setOrigin(0, 0);
        // Circle that contricts and expands around the button
        this.innout = this.physics.add.sprite((700/4) - 185, (1515/4) - 380, 'rhythm').setOrigin(0, 0);
        // collison box of innout size
        this.innout.setSize(200, 200, (-20, -1.25));
        // button animation config
        this.buttonAnimConfig = {
            key: 'in-n-out',
            frames: this.anims.generateFrameNumbers('rhythm', { start: 0, end: 6, first: 0}),
            frameRate: 10,
            repeat: -1
        };
        // walking animation config
        this.walkingAnim = {
            key: 'walk',
            frames:  this.anims.generateFrameNumbers('walking', { start: 0, end: 6, first: 0}),
            frameRate: 15
        };
        this.anims.create(this.buttonAnimConfig);
        this.anims.create(this.walkingAnim);
        this.walker.body.velocity.x = 0;
        this.innout.anims.play('in-n-out');
    }

    update() {
        // checks if walking animation is playing if not,
        // then it sets x-velocity of all objects to 0
        if (!(this.walker.anims.isPlaying && this.walker.anims.currentAnim.key === 'walk')) {
            this.walker.body.velocity.x = 0;
            this.breathe.body.velocity.x = 0;
            this.innout.body.velocity.x = 0;
        }
        // checks if space button was pressed and
        // also if walking is not playing,
        // if so, then it sets velocity of all objects to 500
        // and plays walking animation
        if ((Phaser.Input.Keyboard.JustDown(this.spaceKey)) 
        && (!(this.walker.anims.isPlaying && this.walker.anims.currentAnim.key === 'walk'))) {
            this.walker.body.velocity.x = 500;
            this.breathe.body.velocity.x = 500;
            this.innout.body.velocity.x = 500;
            this.walker.anims.play('walk');
        }
        // if player reaches end of screen, then transitions to next scene
        if (this.walker.x > game.config.width) {
            this.scene.start('GameOverScene');
        }
    }
}