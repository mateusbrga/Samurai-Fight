class Sprite{ // classe de sprite
    constructor({position, imageSrc, scale = 1, framesMax = 1}){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    draw(){
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height ,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            (this.image.height ) * this.scale)
    }

    update(){
        this.draw()
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }else{
                this.framesCurrent = 0 
            }
        }
        
        
    }
}

class Fighter extends Sprite{ // classe de sprite
    constructor({
        position, 
        velocity, 
        color = 'red', 
        offset, 
        imageSrc, 
        scale = 1, 
        framesMax = 1
    }){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            
        })
        
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    

    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y 
        this.position.x += this.velocity.x 

        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y>=canvas.height -96) { //detectando o chao
            this.velocity.y = 0
        }else{
            this.velocity.y += gravity
        }
    }
    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}