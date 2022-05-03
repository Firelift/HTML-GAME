let interval;
let ctx = canvas.getContext("2d");
ctx.font = '30px Impact';

let lastUpdate = 0;
let dt = 1/60;
let fps = 60;

Init();

function Init() {
    // Pixel mode
    ctx.imageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    
    load();
    //appel de la fonction run, 60 fois par seconde
    requestAnimationFrame(run);
}

function run(time) {
    requestAnimationFrame(run);
    dt = (time - lastUpdate)/1000;
    fps = 1/dt;
    /*execute toutes les instructions de fonction run si le fps ne depasse pas une certaine valeur*/
    if (fps > 60 + 0.001){
        return;
    }
    lastUpdate = time
    update(dt);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
}




