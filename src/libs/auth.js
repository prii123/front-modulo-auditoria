import React, { useState, useContext, createContext } from "react";
import axios from "axios";
import libs from "../libs/util";
import cookie from "js-cookie";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const signOut = () => {
    setAuthToken(null);
    cookie.set("__session", "");
  };

  const signIn = async ({ email, password }) => {
    const result = await axios({
      method: "post",
      url: libs.location() + "/auth/login",
      data: {
        email,
        password,
      },
    });


    if (result?.status !== 401 && result?.status !== 500) {
      // try {
        setAuthToken(result?.data?.token);
        cookie.set("__session", result?.data?.token);

        if (result?.data?.token) {
          return {
            pass: true,
          };
        }
      // } catch (err) {
      //   console.log(err);
      // }
    } else {
      return {
        message: "los datos suministrados son invalidos",
      };
    }
  };

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  return {
    signIn,
    signOut,
    isSignedIn,
    getAuthHeaders,
  };
}
