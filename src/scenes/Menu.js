class Menu extends Phaser.Scene {
    constructor() {
        super("MenuScene")
    }

    preload() {

        // preload player
        this.load.path = './assets/'
        this.load.spritesheet('player', 'player.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('adv', 'adv.png', {
            frameWidth: 64,
            frameHeight: 32
        })

        // preload map
        this.load.image('tilesetImage', 'tile.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'level1.json')

        // preload item
        this.load.image('item', 'item.png')
        this.load.image('jail', 'jail.png')

        // preload enemy
        this.load.image('wall', 'wall.png')

        // preload bgm
        this.load.audio('ring', './sound/warning.wav')
        this.load.audio('loop', './sound/loop-bgm2.wav')
        this.load.audio('unlock', './sound/sfx-select.wav')
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
        this.player = this.physics.add.sprite(320, 400, 'player', 0)
        this.player.body.setCollideWorldBounds(true)

        // create item for background
        this.jail = this.add.image(320, 400, 'jail')

        // create title
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#141312',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, 40, 'H o p e', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '40px'
        this.add.text(game.config.width/2, 65, 'Springs', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '20px'
        this.add.text(game.config.width/2, 90, 'E t e r n a l', menuConfig).setOrigin(0.5)

        // create text
        this.add.text(game.config.width/2, 200, 'Press [SPACE] to Select', menuConfig).setOrigin(0.5)

        // create input
        this.cursors = this.input.keyboard.createCursorKeys()

        // create HTML document
        document.getElementById('info').innerHTML = '<strong>Operation guide:</strong> <br /> SPACE: select <br /> Arrows: move'

    }

    update() {
        //this.scene.start('EndscreenScene')
        //this.scene.start('DemoScene')   

        // move to play scene
        if (this.cursors.space.isDown) {
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DemoScene')    
        }
    }
}