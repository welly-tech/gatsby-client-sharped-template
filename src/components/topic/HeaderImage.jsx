import React from "react"
import PropTypes from "prop-types"

const HeaderImage = ({ topic }) => {
  const {
    name,
    image: {
      file: { url: url },
    },
  } = topic

  return (
    <div
      className="h-40 sm:h-96 bg-no-repeat bg-right"
      style={{
        backgroundImage: `url(https:${url})`,
        backgroundSize: "80%",
      }}
    >
      <h1
        className="flex items-center h-full wrapper heading text-5xl lg:text-8xl shadowed-logo"
        style={{ color: "white" }}
      >
        {name}
      </h1>
    </div>
  )
}

HeaderImage.propTypes = {
  topic: PropTypes.object.isRequired,
}

export default HeaderImage
