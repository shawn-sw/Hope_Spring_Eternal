class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1Scene')
    }

    init() {
        this.VEL = 150  //velocity constant
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
        this.enemyA = this.physics.add.sprite(128, 384, 'wall')
        this.enemyA.setScale(2)
        this.enemyA.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.enemyA, this.player, function(enemyA, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyA, wallLayer, function(enemyA, wallLayer) {
            l1a*=-1
            enemyA.setVelocityY(-l1a)
        }, null, this)

        this.enemyB = this.physics.add.sprite(304, 112, 'wallA')
        this.enemyB.setScale(2)
        this.physics.add.collider(this.enemyB, this.player, function(enemyB, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyB, wallLayer, function(enemyB, wallLayer) {
            l1b*=-1
            enemyB.setVelocityX(-l1b)
        }, null, this)

        this.enemyC = this.physics.add.sprite(416, 256, 'wallA')
        this.enemyC.setScale(2)
        this.physics.add.collider(this.enemyC, this.player, function(enemyC, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyC, wallLayer, function(enemyC, wallLayer) {
            l1c*=-1
            enemyC.setVelocityX(-l1c)
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
            this.scene.start('Level2Scene')  
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
            this.enemyA.setVelocityY(-l1a)
            this.enemyB.setVelocityX(l1b)
            this.enemyC.setVelocityX(l1c)
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