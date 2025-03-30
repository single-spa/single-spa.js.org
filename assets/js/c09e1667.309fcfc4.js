"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7764],{7284:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>a});const o=JSON.parse('{"id":"testing/units","title":"Unit testing","description":"As microfrontends gain widespread adoption, testing tools will catch up and the testing story will improve.","source":"@site/versioned_docs/version-6.x/testing/units.md","sourceDirName":"testing","slug":"/testing/units","permalink":"/docs/testing/units","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-6.x/testing/units.md","tags":[],"version":"6.x","frontMatter":{"id":"units","title":"Unit testing","sidebar_label":"Unit testing"},"sidebar":"docs","previous":{"title":"Overview","permalink":"/docs/parcels-overview"},"next":{"title":"E2E testing","permalink":"/docs/testing/e2e"}}');var s=n(4848),i=n(8453);const r={id:"units",title:"Unit testing",sidebar_label:"Unit testing"},c=void 0,l={},a=[{value:"Importing microfrontends",id:"importing-microfrontends",level:2},{value:"<code>System.import</code>",id:"systemimport",level:2},{value:"Shared Mocks",id:"shared-mocks",level:2},{value:"Testing examples",id:"testing-examples",level:2},{value:"Jest",id:"jest",level:3},{value:"Jest config",id:"jest-config",level:4},{value:"mocks directory",id:"mocks-directory",level:4},{value:"setup file",id:"setup-file",level:4}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.admonition,{type:"info",children:(0,s.jsx)(t.p,{children:"As microfrontends gain widespread adoption, testing tools will catch up and the testing story will improve."})}),"\n",(0,s.jsxs)(t.p,{children:["Unit testing a single-spa ",(0,s.jsx)(t.a,{href:"/docs/module-types#applications",children:"application"}),", ",(0,s.jsx)(t.a,{href:"/docs/module-types#parcels",children:"parcel"}),", or ",(0,s.jsx)(t.a,{href:"/docs/module-types/#utilities",children:"utility"})," is very similar to unit testing in the framework you are using, with two notable exceptions:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Importing microfrontends"}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.code,{children:"System.import"})}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["In general we recommend following the principle of only testing the units that need to be tested and aren't covered by other tests. Testing library code like ",(0,s.jsx)(t.code,{children:"single-spa.registerApplication"})," is usually unnecessary because those are covered by the library's unit tests."]}),"\n",(0,s.jsx)(t.h2,{id:"importing-microfrontends",children:"Importing microfrontends"}),"\n",(0,s.jsx)(t.p,{children:"It is fairly common in microfrontends to have one microfrontend import and rely upon a component from another microfrontend. Reliance on another microfrontend can be challenging to test because unit tests generally run locally and you won't have access to other microfrontends. When this occurs we generally recommend mocking the other microfrontend for the unit test."}),"\n",(0,s.jsxs)(t.p,{children:["An example of this can be found in the ",(0,s.jsx)(t.code,{children:"Button"})," component exported by the ",(0,s.jsx)(t.code,{children:"styleguide"})," in ",(0,s.jsx)(t.a,{href:"https://github.com/react-microfrontends/styleguide/blob/master/src/button.component.js",children:"react.microfrontends.app"}),". Because that component is imported and used by the ",(0,s.jsx)(t.a,{href:"https://github.com/react-microfrontends/planets/blob/41ba0aaf9005b5300cc28ad5f4eac024eae06e2b/src/planets-page/planets-page.component.js#L6",children:"planets application"})," you will need to make it available to the test environment by mocking the dependency. This is necessary because the test environment cannot dynamically import other microfrontends, like the browser can. Given the wide variety of unit testing tools you will need to follow the pattern established by the test environment you are using for mocking other microfrontends."]}),"\n",(0,s.jsx)(t.admonition,{type:"note",children:(0,s.jsx)(t.p,{children:"We suggest mocks over installing microfrontends for local tests (for example via NPM modules) because mocks are easier to maintain and avoid several potential incompatiblity issues such as version mismatch, module format incompatibility, environment differences, and more."})}),"\n",(0,s.jsx)(t.h2,{id:"systemimport",children:(0,s.jsx)(t.code,{children:"System.import"})}),"\n",(0,s.jsxs)(t.p,{children:["Occasionally you will choose to interop with another microfrontend asynchronously by explicitly calling ",(0,s.jsx)(t.code,{children:"System.import"}),". Testing in this scenario may require mocking both SystemJS and the module you're importing. Additionally because ",(0,s.jsx)(t.code,{children:"System.import"})," returns a promise your tests in that area will need to be asynchronous and wait for promises to resolve."]}),"\n",(0,s.jsxs)(t.p,{children:["An example of this can be found in ",(0,s.jsx)(t.code,{children:"people"})," and ",(0,s.jsx)(t.code,{children:"planets"})," applications from ",(0,s.jsx)(t.code,{children:"react.microfrontends.app"}),". The ",(0,s.jsx)(t.a,{href:"https://github.com/react-microfrontends/people/blob/master/src/react-mf-people.js#L21",children:"People application"})," exports a function that resolves with a component. The ",(0,s.jsx)(t.a,{href:"https://github.com/react-microfrontends/planets/blob/main/src/planets-page/selected-planet/selected-planet.component.js",children:"Planets Application"})," imports and uses that component asynchronously with ",(0,s.jsx)(t.code,{children:"React.lazy"}),". Testing this component would necessitate mocking both ",(0,s.jsx)(t.code,{children:"SystemJS"})," and ",(0,s.jsx)(t.code,{children:"People"}),"."]}),"\n",(0,s.jsx)(t.h2,{id:"shared-mocks",children:"Shared Mocks"}),"\n",(0,s.jsx)(t.p,{children:"If each project mocks every other microfrontend it is possible that the mocks will eventually become out of sync with the actual deployed microfrontend. One way to prevent this is to share mocks so that keeping the mocks in sync only requires one change instead of updating mocks in many different repositories."}),"\n",(0,s.jsx)(t.h2,{id:"testing-examples",children:"Testing examples"}),"\n",(0,s.jsx)(t.h3,{id:"jest",children:"Jest"}),"\n",(0,s.jsxs)(t.p,{children:["In the above examples I showed how ",(0,s.jsx)(t.code,{children:"People"})," imports a component from ",(0,s.jsx)(t.code,{children:"styleguide"}),". In order to unit test the component in people with Jest you will need to ",(0,s.jsx)(t.a,{href:"https://jestjs.io/docs/configuration",children:"configure"})," jest and mock the ",(0,s.jsx)(t.code,{children:"styleguide"})," MFE. In jest configuration is done via multiple areas."]}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"#jest-config",children:"Create a jest config file"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"#mocks-directory",children:"Setup a mocks directory at the root"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"#setup-file",children:"Add a setupFile"})}),"\n"]}),"\n",(0,s.jsx)(t.h4,{id:"jest-config",children:"Jest config"}),"\n",(0,s.jsxs)(t.p,{children:["Jest is configured with a configuration file. Below is an example configuration using some of the options. See ",(0,s.jsx)(t.a,{href:"https://jestjs.io/docs/configuration",children:"more options on Jest's official documentation site"}),"."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:'module.exports = {\n  collectCoverageFrom: ["src/**/*.js"],\n  modulePathIgnorePatterns: ["/cache", "/dist"],\n  transform: {\n    "^.+\\\\.(j|t)sx?$": "babel-jest",\n  },\n  setupFilesAfterEnv: ["./jest.setup.js"],\n  moduleNameMapper: {\n    // Note this is only needed if you don\'t match the module name directly\n    // an alternative would be to place the mock in\n    // <rootDir>/__mocks__/@react-mf/styleguide.js and it would be autodetected\n    "@react-mf/styleguide": "<rootDir>/__mocks__/styleguide.js",\n  },\n};\n'})}),"\n",(0,s.jsx)(t.h4,{id:"mocks-directory",children:"mocks directory"}),"\n",(0,s.jsxs)(t.p,{children:["Jest will detect folders named ",(0,s.jsx)(t.code,{children:"__mocks__"})," and if the naming convention is exact or the modules have been mapped using ",(0,s.jsx)(t.code,{children:"moduleNameMapper"})," then Jest will use those mocks in place of an import. This structure is essential for other microfrontends where you don't have the code locally. ",(0,s.jsx)(t.a,{href:"https://jestjs.io/docs/manual-mocks",children:"See more information on jest's official documentation"})]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:".\n\u251c\u2500\u2500 __mocks__\n\u2502   \u2514\u2500\u2500 styleguide.js\n\u251c\u2500\u2500 src\n\u2502   \u251c\u2500\u2500 react-mf-people.js\n\u2502   \u2514\u2500\u2500 ...\n\u251c\u2500\u2500 node_modules\n\u251c\u2500\u2500 jest.setup.js\n\u251c\u2500\u2500 ...\n\u2514\u2500\u2500 jest.config.js\n"})}),"\n",(0,s.jsx)(t.h4,{id:"setup-file",children:"setup file"}),"\n",(0,s.jsxs)(t.p,{children:["Jest uses a setup file to create globals mocks that can be utilized by every test or otherwise configure the test environment. If you were mocking ",(0,s.jsx)(t.code,{children:"localStorage"})," or ",(0,s.jsx)(t.code,{children:"SystemJS"})," this is a good place to configure those mocks. ",(0,s.jsx)(t.a,{href:"https://jestjs.io/docs/configuration#setupfilesafterenv-array",children:"See more use-cases for a set-up file on Jest's offical documentation"})]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:'// jest.setup.js\n// import Mocks for SystemJS mock below\nimport peopleApplication from "@react-mf/people";\n// Mock SystemJS\nglobal.System = {\n  import: jest.fn(mockImport),\n};\n\nfunction mockImport(importName) {\n  // What you do in mock import will depend a lot on how you use SystemJS in the project and components you wish to test\n\n  /* If I had already created a mock for `@react-mf/people` and I wanted to test this component:\n   *  https://github.com/react-microfrontends/planets/blob/main/src/planets-page/selected-planet/selected-planet.component.js#L5\n   * I would want `System.import(\'@react-mf/people\')` to resovle to my mock one way to accomplish this would be the following\n   */\n  if (importName === "@react-mf/people") {\n    return Promise.resolve(peopleApplication);\n  } else {\n    console.warn("No mock module found");\n    return Promise.resolve({});\n  }\n}\n'})})]})}function m(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>c});var o=n(6540);const s={},i=o.createContext(s);function r(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);