import { increaseCustomProperty, getCustomProperty, setCustomProperty } from "./customProperty.js";

// variables
let nextCactusTime;
const SPEED = 0.05;
const CACTUS_MIN_TIME = 500;

//selectors
const worldElement = document.querySelector('[data-world]');

// updating the cactus and redrawing
export function updateCactus(deltaTime){
    document.querySelectorAll('[data-cactus]').forEach((cactus)=>{
        increaseCustomProperty(cactus, '--left', deltaTime * SPEED * -1);
        if(getCustomProperty(cactus, '--left') <= -100){
            cactus.remove();
        }
    })
    if(nextCactusTime <= 0){
        createCactus(); // create a cactus in every succession of 500 milisecond
        nextCactusTime = CACTUS_MIN_TIME; 
    }
    // next cactus time reduced by delta time 
    nextCactusTime -= deltaTime;
}

// getting the cactus rects in order to check collision
export function getCactusRects(){
    return [...document.querySelectorAll('[data-cactus]')].map((cactusElement)=>
      cactusElement.getBoundingClientRect()
    )
}

export function setupCactus(){
    nextCactusTime = CACTUS_MIN_TIME; // should be set to innitial interval time
    // clearing the cactus element array
    const cactusElement = document.querySelectorAll('[data-cactus]');
    cactusElement.forEach((cactus)=>{
        cactus.remove();
    })
}   

// for creating cactus element
function createCactus(){    
    const cactusElem = document.createElement('img');
    // adding a dataset to each cactus
    cactusElem.dataset.cactus = true;
    cactusElem.src = `images/cactus.png`;
    cactusElem.classList.add('cactus');
    setCustomProperty(cactusElem, '--left', 100);
    worldElement.appendChild(cactusElem);
}