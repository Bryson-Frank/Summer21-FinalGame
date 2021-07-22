class Level extends Phaser.Scene {
    constructor(title) {
        super(title);
        console.log('creating level scene ' +title);
    }

    // This Scene is the default game loop all levels extend from.
    // The functions that need to be tweaked in certain levels are defined in the coresponding files,
    // they will be the ones used.

    preload() {
        this.load.image('player', './assets/walker.png');
        this.load.spritesheet('walking', './assets/walker7Frames-01.png', {frameWidth: 110, frameHeight: 187, startFrame: 0, endFrame: 7});
        this.load.image('breathe', './assets/breathe_button.png');
        this.load.spritesheet('rhythm', './assets/outer_ring.png', {frameWidth: 298, frameHeight: 400, startFrame: 0, endFrame: 7});
        this.load.audio('inhale', 'assets/inhale.wav');
        this.load.audio('exhale', 'assets/exhale.wav');
        this.load.spritesheet('dying', './assets/death-01.png', {frameWidth: 190, frameHeight: 190, startFrame: 0, endFrame: 7});
        this.load.spritesheet('windGust', './assets/windGust-01.png', {frameWidth: 110, frameHeight: 60, startFrame: 0, endFrame: 4});
        this.load.image('cloud1', './assets/cloud1.png');
        this.load.image('cloud2', './assets/cloud2.png');
        this.load.image('cloud3', './assets/cloud3.png');

        }

    create() {

        this.defineKeys();
    
        this.initBckgrnd(); // load level specific background art.


        this.cloudNum = Phaser.Math.RND.integerInRange(1, 3);      // random cloud sprite.
        this.cloudHeight = Phaser.Math.RND.integerInRange(0, 100); // random height within range.
        this.cloudX = Phaser.Math.RND.integerInRange(game.config.width - 1000, game.config.width);

        this.cloud1 = this.physics.add.sprite(this.cloudX, this.cloudHeight, 'cloud1').setOrigin(0, 0);
        this.cloud2 = this.physics.add.sprite(this.cloudX, this.cloudHeight, 'cloud2').setOrigin(0, 0);
        this.cloud3 = this.physics.add.sprite(this.cloudX, this.cloudHeight, 'cloud3').setOrigin(0, 0);

        this.cloud1.alpha = 0;
        this.cloud2.alpha = 0;
        this.cloud3.alpha = 0;

        // Wind sprite.
        this.wind = this.physics.add.sprite(1200, game.config.height/6*4, 'windGust').setOrigin(0, 0);


        // Circle that contricts and expands around the button
        this.innout = this.physics.add.sprite((game.config.width/2), (game.config.height/3), 'rhythm');
        this.innout.circleSize = 1.1;

        // breathe button
        this.breathe = this.physics.add.sprite((game.config.width/2), (game.config.height/3), 'breathe');

        // walking animation config
        this.walkingAnim = {
            key: 'walk',
            frames:  this.anims.generateFrameNumbers('walking', { start: 0, end: 6, first: 0}),
            frameRate: 15
        };
        this.anims.create(this.walkingAnim);

        // death anim
        this.deathAnim = {
            key: 'death',
            frames:  this.anims.generateFrameNumbers('dying', { start: 0, end: 6, first: 0}),
            frameRate: 10
        };
        
        this.anims.create(this.deathAnim);

        this.windAnim = {
            key: 'gust',
            frames: this.anims.generateFrameNumbers('windGust', { start: 0, end: 5, first: 0}),
            frameRate: 4,
            repeat: -1,
            repeatDelay: 1000
        };

        this.anims.create(this.windAnim);

        //inhale/exhale variable
        this.breatheCount = 0;
        // variable to exapnd/shrink ruthm overlay, if true then shrink, if false then expand.
        this.isDecreasing = true; 
        // variable to know if spacebar has been pressed, used to go to end screen if a beat was missed.
        this.wasPressed = true;  // starts true so player doesn't lose at first beat.
        this.gameIsOver = false;
        if (game.currLvl == 0) {        // reset only if it is the first level.
            this.playerStarted = false;
        }
        // create level specific variables.

        this.initLevel();

        this.windGust();

    }

    update() { // Core code of gameplay used in all levels.
        
        // update windgust position.
        if(this.wind.body.position.x <= 0) {
            this.wind.setX(game.config.width);
        }
        if(this.wind.anims.isPlaying) {
            this.wind.body.velocity.x = -80;
        }

        if (!this.gameIsOver) {

            this.sendCloud();

            // update the rhythm circle size by changing its scale. Last 5 levels use their own defns to change speed in level itself.
            this.setCircleSize();
            
            // checks if walking animation is playing, if not,
            // then it sets x-velocity of walker to 0
            if (!this.walker.anims.isPlaying) {
                this.walker.body.velocity.x = 0;
                this.walker.body.velocity.y = 0;
            }
            
            this.checkAccuracy(); // spacebar was hit, was it at the correct time?

            this.checkIfMissed();
            
            // if player reaches end of screen, then transitions to next scene
            if (this.walker.x > game.config.width) {
                this.scene.start(this.nextLvl);     // nextLvl is updated in the initLvl of every level.
                this.nextLvlMusic();
            }
        }

        this.cheats(); // allows num keys to travel to the different levels.
    }

    windGust(){
        this.wind.anims.play('gust');
    }

    sendCloud() { // send a cloud onto the scene. no need to repeat because player changes scene rather fast anyway.
    
        if (this.cloudNum == 1) {
            this.cloud1.alpha = 1;
            this.cloud1.body.velocity.x = -50;
        } else if (this.cloudNum == 2) {
            this.cloud2.alpha = 1;
            this.cloud2.body.velocity.x = -50;   
        } else if (this.cloudNum == 3) {
            this.cloud3.alpha = 1;
            this.cloud3.body.velocity.x = -50;
        }
    }


    defineKeys() {
        this.key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        this.key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        this.key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
        this.key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);
        this.key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);
        this.key9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    playInhaleExhale() {
        if ((this.breatheCount % 2) == 0) {
            this.sound.play('inhale');
            
        } else if ((this.breatheCount % 2) == 1) {
            this.sound.play('exhale');
            
        }
        this.breatheCount += 1;
    }


    setCircleSize() { // default expand/shrink of circle, speed varies with global variable.

        this.innout.setScale(this.innout.circleSize); // update the scale.

        // if we are decreasing,
        if (this.isDecreasing) {
            this.innout.circleSize -= game.speed; // shrink the circle

            if (this.innout.displayWidth <= this.breathe.displayWidth - 20) {
                this.isDecreasing = false; // and if we reached the breathe button (and some for some leaway), we are no longer decreasing
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

        if ((Phaser.Input.Keyboard.JustDown(this.spaceKey)) && (!this.walker.anims.isPlaying)) {

            this.wasPressed = true; // we hit spacebar.
            this.playerStarted = true;

            // was spacebar pressed at the correct time?     (+30 to give more leway when checking overlap)
            if (this.innout.displayWidth <= this.breathe.displayWidth + 30) { // checks size of the rhythm circle and the breathe button.
                this.walker.body.velocity.x = 500;
                this.walker.anims.play('walk');

                this.playInhaleExhale(); // play audio.

            } else { // if it wasn't hit at the right time you lose.
                this.GameOver();
                //this.stopNarration();
            }
        }
    }

    checkIfMissed() {
        // also lose if you don't hit spacebar in time
        if (!this.isDecreasing &&                                    // if the cricle is growing
            !this.wasPressed &&                                      // and we haven't hit the spacebar
            this.innout.displayWidth > this.breathe.displayWidth) {  // by the time it gets bigger than the button       
            if (this.playerStarted) {
                this.GameOver();          
            }
        }
    }

    GameOver() {
        this.walker.anims.play('death');
        this.gameIsOver = true;
        this.stopNarration();
        //setTimeout(()=>(this.scene.start('GameOverScene')), 1000);
        this.walker.on('animationcomplete', () => {
            this.scene.start('GameOverScene');
        });
    }

    stopNarration() {

    }

    // Check for Cheat inputs.
    cheats() {
        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
            this.scene.start("Level_1");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key2)) {
            this.scene.start("Level_2");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key3)) {
            this.scene.start("Level_3");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.scene.start("Level_4");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key5)) {
            this.scene.start("Level_5");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key6)) {
            this.scene.start("Level_6");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key7)) {
            this.scene.start("Level_7");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key8)) {
            this.scene.start("Level_8");
            this.nextLvlMusic();
        }
        if (Phaser.Input.Keyboard.JustDown(this.key9)) {
            this.scene.start("Credits");
            this.nextLvlMusic();
        }
    }

    
    nextLvlMusic() {

    }

    // Both defined in every Level Scene.
    initBckgrnd() {

    }
    initLevel() {

    }
}