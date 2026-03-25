'use client'

import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  name?: string
}

export default function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  name
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  )
}
