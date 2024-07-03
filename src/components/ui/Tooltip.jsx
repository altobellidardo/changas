import React from 'react'

const Tooltip = ({ text }) => (
  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 w-40 bg-gray-700 text-white text-center rounded py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
    {text}
  </div>
)

export default Tooltip
