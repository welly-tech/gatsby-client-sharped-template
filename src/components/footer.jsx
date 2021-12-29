import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSetting } from "../data/use-setting"
import Link from "./link"

export default function Footer() {
  const { mainUrl, copyRight, footerImage } = useSetting()
  return (
    <footer className="bg-gray-100">
      <div className="wrapper py-16 flex justify-center items-center">
        {/* Logo */}
        <div className="space-y-4">
          <div className="h-32 w-full text-center">
            <a href={mainUrl}>
              <GatsbyImage
                alt="footer logo"
                image={footerImage.gatsbyImageData}
              />
            </a>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-gray-900">
              Copyright © {new Date().getFullYear()} {copyRight} All rights
              reserved.
            </p>
            <p className="text-gray-500">
              Powered by{" "}
              <Link as="a" to="https://welly.tw">
                Welly SEO
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
