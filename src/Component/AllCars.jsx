import React from 'react'
import UsedCars from './UsedCars';


function AllCars() {
  return (
    <div className='flex flex-wrap items-center justify-center'>
    {
      (() => {
        const carsArray = [];
        // const items = [1, 2];
        for (let index = 0; index < 1; index++) {
         
          carsArray.push(<UsedCars key={index} />);
        }
        return carsArray;
      })()
    }
  </div>
  )
}

export default AllCars