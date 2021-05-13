import React from "react";
import { useReducer } from "react";

import "./App.scss";
import Board from "./Board";
import InfoSettings from "./InfoSettings";
import { createBoard } from "./BoardUtil";
import { EASY_BOARD_SETTINGS, ACTIONS } from "./Constants";
import Difficulties from "./Difficulties";
import Tittleflag from "./Tittleflag";

const reducer = (stateGame, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_BOARD:
      return { ...stateGame, board: action.payload.board };
    case ACTIONS.UPDATE_GAME_STARTED:
      return { ...stateGame, gameStarted: action.payload.gameStarted };
    case ACTIONS.UPDATE_GAME_OVER:
      return { ...stateGame, gameOver: action.payload.gameOver };
    case ACTIONS.UPDATE_GAME_SETTINGS:
      return { ...stateGame, gameSettings: action.payload.gameSettings };
    case ACTIONS.UPDATE_COUNT_TIMER:
      return { ...stateGame, countTimer: action.payload.countTimer };
    case ACTIONS.UPDATE_WIN:
      return { ...stateGame, win: action.payload.win };
    case ACTIONS.UPDATE_FLAGS_USED:
      return { ...stateGame, flagsUsed: action.payload.flagsUsed };
    case ACTIONS.UPDATE_FLAGS_ACTIVE:
      return { ...stateGame, flagActive: action.payload.flagActive };
    case ACTIONS.RESET_GAME:
      return action.payload;
    default:
      return stateGame;
  }
};

const App = () => {
  const [stateGame, dispatchGame] = useReducer(reducer, {
    board: createBoard(
      EASY_BOARD_SETTINGS.width,
      EASY_BOARD_SETTINGS.height,
      EASY_BOARD_SETTINGS.numMines
    ),
    gameStarted: false,
    gameOver: false,
    gameSettings: EASY_BOARD_SETTINGS,
    countTimer: "000",
    win: false,
    flagsUsed: 0,
    flagActive: false,
  });

  const changeDifficulty = (game) => {
    dispatchGame({
      type: ACTIONS.RESET_GAME,
      payload: {
        countTimer: "000",
        gameStarted: false,
        gameOver: false,
        gameSettings: game,
        win: false,
        flagsUsed: 0,
        flagActive: false,
        board: createBoard(game.width, game.height, game.numMines),
      },
    });
  };

  return (
    <div className="content">
      <InfoSettings stateGame={stateGame} dispatchGame={dispatchGame} />
      <Tittleflag stateGame={stateGame} dispatchGame={dispatchGame} />
      <Board stateGame={stateGame} dispatchGame={dispatchGame} />
      <Difficulties stateGame={stateGame} changeDifficulty={changeDifficulty} />
    </div>
  );
};

export default App;
