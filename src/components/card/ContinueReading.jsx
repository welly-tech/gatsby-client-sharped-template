import React from "react"
import PropTypes from "prop-types"
import Link from "../link"
import { Button } from "../button"
import { ArrowRightIcon } from "@heroicons/react/outline"

const ContinueReading = ({ topicSlug, slug }) => {
  return (
    <div>
      <Link to={`/${topicSlug}/${slug}`}>
        <Button
          type="ghost"
          size="none"
          icon={<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />}
        >
          <p className="underline underline-offset-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-300">
            繼續閱讀
          </p>
        </Button>
      </Link>
    </div>
  )
}

ContinueReading.propTypes = {
  topicSlug: PropTypes.string,
  slug: PropTypes.string,
}

export default ContinueReading
