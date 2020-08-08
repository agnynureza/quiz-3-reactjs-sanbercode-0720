import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = props => {
  const [status, setStatus] = useState(false)
  
  return (
    <LoginContext.Provider value={[status, setStatus]}>
      {props.children}
    </LoginContext.Provider>
  );
};