import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { user } }
    ) => {
      state.user = user;
    }
  },
  extraReducers: (builder) => { }
});

export const { setCredentials } = slice.actions;

export default slice.reducer;
