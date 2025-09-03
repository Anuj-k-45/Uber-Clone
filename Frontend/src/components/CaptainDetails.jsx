import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/captainContext';

const CaptainDetails = () => {

  
   const {captain} = useContext(CaptainDataContext)


  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname} {captain.fullname.lastname}</h4>
        </div>
        <div className='text-right mr-1'>
          <h4 className="text-lg font-semibold">₹295.20</h4>
          <p className="text-sm text-gray-600 ">Earned</p>
        </div>
      </div>
      <div className="flex bg-gray-100 rounded-2xl items-start justify-center mt-4 py-5 px-8 mb-2 gap-5">
        <div className="text-center">
          <i className="text-2xl font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;