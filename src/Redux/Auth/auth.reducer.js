import { searchUser } from "./auth.action";
import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_FOLLOWER_REQUEST, GET_FOLLOWER_SUCCESS, GET_FOLLOWING_REQUEST, GET_FOLLOWING_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    user: null,
    searchUser: [],
    followers: [],
    followings: [],
    userExplore: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
        case LOGOUT_REQUEST:
        case GET_FOLLOWING_REQUEST:
        case GET_FOLLOWER_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case FOLLOW_USER_REQUEST:
        case GET_USER_BY_ID_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, user: action.payload, error: null, loading: false }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null }
        case SEARCH_USER_SUCCESS:
            return { ...state, searchUser: action.payload, loading: false, error: null }
        case LOGOUT_SUCCESS:
            return { ...state, user: null, loading: false, error: null }
        case GET_FOLLOWER_SUCCESS:
            return { ...state, error: null, loading: false, followers: action.payload }
        case GET_FOLLOWING_SUCCESS:
            return { ...state, error: null, loading: false, followings: action.payload }
        case GET_USER_BY_ID_SUCCESS:
            return { ...state, userExplore: action.payload, error: null, loading: false }
        case FOLLOW_USER_SUCCESS:
            return { ...state,  error: null, loading: false }
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case LOGOUT_FAILURE:
        case GET_PROFILE_FAILURE:
        case GET_USER_BY_ID_FAILURE:
        case FOLLOW_USER_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}