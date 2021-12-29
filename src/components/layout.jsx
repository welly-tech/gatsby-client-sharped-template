import React from "react"
import PropTypes from "prop-types"
import SEO from "./seo"
import Navbar from "./navbar"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="mt-16 grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
