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
var unveiledTinyWhelps = 0;
var unveiledIncessantZombies = 0;
var unveiledFerociousTalons = 0;
var unveiledDeepwoodWitches = 0;
var unveiledStormboundGargoyles = 0;

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
    switch (storedCardsL1[0]) {
        case storedCardsL1[0] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL1[0] = 1;
            break;
        case storedCardsL1[0] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL1[0] = 2;
            break;
        case storedCardsL1[0] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL1[0] = 3;
            break;
        case storedCardsL1[0] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL1[0] = 4;
            break;
        case storedCardsL1[0] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL1[0] = 5;
            break;
    }
    console.log("Card 1 is a " + unveiledCardsL1[0]);
    checkMatchOneL1();
}

function flipCardTwoL1() {
    game.removeChild(cardbacksL1[1]);
    switch (storedCardsL1[1]) {
        case storedCardsL1[1] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL1[1] = 1;
            break;
        case storedCardsL1[1] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL1[1] = 2;
            break;
        case storedCardsL1[1] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL1[1] = 3;
            break;
        case storedCardsL1[1] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL1[1] = 4;
            break;
        case storedCardsL1[1] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL1[1] = 5;
            break;
    }
    console.log("Card 2 is a " + unveiledCardsL1[1]);
}


function flipCardThreeL1() {
    game.removeChild(cardbacksL1[2]);
    switch (storedCardsL1[2]) {
        case storedCardsL1[2] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL1[2] = 1;
            break;
        case storedCardsL1[2] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL1[2] = 2;
            break;
        case storedCardsL1[2] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL1[2] = 3;
            break;
        case storedCardsL1[2] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL1[2] = 4;
            break;
        case storedCardsL1[2] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL1[2] = 5;
            break;
    }
    console.log("Card 3 is a " + unveiledCardsL1[2]);
}

function flipCardFourL1() {
    game.removeChild(cardbacksL1[3]);
    switch (storedCardsL1[3]) {
        case storedCardsL1[3] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL1[3] = 1;
            break;
        case storedCardsL1[3] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL1[3] = 2;
            break;
        case storedCardsL1[3] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL1[3] = 3;
            break;
        case storedCardsL1[3] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL1[3] = 4;
            break;
        case storedCardsL1[3] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL1[3] = 5;
            break;
    }
    console.log("Card 4 is a " + unveiledCardsL1[3]);
}

function flipCardFiveL1() {
    game.removeChild(cardbacksL1[4]);
    switch (storedCardsL1[4]) {
        case storedCardsL1[4] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL1[4] = 1;
            break;
        case storedCardsL1[4] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL1[4] = 2;
            break;
        case storedCardsL1[4] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL1[4] = 3;
            break;
        case storedCardsL1[4] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL1[4] = 4;
            break;
        case storedCardsL1[4] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL1[4] = 5;
            break;
    }
    console.log("Card 5 is a " + unveiledCardsL1[4]);
}

function flipCardOneL2() {
    game.removeChild(cardbacksL2[0]);
    switch (storedCardsL2[0]) {
        case storedCardsL2[0] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL2[0] = 1;
            break;
        case storedCardsL2[0] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL2[0] = 2;
            break;
        case storedCardsL2[0] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL2[0] = 3;
            break;
        case storedCardsL2[0] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL2[0] = 4;
            break;
        case storedCardsL2[0] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL2[0] = 5;
            break;
    }
    console.log("Card 6 is a " + unveiledCardsL2[0]);
}

function flipCardTwoL2() {
    game.removeChild(cardbacksL2[1]);
    switch (storedCardsL2[1]) {
        case storedCardsL2[1] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL2[1] = 1;
            break;
        case storedCardsL2[1] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL2[1] = 2;
            break;
        case storedCardsL2[1] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL2[1] = 3;
            break;
        case storedCardsL2[1] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL2[1] = 4;
            break;
        case storedCardsL2[1] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL2[1] = 5;
            break;
    }
    console.log("Card 7 is a " + unveiledCardsL2[1]);
}

function flipCardThreeL2() {
    game.removeChild(cardbacksL2[2]);
    switch (storedCardsL2[2]) {
        case storedCardsL2[2] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL2[2] = 1;
            break;
        case storedCardsL2[2] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL2[2] = 2;
            break;
        case storedCardsL2[2] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL2[2] = 3;
            break;
        case storedCardsL2[2] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL2[2] = 4;
            break;
        case storedCardsL2[2] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL2[2] = 5;
            break;
    }
    console.log("Card 8 is a " + unveiledCardsL2[2]);
}

function flipCardFourL2() {
    game.removeChild(cardbacksL2[3]);
    switch (storedCardsL2[3]) {
        case storedCardsL2[3] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL2[3] = 1;
            break;
        case storedCardsL2[3] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL2[3] = 2;
            break;
        case storedCardsL2[3] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL2[3] = 3;
            break;
        case storedCardsL2[3] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL2[3] = 4;
            break;
        case storedCardsL2[3] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL2[3] = 5;
            break;
    }
    console.log("Card 9 is a " + unveiledCardsL2[3]);
}


function flipCardFiveL2() {
    game.removeChild(cardbacksL2[4]);
    switch (storedCardsL2[4]) {
        case storedCardsL2[4] = 1:
            unveiledTinyWhelps += 1;
            unveiledCardsL2[4] = 1;
            break;
        case storedCardsL2[4] = 2:
            unveiledIncessantZombies += 1;
            unveiledCardsL2[4] = 2;
            break;
        case storedCardsL2[4] = 3:
            unveiledFerociousTalons += 1;
            unveiledCardsL2[4] = 3;
            break;
        case storedCardsL2[4] = 4:
            unveiledDeepwoodWitches += 1;
            unveiledCardsL2[4] = 4;
            break;
        case storedCardsL2[4] = 5:
            unveiledStormboundGargoyles += 1;
            unveiledCardsL2[4] = 5;
            break;
    }
    console.log("Card 10 is a " + unveiledCardsL2[4]);
}


function checkMatchOneL1() {
    if (unveiledCardsL1[0] == unveiledCardsL1[1] || unveiledCardsL1[0] == unveiledCardsL1[2] || unveiledCardsL1[0] == unveiledCardsL1[3]
        || unveiledCardsL1[0] == unveiledCardsL1[4] || unveiledCardsL1[0] == unveiledCardsL2[0] || unveiledCardsL1[0] == unveiledCardsL2[1]
        || unveiledCardsL1[0] == unveiledCardsL2[2] || unveiledCardsL1[0] == unveiledCardsL2[3] || unveiledCardsL1[0] == unveiledCardsL2[4])
        {

        switch (unveiledCardsL1[0]) {
            case unveiledCardsL1[0] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                break;
            case unveiledCardsL1[0] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
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
                break;
            case checkRange(outCome[randomCard], 28, 37): // 15.4% probability
                firstLine[randomCard] = "IncessantZombieCard";
                break;
            case checkRange(outCome[randomCard], 38, 46): // 13.8% probability
                firstLine[randomCard] = "FerociousTalonCard";
                break;
            case checkRange(outCome[randomCard], 47, 54): // 12.3% probability
                firstLine[randomCard] = "DeepwoodWitchCard";
                break;
            case checkRange(outCome[randomCard], 55, 65): //  7.7% probability
                firstLine[randomCard] = "StormboundGargoyleCard";
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