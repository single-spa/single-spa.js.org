"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7030],{8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var i=n(6540);const r={},s=i.createContext(r);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:t},e.children)}},8656:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"migrating-react-tutorial","title":"Migrating an Existing React Project","description":"Project Setup","source":"@site/versioned_docs/version-4.x/migrating-react-tutorial.md","sourceDirName":".","slug":"/migrating-react-tutorial","permalink":"/docs/4.x/migrating-react-tutorial","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-4.x/migrating-react-tutorial.md","tags":[],"version":"4.x","frontMatter":{"id":"migrating-react-tutorial","title":"Migrating an Existing React Project","sidebar_label":"React - Migrating to single-spa"},"sidebar":"docs","previous":{"title":"Starting from scratch","permalink":"/docs/4.x/starting-from-scratch"},"next":{"title":"AngularJS - Migrating to single-spa","permalink":"/docs/4.x/migrating-angularJS-tutorial"}}');var r=n(4848),s=n(8453);const o={id:"migrating-react-tutorial",title:"Migrating an Existing React Project",sidebar_label:"React - Migrating to single-spa"},a=void 0,c={},l=[{value:"Project Setup",id:"project-setup",level:2},{value:"Step One: Set up the single-spa config",id:"step-one-set-up-the-single-spa-config",level:2},{value:"Step Two: Register the Application",id:"step-two-register-the-application",level:2},{value:"Step Three: Setup Lifecycle Functions",id:"step-three-setup-lifecycle-functions",level:2},{value:"Step Four: Connect to single-spa Config",id:"step-four-connect-to-single-spa-config",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{id:"project-setup",children:"Project Setup"}),"\n",(0,r.jsxs)(t.p,{children:["You can find the code needed to follow along ",(0,r.jsx)(t.a,{href:"https://github.com/alocke12992/migrating-to-single-spa-react-starter",children:"here"}),". You can find the completed ",(0,r.jsx)(t.a,{href:"https://github.com/alocke12992/migrating-to-single-spa-react",children:"code for this tutorial here"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Get started by cloning the starter pack, moving into the project and initializing the package manager of your choice so we can install the single-spa library. For this tutorial, we will be using ",(0,r.jsx)(t.a,{href:"https://yarnpkg.com/en/",children:"yarn"}),"."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"git clone git@github.com:alocke12992/migrating-to-single-spa-react-starter.git\ncd migrating-to-single-spa-react-starter\nyarn # or npm install\nyarn add single-spa # or npm install --save single-spa\n"})}),"\n",(0,r.jsxs)(t.p,{children:["Run ",(0,r.jsx)(t.code,{children:"yarn start"})," from the root directory to fire up the server at ",(0,r.jsx)(t.a,{href:"http://localhost:3000",children:"http://localhost:3000"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"step-one-set-up-the-single-spa-config",children:"Step One: Set up the single-spa config"}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.strong,{children:"single-spa config"})," consists of all code that is not part of a ",(0,r.jsx)(t.a,{href:"configuration#registeringapplications",children:"registered application"}),". Ideally, this only includes an HTML file and a JavaScript file that registers single-spa applications. It is best practice to keep your single spa config as small as possible and to simply defer to single-spa to manage all of the applications."]}),"\n",(0,r.jsxs)(t.p,{children:["Usually, when using ",(0,r.jsx)(t.a,{href:"https://webpack.js.org/",children:"webpack"})," with React, we recommend setting your ",(0,r.jsx)(t.strong,{children:"single-spa config"})," as the entry point in your ",(0,r.jsx)(t.em,{children:"webpack.config.js"})," (",(0,r.jsx)(t.a,{href:"/docs/4.x/starting-from-scratch#1b-setup-webpack",children:'see also the "Setup Webpack" example'}),"). However, this application was built using ",(0,r.jsx)(t.a,{href:"https://github.com/facebook/create-react-app",children:"create-react-app"}),", so we don't have access to the ",(0,r.jsx)(t.em,{children:"webpack.config.js"})," without ",(0,r.jsx)(t.a,{href:"https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject",children:"ejecting"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["To avoid having to eject, we are going to hijack the current entry point, ",(0,r.jsx)(t.em,{children:"src/index.js"})," so we can use it to register our SPA as a single-spa application."]}),"\n",(0,r.jsxs)(t.p,{children:["Start by removing everything except ",(0,r.jsx)(t.code,{children:"registerServiceWorker"}),"."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="src/index.js"',children:'import registerServiceWorker from "./registerServiceWorker";\n\nregisterServiceWorker();\n'})}),"\n",(0,r.jsx)(t.h2,{id:"step-two-register-the-application",children:"Step Two: Register the Application"}),"\n",(0,r.jsxs)(t.p,{children:["Now that we have prepared ",(0,r.jsx)(t.em,{children:"index.js"})," to function as our ",(0,r.jsx)(t.strong,{children:"single-spa config"}),", we can begin to register the application. It is required to ",(0,r.jsx)(t.a,{href:"https://single-spa.js.org/docs/configuration#registering-applications",children:"register applications"})," with single-spa. This enables single-spa to know how and when to bootstrap, mount and unmount an application."]}),"\n",(0,r.jsxs)(t.p,{children:["In order to register an application with single-spa we call the ",(0,r.jsx)(t.code,{children:"registerApplication()"})," api and include the application ",(0,r.jsx)(t.a,{href:"configuration#application-name",children:"name"}),", a ",(0,r.jsx)(t.a,{href:"configuration#loading-function-or-application",children:"loadingFunction"})," and an ",(0,r.jsx)(t.a,{href:"configuration#activity-function",children:"activityFunction"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Finally, the ",(0,r.jsx)(t.a,{href:"/docs/4.x/api#start",children:"start()"})," api ",(0,r.jsx)(t.strong,{children:"must"})," be called by your ",(0,r.jsx)(t.code,{children:"single spa config"})," in order for applications to actually be mounted. Before ",(0,r.jsx)(t.code,{children:"start()"})," is called, applications will be loaded, but not bootstrapped/mounted/unmounted."]}),"\n",(0,r.jsxs)(t.p,{children:["In ",(0,r.jsx)(t.em,{children:"src/index.js"}),", start by importing the ",(0,r.jsx)(t.code,{children:"registerApplication"})," and ",(0,r.jsx)(t.code,{children:"start"})," functions:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'{2} title="src/index.js"',children:'import registerServiceWorker from "./registerServiceWorker";\nimport { registerApplication, start } from "single-spa";\n\nregisterServiceWorker();\n'})}),"\n",(0,r.jsxs)(t.p,{children:["With our functions imported, we can now register an application with single-spa and call ",(0,r.jsx)(t.code,{children:"start()"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'{4-8,10} title="src/index.js"',children:'import registerServiceWorker from "./registerServiceWorker";\nimport { registerApplication, start } from "single-spa";\n\nregisterApplication(\n  "root", // Name of this single-spa application\n  loadingFunction, // Our loading function\n  activityFunction, // Our activity function\n);\n\nstart();\nregisterServiceWorker();\n'})}),"\n",(0,r.jsxs)(t.p,{children:["The second argument in ",(0,r.jsx)(t.code,{children:"registerApplication"}),", ",(0,r.jsx)(t.code,{children:"loadingFunction"}),", must be a function that returns a promise (or an ",(0,r.jsx)(t.a,{href:"https://ponyfoo.com/articles/understanding-javascript-async-await",children:'"async function"'}),"). The function will be called with no arguments when it's time to load the application for the first time. The returned promise must be resolved with the application. We will be creating this in the next step."]}),"\n",(0,r.jsxs)(t.p,{children:["The third argument, ",(0,r.jsx)(t.code,{children:"activityFunction"}),", must be a pure function. The function is provided ",(0,r.jsx)(t.code,{children:"window.location"})," as the first argument, and returns a truthy value whenever the application should be active. In this case we have set the activity function to return true. This will set our SPA to always be mounted regardless of the location. Later, if we wanted to add other SPAs to our single-spa web application, we can change the activity function to return based on ",(0,r.jsx)(t.code,{children:"location.hash.startsWith('#/someRoute')"}),". See the ",(0,r.jsx)(t.a,{href:"/docs/4.x/starting-from-scratch#b-register-the-application",children:'"Starting From Scratch" tutorial'})," for an example of how to set up routing between multiple SPAs."]}),"\n",(0,r.jsx)(t.h2,{id:"step-three-setup-lifecycle-functions",children:"Step Three: Setup Lifecycle Functions"}),"\n",(0,r.jsxs)(t.p,{children:["Since we have registered our application, single-spa will be listening for the application to ",(0,r.jsx)(t.code,{children:"bootstrap"})," and ",(0,r.jsx)(t.code,{children:"mount"}),". We can use the ",(0,r.jsx)(t.a,{href:"/docs/4.x/ecosystem-react",children:"single-spa-react"})," helper library to make use of the generic React lifecycle hooks. See the ",(0,r.jsx)(t.a,{href:"/docs/4.x/building-applications#registered-application-lifecycle",children:"registered application lifecycle"})," docs to learn more about each lifecycle function."]}),"\n",(0,r.jsxs)(t.p,{children:["For this tutorial, we will be implementing the required lifecycle functions in a new ",(0,r.jsx)(t.em,{children:"root.app.js"})," file within the ",(0,r.jsx)(t.em,{children:"src/"})," folder. From the root directory, run the following code to install the ",(0,r.jsx)(t.a,{href:"https://github.com/single-spa/single-spa-react",children:"single-spa-react"})," helper library and create the new file:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"yarn add single-spa-react\ntouch src/root.app.js\n"})}),"\n",(0,r.jsxs)(t.p,{children:["During this process, we need to establish a ",(0,r.jsx)(t.code,{children:"rootComponent"}),", which is the top level React component to be rendered. In this case ",(0,r.jsx)(t.em,{children:"src/containers/App.js"})," has already been designated as the top level component. If you recall, we removed this from the ",(0,r.jsx)(t.em,{children:"index.js"})," file so we could set up our ",(0,r.jsx)(t.strong,{children:"single-spa config"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Finally, we will use the ",(0,r.jsx)(t.code,{children:"domElementGetter()"})," function to return a DOMElement where the application will be bootstrapped, mounted, and unmounted. Notice that our SPA already has an HTML file in the ",(0,r.jsx)(t.em,{children:"public/"})," folder containing a ",(0,r.jsx)(t.code,{children:"<div />"})," with and id of ",(0,r.jsx)(t.code,{children:"root"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Set up the registered application lifecycle functions by adding the following to ",(0,r.jsx)(t.em,{children:"src/root.app.js"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:'import React from "react";\nimport ReactDOM from "react-dom";\nimport singleSpaReact from "single-spa-react";\nimport App from "./containers/App.js";\n\nconst reactLifecycles = singleSpaReact({\n  React,\n  ReactDOM,\n  rootComponent: App,\n  domElementGetter,\n});\n\nexport const bootstrap = [reactLifecycles.bootstrap];\n\nexport const mount = [reactLifecycles.mount];\n\nexport const unmount = [reactLifecycles.unmount];\n\nfunction domElementGetter() {\n  // This is where single-spa will mount our application\n  return document.getElementById("root");\n}\n'})}),"\n",(0,r.jsx)(t.h2,{id:"step-four-connect-to-single-spa-config",children:"Step Four: Connect to single-spa Config"}),"\n",(0,r.jsxs)(t.p,{children:["Head back to the ",(0,r.jsx)(t.strong,{children:"single-spa config"})," in ",(0,r.jsx)(t.em,{children:"src/index.js"})," to add a ",(0,r.jsx)(t.a,{href:"configuration#loading-function",children:"loading function"})," for the registered application by importing ",(0,r.jsx)(t.em,{children:"root.app.js"}),"."]}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsxs)(t.p,{children:["It is important to note that ",(0,r.jsx)(t.strong,{children:"you do not have to use a loading function"})," and instead can simply pass in the application config object directly to the ",(0,r.jsx)(t.code,{children:"registerApplication"})," function. However, with ",(0,r.jsx)(t.a,{href:"https://webpack.js.org/",children:"Webpack 2+"}),", we can take advantage of its support for ",(0,r.jsx)(t.a,{href:"https://webpack.js.org/guides/code-splitting/",children:"code splitting"})," with ",(0,r.jsx)(t.a,{href:"https://webpack.js.org/api/module-methods/#import",children:"import()"})," in order to easily lazy-load registered applications when they are needed. Think about your project's build when deciding which route to take."]})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'{8} title="src/index.js"',children:'import registerServiceWorker from "./registerServiceWorker";\nimport { registerApplication, start } from "single-spa";\n\nregisterApplication(\n  "root",\n  () => import("./root.app.js"),\n  () => true,\n);\n\nstart();\nregisterServiceWorker();\n'})}),"\n",(0,r.jsx)(t.h1,{id:"thats-it",children:"That's it"}),"\n",(0,r.jsxs)(t.p,{children:["Head back to the console and start up the server on ",(0,r.jsx)(t.a,{href:"http://localhost:3000",children:"http://localhost:3000"})," by running ",(0,r.jsx)(t.code,{children:"yarn start"})," from the root directory."]}),"\n",(0,r.jsxs)(t.p,{children:["Inspect the page and notice that our SPA is now being rendered inside of the ",(0,r.jsx)(t.code,{children:'<div id="root"/>'}),". Technically, we are back to square one, with a fully functioning SPA. However, now that our SPA is a registered single-spa application we can take advantage of single-spa's functionality by building additional applications to mount side by side with our current React SPA."]}),"\n",(0,r.jsx)(t.p,{children:"Feel free to start using that new Javacript framework everyone has been talking about."})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}}}]);