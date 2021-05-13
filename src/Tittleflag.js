import React from "react";

import { ACTIONS } from "./Constants";

import "./Tittleflag.scss";

const Tittleflag = ({ stateGame, dispatchGame }) => {
  return (
    <div className="title-flag">
      {stateGame.win ? (
        <h1 className="win-status">YOU WIN</h1>
      ) : (
        <h1 className="type-game">
          {stateGame.gameSettings.type.toUpperCase()}
        </h1>
      )}
      <div
        className={`${stateGame.flagActive ? "flag-active" : "flag"}`}
        onClick={() => {
          dispatchGame({
            type: ACTIONS.UPDATE_FLAGS_ACTIVE,
            payload: { flagActive: !stateGame.flagActive },
          });
        }}
      >
        <i className={`fas fa-flag `}></i>
      </div>
    </div>
  );
};

export default Tittleflag;
