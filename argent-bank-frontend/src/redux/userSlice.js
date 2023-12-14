import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// ACTION

// RECUPERATION DU PROFIL UTILISATEUR
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, thunkAPI) => {
    console.log("Getting...");
    try {
      console.log("Getting token...");
      const token = thunkAPI.getState().loginReducer.token;
      console.log(token);
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {}, // Envoyez les données nécessaires pour la requête ici, s'il y en a
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const payload = response.data.body;
      console.log(payload);
      return payload;
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      throw error;
    }
  }
);


// MODIFICATION DU PROFIL UTILISATEUR
export const updateUserProfile = createAsyncThunk(
  "updateUser/updateUserProfile",
  async (updatedUserData, thunkAPI) => {
    console.log(updatedUserData);
    try {
      const token = thunkAPI.getState().loginReducer.token;
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data.body;
    } catch (error) {
      throw error;
    }
  }
);


// REDUCER
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
