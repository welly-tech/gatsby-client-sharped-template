import React from "react"
import PropTypes from "prop-types"

const Excerpt = ({ topic }) => {
  const {
    excerpt: { excerpt },
  } = topic
  return (
    <div className="max-w-5xl mx-auto mt-16">
      <p className="border-line text-gray-900 text-xl leading-loose tracking-wide">
        {excerpt}
      </p>
    </div>
  )
}

Excerpt.propTypes = {
  topic: PropTypes.object,
}

export default Excerpt
