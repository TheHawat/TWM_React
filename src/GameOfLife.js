import React from 'react';
import styles from './GameOfLife.css'
import cell from './Cell.js'

let BoardStates = Array(this.props.height).fill(0).map(row => new Array(this.props.width).fill(Math.floor(Math.random(0) + 0.5)));

function progressTurn() {
    let tempboard = BoardStates;
    for (let i = 0; i < this.props.height; i++) {
        for (let j = 0; j < this.props.width; j++) {
            tempboard[i][j] = checkCell(i, j);
        }
    }
    BoardStates = tempboard;
    //this.setState(this.board, tempboard);
    //this.forceUpdate();
}

function checkCell(i, j) {
    let c = surroundCount(i, j);
    if (c === 3 && BoardStates[i][j] === 0) return 1;
    if ((c < 2 || c > 3) && BoardStates[i][j] === 1) return 0;
    if ((c === 2 || c === 3) && BoardStates[i][j] === 1) return 1;
    return 0;
}

function surroundCount(i, j) {
    let mods = [-1, 0, 1];
    let count = 0;
    for (let x = 0; x < 3; x++) {
        if (!validaterange(i + mods[x], this.props.height)) continue;
        for (let y = 0; y < 3; y++) {
            if (!validaterange(j + mods[y], this.props.height)) continue;
            if (x === 1 && y === 1) continue;
            count += BoardStates[i + mods[x]][j + mods[y]] === 1 ? 1 : 0;
        }
    }
    return count;
}

function validaterange(number, range) {
    if (number < 0 || number >= range) return false;
    else return true;
}


export default function GameOfLife() {
    <div>
    <p>{BoardStates.map(row => <div> {row.map(square => cell(square))}</div>)}</p>
    <button onClick={progressTurn}>ProgressTurn</button>
    <view style={styles.square} />
</div>
}

