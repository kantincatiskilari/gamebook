import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: [],
  isPending: false,
  error: false,
};

export const commentSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchCommentStart: (state) => ({
      ...state,
      isPending: true,
    }),
    fetchCommentSuccess: (state, action) => ({
      ...state,
      comment: action.payload,
    }),
    fetchCommentFailure: (state) => ({
      ...state,
      isPending: false,
      error: state.error,
    }),
    commentStart: (state) => ({
      isPending: true,
    }),
    commentSuccess: (state, action) => ({
      comment: [...state.comment, action.payload],
    }),
    commentFailure: (state) => ({
      ...state,
      isPending: false,
      error: state.error,
    }),
    // postLike: (state,action) => ({
    //     ...state,
    //     post : [...state.post.fav,action.payload]
    // }),
    // postUnlike: (state,action) => {
    //     state.post.map((item) => {
    //     if (item.fav.includes(action.payload)) {
    //         item.fav.splice(
    //           item.fav.findIndex(
    //             (userId) => userId === action.payload
    //           ),
    //           1
    //         );
    //     }
    // }
    // )},
    commentDelete: (state, action) => ({
      ...state,
      comment: state.comment.filter((item) => item._id !== action.payload),
    }),
    // postView: (state) => (
    //     state.post.views += 1
    // )
  },
});

export const {
  fetchCommentStart,
  fetchCommentSuccess,
  fetchCommentFailure,
  commentStart,
  commentFailure,
  commentSuccess,
  commentDelete,
} = commentSlice.actions;

export default commentSlice.reducer;
