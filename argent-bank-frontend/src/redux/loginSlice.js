import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser= createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=> {
        const request = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials)
        const response = await request.data.data;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
)

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        isLogged: false,
        loading: false,
        user: null,
        error: null
    },
    extraReducers:(builder)=> {
        builder
        .addCase(loginUser.pending, (state)=> {  
            state.isLogged= false;          
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state, action)=> {
            state.isLogged= true;
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action)=> {
            state.isLogged= false;
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'erreur 400: La requête à échoué'){
                state.error = 'L\'email ou le mot de passe sont incorrect';
            } else {
                state.error = action.error.message;
            }
            state.error = null;
        })
    }    
});

export default userSlice.reducer