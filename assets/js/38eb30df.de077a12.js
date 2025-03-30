"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5660],{1201:e=>{e.exports=JSON.parse('{"permalink":"/blog/2020/02/24/single-spa-5","source":"@site/blog/2020-02-24-single-spa-5.md","title":"single-spa 5","description":"Today we released single-spa@5.0.0.","date":"2020-02-24T00:00:00.000Z","tags":[],"readingTime":4.29,"hasTruncateMarker":false,"authors":[{"name":"Joel Denning","url":"https://twitter.com/joelbdenning","imageURL":"https://avatars2.githubusercontent.com/u/5524384?s=460&v=4","key":null,"page":null}],"frontMatter":{"title":"single-spa 5","author":"Joel Denning","authorURL":"https://twitter.com/joelbdenning","authorImageURL":"https://avatars2.githubusercontent.com/u/5524384?s=460&v=4"},"unlisted":false,"prevItem":{"title":"The single-spa core team is expanding","permalink":"/blog/2023/08/22/single-spa-core-is-expanding"},"nextItem":{"title":"single-spa Inspector and 4.1","permalink":"/blog/2019/02/20/single-spa-inspector"}}')},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>o});var i=s(6540);const t={},r=i.createContext(t);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(r.Provider,{value:n},e.children)}},9480:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var i=s(1201),t=s(4848),r=s(8453);const a={title:"single-spa 5",author:"Joel Denning",authorURL:"https://twitter.com/joelbdenning",authorImageURL:"https://avatars2.githubusercontent.com/u/5524384?s=460&v=4"},o="Announcing single-spa@5",l={authorsImageUrls:[void 0]},c=[{value:"Migration from 4 to 5",id:"migration-from-4-to-5",level:2},{value:"Performance improvements",id:"performance-improvements",level:2},{value:"single-spa CLI",id:"single-spa-cli",level:2},{value:"Tutorial videos",id:"tutorial-videos",level:2},{value:"New example repositories",id:"new-example-repositories",level:2},{value:"Documentation overhaul",id:"documentation-overhaul",level:2},{value:"Development builds and error codes",id:"development-builds-and-error-codes",level:2},{value:"Governance",id:"governance",level:2},{value:"Where next?",id:"where-next",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Today we released single-spa@5.0.0."}),"\n",(0,t.jsx)(n.p,{children:"Here are the highlights:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Performance focus: 35% decrease in library size."}),"\n",(0,t.jsxs)(n.li,{children:["A CLI for single-spa: ",(0,t.jsx)(n.a,{href:"/docs/create-single-spa",children:"create-single-spa"})]}),"\n",(0,t.jsxs)(n.li,{children:["New tutorial videos: ",(0,t.jsx)(n.a,{href:"https://www.youtube.com/playlist?list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU",children:"Youtube playlist"})," / ",(0,t.jsx)(n.a,{href:"https://space.bilibili.com/495254378/video",children:"Bilibili space"})]}),"\n",(0,t.jsxs)(n.li,{children:["New framework-specific example repositories - ",(0,t.jsx)(n.a,{href:"https://github.com/react-microfrontends",children:"React example"}),", ",(0,t.jsx)(n.a,{href:"https://github.com/vue-microfrontends",children:"Vue example"}),", ",(0,t.jsx)(n.a,{href:"https://github.com/polyglot-microfrontends",children:"Multiple frameworks example"}),", ",(0,t.jsx)(n.a,{href:"/docs/examples",children:"Full list"})]}),"\n",(0,t.jsxs)(n.li,{children:["Massively improved documentation, including ",(0,t.jsx)(n.a,{href:"/docs/microfrontends-concept",children:"Concept: Microfrontends"})," and ",(0,t.jsx)(n.a,{href:"/docs/recommended-setup",children:"The Recommended Setup"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/releases/tag/v5.0.0",children:"Release notes here"})}),"\n",(0,t.jsx)(n.h2,{id:"migration-from-4-to-5",children:"Migration from 4 to 5"}),"\n",(0,t.jsxs)(n.p,{children:["For every user we're aware of, ",(0,t.jsx)(n.strong,{children:"you do not need to change anything in your code in order to upgrade to single-spa@5"}),". The breaking changes listed in the release notes are the removal of features that were originally used by Canopy Tax, but were never documented."]}),"\n",(0,t.jsxs)(n.p,{children:["If installing from npm, you can simply ",(0,t.jsx)(n.code,{children:"npm install --save single-spa@5.0.0"})," or ",(0,t.jsx)(n.code,{children:"yarn add single-spa@5.0.0"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Alternatively, single-spa is available on ",(0,t.jsx)(n.a,{href:"https://cdnjs.com/libraries/single-spa",children:"cdnjs"}),", ",(0,t.jsx)(n.a,{href:"https://www.jsdelivr.com/package/npm/single-spa",children:"jsdelivr"}),", and ",(0,t.jsx)(n.a,{href:"https://unpkg.com/browse/single-spa/",children:"unpkg"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["The single-spa core team is committed to treating our users well, which includes not introducing massive breaking changes. The core single-spa API has not seen massive breaking changes ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/releases/tag/v3.0.0",children:"since single-spa@3 in August 2016"}),". We have added features and improved things, but single-spa is a stable technology. We are committed to maintaining it, documenting it, and adjusting it as technologies like in-browser modules become more and more popular and viable."]}),"\n",(0,t.jsx)(n.h2,{id:"performance-improvements",children:"Performance improvements"}),"\n",(0,t.jsx)(n.p,{children:"The ESM version of single-spa@4 was 23.8kb (7.2kb gzipped). That was improved in single-spa@5 to 15.5kb (5.1kb gzipped). We did this by optimizing our build process and removing unused features."}),"\n",(0,t.jsx)(n.h2,{id:"single-spa-cli",children:"single-spa CLI"}),"\n",(0,t.jsxs)(n.p,{children:["Since single-spa's inception, bundler configuration has been a huge source of user pain. We have heard this pain and implemented ",(0,t.jsx)(n.a,{href:"/docs/create-single-spa",children:"create-single-spa"}),", which creates (and sometimes can update) repositories that are ready to be used as single-spa microfrontends. For Angular and Vue, the official CLIs are used with a few extra plugins automatically installed. For React, a default webpack config with decent eslint / prettier defaults is set up."]}),"\n",(0,t.jsxs)(n.p,{children:["Additionally, we have added a lot of documentation for webpack in ",(0,t.jsx)(n.a,{href:"/docs/recommended-setup#build-tools-webpack--rollup",children:"The Recommended Setup"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"tutorial-videos",children:"Tutorial videos"}),"\n",(0,t.jsx)(n.p,{children:"We understand that single-spa is more than just a library - it is an architecture. The single-spa library itself is the core, but the surrounding ecosystem of concepts and libraries are equally important to successfully migrating to single-spa and having it work for you. As such, we have created a Youtube playlist, currently consisting of seven videos, to help you get started."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://www.youtube.com/playlist?list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU",children:"Youtube playlist"})," / ",(0,t.jsx)(n.a,{href:"https://space.bilibili.com/495254378/video",children:"Bilibili space"})]}),"\n",(0,t.jsx)(n.p,{children:"The videos currently cover the following topics:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"What are Microfrontends?"}),"\n",(0,t.jsx)(n.li,{children:"In-browser vs build-time JavaScript modules"}),"\n",(0,t.jsx)(n.li,{children:"Import Maps"}),"\n",(0,t.jsx)(n.li,{children:"Local Development with single-spa and import maps"}),"\n",(0,t.jsx)(n.li,{children:"Deploying Microfrontends / Continuous Integration (CI)"}),"\n",(0,t.jsx)(n.li,{children:"SystemJS intro"}),"\n",(0,t.jsx)(n.li,{children:"Lazy Loading"}),"\n",(0,t.jsx)(n.li,{children:"Bundlers, webpack, and rollup."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"new-example-repositories",children:"New example repositories"}),"\n",(0,t.jsxs)(n.p,{children:["What started out as Canopy Tax's special sauce for independently deployed frontend microservices is now fully accessible to the public with our ",(0,t.jsx)(n.a,{href:"/docs/examples",children:"new set of example repos"}),". We have a React example, a Vue example, and a polyglot (multiple framework) example. We hope to add an Angular example, after we achieve support for Angular 9. These example repositories are actively watched and maintained by the single-spa core team, and reflect our current opinions on the best, production-viable way to do microfrontends."]}),"\n",(0,t.jsx)(n.p,{children:"Furthermore, we have deployed each of the examples to our new domains:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://react.microfrontends.app",children:"https://react.microfrontends.app"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://polyglot.microfrontends.app",children:"https://polyglot.microfrontends.app"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://vue.microfrontends.app",children:"https://vue.microfrontends.app"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"documentation-overhaul",children:"Documentation overhaul"}),"\n",(0,t.jsx)(n.p,{children:"We removed several dated documentation pages, and added several that were very much lacking. Here are a few pages that give you the most bang for your buck:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/docs/microfrontends-concept",children:"Concept: Microfrontend"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/docs/recommended-setup",children:"The Recommended Setup"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/docs/create-single-spa",children:"create-single-spa CLI"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"development-builds-and-error-codes",children:"Development builds and error codes"}),"\n",(0,t.jsxs)(n.p,{children:["Taking inspiration from the ",(0,t.jsx)(n.a,{href:"https://reactjs.org/docs/optimizing-performance.html#use-the-production-build",children:"react development and production builds"}),", we now publish to NPM both development and production builds in the following formats: UMD, ESM, and System.register."]}),"\n",(0,t.jsxs)(n.p,{children:["You can see the ",(0,t.jsx)(n.a,{href:"https://unpkg.com/browse/single-spa@5.0.0/lib/",children:"published build files here"}),". The ",(0,t.jsx)(n.code,{children:".dev.js"})," files provide full debugging information in the browser console, whereas the ",(0,t.jsx)(n.code,{children:".min.js"})," files give you a numeric error code and a link to a documentation page that explains the error. We hope that these error codes and documentation for them will improve discoverability of relevant documentation when you're setting up single-spa."]}),"\n",(0,t.jsxs)(n.p,{children:["An example of these new documentation pages for error codes is ",(0,t.jsx)(n.a,{href:"/error/?code=35&arg=application&arg=app1&arg=%7B%7D",children:"found here"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"governance",children:"Governance"}),"\n",(0,t.jsxs)(n.p,{children:["Some of you may have noticed that we recently moved all github repos from ",(0,t.jsx)(n.a,{href:"https://github.com/CanopyTax",children:"https://github.com/CanopyTax"})," to ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa",children:"https://github.com/single-spa"}),". Canopy Tax was the company where single-spa was first authored, but as a core team we asked to move ownership and governance of the projects to an organization fully managed by the open source community. In agreement with Canopy, we made that change."]}),"\n",(0,t.jsx)(n.p,{children:"This change does not mean anything drastic for single-spa. Its license was and is MIT, and we have no plans to do anything with the project besides make it better."}),"\n",(0,t.jsx)(n.h2,{id:"where-next",children:"Where next?"}),"\n",(0,t.jsxs)(n.p,{children:["We are actively ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/zh-hans.single-spa.js.org",children:"translating the single-spa documentation to Chinese"}),", and hope to add other languages soon. We will add full ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-angular/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+angular+9",children:"Angular 9 support"})," soon, and hope to add ",(0,t.jsx)(n.a,{href:"https://github.com/single-spa/single-spa/issues/103",children:"server rendering"})," in an upcoming release."]}),"\n",(0,t.jsxs)(n.p,{children:["Please ",(0,t.jsx)(n.a,{href:"/docs/contributing-overview",children:"contribute to our code"})," and ",(0,t.jsx)(n.a,{href:"/docs/ecosystem",children:"ecosystem"}),", ",(0,t.jsx)(n.a,{href:"https://join.slack.com/t/single-spa/shared_invite/zt-2uvhef42o-g4H3mvKDaenE9xVAewBKww",children:"join our single-spa slack channel"}),", ",(0,t.jsx)(n.a,{href:"https://twitter.com/Single_spa",children:"follow our official Twitter account"}),", and contribute to ",(0,t.jsx)(n.a,{href:"https://opencollective.com/single-spa",children:"our open collective"}),". The ",(0,t.jsx)(n.a,{href:"/contributors",children:"single-spa core team"})," all have full-time jobs and maintain this project on a volunteer basis."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}}}]);