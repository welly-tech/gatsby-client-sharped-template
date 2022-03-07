import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BlogPostJsonLd, GatsbySeo } from "gatsby-plugin-next-seo"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { Text } from "../ui"
import { Breadcrumb } from "../components/breadcrumb"
import { BasicCard, Card } from "../components/card"
import { CTA } from "../components/cta"
import Layout from "../components/layout"
import Link from "../components/link"
import { useMetadata } from "../data/use-metadata"
import { useSetting } from "../data/use-setting"
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share"

const Post = ({ data }) => {
  const {
    contentfulPost: post,
    latestPosts: { nodes: latestPosts },
  } = data

  const popularPosts = post.topic?.post.filter(popularPost => {
    if (popularPost.isPopularPost && popularPost.slug !== post.slug) {
      return popularPost
    }
    return
  })

  const Content = post?.contents?.map((content, idx) => {
    return (
      <div key={`content_${idx}`} className="markdown">
        {(content.displayTitle && content.content && (
          <div id={`content-${content.id}`}>
            <h2 className="mt-12 mb-6">{content.title}</h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {content.content.content}
            </ReactMarkdown>
          </div>
        )) ||
          (content.displayTitle && (
            <div id={`content-${content.id}`}>
              <h2 className="mt-12 mb-6">{content.title}</h2>
            </div>
          ))}
        {content.subContent && (
          <div id={`content-${content.id}`}>
            <h3 className="mt-10 mb-6">{content.title}</h3>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {content.subContent.subContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    )
  })
  let curSubContents = []
  let copy = []

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

  console.log(post.updatedAt, post.createdAt)

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
      <div>
        {/* Post Image + Post Heading */}
        {/*<div>*/}
        {/*  <div className="bg-white col-start-2 lg:col-start-1 col-span-5 px-6 pb-6 sm:px-12 sm:pb-12 mb-24 sm:mb-36 lg:mb-0 z-10">*/}
        {/*    <h1 className="text-gray-700 text-3xl sm:text-6xl font-bold tracking-wide !leading-normal">*/}
        {/*      {post.name}*/}
        {/*    </h1>*/}
        {/*  </div>*/}
        {/*  <div className="block absolute left-0 h-full sm:hidden">*/}
        {/*    <GatsbyImage*/}
        {/*      alt={post.name}*/}
        {/*      image={post.image.gatsbyImageData}*/}
        {/*      loading="eager"*/}
        {/*      className="h-full sm:hidden"*/}
        {/*      imgStyle={{ objectFit: "cover" }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="hidden sm:block absolute left-0 h-full lg:w-1/2">*/}
        {/*    <GatsbyImage*/}
        {/*      alt={post.name}*/}
        {/*      image={post.image.gatsbyImageData}*/}
        {/*      className="hidden sm:block w-full h-full"*/}
        {/*      imgStyle={{ objectFit: "cover" }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Post Excerpt */}
        <div className="divide-y divide-gray-300 text-gray-700 container mx-auto mt-8 sm:mt-12 lg:mt-16 px-6 sm:px-8">
          <div className="mb-6">
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px]">
                {post.author.image.gatsbyImageData ? (
                  <GatsbyImage
                    alt={post.author.name}
                    image={post.author.image.gatsbyImageData}
                    className="rounded-full"
                  />
                ) : (
                  <img
                    src={post.author.image.file.url}
                    loading="lazy"
                    className="rounded-full"
                    height={44}
                    width={44}
                    alt={post.author.name}
                  />
                )}
              </div>
              <div>
                <p className="text-gray-700 font-bold leading-loose tracking-wide">
                  {post.author.name}
                </p>
                <div className="text-gray-500">
                  {post.updatedAt === post.createdAt ? (
                    <p className="font-bold text-sm">{post.createdAt}更新</p>
                  ) : (
                    <div className="flex space-x-2 items-baseline">
                      <p className="font-bold text-sm">{post.updatedAt}更新</p>
                      <p className="text-xs">{post.createdAt}發佈</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <h1 className="text-gray-700 text-3xl sm:text-6xl font-bold tracking-wide !leading-normal">
              {post.name}
            </h1>
            <div className="mt-4 aspect-video">
              <GatsbyImage
                alt={post.name}
                image={post.image.gatsbyImageData}
                loading="eager"
                className="h-full"
                objectFit={"cover"}
              />
            </div>
            <div className="mt-6 border border-primary-500 p-6 rounded-lg">
              <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-6 sm:mb-3 space-y-3 sm:space-y-0">
                <Link
                  to={`/${post.topic.slug}`}
                  className="font-bold text-lg text-primary-500 hover:text-primary-700"
                >
                  {post.topic.name}
                </Link>
                {post?.tags && (
                  <div className="space-x-3 flex">
                    {post?.tags?.map(tag => {
                      return (
                        <p key={tag.id} className="leading-loose text-gray-500">
                          # {tag.name}
                        </p>
                      )
                    })}
                  </div>
                )}
              </div>
              <p className="text-lg !leading-loose">{post.excerpt.excerpt}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper lg:px-0 lg:max-w-[48rem]">
        {/* Post Toc */}
        <div className="mt-12 sm:mt-16">
          <div className="p-6 sm:p-12 bg-gray-100 text-gray-700">
            <h2 className="text-center leading-normal tracking-wide font-bold text-2xl text-primary-500">
              快速跳轉目錄
            </h2>
            <ol className="space-y-3 mt-8 text-lg leading-normal list-decimal list-inside">
              {post?.contents.map((content, idx) => {
                if (content.displayTitle === true) {
                  if (curSubContents.length === 0) {
                    return (
                      <li key={content.id}>
                        <AnchorLink
                          to={`/${post.topic.slug}/${post.slug}#content-${content.id}`}
                          stripHash
                        >
                          {content.title}
                        </AnchorLink>
                      </li>
                    )
                  } else {
                    // 淺拷貝
                    copy = curSubContents
                    curSubContents = []
                    return (
                      <React.Fragment key={content.id}>
                        <ol
                          className="space-y-3 list-inside ml-6"
                          style={{ listStyleType: "lower-roman" }}
                        >
                          {copy.map(data => {
                            return (
                              <li key={data.id}>
                                <AnchorLink
                                  to={`/${post.topic.slug}/${post.slug}#content-${data.id}`}
                                  stripHash
                                >
                                  {data.title}
                                </AnchorLink>
                              </li>
                            )
                          })}
                        </ol>
                        <li>
                          <AnchorLink
                            to={`/${post.topic.slug}/${post.slug}#content-${content.id}`}
                            stripHash
                          >
                            {content.title}
                          </AnchorLink>
                        </li>
                      </React.Fragment>
                    )
                  }
                } else {
                  curSubContents.push(content)

                  if (post.contents.length - 1 === idx) {
                    return (
                      <ol
                        className="space-y-3 list-inside ml-6"
                        style={{ listStyleType: "lower-roman" }}
                        key={content.id}
                      >
                        {curSubContents.map(subContent => (
                          <li key={subContent.id}>
                            <AnchorLink
                              to={`/${post.topic.slug}/${post.slug}#content-${subContent.id}`}
                              stripHash
                            >
                              {subContent.title}
                            </AnchorLink>
                          </li>
                        ))}
                      </ol>
                    )
                  }
                }
              })}
            </ol>
          </div>
        </div>

        {/* Post Content */}
        <div>{Content}</div>

        {/* Post CTA */}
        <CTA
          destination={post.cta.link}
          excerpt={post.cta.excerpt}
          title={post.cta.title}
        />

        {/* Post Share */}
        <div className="flex justify-center gap-2">
          <FacebookShareButton url={canonical} quote={post.name}>
            <FacebookIcon size={32} borderRadius={100} />
          </FacebookShareButton>
          <TelegramShareButton url={canonical} quote={post.name} ml="2">
            <TelegramIcon size={32} borderRadius={100} />
          </TelegramShareButton>
          <LineShareButton url={canonical} quote={post.name} ml="2">
            <LineIcon size={32} borderRadius={100} />
          </LineShareButton>
        </div>
      </div>

      <div className="wrapper my-24 space-y-24 sm:my-36 sm:space-y-36">
        {/* 熱門文章 */}
        {popularPosts.length > 0 && (
          <div>
            <Text as="h2" text="熱門文章" className="text-center" />
            <div className="grid gap-12 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
              {popularPosts.map(post => {
                return (
                  <div
                    key={post.id}
                    className="p-6 border border-gray-300 rounded-lg transition ease-in-out duration-500 hover:border-gray-700"
                  >
                    <Card data={post} />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 最新文章 */}
        {latestPosts.length > 0 && (
          <div>
            <Text as="h2" text="最新文章" className="text-center" />
            <div className="grid gap-12 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
              {latestPosts.map(post => {
                return (
                  <div
                    key={post.id}
                    className="border-t border-t-gray-500 pt-9"
                  >
                    <BasicCard data={post} />
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
Post.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Post

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
