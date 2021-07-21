// Final Game
// UCSC Summer 21

let config = {
    type: Phaser.AUTO,
    width: 1515,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Level_1, Level_2, Level_3, Level_4, Level_5, Level_6, Level_7, Level_8, GameOver, Credits ]
}

let game = new Phaser.Game(config); 

game.speed = 0.01;

game.currLvl = 1;

let musicTrack1, musicTrack2;
let synthIsPlaying = false;
