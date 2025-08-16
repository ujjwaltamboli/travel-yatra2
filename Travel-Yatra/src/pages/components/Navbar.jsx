import React from 'react'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [drt, setdrt] = useState("Login")
  useEffect(() => {
    if (localStorage.getItem("token")){
      setdrt("logout");
    }
    else{
      setdrt("login");
    }
  }, [])
  
  return (
    <div className='flex justify-between items-center bg-slate-400 h-20 px-3'>
        <h1
          className="h-min text-4xl font-bold relative"
          style={{
            color: "transparent",
            WebkitTextStroke: "0.7px",
            WebkitTextStrokeColor: "#fff",
          }}
        >
          Come
          <span
            className="shadow-xl rounded-lg text-slate-700 text-2xl absolute left-1 top-[-10px] text-center"
            style={{
              WebkitTextStroke: "0",
            }}
          >
            Dream Tours
          </span>
        </h1>
        <div className='flex gap-2' >
            <a href="/">Home</a>
            <a href="/packages">Packages</a>
            <a href="/about">About</a>
            <a href="/Login">{drt}</a>
        </div>
      
    </div>
  )
}

export default Navbar
