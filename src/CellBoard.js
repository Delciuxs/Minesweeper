import React from "react";

import "./CellBoard.scss";

const InnerCell = ({ cell, click }) => {
  if (cell.show === 1) {
    if (cell.val === 0) {
      return (
        <div
          className="board-cell marked-cell empty-cell"
          onClick={() => {
            click();
          }}
        ></div>
      );
    }
    if (cell.val === -1) {
      return (
        <div
          className="board-cell marked-cell mine-cell"
          onClick={() => {
            click();
          }}
        >
          <i className="fas fa-skull"></i>
        </div>
      );
    } else {
      return (
        <div
          className={`board-cell marked-cell number-cell ${
            "number-" + cell.val
          }`}
          onClick={(e) => {
            click();
          }}
        >
          {cell.val}
        </div>
      );
    }
  } else {
    if (cell.flag) {
      return (
        <div
          className="board-cell marked-cell flag-cell"
          onClick={() => {
            click();
          }}
        >
          <i className="fas fa-flag"></i>
        </div>
      );
    } else {
      return (
        <div
          className="board-cell"
          onClick={() => {
            click();
          }}
        ></div>
      );
    }
  }
};

const CellBoard = ({ cell, click }) => {
  return <InnerCell cell={cell} click={click} />;
};

export default CellBoard;
