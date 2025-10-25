import React, { useContext } from 'react'
import Register from "./components/Register"
import { Toaster } from "react-hot-toast";
import Login from './components/Login';
import { RouterProvider } from 'react-router-dom';
import route from './route';
import MouseTrail from './mousetrial/MouseTrail';
import { GlobalContext } from './context/Context';
import Stars from './mousetrial/Stars';

const App = () => {
  const { trailEffectOn, effectType } = useContext(GlobalContext);
  return (
    <>     
       {trailEffectOn && effectType === 'mouseTrail' && <MouseTrail />}
       {trailEffectOn && effectType === 'stars' && <Stars />}
       <RouterProvider router={route}></RouterProvider>
       <Toaster ></Toaster>
    </>
  )
}

export default App