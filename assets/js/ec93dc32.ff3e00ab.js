"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3447],{1781:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"parcels-overview","title":"Parcels","description":"Parcels are an advanced feature of single-spa. We recommend that you use applications as the primary type of microfrontend in your architecture. See this explanation for more details","source":"@site/versioned_docs/version-6.x/parcels-overview.md","sourceDirName":".","slug":"/parcels-overview","permalink":"/docs/parcels-overview","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-6.x/parcels-overview.md","tags":[],"version":"6.x","frontMatter":{"id":"parcels-overview","title":"Parcels","sidebar_label":"Overview"},"sidebar":"docs","previous":{"title":"Migrating existing code","permalink":"/docs/migrating-existing-spas"},"next":{"title":"Unit testing","permalink":"/docs/testing/units"}}');var a=t(4848),r=t(8453);const s={id:"parcels-overview",title:"Parcels",sidebar_label:"Overview"},i=void 0,l={},c=[{value:"Quick Example",id:"quick-example",level:2},{value:"Parcel configuration",id:"parcel-configuration",level:2},{value:"Parcel Lifecycles",id:"parcel-lifecycles",level:2},{value:"Bootstrap",id:"bootstrap",level:3},{value:"Mount",id:"mount",level:3},{value:"Unmount",id:"unmount",level:3},{value:"Update (optional)",id:"update-optional",level:3},{value:"Example use cases",id:"example-use-cases",level:2},{value:"Modals",id:"modals",level:3},{value:"<code>mountRootParcel</code> vs <code>mountParcel</code>",id:"mountrootparcel-vs-mountparcel",level:2},{value:"Which should I use?",id:"which-should-i-use",level:3},{value:"How do I get the <code>mountParcel</code> API?",id:"how-do-i-get-the-mountparcel-api",level:3}];function p(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:(0,a.jsxs)(n.em,{children:["Parcels are an advanced feature of single-spa. We recommend that you use applications as the primary type of microfrontend in your architecture. See ",(0,a.jsx)(n.a,{href:"/docs/module-types",children:"this explanation"})," for more details"]})}),"\n",(0,a.jsx)(n.p,{children:"A single-spa parcel is a framework agnostic component. It is a chunk of functionality meant to be mounted manually by an application, without having to worry about which framework was used to implement the parcel or application. Parcels use similar methodology as registered applications but are mounted by a manual function call rather than the activity function.\nA parcel can be as large as an application or as small as a component and written in\nany language as long as it exports the correct lifecycle events. In a single-spa world, your SPA contains\nmany registered applications and potentially many parcels. Typically we recommend you mount a parcel within\nthe context of an application because the parcel will be unmounted with the application."}),"\n",(0,a.jsxs)(n.p,{children:["If you are only using one framework, it is recommended to prefer framework components (i.e., React, Vue, and Angular components) over single-spa parcels. This is because framework components interop easier with each other than when there is an intermediate layer of single-spa parcels. You may import components between registered applications via ",(0,a.jsx)(n.code,{children:"import"})," statements. You should only create a single-spa parcel if you need it to work with multiple frameworks. (",(0,a.jsx)(n.a,{href:"/docs/recommended-setup#in-browser-versus-build-time-modules",children:"More details"}),")"]}),"\n",(0,a.jsx)(n.h2,{id:"quick-example",children:"Quick Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'// The parcel implementation\nconst parcelConfig = {\n  // optional\n  bootstrap(props) {\n    // one time initialization\n    return Promise.resolve();\n  },\n  // required\n  mount(props) {\n    // use a framework to create dom nodes and mount the parcel\n    return Promise.resolve();\n  },\n  // required\n  unmount(props) {\n    // use a framework to unmount dom nodes and perform other cleanup\n    return Promise.resolve();\n  },\n  // optional\n  update(props) {\n    // use a framework to update dom nodes\n    return Promise.resolve();\n  },\n};\n\n// How to mount the parcel\nconst domElement = document.getElementById("place-in-dom-to-mount-parcel");\nconst parcelProps = { domElement, customProp1: "foo" };\nconst parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps);\n\n// The parcel is being mounted. We can wait for it to finish with the mountPromise.\nparcel.mountPromise\n  .then(() => {\n    console.log("finished mounting parcel!");\n    // If we want to re-render the parcel, we can call the update lifecycle method, which returns a promise\n    parcelProps.customProp1 = "bar";\n    return parcel.update(parcelProps);\n  })\n  .then(() => {\n    // Call the unmount lifecycle when we need the parcel to unmount. This function also returns a promise\n    return parcel.unmount();\n  });\n'})}),"\n",(0,a.jsx)(n.h2,{id:"parcel-configuration",children:"Parcel configuration"}),"\n",(0,a.jsxs)(n.p,{children:["A parcel is just an object with 3 or 4 functions on it. When mounting a parcel, you can provide either the object itself or a loading function that asynchronously downloads the parcel object.\nEach function on a parcel object is a lifecycle method, which is a function that returns a promise. Parcels have two required lifecycle methods (mount and unmount) and two optional lifecycles method (bootstrap and update).\nWhen implementing a parcel, it's strongly recommended that you use the ",(0,a.jsx)(n.a,{href:"/docs/ecosystem/#help-for-frameworks",children:"lifecycle helper methods"}),".\nAn example of a parcel written in React would look like this:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",metastring:'title="myParcel.js"',children:'import React from "react";\nimport ReactDOM from "react-dom";\nimport singleSpaReact from "single-spa-react";\nimport MyParcelComponent from "./my-parcel-component.component.js";\nexport const MyParcel = singleSpaReact({\n  React,\n  ReactDOM,\n  rootComponent: MyParcelComponent,\n});\n\n// in this case singleSpaReact is taking our inputs and generating an object with the required lifecycles.\n'})}),"\n",(0,a.jsxs)(n.p,{children:["Then to use the parcel you just created all you need to do is use the ",(0,a.jsx)(n.code,{children:"Parcel"})," component provided in ",(0,a.jsx)(n.a,{href:"/docs/ecosystem-react/#parcels",children:"single-spa-react"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-jsx",metastring:'title="mycomponent.js"',children:"import Parcel from 'single-spa-react/parcel'\nimport { MyParcel } from './myparcel.js'\n\nexport class myComponent extends React.Component {\n  render () {\n    return (\n      <Parcel\n        config={MyParcel}\n        { /* optional props */ }\n        { /* and any extra props you want here */ }\n      />\n    )\n  }\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Note that in some cases the optional props are required ",(0,a.jsx)(n.a,{href:"/docs/ecosystem-react/#examples",children:"(see additional examples)"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"parcel-lifecycles",children:"Parcel Lifecycles"}),"\n",(0,a.jsxs)(n.p,{children:["Start with ",(0,a.jsx)(n.a,{href:"/docs/api/#registered-application-lifecycle",children:"applications"})," to learn more about the functionality of single-spa's lifecycle methods."]}),"\n",(0,a.jsx)(n.h3,{id:"bootstrap",children:"Bootstrap"}),"\n",(0,a.jsx)(n.p,{children:"This lifecycle function will be called once, right before the parcel is\nmounted for the first time."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'function bootstrap(props) {\n  return Promise.resolve().then(() => {\n    // This is where you do one-time initialization\n    console.log("bootstrapped!");\n  });\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"mount",children:"Mount"}),"\n",(0,a.jsxs)(n.p,{children:["If the parcel is not mounted this lifecycle function is called when ever ",(0,a.jsx)(n.code,{children:"mountParcel"})," is called. When\ncalled, this function should create DOM elements, DOM event listeners, etc. to render content to the user."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'function mount(props) {\n  return Promise.resolve().then(() => {\n    // This is where you tell a framework (e.g., React) to render some ui to the dom\n    console.log("mounted!");\n  });\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"unmount",children:"Unmount"}),"\n",(0,a.jsx)(n.p,{children:"This lifecycle function will be called whenever the parcel is mounted and one of the following cases is true:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"unmount()"})," is called"]}),"\n",(0,a.jsx)(n.li,{children:"The parent parcel or application is unmounted"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"When called, this function should clean up all DOM elements, DOM event listeners, leaked memory, globals,\nobservable subscriptions, etc. that were created at any point when the parcel was mounted."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'function unmount(props) {\n  return Promise.resolve().then(() => {\n    // This is where you tell a framework (e.g., React) to unrender some ui from the dom\n    console.log("unmounted!");\n  });\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"update-optional",children:"Update (optional)"}),"\n",(0,a.jsxs)(n.p,{children:["The update lifecycle function will be called whenever the user of the parcel calls ",(0,a.jsx)(n.code,{children:"parcel.update()"}),".\nSince this lifecycle is optional, the user of a parcel needs to check whether the parcel has implemented the update lifecycle before attempting to make the call."]}),"\n",(0,a.jsx)(n.h2,{id:"example-use-cases",children:"Example use cases"}),"\n",(0,a.jsx)(n.h3,{id:"modals",children:"Modals"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"App1"})," handles everything related to contacts (highly cohesive) but somewhere in ",(0,a.jsx)(n.code,{children:"App2"})," we need to create a contact.\nWe could do any number of things to share the functionality between application 1 and 2:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"If both are written in the same framework we could export/import components."}),"\n",(0,a.jsx)(n.li,{children:"We could reimplement creating a contact (loss of cohesion)"}),"\n",(0,a.jsx)(n.li,{children:"We could use single-spa parcels."}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Exporting a parcel from ",(0,a.jsx)(n.code,{children:"App1"})," that wraps the createContact modal component gives us the ability to share components and behavior across disparate frameworks, without losing application cohesion.\nApp1 can export a modal as a single-spa parcel and App2 can import the parcel and use it easily. One major advantage is that in the below example\nthe parcel/modal from App1 that is being used by App2 will also be unmounted, without unmounting/mounting of App1."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"// App1\nexport const AddContactParcel = {\n  bootstrap: bootstrapFn,\n  mount: mountFn,\n  unmount: unmountFn,\n}\n\n// App2\n// get the parcel configuration in this case I'm using systemJS and react\n...\ncomponentDidMount() {\n  SystemJS.import('App1').then(App1 => {\n    const domElement = document.body\n    App2MountProps.mountParcel(App1.AddContactParcel, {domElement})\n  })\n}\n...\n"})}),"\n",(0,a.jsxs)(n.h2,{id:"mountrootparcel-vs-mountparcel",children:[(0,a.jsx)(n.code,{children:"mountRootParcel"})," vs ",(0,a.jsx)(n.code,{children:"mountParcel"})]}),"\n",(0,a.jsx)(n.p,{children:"Single spa exposes two APIs for working with parcels. These API's are differentiated primarily by the context in which the parcel is created and how to access the API's"}),"\n",(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{}),(0,a.jsx)(n.th,{children:"mountRootParcel"}),(0,a.jsx)(n.th,{children:"mountParcel"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:"context"}),(0,a.jsx)(n.td,{children:"singleSpa"}),(0,a.jsx)(n.td,{children:"application"})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:"unmount condition"}),(0,a.jsx)(n.td,{children:"manual only"}),(0,a.jsx)(n.td,{children:"manual + application unmount"})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:"api location"}),(0,a.jsx)(n.td,{children:"singleSpa named export"}),(0,a.jsx)(n.td,{children:"provided in lifecycle prop"})]})]})]}),"\n",(0,a.jsx)(n.h3,{id:"which-should-i-use",children:"Which should I use?"}),"\n",(0,a.jsxs)(n.p,{children:["In general we suggest using the application-aware ",(0,a.jsx)(n.code,{children:"mountParcel"})," API. ",(0,a.jsx)(n.code,{children:"mountParcel"})," allows you to treat the parcel just like a component inside your application without considering what framework it was written in and being forced to remember to call unmount."]}),"\n",(0,a.jsxs)(n.h3,{id:"how-do-i-get-the-mountparcel-api",children:["How do I get the ",(0,a.jsx)(n.code,{children:"mountParcel"})," API?"]}),"\n",(0,a.jsxs)(n.p,{children:["In order to keep the function contextually bound to an application it is provided to the application as a ",(0,a.jsx)(n.a,{href:"/docs/building-applications/#lifecycle-props",children:"lifecycle prop"}),". You will need to store and manage that function yourself in your application."]}),"\n",(0,a.jsxs)(n.p,{children:["Example of storing the application specific ",(0,a.jsx)(n.code,{children:"mountParcel"})," API:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"// App1\nlet mountParcel\nexport const bootstrap = [\n  (props) => {\n    mountParcel = props.mountParcel\n    return Promise.resolve()\n  },\n  // more bootstrap lifecycles if necessary\n]\n...\n"})}),"\n",(0,a.jsxs)(n.p,{children:["note: some libraries (such as react) support a framework specific context that makes it easy to store/manage. In those cases we've written some helper methods to abstract away the need to manage and store the ",(0,a.jsx)(n.code,{children:"mountParcel"})," method."]})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var o=t(6540);const a={},r=o.createContext(a);function s(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);