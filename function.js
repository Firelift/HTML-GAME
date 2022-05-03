//Global functions

function getRandomFloat(pMin, pMax){
    return Math.random()*(pMax - pMin + 1) + pMin;
}
function getRandomInt(pMin, pMax){
    pMin = Math.ceil(pMin);
    pMax = Math.floor(pMax);
    return Math.floor(Math.random()*(pMax - pMin + 1) + pMin);
}
function getOneOrMinusOne(){
    let random = Math.floor(Math.random()*2);
    if (random == 0){
        return 1;
    }else{
        return -1;
    }
}
function distance(pSprite1, pSprite2){
    return Math.floor(Math.sqrt((pSprite1.x - pSprite2.x)*(pSprite1.x - pSprite2.x) + (pSprite1.y - pSprite2.y)*(pSprite1.y - pSprite2.y)));
}
function direction(pSprite1, pSprite2){
    return Math.atan((pSprite1.y - pSprite2.y)/(pSprite1.x - pSprite2.x));
}

function BoatCollisionManager_RotatingSprite(pSprite1, pSprite2, pBoxWidth, pBoxHeight){
    let w = pBoxWidth/2;
    let h = pBoxHeight/2;
    let x1 = pSprite1.x + w*pSprite1.scaleX*Math.cos(pSprite1.orientation) - h*pSprite1.scaleY*Math.sin(pSprite1.orientation);
    let x2 = pSprite1.x + w*pSprite1.scaleX*Math.cos(pSprite1.orientation) + h*pSprite1.scaleY*Math.sin(pSprite1.orientation);
    let x3 = pSprite1.x - w*pSprite1.scaleX*Math.cos(pSprite1.orientation) - h*pSprite1.scaleY*Math.sin(pSprite1.orientation);
    let x4 = pSprite1.x - w*pSprite1.scaleX*Math.cos(pSprite1.orientation) + h*pSprite1.scaleY*Math.sin(pSprite1.orientation);
    let y1 = pSprite1.y + w*pSprite1.scaleX*Math.sin(pSprite1.orientation) + h*pSprite1.scaleY*Math.cos(pSprite1.orientation);
    let y2 = pSprite1.y + w*pSprite1.scaleX*Math.sin(pSprite1.orientation) - h*pSprite1.scaleY*Math.cos(pSprite1.orientation);
    let y3 = pSprite1.y - w*pSprite1.scaleX*Math.sin(pSprite1.orientation) + h*pSprite1.scaleY*Math.cos(pSprite1.orientation);
    let y4 = pSprite1.y - w*pSprite1.scaleX*Math.sin(pSprite1.orientation) - h*pSprite1.scaleY*Math.cos(pSprite1.orientation);

    let w2 = pSprite2.image.width*pSprite2.scaleX; 
    let h2 = pSprite2.image.height*pSprite2.scaleY;

    if ((x1 < pSprite2.x - h2/2 && x2 < pSprite2.x - h2/2 &&  x3 < pSprite2.x - h2/2 &&  x4 < pSprite2.x - h2/2) ||
    (x1 > pSprite2.x + h2/2 && x2 > pSprite2.x + h2/2 &&  x3 > pSprite2.x + h2/2 &&  x4 > pSprite2.x + h2/2) ||
    (y1 < pSprite2.y - w2/2 && y2 < pSprite2.y - w2/2 &&  y3 < pSprite2.y - w2/2 &&  y4 < pSprite2.y - w2/2) ||
    (y1 > pSprite2.y + w2/2 && y2 > pSprite2.y + w2/2 &&  y3 > pSprite2.y + w2/2 &&  y4 > pSprite2.y + w2/2)){
        return false;
    }
    else{ 
        return true; }
}