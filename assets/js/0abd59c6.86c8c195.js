"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1529],{8144:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"layout-definition","title":"Layout Definition","description":"A layout is a combination of HTMLElements, routes, and single-spa applications. Layout is defined statically in your root config to handle your top level routes and dom elements. Single-spa-layout should not be used outside of the root config; instead, a UI framework (React, Angular, Vue) should handle layouts within the applications.","source":"@site/versioned_docs/version-5.x/layout-definition.md","sourceDirName":".","slug":"/layout-definition","permalink":"/docs/5.x/layout-definition","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-5.x/layout-definition.md","tags":[],"version":"5.x","frontMatter":{"id":"layout-definition","title":"Layout Definition","sidebar_label":"Layout Definition"},"sidebar":"docs","previous":{"title":"Overview","permalink":"/docs/5.x/layout-overview"},"next":{"title":"API","permalink":"/docs/5.x/layout-api"}}');var s=t(4848),i=t(8453);const o={id:"layout-definition",title:"Layout Definition",sidebar_label:"Layout Definition"},r=void 0,l={},c=[{value:"HTML Layouts",id:"html-layouts",level:2},{value:"JSON Layouts",id:"json-layouts",level:2},{value:"Layout Elements",id:"layout-elements",level:2},{value:"<code>&lt;template&gt;</code>",id:"template",level:3},{value:"<code>&lt;single-spa-router&gt;</code>",id:"single-spa-router",level:3},{value:"<code>&lt;route&gt;</code>",id:"route",level:3},{value:"<code>&lt;application&gt;</code>",id:"application",level:3},{value:"<code>&lt;fragment&gt;</code>",id:"fragment",level:3},{value:"<code>&lt;assets&gt;</code>",id:"assets",level:3},{value:"<code>&lt;redirect&gt;</code>",id:"redirect",level:3},{value:"DOM elements",id:"dom-elements",level:3},{value:"JSON DOM Nodes",id:"json-dom-nodes",level:4},{value:"HTMLElement",id:"htmlelement",level:5},{value:"Text Nodes",id:"text-nodes",level:5},{value:"Comment Nodes",id:"comment-nodes",level:5},{value:"Props",id:"props",level:2},{value:"JSON",id:"json",level:3},{value:"HTML",id:"html",level:3},{value:"Loading UIs",id:"loading-uis",level:2},{value:"Transitions",id:"transitions",level:2},{value:"Default Routes (404 Not Found)",id:"default-routes-404-not-found",level:2},{value:"Error UIs",id:"error-uis",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["A layout is a combination of HTMLElements, routes, and ",(0,s.jsx)(n.a,{href:"/docs/building-applications/",children:"single-spa applications"}),". Layout is defined statically in your ",(0,s.jsx)(n.a,{href:"/docs/configuration/",children:"root config"})," to handle your top level routes and dom elements. Single-spa-layout should not be used outside of the root config; instead, a UI framework (React, Angular, Vue) should handle layouts within the applications."]}),"\n",(0,s.jsx)(n.p,{children:"You may define layouts as either HTML templates or JSON objects. Defining in JSON is supported for organizations who prefer storing their layout definitions in a database instead of code. Both HTML and JSON layouts have the same feature set. However, storing layouts in code is generally preferred and encouraged by default. If you're just getting started with single-spa-layout, we encourage using an HTML template."}),"\n",(0,s.jsxs)(n.p,{children:["Once you define your layout, you should ",(0,s.jsx)(n.code,{children:"constructRoutes"}),", ",(0,s.jsx)(n.code,{children:"constructApplications"}),", and ",(0,s.jsx)(n.code,{children:"constructLayoutEngine"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"html-layouts",children:"HTML Layouts"}),"\n",(0,s.jsx)(n.p,{children:"You may define HTML layouts either within your root config's index.html file, or within a javascript string that is parsed as HTML. We generally encourage defining the layout within your root config's index.html file."}),"\n",(0,s.jsxs)(n.p,{children:["To define a layout within your index.html file, create a ",(0,s.jsx)(n.code,{children:'<template id="single-spa-layout">'})," element that contains your layout. Within the template, add a ",(0,s.jsx)(n.code,{children:"<single-spa-router>"})," element, along with any routes, applications, and dom elements."]}),"\n",(0,s.jsx)(n.p,{children:"Note that HTMLElements defined in your layout are static - there is no way to forcibly re-render or change them."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'\x3c!-- index.ejs --\x3e\n<html>\n  <head>\n    <template>\n      <single-spa-router>\n        <div class="main-content">\n          <route path="settings">\n            <application name="settings"></application>\n          </route>\n        </div>\n      </single-spa-router>\n    </template>\n  </head>\n</html>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'// You can pass in an HTML string, too, in the browser\nconst routes = constructRoutes(`\n<single-spa-router>\n  <div class="main-content">\n    <route path="settings">\n      <application name="settings"></application>\n    </route>\n  </div>\n</single-spa-router>\n`);\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'// With a properly configured bundler, you can import the html as a string from another file\nimport layout from "./microfrontends-layout.html";\n\nconst routes = constructRoutes(layout);\n'})}),"\n",(0,s.jsx)(n.h2,{id:"json-layouts",children:"JSON Layouts"}),"\n",(0,s.jsx)(n.p,{children:"You may define your layout as JSON, including routes, applications, and arbitrary dom elements."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'const routes = constructRoutes({\n  routes: [\n    {\n      type: "route",\n      path: "settings",\n      routes: [{ type: "application", name: "settings" }],\n    },\n  ],\n});\n'})}),"\n",(0,s.jsx)(n.h2,{id:"layout-elements",children:"Layout Elements"}),"\n",(0,s.jsx)(n.p,{children:"A layout element is an HTMLElement or JSON object that represents either a dom node, route, or application."}),"\n",(0,s.jsx)(n.h3,{id:"template",children:(0,s.jsx)(n.code,{children:"<template>"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsxs)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template",children:[(0,s.jsx)(n.code,{children:"template"})," element"]})," is only used when defining the layout as HTML. Its purpose is to prevent its contents from being displayed by the browser, since the layout definition should not be visible to user."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:"<template>\n  \x3c!-- Define your layout here --\x3e\n  <single-spa-router></single-spa-router>\n</template>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Note that ",(0,s.jsx)(n.code,{children:"<template>"})," elements are not fully supported in IE11. However, you do not need to polyfill template elements in order to use them in single-spa-layout. Instead, simply add ",(0,s.jsx)(n.code,{children:'style="display: none;"'})," to the template to prevent its contents from being displayed in IE11."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<template style="display: none;">\n  \x3c!-- Define your layout here --\x3e\n  <single-spa-router></single-spa-router>\n</template>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"single-spa-router",children:(0,s.jsx)(n.code,{children:"<single-spa-router>"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"single-spa-router"})," element is required as the top level container of your layout. All attributes are optional."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<single-spa-router\n  mode="hash|history"\n  base="/"\n  disableWarnings\n></single-spa-router>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "mode": "hash|history",\n  "base": "/",\n  "disableWarnings": false,\n  "containerEl": "#container",\n  "routes": []\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Attributes"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"mode"})," (optional): A string that must be ",(0,s.jsx)(n.code,{children:"hash"})," or ",(0,s.jsx)(n.code,{children:"history"})," that defaults to ",(0,s.jsx)(n.code,{children:"history"}),". This indicates whether the routes should be matched against the Location ",(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname",children:"pathname"})," or ",(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Location/hash",children:"hash"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"base"})," (optional): A string URL prefix that will be considered when matching route paths."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"disableWarnings"})," (optional): A boolean that turns of single-spa-layout's console warnings when the elements provided are incorrect."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"containerEl"})," (optional): A string ",(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Glossary/CSS_Selector",children:"CSS Selector"})," or ",(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement",children:"HTMLElement"})," that is used as the container for all single-spa dom elements. Defaults to ",(0,s.jsx)(n.code,{children:"body"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"route",children:(0,s.jsx)(n.code,{children:"<route>"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"route"})," element is used to control which applications and dom elements are shown for a top-level URL route. It may contain HTMLElements, applications, or other routes. Note that the route path is a URL prefix, not an exact match."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<route path="clients">\n  <application name="clients"></application>\n</route>\n\n<route default>\n  <application name="clients"></application>\n</route>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "type": "route",\n  "path": "clients",\n  "routes": [{ "type": "application", "name": "clients" }],\n  "default": false\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Attributes"})}),"\n",(0,s.jsx)(n.p,{children:"Routes must either have a path or be a default route."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"routes"})," (required): An array of children elements that will be displayed when the route is active"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"path"})," (optional): A path that will be matched against the browser's URL. The path is relative to its parent route (or the base URL). Leading and trailing ",(0,s.jsx)(n.code,{children:"/"}),' characters are unnecessary and are automatically applied. Paths may contain "dynamic segments" by using the ',(0,s.jsx)(n.code,{children:":"})," character (",(0,s.jsx)(n.code,{children:'"clients/:id/reports"'}),"). Single-spa-layout uses single-spa's ",(0,s.jsxs)(n.a,{href:"/docs/api/#pathtoactivewhen",children:[(0,s.jsx)(n.code,{children:"pathToActiveWhen"})," function"]})," to convert the path string to an ",(0,s.jsx)(n.a,{href:"/docs/configuration/#activity-function",children:"activity function"}),". By default, the path is a prefix because it will match when any subroutes of the path match. See the ",(0,s.jsx)(n.code,{children:"exact"})," attribute for exact matching."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"default"})," (optional): A boolean that determines whether this route will match all remaining URLs that have not been defined by sibling routes. This is useful for 404 Not Found pages. A sibling route is defined as any route with the same nearest-parent-route."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"exact"})," (optional, defaults to ",(0,s.jsx)(n.code,{children:"false"}),"): A boolean that determines whether the ",(0,s.jsx)(n.code,{children:"path"})," should be treated as a prefix or exact match. When ",(0,s.jsx)(n.code,{children:"true"})," the route does not activate if there are trailing characters in the URL path that are not specified in the ",(0,s.jsx)(n.code,{children:"path"})," attribute."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"props"}),": An object of ",(0,s.jsx)(n.a,{href:"/docs/building-applications/#lifecycle-props",children:"single-spa custom props"})," that will be provided to the application when it is mounted. Note that these can be defined differently for the same application on different routes. You can read more about defining props within your HTML ",(0,s.jsx)(n.a,{href:"#props",children:"in the docs below"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"application",children:(0,s.jsx)(n.code,{children:"<application>"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"application"})," element is used to render a ",(0,s.jsx)(n.a,{href:"/docs/building-applications/",children:"single-spa application"}),". Applications may be contained within route elements, or may exist at the top level as applications that will always be rendered. A container HTMLElement will be created by single-spa-layout when the application is rendered. The container HTMLElement is created with an ",(0,s.jsx)(n.code,{children:"id"})," attribute of ",(0,s.jsx)(n.code,{children:"single-spa-application:appName"})," such that your ",(0,s.jsx)(n.a,{href:"/docs/ecosystem/",children:"framework helpers"})," will automatically use it when ",(0,s.jsx)(n.a,{href:"/docs/building-applications/#mount",children:"mounting"})," the application."]}),"\n",(0,s.jsx)(n.p,{children:"The same application may appear multiple times in your layout, under different routes. However, each application can only be defined once per-route."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'\x3c!-- Basic usage --\x3e\n<application name="appName"></application>\n\n\x3c!-- Use a named loader that is defined in javascript --\x3e\n<application name="appName" loader="mainContentLoader"></application>\n\n\x3c!-- Add single-spa custom props to the application. The value of the prop is defined in javascript --\x3e\n<application name="appName" props="myProp,authToken"></application>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'// Basic usage\n{\n  "type": "application",\n  "name": "appName"\n}\n\n// Use a single-spa parcel as a loading UI\n// You may also use Angular, Vue, etc.\nconst parcelConfig = singleSpaReact({...})\n{\n  "type": "application",\n  "name": "appName",\n  "loader": parcelConfig\n}\n\n// Use an HTML string as a loading UI\n{\n  "type": "application",\n  "name": "appName",\n  "loader": "<img src=\'loading.gif\'>"\n}\n\n// Add single-spa custom props\n{\n  "type": "application",\n  "name": "appName",\n  "props": {\n    "myProp": "some-value"\n  }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Attributes"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"name"})," (required): The string ",(0,s.jsx)(n.a,{href:"/docs/api/#configuration-object",children:"application name"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"loader"})," (optional): An HTML string or ",(0,s.jsx)(n.a,{href:"/docs/parcels-overview/#parcel-configuration",children:"single-spa parcel config object"}),". The loader will be mounted to the DOM while waiting for the application's ",(0,s.jsx)(n.a,{href:"/docs/configuration/#loading-function-or-application",children:"loading function"})," to resolve. You can read more about defining loaders ",(0,s.jsx)(n.a,{href:"#loading-uis",children:"in the docs below"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"props"}),": An object of ",(0,s.jsx)(n.a,{href:"/docs/building-applications/#lifecycle-props",children:"single-spa custom props"})," that will be provided to the application when it is mounted. Note that these can be defined differently for the same application on different routes. You can read more about defining props within your HTML ",(0,s.jsx)(n.a,{href:"#props",children:"in the docs below"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"class"})," / ",(0,s.jsx)(n.code,{children:"className"}),": The CSS class to apply to the container HTML element for this single-spa application. In JSON layouts, use ",(0,s.jsx)(n.code,{children:"className"}),". In HTML layouts, use ",(0,s.jsx)(n.code,{children:"class"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"fragment",children:(0,s.jsx)(n.code,{children:"<fragment>"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"fragment"})," element is used to specify a dynamic server-rendered portion of the template. Fragments are commonly used to inline import maps, add dynamic CSS / fonts, or customize the HTML ",(0,s.jsx)(n.code,{children:"<head>"})," metadata. See ",(0,s.jsx)(n.a,{href:"/docs/layout-api#sendlayouthttpresponse",children:"sendLayoutHTTPResponse"})," for more information about how fragments are rendered. Note that ",(0,s.jsx)(n.code,{children:"<fragment>"})," elements only have meaning in server templates, not browser-only templates."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<fragment name="importmap"></fragment>\n\n<fragment name="head-metadata"></fragment>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"assets",children:(0,s.jsx)(n.code,{children:"<assets>"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"<assets>"})," element is used to specify the location of server-rendered application assets, including CSS and fonts. When server-side rendered, the ",(0,s.jsx)(n.code,{children:"<assets>"})," element is replaced by all the assets from the active applications on the page. Applications specify their assets as part of the ",(0,s.jsx)(n.code,{children:"renderApplication"})," function provided to ",(0,s.jsxs)(n.a,{href:"/docs/layout-api#sendLayoutHTTPResponse",children:["the ",(0,s.jsx)(n.code,{children:"sendLayoutHTTPResponse"})," function"]}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:"<assets></assets>\n"})}),"\n",(0,s.jsx)(n.h3,{id:"redirect",children:(0,s.jsx)(n.code,{children:"<redirect>"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"<redirect>"})," element is used to specify route redirects. On the server side, this is done with ",(0,s.jsx)(n.code,{children:"res.redirect()"}),", which results in an HTTP 302 being sent to the browser. Within the browser, this is done by ",(0,s.jsx)(n.a,{href:"/docs/api#canceling-navigation",children:"canceling navigation"})," and then calling ",(0,s.jsx)(n.a,{href:"/docs/api#navigatetourl",children:(0,s.jsx)(n.code,{children:"navigateToUrl()"})}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Redirects are always defined with ",(0,s.jsx)(n.strong,{children:"absolute paths."})," This means that nesting a ",(0,s.jsx)(n.code,{children:"<redirect>"})," inside of a route will not behave any differently than placing the redirect at the top level. All redirects should have full paths. Leading slashes are optional in those full paths."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<redirect from="/" to="/login"></redirect>\n<redirect from="/old-settings" to="/login-settings"></redirect>\n'})}),"\n",(0,s.jsx)(n.p,{children:"In JSON, redirects are defined as a top-level property:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "routes": [],\n  "redirects": {\n    "/": "/login",\n    "/old-settings": "/settings"\n  }\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"dom-elements",children:"DOM elements"}),"\n",(0,s.jsx)(n.p,{children:"Arbitrary HTMLElements may be placed anywhere in your layout. You may define arbirary dom elements in both HTML and JSON."}),"\n",(0,s.jsx)(n.p,{children:"single-spa-layout only supports updating DOM elements during route transitions. Arbitrary re-renders and updates are not supported."}),"\n",(0,s.jsx)(n.p,{children:"DOM elements defined within a route will be mounted/unmounted as the route becomes active/inactive. If you define the same DOM element twice under different routes, it will be destroyed and recreated when navigating between the routes."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<nav class="topnav"></nav>\n<div class="main-content">\n  <button>A button</button>\n</div>\n'})}),"\n",(0,s.jsx)(n.h4,{id:"json-dom-nodes",children:"JSON DOM Nodes"}),"\n",(0,s.jsxs)(n.p,{children:["The format of dom nodes in JSON is largely based on the ",(0,s.jsx)(n.a,{href:"https://github.com/inikulin/parse5",children:"parse5"})," format."]}),"\n",(0,s.jsx)(n.h5,{id:"htmlelement",children:"HTMLElement"}),"\n",(0,s.jsxs)(n.p,{children:["Elements are defined with their ",(0,s.jsx)(n.code,{children:"nodeName"})," as the ",(0,s.jsx)(n.code,{children:"type"}),". HTML attributes are specified as the ",(0,s.jsx)(n.code,{children:"attrs"})," array, where each item is an object with ",(0,s.jsx)(n.code,{children:"name"})," and ",(0,s.jsx)(n.code,{children:"value"})," properties."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "type": "div",\n  "attrs": [\n    {\n      "name": "class",\n      "value": "blue"\n    }\n  ]\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Child nodes are specified via the ",(0,s.jsx)(n.code,{children:'"routes"'})," property."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "type": "div",\n  "routes": [\n    {\n      "type": "button"\n    }\n  ]\n}\n'})}),"\n",(0,s.jsx)(n.h5,{id:"text-nodes",children:"Text Nodes"}),"\n",(0,s.jsxs)(n.p,{children:["Text Nodes are defined separately from the parent containers, as separate objects with ",(0,s.jsx)(n.code,{children:"type"})," set to ",(0,s.jsx)(n.code,{children:"#text"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "type": "#text",\n  "value": "The displayed text"\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Button with text:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "type": "button",\n  "routes": [\n    {\n      "type": "#text",\n      "value": "The button text"\n    }\n  ]\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Note that text nodes may not have ",(0,s.jsx)(n.code,{children:"routes"})," (children)."]}),"\n",(0,s.jsx)(n.h5,{id:"comment-nodes",children:"Comment Nodes"}),"\n",(0,s.jsxs)(n.p,{children:["Comment Nodes are defined as objects whose ",(0,s.jsx)(n.code,{children:"type"})," is ",(0,s.jsx)(n.code,{children:"#comment"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "type": "#comment",\n  "value": "The comment text"\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Note that comments may not have ",(0,s.jsx)(n.code,{children:"routes"})," (children)."]}),"\n",(0,s.jsx)(n.h2,{id:"props",children:"Props"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/docs/building-applications/#lifecycle-props",children:"Single-spa custom props"})," may be defined on both ",(0,s.jsx)(n.code,{children:"route"})," and ",(0,s.jsx)(n.code,{children:"application"})," elements. Any route props will be merged together with the application props to create the final props that are passed to ",(0,s.jsx)(n.a,{href:"/docs/building-applications/#registered-application-lifecycle",children:"the single-spa lifecycle functions"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"json",children:"JSON"}),"\n",(0,s.jsxs)(n.p,{children:["In a JSON layout definition, you can define props with the ",(0,s.jsx)(n.code,{children:"props"})," property on your applications and routes:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'import { constructRoutes } from "single-spa-layout";\n\nconstructRoutes({\n  routes: [\n    { type: "application", name: "nav", props: { title: "Title" } },\n    { type: "route", path: "settings", props: { otherProp: "Some value" } },\n  ],\n});\n'})}),"\n",(0,s.jsx)(n.h3,{id:"html",children:"HTML"}),"\n",(0,s.jsx)(n.p,{children:"Defining props on JSON objects is straightforward, as they are an object that can contain strings, numbers, booleans, objects, arrays, etc. However, defining complex data types in HTML is not as straightforward, since HTML attributes are always strings. To work around this, single-spa-layout allows you to name your props in the HTML, but define their values in javascript."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<application name="settings" props="authToken,loggedInUser"></application>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'import { constructRoutes } from "single-spa-layout";\n\nconst data = {\n  props: {\n    authToken: "fds789dsfyuiosodusfd",\n    loggedInUser: fetch("/api/logged-in-user").then((r) => r.json()),\n  },\n};\n\nconst routes = constructRoutes(\n  document.querySelector("#single-spa-template"),\n  data,\n);\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The full API documentation for the ",(0,s.jsx)(n.code,{children:"constructRoutes"})," API explains the ",(0,s.jsx)(n.code,{children:"data"})," object in detail."]}),"\n",(0,s.jsx)(n.h2,{id:"loading-uis",children:"Loading UIs"}),"\n",(0,s.jsxs)(n.p,{children:["It is often desireable to show a loading UI when waiting for an application's code to download and execute. Single-spa-layout allows you to define per-application loaders that will be mounted to the DOM while the application's ",(0,s.jsx)(n.a,{href:"/docs/configuration/#loading-function-or-application",children:"loading function"})," is pending. It is possible to share the same loading UI for multiple applications."]}),"\n",(0,s.jsxs)(n.p,{children:["A loading UI is defined as either an HTML string or as a ",(0,s.jsx)(n.a,{href:"/docs/parcels-overview/#parcel-configuration",children:"parcel config object"}),". HTML strings are best for static, non-interactive loaders, whereas parcels are best when you want to use a framework (Vue, React, Angular, etc) to dynamically render the loader."]}),"\n",(0,s.jsx)(n.p,{children:"Defining loaders via javascript objects is straightforward, as they are an object that can contain strings, numbers, booleans, objects, arrays, etc. However, defining complex data types in HTML is not as straightforward, since HTML attributes are always strings. To work around this, single-spa-layout allows you to name your loaders in the HTML, but define their values in javascript."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<application name="topnav" loader="topNav"></application>\n<application name="topnav" loader="settings"></application>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { constructRoutes } from 'single-spa-layout';\n\n// You may also use Angular, Vue, etc.\nconst settingsLoader = singleSpaReact({...})\n\nconst data = {\n  loaders: {\n    topNav: `<nav class=\"placeholder\"></nav>`,\n    settings: settingsLoader\n  }\n}\n\nconst routes = constructRoutes(document.querySelector('#single-spa-template'), data)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The full API documentation for the ",(0,s.jsx)(n.code,{children:"constructRoutes"})," API explains the ",(0,s.jsx)(n.code,{children:"data"})," object in detail."]}),"\n",(0,s.jsx)(n.h2,{id:"transitions",children:"Transitions"}),"\n",(0,s.jsxs)(n.p,{children:["Support for route transitions is planned, but not yet implemented. If you have interest in this feature, please provide use cases, upvotes, and feedback in ",(0,s.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-layout/issues/11",children:"this tracking issue"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"default-routes-404-not-found",children:"Default Routes (404 Not Found)"}),"\n",(0,s.jsx)(n.p,{children:"Default routes are routes that activate when no other sibling routes match the current URL. They do not have a URL path and may contain any combination of DOM elements and single-spa applications."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<single-spa-router>\n  <route path="cart"></route>\n  <route path="product-detail"></route>\n  <route default>\n    <h1>404 Not Found</h1>\n  </route>\n</single-spa-router>\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Default routes are matched against their ",(0,s.jsx)(n.strong,{children:"sibling"})," routes, which allows for nesting:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<single-spa-router>\n  <route path="cart"></route>\n  <route path="product-detail/:productId">\n    <route path="reviews"></route>\n    <route path="images"></route>\n    <route default>\n      <h1>Unknown product page</h1>\n    </route>\n  </route>\n  <route default>\n    <h1>404 Not Found</h1>\n  </route>\n</single-spa-router>\n'})}),"\n",(0,s.jsx)(n.p,{children:'Sibling routes are defined as those that share a "nearest parent route." This means that they do not have to be direct siblings in your HTML/JSON, but can be nested within DOM elements:'}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<single-spa-router>\n  <route path="product-detail/:productId">\n    <div class="product-content">\n      <route path="reviews"></route>\n      <route path="images"></route>\n    </div>\n    \x3c!-- The reviews and images routes are siblings, since they share a nearest parent route --\x3e\n    \x3c!-- The default route will activate when the URL does not match reviews or images --\x3e\n    <route default>\n      <h1>Unknown product page</h1>\n    </route>\n  </route>\n</single-spa-router>\n'})}),"\n",(0,s.jsx)(n.h2,{id:"error-uis",children:"Error UIs"}),"\n",(0,s.jsxs)(n.p,{children:["When a single-spa application fails to load, mount, or unmount, it moves to ",(0,s.jsx)(n.a,{href:"/docs/api#getappstatus",children:"SKIP_BECAUSE_BROKEN or LOAD_ERROR"})," status. When in SKIP_BECAUSE_BROKEN status, often nothing is visible to the user and they won't understand why the application is not showing. You can call ",(0,s.jsx)(n.a,{href:"/docs/api#unloadapplication",children:"unloadApplication"})," to move the application back to NOT_LOADED status, which will cause single-spa to re-attempt downloading and mounting it. However, it is often desireable to show an error state when the application errors."]}),"\n",(0,s.jsxs)(n.p,{children:["An error UI is defined as either an HTML string or as a ",(0,s.jsx)(n.a,{href:"/docs/parcels-overview/#parcel-configuration",children:"parcel config object"}),". HTML strings are best for static, non-interactive error states, whereas parcels are best when you want to use a framework (Vue, React, Angular, etc) to dynamically render the error state. The error UI will be shown whenever the application's status is SKIP_BECAUSE_BROKEN or LOAD_ERROR."]}),"\n",(0,s.jsxs)(n.p,{children:["Note that Error UI parcels are given a prop called ",(0,s.jsx)(n.code,{children:"error"})," that is the Error that caused the application to fail in loading/mounting."]}),"\n",(0,s.jsxs)(n.p,{children:["Defining error uis via javascript objects is straightforward, as the string or parcel can be defined in an application object via the ",(0,s.jsx)(n.code,{children:"error"})," property:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'{\n  "type": "application",\n  "name": "nav",\n  "error": "<h1>Oops! The navbar isn\'t working right now</h1>"\n}\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'const myErrorParcel = singleSpaReact({...})\n\n{\n  "type": "application",\n  "name": "nav",\n  "error": myErrorParcel\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"However, defining error uis in HTML is less straightforward, since HTML attributes are always strings and therefore can't be a parcel config object. To work around this, error UIs are named in the HTML, but defined in javascript:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<template id="single-spa-layout">\n  <single-spa-router>\n    <application name="nav" error="navError"></application>\n  </single-spa-router>\n</template>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const myErrorParcel = singleSpaReact({...})\n\nconst routes = constructRoutes(document.querySelector('#single-spa-layout'), {\n  errors: {\n    navError: myErrorParcel\n    // alternatively:\n    // navError: \"<h1>Oops! The navbar isn't working right now</h1>\"\n  }\n})\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>r});var a=t(6540);const s={},i=a.createContext(s);function o(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);