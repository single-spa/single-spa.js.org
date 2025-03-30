"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5584],{3829:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>p});const i=JSON.parse('{"id":"ecosystem-ember","title":"single-spa-ember","description":"single-spa-ember is a helper library that helps implement single-spa registered application lifecycle functions (bootstrap, mount and unmount) for use with Ember.js. Check out the single-spa-ember github.","source":"@site/versioned_docs/version-5.x/ecosystem-ember.md","sourceDirName":".","slug":"/ecosystem-ember","permalink":"/docs/5.x/ecosystem-ember","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-5.x/ecosystem-ember.md","tags":[],"version":"5.x","frontMatter":{"id":"ecosystem-ember","title":"single-spa-ember","sidebar_label":"Ember"},"sidebar":"docs","previous":{"title":"Cycle","permalink":"/docs/5.x/ecosystem-cycle"},"next":{"title":"Inferno","permalink":"/docs/5.x/ecosystem-inferno"}}');var t=s(4848),o=s(8453);const r={id:"ecosystem-ember",title:"single-spa-ember",sidebar_label:"Ember"},a=void 0,l={},p=[{value:"Overview",id:"overview",level:2},{value:"API",id:"api",level:2},{value:"loadEmberApp",id:"loademberapp",level:3},{value:"singleSpaEmber",id:"singlespaember",level:3},{value:"Usage with ember cli",id:"usage-with-ember-cli",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["single-spa-ember is a helper library that helps implement ",(0,t.jsx)(n.a,{href:"configuration#registering-applications",children:"single-spa registered application"})," ",(0,t.jsx)(n.a,{href:"/docs/5.x/building-applications#registered-application-lifecycle",children:"lifecycle functions"})," (bootstrap, mount and unmount) for use with ",(0,t.jsx)(n.a,{href:"https://www.emberjs.com/",children:"Ember.js"}),". Check out the ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-ember",children:"single-spa-ember github"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["It is available on npm as ",(0,t.jsx)(n.code,{children:"single-spa-ember"}),", and also available on bower as ",(0,t.jsx)(n.code,{children:"single-spa-ember"})," in case you want to use it with ember cli and need to use bower."]}),"\n",(0,t.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsxs)(n.p,{children:["When you are building an ember application that you want to work as a ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md#registered-applications",children:"single-spa application"}),", there are five things you need to implement:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["A ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/root-application.md#loading-function",children:"loading function"})]}),"\n",(0,t.jsxs)(n.li,{children:["An ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/root-application.md#activity-function",children:"activity function"})]}),"\n",(0,t.jsxs)(n.li,{children:["A ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md#bootstrap",children:"bootstrap function"})]}),"\n",(0,t.jsxs)(n.li,{children:["A ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md#mount",children:"mount function"})]}),"\n",(0,t.jsxs)(n.li,{children:["An ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md#unmount",children:"unmount function"})]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Single-spa-ember will help you implement all of those except for the activity function."}),"\n",(0,t.jsxs)(n.p,{children:["Note that the loading and activity functions are part of the ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/root-application.md",children:"single-spa root application"}),", whereas the bootstrap, mount, and unmount functions are part of a ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md",children:"single-spa application"})]}),"\n",(0,t.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,t.jsx)(n.h3,{id:"loademberapp",children:"loadEmberApp"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"loadEmberApp(appName, appUrl, vendorUrl)"})," is a function that helps you implement the ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/root-application.md#loading-function",children:"loading function"})," for your ember application.\n",(0,t.jsx)(n.code,{children:"appName"})," and ",(0,t.jsx)(n.code,{children:"appUrl"})," are both strings and both required, whereas ",(0,t.jsx)(n.code,{children:"vendorUrl"})," is an optional string."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'// In the single-spa root application\n\nimport { registerApplication } from "single-spa";\nimport { loadEmberApp } from "single-spa-ember";\n\nconst name = "ember-app";\nconst app = () =>\n  loadEmberApp(\n    name,\n    "/dist/ember-app/assets/ember-app.js",\n    "/dist/ember-app/assets/vendor.js",\n  );\nconst activeWhen = (location) => location.hash.startsWith("ember");\n\nregisterApplication({ name, app, activeWhen });\n'})}),"\n",(0,t.jsx)(n.h3,{id:"singlespaember",children:"singleSpaEmber"}),"\n",(0,t.jsxs)(n.p,{children:["Single-spa-ember will implement the ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md#application-lifecycle",children:"single-spa lifecyle functions"})," for you. To use it, you call the default export as a function with a configuration object, which returns an object that has ",(0,t.jsx)(n.code,{children:"bootstrap"}),", ",(0,t.jsx)(n.code,{children:"mount"}),", and ",(0,t.jsx)(n.code,{children:"unmount"})," lifecycle functions on it. The provided configuration object has the following options:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"App"})," (required): The ",(0,t.jsx)(n.a,{href:"https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application",children:"ember Application"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"createOpts"})," (optional): The options to provide when calling ",(0,t.jsx)(n.a,{href:"https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application",children:"App.create(options)"}),". See the ",(0,t.jsx)(n.a,{href:"https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application",children:"ember docs"})," for more details."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'// In the ember application\nimport singleSpaEmber from "single-spa-ember/src/single-spa-ember";\n\nconst emberLifecycles = singleSpaEmber({\n  appName: "ember-app", // required\n  createOpts: {\n    // See https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application\n    rootElement: "#ember-app",\n  },\n});\n\nexport const bootstrap = emberLifecycles.bootstrap;\nexport const mount = emberLifecycles.mount;\nexport const unmount = emberLifecycles.unmount;\n'})}),"\n",(0,t.jsx)(n.h2,{id:"usage-with-ember-cli",children:"Usage with ember cli"}),"\n",(0,t.jsxs)(n.p,{children:["For the most part, you can get applications that use ",(0,t.jsx)(n.a,{href:"https://ember-cli.com/",children:"ember cli"})," to work pretty seamlessly with single-spa. Maybe the biggest thing you'll have to worry about is that ember-cli assumes that it controls the entire HTML page, whereas a single-spa application does not. However, usually we can achieve equivalent behavior by just loading the vendor and app bundles into the HTML page dynamically, instead of baking them right into the HTML page. Below is a description of the known things you should do when setting up an ember-cli application with single-spa:"]}),"\n",(0,t.jsxs)(n.p,{children:["First, you'll need to add ",(0,t.jsx)(n.code,{children:"single-spa-ember"})," as a dependency to the ember project. This can be done with ",(0,t.jsx)(n.code,{children:"npm"}),", ",(0,t.jsx)(n.code,{children:"yarn"}),", or ",(0,t.jsx)(n.code,{children:"bower"}),". For example:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"npm init"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"npm install single-spa-ember"}),"\nor"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"bower init"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"bower install single-spa-ember --save"})}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Add the following options to your ember-cli-build.js file:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'/* eslint-env node */\n"use strict";\n\nconst EmberApp = require("ember-cli/lib/broccoli/ember-app");\n\nmodule.exports = function (defaults) {\n  let app = new EmberApp(defaults, {\n    autoRun: false, // Set autoRun to false, because we only want the ember app to render to the DOM when single-spa tells it to.\n    storeConfigInMeta: false, // We\'re making a single-spa application, which doesn\'t exclusively own the HTML file. So we don\'t want to have to have a `<meta>` tag for the ember environment to be initialized.\n    fingerprint: {\n      customHash: null, // This is optional, just will make it easier for you to have the same url every time you do an ember build.\n    },\n    // Add options here\n  });\n\n  // Tell ember how to use the single-spa-ember library - pick one of the following\n  // if you used npm or yarn\n  app.import("node_modules/single-spa-ember/amd/single-spa-ember.js", {\n    using: [{ transformation: "amd", as: "single-spa-ember" }],\n  });\n\n  // **or** if you used bower\n  app.import("bower_components/single-spa-ember/amd/single-spa-ember.js", {\n    using: [{ transformation: "amd", as: "single-spa-ember" }],\n  });\n\n  return app.toTree();\n};\n'})}),"\n",(0,t.jsx)(n.p,{children:"In your single-spa root application (which is separate from anything generated by ember cli):"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'// root-application.js\nimport * as singleSpa from "single-spa";\nimport { loadEmberApp } from "single-spa-ember";\n\nsingleSpa.registerApplication("ember-app", loadingFunction, activityFunction);\n\nfunction activityFunction(location) {\n  // Only render the ember app when the url hash starts with ember\n  return location.hash.startsWith("ember");\n}\n\n// single-spa-ember helps us load the script tags and give the ember app module to single-spa.\nfunction loadingFunction() {\n  const appName = "ember-app";\n  const appUrl = "/dist/ember-app/assets/ember-app.js";\n  const vendorUrl = "/dist/ember-app/assets/vendor.js"; // Optional if you have one vendor bundle used for many different ember apps\n  return loadEmberApp(appName, appUrl, vendorUrl);\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"In your app.js file (that is generated by ember cli)"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'// app.js (the ember application)\nimport Ember from "ember";\nimport Resolver from "./resolver";\nimport loadInitializers from "ember-load-initializers";\nimport config from "./config/environment";\nimport singleSpaEmber from "single-spa-ember";\n\n// This part is generated by the ember cli\nconst App = Ember.Application.extend({\n  modulePrefix: config.modulePrefix,\n  podModulePrefix: config.podModulePrefix,\n  Resolver,\n});\n\nloadInitializers(App, config.modulePrefix);\n\nexport default App;\n\n// This is the single-spa part\nconst emberLifecycles = singleSpaEmber({\n  App, // required\n  appName: "ember-app", // required\n  createOpts: {\n    // optional\n    rootElement: "#ember-app",\n  },\n});\n\n// Single-spa lifecycles.\nexport const bootstrap = emberLifecycles.bootstrap;\nexport const mount = emberLifecycles.mount;\nexport const unmount = emberLifecycles.unmount;\n'})})]})}function m(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var i=s(6540);const t={},o=i.createContext(t);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);