import { useContext, useState } from 'react';
import {Link, NavLink, Outlet} from 'react-router-dom'
import { GlobalContext } from './context/Context';
import { FaSun, FaBars, FaTimes } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl"; 
import Logout from './logout/Logout';

const RootLayout = () => {
    const {mode, setMode, userdata, trailEffectOn, setTrailEffectOn, effectType, setEffectType} = useContext(GlobalContext); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEffectDropdownOpen, setIsEffectDropdownOpen] = useState(false); 

    const handleClick = () =>{
      setMode(!mode);
    }

    const toggleMenu = () => { 
        setIsMenuOpen(prev => !prev);
        setIsEffectDropdownOpen(false); 
    }
    
    const toggleTrail = () => {
        setTrailEffectOn(prev => !prev);
        setIsEffectDropdownOpen(false); 
    }

    const switchEffectType = (type) => {
        setEffectType(type);
        setTrailEffectOn(true); 
        setIsEffectDropdownOpen(false);
    }

    const [logout, setLogout] = useState(false);

    const handleYesLogout = () =>{
      setLogout(!logout);
    }

    const handleNoLogout = () =>{
      setLogout(false);
    }

  return (
    <div className='h-screen overflow-hidden'>

      <nav className="bg-gray-800 p-4 shadow-2xl h-[60px] flex items-center w-full fixed z-20 top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl hover:text-indigo-300 transition-colors">
              <img src="https://cdn-icons-png.flaticon.com/512/7692/7692809.png" alt="Todo List Hub Logo" className='h-[40px] w-[60px]' />
          </Link>

          <div className='hidden sm:flex gap-8 items-center'>
              <NavLink className={({isActive})=>isActive?"text-green-500 animate-bounce font-bold":"text-white font-bold hover:text-indigo-300 transition-colors"} to="/" >Home</NavLink>
              <NavLink className={({isActive})=>isActive?"text-green-500 animate-bounce font-bold":"text-white font-bold hover:text-indigo-300 transition-colors"} to="add-todo" >Add Todo</NavLink>
              <NavLink className={({isActive})=>isActive?"text-green-500 animate-bounce font-bold":"text-white font-bold hover:text-indigo-300 transition-colors"} to="dashboard" >Show Todo</NavLink>
              <NavLink className={({isActive})=>isActive?"text-green-500 animate-bounce font-bold":"text-white font-bold hover:text-indigo-300 transition-colors"} to="about" >About</NavLink>
              
              {userdata.loggedEmail && <button className='text-white border-2 bg-amber-300 p-1 rounded-2xl font-bold border-amber-900 w-[80px] hover:bg-amber-400 transition-colors' onClick={handleYesLogout}>Log Out</button>}
          </div>

          <div className='relative flex items-center gap-3 sm:gap-4'>
            
            <div >
                <div 
                    className={`h-[30px] w-[35px] sm:h-[40px] sm:w-[50px] rounded-full flex items-center justify-center cursor-pointer transition-colors z-30 ${trailEffectOn ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-gray-600 hover:bg-gray-700 text-gray-300'}`}
                    onClick={() => {
                        setIsEffectDropdownOpen(prev => !prev);
                        setIsMenuOpen(false); 
                    }}
                    title="Toggle Trail Effect"
                >
                    <SlEnergy size={14} className='sm:size-[18px]' />
                </div>
                
                {isEffectDropdownOpen && (
                    <div className='absolute right-[-15px] top-full mt-2 w-40 bg-gray-700 rounded-lg shadow-xl overflow-hidden z-40 border border-gray-600'>
                        <div className={`p-2 font-bold text-white bg-gray-600 text-center`}>
                             Trail Effect
                        </div>
                        <div 
                            className={`p-2 text-white cursor-pointer hover:bg-gray-600 transition-colors flex justify-between items-center`}
                            onClick={toggleTrail}
                        >
                            <span className='font-medium'>Effect {trailEffectOn ? 'Off' : 'On'}</span>
                            <span className={`w-8 h-4 rounded-full p-0.5 transition-all duration-300 ${trailEffectOn ? 'bg-green-500 justify-end' : 'bg-gray-500 justify-start'} flex`}>
                                <span className="block h-3 w-3 bg-white rounded-full shadow-md" />
                            </span>
                        </div>
                        <div 
                            className={`p-2 cursor-pointer transition-colors text-sm ${effectType === 'mouseTrail' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-200 hover:bg-gray-600'}`}
                            onClick={() => switchEffectType('mouseTrail')}
                        >
                            Bubble Trail
                        </div>
                        <div 
                            className={`p-2 cursor-pointer transition-colors text-sm ${effectType === 'flowers' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-200 hover:bg-gray-600'}`}
                            onClick={() => switchEffectType('flowers')}
                        >
                            flowers Trail
                        </div>
                    </div>
                )}
            </div>
            <div 
                className='h-[30px] w-[35px] sm:h-[40px] sm:w-[50px] rounded-full bg-pink-500 flex items-center justify-center text-amber-50 cursor-pointer hover:bg-pink-600 transition-colors' 
                onClick={handleClick}
                title="Toggle Dark/Light Mode"
            >
                {mode?<FaSun size={14} className='sm:size-[16px]' />:<FaRegMoon size={14} className='sm:size-[16px]' />}
            </div>
            <div className='flex items-center sm:hidden'>
                <button 
                    className='text-white text-2xl p-1 rounded hover:bg-gray-700 transition-colors'
                    onClick={toggleMenu}
                    title="Open Menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
            <div className='absolute top-[60px] right-0 w-[150px] sm:w-[170px] bg-gray-800 shadow-xl sm:hidden z-30 rounded-br-2xl rounded-bl-2xl overflow-hidden border-t border-gray-700'>
                
                {userdata.loggedEmail && 
                    <div className='p-2 border-b border-gray-700'>
                        <button className='block w-full text-white border-2 bg-amber-300 text-sm p-1 rounded-xl font-bold border-amber-900 hover:bg-amber-400 transition-colors' onClick={handleYesLogout}>Log Out</button>
                    </div>
                }

                <NavLink 
                    className={({isActive})=>
                        isActive
                            ? "block py-2 px-4 text-green-500 font-bold bg-gray-700 border-l-4 border-green-500 transition-colors"
                            : "block py-2 px-4 text-white font-medium hover:bg-gray-700 hover:text-indigo-300 border-l-4 border-transparent transition-colors"
                    } 
                    to="/" 
                    onClick={toggleMenu}
                >
                    ✨ Home
                </NavLink>
                <NavLink 
                    className={({isActive})=>
                        isActive
                            ? "block py-2 px-4 text-green-500 font-bold bg-gray-700 border-l-4 border-green-500 transition-colors"
                            : "block py-2 px-4 text-white font-medium hover:bg-gray-700 hover:text-indigo-300 border-l-4 border-transparent transition-colors"
                    } 
                    to="add-todo" 
                    onClick={toggleMenu}
                >
                    ➕ Add Todo
                </NavLink>
                <NavLink 
                    className={({isActive})=>
                        isActive
                            ? "block py-2 px-4 text-green-500 font-bold bg-gray-700 border-l-4 border-green-500 transition-colors"
                            : "block py-2 px-4 text-white font-medium hover:bg-gray-700 hover:text-indigo-300 border-l-4 border-transparent transition-colors"
                    } 
                    to="dashboard" 
                    onClick={toggleMenu}
                >
                    👁️ Show Todo
                </NavLink>
                <NavLink 
                    className={({isActive})=>
                        isActive
                            ? "block py-2 px-4 text-green-500 font-bold bg-gray-700 border-l-4 border-green-500 transition-colors"
                            : "block py-2 px-4 text-white font-medium hover:bg-gray-700 hover:text-indigo-300 border-l-4 border-transparent transition-colors"
                    } 
                    to="about" 
                    onClick={toggleMenu}
                >
                    ℹ️ About
                </NavLink>
            </div>
        )}
      </nav>
        {
          logout && <Logout handleNoLogout={handleNoLogout} ></Logout>
        }
      <main className="h-full overflow-y-auto"> 
        <Outlet /> 
      </main>
    </div>
  )
}

export default RootLayout