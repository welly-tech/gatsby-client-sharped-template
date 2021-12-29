import React from "react"
import PropTypes from "prop-types"

export function Text({ as = "leading", className, text }) {
  switch (as) {
    case "h2":
      return (
        <h2 className={`heading text-4xl sm:text-5xl ${className}`}>{text}</h2>
      )
    default:
      return (
        <p
          className={`leading-tight font-black mx-auto max-w-max text-3xl ${className}`}
        >
          {text}
        </p>
      )
  }
}

Text.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
}
