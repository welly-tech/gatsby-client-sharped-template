import { graphql, useStaticQuery } from "gatsby"

export const useMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteUrl
            language
          }
        }
      }
    `
  )
  const { siteMetadata } = site
  return siteMetadata
}
