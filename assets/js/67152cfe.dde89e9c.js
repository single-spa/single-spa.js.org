"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3314],{8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>d});var i=t(6540);const l={},s=i.createContext(l);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),i.createElement(s.Provider,{value:n},e.children)}},9940:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>r});const i=JSON.parse('{"id":"ecosystem-alpinejs","title":"single-spa-alpinejs","description":"single-spa-alpinejs is a helper library for mounting alpinejs components as","source":"@site/versioned_docs/version-5.x/ecosystem-alpinejs.md","sourceDirName":".","slug":"/ecosystem-alpinejs","permalink":"/docs/5.x/ecosystem-alpinejs","draft":false,"unlisted":false,"editUrl":"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-5.x/ecosystem-alpinejs.md","tags":[],"version":"5.x","frontMatter":{"id":"ecosystem-alpinejs","title":"single-spa-alpinejs","sidebar_label":"AlpineJS"},"sidebar":"docs","previous":{"title":"Dojo","permalink":"/docs/5.x/ecosystem-dojo"},"next":{"title":"Vite","permalink":"/docs/5.x/ecosystem-vite"}}');var l=t(4848),s=t(8453);const a={id:"ecosystem-alpinejs",title:"single-spa-alpinejs",sidebar_label:"AlpineJS"},d=void 0,o={},r=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"<em>1 - Template Only</em>",id:"1---template-only",level:3},{value:"<em>2 - Template with externally defined <code>x-data</code></em>",id:"2---template-with-externally-defined-x-data",level:3},{value:"<em>3 - Template with externally defined <code>x-data</code> with <code>x-init</code></em>",id:"3---template-with-externally-defined-x-data-with-x-init",level:3},{value:"Usage Examples",id:"usage-examples",level:3},{value:"<em>1 - Template Only</em>",id:"1---template-only-1",level:4},{value:"Via cdn",id:"via-cdn",level:4},{value:"<em>2 - Template with externally defined <code>x-data</code></em>",id:"2---template-with-externally-defined-x-data-1",level:4},{value:"<em>3 - Template with externally defined <code>x-data</code> with <code>x-init</code></em>",id:"3---template-with-externally-defined-x-data-with-x-init-1",level:4},{value:"API / Options",id:"api--options",level:2},{value:"xData and xInit Handling",id:"xdata-and-xinit-handling",level:3},{value:"Special characters in the application names",id:"special-characters-in-the-application-names",level:4}];function c(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-alpinejs",children:"single-spa-alpinejs"})," is a helper library for mounting ",(0,l.jsx)(n.a,{href:"https://github.com/alpinejs/alpine/",children:"alpinejs"})," components as\nsingle-spa applications or parcels."]}),"\n",(0,l.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sh",children:"npm install --save single-spa-alpinejs\n\n# or\nyarn add single-spa-alpinejs\n"})}),"\n",(0,l.jsx)(n.p,{children:"Alternatively, you can use single-spa-alpinejs from a CDN as a global variable:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<script src="https://cdn.jsdelivr.net/npm/single-spa-alpinejs"><\/script>\n'})}),"\n",(0,l.jsxs)(n.p,{children:["Note that you might want to lock down the package to a specific version. See ",(0,l.jsx)(n.a,{href:"https://cdn.jsdelivr.net/npm/single-spa-alpinejs",children:"here"})," for\nhow to do that."]}),"\n",(0,l.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"There are three ways the you can define AlpineJS components as single-spa applications or parcels."}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"1---template-only",children:(0,l.jsx)(n.em,{children:"1 - Template Only"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["The simplest way where the template contains all the required data and initialization logic (including ",(0,l.jsx)(n.code,{children:"x-data"})," and ",(0,l.jsx)(n.code,{children:"x-init"}),") as part of the dom. The template is provided via the options attribute ",(0,l.jsx)(n.code,{children:"template"})]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"2---template-with-externally-defined-x-data",children:(0,l.jsxs)(n.em,{children:["2 - Template with externally defined ",(0,l.jsx)(n.code,{children:"x-data"})]})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["You could also provide ",(0,l.jsx)(n.code,{children:"x-data"})," externally and the helper will add it to the component.","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["The ",(0,l.jsx)(n.code,{children:"x-data"})," can be provided in the following forms (via the options attribute ",(0,l.jsx)(n.code,{children:"xData"}),")","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"an object"}),"\n",(0,l.jsx)(n.li,{children:"a function that returns an object"}),"\n",(0,l.jsx)(n.li,{children:"a function that returns a promise which resolves with an object."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"3---template-with-externally-defined-x-data-with-x-init",children:(0,l.jsxs)(n.em,{children:["3 - Template with externally defined ",(0,l.jsx)(n.code,{children:"x-data"})," with ",(0,l.jsx)(n.code,{children:"x-init"})]})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["You can also provide ",(0,l.jsx)(n.code,{children:"x-init"})," externally along with the ",(0,l.jsx)(n.code,{children:"x-data"})," and the helper will add it to the component."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["The ",(0,l.jsx)(n.code,{children:"x-init"})," can be provided in the following forms (via the options attribute ",(0,l.jsx)(n.code,{children:"xInit"}),") and needs to be a function."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["Please note the ",(0,l.jsx)(n.code,{children:"xData"})," attribute ",(0,l.jsx)(n.em,{children:"must"})," be provided otherwise the ",(0,l.jsx)(n.code,{children:"xInit"})," attribute will be ignored."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["The sample below references the example from the ",(0,l.jsx)(n.a,{href:"https://www.alpinetoolbox.com/examples/",children:"Alpine Toolbox - Alpine JS and fetch()"})," and demonstrates how you can use the ",(0,l.jsx)(n.code,{children:"xInit"})," and ",(0,l.jsx)(n.code,{children:"xData"})," attributes to create an AlpineJS application ."]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"usage-examples",children:"Usage Examples"}),"\n",(0,l.jsx)(n.h4,{id:"1---template-only-1",children:(0,l.jsx)(n.em,{children:"1 - Template Only"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'import singleSpaAlpinejs from "single-spa-alpinejs";\n\nconst alpinejslifecycles = singleSpaAlpinejs({\n  template: `\n    <div class="rounded overflow-hidden shadow-lg font-sans p-1 m-1" \n         x-data="{ open: false }">\n      <div class="font-bold p-1">Example for x-show attribute</div>\n      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold \n              hover:text-white py-2 px-4 border border-blue-500 \n              hover:border-transparent rounded" \n              @click="open = !open">Open/Close</button>\n      <div x-show="open" class="text-4xl">\n          Hey, I\'m open\n      </div>\n    </div>`,\n});\n\nexport const bootstrap = alpinejslifecycles.bootstrap;\nexport const mount = alpinejslifecycles.mount;\nexport const unmount = alpinejslifecycles.unmount;\n'})}),"\n",(0,l.jsx)(n.h4,{id:"via-cdn",children:"Via cdn"}),"\n",(0,l.jsx)(n.p,{children:"Example usage when installed via CDN:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["The usage is similar and once the library is loaded it will be available globally and accessed via the ",(0,l.jsx)(n.code,{children:"window"})," object."]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'const alpinejsApp = window.singleSpaAlpinejs({\n  template: `\n    <div class="rounded overflow-hidden shadow-lg font-sans p-1 m-1" \n         x-data="{ open: false }">\n      <div class="font-bold p-1">Example for x-show attribute</div>\n      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold \n      hover:text-white py-2 px-4 border border-blue-500 \n      hover:border-transparent rounded" @click="open = !open">Open/Close</button>\n      <div x-show="open" class="text-4xl">\n          Hey, I\'m open\n      </div>\n    </div>`,\n});\n\nsingleSpa.registerApplication({\n  name: "name",\n  app: alpinejsApp,\n  activeWhen: () => true,\n});\n'})}),"\n",(0,l.jsx)(n.h4,{id:"2---template-with-externally-defined-x-data-1",children:(0,l.jsxs)(n.em,{children:["2 - Template with externally defined ",(0,l.jsx)(n.code,{children:"x-data"})]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'import singleSpaAlpinejs from "single-spa-alpinejs";\n\nconst alpinejslifecycles = singleSpaAlpinejs({\n  template: `\n    <div class="rounded overflow-hidden shadow-lg font-sans p-1 m-1">\n      <div class="font-bold p-1">Example for x-show attribute</div>\n      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold \n      hover:text-white py-2 px-4 border border-blue-500 \n      hover:border-transparent rounded" @click="open = !open">Open/Close</button>\n      <div x-show="open" class="text-4xl">\n          Hey, I\'m open\n      </div>\n    </div>`,\n  xData: { open: false },\n});\n\nexport const bootstrap = alpinejslifecycles.bootstrap;\nexport const mount = alpinejslifecycles.mount;\nexport const unmount = alpinejslifecycles.unmount;\n'})}),"\n",(0,l.jsx)(n.h4,{id:"3---template-with-externally-defined-x-data-with-x-init-1",children:(0,l.jsxs)(n.em,{children:["3 - Template with externally defined ",(0,l.jsx)(n.code,{children:"x-data"})," with ",(0,l.jsx)(n.code,{children:"x-init"})]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'import singleSpaAlpinejs from "single-spa-alpinejs";\n\nconst appTemplate = `\n    <div class="w-full h-full text-gray-800">\n        <h1 class="mt-0 mb-3 font-light text-3xl" x-text="title">\x3c!-- title text --\x3e</h1>\n        <p class="text-xl text-gray-600 font-light mb-4" x-html="intro">\x3c!-- intro text --\x3e</p>\n        <div class="flex flex-wrap -mx-2 pb-8">\n        \x3c!-- begin: user card --\x3e\n        <template x-for="user in users" :key="user.id">\n            <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto font-light">\n            <div class="flex bg-white rounded-lg shadow-md m-2 border-l-4 \n                        border-white hover:shadow-2xl hover:border-pink-500 \n                        cursor-pointer relative">\n                <div class="p-4 pr-6 leading-normal">\n                <div class="font-medium text-xl truncate" x-text="user.name"></div>\n                <div class="truncate uppercase text-xs text-gray-500 font-semibold \n                pb-2 tracking-widest" x-text="user.company.name"></div>\n                <div class="" x-text="user.phone"></div>\n                <a class="text-blue-600 hover:text-blue-700 mr-4 block"     \n                    x-bind:href="\'mailto:\' + user.email" x-text="user.email"></a>     \n                <a class="text-blue-600 hover:text-blue-700 block" \n                x-bind:href="\'https://\' + user.website" x-text="user.website"></a>\n                </div>\n            </div>\n            </div>\n        </template>\n        \x3c!-- end: user card --\x3e\n        </div>\n    </div>\n  `;\n\nconst appDataFn = ({ title, name }) => ({\n  title,\n  intro:\n    \'Implement a simple <code class="text-md text-pink-600">fetch()</code> request to render a list of items using Alpine.js :)\',\n  users: [],\n  open: false,\n  name,\n});\n\nconst appXInitFn = (id) => {\n  return fetch("https://jsonplaceholder.typicode.com/users")\n    .then((response) => response.json())\n    .then((data) => (document.querySelector(`#${id}`).__x.$data.users = data));\n};\n\nconst opts = {\n  template: appTemplate,\n  xData: (data) => appDataFn(data), // pass props to x-data\n  xInit: appXInitFn,\n};\n\nconst alpinejslifecycles = singleSpaAlpinejs(opts);\n\nexport const bootstrap = alpinejslifecycles.bootstrap;\nexport const mount = alpinejslifecycles.mount;\nexport const unmount = alpinejslifecycles.unmount;\n'})}),"\n",(0,l.jsx)(n.h2,{id:"api--options",children:"API / Options"}),"\n",(0,l.jsx)(n.p,{children:"single-spa-html is called with an object that has the following properties:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"template"})," (required): An HTML string or a function that returns a string. The function will be called with the single-spa custom props. The returned string is injected into the DOM during the single-spa mount lifecycle."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"domElementGetter"})," (optional): A function that returns the dom element container into which the HTML will be injected. If omitted,\na default implementation is provided that wraps the template in a ",(0,l.jsx)(n.code,{children:"<div>"})," that is appended to ",(0,l.jsx)(n.code,{children:"document.body"}),"."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"xData"})," (optional): An object or a function or a function that returns a promise.The returned string is injected into the DOM as the ",(0,l.jsx)(n.code,{children:"x-data"})," attribute during the single-spa mount lifecycle."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"xInit"})," (optional): A function or a function that returns a promise. The function provided is added to the global scope and the function initiation along with the root dom element id as a parameter is injected into the DOM as the ",(0,l.jsx)(n.code,{children:"x-init"})," attribute during the single-spa mount lifecycle. Please note the ",(0,l.jsx)(n.code,{children:"xData"})," attribute ",(0,l.jsx)(n.em,{children:"must"})," be provided otherwise the ",(0,l.jsx)(n.code,{children:"xInit"})," attribute will be ignored. The function you provide ",(0,l.jsx)(n.code,{children:"xInit"})]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"xdata-and-xinit-handling",children:"xData and xInit Handling"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["This section covers the details of how ",(0,l.jsx)(n.code,{children:"xData"})," and ",(0,l.jsx)(n.code,{children:"xInit"})," option attributes are processed by the single spa helper."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Consider the example below"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"const appDataFn = () => { open: false, loading: true }\nconst appXInitFn = (domId) => {\n\tconsole.log('Hello from appXInitFn');\n  // domId provides access to the parent dom element where x-data and x-init are defined\n\tdocument.querySelector(`#${domId}`).__x.$data.loading = false\n}\n\nconst opts = {\n  template: appTemplate,\t          // base template\n  xData: (data) => appDataFn(data), // pass props to x-data\n  xInit: appXInitFn,\t\t            // x-Init function\n};\n\nconst alpinejsApp = singleSpaAlpinejs(opts);\n\nsingleSpa.registerApplication({\n  name: 'myapp',\n  app: alpinejsApp,\n  activeWhen: () => true,\n});\n\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"The helper does the following"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Adds the template to the dom wrapped in ",(0,l.jsx)(n.code,{children:"parent dom element"})," with and id that has a prefix of ",(0,l.jsx)(n.code,{children:"alpine"}),". In this case it will be ",(0,l.jsx)(n.code,{children:"id='alpine-myapp'"})]}),"\n",(0,l.jsxs)(n.li,{children:["Attaches a resolved ",(0,l.jsx)(n.code,{children:"xData"})," as a string ",(0,l.jsx)(n.code,{children:'x-data="{ "name": "myapp" ,"open": false }"'})," to the ",(0,l.jsx)(n.code,{children:"parent dom element"}),"."]}),"\n",(0,l.jsxs)(n.li,{children:["It will make the user defined ",(0,l.jsx)(n.code,{children:"appXInitFn"})," available globally as an attribute of ",(0,l.jsx)(n.code,{children:"window.singleSpaAlpineXInit"})," and will be accessible via variable ",(0,l.jsx)(n.code,{children:"window.singleSpaAlpineXInit.myapp"})]}),"\n",(0,l.jsxs)(n.li,{children:["Attaches a resolved ",(0,l.jsx)(n.code,{children:"xInit"})," as a string that calls the globally defined variable ",(0,l.jsx)(n.code,{children:"x-init=\"singleSpaAlpineXInit.myapp('alpine-myapp')\""})," to the ",(0,l.jsx)(n.code,{children:"parent dom element"}),"."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Note"})," that this also passes ",(0,l.jsx)(n.code,{children:"id"})," of the ",(0,l.jsx)(n.code,{children:"parent dom element"})," which can then be used to access the alpine data elements to update the state as required."]}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"special-characters-in-the-application-names",children:"Special characters in the application names"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["You may have special characters in the application name for example ",(0,l.jsx)(n.code,{children:"@my/app"}),". See the example below"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'singleSpa.registerApplication({\n  name: "@my/app",\n  app: alpinejsApp,\n  activeWhen: () => true,\n});\n'})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["The single spa helper converts these to valid ",(0,l.jsx)(n.code,{children:"global"})," function names by ",(0,l.jsx)(n.code,{children:"replacing"})," ",(0,l.jsx)(n.code,{children:"all the special characters"})," with underscores (",(0,l.jsx)(n.code,{children:"_"}),"). This does not require any special handling from the user as the helper takes care of this internally"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsxs)(n.p,{children:["In the above case the ",(0,l.jsx)(n.code,{children:"xInit"})," dom element would look like the following ",(0,l.jsx)(n.code,{children:"x-init=\"singleSpaAlpineXInit._my_app('alpine-@my/app')\""})," where the ",(0,l.jsx)(n.code,{children:"xInit"})," function is available as a ",(0,l.jsx)(n.code,{children:"global"})," variable ",(0,l.jsx)(n.code,{children:"_my_app"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}}}]);