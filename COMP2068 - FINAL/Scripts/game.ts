/*
 *COMP2068 - Final Project
 * Monster Matcher Game
 * This is the main typescript file for the game. 
 * The game loads with the start screen appearing with two options: play now and instructions.
 * The instructions screen tells the user the rules of the game and how to get started.
 * The play now button will start the game and will continue until the player runs out of life points.
 * After this, the game will display a game over screen with the players score.
 * Created by: Brendan Kallio
 * Date: April 13, 2015
*/

//The canvas where the game will be displayed
var canvas;
var stage: createjs.Stage;

// Game Objects
var background: createjs.Bitmap;
var startPage: createjs.Bitmap;
var gameOverPage: createjs.Bitmap;
var instructionsPage: createjs.Bitmap;
var playAgainButton: createjs.Bitmap;
var playButton: createjs.Bitmap;
var instructionsButton: createjs.Bitmap;
var game: createjs.Container; 

//arrays of the cards on line one and two
var cardsL1: createjs.Bitmap[] = [];
var cardsL2: createjs.Bitmap[] = [];

//an array that stores the cards on lines one and two as numbers
var storedCardsL1: Array<number> = [];
var storedCardsL2: Array<number> = [];

//an array of cardbacks
var cardbacksL1: createjs.Bitmap[] = [];
var cardbacksL2: createjs.Bitmap[] = [];

//an array of the cards the user has flipped over and stored as numbers
var unveiledCardsL1: Array<number> = [];
var unveiledCardsL2: Array<number> = [];

//containers for score and life to be displayed
var scoreContainer = new createjs.Container();
var lifeContainer = new createjs.Container();
var gameOverScoreContainer = new createjs.Container();

// Game Variables
var lineOne;
var lineTwo;
var score = 0;
var life = 30;
var RCGLineOne;
var RCGLineTwo;
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

//button hover effects
function playButtonOut() {
    playButton.alpha = 1.0;
}

function playButtonOver() {
    playButton.alpha = 0.5;
}

function instructionsButtonOut() {
    instructionsButton.alpha = 1.0;
}

function instructionsButtonOver() {
    instructionsButton.alpha = 0.5;
}

function playAgainButtonOut() {
    playAgainButton.alpha = 1.0;
}

function playAgainButtonOver() {
    playAgainButton.alpha = 0.5;
}

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); 
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

//Fetches which cards have been selected for each row and designates the appropriate number into the stored cards arrays
//This function also adds the card backs on top of the card images.
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

//Flip card functions that tell the game to remove the selected card back and tally which card has been revealed
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
    checkMatchTwoL1();
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
    checkMatchThreeL1();
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
    checkMatchFourL1();
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
    checkMatchFiveL1();
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
    checkMatchOneL2();
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
    checkMatchTwoL2();
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
    checkMatchThreeL2();
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
    checkMatchFourL2();
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
    checkMatchFiveL2();
}

//These functions check for matches amongst revealed cards and updates the players score and life points accordingly
function checkMatchOneL1() {
    if (unveiledCardsL1[0] == unveiledCardsL1[1] || unveiledCardsL1[0] == unveiledCardsL1[2] || unveiledCardsL1[0] == unveiledCardsL1[3]
        || unveiledCardsL1[0] == unveiledCardsL1[4]) {

        switch (unveiledCardsL1[0]) {
            case unveiledCardsL1[0] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[0] == unveiledCardsL2[0] || unveiledCardsL1[0] == unveiledCardsL2[1] || unveiledCardsL1[0] == unveiledCardsL2[2]
        || unveiledCardsL1[0] == unveiledCardsL2[3] || unveiledCardsL1[0] == unveiledCardsL2[4]) {
        switch (unveiledCardsL1[0]) {
            case unveiledCardsL1[0] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[0] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[0] != unveiledCardsL1[1] && unveiledCardsL1[0] != unveiledCardsL1[2] && unveiledCardsL1[0] != unveiledCardsL1[3]
        && unveiledCardsL1[0] != unveiledCardsL1[4]) {
        if (unveiledCardsL1[0] != unveiledCardsL2[0] && unveiledCardsL1[0] != unveiledCardsL2[1] && unveiledCardsL1[0] != unveiledCardsL2[2]
            && unveiledCardsL1[0] != unveiledCardsL2[3] && unveiledCardsL1[0] != unveiledCardsL2[4]) {
            switch (unveiledCardsL1[0]) {
                case unveiledCardsL1[0] = 1:
                    life -= unveiledTinyWhelps;
                    lifeText.text = "" + life;
                case unveiledCardsL1[0] = 2:
                    life -= unveiledIncessantZombies * 2;
                    lifeText.text = "" + life;
                case unveiledCardsL1[0] = 3:
                    life -= unveiledFerociousTalons * 3;
                    lifeText.text = "" + life;
                case unveiledCardsL1[0] = 4:
                    life -= unveiledDeepwoodWitches * 4;
                    lifeText.text = "" + life;
                case unveiledCardsL1[0] = 5:
                    life -= unveiledStormboundGargoyles * 5;
                    lifeText.text = "" + life;
            }
        }
        checkBoardState();
        checkLife();
    }
}


function checkMatchTwoL1() {
    if (unveiledCardsL1[1] == unveiledCardsL1[0] || unveiledCardsL1[1] == unveiledCardsL1[2] || unveiledCardsL1[1] == unveiledCardsL1[3]
        || unveiledCardsL1[1] == unveiledCardsL1[4]) {

        switch (unveiledCardsL1[1]) {
            case unveiledCardsL1[1] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[1] == unveiledCardsL2[0] || unveiledCardsL1[1] == unveiledCardsL2[1] || unveiledCardsL1[1] == unveiledCardsL2[2]
        || unveiledCardsL1[1] == unveiledCardsL2[3] || unveiledCardsL1[1] == unveiledCardsL2[4]) {
        switch (unveiledCardsL1[1]) {
            case unveiledCardsL1[1] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[1] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[1] != unveiledCardsL1[0] && unveiledCardsL1[1] != unveiledCardsL1[2] && unveiledCardsL1[1] != unveiledCardsL1[3]
        && unveiledCardsL1[1] != unveiledCardsL1[4]) {
        if (unveiledCardsL1[1] != unveiledCardsL2[0] && unveiledCardsL1[1] != unveiledCardsL2[1] && unveiledCardsL1[1] != unveiledCardsL2[2]
            && unveiledCardsL1[1] != unveiledCardsL2[3] && unveiledCardsL1[1] != unveiledCardsL2[4]) {
            switch (unveiledCardsL1[1]) {
                case unveiledCardsL1[1] = 1:
                    life -= unveiledTinyWhelps;
                    lifeText.text = "" + life;
                case unveiledCardsL1[1] = 2:
                    life -= unveiledIncessantZombies * 2;
                    lifeText.text = "" + life;
                case unveiledCardsL1[1] = 3:
                    life -= unveiledFerociousTalons * 3;
                    lifeText.text = "" + life;
                case unveiledCardsL1[1] = 4:
                    life -= unveiledDeepwoodWitches * 4;
                    lifeText.text = "" + life;
                case unveiledCardsL1[1] = 5:
                    life -= unveiledStormboundGargoyles * 5;
                    lifeText.text = "" + life;
            }
        }
    }
    checkBoardState();
    checkLife();
}

function checkMatchThreeL1() {
    if (unveiledCardsL1[2] == unveiledCardsL1[1] || unveiledCardsL1[2] == unveiledCardsL1[0] || unveiledCardsL1[2] == unveiledCardsL1[3]
        || unveiledCardsL1[2] == unveiledCardsL1[4]) {

        switch (unveiledCardsL1[2]) {
            case unveiledCardsL1[2] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[2] == unveiledCardsL2[0] || unveiledCardsL1[2] == unveiledCardsL2[1] || unveiledCardsL1[2] == unveiledCardsL2[2]
        || unveiledCardsL1[2] == unveiledCardsL2[3] || unveiledCardsL1[2] == unveiledCardsL2[4]) {
        switch (unveiledCardsL1[2]) {
            case unveiledCardsL1[2] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[2] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[2] != unveiledCardsL1[1] && unveiledCardsL1[2] != unveiledCardsL1[0] && unveiledCardsL1[2] != unveiledCardsL1[3]
        && unveiledCardsL1[2] != unveiledCardsL1[4]) {
        if (unveiledCardsL1[2] != unveiledCardsL2[0] && unveiledCardsL1[2] != unveiledCardsL2[1] && unveiledCardsL1[2] != unveiledCardsL2[2]
            && unveiledCardsL1[2] != unveiledCardsL2[3] && unveiledCardsL1[2] != unveiledCardsL2[4]) {
        switch (unveiledCardsL1[2]) {
            case unveiledCardsL1[2] = 1:
                life -= unveiledTinyWhelps;
                lifeText.text = "" + life;
            case unveiledCardsL1[2] = 2:
                life -= unveiledIncessantZombies * 2;
                lifeText.text = "" + life;
            case unveiledCardsL1[2] = 3:
                life -= unveiledFerociousTalons * 3;
                lifeText.text = "" + life;
            case unveiledCardsL1[2] = 4:
                life -= unveiledDeepwoodWitches * 4;
                lifeText.text = "" + life;
            case unveiledCardsL1[2] = 5:
                life -= unveiledStormboundGargoyles * 5;
                lifeText.text = "" + life;
            }
        } 
    }
    checkBoardState();
    checkLife();
}

function checkMatchFourL1() {
    if (unveiledCardsL1[3] == unveiledCardsL1[1] || unveiledCardsL1[3] == unveiledCardsL1[2] || unveiledCardsL1[3] == unveiledCardsL1[0]
        || unveiledCardsL1[3] == unveiledCardsL1[4]) {

        switch (unveiledCardsL1[3]) {
            case unveiledCardsL1[3] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[3] == unveiledCardsL2[0] || unveiledCardsL1[3] == unveiledCardsL2[1] || unveiledCardsL1[3] == unveiledCardsL2[2]
        || unveiledCardsL1[3] == unveiledCardsL2[3] || unveiledCardsL1[3] == unveiledCardsL2[4]) {
        switch (unveiledCardsL1[3]) {
            case unveiledCardsL1[3] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[3] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[3] != unveiledCardsL1[1] && unveiledCardsL1[3] != unveiledCardsL1[2] && unveiledCardsL1[3] != unveiledCardsL1[0]
        && unveiledCardsL1[3] != unveiledCardsL1[4]) {
        if (unveiledCardsL1[3] != unveiledCardsL2[0] && unveiledCardsL1[3] != unveiledCardsL2[1] && unveiledCardsL1[3] != unveiledCardsL2[2]
            && unveiledCardsL1[3] != unveiledCardsL2[3] && unveiledCardsL1[3] != unveiledCardsL2[4]) {
            switch (unveiledCardsL1[3]) {
                case unveiledCardsL1[3] = 1:
                    life -= unveiledTinyWhelps;
                    lifeText.text = "" + life;
                case unveiledCardsL1[3] = 2:
                    life -= unveiledIncessantZombies * 2;
                    lifeText.text = "" + life;
                case unveiledCardsL1[3] = 3:
                    life -= unveiledFerociousTalons * 3;
                    lifeText.text = "" + life;
                case unveiledCardsL1[3] = 4:
                    life -= unveiledDeepwoodWitches * 4;
                    lifeText.text = "" + life;
                case unveiledCardsL1[3] = 5:
                    life -= unveiledStormboundGargoyles * 5;
                    lifeText.text = "" + life;
            }
        }
    }
    checkBoardState();
    checkLife();
}

function checkMatchFiveL1() {
    if (unveiledCardsL1[4] == unveiledCardsL1[1] || unveiledCardsL1[4] == unveiledCardsL1[2] || unveiledCardsL1[4] == unveiledCardsL1[3]
        || unveiledCardsL1[4] == unveiledCardsL1[0]) {

        switch (unveiledCardsL1[4]) {
            case unveiledCardsL1[4] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[4] == unveiledCardsL2[0] || unveiledCardsL1[4] == unveiledCardsL2[1] || unveiledCardsL1[4] == unveiledCardsL2[2]
        || unveiledCardsL1[4] == unveiledCardsL2[3] || unveiledCardsL1[4] == unveiledCardsL2[4]) {
        switch (unveiledCardsL1[4]) {
            case unveiledCardsL1[4] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL1[4] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL1[4] != unveiledCardsL1[1] && unveiledCardsL1[4] != unveiledCardsL1[2] && unveiledCardsL1[4] != unveiledCardsL1[3]
        && unveiledCardsL1[4] != unveiledCardsL1[0]) {
        if (unveiledCardsL1[4] != unveiledCardsL2[0] && unveiledCardsL1[4] != unveiledCardsL2[1] && unveiledCardsL1[4] != unveiledCardsL2[2]
            && unveiledCardsL1[4] != unveiledCardsL2[3] && unveiledCardsL1[4] != unveiledCardsL2[4]) {
        switch (unveiledCardsL1[4]) {
            case unveiledCardsL1[4] = 1:
                life -= unveiledTinyWhelps;
                lifeText.text = "" + life;
            case unveiledCardsL1[4] = 2:
                life -= unveiledIncessantZombies * 2;
                lifeText.text = "" + life;
            case unveiledCardsL1[4] = 3:
                life -= unveiledFerociousTalons * 3;
                lifeText.text = "" + life;
            case unveiledCardsL1[4] = 4:
                life -= unveiledDeepwoodWitches * 4;
                lifeText.text = "" + life;
            case unveiledCardsL1[4] = 5:
                life -= unveiledStormboundGargoyles * 5;
                lifeText.text = "" + life;
            }
        } 
    }
    checkBoardState();
    checkLife();
}

function checkMatchOneL2() {
    if (unveiledCardsL2[0] == unveiledCardsL1[0] || unveiledCardsL2[0] == unveiledCardsL1[1] || unveiledCardsL2[0] == unveiledCardsL1[2]
        || unveiledCardsL2[0] == unveiledCardsL1[3] || unveiledCardsL2[0] == unveiledCardsL1[4]) {

        switch (unveiledCardsL2[0]) {
            case unveiledCardsL2[0] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[0] == unveiledCardsL2[1] || unveiledCardsL2[0] == unveiledCardsL2[2] || unveiledCardsL2[0] == unveiledCardsL2[3]
        || unveiledCardsL2[0] == unveiledCardsL2[4]) {
        switch (unveiledCardsL2[0]) {
            case unveiledCardsL2[0] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[0] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[0] != unveiledCardsL1[0] && unveiledCardsL2[0] != unveiledCardsL1[1] && unveiledCardsL2[0] != unveiledCardsL1[2]
        && unveiledCardsL2[0] != unveiledCardsL1[3] && unveiledCardsL2[0] != unveiledCardsL1[4]) {
        if (unveiledCardsL2[0] != unveiledCardsL2[1] && unveiledCardsL2[0] != unveiledCardsL2[2] && unveiledCardsL2[0] != unveiledCardsL2[3]
            && unveiledCardsL2[0] != unveiledCardsL2[4]) {
        switch (unveiledCardsL2[0]) {
            case unveiledCardsL2[0] = 1:
                life -= unveiledTinyWhelps;
                lifeText.text = "" + life;
            case unveiledCardsL2[0] = 2:
                life -= unveiledIncessantZombies * 2;
                lifeText.text = "" + life;
            case unveiledCardsL2[0] = 3:
                life -= unveiledFerociousTalons * 3;
                lifeText.text = "" + life;
            case unveiledCardsL2[0] = 4:
                life -= unveiledDeepwoodWitches * 4;
                lifeText.text = "" + life;
            case unveiledCardsL2[0] = 5:
                life -= unveiledStormboundGargoyles * 5;
                lifeText.text = "" + life;
            }
        }
    }
    checkBoardState();
    checkLife();
}

function checkMatchTwoL2() {
    if (unveiledCardsL2[1] == unveiledCardsL1[0] || unveiledCardsL2[1] == unveiledCardsL1[1] || unveiledCardsL2[1] == unveiledCardsL1[2]
        || unveiledCardsL2[1] == unveiledCardsL1[3] || unveiledCardsL2[1] == unveiledCardsL1[4]) {

        switch (unveiledCardsL2[1]) {
            case unveiledCardsL2[1] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[1] == unveiledCardsL2[0] || unveiledCardsL2[1] == unveiledCardsL2[2] || unveiledCardsL2[1] == unveiledCardsL2[3]
        || unveiledCardsL2[1] == unveiledCardsL2[4]) {
        switch (unveiledCardsL2[1]) {
            case unveiledCardsL2[1] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[1] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[1] != unveiledCardsL1[0] && unveiledCardsL2[1] != unveiledCardsL1[1] && unveiledCardsL2[1] != unveiledCardsL1[2]
        && unveiledCardsL2[1] != unveiledCardsL1[3] && unveiledCardsL2[1] != unveiledCardsL1[4]) {
        if (unveiledCardsL2[1] != unveiledCardsL2[0] && unveiledCardsL2[1] != unveiledCardsL2[2] && unveiledCardsL2[1] != unveiledCardsL2[3]
            && unveiledCardsL2[1] != unveiledCardsL2[4]) {
        switch (unveiledCardsL2[1]) {
            case unveiledCardsL2[1] = 1:
                life -= unveiledTinyWhelps;
                lifeText.text = "" + life;
            case unveiledCardsL2[1] = 2:
                life -= unveiledIncessantZombies * 2;
                lifeText.text = "" + life;
            case unveiledCardsL2[1] = 3:
                life -= unveiledFerociousTalons * 3;
                lifeText.text = "" + life;
            case unveiledCardsL2[1] = 4:
                life -= unveiledDeepwoodWitches * 4;
                lifeText.text = "" + life;
            case unveiledCardsL2[1] = 5:
                life -= unveiledStormboundGargoyles * 5;
                lifeText.text = "" + life;
            }
        }
    }
    checkBoardState();
    checkLife();
}

function checkMatchThreeL2() {
    if (unveiledCardsL2[2] == unveiledCardsL1[0] || unveiledCardsL2[2] == unveiledCardsL1[1] || unveiledCardsL2[2] == unveiledCardsL1[2]
        || unveiledCardsL2[2] == unveiledCardsL1[3] || unveiledCardsL2[2] == unveiledCardsL1[4]) {

        switch (unveiledCardsL2[2]) {
            case unveiledCardsL2[2] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[2] == unveiledCardsL2[1] || unveiledCardsL2[2] == unveiledCardsL2[0] || unveiledCardsL2[2] == unveiledCardsL2[3]
        || unveiledCardsL2[2] == unveiledCardsL2[4]) {
        switch (unveiledCardsL2[2]) {
            case unveiledCardsL2[2] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[2] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[2] != unveiledCardsL1[0] && unveiledCardsL2[2] != unveiledCardsL1[1] && unveiledCardsL2[2] != unveiledCardsL1[2]
        && unveiledCardsL2[2] != unveiledCardsL1[3] && unveiledCardsL2[2] != unveiledCardsL1[4]) {
        if (unveiledCardsL2[2] != unveiledCardsL2[0] && unveiledCardsL2[2] != unveiledCardsL2[1] && unveiledCardsL2[2] != unveiledCardsL2[3]
            && unveiledCardsL2[2] != unveiledCardsL2[4]) {
            switch (unveiledCardsL2[2]) {
                case unveiledCardsL2[2] = 1:
                    life -= unveiledTinyWhelps;
                    lifeText.text = "" + life;
                case unveiledCardsL2[2] = 2:
                    life -= unveiledIncessantZombies * 2;
                    lifeText.text = "" + life;
                case unveiledCardsL2[2] = 3:
                    life -= unveiledFerociousTalons * 3;
                    lifeText.text = "" + life;
                case unveiledCardsL2[2] = 4:
                    life -= unveiledDeepwoodWitches * 4;
                    lifeText.text = "" + life;
                case unveiledCardsL2[2] = 5:
                    life -= unveiledStormboundGargoyles * 5;
                    lifeText.text = "" + life;
            }
        }
    }
    checkBoardState();
    checkLife();
}

function checkMatchFourL2() {
    if (unveiledCardsL2[3] == unveiledCardsL1[0] || unveiledCardsL2[3] == unveiledCardsL1[1] || unveiledCardsL2[3] == unveiledCardsL1[2]
        || unveiledCardsL2[3] == unveiledCardsL1[3] || unveiledCardsL2[3] == unveiledCardsL1[4]) {

        switch (unveiledCardsL2[3]) {
            case unveiledCardsL2[3] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[3] == unveiledCardsL2[0] || unveiledCardsL2[3] == unveiledCardsL2[2] || unveiledCardsL2[3] == unveiledCardsL2[1]
        || unveiledCardsL2[3] == unveiledCardsL2[4]) {
        switch (unveiledCardsL2[3]) {
            case unveiledCardsL2[3] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[3] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[3] != unveiledCardsL1[0] && unveiledCardsL2[3] != unveiledCardsL1[1] && unveiledCardsL2[3] != unveiledCardsL1[2]
        && unveiledCardsL2[3] != unveiledCardsL1[3] && unveiledCardsL2[3] != unveiledCardsL1[4]) {
        if (unveiledCardsL2[3] != unveiledCardsL2[0] && unveiledCardsL2[3] != unveiledCardsL2[2] && unveiledCardsL2[3] != unveiledCardsL2[1]
            && unveiledCardsL2[3] != unveiledCardsL2[4]) {
        switch (unveiledCardsL2[3]) {
            case unveiledCardsL2[3] = 1:
                life -= unveiledTinyWhelps;
                lifeText.text = "" + life;
            case unveiledCardsL2[3] = 2:
                life -= unveiledIncessantZombies * 2;
                lifeText.text = "" + life;
            case unveiledCardsL2[3] = 3:
                life -= unveiledFerociousTalons * 3;
                lifeText.text = "" + life;
            case unveiledCardsL2[3] = 4:
                life -= unveiledDeepwoodWitches * 4;
                lifeText.text = "" + life;
            case unveiledCardsL2[3] = 5:
                life -= unveiledStormboundGargoyles * 5;
                lifeText.text = "" + life;
            }
        } 
    }
    checkBoardState();
    checkLife();
}

function checkMatchFiveL2() {
    if (unveiledCardsL2[4] == unveiledCardsL1[0] || unveiledCardsL2[4] == unveiledCardsL1[1] || unveiledCardsL2[4] == unveiledCardsL1[2]
        || unveiledCardsL2[4] == unveiledCardsL1[3] || unveiledCardsL2[4] == unveiledCardsL1[4]) {

        switch (unveiledCardsL2[4]) {
            case unveiledCardsL2[4] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[4] == unveiledCardsL2[0] || unveiledCardsL2[4] == unveiledCardsL2[2] || unveiledCardsL2[4] == unveiledCardsL2[3]
        || unveiledCardsL2[4] == unveiledCardsL2[1]) {
        switch (unveiledCardsL2[4]) {
            case unveiledCardsL2[4] = 1:
                if (unveiledTinyWhelps >= 2) {
                    score += unveiledTinyWhelps * 100;
                }
                console.log("# of whelps: " + unveiledTinyWhelps);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 2:
                if (unveiledIncessantZombies >= 2) {
                    score += (unveiledIncessantZombies * 2) * 100;
                }
                console.log("# of zombies: " + unveiledIncessantZombies);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 3:
                if (unveiledFerociousTalons >= 2) {
                    score += (unveiledFerociousTalons * 3) * 100;
                }
                console.log("# of talons: " + unveiledFerociousTalons);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 4:
                if (unveiledDeepwoodWitches >= 2) {
                    score += (unveiledDeepwoodWitches * 4) * 100;
                }
                console.log("# of witches: " + unveiledDeepwoodWitches);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
            case unveiledCardsL2[4] = 5:
                if (unveiledStormboundGargoyles >= 2) {
                    score += (unveiledStormboundGargoyles * 5) * 100;
                }
                console.log("# of gargoyles: " + unveiledStormboundGargoyles);
                console.log("score: " + score);
                scoreText.text = "" + score;
                break;
        }
    } else if (unveiledCardsL2[4] != unveiledCardsL1[0] && unveiledCardsL2[4] != unveiledCardsL1[1] && unveiledCardsL2[4] != unveiledCardsL1[2]
        && unveiledCardsL2[4] != unveiledCardsL1[3] && unveiledCardsL2[4] != unveiledCardsL1[4]) {
        if (unveiledCardsL2[4] != unveiledCardsL2[0] && unveiledCardsL2[4] != unveiledCardsL2[2] && unveiledCardsL2[4] != unveiledCardsL2[3]
            && unveiledCardsL2[4] != unveiledCardsL2[1]) {
        switch (unveiledCardsL2[4]) {
            case unveiledCardsL2[4] = 1:
                life -= unveiledTinyWhelps;
                lifeText.text = "" + life;
            case unveiledCardsL2[4] = 2:
                life -= unveiledIncessantZombies * 2;
                lifeText.text = "" + life;
            case unveiledCardsL2[4] = 3:
                life -= unveiledFerociousTalons * 3;
                lifeText.text = "" + life;
            case unveiledCardsL2[4] = 4:
                life -= unveiledDeepwoodWitches * 4;
                lifeText.text = "" + life;
            case unveiledCardsL2[4] = 5:
                life -= unveiledStormboundGargoyles * 5;
                lifeText.text = "" + life;
            }
        }
    }
    checkBoardState();
    checkLife();
}

//This function checks to see if the user has selected all the cards and resets the game board with new cards
function checkBoardState() {
    if (unveiledCardsL1[0] == storedCardsL1[0] && unveiledCardsL1[1] == storedCardsL1[1] && unveiledCardsL1[2] == storedCardsL1[2]
        && unveiledCardsL1[3] == storedCardsL1[3] && unveiledCardsL1[4] == storedCardsL1[4]) {
        if (unveiledCardsL2[0] == storedCardsL2[0] && unveiledCardsL2[1] == storedCardsL2[1] && unveiledCardsL2[2] == storedCardsL2[2]
            && unveiledCardsL2[3] == storedCardsL2[3] && unveiledCardsL2[4] == storedCardsL2[4]) {

            console.log("Board State changed");
            for (var card = 0; card < 5; card++) {
                game.removeChild(cardsL1[card]);
            }

            for (var card = 0; card < 5; card++) {
                game.removeChild(cardsL2[card]);
            }
            unveiledTinyWhelps = 0;
            unveiledIncessantZombies = 0;
            unveiledFerociousTalons = 0;
            unveiledDeepwoodWitches = 0;
            unveiledStormboundGargoyles = 0;
            BoardState();
            LoadCards();
        }
    }
}

//Thus function checks to see if the player's life ever reach zero or below. If so, it displays the game over screen and a play again option
function checkLife() {
    if (life <= 0) {
        gameOverPage = new createjs.Bitmap("assets/images/gameOverPage.png");  
        game.addChild(gameOverPage);

        //Displays the player's score
        gameOverScoreContainer.x = 360;
        gameOverScoreContainer.y = 180;
        gameOverScoreContainer.addChild(scoreText);
        game.addChild(gameOverScoreContainer);

        playAgainButton = new createjs.Bitmap("assets/images/playAgainButton.png");
        playAgainButton.x = 198;
        playAgainButton.y = 300;
        game.addChild(playAgainButton);
        playAgainButton.addEventListener("click", playAgain);
        playAgainButton.addEventListener("mouseover", playAgainButtonOver);
        playAgainButton.addEventListener("mouseout", playAgainButtonOut);

    }
}

//This function restarts the game as if the user just reloaded the webpage
function playAgain() {

    game.removeChild(gameOverPage);
    game.removeChild(gameOverScoreContainer);
    game.removeChild(playAgainButton);
    for (var card = 0; card < 5; card++) {
        game.removeChild(cardsL1[card]);
    }
    for (var card = 0; card < 5; card++) {
        game.removeChild(cardsL2[card]);
    }

    for (var card = 0; card < 5; card++) {
        game.removeChild(cardbacksL1[card]);
    }
    for (var card = 0; card < 5; card++) {
        game.removeChild(cardbacksL2[card]);
    }

    game.removeChild(background);
    game.removeChild(lifeContainer);
    game.removeChild(scoreContainer);
    unveiledTinyWhelps = 0;
    unveiledIncessantZombies = 0;
    unveiledFerociousTalons = 0;
    unveiledDeepwoodWitches = 0;
    unveiledStormboundGargoyles = 0;
    createUI();
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

//This function determines what cards are chosen on the first and second rows
// This is accomplished by picking a random number between 1 and 100. Each card 
//is then given a fixed range. If the cards range is within the bounds determined by
//the random number, that card is selected.
function BoardState() {
    var firstLine = [" ", " ", " ", " ", " "];
    var secondLine = [" ", " ", " ", " ", " "];
    var outCome = [0, 0, 0, 0 , 0];

    for (var randomCard = 0; randomCard < 5; randomCard++) {
        outCome[randomCard] = Math.floor((Math.random() * 100) + 1);
        switch (outCome[randomCard]) {
            case checkRange(outCome[randomCard], 1, 30):  
                firstLine[randomCard] = "tinyWhelpCard";
                break;
            case checkRange(outCome[randomCard], 31, 65): 
                firstLine[randomCard] = "IncessantZombieCard";
                break;
            case checkRange(outCome[randomCard], 66, 80): 
                firstLine[randomCard] = "FerociousTalonCard";
                break;
            case checkRange(outCome[randomCard], 81, 90): 
                firstLine[randomCard] = "DeepwoodWitchCard";
                break;
            case checkRange(outCome[randomCard], 91, 100): 
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

//The game starts when this button is clicked on the start page
function playNow() {
    game.removeChild(playButton);
    game.removeChild(instructionsButton);
    game.removeChild(startPage);
}

function gameLoop() {
    stage.update();
}

function main() {
    // instantiate game container
    game = new createjs.Container();
    createUI();
    stage.addChild(game);
}

function showInstructions() {
    instructionsPage = new createjs.Bitmap("assets/images/instructionsPage.png");
    stage.addChild(instructionsPage);
    instructionsPage.addEventListener("click", backToHome);
}

function backToHome() {
    stage.removeChild(instructionsPage);
}

function createUI(): void {
    // instantiate background
    background = new createjs.Bitmap("assets/images/MonsterMatcherBackground.png");
    game.addChild(background);

    //Displays the player's score
    score = 0;
    scoreContainer.x = 600;
    scoreContainer.y = 454;
    scoreText.text = "" + score;
    scoreContainer.addChild(scoreText);
    game.addChild(scoreContainer);

    //Displays the player's life total
    life = 30;
    lifeContainer.x = 200;
    lifeContainer.y = 454;
    lifeText.text = "" + life;
    lifeContainer.addChild(lifeText);
    game.addChild(lifeContainer);

    BoardState();
    LoadCards();  
    
    startPage = new createjs.Bitmap("assets/images/startPage.png");  
    game.addChild(startPage);  

    playButton = new createjs.Bitmap("assets/images/playButton.png");
    playButton.x = 198;
    playButton.y = 300;
    game.addChild(playButton);

    playButton.addEventListener("click", playNow);
    playButton.addEventListener("mouseover", playButtonOver);
    playButton.addEventListener("mouseout", playButtonOut);

    instructionsButton = new createjs.Bitmap("assets/images/instructionsButton.png");
    instructionsButton.x = 198;
    instructionsButton.y = 380;
    game.addChild(instructionsButton);

    instructionsButton.addEventListener("click", showInstructions);
    instructionsButton.addEventListener("mouseover", instructionsButtonOver);
    instructionsButton.addEventListener("mouseout", instructionsButtonOut);
    
     
}