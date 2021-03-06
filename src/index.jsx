import React from "react";
import ReactDOM from "react-dom";

import Board from "./board";
import "./index.css";

const MAX_MOVES = 9;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }

  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          desc: "",
          squares: Array(9).fill(null)
        }
      ],
      currentMove: 0,
      xIsNext: true,
      descendingOrder: false
    };
  }

  handleClick(i) {
    const { history, currentMove, xIsNext } = this.state;
    const histCopy = history.slice(0, currentMove + 1);
    const current = histCopy[histCopy.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    const desc = `${squares[i]} at (${i % 3}, ${Math.floor(i / 3)})`;
    this.setState({
      history: histCopy.concat({ desc, squares }),
      currentMove: histCopy.length,
      xIsNext: !xIsNext
    });
  }

  jumpTo(moveNum) {
    this.setState({
      currentMove: moveNum,
      xIsNext: moveNum % 2 === 0
    });
  }

  switchSortOrder() {
    const { descendingOrder } = this.state;
    this.setState({
      descendingOrder: !descendingOrder
    });
  }

  status(winner, currentMove) {
    const { xIsNext } = this.state;

    let status;
    if (winner) {
      status = `Winner: ${xIsNext ? "O" : "X"}`;
    } else if (currentMove === MAX_MOVES) {
      status = "It's a tie!";
    } else {
      status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    return status;
  }

  renderMoveList() {
    const { history, currentMove, descendingOrder } = this.state;
    const moves = history.map((move, idx) => {
      let desc =
        idx !== 0 ? `Go to move #${idx}: ${move.desc}` : "Go to game start";

      if (idx === currentMove) {
        desc = <b>{desc}</b>;
      }

      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={idx}>
          <button type="button" onClick={() => this.jumpTo(idx)}>
            {desc}
          </button>
        </li>
      );
    });

    if (descendingOrder) {
      moves.reverse();
    }

    return moves;
  }

  render() {
    const { history, currentMove, descendingOrder } = this.state;
    const { squares } = history[currentMove];
    const winner = calculateWinner(squares);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            winner={winner}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{this.status(winner, currentMove)}</div>
          <button type="button" onClick={() => this.switchSortOrder()}>
            {descendingOrder ? "DESC" : "ASC"}
          </button>
          <ol>{this.renderMoveList()}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
