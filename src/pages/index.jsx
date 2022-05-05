import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { useMetadata } from "../data/use-metadata"
import { useSetting } from "../data/use-setting"
import { useTopics } from "../data/use-topics"
import { Text } from "../ui"
import Layout from "../components/layout"
import PopularPost from "../components/index/PopularPost"
import LatestPost from "../components/index/LatestPost"
import PostCategory from "../components/index/PostCategory"

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
  const canonical = siteUrl

  return (
    <Layout>
      <GatsbySeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title,
          description,
        }}
      />
      <div className="wrapper my-6 sm:my-16">
        {/* 熱門文章 */}
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
          <PopularPost popularPosts={popularPosts} />
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
              <LatestPost posts={posts} />
            </div>
          </div>
          {/* 文章分類 */}
          <div className="text-center lg:text-left divide-y divide-gray-900">
            <Text as="h2" text="文章分類" className="lg:text-2xl mb-4" />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1 pt-12">
              <PostCategory topics={topics} />
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
