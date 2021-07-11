// Final Game
// UCSC Summer 21

let config = {
    type: Phaser.AUTO,
    width: 980,
    height: 680,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);