class Level_5 extends Level {
    constructor() {
        super("Level_5");
    }

    preload() {
        super.preload();
        this.load.image('background5', './assets/background5-01.png');
        this.load.audio('synthSounds', 'assets/synthForBreathe.mp3'); 

        // Found at https://freesound.org/people/hargissssound/sounds/345852/ 
        this.load.audio('level5Audio', 'assets/level5.wav');
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background5').setOrigin(0, 0);
    }

    initLevel() {
        musicTrack1.pause();
      
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/3.5, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;

        if (typeof musicTrack2 != 'object') { // define the music only once.
            musicTrack2 = this.sound.add('synthSounds', {volume: 0.6, loop: true}); 
        }
        if (!synthIsPlaying) {           // We want to be playing the music once at a time. 
            console.log('playing synth')
            musicTrack2.play();          // implement synths
            synthIsPlaying = true;       // so music doesnt play over itself.
        }

        this.level5Audio = this.sound.add('level5Audio', {volume: 0.6});
        this.level5Audio.play();
        
        game.speed = 0.012; // return to slow speed.
        console.log(game.speed);
        game.currLvl = 4;
        this.nextLvl = 'Level_6';
    }

    setCircleSize() { // keep this function because we change the speed during the level itself.

        this.innout.setScale(this.innout.circleSize); // update the scale.
        // if we are decreasing,
        if (this.isDecreasing) {
            this.innout.circleSize -= game.speed; // shrink the circle

            if (this.innout.displayWidth <= this.breathe.displayWidth - 20) {
                this.isDecreasing = false; // and if we reached the breathe button (and some for some leaway), we are no longer decreasing
                game.speed *= 0.9;
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

    sendCloud() { //we want this empty so no clouds spawn.

    }

    stopNarration() {
        this.level5Audio.pause();
    }

    nextLvlMusic() {
        musicTrack2.stop();
        musicTrack1.play();
        this.level5Audio.pause();
        console.log('stoped music');
    }
}
