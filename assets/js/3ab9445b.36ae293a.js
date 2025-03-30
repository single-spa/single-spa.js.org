"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[373],{6749:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>t,toc:()=>r});const t=JSON.parse('{"id":"ecosystem-backbone","title":"single-spa-backbone","description":"A single-spa helper library which provides lifecycle events for building single-spa applications using Backbone.","source":"@site/versioned_docs/version-4.x/ecosystem-backbone.md","sourceDirName":".","slug":"/ecosystem-backbone","permalink":"/docs/4.x/ecosystem-backbone","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-4.x/ecosystem-backbone.md","tags":[],"version":"4.x","frontMatter":{"id":"ecosystem-backbone","title":"single-spa-backbone","sidebar_label":"Backbone"},"sidebar":"docs","previous":{"title":"Riot","permalink":"/docs/4.x/ecosystem-riot"},"next":{"title":"HTML / Web Components","permalink":"/docs/4.x/ecosystem-html-web-components"}}');var a=i(4848),s=i(8453);const o={id:"ecosystem-backbone",title:"single-spa-backbone",sidebar_label:"Backbone"},c=void 0,l={},r=[{value:"NPM package",id:"npm-package",level:2},{value:"Quickstart",id:"quickstart",level:2},{value:"Option 1: Using <code>RequireJS</code> with <code>data-main</code>",id:"option-1-using-requirejs-with-data-main",level:3},{value:"Option 2: Using <code>RequireJS</code> without <code>data-main</code>",id:"option-2-using-requirejs-without-data-main",level:3},{value:"Option 3: Load Backbone app using production build",id:"option-3-load-backbone-app-using-production-build",level:3},{value:"Options",id:"options",level:2},{value:"Note : Out of AppWithRequire, AppWithBackboneJs and App only one is required",id:"note--out-of-appwithrequire-appwithbackbonejs-and-app-only-one-is-required",level:3}];function p(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["A single-spa helper library which provides lifecycle events for building single-spa applications using ",(0,a.jsx)(n.a,{href:"http://backbonejs.org/",children:"Backbone"}),"."]}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://www.npmjs.com/package/@emtecinc/single-spa-backbone",children:(0,a.jsx)(n.img,{src:"https://img.shields.io/npm/v/@emtecinc/single-spa-backbone.svg",alt:"npm Package"})}),"\n",(0,a.jsx)(n.a,{href:"https://github.com/emtecinc/single-spa-backbone/blob/master/LICENSE",children:(0,a.jsx)(n.img,{src:"https://img.shields.io/npm/l/@emtecinc/single-spa-backbone.svg",alt:"License"})})]}),"\n",(0,a.jsx)(n.p,{children:"There are mostly three styles of creating backbone applications"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["Using ",(0,a.jsx)(n.a,{href:"https://requirejs.org/",children:"RequireJS"})," which will loads the application and all it's dependencies, including the templates loaded using ",(0,a.jsx)(n.a,{href:"https://handlebarsjs.com/",children:"Handlebars"}),", ",(0,a.jsxs)(n.a,{href:"https://github.com/requirejs/text",children:["RequireJS",":Text"]})," or any other engine."]}),"\n",(0,a.jsxs)(n.p,{children:["If your application is written using this style, then you will have to pass the ",(0,a.jsx)(n.code,{children:"AppWithRequire"})," parameter as options in the plugin, and choose the flavour to load the app, either through ",(0,a.jsx)(n.code,{children:"data-main"})," attribute or without it."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["Using ",(0,a.jsx)(n.a,{href:"http://backbonejs.org/",children:"Backbone"})," and ApplicationPath (Entry point of application) directly as script elements and optionally loading other dependencies."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"Loading a single application bundle which includes application dependencies like i.e. Backbone, Require, Underscore, Jquery etc."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"npm-package",children:"NPM package"}),"\n",(0,a.jsx)(n.p,{children:"npm install --save @emtecinc/single-spa-backbone"}),"\n",(0,a.jsxs)(n.p,{children:["The npm package can be ",(0,a.jsx)(n.a,{href:"https://www.npmjs.com/package/@emtecinc/single-spa-backbone",children:"found here"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"quickstart",children:"Quickstart"}),"\n",(0,a.jsxs)(n.h3,{id:"option-1-using-requirejs-with-data-main",children:["Option 1: Using ",(0,a.jsx)(n.code,{children:"RequireJS"})," with ",(0,a.jsx)(n.code,{children:"data-main"})]}),"\n",(0,a.jsxs)(n.p,{children:["First, in the ",(0,a.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md#registered-applications",children:"single-spa application"}),", run ",(0,a.jsx)(n.code,{children:"npm install --save @emtec/single-spa-backbone"}),". Then, create an entry file for application like below, assuming the application has some ",(0,a.jsx)(n.code,{children:"BasePath"})," with ",(0,a.jsx)(n.code,{children:"AppPath"})," and `RequireJsPath' being relative to the base path."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'import singleSpaBackbone from "@emtecinc/single-spa-backbone";\n\nconst backBoneLifecycles = singleSpaBackbone({\n  BasePath: "appBasePath",\n  AppWithRequire: {\n    IsDataMain: true,\n    AppPath: "src/app",\n    RequireJsPath: "lib/require.js",\n  },\n  DomElementSetter: domElementSetter,\n});\n\nexport const bootstrap = [backBoneLifecycles.bootstrap];\n\nexport const mount = [backBoneLifecycles.mount];\n\nexport const unmount = [backBoneLifecycles.unmount];\n\nfunction domElementSetter() {\n  //use the same element id to render into, in the backbone app\n  let el = document.getElementById("shell-container");\n  if (!el) {\n    el = document.createElement("div");\n    el.id = "shell-container";\n    document.body.appendChild(el);\n  }\n}\n'})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"DomElementSetter"})," gives you a provision to hook up your callback, and can be used to create a container element in the dom which will be used to load the app."]}),"\n",(0,a.jsx)(n.p,{children:"Please note that this hook up is just a setter and don't expect you to return a value. You need to explicitly use the same element #id in the backbone application to use it as app region or container."}),"\n",(0,a.jsxs)(n.h3,{id:"option-2-using-requirejs-without-data-main",children:["Option 2: Using ",(0,a.jsx)(n.code,{children:"RequireJS"})," without ",(0,a.jsx)(n.code,{children:"data-main"})]}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"IsDataMain"})," will be set to ",(0,a.jsx)(n.code,{children:"false"})," in this case"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'import singleSpaBackbone from "@emtecinc/single-spa-backbone";\n\nconst backBoneLifecycles = singleSpaBackbone({\n  BasePath: "appBasePath",\n  AppWithBackboneJs: {\n    AppPath: "src/app",\n    BackboneJsPath: "lib/backbone.js",\n  },\n  DomElementSetter: domElementSetter,\n});\n\nexport const bootstrap = backBoneLifecycles.bootstrap;\n\nexport const mount = backBoneLifecycles.mount;\n\nexport const unmount = backBoneLifecycles.unmount;\n\nfunction domElementSetter() {\n  //use the same element id to render into, in the backbone app\n  let el = document.getElementById("shell-container");\n  if (!el) {\n    el = document.createElement("div");\n    el.id = "shell-container";\n    document.body.appendChild(el);\n  }\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"option-3-load-backbone-app-using-production-build",children:"Option 3: Load Backbone app using production build"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'import singleSpaBackbone from "@emtecinc/single-spa-backbone";\n\nconst backBoneLifecycles = singleSpaBackbone({\n  BasePath: "appBasePath",\n  App: {\n    AppPath: "src/app",\n  },\n  DomElementSetter: domElementSetter,\n});\n\nexport const bootstrap = backBoneLifecycles.bootstrap;\n\nexport const mount = backBoneLifecycles.mount;\n\nexport const unmount = backBoneLifecycles.unmount;\n\nfunction domElementSetter() {\n  //use the same element id to render into, in the backbone app\n  let el = document.getElementById("shell-container");\n  if (!el) {\n    el = document.createElement("div");\n    el.id = "shell-container";\n    document.body.appendChild(el);\n  }\n}\n'})}),"\n",(0,a.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,a.jsxs)(n.p,{children:["All options are passed to single-spa-backbone via the ",(0,a.jsx)(n.code,{children:"userOptions"})," parameter when calling ",(0,a.jsx)(n.code,{children:"singleSpaBackbone(userOptions)"}),". The following properties are available:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"BasePath"})," (required) : The base path of the backbone application. Mostly it will be the public path from where the app is server and other paths will be relative to this. This parameter expects a string type.\noptional"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"AppWithRequire"})," (required) : This parameter takes an object and expects below properties:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"IsDataMain"})," (optional) : This parameter takes a boolean value and is used to specify whether require js will use ",(0,a.jsx)(n.code,{children:"data-main"})," to load the app."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"AppPath"})," (required) : This parameter takes a string value and specifies the path of JavaScript file, which is entry point of your application and will be booted up using RequireJs. The path is relative to BasePath."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"RequireJsPath"})," (required) : This parameter takes a string value and takes the path of the RequireJs file and is relative to BasePath."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"DependenciesJsPaths"})," (optional) : This is an optional parameter takes an array of strings. It can be used to optionally provide a list of JavaScript paths which you want to load in the browser."]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"AppWithBackboneJs"})," (optional) : This parameter takes an object and expects below properties:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"AppPath"})," (required) : This parameter takes a string value and specifies the path of JavaScript file, which is entry point of your application and will be booted up using Backbone Js. The path is relative to BasePath."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"BackboneJsPath"})," (required) : This parameter takes a string value and takes the path of the Backbone Js file and is relative to BasePath."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"DependenciesJsPaths"})," (optional) : This is an optional parameter takes an array of strings. It can be used to optionally provide a list of JavaScript paths which you want to load in the browser."]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"App"})," (optional) : This parameter takes an object and expects below properties:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"AppPath"})," (required) : This parameter takes a string value and specifies the path of the JavaScript file, which is the production build of your backbone application. The path is relative to BasePath."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"note--out-of-appwithrequire-appwithbackbonejs-and-app-only-one-is-required",children:"Note : Out of AppWithRequire, AppWithBackboneJs and App only one is required"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"DomElementSetter"})," (optional) : This is an optional parameter and can be mostly used to create a dom element, whose id can be later used in the backbone app to load the application. However, you can freely use this callback for any other purpose. It is called before anything else."]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>c});var t=i(6540);const a={},s=t.createContext(a);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);