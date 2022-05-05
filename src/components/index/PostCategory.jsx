import React from "react"
import PropTypes from "prop-types"
import Link from "../link"
import { GatsbyImage } from "gatsby-plugin-image"

const PostCategory = ({ topics }) => {
  return topics.map(({ slug, id, name, image: { gatsbyImageData } }) => {
    return (
      <Link to={`/${slug}`} key={id} className="relative">
        <p className="absolute bg-white text-gray-900 z-10 bottom-0 right-0 font-bold text-xl sm:text-2xl px-6 sm:px-8 py-3 sm:py-4">
          {name}
        </p>
        <div className="relative">
          <GatsbyImage
            alt={name}
            image={gatsbyImageData}
            className="h-24 sm:h-32 w-full"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-25 hover:opacity-50 transition ease-in-out duration-300" />
        </div>
      </Link>
    )
  })
}

PostCategory.propTypes = {
  topics: PropTypes.array,
}

export default PostCategory
