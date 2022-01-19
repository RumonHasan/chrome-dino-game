// getting the number or integer for of the property value
export function getCustomProperty(element, value){
    return parseFloat(getComputedStyle(element).getPropertyValue(value) || 0);
}
// setting the new value of the property
export function setCustomProperty(element, prop, value){
     element.style.setProperty(prop, value)
}
// increasing the custom property
export function increaseCustomProperty(element, prop, incrementVal){
    return setCustomProperty(element, prop, getCustomProperty(element, prop) + incrementVal);
}