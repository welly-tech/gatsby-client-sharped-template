import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

export default function Link({
  as = "link",
  to: destination,
  children,
  className = "",
  activeClassName = "",
}) {
  switch (as) {
    case "a":
      return (
        <a
          href={destination}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className}`}
        >
          {children}
        </a>
      )
    default:
      return (
        <GatsbyLink
          to={destination}
          className={`${className}`}
          activeClassName={`${activeClassName}`}
        >
          {children}
        </GatsbyLink>
      )
  }
}

Link.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}
