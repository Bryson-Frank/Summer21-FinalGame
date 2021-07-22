class Level_7 extends Level {
    constructor() {
        super("Level_7");
    }

    preload() {
        super.preload();
        this.load.image('background7', './assets/background7-01.png');
        }

    initBckgrnd() {
        this.add.sprite(0, 0, 'background7').setOrigin(0, 0);
    }
    
    initLevel() {
        this.walker = this.physics.add.sprite(game.config.height/4, game.config.width/3.5, 'player').setOrigin(0, 0);
        this.walker.body.velocity.x = 0;
       
        game.speed = 0.011;
        game.currLvl = 6;
        this.nextLvl = 'Level_8'
    }
    
    setCircleSize() {

        this.innout.setScale(this.innout.circleSize); // update the scale.
        // if we are decreasing,
        if (this.isDecreasing) {
            this.innout.circleSize -= game.speed; // shrink the circle

            if (this.innout.displayWidth <= this.breathe.displayWidth - 20) {
                this.isDecreasing = false; // and if we reached the breathe button (and some for some leaway), we are no longer decreasing
                game.speed *= 1.1;
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

    checkAccuracy() {
        
        /* 
        checks if space button was pressed and also if walking is not playing,
        if true, then set velocity of all objects to 500 and plays walking animation.
        */
        if ((Phaser.Input.Keyboard.JustDown(this.spaceKey)) 
        && (!(this.walker.anims.isPlaying))) { 
            //&& this.walker.anims.currentAnim.key === 'walk'))) {
                 // for harsha: no need to check frame since we check if animation is playing anyway

            this.wasPressed = true; // we hit spacebar.

            // was spacebar pressed at the correct time?
            if (this.innout.displayWidth <= this.breathe.displayWidth + 30) { // checks size of the rhythm circle and the breathe button.
                this.walker.body.velocity.x = 500;
                this.walker.body.velocity.y = -100; // goes in diag.  THIS IS WHY WE CAN'T USE DEFAULT FUNC.

                this.walker.anims.play('walk');

                this.playInhaleExhale(); // play audio.

            } else { // if it wasn't hit at the right time you lose.
                console.log('lost');
                this.GameOver();
            }
        }
    }

    sendCloud() { // we don't want clouds.

    }

    windGust() {

    }
}