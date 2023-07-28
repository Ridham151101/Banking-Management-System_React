import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
