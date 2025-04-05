import React , { useState } from 'react'
import { Link } from "react-router-dom";


const CaptainLogin = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState('');
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        email: email,
        password: password,
      });
 
      setEmail('')
      setPassword('')
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
      <Link to= "/" ><img
        src="/captain_logo.png"
        alt="Rydo Logo"
        className="w-20 mb-5 mt-[-32px] relative z-10"
      /></Link>
      <form onSubmit= {(e) => {
        submitHandler(e);
      }}>
        <h3 className="text-lg font-medium mb-2">what's your email</h3>
        <input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-[#eeeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base"
          type="email"
          placeholder="email@example.com"
        />
        <h3 className="text-lg font-medium mb-2">Enter password</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          type="password"
          placeholder="password"
        />
        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4  w-full text-lg placeholder:text-base">
          Login
        </button>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain/signup " className=" text-blue-600 font-semibold">
           Register as a Captain
          </Link>
        </p>
      </form>
    </div>
    <div>
      <Link to="/login" className=" flex items-center justify-center bg-[#cb731e] text-white font-semibold mb-5 rounded px-4  w-full text-lg placeholder:text-base">
        Sign in as User{" "}
      </Link>
    </div>
  </div>
  )
}

export default CaptainLogin