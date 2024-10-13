import life from './cell_life.png'
import dead from './cell_dead.png'
import './GameOfLife.css'

export default function Cell({ state, handleClick,r,c }) {
    let cn = "cell"+" C"+ r +"-"+ c;
    if (state === 1) return (<input className={cn} onClick={handleClick} type="image" src={life}></input>)
    return(<input className={cn} onClick={handleClick} type="image" src={dead}></input>)
}
