import React from "react"
import PropTypes from "prop-types"
import { BreadcrumbJsonLd } from "gatsby-plugin-next-seo"
import { ChevronRightIcon } from "@heroicons/react/outline"
import { useSetting } from "../data/use-setting"
import Link from "./link"

const CrumbItem = ({ url, name, lastItem }) => (
  <li>
    <div className="flex items-center">
      <Link
        to={url}
        activeClassName="text-gray-600"
        className={`text-gray-500 hover:text-gray-900 ${
          lastItem ? "max-w-36 line-clamp-1 sm:max-w-full" : "whitespace-nowrap"
        }`}
      >
        {name}
      </Link>
      <div
        className={`text-gray-500 flex-shrink-0 mx-2 ${
          lastItem ? "hidden" : "block"
        }`}
      >
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  </li>
)

const Breadcrumb = ({ crumbs }) => {
  const { mainUrl } = useSetting()
  const jsonLdData = []

  crumbs.forEach((crumb, idx) => {
    const url = idx === 0 ? "" : crumb.url
    jsonLdData.push({
      position: idx,
      name: crumb.name,
      item: `${mainUrl}${url}`,
    })
  })

  const crumbItems = crumbs.map(({ url, name }, idx) => {
    const lastItem = idx === crumbs.length - 1

    return <CrumbItem key={url} url={url} name={name} lastItem={lastItem} />
  })

  return (
    <>
      <BreadcrumbJsonLd itemListElements={jsonLdData} />
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center">
          {crumbItems}
        </ol>
      </nav>
    </>
  )
}

CrumbItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  lastItem: PropTypes.bool,
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Breadcrumb
