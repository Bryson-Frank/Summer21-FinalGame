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
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start("playScene");
        }
    }
}