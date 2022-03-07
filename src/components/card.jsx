import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import { Button } from "./button"
import { ArrowRightIcon } from "@heroicons/react/outline"
import Link from "./link"

export function Card({
  data,
  lgFlex = false,
  lgGrid = false,
  fixedWidth = false,
}) {
  return (
    <div
      className={`text-gray-700 space-y-6 ${
        lgFlex ? "lg:flex lg:justify-center lg:space-y-0 lg:space-x-12" : ""
      } ${lgGrid ? "lg:grid grid-cols-2 lg:space-y-0 lg:gap-12" : ""}`}
    >
      <Link to={`/${data.topic.slug}/${data.slug}`}>
        <div className="aspect-video">
          <GatsbyImage
            alt={data.name}
            image={data.image.gatsbyImageData}
            className={`w-full h-full rounded-lg ${
              fixedWidth ? "lg:w-96" : "w-full"
            }`}
          />
        </div>
      </Link>
      {/* Body */}
      <div className="space-y-4">
        <div className="flex space-x-6 text-lg">
          <Link
            to={`/${data.topic.slug}`}
            className="font-bold text-primary-500 hover:text-primary-700"
          >
            {data.topic.name}
          </Link>
          <p className="text-gray-500">{data.updatedAt}</p>
        </div>
        <div>
          <Link to={`/${data.topic.slug}/${data.slug}`} className="space-y-4">
            <p
              className={`${
                lgGrid ? "text-3xl sm:text-5xl" : "text-3xl"
              } tracking-wide !leading-normal font-bold`}
            >
              {data.name}
            </p>
            <p className="text-lg line-clamp-3">{data?.excerpt.excerpt}</p>
          </Link>
        </div>
        <div>
          <Link to={`/${data.topic.slug}/${data.slug}`}>
            <Button
              type="ghost"
              size="none"
              icon={<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />}
            >
              <p className="underline underline-offset-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-300">
                繼續閱讀
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function BasicCard({ data }) {
  return (
    <div className="text-gray-700 space-y-4">
      <div className="flex space-x-6 text-lg">
        <Link
          to={`/${data.topic.slug}`}
          className="font-bold text-primary-500 hover:text-primary-700"
        >
          {data.topic.name}
        </Link>
        <p className="text-gray-500">{data.updatedAt}</p>
      </div>
      <div className="space-y-4 group">
        <div className="divide-y divide-gray-500">
          <Link to={`/${data.topic.slug}/${data.slug}`}>
            <p className="text-3xl tracking-wide !leading-normal font-bold group-hover:underline underline-offset-4 decoration-gray-500">
              {data.name}
            </p>
            <p className="text-lg line-clamp-3 pt-4">{data?.excerpt.excerpt}</p>
          </Link>
        </div>
        <div>
          <Link to={`/${data.topic.slug}/${data.slug}`}>
            <Button
              type="ghost"
              size="none"
              icon={<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />}
            >
              <p className="underline underline-offset-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-300">
                繼續閱讀
              </p>
            </Button>
          </Link>
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

BasicCard.propTypes = {
  data: PropTypes.object.isRequired,
}
