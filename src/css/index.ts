export function setStyleValue (id,value,suffix){
    document.documentElement.style.setProperty('--'+id, value+suffix)
}