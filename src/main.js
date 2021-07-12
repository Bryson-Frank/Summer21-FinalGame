// Final Game
// UCSC Summer 21

let config = {
    type: Phaser.AUTO,
    width: 1515,
    height: 700,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);