import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PackageCard from './PackageCard';
import PackageCard2 from './PackageCard2';


const Packages = () => {
  const [packages, setPackages] = useState([]);
  const location = useLocation();
  const navigate=useNavigate();
  const params = new URLSearchParams(location.search);
  const[value, setValue]=useState([]);
  const ref1 = useRef(null)
  const ref2=useRef(null)
  const ref3=useRef(null)
  const sort = params.get("sort"); // "abc"
  const offr=params.get("offer");
  const [offer, setOffer] = useState(offr=="true");

  
  const [role, setrole] = useState(0)
  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_URL}admin2`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        setrole(data.role);
        console.log(data);
        return data.role;
      } catch (err) {
        console.error("Admin access check failed:", err);
      }
    };

    checkRole();
  }, []);
  const onDelete=async(Data)=>{
    setPackages(packages.filter((pkg)=>pkg._id!=Data._id));
    await fetch(`${import.meta.env.VITE_URL}api/delete?id=${Data._id}`);
  }
  const getPackages=async()=>{
    const res=await fetch(`${import.meta.env.VITE_URL}api/package`)
    let data=await res.json();
    setPackages(data);
    setValue(data);
    return data;
  }
  useEffect(() => {
    getPackages()
    if (sort=="packageRating"){
      setTimeout(() => {
        ref2.current?.click();
      }, 1000);
    }
    if (sort=="Latest"){
      setTimeout(() => {
        ref1.current?.click();
      }, 1000);
    }
    
    }, [])
  useEffect(() => {
    if (offr === "true" && value.length > 0) {
      const sortedPackages = value.filter((tr) => tr.packageOffer === true);
      setPackages(sortedPackages);
    } else {
      setPackages(value);
    }
  }, [offr, value]);


  return (
    <div className='flex'>
      <div className='p-7 border min-h-screen'>
        <form action="" className='flex flex-col gap-8 '>
          <div>
            <label htmlFor=''>Search:</label>
            <input  placeholder='Search' type="text" onChange={(i) => {
                  // 1. Create a copy of the packages array using the spread operator
                  const sortedPackages = value.filter((tr)=>tr.packageName.toLowerCase().includes(i.target.value.toLowerCase()) || tr.packageDestination.toLowerCase().includes(i.target.value.toLowerCase()));

                  // 2. Update the state with the new, sorted array
                  setPackages(sortedPackages);
                }} className='border rounded-md h-12 p-2 outline-slate-900'/>
          </div>
          <div>
            <label htmlFor="">Type: </label>
            <input checked={offer} onChange={(e)=>{setOffer(e.target.checked);
              if (e.target.checked==true){
                // 1. Create a copy of the packages array using the spread operator
                  const sortedPackages = value.filter((tr)=>tr.packageOffer==true);

                  // 2. Update the state with the new, sorted array
                  setPackages(sortedPackages);
              }
              else{
                setPackages(value);
              }
            } } type="checkbox" />
              offer
          </div>
          <div>
            <label ref={ref1} htmlFor="">Sort: </label>
            <select id="options" className='border h-12 p-2 rounded-md bg-white' name="options">
              <option
                
                value=""
                onClick={() => {
                  // 1. Create a copy of the packages array using the spread operator
                  const sortedPackages = [...packages].sort((a, b) => b.packagePrice - a.packagePrice);

                  // 2. Update the state with the new, sorted array
                  setPackages(sortedPackages);
                }}
              >
                Price high to low
              </option>
              <option
                value=""
                onClick={() => {
                  // 1. Create a copy of the packages array using the spread operator
                  const sortedPackages = [...packages].sort((a, b) => a.packagePrice - b.packagePrice);

                  // 2. Update the state with the new, sorted array
                  setPackages(sortedPackages);
                }}
              >
                Price low to high
              </option>
              <option
                ref={ref2}
                value=""
                onClick={() => {
                  // 1. Create a copy of the packages array using the spread operator
                  const sortedPackages = [...packages].sort((a, b) => b.packageRating - a.packageRating);

                  // 2. Update the state with the new, sorted array
                  setPackages(sortedPackages);
                }}
              >
                Top Rated
              </option>
              <option
                value=""
                ref={ref1}
                onClick={() => {
                  // Create a copy of the array to avoid mutating the original state
                  const sortedPackages = [...packages].sort((a, b) => {
                    // Assuming createdAt is a date string or a number
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  });

                  setPackages(sortedPackages);
                }}
              >
                Latest
              </option>
              <option
                value=""
                onClick={() => {
                  // Create a copy of the array to avoid mutating the original state
                  const sortedPackages = [...packages].sort((a, b) => {
                    // Assuming createdAt is a date string or a number
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  });

                  setPackages(sortedPackages);
                }}
              >
                Oldest
              </option>
            </select>
          </div>
          <button className='bg-slate-700 text-white rounded-md py-2 text-xl'>Search</button>
        </form>
      </div>
      <div className='flex flex-col w-[100%] '>
        <h1 className='text-xl border w-[100%] px-5 py-3 pt-8'> Package Results: </h1>
        <div className='grid grid-cols-4'>
          {packages.map((packageData,i)=>
              {if (role==1) return <PackageCard2 key={i} Data={packageData} onDelete={onDelete}/>;
               else return <PackageCard key={i} Data={packageData} />;
              }
          )
          }
          {role == 1 && (
            <div
              className="flex items-center h-[220px] justify-center border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/admin")}
            >
              <span className="text-4xl font-bold text-gray-600">+</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Packages
