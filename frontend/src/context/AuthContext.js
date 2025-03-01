import React, { useState } from 'react';

export const AuthContext = React.createContext();

const localUser = JSON.parse(localStorage.getItem('user'))

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localUser || null);

  const auth = (userData) => {
    console.log('SETTING USER', userData);
    const user = { id: userData._id, email: userData.email, avatar:userData.avatar, ...userData.profile };
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const signOut = () => {
    console.log('here')
    localStorage.removeItem('user');
    setCurrentUser({});
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ currentUser, auth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
