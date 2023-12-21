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
      const token = thunkAPI.getState().loginReducer.token; // Récupération du token d'authentification depuis le state Redux
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
      const payload = response.data.body; // Extraction des données de réponse
      console.log(payload);
      return payload; // Retourne les données récupérées du profil utilisateur
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      throw error; // Lance l'erreur pour la gestion des erreurs dans le reducer
    }
  }
);

// MODIFICATION DU PROFIL UTILISATEUR
export const updateUserProfile = createAsyncThunk(
  "updateUser/updateUserProfile",
  async (updatedUserData, thunkAPI) => {
    console.log(updatedUserData);
    try {
      const token = thunkAPI.getState().loginReducer.token; // Récupération du token d'authentification depuis le state Redux
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        updatedUserData, // Les données mises à jour du profil utilisateur
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data.body; // Retourne les données mises à jour du profil utilisateur
    } catch (error) {
      throw error; // Lance l'erreur pour la gestion des erreurs dans le reducer
    }
  }
);

// REDUCER
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Stocke les données du profil utilisateur
    isLoading: false, // Indique si une requête est en cours
    error: null, // Stocke les erreurs en cas d'échec des requêtes
  },
  reducers: {}, // Les reducers pourraient être définis ici pour gérer des actions synchrones
  extraReducers: (builder) => {
    builder
      // Gestion des états de chargement et de réussite/échec pour getUserProfile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Met à jour les données du profil utilisateur après récupération réussie
        console.log(action.payload);
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Met à jour l'erreur en cas d'échec de la récupération du profil utilisateur
      })
      // Gestion des états de chargement et de réussite/échec pour updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Met à jour les données du profil utilisateur après la mise à jour réussie
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Met à jour l'erreur en cas d'échec de la mise à jour du profil utilisateur
      });
  },
});


export default userSlice.reducer; // Exporte le reducer du profil utilisateur

