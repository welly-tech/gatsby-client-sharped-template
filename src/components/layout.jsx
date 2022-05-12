import React from "react"
import PropTypes from "prop-types"
import SEO from "./seo"
import Navbar from "./navbar"
import Footer from "./footer"
import Link from "./link"
import { Button } from "./button"
import { useSetting } from "../data/use-setting"

const Layout = ({ children }) => {
  const { cta } = useSetting()
  const { title, link } = cta

  return (
    <>
      <SEO />
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="mt-16 grow">{children}</main>
        <div className="fixed bottom-6 right-6 sm:hidden">
          <Link as="a" to={link}>
            <Button size="base" className="fix_button">
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
