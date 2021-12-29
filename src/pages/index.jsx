import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { Card, BasicCard } from "../components/card"
import { useMetadata } from "../data/use-metadata"
import { useSetting } from "../data/use-setting"
import { useTopics } from "../data/use-topics"
import { Text } from "../ui"
import Layout from "../components/layout"
import Link from "../components/link"

const IndexPage = ({ data }) => {
  const {
    posts: { nodes: posts },
    popularPosts: { nodes: popularPosts },
  } = data
  const {
    topics: { nodes: topics },
  } = useTopics()

  const { siteUrl } = useMetadata()
  const { title, description } = useSetting()
  const canonical = `${siteUrl}`

  return (
    <Layout>
      <GatsbySeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          url: `${canonical}`,
          title: title,
          description: description,
        }}
      />
      <div className="wrapper my-6 sm:my-16">
        {/* 熱門文章 */}
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {popularPosts.map((post, idx) => {
            if (idx === 0) {
              return (
                <div key={post.id} className="sm:col-span-2 lg:col-span-3">
                  <Card data={post} lgGrid={true} />
                </div>
              )
            } else {
              return (
                <div key={post.id}>
                  <BasicCard data={post} />
                </div>
              )
            }
          })}
        </div>
        <div className="mt-24 sm:mt-36 flex flex-col-reverse gap-24 sm:gap-36 lg:gap-16 lg:grid lg:grid-cols-3">
          {/* 最新文章 */}
          <div className="lg:col-span-2">
            <Text
              as="h2"
              text="最新文章"
              className="text-center lg:text-left"
            />
            <div className="grid mt-12 sm:mt-16 gap-12 sm:gap-16 sm:grid-cols-2">
              {posts.map(post => {
                return (
                  <div
                    key={post.id}
                    className="col-span-1 p-6 border border-gray-300 transition ease-in-out duration-500 hover:border-b hover:border-l hover:border-l-gray-900 hover:border-b-gray-900"
                  >
                    <Card data={post} />
                  </div>
                )
              })}
            </div>
          </div>
          {/* 文章分類 */}
          <div className="text-center lg:text-left divide-y divide-gray-900">
            <Text as="h2" text="文章分類" className="lg:text-2xl mb-4" />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1 pt-12">
              {topics.map(topic => {
                return (
                  <Link
                    to={`/${topic.slug}`}
                    key={topic.id}
                    className="relative"
                  >
                    <p className="absolute bg-white text-gray-900 z-10 bottom-0 right-0 font-bold text-xl sm:text-2xl px-6 sm:px-8 py-3 sm:py-4">
                      {topic.name}
                    </p>
                    <div className="relative">
                      <GatsbyImage
                        alt={topic.name}
                        image={topic.image.gatsbyImageData}
                        className="h-24 sm:h-32 w-full"
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-25 hover:opacity-50 transition ease-in-out duration-300" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  {
    posts: allContentfulPost(sort: { fields: updatedAt, order: DESC }) {
      nodes {
        ...PostData
      }
    }
    popularPosts: allContentfulPost(
      filter: { isPopularPost: { eq: true } }
      sort: { fields: updatedAt, order: DESC }
      limit: 4
    ) {
      nodes {
        ...PostData
      }
    }
  }

  fragment PostData on ContentfulPost {
    id
    slug
    name
    updatedAt(formatString: "YYYY-MM-DD")
    excerpt {
      excerpt
    }
    topic {
      slug
      name
    }
    image {
      gatsbyImageData(
        width: 768
        height: 512
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`
