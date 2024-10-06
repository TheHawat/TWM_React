import React from 'react';
import styles from './GameOfLife.css'
import cell from './Cell.js'

class GameOfLife extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            board: Array(this.props.height).fill(0).map(row => new Array(this.props.width).fill(Math.floor(Math.random(0) + 0.5)))
        };
    }

    handleClick = () => {
        this.progressTurn();
        this.forceUpdate();
    }

    progressTurn = () => {
        let tempboard = this.state.board;
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                tempboard[i][j] = this.checkCell(i,j);
            }
        }
        this.state.board = tempboard;
        //this.setState(this.board, tempboard);
        this.forceUpdate();
    }

    checkCell = (i,j) => {
        let c = this.surroundCount(i,j);
        if (c === 3 && this.state.board[i][j] === 0) return 1;
        if ((c < 2 || c > 3) && this.state.board[i][j] === 1) return 0;
        if ((c === 2 || c === 3) && this.state.board[i][j] === 1) return 1;
        return 0;
    }

    surroundCount = (i,j) => {
        let mods = [-1,0,1];
        let count = 0;
        for (let x = 0; x < 3; x++) {
            if (!this.validaterange(i+mods[x], this.props.height)) continue;
            for (let y = 0; y < 3; y++) {
                if (!this.validaterange(j+mods[y], this.props.height)) continue;
                if (x === 1 && y === 1) continue;
                count += this.state.board[i+mods[x]][j+mods[y]] === 1 ? 1 : 0;
            }
        }
        return count;
    }

    validaterange = (number, range) =>{
        if (number < 0 || number >= range) return false;
        else return true;
    }

    render(){
        return (<div>
                    <p>{this.state.board.map(row => <div> {row.map(square => cell(square))}</div>)}</p>
                    <button onClick={this.handleClick}>Button</button>
                    <button onClick={this.progressTurn}>ProgressTurn</button>
                    <view style = {styles.square} />
                </div>)
                }
}

export default GameOfLife;
//const test = props.height;
/*
export default function GOL(props){
    return(
    <div>
        <grid rows={20} cols={20}>
            <grid item><item>{props.height}</item>bla</grid>
        </grid>
        huh
    </div>
    )
}
    */