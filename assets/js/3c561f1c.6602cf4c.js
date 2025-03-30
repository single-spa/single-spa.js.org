"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8429],{8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>l});var o=s(6540);const t={},i=o.createContext(t);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),o.createElement(i.Provider,{value:n},e.children)}},9772:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"ecosystem-snowpack","title":"Snowpack","description":"Snowpack is a tool for both local development and the building of applications. It uses in-browser ES modules during development, and then bundles with webpack (or other build tools) for production.","source":"@site/versioned_docs/version-5.x/ecosystem-snowpack.md","sourceDirName":".","slug":"/ecosystem-snowpack","permalink":"/docs/5.x/ecosystem-snowpack","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-5.x/ecosystem-snowpack.md","tags":[],"version":"5.x","frontMatter":{"id":"ecosystem-snowpack","title":"Snowpack","sidebar_label":"Snowpack"},"sidebar":"docs","previous":{"title":"Vite","permalink":"/docs/5.x/ecosystem-vite"},"next":{"title":"Overview","permalink":"/docs/5.x/ssr-overview"}}');var t=s(4848),i=s(8453);const a={id:"ecosystem-snowpack",title:"Snowpack",sidebar_label:"Snowpack"},l=void 0,r={},c=[{value:"Example repo",id:"example-repo",level:2},{value:"Overview",id:"overview",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Local development",id:"local-development",level:2},{value:"Native Modules vs SystemJS",id:"native-modules-vs-systemjs",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://www.snowpack.dev/",children:"Snowpack"})," is a tool for both local development and the building of applications. It uses in-browser ES modules during development, and then bundles with webpack (or other build tools) for production."]}),"\n",(0,t.jsx)(n.h2,{id:"example-repo",children:"Example repo"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://github.com/joeldenning/snowpack-single-spa-example",children:"https://github.com/joeldenning/snowpack-single-spa-example"})}),"\n",(0,t.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsxs)(n.p,{children:["Snowpack uses ES modules in local development, but not in production. This works well with single-spa, which encourages using ",(0,t.jsx)(n.a,{href:"/docs/recommended-setup#in-browser-versus-build-time-modules",children:"in-browser modules"})," as the interface for each microfrontend. To use snowpack with single-spa, you must export the ",(0,t.jsx)(n.a,{href:"/docs/building-applications#registered-application-lifecycle",children:"single-spa lifecycle functions"})," from your Snowpack project's ",(0,t.jsx)(n.code,{children:"index.js"})," file and then make a few modifications to the ",(0,t.jsx)(n.code,{children:"snowpack.config.js"})," file."]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsxs)(n.p,{children:["Modify the ",(0,t.jsx)(n.code,{children:"index.js"})," file to not mount your app immediately, but rather to export the single-spa lifecycles. If using Vue, for example, see ",(0,t.jsx)(n.a,{href:"https://single-spa.js.org/docs/ecosystem-vue#usage",children:"https://single-spa.js.org/docs/ecosystem-vue#usage"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["The following Snowpack config can be used as the basis for a single-spa + Snowpack setup. It requires installing ",(0,t.jsx)(n.a,{href:"https://github.com/joeldenning/systemjs-webpack-interop",children:"systemjs-webpack-interop"})," and ",(0,t.jsx)(n.code,{children:"@snowpack/plugin-webpack"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"npm install --save-dev systemjs-webpack-interop @snowpack/plugin-webpack\n\nyarn add --dev systemjs-webpack-interop @snowpack/plugin-webpack\n\npnpm install --save-dev systemjs-webpack-interop @snowpack/plugin-webpack\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'const { merge } = require("webpack-merge");\nconst SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");\n\n/** @type {import("snowpack").SnowpackUserConfig } */\nmodule.exports = {\n  mount: {\n    /* ... */\n  },\n  plugins: [\n    [\n      "@snowpack/plugin-webpack",\n      {\n        extendConfig(config) {\n          delete config.optimization.runtimeChunk;\n          delete config.optimization.splitChunks;\n\n          return merge(config, {\n            mode: "development",\n            module: {\n              rules: [\n                // This rule is necessary in webpack 4, but breaks things in webpack 5\n                // At the time of writing this documentation, @snowpack/plugin-webpack uses webpack 4.\n                {\n                  parser: {\n                    system: false,\n                  },\n                },\n              ],\n            },\n            output: {\n              libraryTarget: "system",\n            },\n            plugins: [\n              new SystemJSPublicPathWebpackPlugin({\n                systemjsModuleName: "snowpack-test",\n                rootDirectoryLevel: 2,\n              }),\n            ],\n          });\n        },\n      },\n    ],\n  ],\n  routes: [\n    /* Enable an SPA Fallback in development: */\n    // {"match": "routes", "src": ".*", "dest": "/index.html"},\n  ],\n  optimize: {\n    /* Example: Bundle your final build: */\n    // "bundle": true,\n  },\n  packageOptions: {\n    /* ... */\n  },\n  devOptions: {},\n  buildOptions: {\n    baseUrl: "http://localhost:8080/",\n  },\n};\n'})}),"\n",(0,t.jsx)(n.h2,{id:"local-development",children:"Local development"}),"\n",(0,t.jsxs)(n.p,{children:["Snowpack works well with ",(0,t.jsx)(n.a,{href:"https://single-spa.js.org/docs/recommended-setup#local-development",children:"development via import map overrides"}),". You should use ",(0,t.jsx)(n.a,{href:"http://localhost:8080/index.js",children:"http://localhost:8080/index.js"})," as the URL for your import map override."]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.p,{children:["Static Assets currently do not load from the correct URL in development, pending a PR to Snowpack: ",(0,t.jsx)(n.a,{href:"https://github.com/snowpackjs/snowpack/pull/2407",children:"https://github.com/snowpackjs/snowpack/pull/2407"}),". However, static assets do load from the correct URL in production, due to systemjs-webpack-interop."]})}),"\n",(0,t.jsx)(n.h2,{id:"native-modules-vs-systemjs",children:"Native Modules vs SystemJS"}),"\n",(0,t.jsx)(n.p,{children:"single-spa works well with native modules, systemjs, or even both. With Snowpack + single-spa, a general recommendation is to use native modules during local development, but SystemJS in production (since browser support for Import Maps is still pending). Doing this is nice because it matches Snowpack's development workflow; however, mixing native and systemjs modules also can have some caveats:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The browser and SystemJS maintain separate module registries. This means that you can't share imports between SystemJS and native modules. So if you are doing an import map override for a Snowpack application on a page that also uses SystemJS, you may end up with multiple instances of Vue or React (and other shared libraries), which is different than how things will work in production. This is generally okay, except for situations where the Vue instance is modified via ",(0,t.jsx)(n.code,{children:"Vue.use()"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/systemjs/systemjs/pull/2187",children:"This PR to SystemJS"})," shows how you can populate native modules into the SystemJS registry, allowing for one-way sharing of modules between the two registries. The PR was closed due to some edge cases, but it generally works. Even though the PR is closed, you can paste the ESM extra into your root config and it will work. If you have interest in driving forward better SystemJS + ESM compatibility, comment on Github or Slack with your interest."]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}}}]);