import { getCactusRects } from "./cactus.js";
import { increaseCustomProperty, setCustomProperty } from "./customProperty.js";

let isFired = false;
const ENTER = 'Enter';
const BULLET_SPEED = 0.05;
const FIRE_INTERVAL = 100;
let nextBulletTime;

// selectors
const worldElement = document.querySelector('[data-world]');

//key map
const keyMap = {
    'Enter': false,
}

// event listeners 
document.removeEventListener('keydown', onEnterBullets);
document.addEventListener('keydown', onEnterBullets);
document.addEventListener('keyup', (e)=>{
    keyMap[e.key] = false;
    isFired = false;
})

// update the bullet movement
export function updateBullet(deltaTime){    
    document.querySelectorAll('[data-bullet]').forEach((bullet)=>{
        increaseCustomProperty(bullet, '--left', deltaTime * BULLET_SPEED);
    });
    if(nextBulletTime <= 0 && isFired){
        drawBullet();
        nextBulletTime = FIRE_INTERVAL;
    }
    nextBulletTime -= deltaTime;
}

export function setupBullet(){
    nextBulletTime = FIRE_INTERVAL;
    // removing all the bullets initially
    [...document.querySelectorAll('[data-bullet]')].forEach((bullet)=>{
        bullet.remove();
    })
}

export function getBulletRects(){
    return [...document.querySelectorAll('[data-bullet')].map((bullet)=>{
        return bullet.getBoundingClientRect();
    })
}

function checkCollision(){
    const cactusRects = getCactusRects();
    return getBulletRects().some((bullet)=> isCollision(bullet, cactusRects))
}

// checking bullet collision
function isCollision(rect1, rect2){
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
      )
}

console.log(checkCollision());

function drawBullet(){ 
    const singleBullet = document.createElement('div');
    singleBullet.dataset.bullet = true;
    singleBullet.classList.add('bullet');
    setCustomProperty(singleBullet, '--left', 5);
    worldElement.appendChild(singleBullet);

}

function onEnterBullets(e){
    if(e.key !== ENTER || isFired) return;
    isFired = true;
}