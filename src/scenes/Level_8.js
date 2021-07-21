class Level_8 extends Level {
    constructor() {
        super("Level_8");
    }

    preload() {
        super.preload();
        this.load.image('background8', './assets/background8-01.png');
        this.load.audio('level8Audio', 'assets/level8.wav');
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background8').setOrigin(0, 0);
    }

    initLevel() {
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/3.5, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;

        game.currLvl = 7;
        this.nextLvl = 'GameOverScene' // needs to change to credits.

        this.level8Audio = this.sound.add('level8Audio', {volume: 0.6});
        this.level8Audio.play();
    }

    setCircleSize() {

        this.innout.setScale(this.innout.circleSize); // update the scale.
        // if we are decreasing,
        if (this.isDecreasing) {
            this.innout.circleSize -= game.speed; // shrink the circle

            if (this.innout.displayWidth <= this.breathe.displayWidth - 20) {
                this.isDecreasing = false; // and if we reached the breathe button (and some for some leaway), we are no longer decreasing
                game.speed *= 0.8;
            }
            
        } else { // if we are not decreasing,
            this.innout.circleSize += game.speed; // expand the circle

            if (this.innout.circleSize >= 1.1) { // until it reaches the desired size. 
                this.isDecreasing = true;        // and we start decreasing again.
                this.wasPressed = false;         // we can reset wether we hit/pressed spacebar last time
            }
        }
    }
  
    nextLvlMusic() {
      this.level8Audio.pause();
    }
}