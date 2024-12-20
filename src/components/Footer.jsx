import clsx from 'clsx'
import React from 'react'

const Footer = () => {
  return (
    <footer
      className={clsx(
        "w-full",
        "bg-green-600",
        "flex",
        "justify-center",
        "min-h-20",
        "px-8",
        "items-center",
        "relative",
        "bottom-0",
        "mt-4"
      )}
    >
      <p className={clsx("text-white", "text-sm")}>&copy; 2024 Todos os direitos reservados.</p>
    </footer>
  )
}

export default Footer