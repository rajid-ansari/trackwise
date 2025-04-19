import React from 'react'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-md transition-colors duration-200 font-medium'
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button 