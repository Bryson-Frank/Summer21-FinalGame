class Level_6 extends Level {
    constructor() {
        super("Level_6");
    }

    preload() {
        super.preload();
        this.load.image('background6', './assets/background6-01.png');
        this.load.audio('level6Audio', 'assets/level6.wav');
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background6').setOrigin(0, 0);
    }

    initLevel() {
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/3.5, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;
      
        this.level6Audio = this.sound.add('level6Audio', {volume: 0.6});
        this.level6Audio.play();
     
        game.speed = 0.01;
        game.currLvl = 5;
        this.nextLvl = 'Level_7';
    }

    setCircleSize() { // speed increases every beat so don't use default.

        this.innout.setScale(this.innout.circleSize); // update the scale.
        // if we are decreasing,
        if (this.isDecreasing) {
            this.innout.circleSize -= game.speed; // shrink the circle

            if (this.innout.displayWidth <= this.breathe.displayWidth - 20) {
                this.isDecreasing = false; // and if we reached the breathe button (and some for some leaway), we are no longer decreasing
                game.speed += 0.0002;
                console.log(game.speed);
            }
            
        } else { // if we are not decreasing,
            this.innout.circleSize += game.speed; // expand the circle

            if (this.innout.circleSize >= 1.1) { // until it reaches the desired size. 
                this.isDecreasing = true;        // and we start decreasing again.
                this.wasPressed = false;         // we can reset wether we hit/pressed spacebar last time
            }
        }
    }
}