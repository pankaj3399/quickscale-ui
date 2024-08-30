const { SET_SUB_THEME, SET_IS_FILTER_ENABLED, ADD_SUB_THEME, REMOVE_SUB_THEME } = require("store/ActionTypes");
const { SET_THEME } = require("store/ActionTypes");

const init = {
    theme:"Generative AI",
    subThemes:["Image Generation"],
    isFilterEnabled:false
}

const dashboard = (state=init, action) =>{
    switch(action.type){
        case SET_THEME:
            return{
                ...state,
                theme:action.payload
            }
        case ADD_SUB_THEME:
            return{
                ...state,
                subThemes: [...state.subThemes, action.payload]
            }
            case REMOVE_SUB_THEME:
                if(state.subThemes.length > 1) return{
                    ...state,
                    subThemes: state.subThemes.filter((theme)=>theme!==action.payload)
                }
        case SET_IS_FILTER_ENABLED:
            return{
                ...state,
                isFilterEnabled:action.payload
            }
        default:
            return state
    }
}

export default dashboard