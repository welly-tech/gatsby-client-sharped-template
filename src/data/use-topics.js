import { graphql, useStaticQuery } from "gatsby"

export const useTopics = () => {
  return useStaticQuery(
    graphql`
      query AllTopic {
        topics: allContentfulTopic(sort: { order: ASC, fields: order }) {
          nodes {
            id
            slug
            name
            image {
              gatsbyImageData(width: 652, height: 256, placeholder: BLURRED)
            }
          }
        }
      }
    `
  )
}
