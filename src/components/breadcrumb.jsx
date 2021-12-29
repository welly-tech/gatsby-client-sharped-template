import React from "react"
import PropTypes from "prop-types"
import { BreadcrumbJsonLd } from "gatsby-plugin-next-seo"
import { ChevronRightIcon } from "@heroicons/react/outline"
import { useSetting } from "../data/use-setting"
import Link from "./link"

export function Breadcrumb({ crumbs }) {
  const { mainUrl } = useSetting()
  const jsonLdData = []

  let index = 0
  crumbs.map(crumb => {
    index += 1
    const url = index === 1 ? "" : crumb.url
    jsonLdData.push({
      position: index,
      name: crumb.name,
      item: `${mainUrl}${url}`,
    })
  })

  return (
    <>
      <BreadcrumbJsonLd itemListElements={jsonLdData} />
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center">
          {crumbs.map((crumb, idx) => (
            <li key={`breadcrumb-${idx}`}>
              <div className="flex items-center">
                <Link
                  to={crumb.url}
                  activeClassName="text-gray-600"
                  className={`text-gray-500 hover:text-gray-900 ${
                    idx === crumbs.length - 1
                      ? "max-w-36 line-clamp-1 sm:max-w-full"
                      : "whitespace-nowrap"
                  }`}
                >
                  {crumb.name}
                </Link>
                <div
                  className={`text-gray-500 flex-shrink-0 mx-2 ${
                    idx === crumbs.length - 1 ? "hidden" : "block"
                  }`}
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.object).isRequired,
}
