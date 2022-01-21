import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { useMetadata } from "../data/use-metadata"
import { Breadcrumb } from "../components/breadcrumb"
import { Card } from "../components/card"
import { Text } from "../ui"
import Layout from "../components/layout"

const TopicPage = ({ data }) => {
  const { contentfulTopic: topic } = data
  const {
    popularPosts: { nodes: popularPosts },
  } = data

  const { siteUrl } = useMetadata()
  const canonical = `${siteUrl}/${topic.slug}`
  const crumbs = [
    {
      name: "首頁",
      url: "/",
    },
    {
      name: `${topic.name}`,
      url: `/${topic.slug}`,
    },
  ]

  return (
    <Layout>
      <GatsbySeo
        title={topic.name}
        description={topic.excerpt.excerpt}
        canonical={canonical}
        openGraph={{
          url: `${canonical}`,
          title: `${topic.name}`,
          description: `${topic.excerpt.excerpt}`,
          images: [{ url: `https:${topic.image.file.url}` }],
        }}
      />

      <div className="wrapper">
        <div className="my-6 sm:my-8">
          <Breadcrumb crumbs={crumbs} />
        </div>
      </div>

      {/* 首圖 */}
      <div
        className="h-40 sm:h-96 bg-no-repeat bg-right"
        style={{
          backgroundImage: `url(https:${topic.image.file.url})`,
          backgroundSize: "80%",
        }}
      >
        <h1
          className="flex items-center h-full wrapper heading text-5xl lg:text-8xl shadowed-logo"
          style={{ color: "white" }}
        >
          {topic.name}
        </h1>
      </div>

      {/* Body */}
      <div className="wrapper space-y-24 sm:space-y-36 pb-24 sm:pb-36 border-b border-gray-900">
        {/* 簡述 */}
        <div className="max-w-5xl mx-auto mt-16">
          <p className="border-line text-gray-900 text-xl leading-loose tracking-wide">
            {topic.excerpt.excerpt}
          </p>
        </div>

        {/* 熱門文章 */}
        {popularPosts.length > 0 && (
          <div className="space-y-12 sm:space-y-16">
            <Text as="h2" text="熱門文章" className="text-center" />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
              {popularPosts.map((post, idx) => {
                return (
                  <div
                    key={post.id}
                    className={`p-6 border border-gray-300 ${
                      idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <Card data={post} lgFlex={true} fixedWidth={true} />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 最新文章 */}
        {topic?.latestPosts && (
          <div className="space-y-12 sm:space-y-16">
            <Text as="h2" text="最新文章" className="text-center" />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {topic?.latestPosts?.map(post => {
                return (
                  <div
                    key={post.id}
                    className="p-6 border border-gray-300 transition ease-in-out duration-500 hover:border-b hover:border-l hover:border-l-gray-900 hover:border-b-gray-900"
                  >
                    <Card data={post} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

TopicPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TopicPage

export const pageQuery = graphql`
  query Topic($slug: String!) {
    contentfulTopic(slug: { eq: $slug }) {
      slug
      name
      excerpt {
        excerpt
      }
      image {
        file {
          url
        }
      }
      latestPosts: post {
        id
        slug
        name
        updatedAt(formatString: "YYYY-MM-DD")
        excerpt {
          excerpt
        }

        image {
          gatsbyImageData(
            width: 768
            height: 512
            placeholder: BLURRED
            quality: 100
          )
        }
        topic {
          name
          slug
        }
      }
    }

    popularPosts: allContentfulPost(
      filter: { topic: { slug: { eq: $slug } }, isPopularPost: { eq: true } }
      sort: { order: DESC, fields: updatedAt }
      limit: 3
    ) {
      nodes {
        id
        slug
        name
        updatedAt(formatString: "YYYY-MM-DD")
        excerpt {
          excerpt
        }
        image {
          gatsbyImageData(
            width: 768
            height: 512
            placeholder: BLURRED
            quality: 100
          )
        }
        topic {
          name
          slug
        }
      }
    }
  }
`
