import React from "react";
import { Navigate, Route,Routes } from "react-router-dom";
import SignUp from "./Pages/Signup.jsx";
import SignIn from "./Pages/Signin";
import Customize from "./Pages/Customize";
import Customize2 from "./Pages/Customize2.jsx";
import { useContext } from "react";
import { userDataContext } from "./context/UserContext.jsx";
import Home from "./Pages/Home.jsx";

function App() {
  const {userData,setUserData}=useContext(userDataContext);
  return (
    <Routes>
      {/* <Route path="/" element={<h1 className="text-center text-2xl mt-20">Welcome to the Virtual Assistant</h1>} /> */}
      {/* <Route path="/" element={<SignUp/>}/> */}
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/" element={(userData?.assistImage && userData?.assistImage)?<Home/>:<Navigate to={"/customize"}/>}/> */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>    
      <Route path="/signin" element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path="/customize" element={userData?<Customize/>:<Navigate to={"/signup"}></Navigate>}/>
      <Route path="/customize2" element={userData?<Customize2/>:<Navigate to={"/signin"}></Navigate>}/> 
    </Routes>
  );
}

export default App;
