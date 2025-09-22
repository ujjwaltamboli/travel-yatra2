import React from 'react'
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";


const PackageCard = ({Data}) => {
  const navigate= useNavigate();
  return (
    <div className="w-full bg-white border flex flex-col items-center p-3 rounded shadow-md overflow-hidden">
        <img
          className="w-full h-[220px] rounded border hover:scale-110  transition-all duration-300"
          onClick={()=>{navigate(`/packages2?id=${Data._id}`)}}
          src={`${Data.packageImages[0]}`}          
        />
        <div>
          <h1 className='text-xl '>{Data.packageName}</h1>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{Data.packageDestination}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-blue-500" />
          <span>{`${Data.packageDays} Days - ${Data.packageNights} Nights`}</span>
        </div>
          <div className="flex justify-between items-center">
  <p className="flex items-center gap-2">
    <Rating
      value={Data.packageRating}
      size="medium"
      readOnly
      precision={0.1}
    />
    ({Data.packageTotalRatings})
  </p>

  {Data.packageOffer ? (
    <div className="flex flex-col items-end">
      <span className="text-red-500 line-through text-sm">
        ${Data.packagePrice}
      </span>
      <span className="text-green-600 font-bold text-lg">
        ${Data.packageDiscountPrice}
      </span>
    </div>
  ) : (
    <span className="text-lg font-semibold">${Data.packagePrice}</span>
  )}
</div>


        </div>
    </div>
  )
}

export default PackageCard
