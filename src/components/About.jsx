import React, { useContext } from 'react';
import { Award, Briefcase, Users, Zap } from 'lucide-react';
import { GlobalContext } from '../context/Context';

export default function About() {
    const {mode} = useContext(GlobalContext); 
    return (
        <div className={`min-h-screen flex items-center justify-center p-4 pt-[80px] sm:pt-20 ${mode?"bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50":"bg-black"}`}>
            <div className="w-full max-w-lg md:max-w-5xl bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 lg:p-12 border border-white/30">     

                <header className="text-center mb-8 sm:mb-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                        About TaskMaster Pro 🚀
                    </h1>

                    <p className="text-gray-600 text-sm sm:text-lg">Your ultimate solution for effortless task management and productivity.</p>
                </header>

                <section className="mb-8 sm:mb-10 p-4 sm:p-6 bg-purple-50 rounded-xl sm:rounded-2xl border-l-4 border-purple-500 shadow-lg">

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center mb-2 sm:mb-3">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2 sm:mr-3" /> Our Mission
                    </h2>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        Our mission is simple: to transform the way individuals and teams organize their work. We believe that clarity leads to productivity. **TaskMaster Pro** provides a simple, intuitive, and powerful platform to capture ideas, manage complex projects, and keep everything neatly organized so you can focus on what truly matters—getting things done.
                    </p>
                </section>

                <section className="mb-8 sm:mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-5 sm:mb-6">
                        Why Choose Us?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        
                        {/* Feature 1 */}
                        <div className="p-4 sm:p-5 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 mb-2 sm:mb-3" />
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">High Productivity</h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Efficiently prioritize tasks with our **Priority** system (Low, Medium, High, Urgent) to tackle the most important items first.</p>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="p-4 sm:p-5 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mb-2 sm:mb-3" />
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Seamless Collaboration</h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Easily assign tasks to team members using the **Assignee** field, ensuring everyone knows their responsibilities.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-4 sm:p-5 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mb-2 sm:mb-3" />
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Flexible Organization</h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Categorize your tasks (Work, Personal, Fitness, etc.) and add custom **Tags** for quick filtering and retrieval.</p>
                        </div>
                        
                        {/* Feature 4 */}
                        <div className="p-4 sm:p-5 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                            <img src="https://cdn-icons-png.flaticon.com/512/7692/7692809.png" alt="Task Icon" className='w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3' />
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">User-Centric Design</h3>
                            <p className="text-gray-600 text-xs sm:text-sm">A clean, modern interface designed for ease of use, making task creation a pleasant experience.</p>
                        </div>
                    </div>
                </section>
                
                <footer className="text-center pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Ready to streamline your workflow?
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-700 mt-1">
                        Start adding your first task now!
                    </p>
                </footer>
                
            </div>
        </div>
    );
}