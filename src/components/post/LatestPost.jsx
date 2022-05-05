import React from "react"
import PropTypes from "prop-types"
import { Text } from "../../ui"
import BasicCard from "../card/BasicCard"

const LatestPost = ({ latestPosts }) => {
  const latestPost = latestPosts.map(post => {
    return (
      <div key={post.id} className="border-t border-t-gray-500 pt-9">
        <BasicCard data={post} />
      </div>
    )
  })

  if (latestPosts.length > 0) {
    return (
      <>
        <Text as="h2" text="最新文章" className="text-center" />
        <div className="grid gap-12 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {latestPost}
        </div>
      </>
    )
  }
}

LatestPost.propTypes = {
  latestPosts: PropTypes.array,
}

export default LatestPost
