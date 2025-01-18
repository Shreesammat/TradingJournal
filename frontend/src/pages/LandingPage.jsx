import React from 'react'

const LandingPage = () => {
  return (
    <>
      <nav className="bg-blue-500 flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          MyLogo
        </div>
        
        {/* Buttons */}
        <div className="space-x-4">
          <button className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200">
            Login
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
            Signup
          </button>
        </div>
      </nav>
    </>
  )
}

export default LandingPage