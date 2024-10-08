import life from './cell_life.png'
import dead from './cell_dead.png'

export default function FirstComponent(state){
    if (state === 1) return (<input type="image" height='40px' src={life}></input>)
    return(<input type="image" height='40px' src={dead}></input>)
}