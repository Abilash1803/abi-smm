import { useTheme } from '../../context/ThemeContext'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) {
  const { isDark } = useTheme()
  
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 ease-in-out inline-flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-lg hover:shadow-primary-500/30 hover:scale-105 active:scale-95',
    secondary: isDark 
      ? 'bg-gray-800 text-primary-400 border-2 border-primary-500 hover:bg-gray-700' 
      : 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
    outline: isDark
      ? 'border-2 border-gray-600 text-gray-200 hover:border-primary-500 hover:text-primary-400'
      : 'border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600',
    ghost: isDark
      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
