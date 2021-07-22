class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    preload() {
        super.preload();
        this.load.image('credits', './assets/credits-01.png');
        this.load.audio('level8Audio', 'assets/level8.wav');
    }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background7').setOrigin(0, 0);
    }

    update(){
        
    }

}