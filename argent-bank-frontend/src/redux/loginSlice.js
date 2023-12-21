import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// ACTION
export const loginUser = createAsyncThunk(
  "user/loginUser",
  // Action asynchrone pour la connexion de l'utilisateur
  async ({ email, password, rememberMe }) => {
    const { data } = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      { email, password }
    );
    const { token } = data.body;
    // Stocke le jeton dans le localStorage si "se souvenir de moi" est coché
    rememberMe && token && localStorage.setItem("token", token);
    return token; // Renvoie le jeton
  }
);

// REDUCER
const loginSlice = createSlice({
  name: "token",
  initialState: {
    // État initial pour gérer l'authentification de l'utilisateur
    isLogged: !!localStorage.getItem("token"), // Vérifie si l'utilisateur est connecté
    loading: false, // Indique si une opération de chargement est en cours
    token: localStorage.getItem("token") || null, // Stocke le jeton d'authentification s'il est présent
    error: null, // Stocke les éventuelles erreurs liées à la connexion
  },
  reducers: {
    // Action pour déconnecter l'utilisateur
    logout() {
      localStorage.removeItem("token"); // Supprime le jeton du localStorage
      return {
        // Réinitialise l'état pour déconnecter l'utilisateur
        isLogged: false,
        loading: false,
        token: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion des états lors de la connexion en cours
      .addCase(loginUser.pending, (state) => {
        state.isLogged = false;
        state.loading = true;
        state.token = null;
        state.error = null;
      })
      // Gestion des états lorsque la connexion réussit
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.loading = false;
        state.token = action.payload; // Stocke le jeton d'authentification
        state.error = null;
      })
      // Gestion des états en cas d'échec de connexion
      .addCase(loginUser.rejected, (state, action) => {
        state.isLogged = false;
        state.loading = false;
        state.token = null;
        state.error = "L'email ou le mot de passe sont incorrects"; // Message d'erreur spécifique
      });
  },
});

export const { logout } = loginSlice.actions; // Action exportée pour déconnecter l'utilisateur
export default loginSlice.reducer; // Réducteur exporté pour gérer l'état de l'authentification utilisateur
