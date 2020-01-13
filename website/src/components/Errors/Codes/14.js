
import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode14(props) {
  return (
    <>
      <h1>#14: navigateToUrl / singleSpaNavigate was called incorrectly.</h1>
      <p>
        singleSpaNavigate/navigateToUrl must be either called with a string url, with an anchor element as its context, or with an event whose currentTarget is an anchor element tag
      </p>
      <h2>To fix:</h2>
      <div>
        <CodeSnippet>
          {`
            import { navigateToUrl } from 'single-spa';

            navigateToUrl('/path')

            // Or via html
            <a href="/path" onClick="singleSpaNavigate">Link</a>

            // Or via jsx / templates
            <a href="/path" onClick={navigateToUrl}>Link</a>
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        The singleSpaNavigate global function and the navigateToUrl exported function are identical. They can be used in three different ways, as described
        in <a href="/docs/api/#navigatetourl">the documentation</a>.
      </p>
    </>
  )
}