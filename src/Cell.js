export default function Cell({ state, handleClick }) {
    if (state === 1) return (<button onClick={handleClick}>1</button>)
    return (<button onClick={handleClick}>0</button>)
}