import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../config";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await axios.get("http://localhost:3001/questions");
    return response.data;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addQuestion: (state, action) => {
      state.items.push(action.payload);
    },
    removeQuestion: (state, action) => {
      state.items = state.items.filter(
        (question) => question.id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      const { id, content } = action.payload;
      const existingQuestion = state.items.find(
        (question) => question.id === id
      );
      if (existingQuestion) {
        existingQuestion.content = content;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addQuestion, removeQuestion, updateQuestion } =
  questionsSlice.actions;

export default questionsSlice.reducer;
