// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import url from "../config";
// import axios from "axios";

// export const fetchQuestions = createAsyncThunk(
//   "questions/fetchQuestions",
//   async () => {
//     const response = await axios.get("http://localhost:3001/questions");
//     return response.data;
//   }
// );

// const questionsSlice = createSlice({
//   name: "questions",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     addQuestion: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeQuestion: (state, action) => {
//       state.items = state.items.filter(
//         (question) => question.id !== action.payload
//       );
//     },
//     updateQuestion: (state, action) => {
//       const { id, content } = action.payload;
//       const existingQuestion = state.items.find(
//         (question) => question.id === id
//       );
//       if (existingQuestion) {
//         existingQuestion.content = content;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchQuestions.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchQuestions.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchQuestions.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addQuestion, removeQuestion, updateQuestion } =
//   questionsSlice.actions;

// export default questionsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../config";

// Thunk để lấy danh sách câu hỏi
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/questions`);
    return response.data;
  }
);

// Thunk để thêm câu hỏi mới
// Thêm câu hỏi mới
export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (newQuestion, { getState, rejectWithValue }) => {
    try {
      // Lấy danh sách câu hỏi hiện tại để xác định ID tiếp theo
      const response = await axios.get(`${API_BASE_URL}/questions`);
      const questions = response.data;

      // Tính ID mới là lớn nhất hiện tại cộng thêm 1
      const newId =
        questions.length > 0
          ? Math.max(...questions.map((q) => parseInt(q.id))) + 1
          : 1;

      // Đảm bảo các trường dữ liệu cần thiết
      const questionToAdd = {
        id: newId.toString(),
        userId: newQuestion.userId || null, // Đảm bảo userId được truyền hoặc null nếu không có
        content: newQuestion.content,
        isAnswered: false,
        isDeleted: false,
      };

      // Gửi yêu cầu thêm câu hỏi mới lên server
      const result = await axios.post(
        `${API_BASE_URL}/questions`,
        questionToAdd
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk để cập nhật câu hỏi
export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/questions/${id}`, {
        content: content,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk để xóa câu hỏi
export const removeQuestion = createAsyncThunk(
  "questions/removeQuestion",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/questions/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Tạo slice cho các hành động và reducer
const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.items.push(action.payload); // Thêm câu hỏi mới vào danh sách
      });
  },
});

export default questionsSlice.reducer;
