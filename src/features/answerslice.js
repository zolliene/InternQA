// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3001"; // Địa chỉ Mock API của bạn

// // Async thunk để thêm câu trả lời mới
// export const addAnswer = createAsyncThunk(
//   "answers/addAnswer",
//   async ({ questionId, userId, content }) => {
//     const response = await axios.post(`${API_BASE_URL}/answers`, {
//       questionId,
//       userId,
//       content,
//     });
//     return response.data;
//   }
// );

// const answersSlice = createSlice({
//   name: "answers",
//   initialState: {
//     items: [], // Danh sách câu trả lời
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addAnswer.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addAnswer.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items.push(action.payload); // Thêm câu trả lời mới vào danh sách
//       })
//       .addCase(addAnswer.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default answersSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Địa chỉ Mock API của bạn

// Async thunk để thêm câu trả lời mới
export const addAnswer = createAsyncThunk(
  "answers/addAnswer",
  async ({ questionId, userId, content }) => {
    // Bước 1: Lấy tất cả các câu trả lời hiện có để xác định ID mới
    const response = await axios.get(`${API_BASE_URL}/answers`);
    const allAnswers = response.data;

    // Bước 2: Tính toán ID mới tự tăng dần
    const newId =
      allAnswers.length > 0
        ? Math.max(...allAnswers.map((answer) => parseInt(answer.id))) + 1
        : 1;

    // Bước 3: Tạo câu trả lời mới với ID tự tăng dần
    const newAnswer = {
      id: newId.toString(), // Chuyển ID thành chuỗi nếu cần
      questionId,
      userId,
      content,
    };

    // Bước 4: Gửi câu trả lời mới lên Mock API
    const postResponse = await axios.post(`${API_BASE_URL}/answers`, newAnswer);

    return postResponse.data;
  }
);

const answersSlice = createSlice({
  name: "answers",
  initialState: {
    items: [], // Danh sách câu trả lời
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAnswer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload); // Thêm câu trả lời mới vào danh sách
      })
      .addCase(addAnswer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default answersSlice.reducer;
