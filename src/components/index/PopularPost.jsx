import React from "react"
import PropTypes from "prop-types"
import Card from "../card/Card"
import BasicCard from "../card/BasicCard"

const PopularPost = ({ popularPosts }) => {
  return popularPosts.map((post, idx) => {
    if (idx === 0) {
      return (
        <div key={post.id} className="sm:col-span-2 lg:col-span-3">
          <Card data={post} lgGrid={true} />
        </div>
      )
    }
    return (
      <div key={post.id} className="border-t border-t-gray-500 pt-9">
        <BasicCard data={post} />
      </div>
    )
  })
}

PopularPost.propTypes = {
  popularPosts: PropTypes.array,
}

export default PopularPost
