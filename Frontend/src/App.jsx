import React from "react";
import { Route,Routes } from "react-router-dom";
import SignUp from "./Pages/Signup";
import SignIn from "./Pages/Signin";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<h1 className="text-center text-2xl mt-20">Welcome to the Virtual Assistant</h1>} /> */}
      <Route path="/" element={<SignUp/>}/>
      <Route path="/signup" element={<SignUp/>}/>    
      <Route path="/signin" element={<SignIn/>}/>
    </Routes>
  );
}

export default App;