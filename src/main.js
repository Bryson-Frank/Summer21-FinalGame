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
    scene: [ Menu, Level_1, Level_2, Level_3, GameOver ]
}

let game = new Phaser.Game(config);