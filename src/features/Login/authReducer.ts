import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../App/app-reducer'
import {authAPI, FieldsErrorType, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorType> } }>('auth/loginTC', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err;
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('auth/logoutTC', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch
        (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }


})


const slice = createSlice({
        name: 'auth',
        initialState: {
            isLoggedIn: false
        },
        reducers: {
            setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
                state.isLoggedIn = action.payload.value
            }
        },
        extraReducers: builder => {
            builder.addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = true
            })
            builder.addCase(logoutTC.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
        }
    }
)

export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC




