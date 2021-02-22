import React from 'react'

export const useAuth=()=>{
    const [state,dispatch]=React.useReducer(
        (prevState,action)=>{
            switch(action.type){
                case "GET_STARTED":
                    return{
                        ...prevState,
                        isLoading:false,
                    };
                case "RESTORE_UID":
                    return {
                        ...prevState,
                        userUID:action.uid,                  
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isLoading:false,
                        isSignOut:false,
                        userUID:action.uid,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignOut:true,
                        userUID:null,
                    };
            }
        },
        {
            isLoading:true,
            isSignOut:false,
            userUID:null,
        }
    );

    

    const authContext=React.useMemo(
    ()=>({
        getStarted:()=>dispatch({type:"GET_STARTED"}),
        signIn:(userUID)=>dispatch({type:"SIGN_IN",uid:userUID}),
        signOut:()=>dispatch({type:"SIGN_OUT"}),
        signUp:()=>dispatch({type:"SIGN_IN"})
    }),
    []
    );
    return {authContext,state}
}