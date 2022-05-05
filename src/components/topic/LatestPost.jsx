import React from "react"
import PropTypes from "prop-types"
import { Text } from "../../ui"
import Card from "../card/Card"

const LatestPost = ({ topic }) => {
  const latestPostItems = topic?.latestPosts?.map(post => {
    return (
      <div
        key={post.id}
        className="p-6 border border-gray-300 rounded-lg transition ease-in-out duration-500 hover:border-gray-700"
      >
        <Card data={post} />
      </div>
    )
  })

  if (topic?.latestPosts) {
    return (
      <div className="space-y-12 sm:space-y-16">
        <Text as="h2" text="最新文章" className="text-center" />
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {latestPostItems}
        </div>
      </div>
    )
  }
}

LatestPost.propTypes = {
  topic: PropTypes.object,
}

export default LatestPost
