import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    isConnectionError: false 
};


export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if (!error.response) {
            return thunkAPI.rejectWithValue("Connection Error: Please check your internet connection or try again later.");
        }
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
});

// Register User Thunk
export const RegisterUser = createAsyncThunk("user/RegisterUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/register', {
            name: user.name,
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if (!error.response) {
            return thunkAPI.rejectWithValue("Connection Error: Please check your internet connection or try again later.");
        }
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Current User Thunk
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data;
    } catch (error) {
        if (!error.response) {
            return thunkAPI.rejectWithValue("Connection Error: Please check your internet connection or try again later.");
        }
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout User Thunk
export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await axios.delete('http://localhost:5000/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        // Login User
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            if (action.payload === "Connection Error: Please check your internet connection or try again later.") {
                state.isConnectionError = true;
            }
            state.message = action.payload;
        });

        // Register User
        builder.addCase(RegisterUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            if (action.payload === "Connection Error: Please check your internet connection or try again later.") {
                state.isConnectionError = true;
            }
            state.message = action.payload;
        });

        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            if (action.payload === "Connection Error: Please check your internet connection or try again later.") {
                state.isConnectionError = true;
            }
            state.message = action.payload;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
