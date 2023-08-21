export function setStyleValue (id,value){
    document.documentElement.style.setProperty('--'+id, value+id)
}