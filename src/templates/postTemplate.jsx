import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { BlogPostJsonLd, GatsbySeo } from "gatsby-plugin-next-seo"
import Breadcrumb from "../components/breadcrumb"
import { CTA } from "../components/cta"
import Layout from "../components/layout"
import { useMetadata } from "../data/use-metadata"
import { useSetting } from "../data/use-setting"
import Header from "../components/post/Header"
import Menu from "../components/post/Menu"
import Post from "../components/post"
import Share from "../components/post/Share"
import PopularPost from "../components/post/PopularPost"
import LatestPost from "../components/post/LatestPost"

const PostTemplate = ({ data }) => {
  const {
    contentfulPost: post,
    latestPosts: { nodes: latestPosts },
  } = data

  const popularPosts = post.topic?.post.filter(popularPost => {
    if (popularPost.isPopularPost && popularPost.slug !== post.slug) {
      return popularPost
    }
  })

  const { siteUrl } = useMetadata()
  const {
    publisher,
    logo: {
      file: { url },
    },
  } = useSetting()
  const canonical = `${siteUrl}/${post.topic.slug}/${post.slug}`
  const crumbs = [
    {
      name: "首頁",
      url: "/",
    },
    {
      name: `${post.topic.name}`,
      url: `/${post.topic.slug}`,
    },
    {
      name: `${post.name}`,
      url: `/${post.topic.slug}/${post.slug}`,
    },
  ]

  const getMenuData = post => {
    let subContent = []
    const menuData = post.contents
      .map(content => {
        if (content.displayTitle) {
          subContent = []

          return {
            id: content.id,
            content: content?.title,
            subContent: subContent,
          }
        } else if (content.displayTitle === undefined) {
          subContent.push({ content: content.title, id: content.id })
        }
      })
      .filter(element => element !== undefined)

    return menuData
  }

  const menuData = getMenuData(post)

  const slug = `/${post.topic.slug}/${post.slug}#content-`

  return (
    <Layout>
      <GatsbySeo
        title={post.name}
        description={post?.excerpt?.excerpt}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title: post.name,
          description: post?.excerpt?.excerpt,
          images: [
            {
              url: `https:${post.image.file.url}`,
              alt: post.name,
            },
          ],
          type: "article",
          article: {
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            tags: [post?.tags?.map(tag => tag.name)],
          },
        }}
      />
      <BlogPostJsonLd
        url={canonical}
        title={post.name}
        images={[`https:${post.image.file.url}`]}
        datePublished={post.createdAt}
        dateModified={post.updatedAt}
        authorName={post.author.name}
        publisherName={publisher}
        publisherLogo={`https:${url}`}
        description={post?.excerpt?.excerpt}
      />
      <div className="my-6 sm:my-8 wrapper">
        <Breadcrumb crumbs={crumbs} />
      </div>

      {/* Post Header */}
      <Header post={post} />

      <div className="wrapper lg:px-0 lg:max-w-[48rem]">
        {/* PostTemplate Menu */}
        <Menu slug={slug} menuData={menuData} />

        {/* PostTemplate Content */}
        <Post post={post} />

        {/* PostTemplate CTA */}
        <CTA
          destination={post.cta.link}
          excerpt={post.cta.excerpt}
          title={post.cta.title}
        />

        {/* PostTemplate Share */}
        <Share post={post} canonical={canonical} />
      </div>

      <div className="wrapper my-24 space-y-24 sm:my-36 sm:space-y-36">
        {/* 熱門文章 */}
        <PopularPost popularPosts={popularPosts} />

        {/* 最新文章 */}
        <LatestPost latestPosts={latestPosts} />
      </div>
    </Layout>
  )
}
PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PostTemplate

export const pageQuery = graphql`
  query Post($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      slug
      name
      updatedAt(formatString: "YYYY-MM-DD")
      createdAt(formatString: "YYYY-MM-DD")
      author {
        name
        image {
          gatsbyImageData(
            placeholder: BLURRED
            quality: 100
            height: 88
            width: 88
          )
          file {
            url
          }
        }
      }
      cta {
        title
        link
        excerpt
      }
      excerpt {
        excerpt
      }
      image {
        gatsbyImageData(placeholder: BLURRED)
        file {
          url
        }
      }
      tags {
        id
        name
      }
      topic {
        name
        slug
        post {
          id
          isPopularPost
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
            gatsbyImageData(width: 768, height: 512, placeholder: BLURRED)
          }
        }
      }
      contents {
        ... on ContentfulContent {
          id
          title
          displayTitle
          content {
            content
          }
        }
        ... on ContentfulSubContent {
          id
          title
          subContent: content {
            subContent: content
          }
        }
      }
    }
    latestPosts: allContentfulPost(
      sort: { fields: updatedAt, order: DESC }
      limit: 6
    ) {
      nodes {
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
      }
    }
  }
`
