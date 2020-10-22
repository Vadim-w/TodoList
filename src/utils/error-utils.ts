import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../App/app-reducer';
import { Dispatch } from 'redux';
import { CommonResponseType } from '../api/todolist-api';

export const handleServerAppError = <D>(data: CommonResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    debugger
    dispatch(setAppErrorAC({error: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType =  Dispatch<SetAppErrorActionType | SetAppStatusActionType>