class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('title', './assets/menu.png');
        this.load.audio('birdSounds', 'assets/birdsForBreathe.wav'); 
        // Found at https://freesound.org/people/hargissssound/sounds/345852/ 
    }

    create() {
        this.add.image(0, 0, 'title').setOrigin(0, 0);

        musicTrack1 = this.sound.add('birdSounds', {volume: 1, loop: true});
        musicTrack1.play()

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        this.key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
        this.key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);
        this.key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);
        this.key9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start("Level_1");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
            this.scene.start("Level_1");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key2)) {
            this.scene.start("Level_2");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key3)) {
            this.scene.start("Level_3");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.scene.start("Level_4");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.scene.start("Level_5");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.scene.start("Level_6");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.scene.start("Level_7");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.scene.start("Level_8");
        }
    }
}
