import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";
const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState('');

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
     const newUser = {
        fullName:{
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
     }

     const response = axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

     if(response.status === 201){
      const data = response.data;

      setUser(data.user)

      navigate('/home')
     }
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')

  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
      <Link to="/" ><img
        src="/Rydo_logo.png"
        alt="Rydo Logo"
        className="w-16 mb-5 mt-[-32px] relative z-10"
      /></Link>
      <form onSubmit= {(e) => {
        submitHandler(e);
      }}>
        <h3 className="text-lg font-medium mb-2">what's your name</h3>
        <div className="flex gap-4 mb-5">
        <input
          required
          className="bg-[#eeeeee]  rounded px-4 border w-1/2  text-base placeholder:text-sm"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

          <input
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          className="bg-[#eeeeee]  rounded px-4 border w-1/2  text-base placeholder:text-sm"
          type="text"
          placeholder="Last Name"
        />
        </div>
        <h3 className="text-lg font-medium mb-2">what's your email</h3>
        <input
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-[#eeeeee] mb-5 rounded px-4 border w-full text-lg placeholder:text-sm"
          type="email"
          placeholder="email@example.com"
        />
        <h3 className="text-lg font-medium mb-2">Enter password</h3>
        <input
          className="bg-[#eeeeee] mb-5 rounded px-4 border w-full text-base placeholder:text-sm"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          type="password"
          placeholder="password"
        />
        <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4  w-full text-lg placeholder:text-sm">
          Create account
        </button>
        <p className="text-center">
          Already have an account!{" "}
          <Link to="/login" className=" text-blue-600 font-semibold">
            Login Here
          </Link>
        </p>
      </form>
    </div>
    <div>
    <p className="leading-tlg text-[11px] text-gray-500 mb-5">
    This site is protected by Google reCAPTCHA, and the <span className="underline font-semibold text-gray-800" >Google Privacy Policy</span> and <span className="underline font-semibold text-gray-800">Terms of Service</span> apply.</p>
    </div>
  </div>
  )
}

export default UserSignup