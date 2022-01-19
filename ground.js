import { getCustomProperty, increaseCustomProperty, setCustomProperty } from "./customProperty.js";
//variables
const GROUND_SPEED = 0.05;

// groundElem
const groundElem = document.querySelectorAll('[data-ground]');

export function setupGround(){
    // setting the positions of both the grounds
    setCustomProperty(groundElem[0], '--left', 0);
    setCustomProperty(groundElem[1], '--left', 300);
}

export function updateGround(deltaTime){ 
    groundElem.forEach((ground)=>{
        // decreasing left side margin
        increaseCustomProperty(ground, '--left', deltaTime * GROUND_SPEED * -1);

        // looping the ground
        if(getCustomProperty(ground, '--left') <= -300){
            increaseCustomProperty(ground, '--left', 600);
        }
    })

}

