const { useState } = React;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of WIN_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  const handleClick = (index) => {
    if (winner || squares[index]) return;
    const next = squares.slice();
    next[index] = next.filter(Boolean).length % 2 === 0 ? "X" : "O";
    setSquares(next);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
  };

  const status = winner ? `Winner: ${winner}` : isDraw ? "Draw" : "";

  return (
    <div>
      <div className="board">
        {squares.map((square, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <p id="status">{status}</p>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
