if(!self.define){let e,a={};const n=(n,s)=>(n=new URL(n+".js",s).href,a[n]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=a,document.head.appendChild(e)}else e=n,importScripts(n),a()})).then((()=>{let e=a[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};a[c]=Promise.all(s.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/192.png",revision:"82fd69cae1b0ee7e166f4bfb544ceea5"},{url:"/_next/static/BCTRU7aKIR-fn36bVZvxG/_buildManifest.js",revision:"e57a59d253dabd0e0d31ccdad4b9a2b4"},{url:"/_next/static/BCTRU7aKIR-fn36bVZvxG/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1749-27025c2559688c0a.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/1880-aede1c8ffbc730d5.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/2894-1c51c024108a9c46.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/2899-0c23540fb763eb21.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/4433-29ea46e90ffabc60.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/4642-e67e8d0cf2f542f4.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/5250-8b2c60ad6d1a4d68.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/5468-2e8bfea456f2fb64.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/5602-322217c5b923732f.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/5e22fd23-06d411474a67bbfa.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/7657-f0c489a64e1460dc.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/795d4814-275add011fbc3154.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/8212.fe8d50e743770faf.js",revision:"fe8d50e743770faf"},{url:"/_next/static/chunks/8618-70ee26e37dcf81e1.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/9c4e2130-ff3a8c2b55d31ab3.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/board/detail/%5BpostId%5D/page-faebf295a01009eb.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/board/posting/%5BpostId%5D/page-85043240eff049df.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/bookclubs/%5Bid%5D/page-b76aa0e205180712.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/bookclubs/create/page-0c082d8ba07a55f9.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/bookclubs/layout-1b6814d28bc1e3b7.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/bookclubs/page-65adbe020dc9a649.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/layout-757179d126636365.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/my-clubs/%5BclubId%5D/info/page-1fd5a595013f6cd3.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/my-clubs/%5BclubId%5D/layout-9e9fcc941d12e703.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/my-clubs/%5BclubId%5D/posts/page-049676e479ba7636.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/my-clubs/%5BclubId%5D/quizzes/page-2660787f0b53acb7.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/my-clubs/%5BclubId%5D/sentences/page-5f421a2d58436ad2.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/my-clubs/layout-10207cfd6a8c2f8e.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/my-clubs/page-8ea51cf0ebe769dc.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/mypage/%5BuserId%5D/page-09d31ac9258ef82b.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/mypage/layout-0daee3fb391bf31e.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/mypage/mybookclubs/page-60f286aff4382230.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/mypage/mysentences/page-0e5fabf6823af517.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/mypage/page-d1f85d31a17c4b01.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/readbook/%5Bid%5D/%5Bsave%5D/page-31d86e970f6c75ac.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/readbook/%5Bid%5D/layout-5757bffc54683c5f.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/readbook/%5Bid%5D/page-4fbf3b801e891c2e.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/readbook/layout-3d38ab06fc5bdbfa.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/(navigationBar)/readbook/page-7704d7276d4d6280.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/chat/%5Bid%5D/page-c2f03e74de6706f2.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/layout-c83ce55e8b316c84.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/login/page-109c1d9d66be7f46.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/not-found-f632eca54f845198.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/page-ff90dca52b4a3ad6.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/register/page-611b7907449070e1.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/register/set-nickname/page-2bad5cafa5bb5c48.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/app/register/set-profile-image/page-ee1b244efb626669.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/e34aaff9-9b585370ef1a1b55.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/f8025e75-c2e0fb283dbc09e1.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/fd9d1056-ec4cf73413209f18.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/framework-20adfd98f723306f.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/main-6135e9901b3299af.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/main-app-d0e3824741b237a0.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/pages/_app-794d85baa83ca682.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/pages/_error-5fb63848e0136a02.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f847513a12e288fd.js",revision:"BCTRU7aKIR-fn36bVZvxG"},{url:"/_next/static/css/4df78f2cd73d6b26.css",revision:"4df78f2cd73d6b26"},{url:"/_next/static/css/c7c3065e5a2875d4.css",revision:"c7c3065e5a2875d4"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/booktiquereadblue.ac1a9bb8.png",revision:"3e0308ea9e4a7d5f46363deea50f0dc3"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/closeInput.52f41c9a.svg",revision:"fc4bcd40a31dfb304c148e3751841a38"},{url:"/_next/static/media/close_read.8bee1e20.png",revision:"7084d04782c3012e051f58e832ee6fad"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/defaultImage.f5a47864.svg",revision:"6a0b692ae926f89d72fed0e980edefef"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/footer_mybookclub.7cabaa2b.png",revision:"ab5c3761fc57613ea349fef3658aac69"},{url:"/_next/static/media/footer_mybookclubactive.5222dce0.png",revision:"21ed2f4a40c6a35631e8fe16c4b0d350"},{url:"/_next/static/media/footer_mypage.d8067e44.png",revision:"f157c275ff4a1a0aadced3f650f15072"},{url:"/_next/static/media/footer_mypageactive.e31a1b5a.png",revision:"5df41489a2a5abde6b3f187c19278ac4"},{url:"/_next/static/media/footer_readbook.6c97dc74.png",revision:"7c2e0d7ae45fa0e9066c10940a53b5d5"},{url:"/_next/static/media/footer_readbookactive.f49b231d.png",revision:"3eabdf5fe68267c41c080c236e8d801a"},{url:"/_next/static/media/footer_searchclub.6036c42a.png",revision:"05d87e7c45b59c8585012a36ee53ccf8"},{url:"/_next/static/media/footer_searchclubactive.c0746b8c.png",revision:"c6740e1dc3d0e613198546609787cc48"},{url:"/_next/static/media/readbook_completed_read.b19ce11a.png",revision:"8871800f47ed6fefa023e27a3c67250a"},{url:"/_next/static/media/readbook_noclub.0c1c4e91.png",revision:"2a60a95d65967fbb6b45e1a82bc58c6c"},{url:"/_next/static/media/readbook_yet_read.68f7b160.png",revision:"b85147681becad525e6fbe5ec19528cc"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/android-launchericon-512-512.png",revision:"f7ad2735d3c44759f10b02f1df692234"},{url:"/backArrow.svg",revision:"883e70698e5cf6eb9ecf6ffe57820275"},{url:"/badge.png",revision:"d3abc1177ab2a957b15880ecf372ea87"},{url:"/bookbookddakgi.png",revision:"517f210a62085ec0a1a19d3dd75a687c"},{url:"/booktiquereadblue.png",revision:"3e0308ea9e4a7d5f46363deea50f0dc3"},{url:"/camera.svg",revision:"f0c1a0074250b42cdbf64bf34550e3df"},{url:"/closeInput.svg",revision:"fc4bcd40a31dfb304c148e3751841a38"},{url:"/close_input.png",revision:"0844a0221f796f99862ed1eed2d3c9b6"},{url:"/close_read.png",revision:"7084d04782c3012e051f58e832ee6fad"},{url:"/defaultImage.svg",revision:"6a0b692ae926f89d72fed0e980edefef"},{url:"/fail.svg",revision:"f821dea818c89e3b5a923eb75a662d2e"},{url:"/favicon.png",revision:"4736f362cdde93262a922fe6d5d59693"},{url:"/footer_mybookclub.png",revision:"ab5c3761fc57613ea349fef3658aac69"},{url:"/footer_mybookclubactive.png",revision:"21ed2f4a40c6a35631e8fe16c4b0d350"},{url:"/footer_mypage.png",revision:"f157c275ff4a1a0aadced3f650f15072"},{url:"/footer_mypageactive.png",revision:"5df41489a2a5abde6b3f187c19278ac4"},{url:"/footer_readbook.png",revision:"7c2e0d7ae45fa0e9066c10940a53b5d5"},{url:"/footer_readbookactive.png",revision:"3eabdf5fe68267c41c080c236e8d801a"},{url:"/footer_searchclub.png",revision:"05d87e7c45b59c8585012a36ee53ccf8"},{url:"/footer_searchclubactive.png",revision:"c6740e1dc3d0e613198546609787cc48"},{url:"/login_kakao.png",revision:"efd4cad7bd9bbc2ff9ad1c9090a025c6"},{url:"/login_logo.png",revision:"59403737d7299be623e19e8f27672a2e"},{url:"/logo_google.png",revision:"88ebe6a7760267e3b9245abfcb080c81"},{url:"/manifest.json",revision:"4a7f7d6cd51b4d44ac831d1091d00431"},{url:"/no_post.png",revision:"cdd1887dd329471007a3befc2cdd4043"},{url:"/no_quiz.png",revision:"6f77bee831354201b376dd5b46e2350f"},{url:"/no_search.png",revision:"16266ff15ee8ba937dd763854164b798"},{url:"/no_sentence.png",revision:"b1841becbbdc480a5ae03ffa1fb0c4ff"},{url:"/notFound.svg",revision:"74df76781d16b12290aaac08116bb382"},{url:"/readbook_completed_read.png",revision:"8871800f47ed6fefa023e27a3c67250a"},{url:"/readbook_noclub.png",revision:"2a60a95d65967fbb6b45e1a82bc58c6c"},{url:"/readbook_yet_read.png",revision:"b85147681becad525e6fbe5ec19528cc"},{url:"/sns.png",revision:"7623ee47b1277c8474e041657985b911"},{url:"/snsTitle.png",revision:"a89dc8113fb950df9ee0e18d218f5afe"},{url:"/success.svg",revision:"668935fc8548cb3e19ed1caca1d7a193"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
