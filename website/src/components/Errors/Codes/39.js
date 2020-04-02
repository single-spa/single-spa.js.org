import React from 'react'

export default function ErrorCode37() {

  return (
    <>
      <h1>#39: Invalid registerApplication configuration object</h1>
      <p>
        Configuration object can't be an array or null! Please provide a plain object with correct configuration.
      </p>
      <p>
        See <a href="/docs/configuration">registerApplication API documentation</a> for more information.
      </p>
    </>
  )
}
