import React from "react"
import PropTypes from "prop-types"

export const ButtonType = {
  solid: "transition ease-in-out duration-150 rounded",
  outline:
    "text-gray-700 border border-gray-500 bg-white hover:bg-gray-900 hover:text-white active:bg-gray-800 transition ease-in-out duration-150",
  ghost:
    "text-gray-500 hover:text-gray-700 transition ease-in-out duration-300",
}

export const ButtonSize = {
  none: "",
  sm: "py-1.5 px-3 font-medium",
  base: "py-2 px-4 font-medium",
  md: "py-3 px-5 text-xl font-medium",
  lg: "py-3 px-6 text-2xl font-medium",
}

export function Button({
  children,
  className = "",
  icon,
  size = "md",
  type = "solid",
}) {
  const classNames = `${ButtonType[type]} ${ButtonSize[size]}`

  return icon ? (
    <button
      type="button"
      className={`inline-flex space-x-2 justify-center items-center text-gray-700 ${classNames} ${className}`}
    >
      {children}
      {icon}
    </button>
  ) : (
    <button
      type="button"
      className={`text-white bg-primary-700 hover:bg-primary-500 active:bg-primary-900 ${classNames} ${className}`}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.element,
}
