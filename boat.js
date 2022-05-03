let oldX;
let oldY;

class Boat{ 
    constructor(pImage, pX = 0, pY = 0){
        this.sprite = new Sprite(pImage, false, pX, pY);
        this.sprite.orientation = -Math.PI/2;
        this.maxLife = 52;
        this.life = this.maxLife;
        this.speed = 200;
        this.wood = 0;
        this.steel = 0;
        this.crew = 1;
        this.maxCrew = 3;
        this.maxWood = 2;
        this.maxSteel = 2;
        this.distanceTraveled = 0;
        this.currentLevel = 1;
        this.newLevel = 1;
        this.levelMax = 6;
        this.listCannon = [];
        this.particleEmitter = new ParticleEmitter();
        this.dead = false;
    }

    initBoat(){
        this.initCannon(this.currentLevel);
    }

    createCannon(pX, pY, pIsMoving = false, angle = -Math.PI/2, pLevel){
        let imgCannon = imageLoader.getImageLoaded("images/cannon1.png");
        let cannon = new Cannon(imgCannon, pIsMoving, pX, pY, pLevel);
        cannon.sprite.orientation = angle;
        this.listCannon.push(cannon); 
    }

    initCannon(pLevel){
        this.listCannon = [];
        if (pLevel == 1){
            this.createCannon(-2, -60, true, -Math.PI/2, 1); 
        }
        if (pLevel == 2){
            this.createCannon(-2, -60, true, -Math.PI/2, 2);  
            this.createCannon(-30, -15, false, -3*Math.PI/4, 2); 
        }
        if (pLevel == 3){
            this.createCannon(-2, -60, true, -Math.PI/2, 3); 
            this.createCannon(-30, -15, false, -3*Math.PI/4, 3);  
            this.createCannon(30, -15, false, -Math.PI/4, 3);  
        }
        if (pLevel == 4){
            this.createCannon(-12, -60, true, -Math.PI/2, 4); 
            this.createCannon(8, -60, true, -Math.PI/2, 4); 
            this.createCannon(-30, -15, false, -3*Math.PI/4, 4);  
            this.createCannon(30, -15, false, -Math.PI/4, 4);  
            
        }
        if (pLevel == 5){
            this.createCannon(-2, -60, true, -Math.PI/2, 5); 
            this.createCannon(- 16, -60, true, -Math.PI/2, 5); 
            this.createCannon(+ 12, -60, true, -Math.PI/2, 5); 
            this.createCannon(-30, -15, false, -3*Math.PI/4, 5);  
            this.createCannon(30, -15, false, -Math.PI/4, 5);      
        }
        if (pLevel == 6){
            this.createCannon(-2, -60, true, -Math.PI/2, 6); 
            this.createCannon(- 16, -60, true, -Math.PI/2, 6); 
            this.createCannon(+ 12, -60, true, -Math.PI/2, 6); 
            this.createCannon(-30, -15, false, -3*Math.PI/4, 6);  
            this.createCannon(30, -15, false, -Math.PI/4, 6); 
            this.createCannon(-30, 15, false, 3*Math.PI/4, 6);  
            this.createCannon(30, 15, false, Math.PI/4, 6); 
        }
        //Load cannon
        this.listCannon.forEach(cannon=>{
            cannon.load();
        })
    }

    load(){
        this.sprite.setScale(0.2,0.2);
        this.sprite.displayOffsetX = -this.sprite.image.width*this.sprite.scaleX/2;
        this.sprite.displayOffsetY = -this.sprite.image.height*this.sprite.scaleY/2;
        this.initBoat();
    }

    update(canvas, dt){
        //Collision with canvas
        this.sprite.y += background.speed*dt;
        if (this.sprite.x < this.sprite.image.height*this.sprite.scaleY/2 || this.sprite.x > canvas.width - this.sprite.image.height*this.sprite.scaleY/2
        || this.sprite.y < this.sprite.image.width*this.sprite.scaleX/2 || this.sprite.y > canvas.height - this.sprite.image.width*this.sprite.scaleX/2) {
            this.sprite.x = oldX;
            this.sprite.y = oldY; 
        }
        else {
            oldX = this.sprite.x;
            oldY = this.sprite.y;
        }
        //Move Boat
        if (keyRight) {
            this.sprite.x += this.speed*dt;
        }
        if (keyDown) {
            this.sprite.y += this.speed*dt;
        }
        if (keyLeft) {
            this.sprite.x -= this.speed*dt;
        }
        if (keyUp) {
            this.sprite.y -= this.speed*dt;
        } 
        //update cannon
        this.listCannon.forEach(cannon=>{
            cannon.update(this, dt);
        }) 
    }
    
    draw(pCtx){
        this.sprite.draw(pCtx);
        //draw cannon
        this.listCannon.forEach(cannon=>{
            cannon.draw(pCtx);
        }) 
    }

    getPositionX(){
        return this.sprite.x; 
    }
    getPositionY(){
        return this.sprite.y;
    }
}

class Cannon{
    constructor(pImage, pIsMoving = false, pX = 0, pY = 0, pLevel = 1){
        this.sprite = new Sprite(pImage, false);
        this.sprite.orientation = -Math.PI/2;
        this.speed = 400;
        this.level = pLevel;
        this.fireRate = 1;
        this.timerFire = this.fireRate;
        this.range = 300;
        this.listCannonBall = [];
        this.levelCannonBall = 1;
        this.move = pIsMoving;
        this.x = pX;
        this.y = pY;
    }

    load(){
        this.sprite.setScale(0.3,0.3);
        this.sprite.displayOffsetX = -5;
        this.sprite.displayOffsetY = -this.sprite.image.height*this.sprite.scaleY/2;
        this.applyFireRate();
        this.applyRange();
        this.applyCannonBallLevel();
    }

    applyFireRate(){
        if (this.level == 2){
            this.fireRate= 0.9;
        }
        if (this.level == 3){
            this.fireRate= 0.8;
        }
        if (this.level == 4){
            this.fireRate= 0.7;
        }
        if (this.level == 5){
            this.fireRate= 0.5;
        }
        if (this.level == 6){
            this.fireRate= 0.3;
        } 
    }

    applyRange(){
        if (this.level == 2){
            this.range= 350;
        }
        if (this.level == 3){
            this.range= 400;
        }
        if (this.level == 4){
            this.range= 450;
        }
        if (this.level == 5){
            this.range= 500;
        }
        if (this.level == 6){
            this.range= 600;
        } 
    }

    applyCannonBallLevel(){
        if (this.level == 2){
            this.levelCannonBall= 2;
        }
        if (this.level == 3){
            this.levelCannonBall= 3;
        }
        if (this.level == 4){
            this.levelCannonBall= 4;
        }
        if (this.level == 5){
            this.levelCannonBall= 5;
        }
        if (this.level == 6){
            this.levelCannonBall= 6;
        } 
    }

    setSpeed(pSpeed){
        this.speed = pSpeed;
    }

    addCannonBall(pLevel){
        let new_cannonBall
        if (pLevel ==1){
            new_cannonBall = new CannonBall(imageLoader.getImageLoaded("images/cannonBall1.png"), 10);
        }else{
            if (pLevel == 2){
                new_cannonBall = new CannonBall(imageLoader.getImageLoaded("images/cannonBall2.png"), 15);
            }else{
                if (pLevel == 3){
                    new_cannonBall = new CannonBall(imageLoader.getImageLoaded("images/cannonBall3.png"), 20);  
                }else{
                    if (pLevel == 4){
                        new_cannonBall = new CannonBall(imageLoader.getImageLoaded("images/cannonBall3.png"), 25);  
                    }else{
                        if (pLevel == 5){
                            new_cannonBall = new CannonBall(imageLoader.getImageLoaded("images/cannonBall3.png"), 30);  
                        }else{
                            if (pLevel == 6){
                                new_cannonBall = new CannonBall(imageLoader.getImageLoaded("images/cannonBall3.png"), 40);
                            }
                        }
                    }       
                }
            }
        }
        new_cannonBall.load(this);
        this.listCannonBall.push(new_cannonBall);  
    }

    removeCannonBall(){
        if (this.listCannonBall.length > 0){
            this.listCannonBall.forEach(cannonBall =>{
                let distanceCannonBall = Math.sqrt((cannonBall.sprite.x - cannonBall.startX)*(cannonBall.sprite.x - cannonBall.startX)
                 + (cannonBall.sprite.y - cannonBall.startY)*(cannonBall.sprite.y - cannonBall.startY));
                if (distanceCannonBall > this.range){
                    let new_image = imageLoader.getImageLoaded("images/water_move1.png");
                    let new_sprite = new Sprite(new_image,true, cannonBall.sprite.x, 
                        cannonBall.sprite.y);
                    new_sprite.setTileSize(20,20);
                    new_sprite.displayOffsetX = -new_sprite.image.width*new_sprite.scaleX/(2*new_sprite.image.column);
                    new_sprite.displayOffsetY = -new_sprite.image.height*new_sprite.scaleY/(2*new_sprite.image.line);
                    new_sprite.addAnimation("water_move", [0,1,2,3], 2, false);
                    new_sprite.startAnimation("water_move");
                    sceneManager.currentScene.listSprite.push(new_sprite);
                    let index = this.listCannonBall.indexOf(cannonBall);
                    this.listCannonBall.splice(index,1);  
                }
            })
        }
    }

    removeCannonBallEnnemy(){
        if (this.listCannonBall.length > 0){
            this.listCannonBall.forEach(cannonBall =>{
                if (cannonBall.sprite.x < - cannonBall.sprite.image.width*cannonBall.sprite.scaleX/2 ||
                cannonBall.sprite.x > canvas.width + cannonBall.sprite.image.width*cannonBall.sprite.scaleX/2 ||
                cannonBall.sprite.y < cannonBall.sprite.image.height*cannonBall.sprite.scaleY/2 ||
                cannonBall.sprite.y > canvas.height + cannonBall.sprite.image.height*cannonBall.sprite.scaleY/2){
                    let index = this.listCannonBall.indexOf(cannonBall);
                    this.listCannonBall.splice(index,1);  
                }
            })
        }
    }

    shootCannonBall(){
        if (keySpace) { 
            if (this.timerFire >= this.fireRate) {
                this.addCannonBall(this.levelCannonBall);
                this.timerFire = 0;
            }
            this.timerFire += dt;
        }
        if (!keySpace){
            if (this.timerFire < this.fireRate){
                this.timerFire += dt;
            }
            else{
                this.timerFire = this.fireRate; 
            }
        }
    }

    shootCannonBallAuto(){
        if (this.timerFire <= 0) {
                this.addCannonBall(this.levelCannonBall);
                this.listCannonBall[this.listCannonBall.length - 1].sprite.setScale(0.7,0.7);
                this.timerFire = this.fireRate;
            }
        this.timerFire -= dt;
    }

    update(pBoat, dt){
        this.sprite.x = pBoat.sprite.x + this.x;
        this.sprite.y = pBoat.sprite.y + this.y;
    
        if (this.move){
            // changement de direction du canon 
            if (this.sprite.orientation <= -Math.PI/4){
                if (keyD) {
                    this.sprite.orientation += dt;
                }
            }
            if (this.sprite.orientation >= -3*Math.PI/4){
                if (keyA) {
                    this.sprite.orientation -= dt;
                }
            }
        }  
        //update cannon ball
        if (this.listCannonBall.length > 0){
            this.listCannonBall.forEach(cannonBall =>{
                cannonBall.update(this, dt);
            })
        }
        //manage cannon ball shoot
        if (pBoat.distanceTraveled >= 3){
            this.shootCannonBall();
        }
        //remove cannon ball
        this.removeCannonBall();
    }

    draw(pCtx){
        this.sprite.draw(pCtx);
        this.listCannonBall.forEach(cannonBall =>{   
            cannonBall.draw(pCtx);
        })  
    }
}

class CannonBall{
    constructor(pImage, pDamage = 10, pX = 0, pY = 0){
        this.sprite = new Sprite(pImage, false, pX, pY);
        this.sprite.orientation = 0;
        this.damage = pDamage;
        this.amount = 10;
        this.startX = null;
        this.startY = null;
    }

    load(pCannon){
        this.sprite.x = pCannon.sprite.x + pCannon.sprite.image.width*pCannon.sprite.scaleX*Math.cos(pCannon.sprite.orientation);
        this.sprite.y = pCannon.sprite.y + pCannon.sprite.image.width*pCannon.sprite.scaleX*Math.sin(pCannon.sprite.orientation);
        this.startX = this.sprite.x;
        this.startY = this.sprite.y;
        this.sprite.orientation = pCannon.sprite.orientation;
        this.sprite.displayOffsetX = -this.sprite.image.width*this.sprite.scaleX/2;
        this.sprite.displayOffsetY = -this.sprite.image.height*this.sprite.scaleY/2;
    }

    update(pCannon, dt){
        this.sprite.x = this.sprite.x + pCannon.speed*Math.cos(this.sprite.orientation)*dt;
        this.sprite.y = this.sprite.y + pCannon.speed*Math.sin(this.sprite.orientation)*dt;
    }

    draw(pCtx){
        this.sprite.draw(pCtx);
    }
}
