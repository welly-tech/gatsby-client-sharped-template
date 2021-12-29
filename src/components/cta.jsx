import React from "react"
import PropTypes from "prop-types"
import { Button } from "./button"
import Link from "./link"

//用於文章頁下方的CTA
export function CTA({
  className,
  destination = "",
  excerpt = "",
  title = "立即諮詢",
}) {
  return (
    <div className={`mx-auto w-full py-16 ${className}`}>
      <div className="space-y-8 border-line">
        {excerpt && (
          <p className="heading text-center text-2xl sm:text-3xl !leading-loose tracking-wide font-bold">
            {excerpt}
          </p>
        )}
        <div className="flex justify-center">
          <Link as="a" to={destination}>
            <Button>{title}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

CTA.propTypes = {
  className: PropTypes.string,
  destination: PropTypes.string,
  excerpt: PropTypes.string,
  title: PropTypes.string,
}
