import React from "react"
import PropTypes from "prop-types"
import Link from "../link"

const CategoryAndUpdateTime = ({ topicSlug, topicName, updatedAt }) => {
  return (
    <div className="flex space-x-6 text-lg">
      <Link
        to={`/${topicSlug}`}
        className="font-bold text-primary-500 hover:text-primary-700"
      >
        {topicName}
      </Link>
      <p className="text-gray-500">{updatedAt}</p>
    </div>
  )
}

CategoryAndUpdateTime.propTypes = {
  topicSlug: PropTypes.string,
  topicName: PropTypes.string,
  updatedAt: PropTypes.string,
}

export default CategoryAndUpdateTime
