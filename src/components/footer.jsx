import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSetting } from "../data/use-setting"

export default function Footer() {
  const { copyRight, footerImage } = useSetting()
  return (
    <footer className="bg-gray-100">
      <div className="wrapper py-16 flex justify-center items-center">
        {/* Logo */}
        <div className="space-y-4">
          <div className="h-32 w-full text-center">
            <GatsbyImage
              alt="footer logo"
              image={footerImage.gatsbyImageData}
            />
          </div>
          <p className="text-gray-500 text-center">
            Copyright © {new Date().getFullYear()} {copyRight} All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
