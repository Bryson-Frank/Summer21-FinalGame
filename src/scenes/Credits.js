class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    preload() {
        this.load.image('credits', './assets/credits-01.png');
        this.load.audio('level8Audio', 'assets/level8.wav');
    }

    create(){
        this.add.image(0, 0, 'credits').setOrigin(0, 0);  
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) { // restart from the beginning.
            this.scene.start("Level_1");
        }
    }
}