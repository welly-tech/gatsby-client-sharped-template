import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSetting } from "../data/use-setting"
import { Button } from "./button"
import Link from "./link"

export default function Navbar() {
  const { mainUrl, cta, logo } = useSetting()

  return (
    <nav className="fixed w-full bg-white h-16 z-20 border-b border-gray-300">
      <div className="wrapper">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href={mainUrl}>
              {logo.gatsbyImageData ? (
                <GatsbyImage image={logo?.gatsbyImageData} alt="logo" />
              ) : (
                <img src={logo.file.url} alt="logo" className="h-6 sm:h-9" />
              )}
            </a>
          </div>

          {/* CTA按鈕 */}
          <div className="flex items-center">
            <Link as="a" to={cta.link}>
              <Button size="base" className="fix_button">
                {cta.title}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
