class WaveManager{
    constructor(){
        this.currentEnemyWave = null; 
        this.enemyWavesInGame = [];
        this.ressourceType = ["crew", "wood", "steel"]; 
        this.ressourceInGame = [];
        this.timerRessource = Math.random()*3 + 3;
        this.currentLevelWave = 1;
        this.newLevelWave = 1;
        this.levelGame= 1;
        this.distanceNewLevel = 1000;
        this.distanceNewWave = 100;
        //Attributes wave
        this.enemyTypeCurrentWave = [];
        this.enemyLevel = 1;
        this.timerSpawn = 4;
        this.timerValue = null;
        this.minEnemySpawn = null;
        this.maxEnemySpawn = null;
        
    }

    addRessource(pRessource){
        pRessource.load();
        this.ressourceInGame.push(pRessource);
    }

    manageLevelWave(pBoat){
        if (pBoat != null){
            let value = ((this.levelGame - 1)*this.distanceNewLevel) + (this.distanceNewWave*this.currentLevelWave);
            if (pBoat.distanceTraveled >= value){
                if (pBoat.distanceTraveled >= value){
                    if (pBoat.distanceTraveled >= value){
                        if (pBoat.distanceTraveled >= value){
                            if (pBoat.distanceTraveled >= value){
                                if (pBoat.distanceTraveled >= value){
                                    if (pBoat.distanceTraveled >= value){
                                        if (pBoat.distanceTraveled >= value){
                                            if (pBoat.distanceTraveled >= value){
                                                if (pBoat.distanceTraveled >= value){
                                                    this.newLevelWave++;
                                                    return;
                                                }
                                                this.newLevelWave++;
                                                return;
                                            }
                                            this.newLevelWave++;
                                            return;
                                        }
                                        this.newLevelWave++;
                                        return;
                                    }
                                    this.newLevelWave++;
                                    return;
                                }
                                this.newLevelWave++;
                                return;
                            }
                            this.newLevelWave++;
                            return;
                        }
                        this.newLevelWave++;
                        return;
                    }
                    this.newLevelWave++;
                    return;
                }
                this.newLevelWave++;
                return;
            }
        }
    }

    manageLevelGame(){
        if (this.currentLevelWave > 10){
            this.newLevelWave = 1;
            this.levelGame += 1;
            if (this.timerSpawn > 1){
                this.timerSpawn -= 0.5;
            }else{
                this.timerSpawn = 1;
            }
        }
    }

    loadWaveAttributes(pLevel){
        if (pLevel == 1){
            this.enemyTypeCurrentWave = [2];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 1;
        }
        if (pLevel == 2){
            this.enemyTypeCurrentWave = [2];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 2;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 3){
            this.enemyTypeCurrentWave = [2, 3];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 4){
            this.enemyTypeCurrentWave = [2, 4];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 5){
            this.enemyTypeCurrentWave = [2, 3, 4, 5];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 6){
            this.enemyTypeCurrentWave = [2, 3, 4, 5];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 7){
            this.enemyTypeCurrentWave = [2, 3, 4];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 2;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 8){
            this.enemyTypeCurrentWave = [1];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 9){
            this.enemyTypeCurrentWave = [1, 3, 4, 5];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 2;
        }
        if (pLevel == 10){
            this.enemyTypeCurrentWave = [2, 3, 5];
            this.minTimerSpawn = 2;
            this.maxTimerSpawn = 4;
            this.minEnemySpawn = 1;
            this.maxEnemySpawn = 2;
        }
        this.timer = getRandomInt(this.minTimerSpawn, this.maxTimerSpawn);
        this.timeValue = 0;
        this.enemyLevel = this.levelGame;
    }

    update(pBoat, dt){
        //update game level
        this.manageLevelGame();
        //update the wave level
        this.manageLevelWave(pBoat);
        //Load Wave
        if (this.currentLevelWave != this.newLevelWave){
            this.loadWaveAttributes(this.currentLevelWave);
        }
        //Manage timer enemy wave
        if (this.timerValue < this.timerSpawn){
            this.timerValue += dt;
        }else{
            this.CreateWaveEnemy();
            this.timerValue = 0;
        }
        //Manage timer ressource wave
        this.timerRessource -= dt;
        if (this.timerRessource <= 0){
            this.CreateRessource();
            this.timerRessource = Math.random()*5 + 5;
        }
        //Manage enemies
        for (let n=0; n<this.enemyWavesInGame.length; n++){
            let listEnemy = this.enemyWavesInGame[n].listEnemy;
            for(let n=0; n<listEnemy.length; n++){
                let enemy = listEnemy[n];
                if (enemy.type == 5){
                    enemy.update(pBoat, dt);
                }else{
                    enemy.update(pBoat, dt);
                    enemy.stateManager(pBoat);
                    enemy.collisionManagerProjectile(sceneManager.listScene["INGAME"].listProjectileInGame); 
                    if (pBoat != null){
                        enemy.collisionManagerBoat(pBoat);
                        pBoat.listCannon.forEach(cannon =>{
                            enemy.collisionManagerCannonBall(cannon);
                        })
                    }
                }
            }
        }
        //Manage ressources
        this.ressourceInGame.forEach(ressource => {
            ressource.update(dt);
            if (pBoat != null){
                ressource.collisionManager(pBoat);
            } 
        })
        //Remove Waves Enemy
        this.RemoveWaveEnemy();
        //Remove ressources
        this.RemoveRessource();
    }

    CreateWaveEnemy(){
        let nEnemy = getRandomInt(this.minEnemySpawn,this.maxEnemySpawn);
        this.currentEnemyWave = new EnemyWave(); 
        for(let n=1; n<=nEnemy;n++){
            let index = getRandomInt(0, this.enemyTypeCurrentWave.length - 1)
            let typeEnemy = this.enemyTypeCurrentWave[index];
            this.currentEnemyWave.addEnemy(typeEnemy, this.enemyLevel);
        }
        this.enemyWavesInGame.push(this.currentEnemyWave);   
    }

    CreateRessource(){
        let index = getRandomInt(0, this.ressourceType.length - 1)
        if (this.ressourceType[index] == "crew") {
            this.addRessource(new Crew());
        }else{
            if (this.ressourceType[index] == "wood") {
                this.addRessource(new Wood());
            }else{
                this.addRessource(new Steel());
            }         
        }  
    }

    RemoveWaveEnemy(){
        this.enemyWavesInGame.forEach(enemyWave=>{
            enemyWave.listEnemy = enemyWave.listEnemy.filter(enemy => !enemy.dead);  
            if (enemyWave.listEnemy.length == 0){
                let indexWave = this.enemyWavesInGame.indexOf(enemyWave);
                this.enemyWavesInGame.splice(indexWave,1);
            }
        })
    }

    RemoveRessource(){
        this.ressourceInGame = this.ressourceInGame.filter(ressource => !ressource.collide);
        this.ressourceInGame = this.ressourceInGame.filter(ressource => ressource.onScreen);
    }

    draw(pCtx){
        //Draw enemies
        for (let n=0; n<this.enemyWavesInGame.length; n++){
            let wave = this.enemyWavesInGame[n].listEnemy;
            wave.forEach(enemy =>{
                enemy.draw(pCtx);
            })
        }
        //Draw ressources
        this.ressourceInGame.forEach(ressource =>{
            ressource.draw(pCtx);
        })
        
    }
}
