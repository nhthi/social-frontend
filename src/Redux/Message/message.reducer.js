import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_FAILURE, GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS } from "./message.actionType";

const initialState = {
    messages : [],
    chats: [],
    loading: false,
    error : null,
    message: null
}

export const messageRuducer = ( state = initialState, action)=>{
    switch (action.type) {
        case CREATE_CHAT_REQUEST:
        case CREATE_MESSAGE_REQUEST:
        case GET_ALL_CHATS_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            }
        case CREATE_MESSAGE_SUCCESS:
            return {
                ...state,
                message:action.payload,
                messages:[...state.messages,action.payload],
                loading:false,
                error:null
            }
        case CREATE_CHAT_SUCCESS:
            return {
                ...state,
                chats:[action.payload,...state.chats],
                error:null,
                loading:false
            }
        case GET_ALL_CHATS_SUCCESS:
            return {
                ...state,
                chats:action.payload,
                error:null,
                loading:false
            }
        case CREATE_CHAT_FAILURE:
        case CREATE_MESSAGE_FAILURE:
        case GET_ALL_CHATS_FAILURE:
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        default:
            return state;
    }
}
