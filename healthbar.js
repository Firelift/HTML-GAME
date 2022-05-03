class HealthBar {
    constructor(x = 10, y = 10, color = "green", w = 50, h = 10){
        this.x = x;
        this.y = y;
        this.width = w;
        this.maxWidth = w;
        this.height = h;
        this.color = color;
    }

    draw(pCtx){
        pCtx.lineWidth = 3;
        pCtx.strokeStyle = "#000";
        let ratio = this.width/this.maxWidth;
        if (ratio >= 0.5){
            pCtx.fillStyle = "green";
        }else{
            if (ratio < 0.5 && ratio >= 0.2){
                pCtx.fillStyle = "orange";
            }else{
                pCtx.fillStyle = "red";
            }
        }
        pCtx.fillRect(this.x, this.y, this.width, this.height);
        pCtx.strokeRect(this.x, this.y, this.maxWidth, this.height);
    }
}