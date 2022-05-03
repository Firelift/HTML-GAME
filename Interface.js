class InterfaceGame{
    constructor(){
        this.listImages = [];
        this.intervalHearth = 16;
        this.intervalRessource = 110;
        this.timerDisplayWave = 3;
        this.valueTimerDisplayWave = 0;
        this.startTimerDisplayWave = true;
        this.alphaDisplayWave = 0;
        this.timerDisplayLevel = 5;
        this.valueTimerDisplayLevel = 0;
        this.startTimerDisplayLevel = false;
    }

    load(){
        //Boat Life
        let img1 = imageLoader.getImageLoaded("images/life1.png");
        let img2 = imageLoader.getImageLoaded("images/life2.png");
        let img3 = imageLoader.getImageLoaded("images/life3.png");
        let img4 = imageLoader.getImageLoaded("images/life4.png");
        this.addInterface("life", [img1, img2, img3, img4]);

        let img5 = imageLoader.getImageLoaded("images/interface_crew.png");
        let img6 = imageLoader.getImageLoaded("images/interface_wood.png");
        let img7 = imageLoader.getImageLoaded("images/interface_steel.png");
        this.addInterface("ressource", [img5, img6, img7]);
    }

    addInterface(pName, pListImages){
        this.listImages[pName] = pListImages;
    }

    getLengthList(pList){
        let length = 0;
        pList.forEach(object =>{
            length++;
        })
        return length;
    }

    update(pBoat, dt){
        pBoat.distanceTraveled += pBoat.speed*dt/50;
        //Manage display timer
        if (waveManager.currentLevelWave != waveManager.newLevelWave && waveManager.newLevelWave <= 10){
            waveManager.currentLevelWave = waveManager.newLevelWave;
            this.startTimerDisplayWave = true;
            this.valueTimerDisplayWave = 0;
            this.alphaDisplayWave = 0;
        }
        if (waveManager.newLevelWave > 10){
            waveManager.currentLevelWave = waveManager.newLevelWave;
            this.startTimerDisplayLevel = true;
            this.valueTimerDisplayLevel = 0;
            this.valueTimerDisplayWave = 0;
        }
        if (this.startTimerDisplayWave){
            this.valueTimerDisplayWave += dt;
            if(this.valueTimerDisplayWave >= this.timerDisplayWave){
                this.startTimerDisplayWave = false;
                this.valueTimerDisplayWave = 0;
            }
        }
        if (this.startTimerDisplayLevel){
            this.valueTimerDisplayLevel += dt;
            if(this.valueTimerDisplayLevel >= this.timerDisplayLevel){
                this.startTimerDisplayLevel = false;
                this.valueTimerDisplayLevel = 0;
            }
        }
    }

    drawLife(pCtx, pX, pY, pBoat){
        let nFullHeart = Math.floor(pBoat.life/4);
        let nPartialHeart = pBoat.life % 4;
        for (let n=0;n<=nFullHeart;n++){
            if (n > 0){
                pCtx.drawImage(this.listImages["life"][0], pX + (n - 1)*this.intervalHearth, pY);
            }
        }
        if (nPartialHeart == 1){
            pCtx.drawImage(this.listImages["life"][3], pX + (nFullHeart)*this.intervalHearth, pY);
        }
        if (nPartialHeart == 2){
            pCtx.drawImage(this.listImages["life"][2], pX + (nFullHeart)*this.intervalHearth, pY);
        }
        if (nPartialHeart == 3){
            pCtx.drawImage(this.listImages["life"][1], pX + (nFullHeart)*this.intervalHearth, pY);
        }
    }

    drawRessource(pCtx, pX, pY, pBoat){
        for (let n=0; n<this.getLengthList(this.listImages["ressource"]);n++){
            let img = this.listImages["ressource"][n];
            pCtx.drawImage(img, pX + n*this.intervalRessource, pY, img.width*2, img.height*2);
            let posText = 35;   
            if (n == 0){
                if (pBoat.crew >= pBoat.maxCrew) {
                    pBoat.crew = pBoat.maxCrew
                    pCtx.fillStyle = "red";
                }else{ pCtx.fillStyle = "white"; }
                pCtx.fillText(pBoat.crew+"/"+pBoat.maxCrew, pX + n*this.intervalRessource + posText, pY + img.height*2);
            }else{
                if (n == 1){
                    if (pBoat.wood >= pBoat.maxWood){
                        pBoat.wood = pBoat.maxWood;
                        pCtx.fillStyle = "red";
                    }
                    else { pCtx.fillStyle = "white"; }
                    pCtx.fillText(pBoat.wood+"/"+pBoat.maxWood, pX + n*this.intervalRessource + posText, pY + img.height*2);
                }else{
                    if (pBoat.steel >= pBoat.maxSteel){
                        pBoat.steel = pBoat.maxSteel;
                        pCtx.fillStyle = "red";
                    }
                    else{ pCtx.fillStyle = "white"; }
                    pCtx.fillText(pBoat.steel+"/"+pBoat.maxSteel, pX + n*this.intervalRessource + posText, pY + img.height*2);
                }
            }
             
        }
    }

    drawLevel(pCtx){
        if (this.alphaDisplayWave < 1){
            this.alphaDisplayWave += 0.5*dt;
        }else{
            this.alphaDisplayWave = 1;
        }
        if (this.startTimerDisplayWave){
            pCtx.font = '70px Impact';
            pCtx.globalAlpha = this.alphaDisplayWave;
            pCtx.fillStyle = "antiquewhite";
            let text = "WAVE " + waveManager.currentLevelWave + " START";
            let textWidth = pCtx.measureText(text).width;
            pCtx.fillText(text, canvas.width/2 - textWidth/2, 250);
            pCtx.globalAlpha = 1;
            pCtx.font = '30px Impact';
        }
        if (this.startTimerDisplayLevel){
            pCtx.font = '40px Impact';
            pCtx.globalAlpha = 0.7;
            pCtx.fillStyle = "antiquewhite";
            let text1 = "NEW LEVEL!";
            let text2 = "THE ENEMIES ARE STRONGER AND MORE NUMEROUS";
            let text1Width = pCtx.measureText(text1).width;
            let text2Width = pCtx.measureText(text2).width;
            pCtx.fillText(text1, canvas.width/2 - text1Width/2, 100);
            pCtx.fillText(text2, canvas.width/2 - text2Width/2, 150);
            pCtx.globalAlpha = 1;
            pCtx.font = '30px Impact';
        }
    }

    draw(pCtx, pBoat){
        pCtx.fillStyle = "white";
        pCtx.font = '30px Impact';
        pCtx.fillText("DISTANCE TRAVELED: " + Math.floor(pBoat.distanceTraveled) + " m  ", canvas.width - 400, 30);
        pCtx.fillText("LEVEL " + waveManager.levelGame + " | WAVE " + waveManager.currentLevelWave, 10, 55);
        this.drawLife(pCtx, 10, 10, pBoat);
        this.drawRessource(pCtx, canvas.width - 330, canvas.height - 50, pBoat); 
        this.drawLevel(pCtx);
    }
}