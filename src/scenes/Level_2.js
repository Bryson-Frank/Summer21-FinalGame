class Level_2 extends Level {
    constructor() {
        super("Level_2");
    }

    preload() {
        super.preload();
        this.load.image('background2', './assets/background2-01.png');
        this.load.image('ground', './assets/ground.png');
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background2').setOrigin(0, 0);
    }
        
    initLevel() {

        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;

        game.speed = .011;
        game.currLvl = 1;
        console.log(game.currLvl);
        this.nextLvl = 'Level_3';
    }
}