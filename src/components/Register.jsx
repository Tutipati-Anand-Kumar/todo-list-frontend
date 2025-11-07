// Register.jsx
import React, { useContext, useState } from 'react'
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock, FaLockOpen } from "react-icons/fa";
import { validatePassword } from 'val-pass';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import service from '../services/service';
import { GlobalContext } from '../context/Context';

const Register = () => {
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repassword: ""
    });
    
    const [show, setShow] = useState(true);
    const [passerror, setPassError] = useState([]);
    const [passMatchError, setPassMatchError] = useState(false);
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

        if (name === "repassword") {
            if (formdata.password && value === formdata.password) {
                setPassMatchError(false);
            } else {
                setPassMatchError(true);
            }
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleShow = () => {
        setShow(!show);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formdata.password !== formdata.repassword) {
            setPassMatchError(true);
            toast.error("Passwords don't match");
            return;
        }

        if (passerror.length > 0 && passerror !== "No Error Detected") {
            toast.error("Please fix password errors");
            return;
        }

        try {
            let { name, email, password } = formdata
            let payload = { name, email, password }
            const userexit = await service.checkUserExit(email);
            if (userexit) {
                toast.error("User already exists with this email")
                return;
            }
            let res = await service.registerUser(payload);
            if (res) {
                toast.success("user registered successfully");
                navigate("/login");
            }
            else {
                toast.error("user registration failed");
            }
        } catch (error) {
            toast.error("Registration failed");
        }
    };

    return (
        <div className={`min-h-screen w-full flex items-center justify-center pt-20 sm:pt-10 ${mode ? "bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400" : "bg-black"}`}>
            <form
                className={`flex flex-col w-11/12 max-w-sm sm:max-w-md bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-2xl gap-5 sm:gap-6 transition-all duration-300`}
                onSubmit={handleSubmit}
            >

                <div className='flex justify-center items-center'>
                    <h1 className='font-bold text-3xl sm:text-4xl text-pink-500'>Register</h1>
                </div>

                <div className='border-2 border-gray-200 rounded-full h-[45px] sm:h-[50px] focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-200/50 flex items-center justify-center transition-all duration-300 bg-white'>
                    <input
                        type="text"
                        className='border-0 outline-0 h-full w-full px-5 rounded-full bg-transparent text-sm sm:text-base'
                        placeholder='Enter your full name...'
                        name='name'
                        onChange={handleChange}
                        value={formdata.name}
                        required
                    />
                    <span className='text-xl sm:text-2xl flex items-center justify-center w-[45px] sm:w-[50px] text-blue-500'><MdDriveFileRenameOutline /></span>
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

                <div className={`border-2 rounded-full h-[45px] sm:h-[50px] flex items-center justify-center transition-all duration-300 bg-white
                    ${passMatchError ? "border-red-500 shadow-lg shadow-red-200/50" : "border-gray-200"}
                    focus-within:border-pink-500 focus-within:shadow-lg focus-within:shadow-pink-200/50`}>
                    <input
                        type="password"
                        className='border-0 outline-0 h-full w-full px-5 rounded-full bg-transparent text-sm sm:text-base'
                        placeholder='Confirm your password...'
                        name="repassword"
                        onChange={handleChange}
                        value={formdata.repassword}
                        required
                    />
                    <span className='text-xl sm:text-2xl flex items-center justify-center w-[45px] sm:w-[50px]'>
                        {formdata.password && formdata.repassword && !passMatchError ? (
                            <FaLockOpen className="text-green-600" />
                        ) : (
                            <FaLock className={`${passMatchError ? "text-red-600" : "text-pink-500"}`} />
                        )}
                    </span>
                </div>
                {passMatchError && (
                    <div className="text-red-600 text-xs sm:text-sm text-center font-medium">Passwords do not match ❌</div>
                )}

                <div className='rounded-full h-[45px] sm:h-[50px] flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer'>
                    <button type="submit" className='text-white font-bold text-lg sm:text-xl w-full h-full'>Submit</button>
                </div>

                <div className='flex justify-around text-sm sm:text-base'>
                    <h1 className='font-bold'>did you have an account</h1>
                    <button className='text-cyan-500 hover:cursor-pointer font-semibold' type='button' onClick={() => navigate('/login')}>login</button>
                </div>
            </form>
        </div>
    )
}

export default Register;