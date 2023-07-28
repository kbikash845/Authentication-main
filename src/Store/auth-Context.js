import React, { useState,useEffect } from "react"

const AuthContext=React.createContext({
    token:'',
    isLonggedIn:false,
    login:(token)=>{},
    longout:()=>{},
    autoLogout:()=>{}

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

    function autoLogoutHandler(){
        setTimeout(()=>{
          console.log('You have been logged out');
          localStorage.removeItem('token');
          SetToken(null); // Update the token state to reflect logout
        },5000)
      }
      useEffect(()=>{
        autoLogoutHandler();
      },[])

    

    const ContextValue={
        token:token, 
        isLonggedIn:userIsLoggedn,
        login:logingHandler,
        longout:longoutHandler,
        autoLogout:autoLogoutHandler
    }
    return <AuthContext.Provider value={ContextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;