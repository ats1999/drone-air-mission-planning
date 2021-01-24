import * as createPlanTypes from "../actions/action-types/createPlan";
const initialState = {
    points:[],
    lines:[],
    circles:[]
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
       case createPlanTypes.ADD_SOURCE: 
            if(action.payload.type === "point"){
                return {
                    ...state,points:[...state.points,action.payload.data]
                }
            }else if(action.payload.type === "line"){
                return {
                    ...state,lines:[...state.lines,action.payload.data]
                }
            }else if(action.payload.type === "circle"){
                return {
                    ...state,circles:[...state.circles,action.payload.data]
                }
            }
            else return state;
       default: return state
    }
 }
 export default reducer;