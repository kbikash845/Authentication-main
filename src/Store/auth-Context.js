import React, { useState } from "react"

const AuthContext=React.createContext({
    token:'',
    isLonggedIn:false,
    login:(token)=>{},
    longout:()=>{}

})

  export const AuthContextProvider=(props)=>{
    const innialToken=localStorage.getItem('token')
    const [token,SetToken]=useState(innialToken)

    const userIsLoggedn=!!token;

    const logingHandler=(token)=>{
      SetToken(token)
      localStorage.setItem('token',token)
    }

    const longoutHandler=()=>{
        SetToken(null)
        localStorage.removeItem('token')
    }

    const ContextValue={
        token:token, 
        isLonggedIn:userIsLoggedn,
        login:logingHandler,
        longout:longoutHandler
    }
    return <AuthContext.Provider value={ContextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;