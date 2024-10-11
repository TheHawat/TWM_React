import life from './cell_life.png'
import dead from './cell_dead.png'
import './GameOfLife.css'

export default function Cell({ state, handleClick }) {
    if (state === 1) return (<input className='cell' onClick={handleClick} type="image" src={life}></input>)
    return(<input className='cell' onClick={handleClick} type="image" src={dead}></input>)
}
