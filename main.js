import {updateGround, setupGround} from './ground.js';
import {updateDino, setupDino, getDinoHead} from './dino.js';
import {updateCactus, setupCactus, getCactusRects} from './cactus.js';
import {updateBullet, setupBullet} from './bullet.js';

// variables 
let prevTime;
let score = 0;
const GAME_WORLD_WIDTH = 100;
const GAME_WORLD_HEIGHT = 30;

// element - selectors
const worldElement = document.querySelector('[data-world]');
const startElement = document.querySelector('[data-header]');
const scoreElement = document.querySelector('[data-score]');
const scoreGameElement = document.querySelector('[data-scoreGame]');

// setting the pixel to scale
setWorldToScale();
// event listeners
window.addEventListener('resize', setWorldToScale);
document.addEventListener('keydown', handleStartGame, {once:true});


// primary update loop for animation frame 
function updateLoop(time){
    if(prevTime == null){
        prevTime = time;
        window.requestAnimationFrame(updateLoop);
        return;
    }

    const deltaTime = time - prevTime;
    // main update functions
    updateGround(deltaTime);
    updateDino(deltaTime)
    updateCactus(deltaTime);
    updateScore(deltaTime);
    updateBullet(deltaTime);
    // colision and lost functions
    if(checkCollision()) return handleLost();
    // resetting update loop
    prevTime = time;
    window.requestAnimationFrame(updateLoop);
}
// main start Game
function handleStartGame(){
    score = 0;
    setupDino();
    setupCactus();
    setupGround();
    startScoreGame();
    setupBullet();
    startElement.classList.add('hide');
    window.requestAnimationFrame(updateLoop);
}

function startScoreGame(){
    scoreGameElement.innerHTML = '';
    scoreGameElement.classList.add('hide');
}

function checkCollision(){
    const dinoElemRect = getDinoHead(); // dino element dimnesion
    return getCactusRects().some((cactus)=>isCollision(cactus, dinoElemRect));
}

// returns true if there is a collision 
function isCollision(rect1,rect2){
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
      )
}

// updating the score
 function updateScore(deltaTime){
    score += deltaTime * 0.1;
    scoreElement.textContent = Math.floor(score);
 }

// main lost function that controls the lost features
function handleLost(){
    displayScore();
    setTimeout(()=>{
        scoreGameElement.classList.remove('hide');
        document.addEventListener('keydown', handleStartGame, {once:true});
        startElement.classList.remove('hide');
    }, 1000);
}

function displayScore(){
    const scoreHeader = document.createElement('div');
    scoreHeader.classList.add('score-header');
    scoreHeader.textContent = `Your score is : ${scoreElement.textContent}`;
    scoreGameElement.appendChild(scoreHeader);
}

// setting world to scale
function setWorldToScale(){
    let worldPixelScale;
    if(window.innerWidth / window.innerHeight < GAME_WORLD_WIDTH / GAME_WORLD_HEIGHT){
        worldPixelScale = window.innerWidth / GAME_WORLD_WIDTH
    }else{
        worldPixelScale = window.innerHeight / GAME_WORLD_HEIGHT;
    }
    // scaling the game world height and width to window height and width
    worldElement.style.width = `${GAME_WORLD_WIDTH * worldPixelScale}px`;
    worldElement.style.height = `${GAME_WORLD_HEIGHT * worldPixelScale}px`;
}
