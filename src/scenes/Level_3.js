class Level_3 extends Level {
    constructor() {
        super("Level_3");
    }

    preload() {
        super.preload();
        this.load.image('background3', './assets/background3-01.png');
        }
    
    initBckgrnd() {
        this.add.sprite(0, 0, 'background3').setOrigin(0, 0);
    }
    
    initLevel() {
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/3.5, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;

        game.speed = 0.012;
        game.currLvl = 2;
        this.nextLvl = 'Level_4';

    }
}