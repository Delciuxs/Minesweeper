const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const geneateRandomMineIndexes = (width, height, numMines) => {
  const totalCells = width * height;
  let indexes = [];
  let mines = numMines;

  while (mines) {
    let randomIndex = getRandomInt(totalCells);
    if (indexes.includes(randomIndex)) {
      continue;
    } else {
      indexes.push(randomIndex);
      mines -= 1;
    }
  }

  return indexes;
};

const addMinesToBoard = (mineIndexes, width, height) => {
  let currentIndex = 0;
  let boardMines = [];
  for (let row = 0; row < height; row++) {
    let newRowVal = [];
    for (let cell = 0; cell < width; cell++) {
      mineIndexes.includes(currentIndex)
        ? newRowVal.push({ val: -1, show: 0, row: row, col: cell, flag: false })
        : newRowVal.push({ val: 0, show: 0, row: row, col: cell, flag: false });
      currentIndex++;
    }
    boardMines.push(newRowVal);
  }

  return boardMines;
};

const addNumbersToBoard = (mineIndexes, boardWithMines) => {
  let boardWithNumbers = JSON.parse(JSON.stringify(boardWithMines));

  const moves = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ]; // x, y

  mineIndexes.forEach((index) => {
    let row = Math.floor(index / boardWithNumbers[0].length);
    let col = index % boardWithNumbers[0].length;

    for (const move of moves) {
      let newRow = row + move[0];
      let newCol = col + move[1];

      if (
        newRow >= 0 &&
        newRow < boardWithNumbers.length &&
        newCol >= 0 &&
        newCol < boardWithNumbers[0].length
      ) {
        if (boardWithNumbers[newRow][newCol].val !== -1) {
          boardWithNumbers[newRow][newCol].val += 1;
        }
      }
    }
  });

  return boardWithNumbers;
};

export const createBoard = (width, height, numMines) => {
  let mineIndexes = geneateRandomMineIndexes(width, height, numMines);
  let boardWithMines = addMinesToBoard(mineIndexes, width, height);
  let boardWithNumbers = addNumbersToBoard(mineIndexes, boardWithMines);
  let board = JSON.parse(JSON.stringify(boardWithNumbers));
  return board;
};

const bfs = (board, row, col) => {
  let firstCoordinate = [row, col];
  let queue = [];
  queue.push(firstCoordinate);
  const moves = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ]; // x, y

  while (queue.length > 0) {
    let currentCoordinate = queue.shift();
    let currentRow = currentCoordinate[0];
    let currentCol = currentCoordinate[1];
    board[currentRow][currentCol].show = 1;
    for (const move of moves) {
      let newRow = currentRow + move[0];
      let newCol = currentCol + move[1];
      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length
      ) {
        if (board[newRow][newCol].show !== 1) {
          if (board[newRow][newCol].val === 0) {
            queue.push([newRow, newCol]);
          } else {
            board[newRow][newCol].show = 1;
          }
        }
      }
    }
  }
};

export const clickedCell = (board, row, col, flagActive) => {
  let boardCopy = JSON.parse(JSON.stringify(board));
  if (
    row >= 0 &&
    row < boardCopy.length &&
    col >= 0 &&
    col < boardCopy[0].length
  ) {
    if (flagActive) {
      let flagStatus = boardCopy[row][col].flag;
      boardCopy[row][col].flag = !flagStatus;
    } else {
      if (!boardCopy[row][col].flag) {
        if (boardCopy[row][col].val === -1) {
          for (let i = 0; i < boardCopy.length; i++) {
            for (let j = 0; j < boardCopy[i].length; j++) {
              boardCopy[i][j].show = 1;
            }
          }
        } else if (boardCopy[row][col].val === 0) {
          bfs(boardCopy, row, col);
        } else {
          boardCopy[row][col].show = 1;
        }
      }
    }
  }
  return boardCopy;
};
