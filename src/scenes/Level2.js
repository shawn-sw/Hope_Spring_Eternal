class Level2 extends Phaser.Scene {
    constructor() {
        super('Level2Scene')
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
        const map = this.add.tilemap('tilesecondmapJSON')
        const tileset = map.addTilesetImage('tile', 'tilesetImage')
        const bgLayer = map.createLayer('bgLayer', tileset, 0, 0)
        const Right_Layer = map.createLayer('Right_Layer', tileset, 0, 0)
        const Left_Layer = map.createLayer('Left_Layer', tileset, 0, 0)
        const wallLayer = map.createLayer('wallLayer', tileset, 0, 0)
        const itemLayer = map.createLayer('itemLayer', tileset, 0, 0)

        wallLayer.setCollisionByProperty({collides: true})
        itemLayer.setCollisionByProperty({collides: true})
        Left_Layer.setCollisionByProperty({collides: true})
        Right_Layer.setCollisionByProperty({collides: true})

        // add player
        this.player = this.physics.add.sprite(320, 400, 'player', 0)
        this.player.body.setCollideWorldBounds(true)

        this.key1 = this.physics.add.sprite(960, 240, 'item')
        this.key2 = this.physics.add.sprite(320, 240, 'item')
        this.jail1 = this.physics.add.sprite(320, 240, 'jail')
        this.jail2 = this.physics.add.sprite(1200, 80, 'jail')

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
        // set1

        this.enemyA = this.physics.add.sprite(832, 176, 'wallA')
        this.enemyA.setScale(2)
        this.physics.add.collider(this.enemyA, this.player, function(enemyA, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyA, wallLayer, function(enemyA, wallLayer) {
            l1a*=-1
            enemyA.setVelocityX(-l1a)
        }, null, this)

        this.enemyB = this.physics.add.sprite(1040, 194, 'wall')
        this.enemyB.setScale(2)
        this.physics.add.collider(this.enemyB, this.player, function(enemyB, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyB, wallLayer, function(enemyB, wallLayer) {
            l1b*=-1
            enemyB.setVelocityY(-l1b)
        }, null, this)

        //set2

        this.enemyC = this.physics.add.sprite(18*16, 6*16, 'wall2').setOrigin(0,0)
        this.enemyC.setScale(2)
        this.physics.add.collider(this.enemyC, this.player, function(enemyC, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyC, wallLayer, function(enemyC, wallLayer) {
            l2c*=-1
            enemyC.setVelocityX(-l2c)
        }, null, this)

        this.enemyD = this.physics.add.sprite(32*16, 5*16, 'wall2').setOrigin(0,0)
        this.enemyD.setScale(2)
        this.physics.add.collider(this.enemyD, this.player, function(enemyD, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyD, wallLayer, function(enemyD, wallLayer) {
            l1d*=-1
            enemyD.setVelocityY(-l1d)
        }, null, this)

        this.enemyE = this.physics.add.sprite(12*16, 13*16, 'wall2').setOrigin(0,0)
        this.enemyE.setScale(2)
        this.physics.add.collider(this.enemyE, this.player, function(enemyE, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyE, wallLayer, function(enemyE, wallLayer) {
            l1e*=-1
            enemyE.setVelocityX(-l1e)
        }, null, this)

        this.enemyF = this.physics.add.sprite(29*16, 22*16, 'wall2').setOrigin(0,0)
        this.enemyF.setScale(2)
        this.physics.add.collider(this.enemyF, this.player, function(enemyF, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyF, wallLayer, function(enemyF, wallLayer) {
            l1f*=-1
            enemyF.setVelocityY(-l1f)
        }, null, this)

        this.enemyG = this.physics.add.sprite(50*16, 22*16-8, 'wall2').setOrigin(0,0)
        this.enemyG.setScale(2)
        this.physics.add.collider(this.enemyG, this.player, function(enemyG, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyG, wallLayer, function(enemyG, wallLayer) {
            l1g*=-1
            enemyG.setVelocityY(-l1g)
        }, null, this)

        this.enemyH = this.physics.add.sprite(58*16, 22*16-8, 'wall2').setOrigin(0,0)
        this.enemyH.setScale(2)
        this.physics.add.collider(this.enemyH, this.player, function(enemyH, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyH, wallLayer, function(enemyH, wallLayer) {
            l1h*=-1
            enemyH.setVelocityY(-l1h)
        }, null, this)

        this.enemyI = this.physics.add.sprite(72*16, 9*16, 'wall2').setOrigin(0,0)
        this.enemyI.setScale(2)
        this.physics.add.collider(this.enemyI, this.player, function(enemyI, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyI, wallLayer, function(enemyI, wallLayer) {
            l1i*=-1
            enemyI.setVelocityY(-l1i)
        }, null, this)

        this.enemyJ = this.physics.add.sprite(75*16, 25*16, 'wall2').setOrigin(0,0)
        this.enemyJ.setScale(2)
        this.physics.add.collider(this.enemyJ, this.player, function(enemyJ, player){
            this.sound.bgm.stop()
            this.sound.play('unlock')
            this.scene.start('DeadscreenScene')  
        }, null, this)
        this.physics.add.collider(this.enemyJ, wallLayer, function(enemyJ, wallLayer) {
            l1j*=-1
            enemyJ.setVelocityY(-l1j)
        }, null, this)


        // **************************
        // mark for Lock state
        this.lock = true

        // create colliders and bounds for map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.player, wallLayer)
        this.physics.add.collider(this.jail1, this.player)
        this.physics.add.collider(this.jail2, this.player)
        this.jail1.body.setImmovable(true)
        this.jail2.body.setImmovable(true)

        // **************************
        // important
        // open lock and change to next level
        this.physics.add.collider(this.key1, this.player,function(key1,player){
            key1.destroy()
            this.jail1.destroy()
            this.lock = false
            this.sound.ring.play()
        }, null, this)

        this.physics.add.collider(this.key2, this.player,function(key2,player){
            key2.destroy()
            this.jail2.destroy()
            this.lock = false
            this.sound.ring.play()
        }, null, this)

        //this.player.setPosition(camPos+320+64,48)
        //this.cameras.main.scrollX = camPos

        // move to 2nd floor
        this.physics.add.collider(this.player, Right_Layer, () =>{
            this.player.setPosition(camPos+320+48,48)
            this.cameras.main.scrollX = camPos
            camPos -= 640
            camPos = Math.abs(camPos)

            //this.scene.start('EndscreenScene')  
        })
        this.physics.add.collider(this.player, Left_Layer, () =>{
            this.player.setPosition(camPos+320-48,48)
            this.cameras.main.scrollX = camPos
            camPos -= 640
            camPos = Math.abs(camPos)
            //this.scene.start('EndscreenScene')  
        })

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
            this.enemyD.body.setImmovable(true)
            this.enemyE.body.setImmovable(true)
            this.enemyF.body.setImmovable(true)
            this.enemyG.body.setImmovable(true)
            this.enemyH.body.setImmovable(true)
            this.enemyI.body.setImmovable(true)
            this.enemyJ.body.setImmovable(true)
        }
        if(!this.lock){
            this.enemyA.setVelocityX(-l1a)
            this.enemyB.setVelocityY(l1b)
            this.enemyC.setVelocityX(-l2c)
            this.enemyD.setVelocityY(-l1d)
            this.enemyE.setVelocityX(-l1e)
            this.enemyF.setVelocityY(l1f)
            this.enemyG.setVelocityY(-l1g)
            this.enemyH.setVelocityY(l1h)
            this.enemyI.setVelocityY(-l1i)
            this.enemyJ.setVelocityY(l1j)
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