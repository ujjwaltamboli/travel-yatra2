
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";
import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { LuBadgePercent } from "react-icons/lu";
import PackageCard from "./PackageCard";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";


const Home = () => {
  const [topPackages, setTopPackages] = useState([]);
  const [latestPackages, setLatestPackages] = useState([]);
  const [offerPackages, setOfferPackages] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const getTopPackages = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}api/package?Description=topPackages`)
    const data = await res.json()
    console.log(data);
    setTopPackages(data);
    return data;
  }

  const getLatestPackages = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}api/package?sort=createdAt&&limit=5`)
    const data = await res.json()
    setLatestPackages(data)
    return data;
  }

  const getOfferPackages = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_URL}api/package?sort=createdAt&&offer=true&&limit=5`
    );
    const data = await res.json();
    setOfferPackages(data);

  }

  useEffect(() => {
    getTopPackages();
    getLatestPackages();
    getOfferPackages();
  }, [])


  return (
    <div className='relative'>
      <div className="backaground_image w-full"></div>
      <div className='absolute top-1 w-[100%] text-white flex flex-col justify-center items-center m-12 gap-9'>
        <div className='flex flex-col justify-center items-center gap-2 '>
          <h1 className="text-4xl font-bold underline">The Travel Index [0]</h1>
          <p className="text-xl">Make your Travel Dream come true with our amazing packages</p>
        </div>
        <div className='flex gap-2 w-[45%]'>
          <input type="text" onClick={() => { navigate(`/packages`) }} className="bg-opacity-40 bg-white placeholder:text-white p-2 border border-black w-[100%] rounded-md" placeholder="search" />
          <button className='rounded-full bg-white w-10 h-10 text-black font-bold text-2xl'>Go</button>
        </div>

        <div className="w-[90%] max-w-xl flex justify-center mt-10">
          <button
            onClick={() => {
              navigate("/packages?offer=true");
            }}
            className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-e border-white rounded-s-full flex-1 hover:scale-105 transition-all duration-150"
          >
            Best Offers
            <LuBadgePercent className="text-2xl" />
          </button>
          <button
            onClick={() => {
              navigate("/packages?sort=packageRating");
            }}
            className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:scale-105 transition-all duration-150"
          >
            Top Rated
            <FaStar className="text-2xl" />
          </button>
          <button
            onClick={() => {
              navigate("/packages?sort=Latest");
            }}
            className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-s border-white rounded-e-full flex-1 hover:scale-105 transition-all duration-150"
          >
            Latest
            <FaRankingStar className="text-2xl" />
          </button>
        </div>
      </div>
      

      

      {loading &&
        <h1 className="font-bold">Loading...</h1>
      }

      {!loading && (
        <>
          <h2 className="text-2xl font-bold" >Top Packages</h2>
          <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
            {topPackages.map((packageData, i) => {
              return <PackageCard key={i} Data={packageData} />;
            })}
          </div>
        </>
      )}

      {!loading && (
        <>
          <h3 className="text-2xl font-bold">Latest Packages</h3>
          <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
            {latestPackages.map((packageData, i) => {
              return <PackageCard key={i} Data={packageData} />;
            })}
          </div>
        </>
      )}


      {!loading && (
        <>
          <h3 className="text-2xl font-bold">Best Packages</h3>
          <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
            {offerPackages.map((packageData, i) => {
              return <PackageCard key={i} Data={packageData} />;
            })}
          </div>
        </>
      )
      }
      

    </div>
  )
}

export default Home
