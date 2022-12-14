import createDragDropFunctionality from './dragDrop';
import knightMoves from './knightTravails';

const gameboard = document.querySelector('#gameboard');

const createKnight = (xAxis, yAxis) => {
  const knightIcon = document.createElement('img');

  knightIcon.classList.add('knight');
  knightIcon.classList.add('draggable');

  knightIcon.setAttribute(
    'src',
    'https://res.cloudinary.com/du3oueesv/image/upload/v1669444959/knights-travails/chess_fc13db.png',
  );
  knightIcon.setAttribute('data-index', `${[xAxis, yAxis]}`);

  return knightIcon;
};

const removePrevEndPoint = () => {
  const prevEndPoint = document.querySelector('.endPoint');
  if (prevEndPoint) {
    prevEndPoint.classList.remove('endPoint');
  }
};

let endPoint = null;
const addNewEndPoint = (e) => {
  removePrevEndPoint();

  e.target.classList.add('endPoint');
  endPoint = e.target.dataset.index;
};

const createGameBoardSquares = (gridSquare) => {
  let loopCount = 1;
  let xAxis = 0;
  let yAxis = 0;
  for (let i = 0; i < gridSquare; i += 1) {
    const squareDiv = [];
    squareDiv[i] = document.createElement('div');

    if (xAxis % 2 === 0 && yAxis % 2 !== 0) {
      squareDiv[i].classList.add('black');
    }
    if (xAxis % 2 !== 0 && yAxis % 2 === 0) {
      squareDiv[i].classList.add('black');
    }
    if (i === 0) {
      const knightIcon = createKnight(i, yAxis);
      squareDiv[i].appendChild(knightIcon);
      createDragDropFunctionality(knightIcon);
    }

    squareDiv[i].setAttribute('data-index', `${[xAxis, yAxis]}`);
    if (loopCount === 8) {
      xAxis = 0;
      yAxis += 1;
      loopCount = 1;
    } else {
      xAxis += 1;
      loopCount += 1;
    }

    squareDiv[i].classList.add('square_div');
    squareDiv[i].addEventListener('click', addNewEndPoint);
    gameboard.appendChild(squareDiv[i]);
  }
};

const createGameBoardDom = () => {
  const gridSize = 8;
  const gridSquare = 64;

  gameboard.style.display = 'grid';
  gameboard.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
  gameboard.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
  createGameBoardSquares(gridSquare);
};

const aboutBtn = document.querySelector('.about');
const dialog = document.querySelector('dialog');
aboutBtn.addEventListener('click', () => {
  dialog.style.display = 'block';
  dialog.showModal();
});

const closeDialogBtn = document.querySelector('.close_dialog');
closeDialogBtn.addEventListener('click', () => {
  dialog.style.display = 'none';
  dialog.close();
});

const moveKnight = (knightIcon, step, stepCount) => {
  const relatedElement = document.querySelector(`[data-index='${step}']`);
  // eslint-disable-next-line no-param-reassign
  knightIcon.dataset.index = relatedElement.dataset.index;

  relatedElement.classList.add('visited');
  relatedElement.textContent = `${stepCount}`;
  relatedElement.appendChild(knightIcon);
};

const removeSignOfPrevPath = () => {
  const prevPath = document.querySelectorAll('.visited');
  if (prevPath) {
    prevPath.forEach((step) => {
      step.classList.remove('visited');
      step.firstChild.remove(); // first child is the step number text
    });
  }
};

const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
  removeSignOfPrevPath();

  const knightIcon = document.querySelector('.knight');
  const knightPosition = knightIcon.dataset.index;
  const knightTravailsInfo = knightMoves(knightPosition, endPoint);
  const squaresInThePath = knightTravailsInfo.path;

  squaresInThePath.forEach((step, index) => {
    setTimeout(() => {
      moveKnight(knightIcon, step, index);
    }, index * 1000);
  });
});
createGameBoardDom();
