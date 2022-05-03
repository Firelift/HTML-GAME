class EnemyWave {
    constructor(){
        this.listEnemy = [];
    }

    addEnemy(pType = 1, pLevel = 1){
        let new_enemy;
        if (pType == 1){
            new_enemy = new Whale();
        }
        if (pType == 2){
            new_enemy = new Shark();
        }
        if (pType == 3){
            new_enemy = new Barrel1();
        }
        if (pType == 4) {
            new_enemy = new Barrel2();
        }
        if (pType == 5){
            new_enemy = new Pirate();
        }
        new_enemy.level = pLevel;
        new_enemy.load(pLevel);

        if (this.listEnemy.length > 0){
            for(let n=0; n<this.listEnemy.length; n++){
                let enemy = this.listEnemy[n];
                if (new_enemy.sprite.x > enemy.sprite.x - enemy.sprite.image.width*enemy.sprite.scaleX/(2*enemy.sprite.image.column) &&
                new_enemy.sprite.x < enemy.sprite.x + enemy.sprite.image.width*enemy.sprite.scaleX/(2*enemy.sprite.image.column)){
                    new_enemy.load();
                    n = 0;
                }
            }
        } 
        this.listEnemy.push(new_enemy);
    }

    getListEnemy(){
        return this.listEnemy;
    }
}

class Enemy {
    constructor() {
        this.collide = false;
        this.dead = false;
        this.onScreen = true;
        this.healthBar = null;
        this.particleEmitter = new ParticleEmitter();
        this.level = 1;
        this.newLife = null;
        this.damaged = false;
    }

    load(){
        this.sprite.x = getRandomInt(this.sprite.image.width*this.sprite.scaleX/2, canvas.width - this.sprite.image.width*this.sprite.scaleX/2);
        this.sprite.y = -this.sprite.image.height*this.sprite.scaleY;
        this.newLife = this.maxLife;

        this.imageOffset();
    }

    imageOffset(){
        this.sprite.displayOffsetX = (-this.sprite.image.width*this.sprite.scaleX)/(this.sprite.image.column*2);
        this.sprite.displayOffsetY = (-this.sprite.image.height*this.sprite.scaleY)/(this.sprite.image.line*2);  
    }

    manageHealthBar(){
        if (this.healthBar!=null){
            //Position health bar
            this.healthBar.x = this.sprite.x - this.healthBar.maxWidth/2;
            this.healthBar.y = this.sprite.y - this.sprite.image.height*this.sprite.scaleY/2 - 20;
            //Update health bar
            if (this.currentLife >= 0) {
                this.healthBar.width = (this.currentLife/this.maxLife)*this.healthBar.maxWidth;
            }
            if (this.currentLife <= 0) {
                this.healthBar = null;
            }
        }
    }

    applyDamage(){
        if (this.currentLife > this.newLife + dt){
            this.currentLife -= (40000*dt)/1000;
        }else{
            this.currentLife = this.newLife;
            this.damaged = false;
        }
    }
    
    update(dt){
        //Play Animation Enemy
        if (this.sprite.currentAnimation != null){
            this.sprite.playAnimation(dt); 
        }  
        if (this.damaged){
            this.applyDamage();
        }
        this.manageHealthBar();
    }

    collisionManagerCannonBall(pCannon){
        pCannon.listCannonBall.forEach(cannonBall=>{
            let xC = cannonBall.sprite.x + (cannonBall.sprite.image.width*cannonBall.sprite.scaleX/2)*Math.cos(cannonBall.sprite.orientation);
            let yC = cannonBall.sprite.y + (cannonBall.sprite.image.width*cannonBall.sprite.scaleX/2)*Math.sin(cannonBall.sprite.orientation);
            if (xC < this.sprite.x - this.sprite.image.width*this.sprite.scaleX/2
            || xC > this.sprite.x + this.sprite.image.width*this.sprite.scaleX/2
            || yC < this.sprite.y - this.sprite.image.height*this.sprite.scaleY/2
            || yC > this.sprite.y + this.sprite.image.height*this.sprite.scaleY/2){

            }else{
                let index = pCannon.listCannonBall.indexOf(cannonBall);
                pCannon.listCannonBall.splice(index,1);
                this.damaged = true;
                this.newLife -= cannonBall.damage;
                this.particleEmitter.addParticle(2, getRandomInt(25, 50), xC, yC);
                sceneManager.listScene["INGAME"].listParticleEmitter.push(this.particleEmitter);
            }
        }) 
    }

    collisionManagerProjectile(pListProjectile){
        pListProjectile.forEach(projectile=>{
            let xC = projectile.sprite.x + (projectile.sprite.image.width*projectile.sprite.scaleX/2)*Math.cos(projectile.sprite.orientation);
            let yC = projectile.sprite.y + (projectile.sprite.image.width*projectile.sprite.scaleX/2)*Math.sin(projectile.sprite.orientation);
            if (xC < this.sprite.x - this.sprite.image.width*this.sprite.scaleX/2
            || xC > this.sprite.x + this.sprite.image.width*this.sprite.scaleX/2
            || yC < this.sprite.y - this.sprite.image.height*this.sprite.scaleY/2
            || yC > this.sprite.y + this.sprite.image.height*this.sprite.scaleY/2){

            }else{
                this.particleEmitter.addParticle(2, getRandomInt(25, 50), xC, yC);
                sceneManager.listScene["INGAME"].listParticleEmitter.push(this.particleEmitter);
                projectile.collide = true;
                this.damaged = true;
                this.newLife -= projectile.damage;
            }
        }) 
    }

    draw(pCtx){
        if (this.sprite.image != null){
            this.sprite.draw(pCtx);
        }      
        if (this.healthBar!=null && sceneManager.currentScene != sceneManager.listScene["GAMEOVER"]){
            this.healthBar.draw(pCtx);
        }
    }
}

class Whale extends Enemy{
    constructor(){
        super();
        this.type = 1;
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/enemy1.png"));
        this.sprite.scaleX = 0.75;
        this.sprite.scaleY = 0.75;
        this.maxLife = 40;
        this.currentLife = this.maxLife;
        this.damage = 20;
        this.speed = 75;
        this.state = "calm";
    }

    load(){
        super.load();
        this.healthBar = new HealthBar(this.sprite.x, this.sprite.y, this.maxLife);
    }

    stateManager(pBoat){
        if (pBoat != null){
            if (this.sprite.y > pBoat.sprite.y - pBoat.sprite.image.width*pBoat.sprite.scaleX/2 
            && this.sprite.y < pBoat.sprite.y + pBoat.sprite.image.width*pBoat.sprite.scaleX/2){
                this.state = "angry";
            }
            else{
                this.state = "calm";
            }
        }else{
            this.state = "calm";
        }
           
    }

    update(pBoat, dt){
        super.update(dt);
        if (this.state == "calm"){
            this.speed = 100;
            this.sprite.y += this.speed*dt;
                if (this.sprite.orientation < 0){
                    this.turnRight();  
                }

                if (this.sprite.orientation > 0){
                    this.turnLeft();  
                }
        }
        if (this.state == "angry" && pBoat != null){
            this.speed = 150;
            this.sprite.y += background.speed*dt;
            if (this.sprite.x < pBoat.sprite.x - pBoat.sprite.image.height*pBoat.sprite.scaleY/2 - this.sprite.image.width*this.sprite.scaleX/2){
                this.sprite.x += this.speed*dt; 
                if (this.sprite.orientation >= -Math.PI/2){
                    this.turnLeft();   
                }
            }
            if (this.sprite.x > pBoat.sprite.x + pBoat.sprite.image.height*pBoat.sprite.scaleY/2 + this.sprite.image.width*this.sprite.scaleX/2){
                this.sprite.x -= this.speed*dt; 
                if (this.sprite.orientation <= Math.PI/2){
                    this.turnRight();  
                }
            }
        }
        if ((this.currentLife <= 0 || this.collide) && !this.dead){
                this.dead = true;
        }
        if (this.sprite.image != null){
            if (this.sprite.y > canvas.height + this.sprite.image.height*this.sprite.scaleY/2 && !this.dead){
                this.dead = true;
            }
        }
    }

    collisionManagerBoat(pBoat){
        if (BoatCollisionManager_RotatingSprite(this.sprite, pBoat.sprite, this.sprite.image.width - 15, this.sprite.image.height - 15)){
            let xCollision = this.sprite.x - this.sprite.image.height*this.sprite.scaleY/2*Math.sin(this.sprite.orientation);
            let yCollision = this.sprite.y + this.sprite.image.height*this.sprite.scaleY/2*Math.cos(this.sprite.orientation);
            pBoat.life -= this.damage;
            this.collide = true;
            this.particleEmitter.addParticle(2, getRandomInt(25, 50), xCollision, yCollision);
            sceneManager.listScene["INGAME"].listParticleEmitter.push(this.particleEmitter);
            pBoat.particleEmitter.addParticle(3, getRandomInt(25, 50), xCollision, yCollision);
            sceneManager.listScene["INGAME"].listParticleEmitter.push(pBoat.particleEmitter);
        }
    }

    turnLeft(pSpeed = 1){
        this.sprite.orientation -= pSpeed*dt
    }

    turnRight(pSpeed = 1){
        this.sprite.orientation += pSpeed*dt
    }
}

class Shark extends Enemy{
    constructor(){
        super();
        this.type = 2;
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/enemy2.png"), true);
        this.sprite.scaleX = 1.5;
        this.sprite.scaleY = 1.5;
        this.maxLife = 20;
        this.currentLife = this.maxLife;
        this.damage = 5;
        this.speed = 75;
        this.state = "calm"
        this.distanceDetection = 200;
    }

    load(){
        this.sprite.setTileSize(33,62);
        this.sprite.addAnimation("shark", [0,1], 1, true);
        this.sprite.startAnimation("shark");
        super.load();
        this.healthBar = new HealthBar(this.sprite.x, this.sprite.y, this.maxLife);
    }

    stateManager(pBoat){
        if (pBoat != null){
            if (distance(this.sprite, pBoat.sprite) < this.distanceDetection){
                this.state = "angry";
            }else{
                this.state = "calm";
            }
        }else{
            this.state = "calm";
        }
    }

    update(pBoat, dt){
        super.update(dt);
        if (this.state == "calm"){
            this.speed = 100;
            this.sprite.y += this.speed*dt;
        }
        if (this.state == "angry" && pBoat != null){
            this.speed = 150;
            if (this.sprite.x < pBoat.sprite.x){
                this.sprite.orientation = -Math.PI/2 + direction(this.sprite, pBoat.sprite); 
                this.sprite.x -= this.speed*dt*Math.sin(this.sprite.orientation);
                this.sprite.y += this.speed*dt*Math.cos(this.sprite.orientation);
            }
            if (this.sprite.x > pBoat.sprite.x){
                this.sprite.orientation = Math.PI/2 + direction(this.sprite, pBoat.sprite); 
                this.sprite.x -= this.speed*dt*Math.sin(this.sprite.orientation);
                this.sprite.y += this.speed*dt*Math.cos(this.sprite.orientation);
            } 
        }
        if (this.sprite.image != null){
            if (this.sprite.y > canvas.height + this.sprite.image.height*this.sprite.scaleY/2 && !this.dead){
                this.dead = true;
            }
        }
            
        if ((this.currentLife <= 0 || this.collide) && !this.dead){
                this.dead = true;
        }
        
    }

    collisionManagerBoat(pBoat){
        let xCollision = this.sprite.x - (this.sprite.image.height*this.sprite.scaleY/(2*this.sprite.image.column))*Math.sin(this.sprite.orientation);
        let yCollision = this.sprite.y + (this.sprite.image.height*this.sprite.scaleY/(2*this.sprite.image.line))*Math.cos(this.sprite.orientation);
        if (xCollision < pBoat.sprite.x + pBoat.sprite.image.height*pBoat.sprite.scaleY/2 &&
        xCollision > pBoat.sprite.x - pBoat.sprite.image.height*pBoat.sprite.scaleY/2 &&
        yCollision < pBoat.sprite.y + pBoat.sprite.image.width*pBoat.sprite.scaleX/2 &&
        yCollision > pBoat.sprite.y - pBoat.sprite.image.width*pBoat.sprite.scaleX/2){
            pBoat.life -= this.damage;
            this.collide = true;
            this.particleEmitter.addParticle(2, getRandomInt(25, 50), xCollision, yCollision);
            sceneManager.listScene["INGAME"].listParticleEmitter.push(this.particleEmitter);
            pBoat.particleEmitter.addParticle(3, getRandomInt(25, 50), xCollision, yCollision);
            sceneManager.listScene["INGAME"].listParticleEmitter.push(pBoat.particleEmitter);
        }
    }
}

class Barrel extends Enemy{
    constructor(){
        super();
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/barrel.png"), false);
        this.maxLife = 10;
        this.currentLife = this.maxLife;
        this.speed = 50;
        this.rotationSpeed = 0.5;
        this.nProjectileMin = 2;
        this.nProjectileMax = 6;
        this.nProjectile = getRandomInt(this.nProjectileMin,this.nProjectileMax);
        this.listProjectile = [];
        this.explose = false;
        this.startExplosion = false;
        this.endExplosion = false;
        this.broken = false;
    }

    load(){
        super.load();
        this.healthBar = new HealthBar(this.sprite.x, this.sprite.y, this.maxLife);
    }

    stateManager(pBoat){

    }

    collisionManagerBoat(pBoat){
        if (BoatCollisionManager_RotatingSprite(this.sprite, pBoat.sprite, this.sprite.image.width - 15, this.sprite.image.height - 15) && !this.startExplosion) {
            this.startExplosion = true;
            this.damaged = true;
            this.newLife = 0;
            this.explose = true;
        }
        this.listProjectile.forEach(projectile =>{
            projectile.collisionManagerBoat(pBoat);
        })
        this.listProjectile = this.listProjectile.filter(projectile => !projectile.collide);
    }

    collisionManagerCannonBall(pCannon){
        if (!this.explose){
            let distanceCollision = this.sprite.image.width*this.sprite.scaleX;
            pCannon.listCannonBall.forEach(cannonBall=>{
                if (distance(cannonBall.sprite, this.sprite) < distanceCollision){
                    let index = pCannon.listCannonBall.indexOf(cannonBall);
                    pCannon.listCannonBall.splice(index,1);
                    this.damaged = true;
                    this.newLife -= cannonBall.damage;
                }
            })
        }  
    }

    collisionManagerProjectile(pListProjectile){
        if (!this.explose) {
            let distanceCollision = this.sprite.image.width*this.sprite.scaleX;
            pListProjectile.forEach(projectile=>{
            if (distance(projectile.sprite, this.sprite) < distanceCollision){
                projectile.collide = true;
                this.damaged = true;
                this.newLife -= projectile.damage;
            }
            })
        } 
    }

    update(pBoat, dt){
        super.update(dt);
        this.sprite.y += this.speed*dt;
        if (!this.explose){
            this.sprite.orientation += this.rotationSpeed*dt;
        }
        if (this.explose && !this.endExplosion){
            let orientation = this.sprite.orientation;
            this.sprite = new Sprite(imageLoader.getImageLoaded("images/barrel_broken.png"), false, this.sprite.x, this.sprite.y); 
            this.sprite.orientation = orientation;
            this.imageOffset();
            for(let n=1; n<=this.nProjectile; n++){
                let new_projectile = new BarrelProjectile(this);
                this.listProjectile.push(new_projectile); 
                sceneManager.currentScene.listProjectileInGame.push(new_projectile);
            }
            this.particleEmitter.addParticle(1, getRandomInt(100, 100), this.sprite.x, this.sprite.y);
            sceneManager.currentScene.listParticleEmitter.push(this.particleEmitter);
            this.endExplosion = true;
        }

        if (this.listProjectile.length > 0){
            this.listProjectile.forEach(projectile =>{
                projectile.update(dt);
            })
            this.listProjectile = this.listProjectile.filter(projectile => !projectile.collide);
            this.listProjectile = this.listProjectile.filter(projectile => projectile.onScreen);
        }
        
        if (this.listProjectile.length == 0 && this.explose && !this.onScreen && !this.dead){
            this.dead = true;
        }
    }

    draw(pCtx){
        super.draw(pCtx);
        this.listProjectile.forEach(projectile =>{
                projectile.draw(pCtx);
        })
    }
}

class Barrel1 extends Barrel{
    constructor(){
        super();
        this.type = 3;
        this.damage = 10;
    }

    update(pBoat, dt){
        super.update(pBoat, dt);
        if (this.sprite.y > canvas.height + this.sprite.image.height*this.sprite.scaleY/2){
            this.onScreen = false;
        }
        if (this.currentLife <= 0 && !this.startExplosion){
            this.startExplosion = true;
            this.explose = true;
        }
    }
}

class Barrel2 extends Barrel{
    constructor(){
        super();
        this.type = 4;
        this.damage = 10;
        this.explosionPosY = getRandomInt(this.sprite.image.height*this.sprite.scaleY/2, canvas.height - this.sprite.image.height*this.sprite.scaleY/2);
    }

    load(){
        super.load();
       
    }

    update(pBoat, dt){
        super.update(pBoat, dt);
        if ((this.sprite.y >= this.explosionPosY || this.currentLife <= 0) && !this.startExplosion){
            this.currentLife = 0;
            this.startExplosion = true;
            this.explose = true;
        }
    }
}

class Pirate extends Enemy{
    constructor(){
        super();
        this.type = 5;
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/enemy3.png"), false);
        this.sprite.scaleX = 0.1;
        this.sprite.scaleY = 0.1;
        this.sprite.orientation = Math.PI/2;
        this.maxLife = 40;
        this.currentLife = this.maxLife;
        this.damage = 15;
        this.speed = 75;
        this.state = "calm"
        this.distanceTir = getRandomInt(this.sprite.image.width*this.sprite.scaleX/2 + 30, this.sprite.image.width*this.sprite.scaleX/2 + 100);
        this.directionX = null;
        this.previousX = null;
        this.startTurn = false;
        this.startAngle = this.sprite.orientation;
        this.turnLeft = false;
        this.turnRight = false;
        this.angleRotation = null;
        this.listCannon = [];
        this.selfGuidedCannonBall = false;
    }

    createCannon(pX, pY, pIsMoving = false, angle = -Math.PI/2, pSpeed = 200){
        let imgCannon = imageLoader.getImageLoaded("images/cannon1.png");
        let cannon = new Cannon(imgCannon, pIsMoving, pX, pY);
        cannon.sprite.orientation = angle;
        cannon.setSpeed(pSpeed);
        this.listCannon.push(cannon); 
    }

    load(){
        this.sprite.x = getRandomInt(this.sprite.image.height*this.sprite.scaleY/2, canvas.width - this.sprite.image.height*this.sprite.scaleY/2);
        this.sprite.y = -this.sprite.image.width*this.sprite.scaleX;
        this.imageOffset();
        this.healthBar = new HealthBar(this.sprite.x, this.sprite.y, this.maxLife);

        if (this.level == 1){
            this.createCannon(-2, 30, false, 0, 100);
        }
        if (this.level == 2){
            this.createCannon(-2, 30, false, 0, 150);
        }
        if (this.level == 3){
            this.createCannon(-2, 30, false, 0, 200);
        }
        if (this.level == 4){
            this.createCannon(-2, 30, false, 0, 250);
        }
        this.listCannon.forEach(cannon=>{
            cannon.load();
            cannon.sprite.setScale(0.2,0.2);
        })
    }

    manageHealthBar(){
        if (this.healthBar!=null){
            //Position health bar
            this.healthBar.x = this.sprite.x - this.healthBar.maxWidth/2;
            this.healthBar.y = this.sprite.y - this.sprite.image.width*this.sprite.scaleY/2 - 20;
            //Update health bar
            if (this.currentLife >= 0) {
                this.healthBar.width = (this.currentLife/this.maxLife)*this.healthBar.maxWidth;
            }
            if (this.currentLife <= 0) {
                this.healthBar = null;
            }
        }
    }

    turn(pSens){
        if (pSens == "left"){
            this.sprite.orientation -= dt;
        }else{
            this.sprite.orientation += dt;
        }
    }

    update(pBoat, dt){
        super.update(dt);
        this.manageHealthBar();
        if (this.state == "calm"){
            this.sprite.y += this.speed*dt;
        }
        if (this.state == "angry"){
            //update posX
            this.sprite.x += this.speed*dt*this.directionX
            if (this.sprite.x < this.sprite.image.width*this.sprite.scaleX/2){
                this.directionX *= -1;
                this.sprite.x = this.sprite.image.width*this.sprite.scaleX/2;
                this.sprite.orientation = -Math.PI;
                this.startTurn = true;
                this.angleRotation = Math.PI;
                let sensRotationX = getOneOrMinusOne();
                if (sensRotationX == -1){
                    this.turnRight = true;
                    this.turnLeft = false;
                }else{
                    this.turnLeft = true;
                    this.turnRight = false;
                }
            }
            if (this.sprite.x > canvas.width - this.sprite.image.width*this.sprite.scaleX/2){
                this.directionX *= -1;
                this.sprite.x = canvas.width - this.sprite.image.width*this.sprite.scaleX/2;
                this.sprite.orientation = 0;
                this.startTurn = true;
                this.angleRotation = Math.PI;
                let sensRotationX = getOneOrMinusOne();
                if (sensRotationX == -1){
                    this.turnRight = true;
                    this.turnLeft = false;
                }else{
                    this.turnLeft = true;
                    this.turnRight = false;
                }
            }
            //update orientation
            if (this.startTurn){
                this.startAngle = this.sprite.orientation;
                this.startTurn = false;
            }else{
                if (this.turnLeft){
                    this.turn("left");
                }
                if (this.turnRight){
                    this.turn("right");
                }
                if (Math.abs(this.startAngle - this.sprite.orientation) >= this.angleRotation){
                    this.turnLeft = false;
                    this.turnRight = false;
                }
            }       
        }
        if (this.state == "dead" || this.state == "angry"){
            //Shoot && update cannonBall
            this.listCannon.forEach(cannon=> {
                if (pBoat != null){
                    this.collisionManagerCannonBall(cannon, pBoat);
                    if (this.state == "angry"){
                        cannon.shootCannonBallAuto();
                    }
                }
                cannon.removeCannonBallEnnemy();
                if (cannon.listCannonBall.length > 0){
                    cannon.listCannonBall.forEach(cannonBall =>{
                        cannonBall.update(cannon, dt);
                    })
                }
            }) 
            if (this.state == "dead"){
                if (this.removePirate() && !this.dead) {
                    this.dead = true;
                 }
            }
        }
        if (this.state == "calm" || this.state == "angry"){
            this.stateManager(); 
            this.collisionManagerProjectile(sceneManager.listScene["INGAME"].listProjectileInGame);
            if (pBoat != null){
                this.collisionManagerBoat(pBoat);
                pBoat.listCannon.forEach(cannon =>{
                this.collisionManagerCannonBallBoat(cannon);
                })
            }
            //update cannon
            this.listCannon.forEach(cannon=> {
                cannon.sprite.x = this.sprite.x +  Math.sqrt(cannon.x*cannon.x + cannon.y*cannon.y)*Math.cos(this.sprite.orientation);
                cannon.sprite.y = this.sprite.y + Math.sqrt(cannon.x*cannon.x + cannon.y*cannon.y)*Math.sin(this.sprite.orientation);
                if (pBoat != null){
                    if (cannon.sprite.x < pBoat.sprite.x){
                        cannon.sprite.orientation = direction(cannon.sprite, pBoat.sprite); 
                    }
                    if (cannon.sprite.x > pBoat.sprite.x){
                        cannon.sprite.orientation = Math.PI + direction(cannon.sprite, pBoat.sprite); 
                    } 
                }else{
                    cannon.sprite.orientation = this.sprite.orientation; 
                }   
            })
            if (this.currentLife <= 0 && this.state != "dead"){
                this.particleEmitter.addParticle(1, getRandomInt(100,125), this.sprite.x, this.sprite.y);
                sceneManager.listScene["INGAME"].listParticleEmitter.push(this.particleEmitter);
                this.state = "dead";
            }
        }
    }

    removePirate(){
        let n = 0;
        this.listCannon.forEach(cannon=>{
            if (cannon.listCannonBall.length == 0){
                n += 1;
            }
        })
        if (n == this.listCannon.length){
            return true;
        }else{ return false; }
    }

    stateManager(){
            if (this.sprite.y >= this.distanceTir && this.state == "calm"){
                this.state = "angry"
                this.directionX = getOneOrMinusOne();
                this.startTurn = true;
                this.angleRotation = Math.PI/2;
                if (this.directionX == -1){
                    this.turnRight = true;
                }else{
                    this.turnLeft = true;
                }
            }
    }

    collisionManagerCannonBallBoat(pCannon){
        pCannon.listCannonBall.forEach(cannonBall=>{
            let xC = cannonBall.sprite.x + (cannonBall.sprite.image.width*cannonBall.sprite.scaleX/2)*Math.cos(cannonBall.sprite.orientation);
            let yC = cannonBall.sprite.y + (cannonBall.sprite.image.width*cannonBall.sprite.scaleX/2)*Math.sin(cannonBall.sprite.orientation);
            if (xC < this.sprite.x - this.sprite.image.width*this.sprite.scaleX/2
            || xC > this.sprite.x + this.sprite.image.width*this.sprite.scaleX/2
            || yC < this.sprite.y - this.sprite.image.height*this.sprite.scaleY/2
            || yC > this.sprite.y + this.sprite.image.height*this.sprite.scaleY/2){

            }else{
                let index = pCannon.listCannonBall.indexOf(cannonBall);
                pCannon.listCannonBall.splice(index,1);
                this.damaged = true;
                this.newLife -= cannonBall.damage;
                this.particleEmitter.addParticle(3, getRandomInt(25, 50), xC, yC);
                sceneManager.listScene["INGAME"].listParticleEmitter.push(this.particleEmitter);
            }
        }) 
    }

    collisionManagerCannonBall(pCannon, pBoat){
        if (pCannon.listCannonBall.length > 0){
            pCannon.listCannonBall.forEach(cannonBall=>{
                let xC = cannonBall.sprite.x;
                let yC = cannonBall.sprite.y;
                if (xC < pBoat.sprite.x - pBoat.sprite.image.height*pBoat.sprite.scaleY/2
                || xC > pBoat.sprite.x + pBoat.sprite.image.height*pBoat.sprite.scaleY/2
                || yC < pBoat.sprite.y - pBoat.sprite.image.width*pBoat.sprite.scaleX/2
                || yC > pBoat.sprite.y + pBoat.sprite.image.width*pBoat.sprite.scaleX/2){

                }else{
                    pBoat.particleEmitter.addParticle(3, getRandomInt(25, 50), xC, yC);
                    sceneManager.listScene["INGAME"].listParticleEmitter.push(pBoat.particleEmitter);
                    let indexCannonBall = pCannon.listCannonBall.indexOf(cannonBall);
                    pCannon.listCannonBall.splice(indexCannonBall, 1);
                    pBoat.life -= cannonBall.damage;
                }
            })   
        }
    }

    collisionManagerProjectile(pListProjectile){
        pListProjectile.forEach(projectile=>{
            let xC = projectile.sprite.x + (projectile.sprite.image.width*projectile.sprite.scaleX/2)*Math.cos(projectile.sprite.orientation);
            let yC = projectile.sprite.y + (projectile.sprite.image.width*projectile.sprite.scaleX/2)*Math.sin(projectile.sprite.orientation);
            if (xC < this.sprite.x - this.sprite.image.width*this.sprite.scaleX/2
            || xC > this.sprite.x + this.sprite.image.width*this.sprite.scaleX/2
            || yC < this.sprite.y - this.sprite.image.height*this.sprite.scaleY/2
            || yC > this.sprite.y + this.sprite.image.height*this.sprite.scaleY/2){

            }else{
                this.particleEmitter.addParticle(3, getRandomInt(25, 50), xC, yC);
                sceneManager.listScene["INGAME"].listParticleEmitter.push(this.particleEmitter);
                projectile.collide = true;
                this.damaged = true;
                this.newLife -= projectile.damage;
            }
        }) 
    }

    collisionManagerBoat(pBoat){
        if (BoatCollisionManager_RotatingSprite(this.sprite, pBoat.sprite, this.sprite.image.width - 15, this.sprite.image.height - 15)){
            let xCollision = this.sprite.x - this.sprite.image.height*this.sprite.scaleY/2*Math.sin(this.sprite.orientation);
            let yCollision = this.sprite.y + this.sprite.image.height*this.sprite.scaleY/2*Math.cos(this.sprite.orientation);
            pBoat.life -= this.damage;
            this.damaged = true;
            this.newLife = 0;
            pBoat.particleEmitter.addParticle(3, getRandomInt(25, 50), xCollision, yCollision);
            sceneManager.listScene["INGAME"].listParticleEmitter.push(pBoat.particleEmitter);
        }
    }

    draw(pCtx){
        if (this.state == "dead"){
            this.listCannon.forEach(cannon=>{
                cannon.listCannonBall.forEach(cannonBall=>{
                    cannonBall.draw(pCtx);
                })
            })
        }else{
            super.draw(pCtx);
            this.listCannon.forEach(cannon=>{
                cannon.draw(pCtx);
            })
        }
        
    }
}

class BarrelProjectile{
    constructor(pBarrel){
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/projectile_barrel.png"), false);
        this.sprite.x = pBarrel.sprite.x;
        this.sprite.y = pBarrel.sprite.y;
        this.sprite.displayOffsetX = (-this.sprite.image.width*this.sprite.scaleX)/(this.sprite.image.column*2);
        this.sprite.displayOffsetY = (-this.sprite.image.height*this.sprite.scaleY)/(this.sprite.image.line*2);  
        this.sprite.orientation = Math.random()*2*Math.PI;
        this.speed = 200;
        this.damage = 10;
        this.diameter = this.sprite.image.width;
        this.collide = false;
        this.onScreen = true;
    }

    collisionManagerBoat(pBoat){
        let xCollision = this.sprite.x + (this.diameter/2)*Math.cos(this.sprite.orientation);
        let yCollision = this.sprite.y + (this.diameter/2)*Math.sin(this.sprite.orientation);
        if (xCollision < pBoat.sprite.x - pBoat.sprite.image.height*pBoat.sprite.scaleY/2 ||
        xCollision > pBoat.sprite.x + pBoat.sprite.image.height*pBoat.sprite.scaleY/2 ||
        yCollision < pBoat.sprite.y - pBoat.sprite.image.width*pBoat.sprite.scaleX/2 ||
        yCollision > pBoat.sprite.y + pBoat.sprite.image.width*pBoat.sprite.scaleX/2){

        }else{
            pBoat.life -= this.damage;
            this.collide = true;
            pBoat.particleEmitter.addParticle(3, getRandomInt(25, 50), xCollision, yCollision);
            sceneManager.listScene["INGAME"].listParticleEmitter.push(pBoat.particleEmitter);
        }
    }

    update(dt){
        this.sprite.x += this.speed*Math.cos(this.sprite.orientation)*dt;
        this.sprite.y += this.speed*Math.sin(this.sprite.orientation)*dt;

        if (this.sprite.x < - this.sprite.image.width*this.sprite.scaleX/2 ||
        this.sprite.x > canvas.width + this.sprite.image.width*this.sprite.scaleX/2 ||
        this.sprite.y < - this.sprite.image.height*this.sprite.scaleY/2 ||
        this.sprite.y > canvas.height + this.sprite.image.height*this.sprite.scaleY/2)
        { this.onScreen = false; }
    }

    draw(pCtx){
        this.sprite.draw(pCtx);
    }
}
