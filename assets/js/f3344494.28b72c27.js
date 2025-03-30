"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6628],{2928:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"building-applications","title":"Building single-spa applications","description":"A single-spa registered application is everything that a normal SPA is, except that it doesn\'t have an HTML page. In a single-spa world, your SPA contains many registered applications, where each has its own framework. Registered applications have their own client-side routing and their own frameworks/libraries. They render their own HTML and have full freedom to do whatever they want, whenever they are mounted. The concept of being mounted refers to whether a registered application is putting content on the DOM or not. What determines if a registered application is mounted is its activity function. Whenever a registered application is not mounted, it should remain completely dormant until mounted.","source":"@site/versioned_docs/version-4.x/building-applications.md","sourceDirName":".","slug":"/building-applications","permalink":"/docs/4.x/building-applications","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-4.x/building-applications.md","tags":[],"version":"4.x","frontMatter":{"id":"building-applications","title":"Building single-spa applications","sidebar_label":"single-spa applications"},"sidebar":"docs","previous":{"title":"Configuring single-spa","permalink":"/docs/4.x/configuration"},"next":{"title":"Splitting applications","permalink":"/docs/4.x/separating-applications"}}');var o=i(4848),s=i(8453);const a={id:"building-applications",title:"Building single-spa applications",sidebar_label:"single-spa applications"},r=void 0,l={},c=[{value:"Creating a registered application",id:"creating-a-registered-application",level:2},{value:"Registered application lifecycle",id:"registered-application-lifecycle",level:2},{value:"Lifecyle props",id:"lifecyle-props",level:2},{value:"Built-in props",id:"built-in-props",level:4},{value:"Custom props",id:"custom-props",level:4},{value:"Lifecycle helpers",id:"lifecycle-helpers",level:3},{value:"Load",id:"load",level:3},{value:"Bootstrap",id:"bootstrap",level:3},{value:"Mount",id:"mount",level:3},{value:"Unmount",id:"unmount",level:3},{value:"Unload",id:"unload",level:3},{value:"Timeouts",id:"timeouts",level:2},{value:"Transitioning between applications",id:"transitioning-between-applications",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["A single-spa registered application is everything that a normal SPA is, except that it doesn't have an HTML page. In a single-spa world, your SPA contains many registered applications, where each has its own framework. Registered applications have their own client-side routing and their own frameworks/libraries. They render their own HTML and have full freedom to do whatever they want, whenever they are ",(0,o.jsx)(n.em,{children:"mounted"}),". The concept of being ",(0,o.jsx)(n.em,{children:"mounted"})," refers to whether a registered application is putting content on the DOM or not. What determines if a registered application is mounted is its ",(0,o.jsx)(n.a,{href:"configuration#activity-function",children:"activity function"}),". Whenever a registered application is ",(0,o.jsx)(n.em,{children:"not mounted"}),", it should remain completely dormant until mounted."]}),"\n",(0,o.jsx)(n.h2,{id:"creating-a-registered-application",children:"Creating a registered application"}),"\n",(0,o.jsxs)(n.p,{children:["To create a registered application, first ",(0,o.jsx)(n.a,{href:"configuration#registering-applications",children:"register the application with single-spa"}),". Once registered, the registered application must correctly implement ",(0,o.jsx)(n.strong,{children:"all"})," of the following lifecycle functions inside of its main entry point."]}),"\n",(0,o.jsx)(n.h2,{id:"registered-application-lifecycle",children:"Registered application lifecycle"}),"\n",(0,o.jsxs)(n.p,{children:["During the course of a single-spa page, registered applications are loaded, bootstrapped (initialized), mounted, unmounted, and unloaded. single-spa provides hooks into each phase via ",(0,o.jsx)(n.code,{children:"lifecycles"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"A lifecycle function is a function or array of functions that single-spa will call on a registered application. single-spa calls these by finding specific named exports from the registered application's main file."}),"\n",(0,o.jsx)(n.p,{children:"Notes:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Implementing ",(0,o.jsx)(n.code,{children:"mount"})," and ",(0,o.jsx)(n.code,{children:"unmount"})," is required. But implementing ",(0,o.jsx)(n.code,{children:"bootstrap"})," and ",(0,o.jsx)(n.code,{children:"unload"})," is optional."]}),"\n",(0,o.jsxs)(n.li,{children:["Each lifecycle function must either return a ",(0,o.jsx)(n.code,{children:"Promise"})," or be an ",(0,o.jsx)(n.code,{children:"async function"}),"."]}),"\n",(0,o.jsx)(n.li,{children:"If an array of functions is exported (instead of just one function), the functions will be called\none-after-the-other, waiting for the resolution of one function's promise before calling the next."}),"\n",(0,o.jsxs)(n.li,{children:["If single-spa is ",(0,o.jsx)(n.a,{href:"/docs/4.x/api#start",children:"not started"}),", applications will be loaded,\nbut will not be bootstrapped, mounted or unmounted."]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["Framework-specific helper libraries exist in the ",(0,o.jsx)(n.a,{href:"/docs/4.x/ecosystem",children:"single-spa ecosystem"})," to implement these required lifecycle methods. This documentation is helpful for understanding what those helpers are doing, or for implementing your own."]})}),"\n",(0,o.jsx)(n.h2,{id:"lifecyle-props",children:"Lifecyle props"}),"\n",(0,o.jsxs)(n.p,{children:["Lifecycle functions are called with a ",(0,o.jsx)(n.code,{children:"props"})," argument, which is an object with some guaranteed information and additional custom information."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"function bootstrap(props) {\n  const {\n    name, // The name of the application\n    singleSpa, // The singleSpa instance\n    mountParcel, // Function for manually mounting\n    customProps, // Additional custom information\n  } = props; // Props are given to every lifecycle\n  return Promise.resolve();\n}\n"})}),"\n",(0,o.jsx)(n.h4,{id:"built-in-props",children:"Built-in props"}),"\n",(0,o.jsx)(n.p,{children:"Each lifecycle function is guranteed to be called with the following props:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"name"}),": The string name that was registered to single-spa."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"singleSpa"}),": A reference to the singleSpa instance, itself. This is intended to allow applications and helper libraries to call singleSpa\nAPIs without having to import it. This is useful in situations where there are multiple webpack configs that are not set up to ensure\nthat only one instance of singleSpa is loaded."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"mountParcel"}),": The ",(0,o.jsx)(n.a,{href:"/docs/parcels-api#mountparcel",children:"mountParcel function"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.h4,{id:"custom-props",children:"Custom props"}),"\n",(0,o.jsxs)(n.p,{children:["In addition to the built-in props that are provided by single-spa, you may optionally specify custom props to be passed to an application by providing a fourth argument to ",(0,o.jsx)(n.code,{children:"registerApplication"}),". These ",(0,o.jsx)(n.em,{children:"customProps"})," will be passed into each lifecycle method."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",metastring:'title="root.application.js"',children:'singleSpa.registerApplication(\n  "app1",\n  () => {},\n  () => {},\n  { authToken: "d83jD63UdZ6RS6f70D0" },\n);\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",metastring:'title="app1.js"',children:"export function mount(props) {\n  console.log(props.customProps.authToken); // do something with the common authToken in app1\n  return reactLifecycles.mount(props);\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"Some use cases could be to:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"share a common access token with all child apps"}),"\n",(0,o.jsx)(n.li,{children:"pass down some initialization information, like the rendering target"}),"\n",(0,o.jsx)(n.li,{children:"pass a reference to a common event bus so each app may talk to each other"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Note that when no ",(0,o.jsx)(n.em,{children:"customProps"})," are provided during registration, ",(0,o.jsx)(n.code,{children:"props.customProps"})," defaults to an empty object."]}),"\n",(0,o.jsx)(n.h3,{id:"lifecycle-helpers",children:"Lifecycle helpers"}),"\n",(0,o.jsxs)(n.p,{children:["Some helper libraries that implement lifecycle functions for ease of use are available for many popular frameworks/libraries. Learn more on the ",(0,o.jsx)(n.a,{href:"/docs/4.x/ecosystem",children:"Ecosystem page"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"load",children:"Load"}),"\n",(0,o.jsxs)(n.p,{children:["When registered applications are being lazily loaded, this refers to when the code for a registered application is fetched from the server and executed. This will happen once the registered application's ",(0,o.jsx)(n.a,{href:"configuration#activity-function",children:"activity function"})," returns a truthy value for the first time. It is best practice to do as little as possible / nothing at all during ",(0,o.jsx)(n.code,{children:"load"}),", but instead to wait until the bootstrap lifecycle function to do anything. If you need to do something during ",(0,o.jsx)(n.code,{children:"load"}),", simply put the code into a registered application's main entry point, but not inside of an exported function. For example:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:'console.log("The registered application has been loaded!");\n\nexport async function bootstrap(props) {...}\nexport async function mount(props) {...}\nexport async function unmount(props) {...}\n'})}),"\n",(0,o.jsx)(n.h3,{id:"bootstrap",children:"Bootstrap"}),"\n",(0,o.jsx)(n.p,{children:"This lifecycle function will be called once, right before the registered application is mounted for the first time."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:'export function bootstrap(props) {\n  return Promise.resolve().then(() => {\n    // One-time initialization code goes here\n    console.log("bootstrapped!");\n  });\n}\n'})}),"\n",(0,o.jsx)(n.h3,{id:"mount",children:"Mount"}),"\n",(0,o.jsxs)(n.p,{children:["This lifecycle function will be called whenever the registered application is not mounted, but its ",(0,o.jsx)(n.a,{href:"configuration#activity-function",children:"activity function"})," returns a truthy value. When called, this function should look at the URL to determine the active route and then create DOM elements, DOM event listeners, etc. to render content to the user. Any subsequent routing events (such as ",(0,o.jsx)(n.code,{children:"hashchange"})," and ",(0,o.jsx)(n.code,{children:"popstate"}),") will ",(0,o.jsx)(n.strong,{children:"not"})," trigger more calls to ",(0,o.jsx)(n.code,{children:"mount"}),", but instead should be handled by the application itself."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:'export function mount(props) {\n  return Promise.resolve().then(() => {\n    // Do framework UI rendering here\n    console.log("mounted!");\n  });\n}\n'})}),"\n",(0,o.jsx)(n.h3,{id:"unmount",children:"Unmount"}),"\n",(0,o.jsxs)(n.p,{children:["This lifecycle function will be called whenever the registered application is mounted, but its ",(0,o.jsx)(n.a,{href:"configuration#activity-function",children:"activity function"})," returns a falsy value. When called, this function should clean up all DOM elements, DOM event listeners, leaked memory, globals, observable subscriptions, etc. that were created at any point when the registered application was mounted."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:'export function unmount(props) {\n  return Promise.resolve().then(() => {\n    // Do framework UI unrendering here\n    console.log("unmounted!");\n  });\n}\n'})}),"\n",(0,o.jsx)(n.h3,{id:"unload",children:"Unload"}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"unload"})," lifecycle is an optionally implemented lifecycle function. It will be called whenever an application should be ",(0,o.jsx)(n.code,{children:"unloaded"}),". This will not ever happen unless someone calls the ",(0,o.jsx)(n.a,{href:"/docs/4.x/api#unloadapplication",children:(0,o.jsx)(n.code,{children:"unloadApplication"})})," API. If a registered application does not implement the unload lifecycle, then it assumed that unloading the app is a no-op."]}),"\n",(0,o.jsxs)(n.p,{children:["The purpose of the ",(0,o.jsx)(n.code,{children:"unload"})," lifecycle is to perform logic right before a single-spa application is unloaded. Once the application is unloaded, the application status will be NOT_LOADED and the application will be re-bootstrapped."]}),"\n",(0,o.jsxs)(n.p,{children:["The motivation for ",(0,o.jsx)(n.code,{children:"unload"})," was to implement the hot-loading of entire registered applications, but it is useful in other scenarios as well when you want to re-bootstrap applications, but perform some logic before applications are re-bootstrapped."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:'export function unload(props) {\n  return Promise.resolve().then(() => {\n    // Hot-reloading implementation goes here\n    console.log("unloaded!");\n  });\n}\n'})}),"\n",(0,o.jsx)(n.h2,{id:"timeouts",children:"Timeouts"}),"\n",(0,o.jsxs)(n.p,{children:["By default, registered applications obey the global dieOnTimeout configuration, but can override that behavior for their specific application. This is done by exporting a ",(0,o.jsx)(n.code,{children:"timeouts"})," object from the main entry point of the registered application. Example:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",metastring:'title="app-1.js"',children:"export function bootstrap(props) {...}\nexport function mount(props) {...}\nexport function unmount(props) {...}\n\nexport const timeouts = {\n  bootstrap: {\n    millis: 5000,\n    dieOnTimeout: true,\n  },\n  mount: {\n    millis: 5000,\n    dieOnTimeout: false,\n  },\n  unmount: {\n    millis: 5000,\n    dieOnTimeout: true,\n  },\n  unload: {\n    millis: 5000,\n\tdieOnTimeout: true,\n  },\n};\n"})}),"\n",(0,o.jsx)(n.h2,{id:"transitioning-between-applications",children:"Transitioning between applications"}),"\n",(0,o.jsxs)(n.p,{children:["If you find yourself wanting to add transitions as applications are mounted and unmounted, then you'll probably want to tie into the ",(0,o.jsx)(n.code,{children:"bootstrap"}),", ",(0,o.jsx)(n.code,{children:"mount"}),", and ",(0,o.jsx)(n.code,{children:"unmount"})," lifecycle methods. This ",(0,o.jsx)(n.a,{href:"https://github.com/frehner/singlespa-transitions",children:"single-spa transitions"})," repo is a small proof-of-concept of how you can tie into these lifecycle methods to add transitions as your apps mount and unmount."]}),"\n",(0,o.jsxs)(n.p,{children:["Transitions for pages within a mounted application can be handled entirely by the application itself. For example, using ",(0,o.jsx)(n.a,{href:"https://github.com/reactjs/react-transition-group",children:"react-transition-group"})," for React-based projects."]})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var t=i(6540);const o={},s=t.createContext(o);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);