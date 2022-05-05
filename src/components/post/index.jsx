import React from "react"
import Content from "./Content"

const Post = ({ post }) => {
  return post?.contents?.map((content, idx) => (
    <Content key={`content_${idx}`} content={content} className="markdown" />
  ))
}

export default Post
