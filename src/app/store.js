import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "../features/questionsSlice";

const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

export default store;
