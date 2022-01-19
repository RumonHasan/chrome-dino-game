import { increaseCustomProperty, getCustomProperty, setCustomProperty } from "./customProperty.js";

// variables
let nextCactusTime;
const SPEED = 0.05;
const CACTUS_MIN_TIME = 500;

//selectors
const worldElement = document.querySelector('[data-world]');

export function updateCactus(){

}

export function setupCactus(){
    nextCactusTime = CACTUS_MIN_TIME; // should be set to innitial interval time
}

function createCactus(){    
    const cactusElem = document.createElement('img');
    // adding a dataset to each cactus
    cactusElem.dataset.cactus = true;
    cactusElem.src = `images/cactus.png`;
    cactusElem.classList.add('cactus');
    setCustomProperty(cactusElem, '--left', 100);
    console.log(cactusElem);
    worldElement.appendChild(cactusElem);
}