class Credits extends Phaser.Scene {
    constructor() {
        super("CreditsScene")
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
        }
        this.add.text(game.config.width/2, 40, 'H o p e', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '30px'
        this.add.text(game.config.width/2, 65, 'Springs', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '15px'
        this.add.text(game.config.width/2, 95, 'E t e r n a l', menuConfig).setOrigin(0.5)


        // create text
        menuConfig.fontSize = '10px'
        this.add.text(game.config.width/8, 140, 'Credits: ', menuConfig).setOrigin(0.5)

        this.add.text(game.config.width/6, 170, 'Producer: ', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/3,190, 'Shaoan Wang ... ', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, 210, 'Design and Programming', menuConfig).setOrigin(0.5)

        this.add.text(game.config.width/7, 240, 'Resources: ', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2-45, 260, '• Font: "PressStart2P" by "CodeMan38"', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2-35, 280, '• Music Software: "Bfxr" by "increpare"', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, 300, '• Map Software: "Tiled" by Thorbjørn Lindeijer', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2-30, 320, '• Art Software: "pixilart" by Bryan Ware', menuConfig).setOrigin(0.5)


        menuConfig.fontSize = '15px'
        this.add.text(game.config.width/2, 360, 'Press [SPACE] to return to the Menu', menuConfig).setOrigin(0.5)
 


        // create input
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        // move scene   
        if(this.cursors.space.isDown) {
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('MenuScene')    
        }
    }
}