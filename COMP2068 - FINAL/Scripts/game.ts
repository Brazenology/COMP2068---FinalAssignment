var canvas;
var stage: createjs.Stage;

// Game Objects
var background: createjs.Bitmap;
var game: createjs.Container; 

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); 
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function gameLoop() {
    stage.update(); // stage refresh
}

function main() {
    // instantiate game container
    game = new createjs.Container();


    // Create Dice Roller User Interface
    createUI();
    stage.addChild(game);
}

function createUI(): void {
    // instantiate my background
    background = new createjs.Bitmap("assets/images/MonsterMatcherBackground.png");
    game.addChild(background);
}