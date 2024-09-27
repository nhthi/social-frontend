import { api } from "../../config/api"
import { CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS, GET_USER_ID_REELS_FAILURE, GET_USER_ID_REELS_REQUEST, GET_USER_ID_REELS_SUCCESS } from "./reel.actionType"


export const getAllReelsAction = ()=> async(dispatch)=>{
    dispatch({type:GET_ALL_REELS_REQUEST})
    try {
        const {data} = await api.get('/api/reels')
        dispatch({type:GET_ALL_REELS_SUCCESS,payload:data})
        console.log("Get all reels : ",data);
    } catch (error) {
        console.log('error : ',error);
    }
}


export const  createReelAction = (reelData)=> async(dispatch)=>{
    dispatch({type:CREATE_REEL_REQUEST})
    try {
        const {data} = await api.post('/api/reels',reelData)
        dispatch({type:CREATE_REEL_SUCCESS,payload:data})
        console.log('Create reel: ',data);
    } catch (error) {
        console.log('erro create reel-----');
        dispatch({type:CREATE_REEL_FAILURE, payload:error})
    }   
}

export const  getUserReelAction = (userId)=> async(dispatch)=>{
    dispatch({type:GET_USER_ID_REELS_REQUEST})
    try {
        const {data} = await api.get(`/api/reels/user/${userId}`)
        dispatch({type:GET_USER_ID_REELS_SUCCESS,payload:data})
        console.log('get user reels: ',data);
    } catch (error) {
        console.log('error get user reels-----');
        dispatch({type:GET_USER_ID_REELS_FAILURE, payload:error})
    }   
}