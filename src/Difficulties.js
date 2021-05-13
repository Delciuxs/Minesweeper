import React from "react";

import {
  EASY_BOARD_SETTINGS,
  MEDIUM_BOARD_SETTINGS,
  HARD_BOARD_SETTINGS,
} from "./Constants";

import "./Difficulties.scss";

const Difficulties = ({ stateGame, changeDifficulty }) => {
  return (
    <div className="difficulties">
      <button
        className={stateGame.gameSettings.type === "easy" ? "selected" : ""}
        onClick={() => changeDifficulty(EASY_BOARD_SETTINGS)}
      >
        Easy - 9x9 / 10 Mines
      </button>
      <button
        className={stateGame.gameSettings.type === "normal" ? "selected" : ""}
        onClick={() => changeDifficulty(MEDIUM_BOARD_SETTINGS)}
      >
        Normal - 16x16 / 40 Mines
      </button>
      <button
        className={stateGame.gameSettings.type === "hard" ? "selected" : ""}
        onClick={() => changeDifficulty(HARD_BOARD_SETTINGS)}
      >
        Hard - 16x30 / 99 Mines
      </button>
    </div>
  );
};

export default Difficulties;
