// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Context";
import service from "../services/service";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { userdata } = useContext(GlobalContext);
    const [allTodo, setAllTodo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Only run fetch if user is logged in (userdata.loggedEmail exists)
        if (userdata.loggedEmail) {
            (async () => {
                try {
                    let data = await service.getTodo(userdata.loggedEmail);
                    setAllTodo(data.data);
                } catch (error) {
                    toast.error("Failed to fetch todos");
                }
            })();
        }
    }, [userdata.loggedEmail]);

    const { mode } = useContext(GlobalContext);

    const confirmDelete = (onConfirm) => {
        toast.custom((t) => (
            // Responsive adjustments for the custom toast
            <div className="bg-white p-4 rounded-lg shadow-2xl max-w-[300px] w-full mx-auto">
                <p className="text-center font-medium">Are you sure you want to delete?</p>
                <div className="flex justify-center gap-3 mt-3">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            await onConfirm();
                        }}
                        className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition-colors"
                    >
                        OK
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 px-3 py-1 text-sm rounded hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: Infinity });
    };

    const handleDelete = async (taskId) => {
        try {
            let res = await service.deleteTodo(taskId);
            if (res.status === 200) {
                setAllTodo(prev => prev.filter(todo => todo.id !== taskId));
                toast.success("Task deleted successfully!");
            } else {
                toast.error("Failed to delete task");
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className={`min-h-screen ${mode ? 'bg-gradient-to-br from-amber-50 to-orange-100' : 'bg-black'} flex flex-col items-center p-4 sm:p-10 overflow-x-hidden pt-24 sm:pt-20`}>
            <motion.h1
                className="text-2xl sm:text-4xl font-extrabold text-orange-600 mb-6 sm:mb-10 drop-shadow-md tracking-wide text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                ✨My Todo Dashboard✨
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 w-full">
                {allTodo.length > 0 ? (
                    allTodo.map((ele, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl sm:rounded-2xl w-full max-w-sm h-auto sm:w-[350px] sm:h-[520px] flex flex-col justify-between p-4 sm:p-6 border border-orange-200 hover:scale-[1.02] sm:hover:scale-105 transform transition-transform duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div>
                                <h2 className="text-center text-xl sm:text-2xl font-bold text-orange-500 mb-3 sm:mb-4 border-b-2 border-orange-300 pb-2">
                                    Task #{index + 1}
                                </h2>
                                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-teal-500">Title:</span>
                                        <span className="text-gray-700 font-medium truncate max-w-[50%]">{ele.title}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-semibold text-violet-500">Description:</span>
                                        <div className="h-[40px] sm:h-[50px] overflow-y-auto bg-amber-50 rounded-md p-1 mt-1 text-xs sm:text-sm">
                                            <span className="text-gray-700 font-medium w-full block">
                                                {ele.description}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-pink-500">Assignee:</span>
                                        <span className="text-gray-700 font-medium">{ele.assignee}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-semibold text-red-500">Priority:</span>
                                        <span className="text-gray-700 font-medium capitalize">{ele.priority}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-semibold text-indigo-500">Category:</span>
                                        <span className="text-gray-700 font-medium">{ele.category}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-semibold text-cyan-500">Due Date:</span>
                                        <span className="text-gray-700 font-medium">{ele.dueDate}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-semibold text-yellow-500">Est. Time (hrs):</span>
                                        <span className="text-gray-700 font-medium">{ele.estimatedTime}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-semibold text-emerald-500">Tags:</span>
                                        <span className="text-gray-700 font-medium truncate max-w-[50%]">{ele.tags}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-semibold text-sky-500">Created By:</span>
                                        <span className="text-gray-700 font-medium text-xs sm:text-sm truncate max-w-[50%]">{ele.createdBy}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => {
                                        navigate("/update", { state: ele });
                                    }}
                                    className="px-4 py-2 text-sm sm:px-5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.05] transition-transform duration-300"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => {
                                        confirmDelete(() => handleDelete(ele.id));
                                    }}
                                    className="px-4 py-2 text-sm sm:px-5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-400 to-red-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.05] transition-transform duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.h2
                        className="text-red-500 font-bold text-xl sm:text-2xl text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Please add your todos first 📝
                    </motion.h2>
                )}
            </div>
        </div>
    );
};

export default Dashboard;