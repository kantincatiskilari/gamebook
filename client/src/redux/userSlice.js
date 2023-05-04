import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isPending: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isPending = true;
    },
    loginSuccess: (state, action) => ({
      isPending: false,
      user: action.payload,
    }),
    loginFailure: (state) => ({
      isPending: false,
      error: true,
    }),
    updateStart: (state) => ({
      ...state,
      isPending: true,
    }),
    updateSuccess: (state, action) => ({
      ...state,
      user: action.payload,
      isPending: false,
    }),
    updateFailure: (action) => ({
      error: true,
      isPending: false,
    }),
    logout: (state) => ({
      user: null,
    }),
    followUser: (state, action) => {
      if (!state.user.followings.includes(action.payload)) {
        state.user.followings.push(action.payload);
      }
    },
    unfollowUser: (state, action) => {
      if (state.user.followings.includes(action.payload)) {
        state.user.followings.splice(
          state.user.followings.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerFailure,
  registerStart,
  registerSuccess,
  followUser,
  unfollowUser,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;

export default userSlice.reducer;
