import { graphql, useStaticQuery } from "gatsby"

export const useSetting = () => {
  const { contentfulSetting } = useStaticQuery(
    graphql`
      query Setting {
        contentfulSetting {
          mainUrl
          siteName
          title
          titleTemplate
          description
          publisher
          copyRight
          cta {
            title
            link
          }
          ogImage {
            file {
              url
            }
          }
          logo {
            file {
              url
            }
            gatsbyImageData(quality: 100, placeholder: BLURRED, height: 36)
          }
          footerImage {
            gatsbyImageData(quality: 100, placeholder: BLURRED, height: 128)
          }
          # 後台有預留facebookAppId欄位
        }
      }
    `
  )
  return contentfulSetting
}
