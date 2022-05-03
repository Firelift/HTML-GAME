class ButtonManager{
    constructor(){
        this.listButtons = [];
        this.indexButtonSelect = -1;
        this.buttonSelect = null;
        this.timerSelect = 1;
        this.valueTimerSelect = 0;
    }

    addButton(pListButton){
        pListButton.forEach(button =>{
            this.listButtons.push(button)
        })
    }

    initButton(){
        this.valueTimerSelect = 0;
    }

    loadButtonPauseScene(pBorderSprite){
        this.listButtons = [];
        //level 1
        let img1 = imageLoader.getImageLoaded("images/upgrade_newboat_1.png")
        let button1 = new ButtonUpgrade(pBorderSprite, 1, 1, img1);
        button1.unlock = false;
        let img2 = imageLoader.getImageLoaded("images/upgrade_cannonspeed_1.png")
        let button2 = new ButtonUpgrade(pBorderSprite, 1, 2, img2);
        let img3 = imageLoader.getImageLoaded("images/upgrade_cannonrange_1.png")
        let button3 = new ButtonUpgrade(pBorderSprite, 1, 3, img3);
        let img4 = imageLoader.getImageLoaded("images/upgrade_cannonball_1.png")
        let button4 = new ButtonUpgrade(pBorderSprite, 1, 4, img4);
        button1.setType("boat");
        button2.setType("cannonSpeed");
        button3.setType("cannonRange");
        button4.setType("cannonBall");
        button1.setCost(3, 1, 1);
        button2.setCost(0, 1, 1);
        button3.setCost(0, 1, 1);
        button4.setCost(0, 1, 1);
        //level 2
        let img5 = imageLoader.getImageLoaded("images/upgrade_newboat_2.png")
        let button5 = new ButtonUpgrade(pBorderSprite, 2, 1, img5);
        button5.unlock = false;
        let img6 = imageLoader.getImageLoaded("images/upgrade_cannonspeed_2.png")
        let button6 = new ButtonUpgrade(pBorderSprite, 2, 2, img6);
        let img7 = imageLoader.getImageLoaded("images/upgrade_cannonrange_2.png")
        let button7 = new ButtonUpgrade(pBorderSprite, 2, 3, img7);
        let img8 = imageLoader.getImageLoaded("images/upgrade_cannonball_2.png")
        let button8 = new ButtonUpgrade(pBorderSprite, 2, 4, img8);
        button5.setType("boat");
        button6.setType("cannonSpeed");
        button7.setType("cannonRange");
        button8.setType("cannonBall");
        button5.setCost(6, 1, 1);
        button6.setCost(0, 1, 1);
        button7.setCost(0, 1, 1);
        button8.setCost(0, 1, 1);
        //level 3
        let img9 = imageLoader.getImageLoaded("images/upgrade_newboat_3.png")
        let button9 = new ButtonUpgrade(pBorderSprite, 3, 1, img9);
        button9.unlock = false;
        let img10 = imageLoader.getImageLoaded("images/upgrade_cannonspeed_3.png")
        let button10 = new ButtonUpgrade(pBorderSprite, 3, 2, img10);
        let img11 = imageLoader.getImageLoaded("images/upgrade_cannonrange_3.png")
        let button11 = new ButtonUpgrade(pBorderSprite, 3, 3, img11);
        let img12 = imageLoader.getImageLoaded("images/upgrade_cannonball_3.png")
        let button12 = new ButtonUpgrade(pBorderSprite, 3, 4, img12);
        button9.setType("boat");
        button10.setType("cannonSpeed");
        button11.setType("cannonRange");
        button12.setType("cannonBall");
        button9.setCost(9, 1, 1);
        button10.setCost(0, 2, 0);
        button11.setCost(0, 1, 1);
        button12.setCost(0, 0, 2);
        //level 4
        let img13 = imageLoader.getImageLoaded("images/upgrade_newboat_4.png")
        let button13 = new ButtonUpgrade(pBorderSprite, 4, 1, img13);
        button13.unlock = false;
        let img14 = imageLoader.getImageLoaded("images/upgrade_cannonspeed_4.png")
        let button14 = new ButtonUpgrade(pBorderSprite, 4, 2, img14);
        let img15 = imageLoader.getImageLoaded("images/upgrade_cannonrange_4.png")
        let button15 = new ButtonUpgrade(pBorderSprite, 4, 3, img15);
        let img16 = imageLoader.getImageLoaded("images/upgrade_cannonball_4.png")
        let button16 = new ButtonUpgrade(pBorderSprite, 4, 4, img16);
        button13.setType("boat");
        button14.setType("cannonSpeed");
        button15.setType("cannonRange");
        button16.setType("cannonBall");
        button13.setCost(12, 1, 1);
        button14.setCost(0, 2, 2);
        button15.setCost(0, 2, 2);
        button16.setCost(0, 2, 2);
        //level 5
        let img17 = imageLoader.getImageLoaded("images/upgrade_newboat_5.png")
        let button17 = new ButtonUpgrade(pBorderSprite, 5, 1, img17);
        button17.unlock = false;
        let img18 = imageLoader.getImageLoaded("images/upgrade_cannonspeed_5.png")
        let button18 = new ButtonUpgrade(pBorderSprite, 5, 2, img18);
        let img19 = imageLoader.getImageLoaded("images/upgrade_cannonrange_5.png")
        let button19 = new ButtonUpgrade(pBorderSprite, 5, 3, img19);
        let img20 = imageLoader.getImageLoaded("images/upgrade_cannonball_5.png")
        let button20 = new ButtonUpgrade(pBorderSprite, 5, 4, img20);
        button17.setType("boat");
        button18.setType("cannonSpeed");
        button19.setType("cannonRange");
        button20.setType("cannonBall");
        button17.setCost(15, 1, 1);
        button18.setCost(0, 2, 2);
        button19.setCost(0, 2, 2);
        button20.setCost(0, 2, 2);

        this.addButton([button1, button2, button3, button4, button5, button6, button7, button8,
        button9, button10, button11, button12, button13, button14, button15, button16, button17, button18,
        button19, button20]);

        this.listButtons = this.listButtons.filter(button => button.level == boat.currentLevel);
    }

    loadButtonGameOverScene(){
        let img1 = imageLoader.getImageLoaded("images/button_gameover.png");
        let buttonPlay = new Button(img1, canvas.width/2 - img1.width/2, canvas.height/2 - 100);
        buttonPlay.setText("PLAY");
        buttonPlay.setType("PLAY");
        let buttonQuit = new Button(img1, canvas.width/2 - img1.width/2, canvas.height/2 + 100);
        buttonQuit.setText("QUIT");
        buttonQuit.setType("QUIT");
        this.addButton([buttonPlay, buttonQuit]);
    }

    updateButtonPauseScene(pBoat){
        //Init button list and boat if the level of the boat change
        if (pBoat.currentLevel != pBoat.newLevel){
            pBoat.currentLevel = pBoat.newLevel;
            pBoat.initBoat();
            this.loadButtonPauseScene(sceneManager.listScene["PAUSE"].borderSprite);
        }
        
        //Select button
        this.selectButtonPauseScene();
        if (this.indexButtonSelect > -1 && this.indexButtonSelect < this.listButtons.length){
            this.buttonSelect = this.listButtons[this.indexButtonSelect];
            this.listButtons.forEach(button =>{
                if (button ==  this.buttonSelect){
                    button.isHover = true;
                    if (!button.isSelect){
                        button.unLock(this.listButtons, pBoat);
                    }
                }else{ button.isHover = false; }
                if (keySpace && button.isHover && !button.isSelect && button.unlock){
                    button.isSelect = true;
                    button.applyEffect(pBoat);
                }
            })
        }
    }

    updateButtonGameOverScene(){
        //Select button
        this.selectButtonGameOverScene();
        if (this.indexButtonSelect > -1 && this.indexButtonSelect < this.listButtons.length){
            this.buttonSelect = this.listButtons[this.indexButtonSelect];
            this.listButtons.forEach(button =>{
                if (button ==  this.buttonSelect){
                    button.isHover = true;
                    button.sprite.image = imageLoader.getImageLoaded("images/button_gameover_ishover.png");
                }else{ 
                    button.isHover = false; 
                    button.sprite.image = imageLoader.getImageLoaded("images/button_gameover.png");
                }
                if (keySpace && button.isHover){
                    button.isSelect = true;
                    button.applyEffect();
                }
            })
        }
    }

    selectButtonPauseScene(){
        if (this.indexButtonSelect == -1){
            if (keyA || keyD) {
                if (keyA){
                    if (this.valueTimerSelect == 0){
                        this.indexButtonSelect = this.listButtons.length - 1;
                    }
                }
                if (keyD){  
                    if (this.valueTimerSelect == 0){
                        this.indexButtonSelect++;
                    }
                }
                if (this.valueTimerSelect < this.timerSelect){
                    this.valueTimerSelect += dt;
                }else{ this.valueTimerSelect = 0 }
            }else{ 
                if (this.valueTimerSelect != 0){
                    this.valueTimerSelect = 0; }
                }     
        }
        if (this.listButtons.length > 1){
            if (this.indexButtonSelect == 0){
                if (keyA || keyD) {
                    if (keyA){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = this.listButtons.length - 1;
                        }
                    }
                    if (keyD){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect++;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
            if (this.indexButtonSelect == this.listButtons.length - 1){
                if (keyA || keyD) {
                    if (keyA){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect--;;
                        }
                    }
                    if (keyD){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = 0;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
        }
        if (this.listButtons.length > 2){
            if (this.indexButtonSelect == 0){
                if (keyA || keyD) {
                    if (keyA){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = this.listButtons.length - 1;
                        }
                    }
                    if (keyD){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect++;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                }  
            }
            if (this.indexButtonSelect == this.listButtons.length - 1){
                if (keyA || keyD) {
                    if (keyA){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect--;
                        }
                    }
                    if (keyD){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = 0;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
            if (this.indexButtonSelect >= 1 && this.indexButtonSelect <= this.listButtons.length - 2){
                if (keyA || keyD) {
                    if (keyA){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect--;
                        }
                    }
                    if (keyD){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect++;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
        }
    }

    selectButtonGameOverScene(){
        if (this.indexButtonSelect == -1){
            if (keyW || keyS) {
                if (keyW){
                    if (this.valueTimerSelect == 0){
                        this.indexButtonSelect = this.listButtons.length - 1;
                    }
                }
                if (keyS){  
                    if (this.valueTimerSelect == 0){
                        this.indexButtonSelect++;
                    }
                }
                if (this.valueTimerSelect < this.timerSelect){
                    this.valueTimerSelect += dt;
                }else{ this.valueTimerSelect = 0 }
            }else{ 
                if (this.valueTimerSelect != 0){
                    this.valueTimerSelect = 0; }
                }     
        }
        if (this.listButtons.length > 1){
            if (this.indexButtonSelect == 0){
                if (keyW || keyS) {
                    if (keyW){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = this.listButtons.length - 1;
                        }
                    }
                    if (keyS){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect++;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
            if (this.indexButtonSelect == this.listButtons.length - 1){
                if (keyW || keyS) {
                    if (keyW){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect--;;
                        }
                    }
                    if (keyS){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = 0;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
        }
        if (this.listButtons.length > 2){
            if (this.indexButtonSelect == 0){
                if (keyW || keyS) {
                    if (keyW){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = this.listButtons.length - 1;
                        }
                    }
                    if (keyS){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect++;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                }  
            }
            if (this.indexButtonSelect == this.listButtons.length - 1){
                if (keyW || keyS) {
                    if (keyW){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect--;
                        }
                    }
                    if (keyS){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect = 0;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
            if (this.indexButtonSelect >= 1 && this.indexButtonSelect <= this.listButtons.length - 2){
                if (keyW || keyS) {
                    if (keyW){
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect--;
                        }
                    }
                    if (keyS){  
                        if (this.valueTimerSelect == 0){
                            this.indexButtonSelect++;
                        }
                    }
                    if (this.valueTimerSelect < this.timerSelect){
                        this.valueTimerSelect += dt;
                    }else{ this.valueTimerSelect = 0 }
                }else{ 
                    if (this.valueTimerSelect != 0){
                        this.valueTimerSelect = 0; }
                    }  
            }
        }
    }

    drawButtonPauseScene(pCtx, pBorderSprite) {
        //draw buttons to update the boat
        this.listButtons.forEach(button => {
            button.draw(pCtx, boat, pBorderSprite);
        })
    }

    drawButtonGameOverScene(pCtx) {
        this.listButtons.forEach(button => {
            button.draw(pCtx);
            if (button.text != null){
                ctx.font = button.sprite.image.height*button.sprite.scaleY - 10 + "px Impact";
                pCtx.fillStyle = "white";
                let textWidth = pCtx.measureText(button.text).width;
                pCtx.fillText(button.text, 
                    button.sprite.x + button.sprite.image.width*button.sprite.scaleX/2 - textWidth/2,
                    button.sprite.y + button.sprite.image.height*button.sprite.scaleY - 12);
            }
        })
    }
}

class Button{
   constructor(pMainImage, pX = 0, pY = 0){
       this.sprite = new Sprite(pMainImage);
       this.sprite.x = pX;;
       this.sprite.y = pY;
       this.isHover = false;
       this.isSelect = false;
       this.text = null;
       this.type = null;
   }

   setScale(pScaleX, pScaleY){
        this.sprite.scaleX = pScaleX;
        this.sprite.scaleY = pScaleY;
   }

   setText(pText){
       this.text = pText;
   }

    setType(pString){
        if (pString == "PLAY" || pString == "QUIT"){
            this.type = pString
        }else{ this.type = null; }
    }

    setOrientation(pAngle){
            this.sprite.orientation = pAngle;
    }

    applyEffect(){
        if (this.type == "PLAY"){
            sceneManager.currentScene.activeMusic.pause();
            sceneManager.currentScene.activeMusic.currentTime = 0;
            startScene();
        }
    }

   draw(pCtx){
       this.sprite.draw(pCtx);
   }
}

class ButtonUpgrade extends Button{
    constructor(pBorderSprite, pLevel, pPosition, pMainImage, pX = 0, pY = 0){
        super(pMainImage);
        this.position = pPosition;
        this.sprite.x = pBorderSprite.x + pBorderSprite.border + (this.position - 1)*150;
        this.sprite.y = pBorderSprite.y + pBorderSprite.border;
        this.level = pLevel;
        this.unlock = false;
        this.crew = 10;
        this.wood = 10;
        this.steel = 18;
    }

    setCost(pCrew, pWood, pSteel){
        this.crew = pCrew;
        this.wood = pWood;
        this.steel = pSteel;
    }

    setType(pString){
        if (pString == "boat" || pString == "cannonSpeed" || pString == "cannonRange" || pString == "cannonBall"){
            this.type = pString
        }else{ this.type = null; }
    }

    unLock(pListButtons, pBoat){
        if (this.type == "cannonSpeed" || this.type == "cannonRange" || this.type == "cannonBall"){
            if (this.crew <= pBoat.crew && this.wood <= pBoat.wood && this.steel <= pBoat.steel){
                this.unlock = true;
            }else{
                this.unlock = false;
            }
        }
        if (this.type == "boat"){
            let list1 = [];
            let list2 = [];
            pListButtons.forEach(button=>{
                if (button.type != "boat"){
                    list1.push(button);
                    if (button.isSelect) {
                        list2.push(button);
                    }
                }
            })
            if (list1.length == list2.length && this.crew <= pBoat.crew && this.wood <= pBoat.wood && this.steel <= pBoat.steel){
                this.unlock = true;
            }
        }
    }

    applyEffect(pBoat){
        if (this.type == "boat"){
            if (this.level == 1){
                boat.newLevel = 2;
                boat.life = boat.maxLife + 4;
                boat.maxCrew = 6;
                boat.maxWood = 2;
                boat.maxSteel = 2;
            }
            if (this.level == 2){
                boat.newLevel = 3;
                boat.life = boat.maxLife + 8;
                boat.maxCrew = 9;
                boat.maxWood = 3;
                boat.maxSteel = 3;
            }
            if (this.level == 3){
                boat.newLevel = 4;
                boat.life = boat.maxLife + 12;
                boat.maxCrew = 12;
                boat.maxWood = 4;
                boat.maxSteel = 4;
            }
            if (this.level == 4){
                boat.newLevel = 5;
                boat.life = boat.maxLife + 16;
                boat.maxCrew = 15;
                boat.maxWood = 5;
                boat.maxSteel = 5;
            }
            if (this.level == 5){
                boat.newLevel = 6;
                boat.life = boat.maxLife + 20;
            }
        }
        boat.listCannon.forEach(cannon => {
            if (this.type == "cannonSpeed"){
                if (this.level == 1){
                    cannon.level = 2;
                }
                if (this.level == 2){
                    cannon.level = 3;
                }
                if (this.level == 3){
                    cannon.level = 4;
                }
                if (this.level == 4){
                    cannon.level = 5;
                }
                if (this.level == 5){
                    cannon.level = 6;
                }
                cannon.applyFireRate();
            }
            if (this.type == "cannonRange"){
                if (this.level == 1){
                    cannon.level = 2;
                }
                if (this.level == 2){
                    cannon.level = 3;
                }
                if (this.level == 3){
                    cannon.level = 4;
                }
                if (this.level == 4){
                    cannon.level = 5;
                }
                if (this.level == 5){
                    cannon.level = 6;
                }
                cannon.applyRange();
            }
            if (this.type == "cannonBall"){
                if (this.level == 1){
                    cannon.level = 2;
                }
                if (this.level == 2){
                    cannon.level = 3;
                }
                if (this.level == 3){
                    cannon.level = 4;
                }
                if (this.level == 4){
                    cannon.level = 5;
                }
                if (this.level == 5){
                    cannon.level = 6;
                }
                cannon.applyCannonBallLevel();
            }
        })
        pBoat.wood -= this.wood;
        pBoat.steel -= this.steel;
    }

    draw(pCtx, pBoat, pBorderSprite){
        super.draw(pCtx);
        let interval = 52;
        let offsetX = 22;
        let offsetY = 22;
        
        ctx.font = '20px Impact';
        if (pBoat.crew < this.crew){
            pCtx.fillStyle = "red";
        }else{ pCtx.fillStyle = "white"; }
        pCtx.fillText(this.crew, this.sprite.x + offsetX, this.sprite.y + offsetY);
        if (pBoat.wood < this.wood){
            pCtx.fillStyle = "red";
        }else{ pCtx.fillStyle = "white"; }
        pCtx.fillText(this.wood, this.sprite.x + offsetX + interval, this.sprite.y + offsetY);
        if (pBoat.steel < this.steel){
            pCtx.fillStyle = "red";
        }else{ pCtx.fillStyle = "white"; }
        pCtx.fillText(this.steel, this.sprite.x + offsetX + 2*interval, this.sprite.y + offsetY);
        ctx.font = '30px Impact';

        if (this.isHover) {
            if(this.isSelect){
                pCtx.fillStyle = "lime";
                let text = "UPGRADE DONE";
                let textWidth = pCtx.measureText(text).width;
                let offsetX = pBorderSprite.image.width*pBorderSprite.scaleX/2 - textWidth/2;
                let offsetY = 40;
                pCtx.fillText(text, pBorderSprite.x + offsetX, pBorderSprite.y + pBorderSprite.image.height*pBorderSprite.scaleY + offsetY);
            }else{
                if (!this.unlock){
                    pCtx.fillStyle = "white";
                    if (this.type == "boat"){
                        let text = "UPGRADE LOCK. UNLOCK OTHER UPGRADES";
                        let textWidth = pCtx.measureText(text).width;
                        let offsetX = pBorderSprite.image.width*pBorderSprite.scaleX/2 - textWidth/2;
                        let offsetY = 40;
                        pCtx.fillText(text, pBorderSprite.x + offsetX, pBorderSprite.y + pBorderSprite.image.height*pBorderSprite.scaleY + offsetY);
                    }else{
                        let text = "UPGRADE LOCK";
                        let textWidth = pCtx.measureText(text).width;
                        let offsetX = pBorderSprite.image.width*pBorderSprite.scaleX/2 - textWidth/2;
                        let offsetY = 40;
                        pCtx.fillText(text, pBorderSprite.x + offsetX, pBorderSprite.y + pBorderSprite.image.height*pBorderSprite.scaleY + offsetY);
                    }
                    
                }else{
                    pCtx.fillStyle = "orange";
                    let text = "NEW UPGRADE!";
                    let textWidth = pCtx.measureText(text).width;
                    let offsetX = pBorderSprite.image.width*pBorderSprite.scaleX/2 - textWidth/2;
                    let offsetY = 40;
                    pCtx.fillText(text, pBorderSprite.x + offsetX, pBorderSprite.y + pBorderSprite.image.height*pBorderSprite.scaleY + offsetY);
                }
            }
            pCtx.globalAlpha = 0.3;
            pCtx.fillStyle = "white";
            pCtx.fillRect(this.sprite.x, this.sprite.y, this.sprite.image.width*this.sprite.scaleX, this.sprite.image.height*this.sprite.scaleY);
            pCtx.globalAlpha = 1;
        }
    }
}

