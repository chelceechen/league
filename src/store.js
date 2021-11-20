import { configureStore } from "@reduxjs/toolkit";

import LegendsReducer from "./lol/legendsSlice";

export default configureStore({
  reducer: {
    legends: LegendsReducer,
  },
});
