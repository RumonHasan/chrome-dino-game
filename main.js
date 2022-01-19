import {updateGround, setupGround} from './ground.js';
import {updateDino, setupDino} from './dino.js';
import {updateCactus, setupCactus} from './cactus.js';

// variables 
let prevTime;
const GAME_WORLD_WIDTH = 100;
const GAME_WORLD_HEIGHT = 30;

// element - selectors
const worldElement = document.querySelector('[data-world]');
const startElement = document.querySelector('[data-header]');

// setting the pixel to scale
setWorldToScale();
// event listeners
window.addEventListener('resize', setWorldToScale);
document.addEventListener('keydown', handleStartGame, {once:true});


// update loop
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

    // resetting update loop
    prevTime = time;
    window.requestAnimationFrame(updateLoop);
}

function handleStartGame(){
    setupDino();
    setupCactus();
    setupGround();
    startElement.classList.add('hide');
    window.requestAnimationFrame(updateLoop);
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
