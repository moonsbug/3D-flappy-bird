
const GRAVITY = -0.1;
const JUMP_SPEED = 0.1;
const TIMER_INTERVAL_MS = 17;

const PIPE_PLACEMENT_RADIUS = 80;
const NUM_PIPES = 16;
const PIPE_COLOR = '#5fc943';
const OVERALL_PIPES_HEIGHT = 30;

const ANGULAR_SPEED = 7;

var Flying_birdYAcceleration = GRAVITY;
var Flying_birdYSpeed = 0;
var Flying_birdY = Flying_bird.getY();
var intervalsPerSecond = 1000 / TIMER_INTERVAL_MS;

var pipeObjects = [];
var pipeData = [];
var score = 0;
var gameIsEnded = true;


var currentDegrees = 10;
var nextPipeIndex = 1;


if (AFRAME.utils.isMobile()) {
    ParticleSystem.turnEmitterOff();
}

initGameMap();

window.requestAnimationFrame(gameLoop);

function gameLoop() {

    if (!gameIsEnded) {

        Flying_birdYSpeed += (GRAVITY / intervalsPerSecond);
        Flying_birdY += Flying_birdYSpeed;

        if (Flying_birdY <= 0.5) {
            Flying_birdY = 0.5;
            gameOver();
        }

        if (Flying_birdY >= OVERALL_PIPES_HEIGHT - 1) {
            Flying_birdY = OVERALL_PIPES_HEIGHT - 1;
        }

        Flying_bird.setY(Flying_birdY);

        let pos = degreesToPosition(currentDegrees);
        Flying_bird.setX(pos.x);
        Flying_bird.setZ(pos.z);

        let rot = degreesToPlayerRotation(currentDegrees);
        Flying_bird.setRotationY(rot.y);

        if (checkCollisions()) {
            gameOver();
        }

        currentDegrees += (ANGULAR_SPEED / intervalsPerSecond);
    }


    window.requestAnimationFrame(gameLoop);
}

function checkCollisions() {


    if (nextPipeIndex >= pipeData.length)
        return false;

    var upcomingPipeData = pipeData[nextPipeIndex];


    if (currentDegrees > upcomingPipeData.degrees) {
        incrementScore();
        nextPipeIndex++;

        if (nextPipeIndex >= pipeData.length) {
            nextPipeIndex = 0;
            currentDegrees -= 360;
        }




        return false;
    }


    if (currentDegrees > upcomingPipeData.degrees - 1) {
        var gapBottom = upcomingPipeData.gapStartY;
        var gapTop = upcomingPipeData.gapEndY;

        if (Flying_birdY < gapBottom) return true;
        else if (Flying_birdY > gapTop) return true;
        else return false;
    }

    return false;
}

function incrementScore() {
    score += 1;
    score_text.setText(score + "");
}
function gameOver() {
    gameIsEnded = true;
    game_over_text.setText('You died! Tap anywhere to restart ');
    game_over_text.setVisible(true);
}

function restartGame() {
    score = 0
    score_text.setText("score :" + score);
    currentDegrees = 10;
    Flying_birdY = 15;
    Flying_birdYSpeed = 0;
    nextPipeIndex = 1;

    game_over_text.setVisible(false);
    gameIsEnded = false
}

function doJump() {
    Flying_birdYSpeed = JUMP_SPEED;
}


Hatch.onKeyDown(function (event) {
    if (event.key == ' ') {
        doJump();
    }


});

Hatch.onSceneClicked(function (event) {
   if(gameIsEnded){
       restartGame();
   }else{
       doJump();
   }


});
function degreesToPosition (degrees) {
    let radians = Hatch.degreesToRadians(degrees);
    let z = Math.cos(radians) * PIPE_PLACEMENT_RADIUS;
    let x = -1 * Math.sin(radians) * PIPE_PLACEMENT_RADIUS;
    return {x, y:0, z};
}

function degreesToPlayerRotation(degrees) {
    return {y :90 - degrees}

}
async function initGameMap(){
    var degreeInterval = 360 / NUM_PIPES;
    var degreeCounter = 0;

    var gap = 5;
    var radius = 2;

    var bottomPipe;
    var topPipe;

    for (var i = 0; i < NUM_PIPES; i++){
        bottomPipe = await Hatch.createObject('cylinder');
        topPipe = await Hatch.createObject('cylinder');

        var pos = degreesToPosition(degreeCounter);

        bottomPipe.setX(pos.x);
        bottomPipe.setZ(pos.z);
        bottomPipe.setColor(PIPE_COLOR);
        bottomPipe.setAttribute('geometry', 'radius', radius);

        topPipe.setX(pos.x);
        topPipe.setZ(pos.z);
        topPipe.setColor(PIPE_COLOR);
        topPipe.setAttribute('geometry', 'radius', radius);

        var bottomHeight = Hatch.getRandomNumber(5,20);
        
        var topHeight = OVERALL_PIPES_HEIGHT - bottomHeight - gap;

        bottomPipe.setAttribute('geometry', 'height', bottomHeight);
        topPipe.setAttribute('geometry', 'height', topHeight);

        
        bottomPipe.setY(bottomHeight/2);

        topPipe.setY((bottomHeight + gap) + topHeight/2);

        pipeObjects[i] = {
            bottom: bottomPipe,
            top: topPipe
        };

        pipeData[i] = {
            degrees: degreeCounter,
            gapStartY: bottomHeight,
            gapEndY: bottomHeight + gap
        }

        
        degreeCounter += degreeInterval;
        
    }
    



}
