export const EASY_GAME = "easy";
export const MEDIUM_GAME = "normal";
export const HARD_GAME = "hard";

export const EASY_BOARD_SETTINGS = {
  type: EASY_GAME,
  width: 9,
  height: 9,
  numMines: 10,
};
export const MEDIUM_BOARD_SETTINGS = {
  type: MEDIUM_GAME,
  width: 16,
  height: 16,
  numMines: 40,
};
export const HARD_BOARD_SETTINGS = {
  type: HARD_GAME,
  width: 16,
  height: 30,
  numMines: 99,
};

export const ACTIONS = {
  UPDATE_BOARD: "update_board",
  UPDATE_GAME_STARTED: "update_game_started",
  UPDATE_GAME_OVER: "update_game_over",
  UPDATE_GAME_SETTINGS: "update_game_settings",
  UPDATE_COUNT_TIMER: "update_count_timer",
  UPDATE_WIN: "update_win",
  UPDATE_FLAGS_USED: "update_flags_used",
  UPDATE_FLAGS_ACTIVE: "update_flags_active",
  RESET_GAME: "reset_game",
};
