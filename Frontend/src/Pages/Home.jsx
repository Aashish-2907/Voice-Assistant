import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


function Home() {
  const {userData,serverUrl,setUserData,getGeminiResponse
}=useContext(userDataContext);
  const navigate=useNavigate();

  const handleLogOut =async()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/auth/logout`,
        {withCredentials:true})
        setUserData(null);
        navigate("/signin");
    } catch (error) {
      setUserData(null);
       console.log(error)
    }
  }

  // useEffect(()=>{
  //   const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
  //   const recognition=new SpeechRecognition()
  //   recognition.continuous=true,
  //   recognition.lang='en-US'

  //   recognition.onresult=async(e)=>{ 
  //     const transcript=e.results[e.results.length-1][0].transcript.trim();
  //     console.log(transcript)

  //     if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
  //       const data=await getGeminiResponse(transcript)
  //       console.log(data);
  //     }
  //   }
  //   recognition.start()


  // },[])

  useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("SpeechRecognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";

  recognition.onresult = async (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    console.log("Heard:", transcript);

    // ✅ check if userData is available
    if (userData?.assistantName && transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
      const data = await getGeminiResponse(transcript);
      console.log("Gemini Response:", data);
    }
  };

  // ✅ ask for mic permission first
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => {
      recognition.start();
      console.log("Listening...");
    })
    .catch((err) => {
      console.error("Mic permission denied:", err);
    });

  return () => {
    recognition.stop();
  };
}, [userData, getGeminiResponse]);





  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from from-[black] to-[#02023d] flex
    justify-center items-center flex-col relative gap-[15px]'>
      <button className="absolute top-5 right-5 w-[160px] h-[60px] bg-white text-black rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
      onClick={()=>handleLogOut()}>
      Log Out
      </button>
      <button className="absolute top-[100px] right-5 w-[200px] h-[60px] px-[20px] py-[10px] bg-white text-black rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 hover:text-white  transition-all duration-300 cursor-pointer flex items-center justify-center"
      onClick={()=>navigate("/customize")}>
      Customize Your Assistant
      </button>
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
          <img src={userData?.assistantImage} alt=""  className='h-full object-cover'/>
      </div>
      <h1 className='text-white text-[18px] font-semibold'>I'm {userData?.assistantName}</h1>
    </div>
  )
}

export default Home