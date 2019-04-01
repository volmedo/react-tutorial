import React from "react";
import PropTypes from "prop-types";

function Square(props) {
  const { value, isWinner, onClick } = props;
  const className = isWinner ? "square-winner" : "square";
  return (
    <button type="button" className={className} onClick={onClick}>
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  isWinner: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

Square.defaultProps = {
  value: "",
  onClick: () => {}
};

class Board extends React.Component {
  renderSquare(i) {
    const { squares, winner, onClick } = this.props;
    const isWinner = winner && winner.includes(i);
    return (
      <Square
        value={squares[i]}
        isWinner={isWinner}
        onClick={() => onClick(i)}
      />
    );
  }

  render() {
    const rows = [];
    for (let i = 0; i < 3; i += 1) {
      const squares = [];
      for (let j = 0; j < 3; j += 1) {
        squares.push(this.renderSquare(i * 3 + j));
      }
      rows.push(<div className="board-row">{squares}</div>);
    }
    return <div>{rows}</div>;
  }
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  winner: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func
};

Board.defaultProps = {
  winner: null,
  onClick: () => {}
};

export default Board;
