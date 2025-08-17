import React, { use, useContext, useState } from 'react';
import bg from '../assets/Robot.png';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { userDataContext } from '../context/userContext.jsx';
// import { set } from 'mongoose';

function SignUp() {
    const [showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState(""); 
    const [password,setPassword]=useState("");
    const {serverUrl}=useContext(userDataContext);
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false);
    const handleSignup=async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try { 
            let res=await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},
                 {headers: { "Content-Type": "application/json" }},
                {withCredentials:true});
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setLoading(false);
        }
    }
    return (
        <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})`,}}>
            <form className=' w-[90%] h-[600px] max-w-[500px]
            bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px]
             px-[20px]'onSubmit={handleSignup} >
            <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
                Register to <span className='text-blue-400'> Virtual Assistant</span>
            </h1>
            <input type="text" placeholder='Enter your Name'
            className='w-full h-[60px] 
            outline-none border-2 border-white bg-transparent 
            text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
            required onChange={(e)=>setName(e.target.value)} value={name}/>
            <input type="text" placeholder='Enter registered Email'
            className='w-full h-[60px] 
            outline-none border-2 border-white bg-transparent 
            text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            {/* <input type="text" placeholder='Enter your Password'
            className='w-full h-[60px] 
            outline-none border-2 border-white bg-transparent 
            text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'/> */}
            <div className='w-full h-[60px] border-2 border-white bg-transparent rounded-full text-[18px] relative'>
                <input type={showPassword?"text":"password"} placeholder='Enter Password' className='w-full h-full rounded-full text-white outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]'
                 required onChange={(e)=>setPassword(e.target.value)} value={password }/>
                {!showPassword && <IoIosEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>setShowPassword(true)}/>}                
                {/* {showPassword?"text":"password"} placeholder='Enter Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]'/> */}
                {showPassword && <IoIosEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>setShowPassword(false)}/>}                
            </div>
            {error.length >0 && <p className='text-red-500 text-[17px]'>*{error}</p>}
            <button className='min-w-[150px] h-[60px] bg-blue-500 text-white rounded-full text-[18px] font-semibold hover:bg-blue-600 transition-all duration-300 cursor-pointer mt-[10px]'
            disabled={loading}>
                {loading ? "Loading..." : "Sign Up" }
            </button>
            <p className='text-[white] text-[18px]'>Already have an account ? 
                <span className="text-blue-400 cursor-pointer" onClick={()=>
                    navigate('/signin')
                }>Sign In</span>
            </p>
            </form>
        </div>
    )
}

export default SignUp;