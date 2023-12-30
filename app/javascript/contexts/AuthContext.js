import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    signedIn: false,
    user: null
  });

  const checkAuthStatus = async () => {
    fetch('/auth/check')
    .then(response => response.json())
    .then(data => setAuthState({ signedIn: data.signed_in, user: data.user }))
    .catch(error => console.error('Error:', error));
  }   

  useEffect(() => {
    // Fetch the authentication state from Rails on component mount
    checkAuthStatus()
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
