import createDragDropFunctionality from './dragDrop';
import knightMoves from './knightTravails';

const gameboard = document.querySelector('#gameboard');

const createKnight = (i, yAxis) => {
  const knightIcon = document.createElement('img');

  knightIcon.classList.add('knight');
  knightIcon.classList.add('draggable');

  knightIcon.setAttribute(
    'src',
    'https://res.cloudinary.com/du3oueesv/image/upload/v1669444959/knights-travails/chess_fc13db.png',
  );
  knightIcon.setAttribute('data-index', `${[i, yAxis]}`);

  return knightIcon;
};

const removePrevEndPoint = () => {
  const prevEndPoint = document.querySelector('.endPoint');
  if (prevEndPoint) {
    prevEndPoint.classList.remove('endPoint');
    prevEndPoint.style.background = 'none';
  }
};

let endPoint = null;
const createGameBoardSquares = (i) => {
  const squareDiv = [];
  let loopCount = 1;
  let yAxis = 0;

  squareDiv[i] = document.createElement('div');

  if (i === 0) {
    const knightIcon = createKnight(i, yAxis);
    squareDiv[i].appendChild(knightIcon);
    createDragDropFunctionality(knightIcon);
  }

  squareDiv[i].setAttribute('data-index', `${[i, yAxis]}`);
  if (loopCount === 8) {
    yAxis += 1;
    loopCount = 1;
  } else {
    loopCount += 1;
  }
  squareDiv[i].classList.add('square_div');

  squareDiv[i].addEventListener('click', (e) => {
    removePrevEndPoint();

    e.target.classList.add('endPoint');
    e.target.style.background = 'red';
    endPoint = e.target.dataset.index;
  });
  gameboard.appendChild(squareDiv[i]);
};

const createGameBoardDom = () => {
  const gridSize = 8;
  const gridSquare = 64;

  gameboard.style.display = 'grid';
  gameboard.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
  gameboard.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;

  for (let i = 0; i < gridSquare; i += 1) {
    createGameBoardSquares(i);
  }
};
createGameBoardDom();
