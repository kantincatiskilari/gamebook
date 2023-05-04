import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  isPending: false,
  error: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchStart: (state) => ({
      ...state,
      isPending: true,
    }),
    fetchSuccess: (state, action) => ({
      ...state,
      isPending: false,
      post: action.payload,
    }),
    fetchFailure: (state) => ({
      ...state,
      isPending: false,
      error: state.error,
    }),
    postStart: (state) => ({
      ...state,
      isPending: true,
    }),
    postSuccess: (state, action) => ({
      ...state,
      post: [action.payload, ...state.post],
    }),
    postFailure: (state) => ({
      ...state,
      isPending: false,
      error: state.error,
    }),
    postLike: (state, action) => ({
      ...state,
      post: [...state.post.fav, action.payload],
    }),
    postUnlike: (state, action) => {
      state.post.map((item) => {
        if (item.fav.includes(action.payload)) {
          item.fav.splice(
            item.fav.findIndex((userId) => userId === action.payload),
            1
          );
        }
      });
    },
    postDelete: (state, action) => ({
      ...state,
      post: state.post.filter((item) => item._id !== action.payload),
    }),
    postView: (state) => (state.post.views += 1),
  },
});

export const {
  postStart,
  postSuccess,
  postFailure,
  postDelete,
  postLike,
  postView,
  postUnlike,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = postSlice.actions;

export default postSlice.reducer;
