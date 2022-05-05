import React from "react"
import PropTypes from "prop-types"
import { Text } from "../../ui"
import Card from "../card/Card"

const PopularPost = ({ popularPosts }) => {
  const popularPostItems = popularPosts.map((post, idx) => {
    return (
      <div
        key={post.id}
        className={`p-6 border border-gray-300 ${
          idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
        }`}
      >
        <Card data={post} lgFlex={true} fixedWidth={true} />
      </div>
    )
  })

  if (popularPosts.length > 0) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <Text as="h2" text="熱門文章" className="text-center" />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
          {popularPostItems}
        </div>
      </div>
    )
  }
}

PopularPost.propTypes = {
  popularPosts: PropTypes.array,
}

export default PopularPost
