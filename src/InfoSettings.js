import React from "react";
import { useEffect } from "react";

import { createBoard } from "./BoardUtil";
import { ACTIONS } from "./Constants";

import "./InfoSettings.scss";

const InfoSettings = ({ stateGame, dispatchGame }) => {
  useEffect(() => {
    let timerInterval;
    if (stateGame.gameStarted) {
      let time = 0;
      timerInterval = setInterval(() => {
        time += 1;
        let timeStr = time.toString();
        while (timeStr.length < 3) {
          timeStr = "0" + timeStr;
        }
        dispatchGame({
          type: ACTIONS.UPDATE_COUNT_TIMER,
          payload: { countTimer: timeStr },
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [stateGame.gameStarted, dispatchGame]);

  return (
    <div className="header">
      <div className="mines-counter">
        <Mines
          numMines={stateGame.gameSettings.numMines}
          flagsUsed={stateGame.flagsUsed}
        />
      </div>
      <div className="game-state">
        <Face
          gameOver={stateGame.gameOver}
          gameSettings={stateGame.gameSettings}
          win={stateGame.win}
          dispatchGame={dispatchGame}
        />
      </div>
      <div className="time-counter">
        <h1>{stateGame.countTimer}</h1>
      </div>
    </div>
  );
};

const Mines = ({ numMines, flagsUsed }) => {
  let mines = numMines - flagsUsed;
  if (mines < 0) {
    return <h1>{"000"}</h1>;
  } else {
    let minesStr = mines.toString();
    while (minesStr.length < 3) {
      minesStr = "0" + minesStr;
    }
    return <h1>{minesStr}</h1>;
  }
};

const Face = ({ gameOver, gameSettings, win, dispatchGame }) => {
  if (gameOver) {
    return (
      <h1
        className="dead-face"
        onClick={() => {
          dispatchGame({
            type: ACTIONS.UPDATE_GAME_OVER,
            payload: { gameOver: false },
          });
          dispatchGame({
            type: ACTIONS.UPDATE_FLAGS_USED,
            payload: { flagsUsed: 0 },
          });
          dispatchGame({
            type: ACTIONS.UPDATE_COUNT_TIMER,
            payload: { countTimer: "000" },
          });
          dispatchGame({
            type: ACTIONS.UPDATE_BOARD,
            payload: {
              board: createBoard(
                gameSettings.width,
                gameSettings.height,
                gameSettings.numMines
              ),
            },
          });
        }}
      >
        😵
      </h1>
    );
  } else {
    if (win) {
      return (
        <h1
          className="win-face"
          onClick={() => {
            dispatchGame({ type: ACTIONS.UPDATE_WIN, payload: { win: false } });
            dispatchGame({
              type: ACTIONS.UPDATE_FLAGS_USED,
              payload: { flagsUsed: 0 },
            });
            dispatchGame({
              type: ACTIONS.UPDATE_GAME_OVER,
              payload: { gameOver: false },
            });
            dispatchGame({
              type: ACTIONS.UPDATE_COUNT_TIMER,
              payload: { countTimer: "000" },
            });
            dispatchGame({
              type: ACTIONS.UPDATE_BOARD,
              payload: {
                board: createBoard(
                  gameSettings.width,
                  gameSettings.height,
                  gameSettings.numMines
                ),
              },
            });
          }}
        >
          😍
        </h1>
      );
    } else {
      return <h1>😀</h1>;
    }
  }
};

export default InfoSettings;
