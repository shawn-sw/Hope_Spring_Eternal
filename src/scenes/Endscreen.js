class Endscreen extends Phaser.Scene {
    constructor() {
        super("EndscreenScene")
    }

    create(){

        // create bgm
        this.sound.bgm = this.sound.add('loop',{
            volume:0.8,
            loop:true,
        })
        this.sound.bgm.play()

        // create map for background
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tile', 'tilesetImage')
        const bgLayer = map.createLayer('bgLayer', tileset, 0, 0)

        // create player for background
        this.player = this.physics.add.sprite(320, 150, 'player', 0)
        this.player.body.setCollideWorldBounds(true)

        this.anims.create({
            key: 'anime',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            })
        })
        this.player.play('anime')

        // create item for background
        this.jail = this.add.image(320, 400, 'jail')

        // create title
        let menuConfig = {
            fontFamily: 'PressStart2P',
            fontSize: '10px',
            color: '#141312',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, 40, 'H o p e', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '30px'
        this.add.text(game.config.width/2, 65, 'Springs', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '15px'
        this.add.text(game.config.width/2, 95, 'E t e r n a l', menuConfig).setOrigin(0.5)


        // create text
        menuConfig.fontSize = '40px'
        this.add.text(game.config.width/2, 200, 'You are free!!', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '15px'
        this.add.text(game.config.width/2, 200+70, 'Press [SPACE] to return to the Menu', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '10px'
        this.add.text(game.config.width/2, 200+90, 'Press [C] to Credits', menuConfig).setOrigin(0.5)


        // create inpu
        this.cursors = this.input.keyboard.createCursorKeys()
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

    }

    update() {
        // move to play scene
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('CreditsScene')    
        }else if(this.cursors.space.isDown) {
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('MenuScene')    
          }
    }
}