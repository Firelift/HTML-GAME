//Global variables
let canvas = document.getElementById("canvas");

let imgHero;
let keyRight;
let keyDown;
let keyLeft;
let keyUp;
let keyA;
let keyD;
let keyQ;
let keyW;
let keyS;
let keySpace;
let keyPressed;

let imageLoader = new ImageLoader();
let GameReady = false;
let boat;
let background;
let environment;
let waveManager;
let interfaceGame
let sceneManager;
let lifeBar;

function load() {
    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);

    sceneManager = new SceneManager();
    sceneManager.load();
    

}

function startScene(){
    GameReady = true;
    sceneManager.activeScene("INGAME");
    sceneManager.listScene["INGAME"].load();
    sceneManager.listScene["PAUSE"].load();
}

function update(dt) {
    if (!GameReady) {
        return;
    }
    sceneManager.update();
    sceneManager.currentScene.update(dt);
}

function keydown(t) {
    t.preventDefault()
    if (t.code == "ArrowRight") {
        keyRight = true;
    }
    if (t.code == "ArrowDown") {
        keyDown = true;
    }
    if (t.code == "ArrowLeft") {
        keyLeft = true;
    }
    if (t.code == "ArrowUp") {
        keyUp = true;
    }
    if (t.code == "KeyA"){
        keyA = true;
    }
    if (t.code == "KeyD"){
        keyD = true;
    }
    if (t.code == "KeyW"){
        keyW = true;
    }
    if (t.code == "KeyS"){
        keyS = true;
    }
    if (t.code == "KeyQ"){
        keyQ = true;
    }
    if (t.code == "Space"){
        keySpace = true;
    }
}

function keyup(t) {
    t.preventDefault()
    if (t.code == "ArrowRight") {
        keyRight = false;
    }
    if (t.code == "ArrowDown") {
        keyDown = false;
    }
    if (t.code == "ArrowLeft") {
        keyLeft = false;
    }
    if (t.code == "ArrowUp") {
        keyUp = false;
    }
    if (t.code == "KeyA"){
        keyA = false;
    }
    if (t.code == "KeyD"){
        keyD = false;
    }
    if (t.code == "KeyW"){
        keyW = false;
    }
    if (t.code == "KeyS"){
        keyS = false;
    }
    if (t.code == "KeyQ"){
        keyQ = false;
    }
    if (t.code == "Space"){
        keySpace = false;
    }
}

function draw(pCtx) {
    if (!GameReady) {
        let ratio = imageLoader.getLoadingRation();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1, 1, 400, 100);
        pCtx.fillStyle = "rgb(255,0,0)";
        pCtx.fillRect(1, 1, 400*ratio, 100);
        return;
    }

    sceneManager.currentScene.draw(pCtx);

}