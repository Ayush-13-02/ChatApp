import { createContext, useContext, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider=({children})=>{
    const {currentuser} = useContext(AuthContext);
    const INTIAL_STATE = {
        user:{},
        chatID:"null"
    };
    const ChatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                setSideOPen(false)
                return{
                    user:action.payload,
                    chatID:currentuser.uid > action.payload.uid ?
                    (currentuser.uid + action.payload.uid) :
                    (action.payload.uid + currentuser.uid)
                };
            case "SideOpen":
                setSideOPen(true);
                return state;
            default:
                return state;
        }
    } 
    const [sideOPen, setSideOPen] = useState(true)
    const [state, dispatch] = useReducer(ChatReducer,INTIAL_STATE);
    
    return (
        <ChatContext.Provider value={{data:state,dispatch,sideOPen}}>
            {children}
        </ChatContext.Provider>
    )
}