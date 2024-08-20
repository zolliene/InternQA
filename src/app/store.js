import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "../features/questionsSlice";
import answersReducer from "../features/answerslice";

const store = configureStore({
  reducer: {
    answers: answersReducer,
    questions: questionsReducer,
  },
});

export default store;
