import React from 'react'
import CodeSnippet from '../CodeSnippet'

export default function ErrorCode1() {
  return (
    <>
      <h1>#2: Cannot mount parcel</h1>
      <p>
        Cannot mount parcel without a config object or config loading function.
      </p>
      <h2>To fix:</h2>
      <div>
        <p>Raw, framework agnostic code:</p>
        <CodeSnippet>
          {`
            // Raw, framework agnostic code
            const domElement = document.createElement('div');
            const parcelConfig = {bootstrap() {...}, mount() {...}, unmount() {...}, update() {...}}
            mountParcel(parcelConfig, {domElement})
          `}
        </CodeSnippet>
        <p>React-specific code</p>
        <CodeSnippet>
          {`
            // If you're using react, this means the config prop you passed in is undefined,
            // perhaps because it failed to import correctly.
            import ParcelConfig from './some-file';

            <Parcel config={ParcelConfig} />
          `}
        </CodeSnippet>
      </div>
      <h2>Explanation:</h2>
      <p>
        The single-spa start() API exists to give you fine-grained control over performance. In the majority of use cases, you should call singleSpa.start() immediately after <a href="http://localhost:3000/docs/api#registerapplication">registering your applications</a>.
        It was designed for situations where you want to start downloading a single-spa application's code while you're waiting for initial user data or context. To do that, call registerApplication()
        immediately but delay calling start until the data is loaded.
      </p>
    </>
  )
}