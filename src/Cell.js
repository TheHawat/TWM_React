import life from './cell_life.png'
import dead from './cell_dead.png'

export default function Cell({ state, handleClick }) {
    if (state === 1) return (<input className='box' onClick={handleClick} type="image" height='40px' src={life}></input>)
    return(<input onClick={handleClick} type="image" height='40px' src={dead}></input>)
}
