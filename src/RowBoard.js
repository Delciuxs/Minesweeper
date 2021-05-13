import React from "react";

import "./RowBoard.scss";

const RowBoard = ({ children }) => {
  return <div className="board-row">{children}</div>;
};

export default RowBoard;
