import React from "react"
import PropTypes from "prop-types"
import Link from "../link"
import ContinueReading from "./ContinueReading"
import CategoryAndUpdateTime from "./CategoryAndUpdateTime"

const BasicCard = ({ data }) => {
  const {
    topic: { slug: topicSlug, name: topicName },
    excerpt: { excerpt },
    name,
    slug,
    updatedAt,
  } = data

  return (
    <div className="text-gray-700 space-y-4">
      <CategoryAndUpdateTime
        topicSlug={topicSlug}
        topicName={topicName}
        updatedAt={updatedAt}
      />
      <div className="space-y-4 group">
        <div className="divide-y divide-gray-500">
          <Link to={`/${topicSlug}/${slug}`}>
            <p className="text-3xl tracking-wide !leading-normal font-bold group-hover:underline underline-offset-4 decoration-gray-500">
              {name}
            </p>
            <p className="text-lg line-clamp-3 pt-4">{excerpt}</p>
          </Link>
        </div>
        <ContinueReading topicSlug={topicSlug} slug={slug} />
      </div>
    </div>
  )
}

BasicCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BasicCard
