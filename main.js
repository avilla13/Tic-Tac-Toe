/*----- CONSTANTS -----*/
const COLORS = {
    '0': 'white',
    '1': 'blue',
    '-1': 'red'
  };
  
  /*----- STATE VARIABLES -----*/
  let board; //array of 3x3 grid cells
  let turn; // 1 or -1
  let winner; //null = no winner yet; 1 or -1 = winner; 'T' = tie game
  
  /*----- CACHED ELEMENTS  -----*/
  const messageEl = document.querySelector('h1');
  const resetButn = document.querySelector('button');
  const cellEls = [...document.querySelectorAll('#board > div')];
  
  /*----- EVENT LISTENERS -----*/
  document.getElementById('board').addEventListener('click', handleCellClick);
  resetButn.addEventListener('click', init);
  
  /*----- FUNCTIONS -----*/
  // Initialize all state, then call render()
  function init() {
    board = [
      [0, 0, 0], //row 0
      [0, 0, 0], //row 1
      [0, 0, 0], //row 2
    ];
    turn = 1;
    winner = null;
    render();
  }
  
  // In response to user interaction, update all impacted state, then call render();
  function handleCellClick(evt) {
    const cellId = evt.target.id;
    const [colIdx, rowIdx] = cellId.split('r').map(Number);
    if (board[colIdx][rowIdx] !== 0 || winner) return;
    board[colIdx][rowIdx] = turn;
    turn *= -1;
    winner = getWinner(colIdx, rowIdx);
    render();
  }
  
  // Check for winner in board state and return null if no winner,
  // 1/-1 if a player has won, or 'T' if tie
  function getWinner(colIdx, rowIdx) {
    return (
      checkRowWin(rowIdx) ||
      checkColumnWin(colIdx) ||
      checkDiagonalWin() ||
      checkTie()
    );
  }
  
  function checkRowWin(rowIdx) {
    const row = board[rowIdx];
    return row[0] !== 0 && row.every((cell) => cell === row[0]) ? row[0] : null;
  }
  
  function checkColumnWin(colIdx) {
    const column = board.map((row) => row[colIdx]);
    return column[0] !== 0 && column.every((cell) => cell === column[0])
      ? column[0]
      : null;
  }
  
  function checkDiagonalWin() {
    const mainDiagonal = [board[0][0], board[1][1], board[2][2]];
    const antiDiagonal = [board[2][0], board[1][1], board[0][2]];
    const diagonals = [mainDiagonal, antiDiagonal];
    for (let diagonal of diagonals) {
      if (diagonal[0] !== 0 && diagonal.every((cell) => cell === diagonal[0])) {
        return diagonal[0];
      }
    }
    return null;
  }
  
  function checkTie() {
    return board.every((row) => row.every((cell) => cell !== 0)) ? 'T' : null;
  }
  
  // Visualize all state in the DOM
  function render() {
    renderBoard();
    renderMessage();
    renderControls();
  }
  
  function renderBoard() {
    board.forEach(function (colArr, colIdx) {
      // Iterate over the cells in the current column (colArr)
      colArr.forEach(function (cellVal, rowIdx) {
        const cellId = `c${colIdx}r${rowIdx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = COLORS[cellVal];
      });
    });
  }
  