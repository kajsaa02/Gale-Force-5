import Frame from "./frame.js";
import UpgradeBar from "./upgradeBar.js";
import UpgradeArrow from "./upgradeArrow.js";
import Header from "./headerText.js";
import Button from "./buttonText.js";

//Frames and buttons
let playButton;
let startButton;
let upgradeFuelButton;
let upgradeRotateButton;
let upgradeFuelBar;
let upgradeRotateBar;
let galeFrame;
let galeNameFrame;
let gameStatsFrame;

//Colors
let colorSkin;
let colorHair;
let colorBrown;
let colorRed;
let colorBackgroundLight;
let colorBackgroundDark;

//Positions
let galePositionX;
let galePositionY = 450;
let moneyPositionX;
let moneyPositionY = -10;
let bird1PositionX = -50;
let bird1PositionY;
let bird2PositionX = 1000;
let bird2PositionY;
let portalPositionX;
let portalPositionY = -400;
let fuelPositionX;
let fuelPositionY = -300;
let miniPositionX = 50;
let miniPositionY = 280;
let backgroundSkyPosition = -1400;
let backgroundGroundPosition = 450;

//Game mechanics
let galeRotation = 0;
let portalRotation = 0;
let moneyValue = 0;
let distanceValue = 0;
let galeSpeedX = 0;
let miniSpeedX = 0;
let miniSpeedY = 0;
let fuelValue = 2000;
let fuelValueUpdated = 2000;
let rotateValue = 1;
let rotateValueUpdated = 1;
let fuelUpgrade1 = false;
let fuelUpgrade2 = false;
let fuelUpgrade3 = false;
let rotateUpgrade1 = false;
let rotateUpgrade2 = false;
let rotateUpgrade3 = false;
let mouseAlreadyDown = false;
let state = "start";

//Text
let galeForceHeader;
let gameWonHeader;
let gameOverHeader;
let startGameButtonText;
let takeOffButtonText;
let continueButtonText;

function setup() {
  createCanvas(800, 600);

  //Frames and buttons
  playButton = new Frame(585, 480, 150, 40);
  startButton = new Frame(width / 2 - 105, 263, 210, 40);
  upgradeFuelButton = new UpgradeArrow(195, 190);
  upgradeRotateButton = new UpgradeArrow(195, 245);
  upgradeFuelBar = new UpgradeBar(210, 180);
  upgradeRotateBar = new UpgradeBar(210, 235);
  galeFrame = new Frame(585, 180, 150, 200);
  galeNameFrame = new Frame(600, 390, 120, 20);
  gameStatsFrame = new Frame(width / 2 - 175, 220, 350, 200);

  //Positions
  galePositionX = width / 2;
  portalPositionX = random(width);
  moneyPositionX = random(width);
  fuelPositionX = random(width);
  bird1PositionY = random(height);
  bird2PositionY = random(height);

  //Colors
  colorSkin = color(245, 209, 166);
  colorHair = color(240, 111, 30);
  colorBrown = color(69, 43, 31);
  colorRed = color(164, 28, 28);
  colorBackgroundLight = color(120, 148, 255);
  colorBackgroundDark = color(31, 14, 61);

  //Text
  galeForceHeader = new Header("GALE FORCE 5", 0, 126, 154);
  gameWonHeader = new Header("GAME WON", 0, 151, 187);
  gameOverHeader = new Header("GAME OVER", 0, 150, 182);
  takeOffButtonText = new Button("TAKE OFF", 587, 517, 43);
  continueButtonText = new Button("CONTINUE", width / 2 - 86, height / 2, 43);
  startGameButtonText = new Button(
    "START GAME",
    width / 2 - 103.5,
    height / 2,
    43
  );
}
window.setup = setup;

/*
  The following code is the game's graphics

  The code for "backgroundSky" was adapted from
  https://p5js.org/examples/color-linear-gradient.html
*/

function backgroundSky(x, y, width, height, color1, color2) {
  for (let i = y; i <= y + height; i++) {
    let inter = map(i, y, y + height, 0, 1);
    let c = lerpColor(color1, color2, inter);
    stroke(c);
    line(x, i, x + width, i);
  }
}

function backgroundGround(y) {
  noStroke();
  fill(45, 137, 54);
  rect(0, y, 800, 150);
}

function galeFinnegan(x, y, rotation) {
  push();
  translate(x, y);
  rotate(rotation);

  //Jet packs
  noStroke();
  jetPack(17.5);
  jetPack(-37.5);

  //Hair back
  fill(colorHair);
  rect(-20, -10, 40, 15);
  rect(-25, 20, 50, 15);
  rect(-22.5, 10, 45, 30);

  //Head
  fill(colorSkin);
  rect(-15, -15, 30, 30);
  rect(-20, 0, 40, 10);
  rect(-2.5, 10, 5, 10);

  //Hair front
  fill(colorHair);
  rect(-15, -15, 30, 5);
  rect(5, -20, 10, 5);
  rect(-15, -20, 10, 5);
  rect(10, -10, 5, 5);
  rect(-15, -10, 5, 5);

  //Eyes
  fill(255, 255, 255);
  rect(-15, 0, 5, 10);
  rect(10, 0, 5, 10);

  fill(43, 83, 21);
  rect(-10, 5, 5, 5);
  rect(5, 5, 5, 5);

  fill(54, 137, 7);
  rect(-10, 0, 5, 5);
  rect(5, 0, 5, 5);

  //Eyebrows
  fill(colorBrown);
  rect(5, -5, 10, 5);
  rect(-15, -5, 10, 5);

  //Arms
  fill(colorSkin);
  rect(-17.5, 25, 35, 25);
  rect(-20, 40, 40, 10);

  //Shirt
  fill(colorRed);
  rect(-10, 20, 20, 25);
  rect(-12.5, 25, 25, 15);
  rect(-17.5, 20, 35, 10);

  //Pants
  fill(40, 40, 40);
  rect(-10, 40, 20, 20);

  //Shoes
  fill(colorBrown);
  rect(-10, 55, 20, 10);
  rect(-12.5, 60, 25, 5);

  //Jet pack straps
  rect(5, 20, 5, 5);
  rect(-10, 20, 5, 5);
  rect(-15, 25, 5, 5);
  rect(10, 25, 5, 5);

  pop();
}

function jetPack(x) {
  //Main jet part
  fill(180, 180, 180);
  rect(x, 10, 20, 25);

  fill(200, 200, 200);
  rect(x + 2.5, 5, 15, 25);

  fill(220, 220, 220);
  rect(x + 7.5, 0, 5, 25);

  //Bottom jet part
  fill(colorRed);
  rect(x + 2.5, 35, 15, 5);

  fill(219, 38, 38);
  rect(x + 5, 40, 10, 5);

  //Fire
  rect(x + 5, 49, 5, 5);
  rect(x + 10, 57, 5, 5);

  fill(255, 245, 59);
  rect(x + 7.5, 45, 5, 5);
  rect(x + 9, 49, 5, 5);

  fill(colorHair);
  rect(x + 10, 46, 5, 5);
  rect(x + 6, 53, 5, 5);
}

function money(x, y) {
  noStroke();
  fill(3, 138, 6);
  rect(x - 5, y - 5, 25, 15);

  fill(4, 217, 8);
  rect(x - 7, y - 7, 25, 15);

  fill(3, 138, 6);
  textFont("Courier New");
  text("$", x + 1.5, y + 5);
}

function bird(x, y) {
  noStroke();

  //Blue feathers
  fill(167, 198, 208);
  rect(x, y, 20, 30);
  rect(x - 5, y + 5, 30, 20);
  rect(x - 10, y + 30, 30, 10);
  rect(x - 15, y + 35, 20, 15);
  rect(x - 20, y + 25, 10, 15);
  rect(x - 25, y + 15, 10, 15);

  //Red feathers
  fill(250, 162, 107);
  rect(x + 5, y + 30, 15, 10);
  rect(x, y + 35, 15, 15);
  rect(x + 5, y + 10, 10, 10);

  //Eye
  fill(0, 0, 0);
  rect(x + 12.5, y + 15, 5, 5);

  fill(255, 255, 255);
  rect(x + 12.5, y + 10, 5, 5);

  //Beak and feet
  fill(255, 245, 59);
  rect(x + 20, y + 15, 10, 5);
  rect(x - 10, y + 50, 5, 5);
}

function portal(x, y, rotation) {
  push();
  translate(x, y);
  rotate(rotation);

  noStroke();
  fill(235, 55, 255);
  rect(-15, -30, 40, 10);
  rect(-30, -10, 10, 40);
  rect(-10, 40, 40, 10);
  rect(30, -10, 10, 40);

  fill(167, 0, 255);
  rect(-20, 0, 10, 40);
  rect(25, 0, 10, 40);
  rect(-10, -35, 40, 10);
  rect(-5, 0, 10, 10);

  fill(255, 95, 221);
  rect(15, -15, 30, 10);
  rect(35, 0, 10, 35);
  rect(-15, 30, 40, 10);
  rect(0, 5, 10, 10);

  pop();
}

function fuel(x, y) {
  fill(colorRed);
  rect(x, y, 27.5, 32.5);
  rect(x + 25, y + 5, 7.5, 7.5);
  rect(x + 30, y, 7.5, 7.5);
  rect(x + 15, y - 5, 10, 5);

  fill(214, 46, 46);
  rect(x, y, 25, 30);
  rect(x, y - 10, 5, 10);
  rect(x, y - 10, 15, 5);
  rect(x + 25, y + 5, 5, 5);
  rect(x + 30, y, 5, 5);
}

function miniGameCharacter(x, y) {
  fill(255, 255, 255);
  noStroke();
  rect(x - 5, y + 15, 30, 5);
  rect(x, y, 20, 25);
  rect(x, y + 25, 5, 5);
  rect(x + 15, y + 25, 5, 5);

  fill(0, 0, 0);
  rect(x + 12.5, y + 10, 5, 5);
  rect(x + 2.5, y + 10, 5, 5);
}

function upgradeComplete(x, y) {
  fill(248, 155, 247);
  rect(x, y, 70, 25);
}

function runningTextPurple(running, x, y) {
  noStroke();
  fill(229, 90, 228);
  textFont("monospace");
  textSize(15);
  text(running, x, y);
}

function runningTextWhite(running, x, y, size) {
  noStroke();
  fill(255, 255, 255);
  textFont("monospace");
  textSize(size);
  text(running, x, y);
}

//The following code is the game's screens

function startScreen() {
  background(colorBackgroundDark);

  startButton.display();
  galeForceHeader.display();
  startGameButtonText.display();

  runningTextPurple(
    "Help Gale Finnegan on her journey of reaching the moon!",
    width / 2 - 230,
    350
  );

  //Start game button
  if (
    mouseIsPressed &&
    mouseX > width / 2 - 105 &&
    mouseX < width / 2 + 105 &&
    mouseY > 263 &&
    mouseY < 299
  ) {
    state = "upgrade";
  }
}

function upgradeScreen() {
  background(colorBackgroundDark);

  galeFrame.display();
  galeNameFrame.display();
  playButton.display();
  upgradeFuelBar.display();
  upgradeRotateBar.display();
  upgradeFuelButton.display();
  upgradeRotateButton.display();
  galeForceHeader.display();
  takeOffButtonText.display();

  galeFinnegan(660, 270, galeRotation);
  runningTextPurple("MONEY: $" + moneyValue, 210, 300);
  runningTextPurple(
    "DISTANCE HIGHSCORE: " + readHighscore() + " METERS",
    210,
    320
  );
  runningTextPurple("GALE FINNEGAN", 605, 405);
  runningTextPurple("FUEL CAPACITY $400", 25, 200);
  runningTextPurple("JET ROTATION $400", 25, 255);
  runningTextPurple("INSTRUCTIONS:", 25, 405);
  runningTextPurple("Reach 100 000 meters to win", 25, 445);
  runningTextPurple("Use left and right arrow keys to move", 25, 470);
  runningTextPurple("Avoid flying birds (yes, birds exist in space)", 25, 495);
  runningTextPurple("Upgrade jetpack with collected money", 25, 520);
  runningTextPurple("Collect fuel to get further", 25, 545);
  runningTextPurple("Go into portals, if you dare..", 25, 570);
  upgradeComplete(215, 185);
  upgradeComplete(215, 240);

  //Take off button
  if (
    mouseIsPressed &&
    mouseX > 585 &&
    mouseX < 735 &&
    mouseY > 480 &&
    mouseY < 520
  ) {
    state = "game";
    resetGame();
  }

  //Fuel upgrade button
  if (
    mouseIsPressed &&
    mouseX > 25 &&
    mouseX < 200 &&
    mouseY > 185 &&
    mouseY < 205 &&
    !mouseAlreadyDown
  ) {
    //Check if it is already at max upgrade
    mouseAlreadyDown = true;
    if (fuelValue !== 16000) {
      var hasMoneyFuel = checkMoney();
      if (hasMoneyFuel) {
        upgradeFuelCompartment();
      }
    }
  }

  //Feedback to let the player know a fuel upgrade went through
  if (fuelUpgrade1 === true) {
    upgradeComplete(290, 185);
  }

  if (fuelUpgrade2 === true) {
    upgradeComplete(365, 185);
  }

  if (fuelUpgrade3 === true) {
    upgradeComplete(440, 185);
  }

  //Rotation upgrade button
  if (
    mouseIsPressed &&
    mouseX > 25 &&
    mouseX < 200 &&
    mouseY > 240 &&
    mouseY < 260 &&
    !mouseAlreadyDown
  ) {
    //Check if it is already at max upgrade
    mouseAlreadyDown = true;
    if (rotateValue !== 4.5) {
      var hasMoneyRotate = checkMoney();
      if (hasMoneyRotate) {
        upgradeRotate();
      }
    }
  }
  if (!mouseIsPressed) {
    mouseAlreadyDown = false;
  }

  //Feedback to let the player know a rotate upgrade went through
  if (rotateUpgrade1 === true) {
    upgradeComplete(290, 240);
  }

  if (rotateUpgrade2 === true) {
    upgradeComplete(365, 240);
  }

  if (rotateUpgrade3 === true) {
    upgradeComplete(440, 240);
  }
}

function gameScreen() {
  background(colorBackgroundDark);

  //The display and movement of the background
  backgroundSky(
    0,
    backgroundSkyPosition,
    width,
    2000,
    colorBackgroundDark,
    colorBackgroundLight
  );
  backgroundSkyPosition += 0.5;
  backgroundGround(backgroundGroundPosition);
  backgroundGroundPosition += 1;

  //Flight information at top left corner
  runningTextWhite("DISTANCE: " + distanceValue + " METER", 20, 30, 18);
  runningTextWhite("FUEL LEFT: " + fuelValue + " LITER", 20, 55, 18);
  runningTextWhite("MONEY: $" + moneyValue, 20, 80, 18);

  //Fuel and distance values
  fuelValue = Math.floor(fuelValue);
  fuelValue -= 0.1;
  distanceValue += 10;

  //Finnegan's movement
  galeFinnegan(galePositionX, galePositionY, galeRotation);
  galePositionX = galePositionX + galeSpeedX;
  galePositionX = galePositionX + Math.cos(galeRotation) * galeSpeedX;

  if (keyIsDown(39)) {
    galeSpeedX = rotateValue;
    galeRotation = 0.15;
  } else if (keyIsDown(37)) {
    galeSpeedX = rotateValue - 2 * rotateValue;
    galeRotation = -0.15;
  } else {
    galeSpeedX = 0;
    galeRotation = 0;
  }

  //Elements' movement
  fuel(fuelPositionX, fuelPositionY);
  fuelPositionY += 4;
  portal(portalPositionX, portalPositionY, portalRotation);
  portalPositionY += 0.5;
  portalRotation += 0.01;
  money(moneyPositionX, moneyPositionY);
  moneyPositionY += 3;
  bird(bird1PositionX, bird1PositionY);
  bird1PositionX += 5;
  bird1PositionY += 4;
  bird(bird2PositionX, bird2PositionY);
  bird2PositionX -= 6;
  bird2PositionY += 2;

  //Finnegan's interaction with other elements
  if (
    galePositionX > portalPositionX - 40 &&
    galePositionX < portalPositionX + 40 &&
    galePositionY > portalPositionY - 40 &&
    galePositionY < portalPositionY + 40
  ) {
    state = "miniGame";
  } else if (
    galePositionX > bird1PositionX - 30 &&
    galePositionX < bird1PositionX + 30 &&
    galePositionY > bird1PositionY - 65 &&
    galePositionY < bird1PositionY + 50
  ) {
    if (distanceValue > readHighscore()) {
      writeHighscore(distanceValue);
    }
    state = "gameOver";
    resetGame();
  } else if (
    galePositionX > bird2PositionX - 30 &&
    galePositionX < bird2PositionX + 30 &&
    galePositionY > bird2PositionY - 65 &&
    galePositionY < bird2PositionY + 50
  ) {
    if (distanceValue > readHighscore()) {
      writeHighscore(distanceValue);
    }
    state = "gameOver";
    resetGame();
  } else if (
    galePositionX > moneyPositionX - 30 &&
    galePositionX < moneyPositionX + 40 &&
    galePositionY > moneyPositionY - 30 &&
    galePositionY < moneyPositionY + 30
  ) {
    moneyValue = moneyValue + 20;
    moneyPositionX = random(width);
    moneyPositionY = -10;
  } else if (
    galePositionX > fuelPositionX - 15 &&
    galePositionX < fuelPositionX + 45 &&
    galePositionY > fuelPositionY - 10 &&
    galePositionY < fuelPositionY + 50
  ) {
    fuelValue = fuelValue + 300;
    fuelPositionX = -200;
    fuelPositionY = random(height);
  } else if (fuelValue < 0) {
    if (distanceValue > readHighscore()) {
      writeHighscore(distanceValue);
    }
    state = "gameOver";
    resetGame();
  }

  //Redraw falling elements that are missed by Finnegan
  if (moneyPositionY > 1000) {
    moneyPositionX = random(width);
    moneyPositionY = -10;
  } else if (portalPositionY > 2000) {
    portalPositionX = random(width);
    portalPositionY = -50;
  } else if (fuelPositionY > 1220) {
    fuelPositionX = random(width);
    fuelPositionY = -500;
  } else if (bird1PositionX > 850 && bird1PositionY > 650) {
    bird1PositionX = -50;
    bird1PositionY = random(height);
  } else if (bird2PositionX < -50 && bird2PositionY > 650) {
    bird2PositionX = 850;
    bird2PositionY = random(height);
  }

  //When Finnegan reaches the goal
  if (distanceValue > 100000) {
    state = "gameWon";
  }
}

function gameOverScreen() {
  background(colorBackgroundDark);

  gameStatsFrame.display();
  gameOverHeader.display();

  runningTextPurple("DISTANCE: " + distanceValue + " METERS", 250, 260);
  runningTextPurple("MONEY: $" + moneyValue, 250, 320);
  runningTextPurple("WELL DONE!", 250, 380);
  runningTextPurple("GO TO UPGRADE MENU →", 400, 460);

  //Go back to upgrade menu button
  if (
    mouseIsPressed &&
    mouseX > 390 &&
    mouseX < 590 &&
    mouseY > 440 &&
    mouseY < 470
  ) {
    distanceValue = 0;
    fuelValue = fuelValueUpdated;
    rotateValue = rotateValueUpdated;
    state = "upgrade";
  }
}

function gameWonScreen() {
  background(colorBackgroundDark);

  startButton.display();
  gameWonHeader.display();
  continueButtonText.display();

  runningTextPurple("CREATORS", 370, 510);
  runningTextPurple("Caroline Frössling", 325, 530);
  runningTextPurple("Kajsa Andersson", 338, 550);
  runningTextPurple(
    "Congratulations! With your help, Finnegan managed to make her dream come true!",
    80,
    170
  );

  //Go back to upgrade menu button
  if (
    mouseIsPressed &&
    mouseX > width / 2 - 105 &&
    mouseX < width / 2 + 105 &&
    mouseY > 263 &&
    mouseY < 299
  ) {
    state = "upgrade";
    resetGame();
    distanceValue = 0;
  }
}

function miniGameScreen() {
  background(0, 0, 0);

  //Mini game instructions
  runningTextWhite("CHOOSE THE RIGHT NUMBER...", 10, 20, 15);
  runningTextWhite(
    "BE CAREFUL, IF YOU CHOOSE A WRONG NUMBER, YOU WILL LOOSE!",
    10,
    40,
    15
  );

  //Mini game options
  runningTextWhite("1", 680, 120, 100);
  runningTextWhite("2", 680, 260, 100);
  runningTextWhite("3", 680, 400, 100);
  runningTextWhite("4", 680, 540, 100);

  stroke(255, 255, 255);
  strokeWeight(5);
  line(630, 20, 800, 20);
  line(630, 160, 800, 160);
  line(630, 300, 800, 300);
  line(630, 440, 800, 440);
  line(630, 580, 800, 580);

  miniGameCharacter(miniPositionX, miniPositionY);

  //The mini game character's movement
  miniPositionX = miniPositionX + miniSpeedX;
  miniPositionY = miniPositionY + miniSpeedY;

  if (keyIsDown(39)) {
    miniSpeedX = 3;
  } else if (keyIsDown(37)) {
    miniSpeedX = -3;
  } else if (keyIsDown(38)) {
    miniSpeedY = -3;
  } else if (keyIsDown(40)) {
    miniSpeedY = 3;
  } else {
    miniSpeedX = 0;
    miniSpeedY = 0;
  }

  //The mini game's outcome
  if (miniPositionX > 660 && miniPositionY > 440) {
    state = "game";
    moneyValue = moneyValue + 100;
    miniPositionY = 280;
    portalPositionX = random(width);
    portalPositionY = -1000;
    moneyPositionX = random(width);
    moneyPositionY = -10;
    fuelPositionX = random(width);
    fuelPositionY = -200;
    bird1PositionX = -50;
    bird1PositionY = random(height);
    bird2PositionX = 850;
    bird2PositionY = random(height);
  } else if (miniPositionX > 660 && miniPositionY <= 440) {
    state = "gameOver";
    resetGame();
  }
}

//Function for drawing all screens
function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "upgrade") {
    upgradeScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "gameOver") {
    gameOverScreen();
  } else if (state === "miniGame") {
    miniGameScreen();
  } else if (state === "gameWon") {
    gameWonScreen();
  }
}

//Function for reseting values when a game is lost
function resetGame() {
  galePositionX = width / 2;
  galeRotation = 0;
  miniPositionX = 50;
  miniPositionY = 280;
  portalPositionX = random(width);
  portalPositionY = -700;
  moneyPositionX = random(width);
  moneyPositionY = -10;
  fuelPositionX = random(width);
  fuelPositionY = -500;
  fuelValue = fuelValueUpdated;
  rotateValue = rotateValueUpdated;
  bird1PositionX = -50;
  bird1PositionY = random(height);
  bird2PositionX = 850;
  bird2PositionY = random(height);
  backgroundSkyPosition = -1400;
  backgroundGroundPosition = 450;
}

function upgradeFuelCompartment() {
  moneyValue -= 400;

  //Switch case depending on from what level the player upgrade from
  switch (fuelValueUpdated) {
    case 2000:
      fuelValueUpdated = 4000;
      fuelUpgrade1 = true;
      break;
    case 4000:
      fuelValueUpdated = 8000;
      fuelUpgrade2 = true;
      break;
    case 8000:
      fuelValueUpdated = 16000;
      fuelUpgrade3 = true;
      break;
  }
}

function upgradeRotate() {
  moneyValue -= 400;

  //Switch case depending on from what level the player upgrade from
  switch (rotateValueUpdated) {
    case 1:
      rotateValueUpdated = 1.5;
      rotateUpgrade1 = true;
      break;
    case 1.5:
      rotateValueUpdated = 3;
      rotateUpgrade2 = true;
      break;
    case 3:
      rotateValueUpdated = 4.5;
      rotateUpgrade3 = true;
      break;
  }
}

//Function to check if the player have sufficent funds to upgrade
function checkMoney() {
  if (moneyValue >= 400) {
    return true;
  } else {
    return false;
  }
}

//Read highscore from localstorage
function readHighscore() {
  //initialize localstorage if empty
  if (localStorage.highScore === undefined) {
    localStorage.highScore = JSON.stringify(0);
  }

  return JSON.parse(localStorage.highScore);
}

//Update localstorage with highscore
function writeHighscore(highScore) {
  //initialize local storage if empty
  if (localStorage.highScore === undefined) {
    localStorage.highScore = JSON.stringify(0);
  }

  localStorage.highScore = JSON.stringify(highScore);
}

window.draw = draw;
