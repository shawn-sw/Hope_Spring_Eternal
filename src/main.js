// Code Practice: 
// Name: 
// Game include: physics systems, cameras, text objects, the animation manager,  and tilemaps
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
    scene: [ Menu,Level1,Level2,Endscreen,Deadscreen,Credits ]
}

const game = new Phaser.Game(config)

let keyRESET
let keyC

let camPos = 640

let l1a = 130
let l1b = 130
let l1c = 130

let l2c = 110
let l1d = 110
let l1e = 110
let l1f = 110
let l1g = 110
let l1h = 110
let l1i = 110
let l1j = 110
