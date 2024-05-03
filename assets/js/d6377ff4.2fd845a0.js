"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4498],{4078:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var i=s(4848),t=s(8453);const o={id:"ecosystem-vue",title:"single-spa-vue",sidebar_label:"Vue"},r=void 0,a={id:"ecosystem-vue",title:"single-spa-vue",description:"single-spa-vue is a helper library that helps implement single-spa registered application lifecycle functions (bootstrap, mount and unmount) for use with Vue.js. Check out the single-spa-vue github.",source:"@site/versioned_docs/version-5.x/ecosystem-vue.md",sourceDirName:".",slug:"/ecosystem-vue",permalink:"/docs/5.x/ecosystem-vue",draft:!1,unlisted:!1,editUrl:"https://github.com/single-spa/single-spa.js.org/blob/master/website/versioned_docs/version-5.x/ecosystem-vue.md",tags:[],version:"5.x",frontMatter:{id:"ecosystem-vue",title:"single-spa-vue",sidebar_label:"Vue"},sidebar:"docs",previous:{title:"React",permalink:"/docs/5.x/ecosystem-react"},next:{title:"Angular",permalink:"/docs/5.x/ecosystem-angular"}},l={},c=[{value:"Example",id:"example",level:2},{value:"Live demo",id:"live-demo",level:2},{value:"Installation",id:"installation",level:2},{value:"Vue CLI",id:"vue-cli",level:3},{value:"Without Vue CLI",id:"without-vue-cli",level:3},{value:"Usage",id:"usage",level:2},{value:"Vue 2",id:"vue-2",level:3},{value:"Vue 3",id:"vue-3",level:3},{value:"Custom props",id:"custom-props",level:2},{value:"Vue 2",id:"vue-2-1",level:3},{value:"Vue 3",id:"vue-3-1",level:3},{value:"Shared dependencies",id:"shared-dependencies",level:2},{value:"Shared deps with Vue CLI",id:"shared-deps-with-vue-cli",level:3},{value:"Shared deps without Vue CLI",id:"shared-deps-without-vue-cli",level:3},{value:"Options",id:"options",level:2},{value:"Parcels",id:"parcels",level:2},{value:"Creating a parcel",id:"creating-a-parcel",level:3},{value:"Rendering a parcel",id:"rendering-a-parcel",level:3},{value:"Webpack Public Path",id:"webpack-public-path",level:2}];function p(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["single-spa-vue is a helper library that helps implement ",(0,i.jsx)(n.a,{href:"configuration#registering-applications",children:"single-spa registered application"})," ",(0,i.jsx)(n.a,{href:"/docs/5.x/building-applications#registered-application-lifecycle",children:"lifecycle functions"})," (bootstrap, mount and unmount) for use with ",(0,i.jsx)(n.a,{href:"https://vuejs.org/",children:"Vue.js"}),". Check out the ",(0,i.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-vue",children:"single-spa-vue github"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:["For a full example, see ",(0,i.jsx)(n.a,{href:"https://github.com/vue-microfrontends",children:"vue-microfrontends"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"live-demo",children:"Live demo"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://coexisting-vue-microfrontends.surge.sh",children:"https://coexisting-vue-microfrontends.surge.sh"})}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.h3,{id:"vue-cli",children:"Vue CLI"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"https://github.com/single-spa/vue-cli-plugin-single-spa",children:"vue-cli-plugin-single-spa"})," will get everything set up."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"vue add single-spa\n"})}),"\n",(0,i.jsx)(n.p,{children:"The CLI Plugin does the following for you:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Modify your webpack config so that your project works as a single-spa application or parcel."}),"\n",(0,i.jsxs)(n.li,{children:["Install ",(0,i.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-vue",children:"single-spa-vue"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Modify your ",(0,i.jsx)(n.code,{children:"main.js"})," or ",(0,i.jsx)(n.code,{children:"main.ts"})," file so that your project works as a single-spa application or parcel."]}),"\n",(0,i.jsxs)(n.li,{children:["Add a ",(0,i.jsx)(n.code,{children:"set-public-path.js"})," that will use ",(0,i.jsx)(n.code,{children:"systemjs-webpack-interop"})," in order to set the public path of your application."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"without-vue-cli",children:"Without Vue CLI"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"npm install --save single-spa-vue\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Alternatively, you can use single-spa-vue by adding ",(0,i.jsx)(n.code,{children:'<script src="https://unpkg.com/single-spa-vue"><\/script>'})," to your HTML file and\naccessing the ",(0,i.jsx)(n.code,{children:"singleSpaVue"})," global variable."]}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.p,{children:["Install ",(0,i.jsx)(n.code,{children:"systemjs-webpack-interop"})," if you have not already done so."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"npm install systemjs-webpack-interop -S"})}),"\n",(0,i.jsxs)(n.p,{children:["Create a file at the same level as your ",(0,i.jsx)(n.code,{children:"main.js/ts"})," called ",(0,i.jsx)(n.code,{children:"set-public-path.js"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { setPublicPath } from "systemjs-webpack-interop";\n\nsetPublicPath("appName");\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Note that if you are using the Vue CLI Plugin, your ",(0,i.jsx)(n.code,{children:"main.ts"})," or ",(0,i.jsx)(n.code,{children:"main.js"})," file will be updated with this code automatically and the ",(0,i.jsx)(n.code,{children:"set-public-path.js"})," file\nwill automatically be created with the app name being your package.json's name property."]}),"\n",(0,i.jsxs)(n.p,{children:["If you want to deal with your Vue instance, you can modify the mount method by following this. mount method will return Promise with Vue instance after ",(0,i.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-vue/releases/tag/v1.6.0",children:"v1.6.0"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const vueLifecycles = singleSpaVue({...})\n\nexport const mount = props => vueLifecycles.mount(props).then(instance => {\n  // do what you want with the Vue instance\n  ...\n})\n"})}),"\n",(0,i.jsx)(n.h3,{id:"vue-2",children:"Vue 2"}),"\n",(0,i.jsx)(n.p,{children:"For Vue 2, change your application's entry file to be the following:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import "./set-public-path";\nimport Vue from "vue";\nimport App from "./App.vue";\nimport router from "./router";\nimport singleSpaVue from "single-spa-vue";\n\nconst vueLifecycles = singleSpaVue({\n  Vue,\n  appOptions: {\n    render(h) {\n      return h(App, {\n        props: {\n          // single-spa props are available on the "this" object. Forward them to your component as needed.\n          // https://single-spa.js.org/docs/building-applications#lifecycle-props\n          name: this.name,\n          mountParcel: this.mountParcel,\n          singleSpa: this.singleSpa,\n        }\n      });\n    },\n    router,\n  },\n});\n\nexport const bootstrap = vueLifecycles.bootstrap;\nexport const mount = vueLifecycles.mount;\nexport const unmount = vueLifecycles.unmount;\n'})}),"\n",(0,i.jsx)(n.h3,{id:"vue-3",children:"Vue 3"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["\u26a0\ufe0f"," ",(0,i.jsxs)(n.strong,{children:["Vue 3's router only works properly with single-spa's ",(0,i.jsx)(n.code,{children:"urlRerouteOnly"})," set to ",(0,i.jsx)(n.code,{children:"true"}),"! In ",(0,i.jsx)(n.code,{children:"single-spa@<=5"}),", the default value for ",(0,i.jsx)(n.code,{children:"urlRerouteOnly"})," is false. So, make sure to update your root config to set it to true. Also, upgrade to ",(0,i.jsx)(n.code,{children:"vue-cli-plugin-single-spa@>=3"})," in order to ensure standalone mode sets ",(0,i.jsx)(n.code,{children:"urlRerouteOnly"})," to true."]})," ",(0,i.jsx)(n.a,{href:"https://github.com/single-spa/single-spa-vue/issues/85",children:"Github discussion"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"For Vue 3, change your application's entry file to be the following:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import "./set-public-path";\nimport { h, createApp } from "vue";\nimport singleSpaVue from "../lib/single-spa-vue.js";\nimport router from "./router";\nimport App from "./App.vue";\n\nconst vueLifecycles = singleSpaVue({\n  createApp,\n  appOptions: {\n    render() {\n      return h(App, {\n        // single-spa props are available on the "this" object. Forward them to your component as needed.\n        // https://single-spa.js.org/docs/building-applications#lifecycle-props\n        name: this.name,\n        mountParcel: this.mountParcel,\n        singleSpa: this.singleSpa,\n      });\n    },\n  },\n  handleInstance: (app) => {\n    app.use(router);\n  },\n});\n\nexport const bootstrap = vueLifecycles.bootstrap;\nexport const mount = vueLifecycles.mount;\nexport const unmount = vueLifecycles.unmount;\n'})}),"\n",(0,i.jsx)(n.h2,{id:"custom-props",children:"Custom props"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/docs/building-applications/#custom-props",children:"Single-spa custom props"})," can be passed to your root component. In your application's entry file, add the props to your root component:"]}),"\n",(0,i.jsx)(n.h3,{id:"vue-2-1",children:"Vue 2"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const vueLifecycles = singleSpaVue({\n  Vue,\n  appOptions: {\n    render(h) {\n      return h(App, {\n        props: {\n          otherProp: this.otherProp,\n        },\n      });\n    },\n  },\n});\n"})}),"\n",(0,i.jsx)(n.h3,{id:"vue-3-1",children:"Vue 3"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const vueLifecycles = singleSpaVue({\n  Vue,\n  appOptions: {\n    render(h) {\n      return h(App, {\n        // Notice that this is not within a props object!\n        otherProp: this.otherProp,\n      });\n    },\n    router,\n  },\n});\n"})}),"\n",(0,i.jsx)(n.h2,{id:"shared-dependencies",children:"Shared dependencies"}),"\n",(0,i.jsx)(n.p,{children:"For performance, it is best to share a single version and instance of Vue, Vue Router, and other large libraries."}),"\n",(0,i.jsxs)(n.p,{children:["To do this, add your shared dependencies as ",(0,i.jsx)(n.a,{href:"https://webpack.js.org/configuration/externals",children:"webpack externals"}),". Then you use\nan in-browser module loader such as ",(0,i.jsx)(n.a,{href:"https://github.com/systemjs/systemjs",children:"systemjs"})," to provide those shared dependencies\nto each of the single-spa applications. Adding ",(0,i.jsx)(n.code,{children:"vue"})," and other libraries to your\n",(0,i.jsx)(n.a,{href:"http://single-spa-playground.org/playground/import-map",children:"import map"}),". For an example import map that is doing this,\ncheckout ",(0,i.jsx)(n.a,{href:"https://github.com/joeldenning/coexisting-vue-microfrontends/blob/master/root-html-file/index.html",children:"coexisting-vue-microfrontends' index.html file"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Sharing a single instance of Vue and other common libraries is highly recommended. See the\n",(0,i.jsx)(n.a,{href:"https://single-spa.js.org/docs/faq#is-there-a-recommended-setup",children:"recommended setup for single-spa"})," for more details on why."]}),"\n",(0,i.jsx)(n.h3,{id:"shared-deps-with-vue-cli",children:"Shared deps with Vue CLI"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'// vue.config.js\nmodule.exports = {\n  chainWebpack: (config) => {\n    config.externals(["vue", "vue-router"]);\n  },\n};\n'})}),"\n",(0,i.jsx)(n.h3,{id:"shared-deps-without-vue-cli",children:"Shared deps without Vue CLI"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'// webpack.config.js\nmodule.exports = {\n  externals: ["vue", "vue-router"],\n};\n'})}),"\n",(0,i.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,i.jsxs)(n.p,{children:["All options are passed to single-spa-vue via the ",(0,i.jsx)(n.code,{children:"opts"})," parameter when calling ",(0,i.jsx)(n.code,{children:"singleSpaVue(opts)"}),". The following options are available:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Vue"}),": (required) The main Vue object, which is generally either exposed onto the window or is available via ",(0,i.jsx)(n.code,{children:"require('vue')"})," ",(0,i.jsx)(n.code,{children:"import Vue from 'vue'"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"appOptions"}),": (required) An object or async function which will be used to instantiate your Vue.js application. ",(0,i.jsx)(n.code,{children:"appOptions"})," will pass directly through to ",(0,i.jsx)(n.code,{children:"new Vue(appOptions)"}),". Note that if you do not provide an ",(0,i.jsx)(n.code,{children:"el"})," to appOptions, that a div will be created and appended to the DOM as a default container for your Vue application. When ",(0,i.jsx)(n.code,{children:"appOptions"})," is an async function, it receives the single-spa props as an argument (as of ",(0,i.jsx)("span",{children:"single-spa-vue@"}),"2.4.0)."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"loadRootComponent"}),": (optional and replaces ",(0,i.jsx)(n.code,{children:"appOptions.render"}),") A promise that resolves with your root component. This is useful for lazy loading."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"handleInstance"}),": (optional) A method can be used to handle Vue instance. Vue 3 brings ",(0,i.jsx)(n.a,{href:"https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp",children:"new instance API"}),", and you can access ",(0,i.jsx)(n.em,{children:"the app instance"})," from this, like ",(0,i.jsx)(n.code,{children:"handleInstance: (app, props) => app.use(router)"}),". For Vue 2 users, a ",(0,i.jsx)(n.a,{href:"https://vuejs.org/v2/guide/instance.html",children:"Vue instance"})," can be accessed. The ",(0,i.jsx)(n.code,{children:"handleInstance(app, props)"})," function receives the instance as its first argument, and single-spa props as its second argument. If handleInstance returns a promise, single-spa-vue will wait to resolve the app / parcel's ",(0,i.jsx)(n.code,{children:"mount"})," lifecycle until the handleInstance promise resolves."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"replaceMode"}),": (optional, defaults to ",(0,i.jsx)(n.code,{children:"false"}),") A boolean that determines whether your root Vue component will entirely replace the container element it's mounted to. The Vue library always replaces, so to implement ",(0,i.jsx)(n.code,{children:"replaceMode: false"})," a temporary ",(0,i.jsx)(n.code,{children:'<div class="single-spa-container">'})," element is created inside of the container, so that Vue replaces that element rather than the container. Introduced in ",(0,i.jsx)("span",{children:"single-spa-vue@"}),"2.3.0."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["To configure which dom element the single-spa application is mounted to, use ",(0,i.jsx)(n.a,{href:"https://vuejs.org/v2/api/#el",children:"appOptions.el"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'const vueLifecycles = singleSpaVue({\n  Vue,\n  appOptions: {\n    render: (h) => h(App),\n    el: "#a-special-container",\n  },\n});\n'})}),"\n",(0,i.jsx)(n.p,{children:"To configure options asynchronously return a promise from appOptions function:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const vueLifecycles = singleSpaVue({\n  Vue,\n  async appOptions() {\n    return {\n      router: await routerFactory(),\n      render: (h) => h(App),\n    };\n  },\n});\n"})}),"\n",(0,i.jsx)(n.h2,{id:"parcels",children:"Parcels"}),"\n",(0,i.jsx)(n.h3,{id:"creating-a-parcel",children:"Creating a parcel"}),"\n",(0,i.jsx)(n.p,{children:"A parcel config is an object that represents a component implemented in Vue, React, Angular, or any other framework."}),"\n",(0,i.jsxs)(n.p,{children:["To create a VueJS single-spa parcel config object, simply omit the ",(0,i.jsx)(n.code,{children:"el"})," option from your appOptions, since the dom element will be specified by the user of the Parcel. Every other\noption should be provided exactly the same as in the example above."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const parcelConfig = singleSpaVue({...});\n"})}),"\n",(0,i.jsx)(n.h3,{id:"rendering-a-parcel",children:"Rendering a parcel"}),"\n",(0,i.jsxs)(n.p,{children:["To render a parcel config object in Vue, you can use single-spa-vue's ",(0,i.jsx)(n.code,{children:"Parcel"})," component:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-vue",children:'<template>\n  <Parcel\n    v-on:parcelMounted="parcelMounted()"\n    v-on:parcelUpdated="parcelUpdated()"\n    :config="parcelConfig"\n    :mountParcel="mountParcel"\n    :wrapWith="wrapWith"\n    :wrapClass="wrapClass"\n    :wrapStyle="wrapStyle"\n    :parcelProps="getParcelProps()"\n  />\n</template>\n\n<script>\n// For old versions of webpack\nimport Parcel from \'single-spa-vue/dist/esm/parcel\'\n// For new versions of webpack\nimport Parcel from \'single-spa-vue/parcel\'\n\nimport { mountRootParcel } from \'single-spa\'\n\nexport default {\n  components: {\n    Parcel\n  },\n  data() {\n    return {\n      /*\n        parcelConfig (object, required)\n\n        The parcelConfig is an object, or a promise that resolves with a parcel config object.\n        The object can originate from within the current project, or from a different\n        microfrontend via cross microfrontend imports. It can represent a Vue component,\n        or a React / Angular component.\n        https://single-spa.js.org/docs/recommended-setup#cross-microfrontend-imports\n\n        Vanilla js object:\n        parcelConfig: {\n          async mount(props) {},\n          async unmount(props) {}\n        }\n\n        // React component\n        parcelConfig: singleSpaReact({...})\n\n        // cross microfrontend import is shown below\n      */\n      parcelConfig: System.import(\'@org/other-microfrontend\').then(ns => ns.Widget),\n\n\n      /*\n        mountParcel (function, required)\n\n        The mountParcel function can be either the current Vue application\'s mountParcel prop or\n        the globally available mountRootParcel function. More info at\n        http://localhost:3000/docs/parcels-api#mountparcel\n      */\n      mountParcel: mountRootParcel,\n\n      /*\n        wrapWith (string, optional)\n\n        The wrapWith string determines what kind of dom element will be provided to the parcel.\n        Defaults to \'div\'\n      */\n      wrapWith: \'div\'\n\n      /*\n        wrapClass (string, optional)\n\n        The wrapClass string is applied to as the CSS class for the dom element that is provided to the parcel\n      */\n      wrapClass: "bg-red"\n\n      /*\n        wrapStyle (object, optional)\n\n        The wrapStyle object is applied to the dom element container for the parcel as CSS styles\n      */\n      wrapStyle: {\n        outline: \'1px solid red\'\n      },\n    }\n  },\n  methods: {\n    // These are the props passed into the parcel\n    getParcelProps() {\n      return {\n        text: `Hello world`\n      }\n    },\n    // Parcels mount asynchronously, so this will be called once the parcel finishes mounting\n    parcelMounted() {\n      console.log("parcel mounted");\n    },\n    parcelUpdated() {\n      console.log("parcel updated");\n    }\n  }\n}\n<\/script>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"webpack-public-path",children:"Webpack Public Path"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/single-spa/vue-cli-plugin-single-spa",children:"vue-cli-plugin-single-spa"})," sets the ",(0,i.jsx)(n.a,{href:"https://webpack.js.org/guides/public-path/#root",children:"webpack public path"})," via ",(0,i.jsx)(n.a,{href:"https://github.com/joeldenning/systemjs-webpack-interop",children:"SystemJSPublicPathWebpackPlugin"}),". By default, the public path is set to match the following output directory structure:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"dist/\n  js/\n    app.js\n  css/\n    main.css\n"})}),"\n",(0,i.jsxs)(n.p,{children:["With this directory structure (which is the Vue CLI default), the public path should ",(0,i.jsx)(n.strong,{children:"not"})," include the ",(0,i.jsx)(n.code,{children:"js"})," folder. This is accomplished by setting ",(0,i.jsx)(n.a,{href:"https://github.com/joeldenning/systemjs-webpack-interop#as-a-webpack-plugin",children:(0,i.jsx)(n.code,{children:"rootDirectoryLevel"})})," to be ",(0,i.jsx)(n.code,{children:"2"}),". If this doesn't match your directory structure or setup, you can change the ",(0,i.jsx)(n.code,{children:"rootDirectoryLevel"})," with the following code in your vue.config.js or webpack.config.js:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'// vue.config.js\nmodule.exports = {\n  chainWebpack(config) {\n    config.plugin("SystemJSPublicPathWebpackPlugin").tap((args) => {\n      args[0].rootDirectoryLevel = 1;\n      return args;\n    });\n  },\n};\n'})})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var i=s(6540);const t={},o=i.createContext(t);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);