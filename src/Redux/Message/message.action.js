import { api } from "../../config/api"
import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_FAILURE, GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS } from "./message.actionType"

export const createMessage = (reqMessage) => async(dispatch)=>{
    dispatch({type:CREATE_MESSAGE_REQUEST})
    try {
        const {data} = await api.post(`/api/message/chat/${reqMessage.chatId}`,reqMessage.message)
        reqMessage.sendMessageToServer(data)
        console.log('create message ',data);
        dispatch({type:CREATE_MESSAGE_SUCCESS,payload:data})
    } catch (error) {
        console.log('create message error ',error);
        dispatch({type:CREATE_MESSAGE_FAILURE,payload:error})
    }
}

export const createChat = (reqChatId) => async(dispatch)=>{
    dispatch({type:CREATE_CHAT_REQUEST})
    try {
        const {data} = await api.post(`/api/chats`,reqChatId)
        console.log('create chat ',data);
        dispatch({type:CREATE_CHAT_SUCCESS,payload:data})
    } catch (error) {
        console.log('create chat error ',error);
        dispatch({type:CREATE_CHAT_FAILURE,payload:error})
    }
}

export const getAllChats = () => async(dispatch)=>{
    dispatch({type:GET_ALL_CHATS_REQUEST})
    try {
        const {data} = await api.get(`/api/chats`)
        console.log('get all chats ',data);
        dispatch({type:GET_ALL_CHATS_SUCCESS,payload:data})
    } catch (error) {
        console.log('get all chats error ',error);
        dispatch({type:GET_ALL_CHATS_FAILURE,payload:error})
    }
}