// Login.jsx
import React, { useContext, useState } from 'react'
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock, FaLockOpen } from "react-icons/fa";
import { validatePassword } from 'val-pass';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import service from '../services/service';
import { GlobalContext } from '../context/Context';

const Login = () => {
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        email: "",
        password: "",
    });

    const { setUserData } = useContext(GlobalContext);
    const [show, setShow] = useState(true);
    const [passerror, setPassError] = useState([]);
    const { mode } = useContext(GlobalContext);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'password') {
            if (value.trim() === "") {
                setPassError([]);
            } else {
                const result = validatePassword(value, 8).getAllValidationErrorMessage();
                setPassError(result);
            }
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleShow = () => {
        setShow(!show);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passerror.length > 0 && passerror !== "No Error Detected") {
            toast.error("Please fix password errors ❌");
            return;
        }

        try {
            let { email, password } = formdata
            let payload = { email, password }

            toast.loading("Please wait...", { id: "loading" });
            let res = await service.loginUser(payload);
            toast.dismiss("loading");

            if (res.isCredintials) {
                toast.success("user login successful");
                setUserData({
                    loggedId: res.data[0].id,
                    loggedEmail: res.data[0].email
                })
                navigate("/add-todo")
            }
            else {
                toast.error("check your login credintials");
            }
        }
        catch (err) {
            console.log("error occured", err);
            toast.error("Login failed");
        }
    };

    return (
        <div className={`min-h-screen w-full flex items-center justify-center sm:pt-10 overflow-none ${mode ? 'bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400' : 'bg-black'}`}>
            <form
                className={`flex flex-col w-11/12 max-w-sm sm:max-w-md bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-2xl gap-5 sm:gap-6 transition-all duration-300`}
                onSubmit={handleSubmit}
            >
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold text-3xl sm:text-4xl text-pink-500'>Login</h1>
                </div>

                <div className='border-2 border-gray-200 rounded-full h-[45px] sm:h-[50px] focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-200/50 flex items-center justify-center transition-all duration-300 bg-white'>
                    <input
                        type="email"
                        className='border-0 outline-0 h-full w-full px-5 rounded-full bg-transparent text-sm sm:text-base'
                        placeholder='Enter your email...'
                        name='email'
                        onChange={handleChange}
                        value={formdata.email}
                        required
                    />
                    <span className='text-xl sm:text-2xl flex items-center justify-center w-[45px] sm:w-[50px] text-green-500'><MdEmail /></span>
                </div>

                <div className='border-2 border-gray-200 rounded-full h-[45px] sm:h-[50px] focus-within:border-yellow-500 focus-within:shadow-lg focus-within:shadow-yellow-200/50 flex items-center justify-center transition-all duration-300 bg-white'>
                    <input
                        type={`${show ? "password" : "text"}`}
                        className='border-0 outline-0 h-full w-full px-5 rounded-full bg-transparent text-sm sm:text-base'
                        placeholder='Enter your password...'
                        name='password'
                        onChange={handleChange}
                        value={formdata.password}
                        required
                    />
                    <span className='text-xl sm:text-2xl flex items-center justify-center w-[45px] sm:w-[50px] cursor-pointer text-yellow-500' onClick={handleShow}>
                        {show ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {passerror.length > 0 && passerror !== "No Error Detected" && (
                    <div className='flex flex-col gap-1 text-red-600 text-xs sm:text-sm px-2'>
                        {Array.isArray(passerror)
                            ? passerror.map((err, i) => <p key={i}>• {err}</p>)
                            : <p>{passerror}</p>}
                    </div>
                )}

                <div className='rounded-full h-[45px] sm:h-[50px] flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer'>
                    <button type="submit" className='text-white font-bold text-lg sm:text-xl w-full h-full'>Submit</button>
                </div>

                <div className='flex justify-around text-sm sm:text-base'>
                    <h1 className='font-bold'>don't have account</h1>
                    <button onClick={() => navigate('/register')} className='text-cyan-500 hover:cursor-pointer font-semibold' type='button'>register</button>
                </div>
            </form>
        </div>
    )
}

export default Login;