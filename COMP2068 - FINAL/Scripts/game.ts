var canvas;
var stage: createjs.Stage;

// Game Objects
var background: createjs.Bitmap;
var game: createjs.Container; 
var cards: createjs.Bitmap[] = [];
var cardbacks: createjs.Bitmap[] = [];
var scoreContainer = new createjs.Container();
var lifeContainer = new createjs.Container();
var cardBackDisplay = false;

// Game Variables
var score = 0;
var life = 30;
var RCGLineOne;
var RCGLineTwo;
var lineOne;
var lineTwo;
var turn = 0;

/* Tally Variables */
var tinyWhelp = 0;
var incessantZombie = 0;
var ferociousTalon = 0;
var deepwoodWitch = 0;
var stormboundGargoyle = 0;

//Containers
var cardContainers: createjs.Container[] = [];

//Text Objects to be placed within the containers
var scoreText = new createjs.Text("" + score, "25px Consolas", "#000000");
var lifeText = new createjs.Text("" + life, "25px Consolas", "#000000");

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); 
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function LoadCards() {
    RCGLineOne = BoardState();
    RCGLineTwo = BoardState();
    lineOne = RCGLineOne[0] + " - " + RCGLineOne[1] + " - " + RCGLineOne[2] + " - " + RCGLineOne[3] + " - " + RCGLineOne[4];
    console.log(lineOne);


    for (var card = 0; card < 5; card++) {
        cards[card] = new createjs.Bitmap("assets/images/" + RCGLineOne[card] + ".png");
        cards[card].x = 33 + (132.5 * card);
        cards[card].y = 50;

        game.addChild(cards[card]);
        console.log(game.getNumChildren());
    }

    for (var card = 0; card < 5; card++) {
        cards[card] = new createjs.Bitmap("assets/images/" + RCGLineTwo[card] + ".png");
        cards[card].x = 33 + (132.5 * card);
        cards[card].y = 261;

        game.addChild(cards[card]);
        console.log(game.getNumChildren());
    }

        //Displays the card backs for lines 1 and 2.
    for (var cardBack = 0; cardBack < 5; cardBack++) {
        cardbacks[cardBack] = new createjs.Bitmap("assets/images/cardback.png");
        cardbacks[cardBack].x = 33 + (132.5 * cardBack);
        cardbacks[cardBack].y = 50;
        game.addChild(cardbacks[cardBack]);
        console.log(game.getNumChildren());
        cardbacks[cardBack].addEventListener("click", );
    }

    for (var cardBack = 0; cardBack < 5; cardBack++) {
        cardbacks[cardBack] = new createjs.Bitmap("assets/images/cardback.png");
        cardbacks[cardBack].x = 33 + (132.5 * cardBack);
        cardbacks[cardBack].y = 261;
        game.addChild(cardbacks[cardBack]);
        //console.log(game.getNumChildren());
        }
}

function flipCard() {
    game.removeChild(cardbacks[cardBack]);
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

function BoardState() {
    var firstLine = [" ", " ", " ", " ", " "];
    var secondLine = [" ", " ", " ", " ", " "];
    var outCome = [0, 0, 0, 0 , 0];

    for (var randomCard = 0; randomCard < 5; randomCard++) {
        outCome[randomCard] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[randomCard]) {
            case checkRange(outCome[randomCard], 1, 27):  // 41.5% probability
                firstLine[randomCard] = "tinyWhelpCard";
                tinyWhelp++;
                break;
            case checkRange(outCome[randomCard], 28, 37): // 15.4% probability
                firstLine[randomCard] = "IncessantZombieCard";
                incessantZombie++;
                break;
            case checkRange(outCome[randomCard], 38, 46): // 13.8% probability
                firstLine[randomCard] = "FerociousTalonCard";
                ferociousTalon++;
                break;
            case checkRange(outCome[randomCard], 47, 54): // 12.3% probability
                firstLine[randomCard] = "DeepwoodWitchCard";
                deepwoodWitch++;
                break;
            case checkRange(outCome[randomCard], 55, 65): //  7.7% probability
                firstLine[randomCard] = "StormboundGargoyleCard";
                stormboundGargoyle++;
                break;
        }
    }

    for (var randomCard = 0; randomCard < 5; randomCard++) {
        outCome[randomCard] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[randomCard]) {
            case checkRange(outCome[randomCard], 1, 27):  // 41.5% probability
                secondLine[randomCard] = "tinyWhelpCard";
                tinyWhelp++;
                break;
            case checkRange(outCome[randomCard], 28, 37): // 15.4% probability
                secondLine[randomCard] = "IncessantZombieCard";
                incessantZombie++;
                break;
            case checkRange(outCome[randomCard], 38, 46): // 13.8% probability
                secondLine[randomCard] = "FerociousTalonCard";
                ferociousTalon++;
                break;
            case checkRange(outCome[randomCard], 47, 54): // 12.3% probability
                secondLine[randomCard] = "DeepwoodWitchCard";
                deepwoodWitch++;
                break;
            case checkRange(outCome[randomCard], 55, 65): //  7.7% probability
                secondLine[randomCard] = "StormboundGargoyleCard";
                stormboundGargoyle++;
                break;
        }
    }
    return firstLine;
    return secondLine;
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


    //Displays the player's score
    scoreContainer.x = 600;
    scoreContainer.y = 454;
    scoreContainer.addChild(scoreText);
    game.addChild(scoreContainer);

    //Displays the player's life total
    lifeContainer.x = 200;
    lifeContainer.y = 454;
    lifeContainer.addChild(lifeText);
    game.addChild(lifeContainer);

    BoardState();
    LoadCards();

    
}