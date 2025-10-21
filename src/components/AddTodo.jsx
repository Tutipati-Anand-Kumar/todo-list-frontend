// AddTodo.jsx
import { useContext, useState } from 'react';
import { CheckSquare, Calendar, Clock, Tag, AlertCircle, User, FileText, Star } from 'lucide-react';
import service from '../services/service';
import toast from 'react-hot-toast';
import { GlobalContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

export default function AddTodo() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignee: '',
        priority: '',
        category: '',
        dueDate: '',
        estimatedTime: '',
        tags: ''
    });

    const { userdata } = useContext(GlobalContext);
    const { mode } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            let { title, description, assignee, priority, category, dueDate, estimatedTime, tags } = formData
            let payload = {
                title, description, assignee, priority, category, dueDate, estimatedTime, tags,
                createdBy: userdata.loggedEmail
            }
            let res = await service.addTodo(payload);
            if (res.status === 201) {
                toast.success("todo added successfully");
                setFormData({
                    title: '',
                    description: '',
                    assignee: '',
                    priority: '',
                    category: '',
                    dueDate: '',
                    estimatedTime: '',
                    tags: ''
                });
                navigate('/dashboard'); // Optional: navigate after success
            }
            else {
                toast.error("todo is not added something went wrong");
            }
        } catch (error) {
            toast.error("Add failed");
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 pt-20 ${mode ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-black"}`}>
            <div className="w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-1">
                        Create New Task
                    </h1>
                    <p className="text-gray-600 text-sm">Fill in the details to add a new task to your list</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Task Title */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Task Title</label>
                                <div className="relative">
                                    <CheckSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50"
                                        placeholder="Enter task title"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-3.5 text-pink-500 w-5 h-5" />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all duration-300 bg-white/50 resize-none h-[48px]"
                                        placeholder="Describe your task"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Assignee */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assignee</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="assignee"
                                        value={formData.assignee}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50"
                                        placeholder="Who is responsible?"
                                    />
                                </div>
                            </div>

                            {/* Priority */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
                                <div className="relative">
                                    <AlertCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300 bg-white/50 appearance-none cursor-pointer"
                                    >
                                        <option value="">Select priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {/* Category */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                                <div className="relative">
                                    <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500 w-5 h-5" />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-all duration-300 bg-white/50 appearance-none cursor-pointer"
                                    >
                                        <option value="">Select category</option>
                                        <option value="work">Work</option>
                                        <option value="personal">Personal</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="fitness">Fitness</option>
                                        <option value="learning">Learning</option>
                                    </select>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Due Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-300 bg-white/50"
                                    />
                                </div>
                            </div>

                            {/* Estimated Time */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estimated Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="estimatedTime"
                                        value={formData.estimatedTime}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white/50"
                                        placeholder="e.g., 2 hours"
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tags</label>
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-300 bg-white/50"
                                        placeholder="e.g., urgent, meeting, code"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-10 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}