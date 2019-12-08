import React from 'react'

export default function CodeSnippet(props) {
  const lines = props.children.split('\n').map(line => line.trim()).filter((line, i) => line.length > 0 || i > 0).join('\n')
  return (
    <pre>
      {lines}
    </pre>
  )
}