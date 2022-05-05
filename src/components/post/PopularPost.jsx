import React from "react"
import PropTypes from "prop-types"
import { Text } from "../../ui"
import Card from "../card/Card"

const PopularPost = ({ popularPosts }) => {
  const popularPost = popularPosts.map(post => {
    return (
      <div
        key={post.id}
        className="p-6 border border-gray-300 rounded-lg transition ease-in-out duration-500 hover:border-gray-700"
      >
        <Card data={post} />
      </div>
    )
  })

  if (popularPosts.length > 0) {
    return (
      <>
        <Text as="h2" text="熱門文章" className="text-center" />
        <div className="grid gap-12 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {popularPost}
        </div>
      </>
    )
  }
}

PopularPost.propTypes = {
  popularPosts: PropTypes.array,
}

export default PopularPost
