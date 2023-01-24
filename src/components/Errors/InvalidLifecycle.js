import React from 'react'
import CodeSnippet from './CodeSnippet'

export default function InvalidLifecycle(props) {
  return (
    <>
      <h1>#{props.errorCode}: Invalid {props.lifecycleName} lifecycle on {props.isParcel ? 'parcel' : 'application'}</h1>
      <p>
        The {props.isParcel ? 'parcel' : 'application'} {props.appOrParcelName} has an invalid {props.lifecycleName} lifecycle function.
      </p>
      <h2>To fix:</h2>
      <div>
        <div>Framework agnostic code:</div>
        {props.isParcel
          ?
            <CodeSnippet>
              {`
              // Create a parcel config by calling singleSpaReact(), singleSpaVue(), singleSpaAngular(), etc.
              const parcelConfig = singleSpaReact({...})

              const customProps = {domElement: document.getElementById('some-container')}
              
              // You need to ensure that the System.import() or import() promise resolves with a valid parcel config object
              const parcel = mountParcel(parcelConfig, customProps);
            `}
            </CodeSnippet>
          :
            <CodeSnippet>
              {`
              // create your lifecycles with the single-spa helper library for your framework
              const lifecycles = singleSpaAngular({...});
              
              // Export them now
              export const bootstrap = lifecycles.bootstrap;
              export const mount = lifecycles.mount;
              export const unmount = lifecycles.unmount;
              `}
            </CodeSnippet>
        }
      </div>
      <h2>Explanation:</h2>
      <p>
        The <a href={props.isParcel ? 'http://localhost:3000/docs/parcels-api/#parcel-object' : 'https://single-spa.js.org/docs/building-applications/#lifecycle-props'}>{props.lifecycleName} lifecycle function</a> must be a function or array of functions that return a promise.
      </p>
    </>
  )
}