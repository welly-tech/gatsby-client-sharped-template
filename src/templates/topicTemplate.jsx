import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { useMetadata } from "../data/use-metadata"
import Breadcrumb from "../components/breadcrumb"
import Layout from "../components/layout"
import PopularPost from "../components/topic/PopularPost"
import LatestPost from "../components/topic/LatestPost"
import HeaderImage from "../components/topic/HeaderImage"
import Excerpt from "../components/topic/Excerpt"

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
          url: canonical,
          title: topic.name,
          description: topic.excerpt.excerpt,
          images: [{ url: `https:${topic.image.file.url}` }],
        }}
      />

      <div className="wrapper">
        <div className="my-6 sm:my-8">
          <Breadcrumb crumbs={crumbs} />
        </div>
      </div>

      {/* 首圖 */}
      <HeaderImage topic={topic} />

      {/* Body */}
      <div className="wrapper space-y-24 sm:space-y-36 pb-24 sm:pb-36 border-b border-gray-900">
        {/* 簡述 */}
        <Excerpt topic={topic} />

        {/* 熱門文章 */}
        <PopularPost popularPosts={popularPosts} />

        {/* 最新文章 */}
        <LatestPost topic={topic} />
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
