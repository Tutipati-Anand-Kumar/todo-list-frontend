import React, { useContext } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/Context';

const Home = () => {
  const navigate = useNavigate();
  const {mode} = useContext(GlobalContext);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className={`absolute inset-0 ${mode?"bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50":"bg-black"} `}>
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(167, 139, 250, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative z-10 text-center p-4"> 
        <div className="inline-block p-4 sm:p-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-2xl transform transition-all hover:scale-105">
          <Sparkles className="text-white w-8 h-8 sm:w-12 sm:h-12" size={48} /> {/* Reduced size with w-8 h-8 */}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 animate-pulse-slow">
          Todo List Hub
        </h1>

        <p className={`text-sm sm:text-xl mb-6 sm:mb-8 ${mode?"text-gray-700":"text-white"}`}>
          Think your plans and do tasks, without skipping
        </p>

        <div className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-4 sm:flex-row justify-center">
          <button
            onClick={() => navigate('login')}
            className="bg-indigo-500 text-white font-semibold py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base rounded-lg sm:rounded-xl hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Login
          </button>
          <button
            onClick={() => navigate('register')}
            className="bg-purple-500 text-white font-semibold py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base rounded-lg sm:rounded-xl hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Register
          </button>
          <button 
            className='bg-cyan-500 text-white font-semibold py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base rounded-lg sm:rounded-xl hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md' 
            onClick={()=>{
              navigate('dashboard')
            }}>
            Dashboard
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }
      `}</style>
    </div>
  );
};

export default Home;