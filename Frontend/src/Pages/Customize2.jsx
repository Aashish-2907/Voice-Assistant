import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext';
import { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function Customize2() {    
    const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext);
    const  [assistantName,setAssistantName]=useState(userData?.assistantName || "");
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();

    const handleUpdateAssistant=async ()=>{
        setLoading(true)
        try {
            let formData=new FormData();
            formData.append("assistantName",assistantName);
            if(backendImage){
                formData.append("assistantImage",backendImage)
            }
            else{
                formData.append("imageUrl",selectedImage)
            }
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
             }
            const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
            setLoading(false)
            console.log(result.data)
            setUserData(result.data);
            navigate("/")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from from-[black] to-[#020220] flex
    justify-center items-center flex-col p-[20px] relative'>
        <IoArrowBack className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'
      onClick={()=>navigate("/customize")}/>
        <h1 className='text-white text-[30px] text-center mb-[30px]'>Enter Your <span className='text-blue-200'>Assistant Name</span></h1>
        <input type="text" placeholder='eg. Sifra'
            className='w-full max-w-[600px] h-[60px] 
            outline-none border-2 border-white bg-transparent 
            text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' 
            required onChange={(e)=>{
                setAssistantName(e.target.value)
            }} value={assistantName}/>
            {assistantName && <button className='min-w-[300px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px] hover:cursor-pointer' 
            onClick={()=>handleUpdateAssistant()}>
                Create Your Assistant
            </button>}
    </div>
  ) 
}

export default Customize2