import React, { useContext } from 'react'
import { GiCrossedBones } from "react-icons/gi";
import { GlobalContext } from '../context/Context'
import { createPortal } from 'react-dom';

const Logout = ({handleNoLogout}) => {
    let {userdata, setUserData} = useContext(GlobalContext);
    // console.log(userdata.loggedEmail);

    const handleYesLogout = () =>{
        setUserData((preVal)=>({...preVal,loggedEmail:null}))  
    }

    return createPortal(
        <div className="min-h-screen bg-black/60 flex items-center justify-center p-4 fixed top-0 left-0 size-full z-50"> 
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full relative transform transition-all">
                <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-red-500 transition-all duration-300 hover:rotate-90 hover:scale-110 hover:cursor-pointer" onClick={handleNoLogout}>
                    <GiCrossedBones size={24} className="sm:size-[28px]" strokeWidth={2.5} />
                </button>

                <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg 
                            className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                            />
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Logout
                </h2>

                <p className="text-center text-gray-600 text-sm sm:text-lg mb-6 sm:mb-8">
                    Are you sure you want to logout?
                </p>
                
                <div className="flex gap-3 sm:gap-4">
                    <button 
                        className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-green-500 hover:to-green-700" 
                        onClick={()=>{
                            handleYesLogout()
                            handleNoLogout()
                        }}
                    >
                        Yes
                    </button>
                    <button 
                        className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-500 hover:to-red-700" 
                        onClick={handleNoLogout}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>, 
        document.getElementById("logout-portal")
    )
}

export default Logout;