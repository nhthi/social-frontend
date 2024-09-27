import axios from "axios"
import { API_BASE_URL, api } from "../../config/api"
import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_FOLLOWER_FAILURE, GET_FOLLOWER_REQUEST, GET_FOLLOWER_SUCCESS, GET_FOLLOWING_FAILURE, GET_FOLLOWING_REQUEST, GET_FOLLOWING_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"
import { GET_ALL_POST_SUCCESS } from "../Post/post.actionType"
import { getAllPostsAction } from "../Post/post.action"

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data)

        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("Login success: ", data)
        dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: LOGIN_FAILURE, payload: error })
    }
}

export const logoutUserAction = () => (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST })
    try {
        localStorage.removeItem("jwt");
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: LOGOUT_FAILURE, payload: error })
    }
}

export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data)

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        console.log("Register: ", data)
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: LOGIN_FAILURE, payload: error })
    }
}

export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST })
    try {
        const { data } = await axios.get(
            `${API_BASE_URL}/api/users/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }
        )
        console.log("Profile Data: ", data)
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: GET_PROFILE_FAILURE, payload: error })
    }
}

export const getProfileByUserIdAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_USER_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/users/${userId}`)
        console.log("Profile explore Data: ", data)
        dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: GET_USER_BY_ID_FAILURE, payload: error })
    }
}
export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST })
    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData)
        console.log("Update Data: ", data)
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error })
    }
}


export const searchUser = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST })
    try {
        const { data } = await api.get(`/users/search?query=${query}`)
        console.log("search user: ", data)
        dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: SEARCH_USER_FAILURE, payload: error })
    }
}

export const getFollowingAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_FOLLOWING_REQUEST })
    try {
        const { data } = await api.get(`/api/users/followings/${userId}`)
        console.log("followings: ", data)
        dispatch({ type: GET_FOLLOWING_SUCCESS, payload: data });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: GET_FOLLOWING_FAILURE, payload: error })
    }
}

export const getFollowerAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_FOLLOWER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/followers/${userId}`)
        console.log("followers: ", data)
        dispatch({ type: GET_FOLLOWER_SUCCESS, payload: data });
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: GET_FOLLOWER_FAILURE, payload: error })
    }
}

export const followAction = (reqUserId,userId) => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_REQUEST })
    try {
          await api.put(`/api/users/follow/${reqUserId}/${userId}`)
        dispatch({ type: FOLLOW_USER_SUCCESS});
        dispatch(getFollowerAction(userId))
        dispatch(getFollowingAction(userId))
    } catch (error) {
        console.log("---------", error)
        dispatch({ type: FOLLOW_USER_FAILURE, payload: error })
    }
}