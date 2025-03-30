"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2723],{7251:(n,i,e)=>{e.r(i),e.d(i,{assets:()=>r,contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"configuration","title":"Configuring single-spa","description":"The single-spa root config consists of the following:","source":"@site/versioned_docs/version-4.x/single-spa-config.md","sourceDirName":".","slug":"/configuration","permalink":"/docs/4.x/configuration","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-4.x/single-spa-config.md","tags":[],"version":"4.x","frontMatter":{"id":"configuration","title":"Configuring single-spa","sidebar_label":"Configuring single-spa"},"sidebar":"docs","previous":{"title":"Resources","permalink":"/docs/4.x/examples"},"next":{"title":"single-spa applications","permalink":"/docs/4.x/building-applications"}}');var o=e(4848),a=e(8453);const s={id:"configuration",title:"Configuring single-spa",sidebar_label:"Configuring single-spa"},l=void 0,r={},c=[{value:"index.html file",id:"indexhtml-file",level:2},{value:"Registering applications",id:"registering-applications",level:2},{value:"Application name",id:"application-name",level:3},{value:"Loading Function or Application",id:"loading-function-or-application",level:3},{value:"Application as second argument",id:"application-as-second-argument",level:4},{value:"Loading function",id:"loading-function",level:4},{value:"Activity function",id:"activity-function",level:3},{value:"Calling singleSpa.start()",id:"calling-singlespastart",level:2},{value:"Two registered applications simultaneously??",id:"two-registered-applications-simultaneously",level:2}];function p(n){const i={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.p,{children:"The single-spa root config consists of the following:"}),"\n",(0,o.jsxs)(i.ol,{children:["\n",(0,o.jsx)(i.li,{children:"The root HTML file that is shared by all single-spa applications."}),"\n",(0,o.jsxs)(i.li,{children:["The JavaScript that calls ",(0,o.jsx)(i.a,{href:"/docs/api#registerapplication",children:(0,o.jsx)(i.code,{children:"singleSpa.registerApplication()"})}),"."]}),"\n"]}),"\n",(0,o.jsx)(i.p,{children:"Your root config exists only to start up the single-spa applications."}),"\n",(0,o.jsx)(i.h2,{id:"indexhtml-file",children:"index.html file"}),"\n",(0,o.jsxs)(i.p,{children:["See ",(0,o.jsx)(i.a,{href:"http://single-spa-playground.org/playground/html-file",children:"this example root config"})," for what a root HTML file looks like.\nNotice how it does not have any divs or buttons, but just calls ",(0,o.jsx)(i.code,{children:"registerApplication()"}),"."]}),"\n",(0,o.jsxs)(i.p,{children:[(0,o.jsx)(i.strong,{children:"You do not have to use SystemJS when using single-spa"}),", but many examples and tutorials will encourage you to do so because\nit allows you to ",(0,o.jsx)(i.a,{href:"/docs/separating-applications",children:"independently deploy"})," your applications."]}),"\n",(0,o.jsx)(i.h2,{id:"registering-applications",children:"Registering applications"}),"\n",(0,o.jsxs)(i.p,{children:["You must register ",(0,o.jsx)(i.a,{href:"/docs/4.x/building-applications",children:"applications"})," with single-spa so it knows how and when to\ninitiate, load, mount, and unmount each application. Registration most commonly occurs inside of the single-spa config but\ndoes not have to. Note that if an application is registered from within another application, no hierarchy will be\nmaintained between the applications. Instead, the applications will be siblings and will be mounted\nand unmounted according to their own activity functions."]}),"\n",(0,o.jsxs)(i.p,{children:["In order to register an application, call the ",(0,o.jsx)(i.code,{children:"registerApplication(name, howToLoad, activityFunction)"})," api. Example:"]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{className:"language-js",children:'// single-spa-config.js\nimport { registerApplication, start } from "single-spa";\n\nregisterApplication("applicationName", loadingFunction, activityFunction);\nstart();\n\nfunction loadingFunction() {\n  return import("src/app1/main.js");\n}\n\nfunction activityFunction(location) {\n  return location.pathname.indexOf("/app1/") === 0;\n}\n'})}),"\n",(0,o.jsx)(i.h3,{id:"application-name",children:"Application name"}),"\n",(0,o.jsxs)(i.p,{children:["The first argument to ",(0,o.jsx)(i.code,{children:"registerApplication"})," must be a string name."]}),"\n",(0,o.jsx)(i.h3,{id:"loading-function-or-application",children:"Loading Function or Application"}),"\n",(0,o.jsxs)(i.p,{children:["The second argument to ",(0,o.jsx)(i.code,{children:"registerApplication"})," must be either a function that returns a promise ",(0,o.jsx)(i.a,{href:"configuration#loading-function",children:"loading function"})," or the resolved Application."]}),"\n",(0,o.jsx)(i.h4,{id:"application-as-second-argument",children:"Application as second argument"}),"\n",(0,o.jsx)(i.p,{children:"Optionally for the second argument you can use the resolved Application, consisting of an object with the lifecycle methods.\nThis allows you import the Application from another file or define applications inline in your single-spa-config"}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{className:"language-js",children:'const application = {\n  bootstrap: () => Promise.resolve(), //bootstrap function\n  mount: () => Promise.resolve(), //mount function\n  unmount: () => Promise.resolve(), //unmount function\n};\nregisterApplication("applicationName", application, activityFunction);\n'})}),"\n",(0,o.jsx)(i.h4,{id:"loading-function",children:"Loading function"}),"\n",(0,o.jsxs)(i.p,{children:["The second argument to ",(0,o.jsx)(i.code,{children:"registerApplication"})," must be a function that returns a promise (or an ",(0,o.jsx)(i.a,{href:"https://ponyfoo.com/articles/understanding-javascript-async-await",children:'"async function"'}),").\nThe function will be called with no arguments when it's time to load the application for the first time. The returned\npromise must be resolved with the application. The most common implementation of a loading function is an import call:\n",(0,o.jsx)(i.code,{children:"() => import('/path/to/application.js')"})]}),"\n",(0,o.jsx)(i.h3,{id:"activity-function",children:"Activity function"}),"\n",(0,o.jsxs)(i.p,{children:["The third argument to ",(0,o.jsx)(i.code,{children:"registerApplication"})," must be a pure function, the function is provided ",(0,o.jsx)(i.code,{children:"window.location"})," as the first argument, and returns a truthy\nvalue whenever the application should be active. Most commonly, the activity function determines if an application\nis active by looking at ",(0,o.jsx)(i.code,{children:"window.location"}),"/the first param."]}),"\n",(0,o.jsx)(i.p,{children:"Another way of looking at this is that single-spa is a top-level router that has a lot of applications that have their own sub-router."}),"\n",(0,o.jsx)(i.p,{children:"single-spa will call each application's activity function under the following scenarios:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsxs)(i.li,{children:[(0,o.jsx)(i.code,{children:"hashchange"})," or ",(0,o.jsx)(i.code,{children:"popstate"})," event"]}),"\n",(0,o.jsxs)(i.li,{children:[(0,o.jsx)(i.code,{children:"pushState"})," or ",(0,o.jsx)(i.code,{children:"replaceState"})," is called"]}),"\n",(0,o.jsxs)(i.li,{children:[(0,o.jsx)(i.a,{href:"/docs/4.x/api#triggerappchange",children:(0,o.jsx)(i.code,{children:"triggerAppChange"})})," api is called on single-spa"]}),"\n",(0,o.jsxs)(i.li,{children:["Whenever the ",(0,o.jsx)(i.code,{children:"checkActivityFunctions"})," method is called"]}),"\n"]}),"\n",(0,o.jsx)(i.h2,{id:"calling-singlespastart",children:"Calling singleSpa.start()"}),"\n",(0,o.jsxs)(i.p,{children:["The ",(0,o.jsxs)(i.a,{href:"/docs/4.x/api#start",children:[(0,o.jsx)(i.code,{children:"start()"})," api"]})," ",(0,o.jsx)(i.strong,{children:"must"})," be called by your single spa config in order for\napplications to actually be mounted. Before ",(0,o.jsx)(i.code,{children:"start"})," is called, applications will be loaded, but not bootstrapped/mounted/unmounted.\nThe reason for ",(0,o.jsx)(i.code,{children:"start"})," is to give you control over performance. For example, you may want to register applications\nimmediately (to start downloading the code for the active ones), but not actually mount the applications\nuntil an initial AJAX request (maybe to get information about the logged in user) has been completed. In that case,\nthe best performance is achieved by calling ",(0,o.jsx)(i.code,{children:"registerApplication"})," immediately, but calling ",(0,o.jsx)(i.code,{children:"start"})," after\nthe AJAX request is completed."]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{className:"language-js",children:'//single-spa-config.js\nimport { start } from "single-spa";\n\n/* Calling start before registering apps means that single-spa can immediately mount apps, without\n * waiting for any initial setup of the single page app.\n */\nstart();\n\n// Register applications....\n'})}),"\n",(0,o.jsx)(i.h2,{id:"two-registered-applications-simultaneously",children:"Two registered applications simultaneously??"}),"\n",(0,o.jsxs)(i.p,{children:["Yep, it's possible. And it's actually not that scary if you do it right. And once you do,\nit's really really powerful. One approach to do this is to create a ",(0,o.jsx)(i.code,{children:'<div id="app-name"></div>'})," for each app,\nso that they never try to modify the same DOM at the same time."]})]})}function d(n={}){const{wrapper:i}={...(0,a.R)(),...n.components};return i?(0,o.jsx)(i,{...n,children:(0,o.jsx)(p,{...n})}):p(n)}},8453:(n,i,e)=>{e.d(i,{R:()=>s,x:()=>l});var t=e(6540);const o={},a=t.createContext(o);function s(n){const i=t.useContext(a);return t.useMemo((function(){return"function"==typeof n?n(i):{...i,...n}}),[i,n])}function l(n){let i;return i=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:s(n.components),t.createElement(a.Provider,{value:i},n.children)}}}]);