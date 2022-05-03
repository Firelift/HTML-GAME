class ImageBis extends Image {
    constructor(pX = 0, pY = 0){
        super();
        this.X = pX
        this.Y = pY
    }
    getX(){
        return this.X;
    }
    getY(){
        return this.Y;
    }
    setX(pX){
        this.X = pX;
    }
    setY(pY){
        this.Y = pY;
    }

    rotateSprite(pCtx, pSprite, pAngle = 0, pDisplayOffsetX = 0, pDisplayOffsetY = 0){
        pCtx.rotate(pAngle);
        pCtx.drawImage(pSprite.image, pDisplayOffsetX, pDisplayOffsetY, 
        pSprite.image.width*pSprite.scaleX, pSprite.image.height*pSprite.scaleY);
    }
}