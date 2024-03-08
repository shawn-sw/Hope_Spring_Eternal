// Code Practice: Slime World
// Name: 
// Date: 
'use strict'

let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    zoom: 1.5,
    scene: [ Menu,Demo,Endscreen ]
}

const game = new Phaser.Game(config)

let keyRESET

let xa = 130
let xb = 130
let xc = 130
