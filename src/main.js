// Final Game
// UCSC Summer 21
/*/////////////////////////////////////////////////////////////////////////

Collaborator names: Victor Derbier, Harsha Madala, Claudia Mcmillin, Bryson Frank

Game title: Breathe (Final Game)

Date completed: 7/22/21

---------------------------------------------------------------------------
Credits:
Music
“Spring Birds Loop with Low-Cut (New Jersey)” 
by hargissssound at: https://freesound.org/s/345852/ 

“Floating Synth Melody at 130 BPM C major loop music”
by Lemoncreme at: https://freesound.org/s/231578/

Helpful code for audio help:
https://www.youtube.com/watch?v=SRqKOccMWbc

/////////////////////////////////////////////////////////////////////////*/


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
    scene: [ Menu, Level_1, Level_2, Level_3, Level_4, Level_5, Level_6, Level_7, Level_8, Credits, GameOver ]
}

let game = new Phaser.Game(config); 

game.speed = 0.01;

game.currLvl = 0;

// variable to keep player from losing at first level before hitting spacebar once.
game.playerStarted = false;  // this allows for the narration to run if players want without losing.

let musicTrack1, musicTrack2;
let synthIsPlaying;
