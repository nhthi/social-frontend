import { api } from "../../config/api"
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType"

export const  createPostAction = (postData)=> async(dispatch)=>{
    dispatch({type:CREATE_POST_REQUEST})
    try {
        const {data} = await api.post('/api/posts',postData)
        dispatch({type:CREATE_POST_SUCCESS,payload:data})
        console.log('Create post: ',data);
    } catch (error) {
        console.log('erro create post-----');
        dispatch({type:CREATE_POST_FAILURE, payload:error})
    }   
}

export const  getAllPostsAction = ()=> async(dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST})
    try {
        const {data} = await api.get('/api/posts')
        dispatch({type:GET_ALL_POST_SUCCESS,payload:data})
        console.log('get all posts: ',data);
    } catch (error) {
        console.log('error get all posts-----');
        dispatch({type:GET_ALL_POST_FAILURE, payload:error})
    }   
}

export const  getUSerPostAction = (userId)=> async(dispatch)=>{
    dispatch({type:GET_USERS_POST_REQUEST})
    try {
        const {data} = await api.get(`/api/posts/user/${userId}`)
        dispatch({type:GET_USERS_POST_SUCCESS,payload:data})
        console.log('get user posts: ',data);
    } catch (error) {
        console.log('error get user posts-----');
        dispatch({type:GET_USERS_POST_FAILURE, payload:error})
    }   
}

export const  likePostAction = (postId)=> async(dispatch)=>{
    dispatch({type:LIKE_POST_REQUEST})
    try {
        const {data} = await api.put(`/api/posts/like/${postId}`)
        dispatch({type:LIKE_POST_SUCCESS,payload:data})
        console.log('like posts: ',data);
    } catch (error) {
        console.log('error like posts-----');
        dispatch({type:LIKE_POST_FAILURE, payload:error})
    }   
}

export const  deletePostAction = (postId)=> async(dispatch)=>{
    dispatch({type:DELETE_POST_REQUEST})
    try {
        const {data} = await api.delete(`/api/posts/${postId}`)
        dispatch({type:DELETE_POST_SUCCESS,payload:data})
        dispatch(getAllPostsAction())
        console.log('delete posts: ',data);
    } catch (error) {
        console.log('error delete posts-----');
        dispatch({type:DELETE_POST_FAILURE, payload:error})
    }   
}

//create comment
export const  createCommentAction = (reqData)=> async(dispatch)=>{
    dispatch({type:CREATE_COMMENT_REQUEST})
    try {
        const {data} = await api.post(`api/comments/post/${reqData.postId}`,reqData.commentData)
        dispatch({type:CREATE_COMMENT_SUCCESS,payload:data})
        console.log('Create comment: ',data);
    } catch (error) {
        console.log('erro create comment-----');
        dispatch({type:CREATE_COMMENT_FAILURE, payload:error})
    }   
}