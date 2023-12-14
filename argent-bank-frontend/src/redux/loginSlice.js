import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// ACTION
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, rememberMe }) => {
    const { data } = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      { email, password }
    );
    const { token } = data.body;
    rememberMe && token && localStorage.setItem("token", JSON.stringify(token));
    return token;
  }
);

// REDUCER
const loginSlice = createSlice({
  name: "token",
  initialState: {
    isLogged: !!localStorage.getItem("token"),
    loading: false,
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    logout() {
      localStorage.removeItem("token");
      return {
        isLogged: false,
        loading: false,
        token: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLogged = false;
        state.loading = true;
        state.token = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLogged = false;
        state.loading = false;
        state.token = null;
        state.error = "L'email ou le mot de passe sont incorrects";
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
