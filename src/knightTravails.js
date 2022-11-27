/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const squares = [];
for (let i = 0; i <= 7; i += 1) {
  for (let j = 0; j <= 7; j += 1) {
    squares.push([j, i]);
  }
}

const edges = [];
for (const square of squares) {
  const x = square[0];
  const y = square[1];
  if (x + 2 <= 7 && y + 1 <= 7) edges.push([square, [x + 2, y + 1]]);
  if (x + 1 <= 7 && y + 2 <= 7) edges.push([square, [x + 1, y + 2]]);
  if (x - 2 >= 0 && y - 1 >= 0) edges.push([square, [x - 2, y - 1]]);
  if (x - 1 >= 0 && y - 2 >= 0) edges.push([square, [x - 1, y - 2]]);
  if (x - 1 >= 0 && y + 2 <= 7) edges.push([square, [x - 1, y + 2]]);
  if (x - 2 >= 0 && y + 1 <= 7) edges.push([square, [x - 2, y + 1]]);
  if (x + 1 <= 7 && y - 2 >= 0) edges.push([square, [x + 1, y - 2]]);
  if (x + 2 <= 7 && y - 1 >= 0) edges.push([square, [x + 2, y - 1]]);
}

const adjacentList = {};

function addNode(square) {
  adjacentList[`${square}`] = [];
}

function addEdge(origin, destination) {
  if (!adjacentList[`${origin}`].includes(`${destination}`)) {
    adjacentList[`${origin}`].push(`${destination}`);
  }
  if (!adjacentList[`${destination}`].includes(`${origin}`)) {
    adjacentList[`${destination}`].push(`${origin}`);
  }
}

squares.forEach(addNode);
edges.forEach((edge) => addEdge(...edge));

function getKeysByValue(obj, value) {
  return Object.keys(obj)
    .filter((key) => obj[key].includes(value));
}

// eslint-disable-next-line consistent-return
function knightMoves(start, end, queue = [start], path = [], recCount = 1) {
  const visited = new Set();
  const destinations = adjacentList[start.toString()];
  for (const destination of destinations) {
    if (destination === end.toString()) {
      queue = [];
      path.push(destination);
      break;
    }
    if (!visited.has(destination)) {
      visited.add(destination);
      queue.push(destination);
    }
  }

  if (queue.length > 0) {
    start = queue.shift();
    knightMoves(start, end, queue, path, recCount += 1);
  }

  const lastValueOfPath = path[path.length - 1];
  const pathsLastValueHasEdgeWithTheStartValue = getKeysByValue(adjacentList, lastValueOfPath)
    .includes(start.toString());
  if (pathsLastValueHasEdgeWithTheStartValue) {
    path.push(start.toString());
  }

  if (recCount === 2 || recCount === 1) { // means we are on the first call of knightMoves
    path.reverse();
    return {
      movesCount: path.length - 1,
      path,
    };
  }
}
export default knightMoves;
