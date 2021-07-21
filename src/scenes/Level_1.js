class Level_1 extends Level {
    constructor() {
        super("Level_1");

    }

    preload() {
        super.preload();
        this.load.image('background', './assets/background1-01.png');
        this.load.image('ground', './assets/ground.png');
        this.load.audio('level1Audio', 'assets/level1.wav'); 
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.add.sprite(0, 475, 'ground').setOrigin(0);
    }

    initLevel() {

        // create walker.
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/4, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;
        
        // play audio.
        this.level1Audio = this.sound.add('level1Audio', {volume: 0.5});
        this.level1Audio.play();

        game.currLvl = 0;
        game.speed = 0.01;
        console.log(game.currLvl);
        this.nextLvl = 'Level_2';
    }
    
    // End Narration on gameOver
    stopNarration() {
        this.level1Audio.pause();
    }

    // transition of audio to next level.
    nextLvlMusic() {
      this.level1Audio.pause();
    }
}