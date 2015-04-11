var canvas;
var stage: createjs.Stage;

// Game Objects
var unveiledCards: number;
var background: createjs.Bitmap;
var game: createjs.Container; 
var cardsL1: createjs.Bitmap[] = [];
var cardsL2: createjs.Bitmap[] = [];
var storedCardsL1: Array<number> = [];
var storedCardsL2: Array<number> = [];
var cardbacksL1: createjs.Bitmap[] = [];
var cardbacksL2: createjs.Bitmap[] = [];
var unveiledCardsL1: Array<number> = [];
var unveiledCardsL2: Array<number> = [];
var scoreContainer = new createjs.Container();
var lifeContainer = new createjs.Container();

// Game Variables
var score = 0;
var life = 30;
var RCGLineOne;
var RCGLineTwo;
var lineOne;
var lineTwo;
var tinyWhelpImage = new createjs.Bitmap("assets/images/tinyWhelpCard.png");
var incessantZombieImage = new createjs.Bitmap("assets/images/IncessantZombieCard.png");
var ferociousTalonImage = new createjs.Bitmap("assets/images/FerociousTalonCard.png");
var DeepwoodWitchImage = new createjs.Bitmap("assets/images/DeepwoodWitchCard.png");
var StormboundGargoyleImage = new createjs.Bitmap("assets/images/StormboundGargoyleCard.png");

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
    lineTwo = RCGLineTwo[0] + " - " + RCGLineTwo[1] + " - " + RCGLineTwo[2] + " - " + RCGLineTwo[3] + " - " + RCGLineTwo[4];
    console.log(lineOne);


    for (var card = 0; card < 5; card++) {
        cardsL1[card] = new createjs.Bitmap("assets/images/" + RCGLineOne[card] + ".png");
        cardsL1[card].x = 33 + (132.5 * card);
        cardsL1[card].y = 50;
        game.addChild(cardsL1[card]);
        console.log(game.getNumChildren());

        if (RCGLineOne[card] == "tinyWhelpCard") {
            storedCardsL1[card] = 1;
        } else if (RCGLineOne[card] == "IncessantZombieCard") {
            storedCardsL1[card] = 2;
        } else if (RCGLineOne[card] == "FerociousTalonCard") {
            storedCardsL1[card] = 3;
        } else if (RCGLineOne[card] == "DeepwoodWitchCard") {
            storedCardsL1[card] = 4;
        } else if (RCGLineOne[card] == "StormboundGargoyleCard") {
            storedCardsL1[card] = 5;
        }
    }

    for (var card = 0; card < 5; card++) {
        cardsL2[card] = new createjs.Bitmap("assets/images/" + RCGLineTwo[card] + ".png");
        cardsL2[card].x = 33 + (132.5 * card);
        cardsL2[card].y = 261;
        game.addChild(cardsL2[card]);
        console.log(game.getNumChildren());

        if (RCGLineTwo[card] == "tinyWhelpCard") {
            storedCardsL2[card] = 1;
        } else if (RCGLineTwo[card] == "IncessantZombieCard") {
            storedCardsL2[card] = 2;
        } else if (RCGLineTwo[card] == "FerociousTalonCard") {
            storedCardsL2[card] = 3;
        } else if (RCGLineTwo[card] == "DeepwoodWitchCard") {
            storedCardsL2[card] = 4;
        } else if (RCGLineTwo[card] == "StormboundGargoyleCard") {
            storedCardsL2[card] = 5;
        }
    }


    //Displays the card backs for lines 1 and 2.
    for (var cardBackL1 = 0; cardBackL1 < 5; cardBackL1++) {
        cardbacksL1[cardBackL1] = new createjs.Bitmap("assets/images/cardback.png");
        cardbacksL1[cardBackL1].x = 33 + (132.5 * cardBackL1);
        cardbacksL1[cardBackL1].y = 50;
        game.addChild(cardbacksL1[cardBackL1]);
    }

    cardbacksL1[0].addEventListener("click", flipCardOneL1);
    cardbacksL1[1].addEventListener("click", flipCardTwoL1);
    cardbacksL1[2].addEventListener("click", flipCardThreeL1);
    cardbacksL1[3].addEventListener("click", flipCardFourL1);
    cardbacksL1[4].addEventListener("click", flipCardFiveL1);

    for (var cardBackL2 = 0; cardBackL2 < 5; cardBackL2++) {
        cardbacksL2[cardBackL2] = new createjs.Bitmap("assets/images/cardback.png");
        cardbacksL2[cardBackL2].x = 33 + (132.5 * cardBackL2);
        cardbacksL2[cardBackL2].y = 261;
        game.addChild(cardbacksL2[cardBackL2]);
    }
    
    cardbacksL2[0].addEventListener("click", flipCardOneL2);
    cardbacksL2[1].addEventListener("click", flipCardTwoL2);
    cardbacksL2[2].addEventListener("click", flipCardThreeL2);
    cardbacksL2[3].addEventListener("click", flipCardFourL2);
    cardbacksL2[4].addEventListener("click", flipCardFiveL2);
}

function flipCardOneL1() {
    game.removeChild(cardbacksL1[0]);
    switch (cardsL1[0]) {
        case cardsL1[0] = tinyWhelpImage:
            tinyWhelp++;
            unveiledCardsL1[0] = 1;
            break;
        case cardsL1[0] = incessantZombieImage:
            incessantZombie++;
            unveiledCardsL1[0] = 2;
            break;
        case cardsL1[0] = ferociousTalonImage:
            ferociousTalon++;
            unveiledCardsL1[0] = 3;
            break;
        case cardsL1[0] = DeepwoodWitchImage:
            deepwoodWitch++;
            unveiledCardsL1[0] = 4;
            break;
        case cardsL1[0] = StormboundGargoyleImage:
            stormboundGargoyle++;
            unveiledCardsL1[0] = 5;
            break;
    }
    console.log("Card 1 is a " + unveiledCardsL1[0]);
    checkMatchOneL1();
}

function flipCardTwoL1() {
    game.removeChild(cardbacksL1[1]);
    switch (cardsL1[1]) {
        case cardsL1[1] = tinyWhelpImage:
            unveiledCardsL1[1] = 1;
            break;
        case cardsL1[1] = incessantZombieImage:
            unveiledCardsL1[1] = 2;
            break;
        case cardsL1[1] = ferociousTalonImage:
            unveiledCardsL1[1] = 3;
            break;
        case cardsL1[1] = DeepwoodWitchImage:
            unveiledCardsL1[1] = 4;
            break;
        case cardsL1[1] = StormboundGargoyleImage:
            unveiledCardsL1[1] = 5;
            break;
    }
}


function flipCardThreeL1() {
    game.removeChild(cardbacksL1[2]);
    switch (cardsL1[2]) {
        case cardsL1[2] = tinyWhelpImage:
            unveiledCardsL1[2] = 1;
            break;
        case cardsL1[2] = incessantZombieImage:
            unveiledCardsL1[2] = 2;
            break;
        case cardsL1[2] = ferociousTalonImage:
            unveiledCardsL1[2] = 3;
            break;
        case cardsL1[2] = DeepwoodWitchImage:
            unveiledCardsL1[2] = 4;
            break;
        case cardsL1[2] = StormboundGargoyleImage:
            unveiledCardsL1[2] = 5;
            break;
    }
}
function flipCardFourL1() {
    game.removeChild(cardbacksL1[3]);
    switch (cardsL1[3]) {
        case cardsL1[3] = tinyWhelpImage:
            unveiledCardsL1[3] = 1;
            break;
        case cardsL1[3] = incessantZombieImage:
            unveiledCardsL1[3] = 2;
            break;
        case cardsL1[3] = ferociousTalonImage:
            unveiledCardsL1[3] = 3;
            break;
        case cardsL1[3] = DeepwoodWitchImage:
            unveiledCardsL1[3] = 4;
            break;
        case cardsL1[3] = StormboundGargoyleImage:
            unveiledCardsL1[3] = 4;
            break;
    }
}

function flipCardFiveL1() {
    game.removeChild(cardbacksL1[4]);
    switch (cardsL1[4]) {
        case cardsL1[4] = tinyWhelpImage:
            unveiledCardsL1[4] = 1;
            break;
        case cardsL1[4] = incessantZombieImage:
            unveiledCardsL1[4] = 2;
            break;
        case cardsL1[4] = ferociousTalonImage:
            unveiledCardsL1[4] = 3;
            break;
        case cardsL1[4] = DeepwoodWitchImage:
            unveiledCardsL1[4] = 4;
            break;
        case cardsL1[4] = StormboundGargoyleImage:
            unveiledCardsL1[4] = 5;
            break;
    }
}

function flipCardOneL2() {
    game.removeChild(cardbacksL2[0]);
    switch (cardsL2[0]) {
        case cardsL2[0] = tinyWhelpImage:
            tinyWhelp++;
            unveiledCardsL2[0] = 1;
            break;
        case cardsL2[0] = incessantZombieImage:
            incessantZombie++;
            unveiledCardsL2[0] = 2;
            break;
        case cardsL2[0] = ferociousTalonImage:
            ferociousTalon++;
            unveiledCardsL2[0] = 3;
            break;
        case cardsL2[0] = DeepwoodWitchImage:
            deepwoodWitch++;
            unveiledCardsL2[0] = 4;
            break;
        case cardsL2[0] = StormboundGargoyleImage:
            stormboundGargoyle++;
            unveiledCardsL2[0] = 5;
            break;
    }
    checkMatchOneL2();
}

function flipCardTwoL2() {
    game.removeChild(cardbacksL2[1]);
    switch (cardsL2[1]) {
        case cardsL2[1] = tinyWhelpImage:
            tinyWhelp++;
            unveiledCardsL2[1] = 1;
            break;
        case cardsL2[1] = incessantZombieImage:
            incessantZombie++;
            unveiledCardsL2[1] = 2;
            break;
        case cardsL2[1] = ferociousTalonImage:
            ferociousTalon++;
            unveiledCardsL2[1] = 3;
            break;
        case cardsL2[1] = DeepwoodWitchImage:
            deepwoodWitch++;
            unveiledCardsL2[1] = 4;
            break;
        case cardsL2[1] = StormboundGargoyleImage:
            stormboundGargoyle++;
            unveiledCardsL2[1] = 5;
            break;
    }
    checkMatchTwoL2();
}

function flipCardThreeL2() {
    game.removeChild(cardbacksL2[2]);
    switch (cardsL2[2]) {
        case cardsL2[2] = tinyWhelpImage:
            tinyWhelp++;
            unveiledCardsL2[2] = 1;
            break;
        case cardsL2[2] = incessantZombieImage:
            incessantZombie++;
            unveiledCardsL2[2] = 2;
            break;
        case cardsL2[2] = ferociousTalonImage:
            ferociousTalon++;
            unveiledCardsL2[2] = 3;
            break;
        case cardsL2[2] = DeepwoodWitchImage:
            deepwoodWitch++;
            unveiledCardsL2[2] = 4;
            break;
        case cardsL2[2] = StormboundGargoyleImage:
            stormboundGargoyle++;
            unveiledCardsL2[2] = 5;
            break;
    }
    checkMatchThreeL2();
}

function flipCardFourL2() {
    game.removeChild(cardbacksL2[3]);
    switch (cardsL2[3]) {
        case cardsL2[3] = tinyWhelpImage:
            tinyWhelp++;
            unveiledCardsL2[3] = 1;
            break;
        case cardsL2[3] = incessantZombieImage:
            incessantZombie++;
            unveiledCardsL2[3] = 2;
            break;
        case cardsL2[3] = ferociousTalonImage:
            ferociousTalon++;
            unveiledCardsL2[3] = 3;
            break;
        case cardsL2[3] = DeepwoodWitchImage:
            deepwoodWitch++;
            unveiledCardsL2[3] = 4;
            break;
        case cardsL2[3] = StormboundGargoyleImage:
            stormboundGargoyle++;
            unveiledCardsL2[3] = 5;
            break;
    }
    checkMatchFourL2();
}


function flipCardFiveL2() {
    game.removeChild(cardbacksL2[4]);
    switch (cardsL2[4]) {
        case cardsL2[4] = tinyWhelpImage:
            tinyWhelp++;
            unveiledCardsL2[4] = 1;
            break;
        case cardsL2[4] = incessantZombieImage:
            incessantZombie++;
            unveiledCardsL2[4] = 2;
            break;
        case cardsL2[4] = ferociousTalonImage:
            ferociousTalon++;
            unveiledCardsL2[4] = 3;
            break;
        case cardsL2[4] = DeepwoodWitchImage:
            deepwoodWitch++;
            unveiledCardsL2[4] =4;
            break;
        case cardsL2[4] = StormboundGargoyleImage:
            stormboundGargoyle++;
            unveiledCardsL2[4] = 5;
            break;
    }
    checkMatchFiveL2();
}


function checkMatchOneL1() {

    if (unveiledCardsL1[0] == unveiledCardsL1[1] || unveiledCardsL1[0] == unveiledCardsL1[2] || unveiledCardsL1[0] == unveiledCardsL1[3]
        || unveiledCardsL1[0] == unveiledCardsL1[4] || unveiledCardsL1[0] == unveiledCardsL2[0] || unveiledCardsL1[0] == unveiledCardsL2[1]
        || unveiledCardsL1[0] == unveiledCardsL2[1] || unveiledCardsL1[0] == unveiledCardsL2[2] || unveiledCardsL1[0] == unveiledCardsL2[3]
        || unveiledCardsL1[0] == unveiledCardsL2[4]) {

        switch (unveiledCardsL1[0]) {
            case unveiledCardsL1[0] = 1:
                score += (tinyWhelp * 100);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 2:
                score += (incessantZombie * 100);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 3:
                score += (ferociousTalon * 100);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 4:
                score += (deepwoodWitch * 100);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 5:
                score += (stormboundGargoyle * 100);
                console.log("score: " + score);
                break;
  }
    } 
}

function checkMatchTwoL1() {
    
}

function checkMatchThreeL1() {

}

function checkMatchFourL1() {

}

function checkMatchFiveL1() {

}

function checkMatchOneL2() {

}

function checkMatchTwoL2() {

}

function checkMatchThreeL2() {

}

function checkMatchFourL2() {

}

function checkMatchFiveL2() {

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
                break;
            case checkRange(outCome[randomCard], 28, 37): // 15.4% probability
                secondLine[randomCard] = "IncessantZombieCard";
                break;
            case checkRange(outCome[randomCard], 38, 46): // 13.8% probability
                secondLine[randomCard] = "FerociousTalonCard";
                break;
            case checkRange(outCome[randomCard], 47, 54): // 12.3% probability
                secondLine[randomCard] = "DeepwoodWitchCard";
                break;
            case checkRange(outCome[randomCard], 55, 65): //  7.7% probability
                secondLine[randomCard] = "StormboundGargoyleCard";
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