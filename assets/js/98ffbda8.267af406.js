"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6805],{1715:e=>{e.exports=JSON.parse('{"permalink":"/blog/2018/06/19/single-spa-parcels-explained","source":"@site/blog/2018-06-19-single-spa-parcels-explained.md","title":"single-spa parcels, explained","description":"Ever since single-spa@1.0.0, the single-spa team has been dedicated to bringing microservices to the frontend. We have made it possible for AngularJS, React, Angular, Vue, and other frameworks to coexist side by side in the same page.","date":"2018-06-19T00:00:00.000Z","tags":[],"readingTime":3.69,"hasTruncateMarker":false,"authors":[{"name":"Joel Denning","url":"https://twitter.com/joelbdenning","imageURL":"https://avatars2.githubusercontent.com/u/5524384?s=400&u=ff145fcb2ae5305555628a446e9f725d4e145aaa&v=4","key":null,"page":null}],"frontMatter":{"title":"single-spa parcels, explained","author":"Joel Denning","authorURL":"https://twitter.com/joelbdenning","authorImageURL":"https://avatars2.githubusercontent.com/u/5524384?s=400&u=ff145fcb2ae5305555628a446e9f725d4e145aaa&v=4"},"unlisted":false,"prevItem":{"title":"single-spa Inspector and 4.1","permalink":"/blog/2019/02/20/single-spa-inspector"},"nextItem":{"title":"A step-by-step guide to single-spa","permalink":"/blog/2016/12/16/a-step-by-step-guide-to-single-spa"}}')},7727:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var s=n(1715),a=n(4848),o=n(8453);const i={title:"single-spa parcels, explained",author:"Joel Denning",authorURL:"https://twitter.com/joelbdenning",authorImageURL:"https://avatars2.githubusercontent.com/u/5524384?s=400&u=ff145fcb2ae5305555628a446e9f725d4e145aaa&v=4"},r=void 0,l={authorsImageUrls:[void 0]},c=[{value:"Another way to do framework agnostic components?",id:"another-way-to-do-framework-agnostic-components",level:2},{value:"Okay but you haven\u2019t told me what a single-spa parcel is",id:"okay-but-you-havent-told-me-what-a-single-spa-parcel-is",level:2},{value:"A few more specifics",id:"a-few-more-specifics",level:2},{value:"Syntactic sugar makes this easier",id:"syntactic-sugar-makes-this-easier",level:2},{value:"How hard is it to try this out?",id:"how-hard-is-it-to-try-this-out",level:2},{value:"Let us know what you think!",id:"let-us-know-what-you-think",level:2}];function h(e){const t={a:"a",em:"em",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:"Ever since single-spa@1.0.0, the single-spa team has been dedicated to bringing microservices to the frontend. We have made it possible for AngularJS, React, Angular, Vue, and other frameworks to coexist side by side in the same page."}),"\n",(0,a.jsxs)(t.p,{children:["And with the release of ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa/releases/tag/v4.0.0",children:"version 4"}),", I\u2019m pleased to announce that ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa",children:"single-spa"})," is expanding that effort so that ",(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.em,{children:"individual components"})})," written with different frameworks can interoperate. It is new terrain for the single-spa community, which previously had focused on getting large applications to interoperate with each other, instead of the individual components."]}),"\n",(0,a.jsx)(t.h2,{id:"another-way-to-do-framework-agnostic-components",children:"Another way to do framework agnostic components?"}),"\n",(0,a.jsxs)(t.p,{children:["For those familiar with ",(0,a.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Web_Components",children:"web components"})," and ",(0,a.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements",children:"custom elements"}),", you may be wondering why a JavaScript library would try to do what browsers are starting natively to do."]}),"\n",(0,a.jsx)(t.p,{children:"And as one of the contributors to the custom elements polyfill, let me be the first one to say that we did not make this decision lightly."}),"\n",(0,a.jsxs)(t.p,{children:["If you\u2019re interested in diving into the details, check out ",(0,a.jsx)(t.a,{href:"https://medium.com/canopy-tax/one-companys-relationship-with-custom-elements-d360baf3b253",children:"One Company\u2019s Relationship With Custom Elements"}),", which explains some of the difficulties we\u2019ve been through with web components and custom elements."]}),"\n",(0,a.jsx)(t.p,{children:"TLDR: React and some other frameworks don\u2019t interop with custom elements very well. Additionally dealing with inner HTML, attributes vs properties, and customized builtins can be a pain."}),"\n",(0,a.jsx)(t.h2,{id:"okay-but-you-havent-told-me-what-a-single-spa-parcel-is",children:"Okay but you haven\u2019t told me what a single-spa parcel is"}),"\n",(0,a.jsx)(t.p,{children:"A parcel is single-spa\u2019s way of building a component in one framework and using it in another."}),"\n",(0,a.jsxs)(t.p,{children:["To implement a parcel, just create a JavaScript object that has 3\u20134 functions on it. We call this JavaScript object a ",(0,a.jsx)(t.em,{children:"parcel config"})," and there are three required functions to implement: bootstrap, mount, and unmount. A fourth function, update, is optional."]}),"\n",(0,a.jsx)(t.p,{children:"Each of the functions will be called by single-spa at the right time, but the parcel config will control what happens. In other words, single-spa controls the \u201cwhen,\u201d but the parcel config controls the \u201cwhat\u201d and the \u201chow.\u201d"}),"\n",(0,a.jsx)(t.p,{children:"Once you\u2019ve implemented the parcel config, simply call singleSpa.mountRootParcel(parcelConfig, parcelProps) to mount it. This is the key to what makes parcels framework agnostic \u2014 regardless of whether the parcel config is implemented with React, Angular, Vue, or anything else, to use the parcel you always just call mountRootParcel()."}),"\n",(0,a.jsx)(t.h2,{id:"a-few-more-specifics",children:"A few more specifics"}),"\n",(0,a.jsx)(t.p,{children:"We\u2019ve glossed over a few things that I want to touch on real quick:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"How do you implement the lifecycle functions on the parcel config?"})}),"\n",(0,a.jsxs)(t.p,{children:["Use a helper library for your framework of choice. ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa-react",children:"single-spa-react"}),", ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa-angular",children:"single-spa-angular"})," (for angular@2+), ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa-angularjs",children:"single-spa-angularjs"}),", ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa-vue",children:"single-spa-vue"}),", and ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/single-spa-ecosystem.md",children:"others"})," will implement the entire parcel config for you."]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"What are the props you pass to mountRootParcel()?"})}),"\n",(0,a.jsx)(t.p,{children:"The props passed as the second argument to singleSpa.mountRootParcel(parcelConfig, parcelProps) are an object with one required prop and as many custom props as you\u2019d like. The required prop is domElement, which tells the parcel where to mount. And the custom props get passed through to the parcel config lifecycle functions."}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"How do you re-render and unmount a parcel?"})}),"\n",(0,a.jsx)(t.p,{children:"The singleSpa.mountRootParcel() function returns a parcel object that lets you re-render and unmount the parcel whenever you\u2019d like to."}),"\n",(0,a.jsx)("iframe",{src:"https://medium.com/media/b2d981b380b937009f7ce84e1cc2d753",frameBorder:"0"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"syntactic-sugar-makes-this-easier",children:"Syntactic sugar makes this easier"}),"\n",(0,a.jsx)(t.p,{children:"Calling all of those functions manually might get annoying. So let\u2019s make it easier. Here\u2019s an example of some syntactic sugar for React. Similar features will be added soon for Angular, Vue, and other frameworks."}),"\n",(0,a.jsx)("iframe",{src:"https://medium.com/media/9b5904d3423359cb2eef410f9ee35648",frameBorder:"0"}),"\n",(0,a.jsx)(t.h2,{id:"how-hard-is-it-to-try-this-out",children:"How hard is it to try this out?"}),"\n",(0,a.jsx)(t.p,{children:"You can get started with parcels immediately, without using the rest of single-spa. To do so, either npm install or script tag single-spa, then call mountRootParcel with your first parcel config."}),"\n",(0,a.jsxs)(t.p,{children:["You can also check out ",(0,a.jsx)(t.a,{href:"https://codepen.io/joeldenning/pen/qKVoQg?editors=0010#0",children:"this codepen example"})," to start out."]}),"\n",(0,a.jsxs)(t.p,{children:["And if you are already a user of ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/applications.md",children:"single-spa applications"}),", parcels mean that your applications can mount and unmount shared functionality whenever you want them to. Since parcels don\u2019t have ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/configuration#activity-function",children:"activity functions"}),", you don\u2019t have to set up routes for them."]}),"\n",(0,a.jsx)(t.h2,{id:"let-us-know-what-you-think",children:"Let us know what you think!"}),"\n",(0,a.jsx)(t.p,{children:"We\u2019d love to get your feedback on parcels. What do you think of this new way of framework interop? Is the implementation easy to understand? Are parcels useful for you or do they not quite fit into what you\u2019re trying to accomplish?How hard was it for you to try out?"}),"\n",(0,a.jsxs)(t.p,{children:["Check out the ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/parcels.md",children:"official docs"})," for more examples, explanations, and ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa/blob/master/docs/parcels-api.md",children:"api documentation"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["And let us know your thoughts in the ",(0,a.jsx)(t.a,{href:"https://join.slack.com/t/single-spa/shared_invite/zt-2uvhef42o-g4H3mvKDaenE9xVAewBKww",children:"single-spa Slack channel"}),", a ",(0,a.jsx)(t.a,{href:"https://github.com/single-spa/single-spa/issues",children:"Github issue"}),", or ",(0,a.jsx)(t.a,{href:"https://twitter.com/Single_spa",children:"on Twitter"}),"!"]})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>r});var s=n(6540);const a={},o=s.createContext(a);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);