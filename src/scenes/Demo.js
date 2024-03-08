class Demo extends Phaser.Scene {
    constructor() {
        super('DemoScene')
    }

    init() {
        this.VEL = 100  //velocity constant
    }

    preload() {
    }

    create() {
        // bgm stuff
        this.sound.bgm = this.sound.add('loop',{
            volume:0.8,
            loop:true,
        })
        this.sound.bgm.play()

        this.sound.ring = this.sound.add('ring',{
            volume:0.1,
            //loop:true,
        })

        // tilemap stuff
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tile', 'tilesetImage')
        const bgLayer = map.createLayer('bgLayer', tileset, 0, 0)
        const wallLayer = map.createLayer('wallLayer', tileset, 0, 0)
        const itemLayer = map.createLayer('itemLayer', tileset, 0, 0)

        wallLayer.setCollisionByProperty({collides: true})
        itemLayer.setCollisionByProperty({collides: true})

        // add player
        this.player = this.physics.add.sprite(320, 400, 'player', 0)
        this.player.body.setCollideWorldBounds(true)

        this.item1 = this.physics.add.sprite(320, 300, 'item')
        this.item2 = this.physics.add.sprite(320, 50, 'jail')

        // create animation for player
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

        // add enemy
        this.enemyA = this.physics.add.sprite(144, 384, 'wall')
        this.enemyA.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.enemyA, this.player)
        this.physics.add.collider(this.enemyA, wallLayer, function(enemyA, wallLayer) {
            xa*=-1
            enemyA.setVelocityY(-xa)
        }, null, this)

        this.enemyB = this.physics.add.sprite(304, 112, 'wall')
        this.enemyB.setAngle(90)
        this.enemyB.setBodySize(128, 32)
        this.physics.add.collider(this.enemyB, this.player)
        this.physics.add.collider(this.enemyB, wallLayer, function(enemyB, wallLayer) {
            xb*=-1
            enemyB.setVelocityX(-xb)
        }, null, this)

        this.enemyC = this.physics.add.sprite(400, 256, 'wall')
        this.enemyC.setAngle(90)
        this.enemyC.setBodySize(128, 32)
        this.physics.add.collider(this.enemyC, this.player)
        this.physics.add.collider(this.enemyC, wallLayer, function(enemyC, wallLayer) {
            xc*=-1
            enemyC.setVelocityX(-xc)
        }, null, this)

        // **************************
        // mark for Lock state
        this.lock = true

        // create colliders and bounds for map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.player, wallLayer)
        this.physics.add.collider(this.item2, this.player)
        this.item2.body.setImmovable(true)

        // **************************
        // important
        // open lock and change to next level
        this.physics.add.collider(this.item1, this.player,function(item1,player){
            item1.destroy()
            this.lock = false
            this.sound.ring.play()
        }, null, this)

        // move to next scene
        this.physics.add.collider(this.player, itemLayer, () =>{
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('EndscreenScene')  
        })
        
        // input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {

        if(this.lock){
            this.enemyA.body.setImmovable(true)
            this.enemyB.body.setImmovable(true)
            this.enemyC.body.setImmovable(true)
        }
        if(!this.lock){
            this.enemyA.setVelocityY(-xa)
            this.enemyB.setVelocityX(xb)
            this.enemyC.setVelocityX(xc)
            this.item2.destroy()
        }
    
        // movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        } 
        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}