import knightMoves from './knightTravails';

const gameboard = document.querySelector('#gameboard');

const createGameBoardDom = () => {
  const gridSize = 8;
  const gridSquare = 64;

  gameboard.style.display = 'grid';
  gameboard.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
  gameboard.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;

  const squareDiv = [];
  let loopCount = 1;
  let yAxis = 0;
  for (let i = 0; i < gridSquare; i += 1) {
    squareDiv[i] = document.createElement('div');
    squareDiv[i].setAttribute('data-index', `${[i, yAxis]}`);
    if (loopCount === 8) {
      yAxis += 1;
      loopCount = 1;
    } else {
      loopCount += 1;
    }
    squareDiv[i].classList.add('square_div');
    gameboard.appendChild(squareDiv[i]);
  }
};
createGameBoardDom();
