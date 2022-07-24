import React, { useState, useContext, createContext } from 'react'
import axios  from 'axios'
import libs from '../libs/util'
import cookie from "js-cookie"

const authContext = createContext()


export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
        {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }


  const signOut = () => {
    setAuthToken(null)
  }

  const signIn = async ({ email, password }) => {

    const result = await axios({
      method: 'post',
      url: libs.location() + 'login',
      data: {
        email,
        password
      }
    });
     
    console.log(result?.data)
  
    if (result?.data !== 'Invalid' ) {
      try{
        setAuthToken(result.data);
        cookie.set('__session', result.data)
      }catch(err){
        console.log(err)
      }

    }
    if (result?.data == 'Invalid' ){
      return {
        message: 'los datos suministrados son invalidos',
        alerta: true
      }
    }

    if (result?.data){
      return {
        pass: true
      }
    }
  }

  const isSignedIn = () => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  return {
    signIn,
    signOut,
    isSignedIn,
    getAuthHeaders
  }
}