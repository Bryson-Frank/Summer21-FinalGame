class Level_4 extends Level {
    constructor() {
        super("Level_4");
    }

    preload() {
        super.preload();
        this.load.image('background4', './assets/background4-01.png');
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background4').setOrigin(0, 0);
    }

    initLevel() {
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;
        
        game.speed = 0.013;
        game.currLvl = 3;
        this.nextLvl = 'Level_5';
    }
}