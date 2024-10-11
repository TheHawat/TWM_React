import React from 'react';
import './GameOfLife.css'
import Cell from './Cell.js'
import ReactSlider from "react-slider"
import life from "./cell_life.png"
import dead from "./cell_dead.png"

//import gsap from '@gsap/react';

class GameOfLife extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            board: Array(this.props.height).fill(0).map(row => new Array(this.props.height).fill(0).map(x => x = Math.floor(Math.random(0) + 0.5))),
            h: this.props.height,
            w: this.props.width
        };
    }

    handleClick = () => {
        this.progressTurn();
        this.forceUpdate();
    }

    progressTurn = () => {
        //let tempboard = this.state.board;
        let tempboard = JSON.parse(JSON.stringify(this.state.board));
        for (let i = 0; i < this.state.h; i++) {
            for (let j = 0; j < this.state.w; j++) {
                tempboard[i][j] = this.checkCell(i,j);
            }
        }
        //this.state.board = tempboard;
        //this.setState(this.board, tempboard);
        this.setState({ board : tempboard });
        this.forceUpdate();
    }

    checkCell = (i,j) => {
        let c = this.surroundCount(i,j);
        let currentCell = this.state.board[i][j];
        if (c < 2 && currentCell === 1) return 0;
        if ((c === 2 || c === 3) && currentCell === 1) return 1;
        if (c > 3 && currentCell === 1) return 0;
        if (c === 3 && currentCell === 0) return 1;
        return currentCell;
    }

    // returns onClick handler for a square of coords (row, column)
    // NOTE: you can modify GameOfLife's state here
    createCellHandleClick = (r, c) => { 
        //return (event) => console.log(`Square ${r}-${c} clicked!`); 
        return (event) => this.flipbutton(r,c);
    }

    flipbutton = (i,j) => {
        let tempboard = this.state.board;
        tempboard[i][j] = this.state.board[i][j] === 1 ? 0 : 1;
        this.setState({board:tempboard});
//        gsap.to(".box", { x: 200 });
        this.forceUpdate();
        console.log(this.surroundCount(i,j));
    }

    surroundCount = (i,j) => {
        let mods = [-1,0,1];
        let count = 0;
        for (let x = 0; x < 3; x++) {
            if (!this.validaterange(i+mods[x], this.state.h)) continue;
            for (let y = 0; y < 3; y++) {
                if (!this.validaterange(j+mods[y], this.state.h)) continue;
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

    minus = () => {
        this.setState({w:this.state.w-1});
        let tempboard = Array(this.state.h).fill(0).map(row => new Array(this.state.w));
        for(let i = 0; i < this.state.h; i++){
            for(let j=0; j < this.state.w; j++){
                tempboard[i][j]=this.state.board[i][j];
            }
        }
        this.setState({board:tempboard});
        this.forceUpdate();
    }
    plus = () => {
        let tempboard = Array(this.state.h).fill(0).map(row => new Array(this.state.w));
        for(let i = 0; i < this.state.h; i++){
            for(let j=0; j < this.state.w; j++){
                tempboard[i][j]=this.state.board[i][j];
            }
        }
        this.setState({w:this.state.w+1});
        for(let i = 0; i < this.state.h; i++){
            tempboard[i][this.state.w] = Math.floor(Math.random(0) + 0.5);
        }
        this.setState({board:tempboard});
        this.forceUpdate()
    }
    minush = () => {
        this.setState({h:this.state.h-1});
        let tempboard = Array(this.state.h).fill(0).map(row => new Array(this.state.w));
        for(let i = 0; i < this.state.h; i++){
            for(let j=0; j < this.state.w; j++){
                tempboard[i][j]=this.state.board[i][j];
            }
        }
        this.setState({board:tempboard});
        this.forceUpdate();
    }
    plush = () => {
        let tempboard = Array(this.state.h+1).fill(0).map(row => new Array(this.state.w));
        for(let i = 0; i < this.state.h; i++){
            for(let j=0; j < this.state.w; j++){
                tempboard[i][j]=this.state.board[i][j];
            }
        }
        this.setState({h:this.state.h+1});
        for(let i = 0; i < this.state.w; i++){
            tempboard[this.state.h-1][i] = Math.floor(Math.random(0) + 0.5);
        }
        this.setState({board:tempboard});
        this.forceUpdate()
    }

    render(){
        return (<div>
                    <p classname = "board">{this.state.board.map((row, i) => <div key={`row-${i}`}> {row.map((square, j) => <Cell state={square} handleClick={this.createCellHandleClick(i, j)} key={`cell-${i}-${j}`}/>)}</div>)}</p>
                    <div>
                    <input className='cell' onClick={this.minus} type="image" src={dead}></input>
                    <button>{this.state.w}</button>
                    <input className='cell' onClick={this.plus} type="image" src={life}></input>
                    <input className='cell' onClick={this.minush} type="image" src={dead}></input>
                    <button>{this.state.h}</button>
                    <input className='cell' onClick={this.plush} type="image" src={life}></input>
                    </div>
                    <button onClick={this.handleClick}>Button</button>
                    <button onClick={this.progressTurn}>ProgressTurn</button>
                    <input onClick={this.toggleFillers}></input>
                    <section classname = "p-wrapper"><ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    min = "1"
                    max = "3"
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    />
                    </section>
                    
                    
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