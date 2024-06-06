'use client'
import React from 'react'

const Button = ({ children, onClick, variant }) => {
  const baseClasses = 'py-2 px-4 rounded transition duration-300'
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-700',
    secondary: 'bg-gray-500 text-white hover:bg-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-700'
  }

  if (!variant) { variant = 'primary' }
  if (!onClick) { onClick = () => {} }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary}`}
    >
      {children}
    </button>
  )
}

export default Button
