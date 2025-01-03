import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-blue-900 hover:text-blue-900'
  };
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}