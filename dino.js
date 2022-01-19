import { getCustomProperty, increaseCustomProperty, setCustomProperty } from "./customProperty.js";
// variables
let currentFrameCount;
let isJumping;
let dinoFrame;
let yVelocity;
const FRAME_COUNT = 100;
const DINO_COUNT_FRAME_COUNT = 2;
const GRAVITY = 0.0015;
const JUMP_SPEED = 0.45;

// selectors
const dinoElement = document.querySelector('[data-dino]');

// initial dino setup 
export function setupDino(){
    currentFrameCount = 0;
    isJumping = false;
    dinoFrame = 0;
    yVelocity = 0;
    document.addEventListener('keydown', onJump);
}

export function updateDino(deltaTime){
    handleDinoRun(deltaTime);
    handleJump(deltaTime);
}

function handleDinoRun(deltaTime){
    // dinosaur remains stationery when jumping
    if(isJumping){
        dinoElement.src = `images/dino-stationary.png`;
        return;
    }

    // switching between dino frames in order to make it look like its running
    if(currentFrameCount >= FRAME_COUNT){
        dinoFrame = (dinoFrame + 1) % DINO_COUNT_FRAME_COUNT;
        dinoElement.src = `images/dino-run-${dinoFrame}.png`;
        currentFrameCount -= FRAME_COUNT;
    }
    currentFrameCount += deltaTime;
}

// handle jump
function handleJump(deltaTime) {
    if(!isJumping) return;

    increaseCustomProperty(dinoElement, '--bottom', deltaTime * yVelocity);

    // if the bottom margin hits negative then set it back to zero
    if(getCustomProperty(dinoElement, '--bottom') <=0 ){
        setCustomProperty(dinoElement, '--bottom', 0);
        isJumping = false;
    }
    yVelocity -= GRAVITY * deltaTime;

}

function onJump(e){ 
    if(e.code !== 'Space' || isJumping) return;

    isJumping = true;
    yVelocity = JUMP_SPEED;
}
