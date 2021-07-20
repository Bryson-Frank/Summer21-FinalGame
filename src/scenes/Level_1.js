class Level_1 extends Level {
    constructor() {
        super("Level_1");

    }

    preload() {
        super.preload();
        this.load.image('background', './assets/background1-01.png');
        this.load.image('ground', './assets/ground.png');
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.add.sprite(0, 475, 'ground').setOrigin(0);
    }

    initLevel() {

        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;
       // super.create();

        game.currLvl = 0;
        game.speed = 0.01;
        console.log(game.currLvl);
        this.nextLvl = 'Level_2';
    }

    update() {
        super.update();
    }
}