import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import React from "react"
import PropTypes from "prop-types"

const MarkdownContent = ({ content }) => {
  if (content?.content?.content) {
    return (
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {content?.content?.content}
      </ReactMarkdown>
    )
  } else if (content?.subContent?.subContent) {
    return (
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {content?.subContent?.subContent}
      </ReactMarkdown>
    )
  }
}

const PrimaryContent = ({ content }) => {
  if (content.displayTitle) {
    return (
      <div id={`content-${content.id}`}>
        <h2 className="mt-12 mb-6">{content.title}</h2>
        {content?.content && <MarkdownContent content={content} />}
      </div>
    )
  }
  return null
}

const SecondaryContent = ({ content }) => {
  if (content?.subContent?.subContent) {
    return (
      <div id={`content-${content.id}`}>
        <h3 className="mt-10 mb-6">{content.title}</h3>
        <MarkdownContent content={content} />
      </div>
    )
  }
  return null
}

const Content = ({ content }) => {
  return (
    <div className="markdown">
      <PrimaryContent content={content} />
      <SecondaryContent content={content} />
    </div>
  )
}

MarkdownContent.propTypes = {
  content: PropTypes.object,
}

PrimaryContent.propTypes = {
  content: PropTypes.object,
}

SecondaryContent.propTypes = {
  content: PropTypes.object,
}

Content.propTypes = {
  content: PropTypes.object,
}

export default Content
