class Background {
    constructor(){
        this.listImages = [];
        this.speed = 1;
        this.currentImage = 0;
    }

    load(){
        let imgBackground1 = imageLoader.getImageLoaded("images/eau1.jpg");
        let imgBackground2 = imageLoader.getImageLoaded("images/eau2.jpg");
        this.addImage(imgBackground1);
        this.addImage(imgBackground2);
        this.setImagePosition(imgBackground1, 0, 0);
        this.setImagePosition(imgBackground2, -imgBackground2.height, 0);
        this.setSpeed(50);
    }

    addImage(pImage){
        this.listImages.push(pImage);
    }

    getSpeed(){
        return this.speed;
    }

    setSpeed(pSpeed){
        this.speed = pSpeed;
    }

    setImagePosition(pImage, pY = 0, pX = 0){
        let index = this.listImages.indexOf(pImage);
        this.listImages[index].setX(pX);
        this.listImages[index].setY(pY);
    }

    update(canvas, dt){
        this.listImages.forEach(image => {
            image.setY(image.getY() + this.speed*dt);
        })

        if (this.listImages[this.currentImage].Y >= canvas.height) {
            if (this.listImages.length == 1){
                this.listImages[this.currentImage].setY(0);
            }
            else{
                let n =  this.listImages.length - 1;
                this.listImages[this.currentImage].setY(-canvas.height*n);
                if (this.currentImage < n) {
                    this.currentImage += 1
                    this.listImages[this.currentImage].setY(0);
                } 
                else{
                    this.currentImage = 0;
                    this.listImages[this.currentImage].setY(0);
                } 
            }   
        }
    }

    draw(pCtx){
        this.listImages.forEach(image => {
            pCtx.drawImage(image, image.getX(), image.getY());
        })
    }
}

class Environment {
    constructor(){
        this.listImgSprite = [];
        this.listTimer = []
        this.listSpriteInGame = [];
        this.currentTimer = null;
    }

    load(){
        this.addImgSprite(imageLoader.getImageLoaded("images/cloud1.png")); 
        this.addImgSprite(imageLoader.getImageLoaded("images/cloud2.png"));
        this.addImgSprite(imageLoader.getImageLoaded("images/cloud3.png"));
        this.addImgSprite(imageLoader.getImageLoaded("images/birds.png"));

        this.initTimer();
        let index = getRandomInt(0,this.listTimer.length - 1);
        this.currentTimer = this.listTimer[index];
    }

    addImgSprite(pImg){
        this.listImgSprite.push(pImg);
    }

    loadSprite(pSprite){
        pSprite.x = getRandomInt(0, canvas.width - pSprite.image.width*pSprite.scaleX);
        pSprite.y = -pSprite.image.height*pSprite.scaleY;
    }

    initTimer(){
        this.listTimer = [2,2,5,5,7,8,9,10,10,15,15,17,18,19,20,20];
    }

    update(dt){
        this.currentTimer -= dt;
        if (this.listTimer.length == 0){
            this.initTimer();
        }
        if (this.currentTimer <= 0) {
            let indexImgSprite = getRandomInt(0,this.listImgSprite.length - 1);
            let new_sprite;
            if (this.listImgSprite[indexImgSprite] == imageLoader.getImageLoaded("images/birds.png")){
                new_sprite = new Sprite(this.listImgSprite[indexImgSprite], true);
                new_sprite.addAnimation("bird", [0,1,2,3,4], 5, true);
                new_sprite.startAnimation("bird");
                new_sprite.setTileSize(32,21);
            }else{
                new_sprite = new Sprite(this.listImgSprite[indexImgSprite], false);
            }
            this.loadSprite(new_sprite);
            this.listSpriteInGame.push(new_sprite);

            let indexTimer = getRandomInt(0,this.listTimer.length - 1);
            this.currentTimer = this.listTimer[indexTimer];
            this.listTimer.splice(indexTimer,1);    
        }

        this.listSpriteInGame.forEach(sprite=>{
            if (sprite.image == imageLoader.getImageLoaded("images/cloud1.png") || sprite.image == imageLoader.getImageLoaded("images/cloud2.png") ||
            sprite.image == imageLoader.getImageLoaded("images/cloud3.png")){
                sprite.y += 50*dt;
            }else{
                if ((sprite.image == imageLoader.getImageLoaded("images/birds.png"))) {
                    sprite.y += 100*dt;
                    sprite.playAnimation(dt);
                }
            }
            //Suppression des sprites
            if (sprite.y > canvas.height) {
                let indexSprite = this.listSpriteInGame.indexOf(sprite);
                this.listSpriteInGame.splice(indexSprite,1);
            }
        })
    }

    draw(pCtx){
        this.listSpriteInGame.forEach(sprite=>{
           sprite.draw(pCtx);
        })
    }
}