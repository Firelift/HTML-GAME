class Ressource{
    constructor(){
        this.orientation = 0;
        this.collide = false;
        this.onScreen = true;
    }

    load(){
        this.sprite.x = Math.random()*(canvas.width - this.sprite.image.width - 10 - 10) + 10;
        this.sprite.y = -this.sprite.image.height

        this.sprite.displayOffsetX = (-this.sprite.image.width*this.sprite.scaleX)/(this.sprite.image.column*2);
        this.sprite.displayOffsetY = (-this.sprite.image.height*this.sprite.scaleY)/(this.sprite.image.line*2); 
    }

    collisionManager(pBoat){
        if (this.sprite.x - this.sprite.image.width*this.sprite.scaleX/(2*this.sprite.image.column) < pBoat.sprite.x - pBoat.sprite.image.height*pBoat.sprite.scaleY/2 ||
        this.sprite.x + this.sprite.image.width*this.sprite.scaleX/(2*this.sprite.image.column) > pBoat.sprite.x + pBoat.sprite.image.height*pBoat.sprite.scaleY/2 ||
        this.sprite.y - this.sprite.image.height*this.sprite.scaleY/(2*this.sprite.image.line) < pBoat.sprite.y - pBoat.sprite.image.width*pBoat.sprite.scaleX/2 ||
        this.sprite.y + this.sprite.image.height*this.sprite.scaleY/(2*this.sprite.image.line) > pBoat.sprite.y + pBoat.sprite.image.width*pBoat.sprite.scaleX/2){

        }else{ 
            this.collide = true;
            if (this.type == "crew"){
                pBoat.crew += 1;
            }
            else{
                if (this.type == "wood") {
                    pBoat.wood += 1;
                }else{
                    pBoat.steel += 1;
                }
            }
        }
    }

    update(dt){
        this.sprite.y += this.speed*dt;

        //Play ressource animation
        if (this.sprite.currentAnimation != null){
            this.sprite.playAnimation(dt);
        }
        //Check if ressource is on screen
        if (this.sprite.y - this.sprite.image.height*this.sprite.scaleY/2 > canvas.height){
            this.onScreen = false;
        }
    }

    draw(pCtx){
        this.sprite.draw(pCtx);
    }
}

class Crew extends Ressource{
    constructor(){
        super();
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/ressource_bottle.png"), false);
        this.type = "crew";
        this.amount = 1;
        this.speed = 250;
    }

    load(){
        super.load();
    }
}

class Wood extends Ressource{
    constructor(){
        super();
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/ressource_wood.png"), true);
        this.type = "wood";
        this.amount = 1;
        this.speed = 200;
    }

    load(){
        this.sprite.setTileSize(16,16);
        this.sprite.addAnimation("wood", [0,1,2,3], 2, true);
        this.sprite.startAnimation("wood");
        super.load();
    }
}

class Steel extends Ressource{
    constructor(){
        super();
        this.sprite = new Sprite(imageLoader.getImageLoaded("images/ressource_steel.png"), true);
        this.type = "steel";
        this.amount = 1;
        this.speed = 200;
    }

    load(){
        this.sprite.setTileSize(16,16);
        this.sprite.addAnimation("steel", [0,1,2,3], 2, true);
        this.sprite.startAnimation("steel");
        super.load();
    }
}