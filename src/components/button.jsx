import React from "react"
import PropTypes from "prop-types"
import { useSetting } from "../data/use-setting"

export const ButtonType = {
  solid: "transition ease-in-out duration-150",
  outline:
    "text-gray-900 border border-gray-900 bg-white hover:bg-gray-900 hover:text-white active:bg-gray-800 transition ease-in-out duration-150",
  ghost:
    "text-gray-500 hover:text-gray-900 transition ease-in-out duration-300",
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
  const { isButtonColorBlack } = useSetting()
  const classNames = `${ButtonType[type]} ${ButtonSize[size]}`

  return icon ? (
    <button
      type="button"
      className={`inline-flex space-x-2 justify-center items-center text-gray-900 ${classNames} ${className}`}
    >
      {children}
      {icon}
    </button>
  ) : (
    <button
      type="button"
      className={`${
        isButtonColorBlack
          ? "text-gray-900 bg-primary-300 hover:bg-primary-400 active:bg-primary-500"
          : "text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-600"
      } ${classNames} ${className}`}
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
