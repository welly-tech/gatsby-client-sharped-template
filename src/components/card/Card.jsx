import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import Link from "../link"
import ContinueReading from "./ContinueReading"
import CategoryAndUpdateTime from "./CategoryAndUpdateTime"

const Card = ({ data, lgFlex = false, lgGrid = false, fixedWidth = false }) => {
  const {
    topic: { slug: topicSlug, name: topicName },
    image: { gatsbyImageData },
    excerpt: { excerpt },
    name,
    slug,
    updatedAt,
  } = data

  return (
    <div
      className={`text-gray-700 space-y-6 ${
        lgFlex ? "lg:flex lg:justify-center lg:space-y-0 lg:space-x-12" : ""
      } ${lgGrid ? "lg:grid grid-cols-2 lg:space-y-0 lg:gap-12" : ""}`}
    >
      <Link to={`/${topicSlug}/${slug}`}>
        <div className="aspect-video">
          <GatsbyImage
            alt={name}
            image={gatsbyImageData}
            className={`w-full h-full rounded-lg ${
              fixedWidth ? "lg:w-96" : "w-full"
            }`}
          />
        </div>
      </Link>
      {/* Body */}
      <div className="space-y-4">
        <CategoryAndUpdateTime
          topicSlug={topicSlug}
          topicName={topicName}
          updatedAt={updatedAt}
        />
        <div>
          <Link to={`/${topicSlug}/${slug}`} className="space-y-4">
            <p
              className={`tracking-wide !leading-normal font-bold ${
                lgGrid ? "text-3xl sm:text-5xl" : "text-3xl"
              }`}
            >
              {name}
            </p>
            <p className="text-lg line-clamp-3">{excerpt}</p>
          </Link>
        </div>
        <div>
          <ContinueReading topicSlug={topicSlug} slug={slug} />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  lgFlex: PropTypes.bool,
  lgGrid: PropTypes.bool,
  fixedWidth: PropTypes.bool,
}

export default Card
