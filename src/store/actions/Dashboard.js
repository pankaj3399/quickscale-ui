import { REMOVE_SUB_THEME } from "store/ActionTypes"
import { ADD_SUB_THEME } from "store/ActionTypes"
import { SET_THEME, SET_SUB_THEME, SET_IS_FILTER_ENABLED } from "store/ActionTypes"

export const setTheme = data => dispatch =>{
    dispatch({
        type:SET_THEME,
        payload:data
    })
}

export const setSubtheme = data => dispatch =>{
    dispatch({
        type:SET_SUB_THEME,
        payload:data
    })
}

export const addSubtheme = data => dispatch =>{
    dispatch({
        type:ADD_SUB_THEME,
        payload:data
    })
}

export const removeSubtheme = data => dispatch =>{
    dispatch({
        type:REMOVE_SUB_THEME,
        payload:data
    })
}

export const setIsFilterEnabled = data => dispatch =>{
    dispatch({
        type:SET_IS_FILTER_ENABLED,
        payload:data
    })
}