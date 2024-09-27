import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import  {thunk}  from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { messageRuducer } from "./Message/message.reducer";
import { reelReducer } from "./Reel/reel.reducer";


const rootReducers=combineReducers({
auth:authReducer,
post:postReducer,
message:messageRuducer,
reel:reelReducer
})

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))
