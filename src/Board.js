import React from "react";
import { useEffect } from "react";

import CellBoard from "./CellBoard";
import RowBoard from "./RowBoard";
import { clickedCell } from "./BoardUtil";
import { ACTIONS } from "./Constants";

import "./Board.scss";

const Board = ({ stateGame, dispatchGame }) => {
  useEffect(() => {
    if (stateGame.flagsUsed === stateGame.gameSettings.numMines) {
      let minesMarked = 0;
      for (const row of stateGame.board) {
        for (const cell of row) {
          if (cell.flag && cell.val === -1) {
            minesMarked += 1;
          }
        }
      }
      if (minesMarked === stateGame.gameSettings.numMines) {
        dispatchGame({ type: ACTIONS.UPDATE_WIN, payload: { win: true } });
        dispatchGame({
          type: ACTIONS.UPDATE_GAME_STARTED,
          payload: { gameStarted: false },
        });
      }
    }
  }, [
    stateGame.flagsUsed,
    stateGame.gameSettings.numMines,
    stateGame.board,
    dispatchGame,
  ]);

  const click = (row, col) => {
    if (!stateGame.gameOver && !stateGame.win) {
      if (stateGame.flagActive) {
        if (stateGame.board[row][col].show !== 1) {
          if (stateGame.board[row][col].flag) {
            dispatchGame({
              type: ACTIONS.UPDATE_FLAGS_USED,
              payload: { flagsUsed: stateGame.flagsUsed - 1 },
            });
          } else {
            dispatchGame({
              type: ACTIONS.UPDATE_FLAGS_USED,
              payload: { flagsUsed: stateGame.flagsUsed + 1 },
            });
          }
          let newBoardState = clickedCell(stateGame.board, row, col, true);
          dispatchGame({
            type: ACTIONS.UPDATE_BOARD,
            payload: { board: newBoardState },
          });
          dispatchGame({
            type: ACTIONS.UPDATE_GAME_STARTED,
            payload: { gameStarted: true },
          });
        }
      } else {
        if (!stateGame.board[row][col].flag) {
          let newBoardState = clickedCell(stateGame.board, row, col, false);
          dispatchGame({
            type: ACTIONS.UPDATE_BOARD,
            payload: { board: newBoardState },
          });
          const totalCells = newBoardState.length * newBoardState[0].length;
          const noneMineCells = totalCells - stateGame.gameSettings.numMines;
          let visitedCells = 0;
          for (const row of newBoardState) {
            for (const cell of row) {
              if (cell.show === 1) {
                visitedCells += 1;
              }
            }
          }
          if (noneMineCells === visitedCells) {
            dispatchGame({ type: ACTIONS.UPDATE_WIN, payload: { win: true } });

            dispatchGame({
              type: ACTIONS.UPDATE_GAME_STARTED,
              payload: { gameStarted: false },
            });
          } else {
            if (stateGame.board[row][col].val === -1) {
              dispatchGame({
                type: ACTIONS.UPDATE_GAME_STARTED,
                payload: { gameStarted: false },
              });
              dispatchGame({
                type: ACTIONS.UPDATE_GAME_OVER,
                payload: { gameOver: true },
              });
            } else if (stateGame.board[row][col].val === 0) {
              let flagsToBeDeleted = 0;
              for (const row of newBoardState) {
                for (const cell of row) {
                  if (cell.flag && cell.show === 1) {
                    flagsToBeDeleted += 1;
                    cell.flag = false;
                  }
                }
              }
              dispatchGame({
                type: ACTIONS.UPDATE_BOARD,
                payload: { board: newBoardState },
              });
              dispatchGame({
                type: ACTIONS.UPDATE_FLAGS_USED,
                payload: { flagsUsed: stateGame.flagsUsed - flagsToBeDeleted },
              });
              dispatchGame({
                type: ACTIONS.UPDATE_GAME_STARTED,
                payload: { gameStarted: true },
              });
            } else {
              dispatchGame({
                type: ACTIONS.UPDATE_GAME_STARTED,
                payload: { gameStarted: true },
              });
            }
          }
        }
      }
    }
  };

  console.log(stateGame.board);

  return (
    <div className="board">
      {stateGame.board.map((row, rowId) => (
        <RowBoard key={rowId}>
          {row.map((cell, cellId) => (
            <CellBoard
              key={cellId}
              cell={cell}
              click={() => click(rowId, cellId)}
            />
          ))}
        </RowBoard>
      ))}
    </div>
  );
};

export default Board;
