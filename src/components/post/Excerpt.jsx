import Link from "../link"
import React from "react"
import PropTypes from "prop-types"

const Tag = ({ name }) => {
  return <p className="leading-loose text-gray-500"># {name}</p>
}

const Excerpt = ({ post }) => {
  const {
    topic: { slug, name },
    excerpt: { excerpt },
    tags,
  } = post

  const tagItems = tags.map(({ id, name }) => {
    return <Tag key={id} name={name} />
  })

  return (
    <div className="pt-6">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-6 sm:mb-3 space-y-3 sm:space-y-0">
        <Link to={`/${slug}`} className="font-bold link-gradient text-lg">
          {name}
        </Link>
        {tags && <div className="space-x-3 flex">{tagItems}</div>}
      </div>
      <p className="text-lg !leading-loose">{excerpt}</p>
    </div>
  )
}

Tag.propTypes = {
  name: PropTypes.string,
}

Excerpt.propTypes = {
  post: PropTypes.object,
}

export default Excerpt
