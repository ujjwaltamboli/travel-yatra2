import React from 'react'
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { FaMapMarkerAlt, FaClock, FaEdit, FaTrash } from "react-icons/fa";

const PackageCard2 = ({ Data, onDelete}) => {
  const navigate = useNavigate();
  

  return (
    <div className="relative group w-full bg-white border flex flex-col items-center p-3 rounded shadow-md overflow-hidden">
      {/* Card Image */}
      <img
        className="w-full h-[220px] rounded border hover:scale-110 transition-all duration-300"
        onClick={() => { navigate(`/packages2?id=${Data._id}`) }}
        src={`${Data.packageImages[0]}`}
      />

      {/* Hover Overlay with Edit/Delete */}
      <div className="absolute inset-0 flex justify-center items-center gap-6 
                      bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300">
        <button
          onClick={() => navigate(`/admin?id=${Data._id}`)}
          className="p-3 rounded-full bg-white/70 hover:bg-blue-500 hover:text-white shadow-lg transition"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => onDelete(Data)}
          className="p-3 rounded-full bg-white/70 hover:bg-red-500 hover:text-white shadow-lg transition"
        >
          <FaTrash size={20} />
        </button>
      </div>

      {/* Card Details */}
      <div className="w-full mt-2">
        <h1 className="text-xl">{Data.packageName}</h1>

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

export default PackageCard2;
