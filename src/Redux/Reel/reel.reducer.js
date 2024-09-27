import { CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, GET_ALL_REELS_FAILURE, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS, GET_USER_ID_REELS_FAILURE, GET_USER_ID_REELS_REQUEST, GET_USER_ID_REELS_SUCCESS } from "./reel.actionType";


const initialState = {
    reels: [],
    reel: null,
    error: null,
    loading: false
}

export const reelReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REELS_REQUEST:
        case CREATE_REEL_REQUEST:
        case GET_USER_ID_REELS_REQUEST:
            return { ...state, error: null, loading: true }
        case GET_ALL_REELS_SUCCESS:
        case GET_USER_ID_REELS_SUCCESS:
            return { ...state, reels: action.payload.reverse(), error: null, loading: false }
        case CREATE_REEL_SUCCESS:
            return { ...state, reels: [...state.reels, action.payload], reel: action.payload, error: null, loading: false }
        case GET_ALL_REELS_FAILURE:
        case CREATE_REEL_FAILURE:
        case GET_USER_ID_REELS_FAILURE:
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
}