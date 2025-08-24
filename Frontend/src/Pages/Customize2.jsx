import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext';
import { useState } from 'react';
import axios from "axios"
function Customize2() {    
    const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext);
    const  [assistantName,setAssistantName]=useState(userData?.assistantName || "");

    const handleUpdateAssistant=async ()=>{
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
            console.log(result.data)
            setUserData(result.data);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from from-[black] to-[#020220] flex
    justify-center items-center flex-col p-[20px]'>
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