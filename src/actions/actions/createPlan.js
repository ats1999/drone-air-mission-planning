import * as actionTypes from "../action-types/createPlan";
export const addSource=(data,type)=>{
    return {
        type:actionTypes.ADD_SOURCE,
        payload:{
            data,type
        }
    }
}