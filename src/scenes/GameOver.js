class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    // preLoad() {
    // }

    create() {
        this.add.text(100, 100, 'GAME OVER').setOrigin(0, 0);
        this.add.text(100, 164, 'Press Space to Restart').setOrigin(0, 0);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(100, 260, 'Press C to continue').setOrigin(0, 0);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.lvls = ["Level_1", "Level_2", "Level_3", "Level_4", "Level_5", "Level_6", "Level_7", "Level_8"];

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
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) { // restart from the beginning.
            this.scene.start("Level_1");
            musicTrack1.play();
            if (synthIsPlaying) {
                musicTrack2.stop();
                synthIsPlaying = false;
            }
            
        } else if (Phaser.Input.Keyboard.JustDown(this.keyC)) { // restart where you died.
            this.scene.start(this.lvls[game.currLvl]);
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
        if (Phaser.Input.Keyboard.JustDown(this.key5)) {
            this.scene.start("Level_5");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key6)) {
            this.scene.start("Level_6");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key7)) {
            this.scene.start("Level_7");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key8)) {
            this.scene.start("Level_8");
        }
        if (Phaser.Input.Keyboard.JustDown(this.key9)) {
            this.scene.start("Credits")
        }
    }
}