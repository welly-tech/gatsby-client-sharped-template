import React from "react"
import PropTypes from "prop-types"
import SEO from "./seo"
import Navbar from "./navbar"
import Footer from "./footer"
import Link from "./link"
import { Button } from "./button"
import { useSetting } from "../data/use-setting"

const Layout = ({ children }) => {
  const { mainUrl, cta, logo } = useSetting()
  const { title, link } = cta

  return (
    <>
      <SEO />
      <div className="flex flex-col h-screen">
        <Navbar mainUrl={mainUrl} cta={cta} logo={logo} />
        <main className="mt-16 grow">{children}</main>
        <div className="block fixed bottom-6 right-6 z-10 sm:bottom-16 sm:right-16 lg:hidden">
          <Link as="a" to={link}>
            <Button size="base" className="sm:hidden fix_button">
              {title}
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
