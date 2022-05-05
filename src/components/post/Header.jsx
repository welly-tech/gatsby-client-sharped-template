import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"
import Excerpt from "./Excerpt"

const Header = ({ post }) => {
  const {
    author: {
      image: {
        gatsbyImageData,
        file: { url },
      },
    },
    image: { gatsbyImageData: image },
    name,
    updatedAt,
    createdAt,
  } = post

  return (
    <div className="lg:relative">
      <div className="relative lg:static lg:container lg:mx-auto lg:px-8">
        {/* Post Image + Post Heading */}
        <div className="grid grid-cols-6 relative overflow-hidden lg:static lg:container lg:mx-auto lg:pl-0">
          <div className="bg-white col-start-2 lg:col-start-1 col-span-5 px-6 pb-6 sm:px-12 sm:pb-12 mb-24 sm:mb-36 lg:mb-0 z-10">
            <h1 className="text-gray-900 text-3xl sm:text-6xl font-bold tracking-wide !leading-normal">
              {name}
            </h1>
          </div>
          <div className="block absolute left-0 h-full sm:hidden">
            <GatsbyImage
              alt={name}
              image={image}
              loading="eager"
              className="h-full sm:hidden"
              imgStyle={{ objectFit: "cover" }}
            />
          </div>
          <div className="hidden sm:block absolute left-0 h-full lg:w-1/2">
            <GatsbyImage
              alt={name}
              image={image}
              className="hidden sm:block w-full h-full"
              imgStyle={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Post Excerpt */}
        <div className="divide-y divide-gray-900 text-gray-900 container mx-auto px-6 mt-6 sm:px-8 lg:w-1/2 lg:pr-0 lg:pl-8 lg:mt-0 lg:ml-[50%]">
          <div className="mb-6">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-[2.75rem] h-[2.75rem]">
                  {gatsbyImageData ? (
                    <GatsbyImage
                      alt={name}
                      image={gatsbyImageData}
                      className="rounded-full"
                    />
                  ) : (
                    <img
                      src={url}
                      loading="lazy"
                      className="rounded-full"
                      height={44}
                      width={44}
                    />
                  )}
                </div>
                <p className="text-gray-900 text-lg font-bold">{name}</p>
              </div>
              <div>
                {updatedAt === createdAt ? (
                  <p className="font-bold">{createdAt}發佈</p>
                ) : (
                  <div>
                    <p className="font-bold">{updatedAt}更新</p>
                    <p className="text-gray-500 text-xs text-right">
                      {createdAt}發佈
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Excerpt post={post} />
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  post: PropTypes.object,
}

export default Header
