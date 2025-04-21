import React from 'react'
import logo_192 from "/icon-192.png"

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* <svg
        className="w-8 h-8 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg> */}
      <span className=" flex items-center text-2xl text-[#458AFF] font-open-sans font-bold">
        <img src={logo_192} alt="logo" className='w-12' />
        <h2>TrackWise</h2>
      </span>
    </div>
  )
}

export default Logo 