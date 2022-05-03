class Particle{
    constructor(pType, pX, pY){
        this.type = pType;
        this.x = pX;
        this.y = pY;
        this.speedX = null;
        this.speedY = null;
        this.orientation = null;
        this.radius = null;
        this.lifeTime = null;
        this.dead = false;
        this.color = null; 
        this.listColor = null;
    }

    load(){
        //Particle for barrel  explosion
        if (this.type == 1){
            this.x = this.x + getRandomFloat(-1000 , 1000)/100;
            this.y = this.y + getRandomFloat(-1000 , 1000)/100;
            this.speedX = getRandomFloat(5000 , 10000)/100;
            this.speedY = getRandomFloat(5000 , 10000)/100;
            this.orientation = Math.random()*(2*Math.PI*100)/100;
            this.radius = getRandomFloat(1 , 3);
            this.lifeTime = getRandomFloat(100 , 150)/100; 
            this.listColor = ["yellow", "orange","red"];
        }
        //Particle when the ennemy is injured
        if (this.type == 2){
            this.x = this.x + getRandomFloat(-1000 , 1000)/100;
            this.y = this.y + getRandomFloat(-1000 , 1000)/100;
            this.speedX = getRandomFloat(5000 , 10000)/100;
            this.speedY = getRandomFloat(5000 , 10000)/100;
            this.orientation = Math.random()*(2*Math.PI*100)/100;
            this.radius = getRandomFloat(1 , 3);
            this.lifeTime = getRandomFloat(80 , 100)/100; 
            this.listColor = ["red", "darkred","crimson"];
        }
        //Particle when the boat is damaged
        if (this.type == 3){
            this.x = this.x + getRandomFloat(-1000 , 1000)/100;
            this.y = this.y + getRandomFloat(-1000 , 1000)/100;
            this.speedX = getRandomFloat(5000 , 10000)/100;
            this.speedY = getRandomFloat(5000 , 10000)/100;
            this.orientation = Math.random()*(2*Math.PI*100)/100;
            this.radius = getRandomFloat(1 , 3);
            this.lifeTime = getRandomFloat(25 , 50)/100; 
            this.listColor = ["peru", "sienna", "saddlebrown"];
        }
        //Particle when the boat explose
        if (this.type == 4){
            this.x = this.x + getRandomFloat(-1000 , 1000)/100;
            this.y = this.y + getRandomFloat(-1000 , 1000)/100;
            this.speedX = getRandomFloat(5000 , 10000)/100;
            this.speedY = getRandomFloat(5000 , 10000)/100;
            this.orientation = Math.random()*(2*Math.PI*100)/100;
            this.radius = getRandomFloat(1 , 3);
            this.lifeTime = getRandomFloat(250 , 300)/100; 
            this.listColor = ["yellow", "orange","red"];
        }
        
    }

    update(dt){
        this.lifeTime -= dt;
        if (this.lifeTime <= 0){
            this.dead = true;
        }
        this.x += this.speedX*Math.cos(this.orientation)*dt;
        this.y += this.speedY*Math.sin(this.orientation)*dt;

        if (this.radius > 0){
            this.radius -= dt;
        }else{
            this.radius = 0;
        }
        
    }

    draw(pCtx){
        if (this.type == 1 || this.type == 2 || this.type == 3 || this.type == 4){
            pCtx.beginPath();
            pCtx.strokeStyle = this.color;
            if (this.radius > 0){
                pCtx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
            }
            pCtx.fillStyle = this.color;
            pCtx.fill();
            pCtx.stroke();
        } 
    }
}

class ParticleEmitter{
    constructor(){
        this.listParticle = [];
    }

    addParticle(pType, pN, pX, pY){
        for(let n=1; n<=pN; n++){
            let particle = new Particle(pType, pX, pY);
            particle.load();
            particle.color = particle.listColor[getRandomInt(0,particle.listColor.length - 1)];
            this.listParticle.push(particle);
        }
    }

    update(dt){
        this.listParticle.forEach(particle =>{
            particle.update(dt);
        })
    }

    draw(pCtx){
        this.listParticle.forEach(particle =>{
            particle.draw(pCtx);
        })
        this.listParticle = this.listParticle.filter(particle => !particle.dead);
    }
}