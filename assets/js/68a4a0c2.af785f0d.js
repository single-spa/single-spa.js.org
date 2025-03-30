"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8406],{261:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"ecosystem-dojo","title":"single-spa-dojo","description":"Build Status","source":"@site/versioned_docs/version-6.x/ecosystem-dojo.md","sourceDirName":".","slug":"/ecosystem-dojo","permalink":"/docs/ecosystem-dojo","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-6.x/ecosystem-dojo.md","tags":[],"version":"6.x","frontMatter":{"id":"ecosystem-dojo","title":"single-spa-dojo","sidebar_label":"Dojo"},"sidebar":"docs","previous":{"title":"Leaked globals","permalink":"/docs/ecosystem-leaked-globals"},"next":{"title":"AlpineJS","permalink":"/docs/ecosystem-alpinejs"}}');var i=n(4848),t=n(8453);const r={id:"ecosystem-dojo",title:"single-spa-dojo",sidebar_label:"Dojo"},d=void 0,l={},a=[{value:"Installation",id:"installation",level:2},{value:"Quickstart",id:"quickstart",level:2},{value:"Options",id:"options",level:2}];function c(e){const o={a:"a",code:"code",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.p,{children:(0,i.jsx)(o.a,{href:"https://travis-ci.com/single-spa/single-spa-dojo",children:(0,i.jsx)(o.img,{src:"https://travis-ci.com/single-spa/single-spa-dojo.svg?branch=master",alt:"Build Status"})})}),"\n",(0,i.jsxs)(o.p,{children:["single-spa-dojo is a helper library that helps implement ",(0,i.jsx)(o.a,{href:"configuration#registering-applications",children:"single-spa registered application"})," ",(0,i.jsx)(o.a,{href:"/docs/building-applications#registered-application-lifecycle",children:"lifecycle functions"})," (bootstrap, mount and unmount) for use with ",(0,i.jsx)(o.a,{href:"https://dojo.io/",children:"Dojo"}),". Check out the ",(0,i.jsx)(o.a,{href:"https://github.com/single-spa/single-spa-dojo",children:"single-spa-dojo github"}),"."]}),"\n",(0,i.jsx)(o.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:"language-sh",children:"npm install --save single-spa-dojo\n\n# or\nyarn add single-spa-dojo\n"})}),"\n",(0,i.jsx)(o.h2,{id:"quickstart",children:"Quickstart"}),"\n",(0,i.jsx)(o.p,{children:'Your bundler\'s "entry file" should look like this, which allows your application to be downloaded as an in-browser ES module.'}),"\n",(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:"language-js",children:'import { renderer } from "@dojo/framework/core/vdom";\nimport { v, w } from "@dojo/framework/widget-core/d";\nimport singleSpaDojo from "single-spa-dojo";\nimport App from "./app";\n\nconst dojoLifecycles = singleSpaDojo({\n  // required\n  renderer,\n\n  // required\n  v,\n\n  // required\n  w,\n\n  // required\n  appComponent: App,\n\n  // optional - see https://dojo.io/learn/creating-widgets/rendering-widgets#mountoptions-properties\n  mountOptions: {\n    // optional\n    registry: myRegistry,\n\n    // optional - one will be provided by single-spa automatically\n    domNode: document.getElementById("myContainer"),\n\n    // optional\n    sync: true,\n  },\n});\n\nexport const bootstrap = dojoLifecycles.bootstrap;\nexport const mount = dojoLifecycles.mount;\nexport const unmount = dojoLifecycles.unmount;\n'})}),"\n",(0,i.jsx)(o.h2,{id:"options",children:"Options"}),"\n",(0,i.jsxs)(o.p,{children:["All options are passed to single-spa-dojo via the ",(0,i.jsx)(o.code,{children:"opts"})," parameter when calling ",(0,i.jsx)(o.code,{children:"singleSpaDojo(opts)"}),". The following options are available:"]}),"\n",(0,i.jsxs)(o.ul,{children:["\n",(0,i.jsxs)(o.li,{children:[(0,i.jsx)(o.code,{children:"renderer"})," (required): The ",(0,i.jsx)(o.code,{children:"renderer"})," function imported from Dojo. See ",(0,i.jsx)(o.a,{href:"https://dojo.io/learn/creating-widgets/rendering-widgets#rendering-to-the-dom",children:"https://dojo.io/learn/creating-widgets/rendering-widgets#rendering-to-the-dom"}),"."]}),"\n",(0,i.jsxs)(o.li,{children:[(0,i.jsx)(o.code,{children:"v"})," (required): The function used to render dom elements in Dojo. Often JSX hides this function from you, but it can be found at ",(0,i.jsx)(o.code,{children:"import { v } from '@dojo/framework/widget-core/d'"}),"."]}),"\n",(0,i.jsxs)(o.li,{children:[(0,i.jsx)(o.code,{children:"w"})," (required): The function used to render dom elements in Dojo. Often JSX hides this function from you, but it can be found at ",(0,i.jsx)(o.code,{children:"import { w } from '@dojo/framework/widget-core/d'"}),"."]}),"\n",(0,i.jsxs)(o.li,{children:[(0,i.jsx)(o.code,{children:"appComponent"})," (required): The class or function for your root Dojo component."]}),"\n",(0,i.jsxs)(o.li,{children:[(0,i.jsx)(o.code,{children:"mountOptions"})," (optional): An object of ",(0,i.jsx)(o.a,{href:"https://dojo.io/learn/creating-widgets/rendering-widgets#mountoptions-properties",children:"Dojo MountOptions"}),". Note that a ",(0,i.jsx)(o.code,{children:"domNode"})," will be provided by single-spa-dojo, if one is not provided."]}),"\n"]})]})}function p(e={}){const{wrapper:o}={...(0,t.R)(),...e.components};return o?(0,i.jsx)(o,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,o,n)=>{n.d(o,{R:()=>r,x:()=>d});var s=n(6540);const i={},t=s.createContext(i);function r(e){const o=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function d(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(t.Provider,{value:o},e.children)}}}]);