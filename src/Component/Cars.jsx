import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cars({
  year = 2022,
  make = "Tata",
  model = "Harrier",
  variant = "XT PLUS 2.0L KRYOTEC",
  mileage = 27990,
  fuelType = "Diesel",
  ownership = "1st owner",
  price = 1552000,
  originalPrice = 1730000,
  emi = 29541,
  testDriveLocation = "M3M Urbana, Golf Course"
}) {
  const [click, setClick] = useState(true);

  return (
    <div className="w-[300px] h-[420px] bg-white rounded-lg shadow-md overflow-hidden m-3">
      <div className="relative">
        <img
          src="/src/assets/tata.jpg"
          alt={`${make} ${model}`}
          className="w-full h-[200px] object-cover"
        />
        <div onClick={() => setClick((prev) => !prev)}>
          {click ? (
            <FaRegHeart className="w-8 h-8 bg-transparent absolute top-2 right-2 p-1 rounded-full shadow-md" />
          ) : (
            <FaHeart className="w-8 h-8 bg-transparent absolute top-2 right-2 p-1 rounded-full shadow-md text-red-500" />
          )}
        </div>
      </div>

      <Link to="/cardetails" className="no-underline">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {year} {make} {model}
          </h2>
          <p className="text-sm text-gray-600">{variant}</p>
          <div className="mt-2 flex space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {mileage} km
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {fuelType}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {ownership}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              EMI from ₹{emi.toLocaleString()}/m
            </p>
            <div className="flex items-baseline mt-1">
              <span className="text-2xl font-bold text-gray-900">
                ₹{(price / 100000).toFixed(2)}L
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{(originalPrice / 100000).toFixed(2)}L
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Cars;