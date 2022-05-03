class PlayerInfo{
    constructor(){
        this.record = 0;
        this.newRecord = 0;
        this.text1 = null;
        this.text2 = null;
    }

    load(pBoat){
        this.newRecord = Math.floor(pBoat.distanceTraveled);
        if (this.record < this.newRecord){
            this.record = this.newRecord;
            this.text1 = "YOU HAVE A NEW RECORD: " + this.record + " m";
            this.text2 = null;
        }else{
            this.text1 = "YOU HAVE TRAVELED " + this.newRecord + " m";
            this.text2 = "TRY TO BEAT YOUR CURRENT RECORD: " + this.record + " m";
        }
    }

    draw(pCtx){
        ctx.font = '40px Impact';
        pCtx.fillStyle = "white";
        let textWidth = pCtx.measureText(this.text1).width;
        pCtx.fillText(this.text1, canvas.width/2 - textWidth/2, 200);
        if (this.text2 != null){
            let textWidth = pCtx.measureText(this.text2).width;
            pCtx.fillText(this.text2, canvas.width/2 - textWidth/2, 250);
        }
    }
}