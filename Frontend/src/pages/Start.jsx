import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-between pt-8 bg-cover bg-center bg-no-repeat w-screen h-screen"
      style={{
        backgroundImage: "url('/Rydo.png')",
        backgroundSize: "contain", // Ensures full image is visible
        backgroundPosition: "top center", // Keeps the image positioned correctly
        backgroundRepeat: "no-repeat", // Prevents repeating
      }}
    >
      {/* Logo */}
      <img
        src="/Rydo_logo.png"
        alt="Rydo Logo"
        className="w-16 ml-1 mt-[-32px] relative z-10"
      />

      {/* Content Box */}
      <div className="relative z-10 bg-white pb-7 py-4 px-4 shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-black text-white py-2 mt-4 rounded-lg hover:bg-gray-800"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
