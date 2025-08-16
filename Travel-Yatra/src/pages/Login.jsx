import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = () => {
  localStorage.clear();
    const [formData, setFormData] = useState({"email":"","password":""})
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit=async(e)=>{
      e.preventDefault();
      let res=await fetch(`${import.meta.env.VITE_URL}api/auth/signin`,{
        method:"POST",
        credentials: "include",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(formData)
      });
      res=await res.json();

      let token=res.token;
      if (res.success === false){
        alert("Invalid login Credential")
      }
      else{
        console.log("HEllo world");
        console.log(res.role);
        localStorage.setItem("token", res.token);
        if (res.role===0){
          window.location.href="http://localhost:5173"
        }
        else{
          window.location.href="http://localhost:5173/admin"
        }
      }
    }

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border border-black rounded-lg p-4 w-72 h-fit gap-5 sm:w-[320px] bg-white bg-opacity-60">
          <h1 className="text-3xl text-center font-semibold">Login</h1>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="p-3 rounded border border-black bg-white bg-opacity-80"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              className="p-3 rounded border border-black bg-white bg-opacity-80"
              onChange={handleChange}
            />
          </div>
          <p className="text-blue-700 text-sm hover:underline">
            <Link to={`/signup`}>Dont have an account? Signup</Link>
          </p>
          <button
            className="p-3 text-white bg-slate-700 rounded hover:opacity-95"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
