class Sprite {
    constructor (pImage, pIsTileSheet=false, pX=0, pY=0) {
        this.image = pImage;
        this.image.tileSheet = pIsTileSheet;
        this.image.column = 1;
        this.image.line = 1;
        this.x = pX;
        this.y = pY;
        this.currentFrame = 0;
        this.frame = 0;
        this.currentAnimation = null;
        this.timerAnimation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.displayOffsetX = 0;
        this.displayOffsetY = 0;
        this.orientation = 0;
        if (this.image.tileSheet){
            this.tileSize = {
                x : this.image.width,
                y : this.image.height,
            }
        }
        //Animations du sprite
        this.lstAnimations = [];
    }

    addAnimation(pName, pLstFrames, pSpeed, pIsLooping = true){
        let animation = {
            name : pName,
            frames : pLstFrames,
            firstFrame : pLstFrames[0],
            lastFrame: pLstFrames[pLstFrames.length - 1],
            speed : pSpeed,
            loop : pIsLooping,
            end : false
        }
        this.lstAnimations.push(animation);
    }

    startAnimation(pName){
        if (this.currentAnimation != null){
            if (this.currentAnimation.name == pName){
                return;
            }
        }
        this.lstAnimations.forEach(animation =>{
            if (animation.name == pName){
                this.currentAnimation = animation;
                this.currentAnimation.end = false;
                this.frame = animation.firstFrame;
            }
        })
    }

    stopAnimation(){
        this.currentAnimation.end = true;         
    }

    playAnimation(dt){
        if (!this.currentAnimation.end){
            if (this.currentAnimation != null){ 
                this.frame += this.currentAnimation.speed*dt;
                this.currentFrame = Math.floor(this.frame);
                if (this.currentFrame == this.currentAnimation.lastFrame + 1){
                    if (this.currentAnimation.loop){
                        this.frame = this.currentAnimation.firstFrame;
                    }
                    else {
                        this.stopAnimation();
                    }
                }  
            } 
        }
    }
    
    setTileSize(pSizeX, pSizeY){
        if (this.image.tileSheet){
            this.tileSize.x = pSizeX;
            this.tileSize.y = pSizeY;
            this.image.column = Math.floor(this.image.width/pSizeX);
            this.image.line = Math.floor(this.image.height/pSizeY);
        }
        else {
            return;
        }
    }

    setScale(pScaleX, pScaleY){
        this.scaleX = pScaleX;
        this.scaleY = pScaleY;
    }

    setFrame(pFrame) {
        this.currentFrame = pFrame;
    }

    draw(pCtx){
        if (!this.image.tileSheet){
            pCtx.save();
            pCtx.translate(this.x, this.y);
            this.image.rotateSprite(pCtx, this, this.orientation, this.displayOffsetX, this.displayOffsetY);
            pCtx.restore();
        }
        else{
            let l = Math.floor(this.currentFrame/this.image.column);
            let c = this.currentFrame - (this.image.column*l);

            let x = c*this.tileSize.x;
            let y = l*this.tileSize.y;   
            
            pCtx.save();
            pCtx.translate(this.x, this.y);
            pCtx.rotate(this.orientation);
            pCtx.drawImage(this.image, x, y, this.tileSize.x, this.tileSize.y, this.displayOffsetX, this.displayOffsetY, this.tileSize.x*this.scaleX, this.tileSize.y*this.scaleY);
            pCtx.restore();
        }
    }
}

class BorderSprite extends Sprite {
    constructor(pBorder, pImage, pIsTileSheet=false, pX=0, pY=0){
        super(pImage, pIsTileSheet=false, pX=0, pY=0);
        this.border = pBorder;
    }
}