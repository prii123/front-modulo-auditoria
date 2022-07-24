import { createContext, useContext, useState } from 'react'
// import { useFetchCurrentUser } from '../service/auth'


const defaultState = {
  user: null,
  status: 'idle',
}

const AuthContext = createContext(defaultState)

const AuthProvider = ({ children }) => {
  // const state = useFetchCurrentUser()

  return <AuthContext.Provider >{children}</AuthContext.Provider>
}

export default AuthProvider 

export const useCurrentUser = () => useContext(AuthContext)