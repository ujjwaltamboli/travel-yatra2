import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';



const Packages2 = () => {
  const location=useLocation();
  const params=new URLSearchParams(location.search);
  const id=params.get("id");
  const [d, setd] = useState({})
  const getPackage = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_URL}api/package?id=${id}`);
    const data = await res.json()
    setd(data);
  }
  useEffect(() => {
    getPackage(id);
  }, [id])
  
  
  return (
    <div>
      <div className="h-[50vh] w-full">
        <img
          className="w-full h-full object-cover"
          src={(d.packageImages)?`${d.packageImages[0]}`:""}
          alt="Loading..."
        />
      </div>
      <div className='flex flex-col gap-3'>

      <h1 className='font-bold text-2xl'>{d.packageName}</h1>
      <p className='text-2xl'>{`$ ${d.packagePrice}`}</p>
      <p>{d.packageDestination}</p>
      <p>{`${d.packageDays} Days- ${d.packageNights} Nights`}</p>
      <p className=''>Immerse yourself in the heart of Amazon Rainforest, discovering exotic wildlife and vibrant ecosystem</p>
      <button className='w-52 rounded-md bg-green-700 h-10 text-white' >Book</button>

      <h2 className='text-2xl'>Accomodation:</h2>
      <p>{d.packageAccommodation}</p>
      <h3 className='text-2xl'>Activities:</h3>
      <p>{d.packageActivities}</p>
      <h4 className='text-2xl'>Meals:</h4>
      <p>{d.packageMeals}</p>
      <h5 className='text-2xl'>Transportation:</h5>
      <p>{d.packageTransportation}</p>
      </div>
    </div>
  )
}

export default Packages2
