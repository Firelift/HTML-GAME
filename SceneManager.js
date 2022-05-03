class SceneManager{
    constructor(){
        this.listScene = [];
        this.currentScene = null;
        this.pause = false;
    }

    load(){
        //Load images INGAME scene
        imageLoader.add("images/eau1.jpg");
        imageLoader.add("images/eau2.jpg");

        imageLoader.add("images/pirate_ship.png");
        imageLoader.add("images/cannon1.png");
        imageLoader.add("images/cannonBall1.png");
        imageLoader.add("images/cannonBall2.png");
        imageLoader.add("images/cannonBall3.png");

        imageLoader.add("images/enemy1.png");
        imageLoader.add("images/enemy2.png");
        imageLoader.add("images/enemy3.png");
        imageLoader.add("images/barrel.png");
        imageLoader.add("images/barrel_broken.png");
        imageLoader.add("images/projectile_barrel.png");

        imageLoader.add("images/water_move1.png");
        imageLoader.add("images/cloud1.png");
        imageLoader.add("images/cloud2.png");
        imageLoader.add("images/cloud3.png");
        imageLoader.add("images/birds.png");

        imageLoader.add("images/ressource_bottle.png");
        imageLoader.add("images/ressource_wood.png");
        imageLoader.add("images/ressource_steel.png");

        imageLoader.add("images/life1.png");
        imageLoader.add("images/life2.png");
        imageLoader.add("images/life3.png");
        imageLoader.add("images/life4.png");
        imageLoader.add("images/interface_crew.png");
        imageLoader.add("images/interface_wood.png");
        imageLoader.add("images/interface_steel.png");
 
        //Load images PAUSE scene
        imageLoader.add("images/upgradeBox.png");

        imageLoader.add("images/upgrade_newboat_1.png");
        imageLoader.add("images/upgrade_cannonspeed_1.png");
        imageLoader.add("images/upgrade_cannonrange_1.png");
        imageLoader.add("images/upgrade_cannonball_1.png");
        imageLoader.add("images/upgrade_newboat_2.png");
        imageLoader.add("images/upgrade_cannonspeed_2.png");
        imageLoader.add("images/upgrade_cannonrange_2.png");
        imageLoader.add("images/upgrade_cannonball_2.png");
        imageLoader.add("images/upgrade_newboat_3.png");
        imageLoader.add("images/upgrade_cannonspeed_3.png");
        imageLoader.add("images/upgrade_cannonrange_3.png");
        imageLoader.add("images/upgrade_cannonball_3.png");
        imageLoader.add("images/upgrade_newboat_4.png");
        imageLoader.add("images/upgrade_cannonspeed_4.png");
        imageLoader.add("images/upgrade_cannonrange_4.png");
        imageLoader.add("images/upgrade_cannonball_4.png");
        imageLoader.add("images/upgrade_newboat_5.png");
        imageLoader.add("images/upgrade_cannonspeed_5.png");
        imageLoader.add("images/upgrade_cannonrange_5.png");
        imageLoader.add("images/upgrade_cannonball_5.png");

        //Load images PAUSE scene
        imageLoader.add("images/button_gameover.png");
        imageLoader.add("images/button_gameover_ishover.png");

        imageLoader.start(startScene);

        this.listScene["INGAME"] = new SceneInGame();
        this.listScene["PAUSE"] = new ScenePause();
        this.listScene["GAMEOVER"] = new SceneGameOver();

        //load musics
        let gameMusic = new Audio("musiques/main.mp3"); 
        this.addMusic(this.listScene["INGAME"], gameMusic, "main");
        this.addMusic(this.listScene["PAUSE"], gameMusic, "main");
        let gameOverMusic = new Audio("musiques/gameover.wav");
        this.addMusic(this.listScene["GAMEOVER"], gameOverMusic, "gameover");

        
    }

    addMusic(pScene, pMusic, pKey){
        if (pScene.listMusic != undefined)
        pScene.listMusic[pKey] = pMusic;
    }

    activeScene(pNameScene){
        this.currentScene = this.listScene[pNameScene];  
    }

    setListSprite(pScene){
        this.listScene[pScene].listSprite = sceneManager.currentScene.listSprite;
    }

    update(){
        // Pause/Unpause current scene
        if (this.currentScene == this.listScene["INGAME"] || this.currentScene == this.listScene["PAUSE"]){
            if (keyQ && !keyPressed) {
                keyPressed = true;
                if (!this.pause){
                    this.listScene["PAUSE"].init();
                    this.activeScene("PAUSE");
                    this.currentScene.activeMusic.volume = 0.3;
                    this.pause = true;

                }else{
                    this.activeScene("INGAME");
                    this.currentScene.activeMusic.volume = 1;
                    this.pause = false;
                }
            }   
            if (!keyQ){
                keyPressed = false;
            }
        }
        // Scene GAMEOVER
        if (boat != null){
            if (boat.life <= 0){
                this.currentScene.activeMusic.pause();
                this.currentScene.activeMusic.currentTime = 0;
                this.activeScene("GAMEOVER");
                let particleEmitter = new ParticleEmitter();
                particleEmitter.addParticle(4, getRandomInt(200, 250), boat.sprite.x, boat.sprite.y);
                this.currentScene.listParticleEmitter.push(particleEmitter);
                this.listScene["GAMEOVER"].load();
                boat = null;
            }
        }
    }
}

class SceneInGame{
    constructor(){
        this.listSprite = [];
        this.listProjectileInGame = [];
        this.listParticleEmitter = [];
        this.listMusic = [];
        this.activeMusic = null;
    }

    load(){
        this.listSprite = [];
        this.listProjectileInGame = [];
        this.listParticleEmitter = [];
        //Load Boat
        let imgBoat = imageLoader.getImageLoaded("images/pirate_ship.png");
        boat = new Boat(imgBoat, 400, 300);
        boat.load();
        this.listSprite.push(boat.sprite);
    
        //Load Background
        background = new Background();
        background.load();
        //Load environment
        environment = new Environment();
        environment.load();
        //Load first wave
        waveManager = new WaveManager();
        waveManager.loadWaveAttributes(waveManager.currentLevelWave); 
        //Load interface
        interfaceGame = new InterfaceGame();
        interfaceGame.load();
        
        this.activeMusic = this.listMusic["main"];
        this.activeMusic.play();
        this.activeMusic.loop = true;
    }

    update(dt){
        //Move background
        background.update(canvas, dt);
        //Move boat
        boat.update(canvas, dt);
        //Wave management
        waveManager.update(boat, dt); 
        //Play Animation
        this.listSprite.forEach(sprite =>{
            if (sprite.currentAnimation != null){
                sprite.playAnimation(dt); 
            }
        })
        //Remove sprite when the animation ended and no loop
        this.listSprite.forEach(sprite =>{
            if (sprite.currentAnimation != null){
                if (!sprite.currentAnimation.loop && sprite.currentAnimation.end){
                    let index = this.listSprite.indexOf(sprite);
                    this.listSprite.splice(index,1);
                }
            }
        })
        //Remove projectile in game
        if (this.listProjectileInGame.length > 0){
            this.listProjectileInGame = this.listProjectileInGame.filter(projectile => !projectile.collide);
            this.listProjectileInGame = this.listProjectileInGame.filter(projectile => projectile.onScreen);
        }
        //Manage environment
        environment.update(dt);

        interfaceGame.update(boat, dt);

        //update particle
        this.listParticleEmitter.forEach(particleEmitter=>{
            if (particleEmitter.listParticle.length == 0) {
                let index = this.listParticleEmitter.indexOf(particleEmitter);
                this.listParticleEmitter.splice(index, 1);
            }
            particleEmitter.update(dt); 
        })
    }

    draw(pCtx){
        pCtx.globalAlpha = 1;
        // Display Background
        background.draw(pCtx);
        this.listSprite.forEach(sprite => {
            if (sprite.image == imageLoader.getImageLoaded("images/water_move1.png")){
                sprite.draw(pCtx);
            }
        })
        // Display enemies/ressources
        waveManager.draw(pCtx);
        // Display boat and cannon
        this.listSprite.forEach(sprite => {
            if (sprite.image == imageLoader.getImageLoaded("images/pirate_ship.png") || sprite.image == imageLoader.getImageLoaded("images/cannon1.png")){
                boat.draw(pCtx);
            }
            else {
                if (sprite.image != imageLoader.getImageLoaded("images/water_move1.png")){
                    sprite.draw(pCtx);
                }
            }
        })
        //Display particles
        this.listParticleEmitter.forEach(particleEmitter=>{
            particleEmitter.draw(pCtx);
        })
        //Display environment
        environment.draw(pCtx);
        //Display interface
        interfaceGame.draw(pCtx, boat);
        pCtx.fillStyle = "white";
        pCtx.fillText("UPGRADES: KEY A", 10, canvas.height - 10);
    }    
}

class ScenePause{
    constructor(){
        this.listSprite = [];
        this.listSpritePause = [];
        this.buttonManager = new ButtonManager();
        this.borderSprite = new BorderSprite(15, imageLoader.getImageLoaded("images/upgradeBox.png"), true);
        this.listMusic = [];
        this.activeMusic = null;
    }

    load(){
        sceneManager.setListSprite("PAUSE"); 
        this.borderSprite.x = canvas.width/2 - this.borderSprite.image.width*this.borderSprite.scaleX/2;
        this.borderSprite.y = canvas.height/2 - this.borderSprite.image.height*this.borderSprite.scaleY/2
        this.borderSprite.setTileSize(this.borderSprite.image.width, this.borderSprite.image.height)
        this.listSpritePause.push(this.borderSprite);

        //load buttons
        this.buttonManager.loadButtonPauseScene(this.borderSprite);

        this.activeMusic = this.listMusic["main"];
    }

    init(){
        this.buttonManager.initButton();
    }

    update(dt){
        this.buttonManager.updateButtonPauseScene(boat);
    }

    draw(pCtx){
        // Display Background
        background.draw(pCtx);
        // Display enemies/ressources
        waveManager.draw(pCtx);
        // Display boat and cannon
        this.listSprite.forEach(sprite => {
            if (sprite.image == imageLoader.getImageLoaded("images/pirate_ship.png") || sprite.image == imageLoader.getImageLoaded("images/cannon1.png")){
                boat.draw(pCtx);
            }
            else {
            sprite.draw(pCtx);
            }
        })
        //Display environment
        environment.draw(pCtx);
        //Display interface
        interfaceGame.draw(pCtx, boat);

        //Display pause scene
        pCtx.globalAlpha = 0.5;
        pCtx.fillStyle = "black";
        pCtx.fillRect(0, 0, canvas.width, canvas.height);

        pCtx.globalAlpha = 1;
        this.listSpritePause.forEach(sprite => {
            sprite.draw(pCtx);
        })
        pCtx.fillStyle = "white";
        if (boat.currentLevel != boat.levelMax){
            pCtx.fillText("SELECT UPGRADES: KEY Q/D", canvas.width/2 - 150, canvas.height/2 - 100);  
        }
        pCtx.fillText("BACK TO THE GAME: KEY A", 10, canvas.height - 10);  
        
        this.buttonManager.drawButtonPauseScene(pCtx, this.borderSprite);

        if (boat.currentLevel == boat.levelMax){
            ctx.font = "70px Impact";
            let text = "ALL UPGRADES DONE!";
            let textWidth = pCtx.measureText(text).width;
            pCtx.fillText("ALL UPGRADES DONE!", 
            this.borderSprite.x + this.borderSprite.image.width*this.borderSprite.scaleX/2 - textWidth/2, 
            this.borderSprite.y + this.borderSprite.image.height*this.borderSprite.scaleY/2 + 25)
        }
    }
}

class SceneGameOver{
    constructor(){
        this.listSprite = [];
        this.listParticleEmitter = [];
        this.listProjectileInGame = [];
        this.buttonManager = new ButtonManager();
        this.playerInfo = new PlayerInfo();
        this.listMusic = [];
        this.activeMusic = null;
    }

    load(){
        this.listSprite = [];
        this.buttonManager = new ButtonManager();
        sceneManager.setListSprite("GAMEOVER");
        //load buttons
        this.buttonManager.loadButtonGameOverScene();
        //load player info
        this.playerInfo.load(boat);

        this.activeMusic = this.listMusic["gameover"];
        this.activeMusic.play();
    }

    update(dt){
        //Move background
        background.update(canvas, dt);
        //Manage environment
        environment.update(dt);
        //Wave management
        waveManager.update(boat, dt); 
        //update particle
        this.listParticleEmitter.forEach(particleEmitter=>{
            particleEmitter.update(dt); 
            if (particleEmitter.listParticle.length == 0) {
                let index = this.listParticleEmitter.indexOf(particleEmitter);
                this.listParticleEmitter.splice(index, 1);
            }
        })

        this.buttonManager.updateButtonGameOverScene();
    }

    draw(pCtx){
        // Display Background
        background.draw(pCtx);
        // Display enemies/ressources
        waveManager.draw(pCtx);
        // Display boat and cannon
        if (boat != null){
            this.listSprite.forEach(sprite => {
                if (sprite.image == imageLoader.getImageLoaded("images/pirate_ship.png") || sprite.image == imageLoader.getImageLoaded("images/cannon1.png")){
                    boat.draw(pCtx);
                }
                else {
                sprite.draw(pCtx);
                }
            })
        }
        //Display particles
         this.listParticleEmitter.forEach(particleEmitter=>{
            particleEmitter.draw(pCtx);
        })
        //Display environment
        environment.draw(pCtx);
        //Display button
        this.buttonManager.drawButtonGameOverScene(pCtx);
        //Display player info
        this.playerInfo.draw(pCtx);
    }
}