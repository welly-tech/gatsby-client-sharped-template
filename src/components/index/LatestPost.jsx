import React from "react"
import PropTypes from "prop-types"
import Card from "../card/Card"

const LatestPost = ({ posts }) => {
  return posts.map(post => {
    return (
      <div
        key={post.id}
        className="col-span-1 p-6 border border-gray-300 transition ease-in-out duration-500 hover:border-gray-700"
      >
        <Card data={post} />
      </div>
    )
  })
}

LatestPost.propTypes = {
  posts: PropTypes.array,
}

export default LatestPost
