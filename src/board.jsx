import React from "react";
import PropTypes from "prop-types";

function Square(props) {
  const { value, onClick } = props;
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

Square.defaultProps = {
  value: "",
  onClick: () => {}
};

class Board extends React.Component {
  renderSquare(i) {
    const { squares, onClick } = this.props;
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
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
  onClick: PropTypes.func
};

Board.defaultProps = {
  onClick: () => {}
};

export default Board;
