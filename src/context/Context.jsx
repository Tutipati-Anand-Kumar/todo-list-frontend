import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [userdata, setUserData] = useState({
    loggedId: null,
    loggedEmail: null
  });
  const [trailEffectOn, setTrailEffectOn] = useState(false);
  const [effectType, setEffectType] = useState('mouseTrail');
  const [mode, setMode] = useState(true)

  return (
    <GlobalContext.Provider value={{ userdata, setUserData, mode, setMode, trailEffectOn, setTrailEffectOn, effectType, setEffectType}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
