(this.webpackJsonpflow_frontend_backbone=this.webpackJsonpflow_frontend_backbone||[]).push([[6],{142:function(e,t,n){"use strict";var r=n(7),o=n(0),a=n.n(o),i=n(3),c=n(8),u=i.b.div.withConfig({displayName:"TabContainer__ContainerWrapper",componentId:"sc-3vwu9h-0"})(["width:",";border-radius:4px;background:",";",""],(function(e){return e.width||"100%"}),(function(e){return e.theme.white}),c.b),l=i.b.div.withConfig({displayName:"TabContainer__TabsWrapper",componentId:"sc-3vwu9h-1"})(["display:flex;flex-direction:row;"]),s=i.b.div.withConfig({displayName:"TabContainer__Tab",componentId:"sc-3vwu9h-2"})(["display:flex;flex:1;justify-content:center;align-items:center;height:64px;cursor:pointer;border-radius:",";background:",";color:",";"," font-weight:",";"],(function(e){var t=e.first,n=e.last;return e.selected?t?"4px 0 0 4px":n?"0 4px 4px 0":"0":"0"}),(function(e){var t=e.selected,n=e.theme;return t?n.white:n.light2}),(function(e){var t=e.selected,n=e.theme;return t?n.dark1:n.dark3}),c.f,(function(e){return e.selected?600:400})),d=i.b.div.withConfig({displayName:"TabContainer__ContentContainer",componentId:"sc-3vwu9h-3"})(["width:100%;background:white;padding:",";border-radius:0 0 4px 4px;"],(function(e){return e.padding}));t.a=function(e){var t=e.tabList,n=e.containerWidth,i=e.tabWidth,c=e.initialSelectedTab,f=void 0===c?0:c,g=e.contentPadding,p=void 0===g?"32px":g,m=Object(o.useState)(f),h=Object(r.a)(m,2),b=h[0],v=h[1];return a.a.createElement(u,{width:n},a.a.createElement(l,null,t.map((function(e,n){return a.a.createElement(s,{key:n,width:i,selected:n===b,first:0===n,last:n===t.length-1,onClick:function(){e.onClick&&e.onClick(n),v(n)}},e.title)}))),a.a.createElement(d,{padding:p},t[b].render()))}},169:function(e,t,n){"use strict";var r=n(7),o=n(0),a=n.n(o),i=n(208),c=n(3),u=n(8),l=c.b.table.withConfig({displayName:"Table__TableWrapper",componentId:"sc-1jju4yo-0"})(["width:100%;min-width:100%;border-radius:4px;text-align:left;table-layout:auto;border-collapse:collapse;color:",";"],(function(e){return e.theme.dark2})),s=c.b.thead.withConfig({displayName:"Table__TableHeader",componentId:"sc-1jju4yo-1"})(["border-radius:4px;width:100%;"]),d=c.b.tr.withConfig({displayName:"Table__HeaderRow",componentId:"sc-1jju4yo-2"})(["width:100%;border-bottom:1px solid ",";"],(function(e){return e.theme.light3})),f=c.b.th.withConfig({displayName:"Table__HeaderCell",componentId:"sc-1jju4yo-3"})(["text-align:",";width:","px;min-width:","px;padding-top:16px;padding-bottom:16px;vertical-align:top;padding-left:",";padding-right:",";&:first-child{padding-left:32px;width:","px;max-width:","px;}&:last-child{padding-left:0;padding-right:32px;width:","px;max-width:","px;}"],(function(e){var t=e.align;return t||"left"}),(function(e){return e.maxWidth+16}),(function(e){return e.maxWidth+16}),(function(e){return e.rightAlign?"16px":"0"}),(function(e){return e.rightAlign?"16px":"0"}),(function(e){return e.maxWidth+32+16}),(function(e){return e.maxWidth+24+16}),(function(e){return e.maxWidth+24+16}),(function(e){return e.maxWidth+24+16})),g=c.b.span.withConfig({displayName:"Table__HeaderText",componentId:"sc-1jju4yo-4"})([""," cursor:",";color:",";&:hover{color:",";}"],(function(e){return e.sortable?u.h:""}),(function(e){return e.sortable?"pointer":"inherit"}),(function(e){var t=e.theme;return e.sortable?t.primary:t.dark1}),(function(e){var t=e.theme;return e.sortable?t.primaryDark:t.dark1})),p=c.b.span.withConfig({displayName:"Table__SortArrow",componentId:"sc-1jju4yo-5"})(["color:",";text-decoration:none !important;"],(function(e){return e.theme.primary})),m=c.b.tbody.withConfig({displayName:"Table__TableBody",componentId:"sc-1jju4yo-6"})(["width:100%;"]),h=c.b.tr.withConfig({displayName:"Table__Row",componentId:"sc-1jju4yo-7"})(["position:relative;width:100%;border-radius:4px;border-bottom:1px solid ",";&:last-child{border-bottom:none;}"],(function(e){return e.theme.light3})),b=c.b.td.withConfig({displayName:"Table__Cell",componentId:"sc-1jju4yo-8"})(["padding-top:16px;padding-bottom:16px;text-align:",";vertical-align:top;&:first-child{padding-left:32px;padding-right:0;}&:last-child{padding-left:0;padding-right:32px;}&:only-child{padding:auto 32px;}"],(function(e){var t=e.align;return t||"left"})),v=c.b.tr.withConfig({displayName:"Table__TableBottom",componentId:"sc-1jju4yo-9"})([""]),x=n(60);t.a=function(e){var t=e.columns,n=e.data,c=e.sortable,u=void 0!==c&&c,y=e.loading,w=void 0!==y&&y,_=e.fetchMore,C=void 0===_?function(){}:_,E=Object(o.useState)(!1),j=Object(r.a)(E,2),k=j[0],O=j[1],T=Object(o.useRef)(null),I=function(){T.current&&(T.current.offsetTop-window.scrollY<1e3&&!w&&O(!0))};Object(o.useEffect)((function(){k&&(C(),O(!1))}),[k]),Object(o.useEffect)((function(){return window.addEventListener("scroll",(function(){return I()})),window.removeEventListener("scroll",(function(){return I()}))}),[T,w]);var S=Object(i.b)({columns:t,data:n},i.a),N=S.getTableProps,R=S.headerGroups,F=S.rows,P=S.prepareRow;return a.a.createElement(l,N(),a.a.createElement(s,null,R.map((function(e){return a.a.createElement(d,e.getHeaderGroupProps(),e.headers.map((function(e){return a.a.createElement(f,Object.assign({},e.getHeaderProps(u&&e.getSortByToggleProps()),{align:e.align,maxWidth:e.maxWidth}),a.a.createElement(g,{sortable:u},e.render("Header")),a.a.createElement(p,null,e.sorted?e.sortedDesc?" \u25b2":" \u25bc":""))})))}))),a.a.createElement(m,null,F.map((function(e){return P(e)||a.a.createElement(h,e.getRowProps(),e.cells.map((function(e){return a.a.createElement(b,Object.assign({},e.getCellProps(),{align:e.column.align,style:e.column.style}),e.render("Cell"))})))})),w&&a.a.createElement(h,null,a.a.createElement(b,{colSpan:t.length,style:{padding:0}},a.a.createElement(x.a,{margin:"4px auto"}))),a.a.createElement(v,{ref:T})))}},170:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(496),i=n(3),c=n(8),u=i.b.div.withConfig({displayName:"CheckCircle__CheckCircleWrapper",componentId:"bvxd24-0"})(["width:","px;min-width:","px;height:","px;min-height:","px;background-color:",";border:3px solid ",";border-radius:50%;user-select:none;cursor:",";"," position:relative;"],(function(e){return e.width}),(function(e){return e.width}),(function(e){return e.width}),(function(e){return e.width}),(function(e){var t=e.checked,n=e.color,r=e.theme;return t?n:r.light2}),(function(e){var t=e.checked,n=e.color,r=e.theme;return t?n:r.light4}),(function(e){return e.disabled?"inherit":"pointer"}),c.b),l=i.b.div.withConfig({displayName:"CheckCircle__CheckIcon",componentId:"bvxd24-1"})(["position:absolute;top:2px;left:1px;"]);t.a=function(e){var t=e.color,n=e.checked,r=void 0!==n&&n,i=e.width,c=void 0===i?32:i,s=e.disabled,d=void 0===s||s,f=e.onClick,g=void 0===f?function(){}:f;return o.a.createElement(u,{onClick:function(){return d?null:g()},disabled:d,width:c,color:t,checked:r},r?o.a.createElement(l,null,o.a.createElement(a.a,{color:"white",size:24,strokeWidth:3})):null)}},197:function(e,t,n){"use strict";var r=n(32),o=n(33),a=n.n(o);function i(){var e=Object(r.a)(["\n  fragment CourseRequirementsFragment on course {\n    antireqs\n    coreqs\n    prereqs\n    prerequisites {\n      prerequisite {\n        id\n        code\n        name\n      }\n    }\n    postrequisites {\n      postrequisite {\n        id\n        code\n        name\n      }\n    }\n  }\n  "]);return i=function(){return e},e}function c(){var e=Object(r.a)(["\n    fragment CourseScheduleFragment on course {\n      sections {\n        id\n        enrollment_capacity\n        enrollment_total\n        class_number\n        campus\n        section\n        term\n        meetings {\n          days\n          start_date\n          end_date\n          start_seconds\n          end_seconds\n          location\n          prof {\n            id\n            name\n          }\n          is_closed\n          is_cancelled\n        }\n        exams {\n          date\n          day\n          end_seconds\n          is_tba\n          location\n          section_id\n          start_seconds\n        }\n      }\n    }\n  "]);return c=function(){return e},e}function u(){var e=Object(r.a)(["\n    fragment CourseTermFragment on course {\n      sections {\n        term\n      }\n    }\n  "]);return u=function(){return e},e}function l(){var e=Object(r.a)(["\n    fragment CourseInfoFragment on course {\n      id\n      code\n      name\n      description\n      course_reviews_aggregate {\n        aggregate {\n          avg {\n            easy\n            liked\n            useful\n          }\n          count(columns: liked)\n          text_count: count(columns: text)\n        }\n      }\n    }\n  "]);return l=function(){return e},e}var s={courseInfo:a()(l()),courseTerm:a()(u()),courseSchedule:a()(c()),courseRequirements:a()(i())};t.a=s},198:function(e,t,n){"use strict";var r=n(32),o=n(33),a=n.n(o);function i(){var e=Object(r.a)(["\n    fragment ProfCoursesTaughtFragment on prof {\n      prof_courses {\n        course {\n          code\n        }\n      }\n    }\n  "]);return i=function(){return e},e}function c(){var e=Object(r.a)(["\n    fragment ProfCourseReviewsAggregateFragment on prof {\n      course_reviews_aggregate {\n        aggregate {\n          avg {\n            liked\n          }\n        }\n      }\n    }\n  "]);return c=function(){return e},e}function u(){var e=Object(r.a)(["\n    fragment ProfProfReviewsAggregateFragment on prof {\n      prof_reviews_aggregate {\n        aggregate {\n          avg {\n            clear\n            engaging\n          }\n          count\n          text_count: count(columns: text)\n        }\n      }\n    }\n  "]);return u=function(){return e},e}function l(){var e=Object(r.a)(["\n    fragment ProfInfoFragment on prof {\n      id\n      name\n      code\n    }\n  "]);return l=function(){return e},e}var s={profInfo:a()(l()),profProfReviewsAggregate:a()(u()),profCourseReviewsAggregate:a()(c()),profCoursesTaught:a()(i())};t.a=s},201:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(264),i=n(3),c=n(8),u=i.b.div.withConfig({displayName:"DiscreteSlider__DiscreteSliderWrapper",componentId:"jekzkh-0"})(["color:",";display:flex;flex-direction:row;margin:",";"],(function(e){return e.color}),(function(e){return e.margin})),l=i.b.div.withConfig({displayName:"DiscreteSlider__SliderBarWrapper",componentId:"jekzkh-1"})(["width:300px;margin:auto 0;"]),s=i.b.div.withConfig({displayName:"DiscreteSlider__SliderRail",componentId:"jekzkh-2"})(["margin:auto;width:100%;height:8px;background-color:",";border-radius:4px;cursor:pointer;",""],(function(e){return e.theme.light3}),c.b),d=i.b.div.withConfig({displayName:"DiscreteSlider__SliderHandle",componentId:"jekzkh-3"})(["left:","%;position:absolute;margin-left:-16px;margin-top:-20px;z-index:3;width:32px;height:32px;border:3px solid ",";cursor:pointer;border-radius:50%;background-color:",";",""],(function(e){return e.percent}),(function(e){return e.theme.white}),(function(e){return e.color}),c.b),f=i.b.div.withConfig({displayName:"DiscreteSlider__SliderTrack",componentId:"jekzkh-4"})(["position:absolute;height:8px;z-index:1;margin-top:-8px;background-color:",";border-radius:4px;cursor:pointer;left:","%;width:","%;"],(function(e){return e.color}),(function(e){return e.source.percent}),(function(e){var t=e.target,n=e.source;return t.percent-n.percent})),g=i.b.div.withConfig({displayName:"DiscreteSlider__SliderTick",componentId:"jekzkh-5"})(["position:absolute;margin-left:-8px;margin-top:-11px;z-index:2;height:8px;width:8px;background-color:",";border-radius:50%;box-sizing:content-box;border:3px solid ",";cursor:pointer;left:","%;"],(function(e){return e.color}),(function(e){return e.theme.white}),(function(e){return e.percent})),p=function(e){var t=e.handle,n=t.id,r=t.percent,a=e.getHandleProps,i=e.color;return o.a.createElement(d,Object.assign({percent:r,color:i},a(n)))},m=function(e){var t=e.source,n=e.target,r=e.color,a=e.getTrackProps;return o.a.createElement(f,Object.assign({target:n,source:t,color:r},a()))};t.a=Object(i.d)((function(e){for(var t=e.theme,n=e.numNodes,r=e.currentNode,i=e.color,c=e.onUpdate,d=e.margin,f=void 0===d?"0 0 40px 0":d,h=e.showTicks,b=void 0===h||h,v=n>1?100/(n-1):100,x=[],y=0;y<100;y+=v)x.push(y);return x.push(100),o.a.createElement(u,{margin:f},o.a.createElement(l,null,o.a.createElement(a.c,{step:1,mode:2,domain:[0,n-1],onUpdate:c,values:[r],rootStyle:{position:"relative",width:"100%",height:"8px"}},o.a.createElement(a.b,null,(function(e){var n=e.getRailProps;return o.a.createElement(o.a.Fragment,null,o.a.createElement(s,n()),b&&x.map((function(e,a){return o.a.createElement(g,Object.assign({key:e,color:a<=r?i:t.light3,percent:e},n()))})))})),o.a.createElement(a.a,null,(function(e){var t=e.handles,n=e.getHandleProps;return o.a.createElement("div",{className:"slider-handles"},t.map((function(e){return o.a.createElement(p,{key:e.id,handle:e,getHandleProps:n,color:i})})))})),o.a.createElement(a.d,{right:!1},(function(e){var t=e.tracks,n=e.getTrackProps;return o.a.createElement("div",{className:"slider-tracks"},t.map((function(e){var t=e.id,r=e.source,a=e.target;return o.a.createElement(m,{key:t,source:r,target:a,color:i,getTrackProps:n})})))})))))}))},202:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(170),i=n(3),c=n(8),u=i.b.div.withConfig({displayName:"RadioButton__RadioButtonWrapper",componentId:"sc-1ybb9ar-0"})(["display:flex;flex-direction:row;margin:",";"],(function(e){return e.margin})),l=i.b.div.withConfig({displayName:"RadioButton__RadioButtonOption",componentId:"sc-1ybb9ar-1"})(["display:flex;flex-direction:row;margin-right:24px;&:last-child{margin-right:0;}"]),s=i.b.div.withConfig({displayName:"RadioButton__RadioButtonText",componentId:"sc-1ybb9ar-2"})([""," font-weight:600;margin:auto;margin-left:8px;color:",";"],c.a,(function(e){return e.theme.dark2}));t.a=function(e){var t=e.color,n=e.selected,r=e.options,i=e.margin,c=void 0===i?"0 0 40px 0":i,d=e.toggle,f=void 0!==d&&d,g=e.onClick,p=void 0===g?function(){}:g;return o.a.createElement(u,{margin:c},r.map((function(e,r){return o.a.createElement(l,{key:r},o.a.createElement(a.a,{color:t,disabled:!1,checked:f&&n||!f&&r===n,onClick:function(){return p(r)}}),o.a.createElement(s,null,e))})))}},484:function(e,t,n){"use strict";var r=n(485),o=n(489),a=n(493),i=n(494),c=n(495);function u(e,t){return t.encode?t.strict?a(e):encodeURIComponent(e):e}function l(e,t){return t.decode?i(e):e}function s(e){var t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function d(e){var t=(e=s(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function f(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"===typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function g(e,t){var n=function(e){var t;switch(e.arrayFormat){case"index":return function(e,n,r){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===r[e]&&(r[e]={}),r[e][t[1]]=n):r[e]=n};case"bracket":return function(e,n,r){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],n):r[e]=[n]:r[e]=n};case"comma":return function(e,t,n){var r="string"===typeof t&&t.split("").indexOf(",")>-1?t.split(","):t;n[e]=r};default:return function(e,t,n){void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}(t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",parseNumbers:!1,parseBooleans:!1},t)),o=Object.create(null);if("string"!==typeof e)return o;if(!(e=e.trim().replace(/^[?#&]/,"")))return o;var a=!0,i=!1,u=void 0;try{for(var s,d=e.split("&")[Symbol.iterator]();!(a=(s=d.next()).done);a=!0){var g=s.value,p=c(g.replace(/\+/g," "),"="),m=r(p,2),h=m[0],b=m[1];b=void 0===b?null:l(b,t),n(l(h,t),b,o)}}catch(j){i=!0,u=j}finally{try{a||null==d.return||d.return()}finally{if(i)throw u}}for(var v=0,x=Object.keys(o);v<x.length;v++){var y=x[v],w=o[y];if("object"===typeof w&&null!==w)for(var _=0,C=Object.keys(w);_<C.length;_++){var E=C[_];w[E]=f(w[E],t)}else o[y]=f(w,t)}return!1===t.sort?o:(!0===t.sort?Object.keys(o).sort():Object.keys(o).sort(t.sort)).reduce((function(e,t){var n=o[t];return Boolean(n)&&"object"===typeof n&&!Array.isArray(n)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"===typeof t?e(Object.keys(t)).sort((function(e,t){return Number(e)-Number(t)})).map((function(e){return t[e]})):t}(n):e[t]=n,e}),Object.create(null))}t.extract=d,t.parse=g,t.stringify=function(e,t){if(!e)return"";var n=function(e){switch(e.arrayFormat){case"index":return function(t){return function(n,r){var a=n.length;return void 0===r?n:[].concat(o(n),null===r?[[u(t,e),"[",a,"]"].join("")]:[[u(t,e),"[",u(a,e),"]=",u(r,e)].join("")])}};case"bracket":return function(t){return function(n,r){return void 0===r?n:[].concat(o(n),null===r?[[u(t,e),"[]"].join("")]:[[u(t,e),"[]=",u(r,e)].join("")])}};case"comma":return function(t){return function(n,r,o){return null===r||void 0===r||0===r.length?n:0===o?[[u(t,e),"=",u(r,e)].join("")]:[[n,u(r,e)].join(",")]}};default:return function(t){return function(n,r){return void 0===r?n:[].concat(o(n),null===r?[u(t,e)]:[[u(t,e),"=",u(r,e)].join("")])}}}}(t=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},t)),r=Object.keys(e);return!1!==t.sort&&r.sort(t.sort),r.map((function(r){var o=e[r];return void 0===o?"":null===o?u(r,t):Array.isArray(o)?o.reduce(n(r),[]).join("&"):u(r,t)+"="+u(o,t)})).filter((function(e){return e.length>0})).join("&")},t.parseUrl=function(e,t){return{url:s(e).split("?")[0]||"",query:g(d(e),t)}}},485:function(e,t,n){var r=n(486),o=n(487),a=n(488);e.exports=function(e,t){return r(e)||o(e,t)||a()}},486:function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},487:function(e,t){e.exports=function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(u){o=!0,a=u}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}}},488:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},489:function(e,t,n){var r=n(490),o=n(491),a=n(492);e.exports=function(e){return r(e)||o(e)||a()}},490:function(e,t){e.exports=function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}},491:function(e,t){e.exports=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}},492:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},493:function(e,t,n){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,(function(e){return"%".concat(e.charCodeAt(0).toString(16).toUpperCase())}))}},494:function(e,t,n){"use strict";var r=new RegExp("%[a-f0-9]{2}","gi"),o=new RegExp("(%[a-f0-9]{2})+","gi");function a(e,t){try{return decodeURIComponent(e.join(""))}catch(o){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),r=e.slice(t);return Array.prototype.concat.call([],a(n),a(r))}function i(e){try{return decodeURIComponent(e)}catch(o){for(var t=e.match(r),n=1;n<t.length;n++)t=(e=a(t,n).join("")).match(r);return e}}e.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var n={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},r=o.exec(e);r;){try{n[r[0]]=decodeURIComponent(r[0])}catch(t){var a=i(r[0]);a!==r[0]&&(n[r[0]]=a)}r=o.exec(e)}n["%C2"]="\ufffd";for(var c=Object.keys(n),u=0;u<c.length;u++){var l=c[u];e=e.replace(new RegExp(l,"g"),n[l])}return e}(e)}}},495:function(e,t,n){"use strict";e.exports=function(e,t){if("string"!==typeof e||"string"!==typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];var n=e.indexOf(t);return-1===n?[e]:[e.slice(0,n),e.slice(n+t.length)]}},501:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(17),i=n(26),c=n(35),u=n(59),l=n(484),s=n.n(l),d=n(29),f=n(7),g=n(3),p=n(24),m=n(8),h=g.b.div.withConfig({displayName:"ExplorePage__ExplorePageWrapper",componentId:"sc-1uoo4ty-0"})(["display:flex;flex-direction:column;width:100%;min-height:100%;"]),b=g.b.div.withConfig({displayName:"ExplorePage__ExploreHeaderWrapper",componentId:"sc-1uoo4ty-1"})(["width:100%;margin-bottom:32px;display:flex;background-color:",";flex-direction:column;position:relative;"],(function(e){return e.theme.primaryExtraDark})),v=g.b.div.withConfig({displayName:"ExplorePage__ExploreHeaderText",componentId:"sc-1uoo4ty-2"})([""," "," padding-top:48px !important;padding-bottom:16px !important;word-break:break-all;min-height:104px;display:flex;flex-direction:row;margin:auto;position:relative;color:",";font-weight:400;"],m.j,m.e,(function(e){return e.theme.light1})),x=g.b.div.withConfig({displayName:"ExplorePage__ColumnWrapper",componentId:"sc-1uoo4ty-3"})([""," margin:auto;display:flex;"],m.j),y=g.b.div.withConfig({displayName:"ExplorePage__Column1",componentId:"sc-1uoo4ty-4"})(["",""],m.m),w=g.b.div.withConfig({displayName:"ExplorePage__Column2",componentId:"sc-1uoo4ty-5"})(["",""],m.l),_=Object(g.b)(p.a).withConfig({displayName:"ExplorePage__CourseCode",componentId:"sc-1uoo4ty-6"})([""," color:",";"],m.h,(function(e){return e.theme.courses})),C=Object(g.b)(p.a).withConfig({displayName:"ExplorePage__ProfName",componentId:"sc-1uoo4ty-7"})([""," color:",";"],m.h,(function(e){return e.theme.professors})),E=n(169),j=n(142),k=n(72),O=n(10),T=[{Header:"Course code",accessor:"code",align:"left",maxWidth:120,Cell:function(e){var t=e.cell;return o.a.createElement(_,{to:Object(O.i)(t.value)},Object(k.g)(t.value))}},{Header:"Course Name",accessor:"name",align:"left",maxWidth:128},{Header:"Ratings",accessor:"ratings",align:"right",maxWidth:80},{Header:"Useful",accessor:"useful",align:"right",maxWidth:64,Cell:function(e){var t=e.cell;return"".concat(Math.round(100*t.value),"%")}},{Header:"Easy",accessor:"easy",align:"right",maxWidth:64,Cell:function(e){var t=e.cell;return"".concat(Math.round(100*t.value),"%")}},{Header:"Liked",accessor:"liked",align:"right",maxWidth:64,Cell:function(e){var t=e.cell;return"".concat(Math.round(100*t.value),"%")}}],I=[{Header:"Professor name",accessor:"code_name",align:"left",maxWidth:160,Cell:function(e){var t=e.cell;return o.a.createElement(C,{to:Object(O.j)(t.value.code)},t.value.name)}},{Header:"Ratings",accessor:"ratings",align:"right",maxWidth:80},{Header:"Clear",accessor:"clear",align:"right",maxWidth:64,Cell:function(e){var t=e.cell;return"".concat(Math.round(100*t.value),"%")}},{Header:"Engaging",accessor:"engaging",align:"right",maxWidth:64,Cell:function(e){var t=e.cell;return"".concat(Math.round(100*t.value),"%")}},{Header:"Liked",accessor:"liked",align:"right",maxWidth:64,Cell:function(e){var t=e.cell;return"".concat(Math.round(100*t.value),"%")}}],S=g.b.div.withConfig({displayName:"SearchResults__SearchResultsContent",componentId:"sc-1efwv45-0"})(["overflow-x:auto;"]),N=Object(k.a)(),R=Object(k.b)(),F=function(e){var t=e.filterState,n=e.data,a=e.exploreTab,i=e.setExploreTab,c=e.ratingFilters,u=e.profCourses,l=e.loading,s=(e.fecthMore,n?n.course.map((function(e){return Object({id:e.id,code:e.code,name:e.name,description:e.description,ratings:e.course_reviews_aggregate.aggregate.count,easy:e.course_reviews_aggregate.aggregate.avg.easy/5,liked:e.course_reviews_aggregate.aggregate.avg.liked,useful:e.course_reviews_aggregate.aggregate.avg.useful/5,sections:e.sections})})):[]),d=n?n.prof.map((function(e){return Object({code_name:{code:e.code,name:e.name},ratings:e.prof_reviews_aggregate.aggregate.count,clear:e.prof_reviews_aggregate.aggregate.avg.clear/5,engaging:e.prof_reviews_aggregate.aggregate.avg.engaging/5,liked:e.course_reviews_aggregate.aggregate.avg.liked,courses:e.prof_courses.map((function(e){return e.code}))})})):[],f=Object(r.useCallback)((function(){for(var e="",n=t.courseCodes.length-1;n>=0;n--)t.courseCodes[n]&&(e+="|".concat(n<t.courseCodes.length-1?n+1:"[5-8]"));return e=""===e?"a^":"(".concat(e.slice(1),")([0-9]{2})"),new RegExp(e)}),[t]),g=s.filter((function(e){return f().test(e.code)&&e.ratings>=c[t.numCourseRatings]&&(!t.currentTerm||t.currentTerm&&e.sections&&e.sections.some((function(e){return Number(e.term)===N})))&&(!t.nextTerm||t.nextTerm&&e.sections&&e.sections.some((function(e){return Number(e.term)===R})))})),p=d.filter((function(e){return e.ratings>=c[t.numProfRatings]&&(0===t.courseTaught||e.courses.includes(u[t.courseTaught]))})),m=0===a,h=function(){return o.a.createElement(S,null,o.a.createElement(E.a,{data:m?g:p,columns:m?T:I,rightAlignIndex:m?2:1,sortable:!0,loading:l}))};return o.a.createElement(j.a,{tabList:[{onClick:function(){return i(0)},title:"Courses ".concat(n?"(".concat(n.course_aggregate.aggregate.count,")"):""),render:h},{onClick:function(){return i(1)},title:"Profs ".concat(n?"(".concat(n.prof_aggregate.aggregate.count,")"):""),render:h}],initialSelectedTab:a,contentPadding:"0"})},P=n(39),W=n(202),A=g.b.div.withConfig({displayName:"MultiSelectButton__MultiSelectButtonWrapper",componentId:"xbarv8-0"})(["width:100%;display:block;margin:",";"],(function(e){return e.margin})),H=g.b.div.withConfig({displayName:"MultiSelectButton__ButtonWrapper",componentId:"xbarv8-1"})(["display:inline-block;height:24px;border-radius:12px;padding:2px 6px;margin-bottom:8px;"," "," cursor:pointer;margin-right:8px;color:",";border:2px solid ",";background-color:",";&:last-child{margin-right:0;}&:hover{background-color:",";}"],m.a,m.b,(function(e){var t=e.theme;return e.selected?t.light1:t.primary}),(function(e){return e.theme.primary}),(function(e){var t=e.theme;return e.selected?t.primary:t.white}),(function(e){var t=e.theme;return e.selected?t.primaryDark:t.light1})),B=function(e){var t=e.options,n=e.selected,r=e.margin,a=void 0===r?"0 0 32px 0":r,i=e.onClick,c=void 0===i?function(){}:i;return o.a.createElement(A,{margin:a},t.map((function(e,t){return o.a.createElement(H,{selected:n[t],onClick:function(){return c(t)},key:t},e)})))},M=n(201),q=n(73),D=g.b.div.withConfig({displayName:"SearchFilter__SearchFilterWrapper",componentId:"sc-167who2-0"})([""," "," margin-bottom:32px;"],Object(m.c)("40px 32px"),m.b),U=g.b.div.withConfig({displayName:"SearchFilter__SearchFilterHeader",componentId:"sc-167who2-1"})([""," color:",";margin-bottom:24px;"],m.f,(function(e){return e.theme.dark1})),L=g.b.div.withConfig({displayName:"SearchFilter__SearchFilterText",componentId:"sc-167who2-2"})([""," color:",";margin-bottom:8px;"],m.g,(function(e){return e.theme.dark2})),$=g.b.div.withConfig({displayName:"SearchFilter__SearchFilterSection",componentId:"sc-167who2-3"})(["display:block;"]),z=g.b.div.withConfig({displayName:"SearchFilter__RadioButtonWrapper",componentId:"sc-167who2-4"})(["display:flex;flex-direction:row;flex:1;"]),X=g.b.span.withConfig({displayName:"SearchFilter__CourseFilterDropdown",componentId:"sc-167who2-5"})(["position:absolute;"]),G=g.b.span.withConfig({displayName:"SearchFilter__NumRatingsText",componentId:"sc-167who2-6"})([""," color:",";"],m.a,(function(e){return e.theme.dark3})),J=g.b.div.withConfig({displayName:"SearchFilter__NumRatingsWrapper",componentId:"sc-167who2-7"})(["display:flex;flex-direction:row;justify-content:space-between;margin-bottom:8px;"]),Y=g.b.span.withConfig({displayName:"SearchFilter__BoldText",componentId:"sc-167who2-8"})(["font-weight:600;"]),K=g.b.button.withConfig({displayName:"SearchFilter__ResetButton",componentId:"sc-167who2-9"})(["height:28px;display:inline-block;padding:4px 12px;outline:none;border:none;cursor:pointer;background-color:",";"," "," color:",";border-radius:4px;&:hover{background-color:",";}"],(function(e){return e.theme.dark3}),m.b,m.a,(function(e){return e.theme.light1}),(function(e){return e.theme.dark2})),Q=g.b.div.withConfig({displayName:"SearchFilter__HeaderButtonWrapper",componentId:"sc-167who2-10"})(["display:flex;flex-direction:row;justify-content:space-between;"]),V=[1,2,3,4].map((function(e){return o.a.createElement("span",null,o.a.createElement(Y,null,e),"XX")}));V.push(o.a.createElement("span",null,o.a.createElement(Y,null,"5"),"XX+"));var Z=Object(k.h)(Object(k.a)()),ee=Object(k.h)(Object(k.b)()),te=Object(g.d)((function(e){var t=e.profCourses,n=e.filterState,r=e.setCourseCodes,a=e.setCurrentTerm,i=e.setNextTerm,c=e.setNumRatings,u=e.setCourseTaught,l=e.resetFilters,s=e.ratingFilters,d=e.courseSearch,f=e.theme,g=d?n.numCourseRatings:n.numProfRatings,p=o.a.createElement(o.a.Fragment,null,o.a.createElement(J,null,o.a.createElement(L,null,"Min # of ratings"),o.a.createElement(G,null,"\u2265 ",s[g]," ratings")),o.a.createElement(M.a,{numNodes:s.length,currentNode:g,color:f.primary,onUpdate:function(e){return c(e[0])},showTicks:!1}));return o.a.createElement(D,null,o.a.createElement(Q,null,o.a.createElement(U,null,"Filter your results"),o.a.createElement(K,{onClick:l},"Reset")),d?o.a.createElement(o.a.Fragment,null,o.a.createElement($,null,o.a.createElement(L,null,"Course code"),o.a.createElement(B,{options:V,selected:n.courseCodes,onClick:function(e){r([].concat(Object(P.a)(n.courseCodes.slice(0,e)),[!n.courseCodes[e]],Object(P.a)(n.courseCodes.slice(e+1))))}})),o.a.createElement($,null,p),o.a.createElement($,null,o.a.createElement(L,null,"Offered in"),o.a.createElement(z,null,o.a.createElement(W.a,{color:f.primary,selected:n.currentTerm,options:["This term (".concat(Z,")")],margin:"8px 16px 0 0",onClick:function(){return a(!n.currentTerm)},toggle:!0}),o.a.createElement(W.a,{color:f.primary,selected:n.nextTerm,options:["Next term (".concat(ee,")")],margin:"8px 0 0 0",onClick:function(){return i(!n.nextTerm)},toggle:!0})))):o.a.createElement(o.a.Fragment,null,o.a.createElement($,null,p),o.a.createElement($,null,o.a.createElement(L,null,"Show professors that",o.a.createElement("br",null),"teach:",o.a.createElement(X,null,o.a.createElement(q.a,{selectedIndex:n.courseTaught,options:t,color:f.courses,onChange:function(e){return u(e)}}))))))})),ne=[0,10,20,50,100,250,500,1e3],re=function(e){var t=e.query,n=e.codeSearch,a=e.courseTab,i=e.data,c=e.fetchMore,u=e.loading,l=Object(r.useState)(Array(5).fill(!0)),s=Object(f.a)(l,2),d=s[0],g=s[1],p=Object(r.useState)(0),m=Object(f.a)(p,2),_=m[0],C=m[1],E=Object(r.useState)(0),j=Object(f.a)(E,2),k=j[0],O=j[1],T=Object(r.useState)(!1),I=Object(f.a)(T,2),S=I[0],N=I[1],R=Object(r.useState)(!1),P=Object(f.a)(R,2),W=P[0],A=P[1],H=Object(r.useState)(0),B=Object(f.a)(H,2),M=B[0],q=B[1],D=Object(r.useState)(a?0:1),U=Object(f.a)(D,2),L=U[0],$=U[1],z=i?i.prof.reduce((function(e,t){return e.concat(t.prof_courses.map((function(e){return e.code})))}),["any course"]):["any course"];z=z.filter((function(e){return!!e}));var X={courseCodes:d,numCourseRatings:_,numProfRatings:k,currentTerm:S,nextTerm:W,courseTaught:M};return o.a.createElement(h,null,o.a.createElement(b,null,o.a.createElement(v,null,n?"Showing all ".concat(t.toUpperCase()," courses and professors"):'Showing results for "'.concat(t,'"'))),o.a.createElement(x,null,o.a.createElement(y,null,o.a.createElement(F,{filterState:X,data:i,exploreTab:L,setExploreTab:$,ratingFilters:ne,profCourses:z,loading:u,fetchMore:c})),o.a.createElement(w,null,o.a.createElement(te,{profCourses:z,filterState:X,setCourseCodes:g,setNumRatings:0===L?C:O,setCurrentTerm:N,setNextTerm:A,setCourseTaught:q,ratingFilters:ne,resetFilters:0===L?function(){g(Array(5).fill(!0)),C(0),N(!1),A(!1)}:function(){O(0),q(0)},courseSearch:0===L}))))},oe=function(e){var t=e.query,n=e.codeSearch,r=e.courseTab,a=e.data,i=e.fetchMore,c=e.loading;return o.a.createElement(h,null,o.a.createElement(re,{query:t,codeSearch:n,courseTab:r,data:a,fetchMore:i,loading:c}))},ae=function(){return o.a.createElement("div",null,"Mobile Explore Page")},ie=n(32),ce=n(33),ue=n.n(ce),le=n(197),se=n(198),de=n(64);function fe(){var e=Object(ie.a)(["\n    query EXPLORE_ALL($query: String, $course_offset: Int, $prof_offset: Int) {\n      course(\n        offset: $course_offset,\n        limit: ",",\n        order_by: ",",\n        where: ","\n      ) {\n        ...CourseInfoFragment\n        ...CourseTermFragment\n      }\n      course_aggregate(where: ",") {\n        aggregate {\n          count\n        }\n      }\n      prof(\n        offset: $prof_offset,\n        limit: ","\n        where: ","\n      ) {\n        ...ProfInfoFragment\n        ...ProfProfReviewsAggregateFragment\n        ...ProfCourseReviewsAggregateFragment\n        ...ProfCoursesTaughtFragment\n      }\n      prof_aggregate(where: ",") {\n        aggregate {\n          count\n        }\n      }\n    }\n    ","\n    ","\n    ","\n    ","  \n    ","\n    ","\n  "]);return fe=function(){return e},e}function ge(){var e=Object(ie.a)(["\n  query EXPLORE_COURSE_CODE($course_offset: Int, $prof_offset: Int) {\n    course(\n      offset: $course_offset,\n      limit: ",",\n      order_by: ",',\n      where: {code: {_ilike: "','%"}}\n    ) {\n      ...CourseInfoFragment\n      ...CourseTermFragment\n    }\n    course_aggregate(where: {code: {_ilike: "','%"}}) {\n      aggregate {\n        count\n      }\n    }\n    prof(\n      offset: $prof_offset,\n      limit: ','\n      where: {prof_courses: {course: {code: {_ilike: "','%"}}}}\n    ) {\n      ...ProfInfoFragment\n      ...ProfProfReviewsAggregateFragment\n      ...ProfCourseReviewsAggregateFragment\n      ...ProfCoursesTaughtFragment\n    }\n    prof_aggregate(where: {prof_courses: {course: {code: {_ilike: "','%"}}}}) {\n      aggregate {\n        count\n      }\n    }  \n  }\n  ',"\n  ","\n  ","\n  ","  \n  ","  \n  ","\n"]);return ge=function(){return e},e}var pe=function(e,t){return ue()(ge(),de.c,e,t,t,de.c,t,t,le.a.courseInfo,le.a.courseTerm,se.a.profInfo,se.a.profProfReviewsAggregate,se.a.profCourseReviewsAggregate,se.a.profCoursesTaught)},me=function(e,t){var n=t.replace("-"," ").split(" ").map((function(e){return Object(k.g)(e)})).map((function(e){return e.trim()})).filter((function(e){return e.length>0})).slice(0,de.a),r=n.map((function(e){return'{_or: [\n    {code: {_ilike: "%'.concat(e,'%"}},\n    {name: {_ilike: "%').concat(e,'%"}},\n    {profs_teaching: {prof: {name: {_ilike: "%').concat(e,'%"}}}},\n  ]},')})),o=n.map((function(e){return'{_or: [\n    {name: {_ilike: "%'.concat(e,'%"}},\n    {prof_courses: {course: {code: {_ilike: "%').concat(e,'%"}}}}\n    {prof_courses: {course: {name: {_ilike: "%').concat(e,'%"}}}}\n  ]},')})),a="{_and: [\n    ".concat(r.join(""),"\n  ]}"),i="{_and: [\n    ".concat(o.join(""),"\n  ]}");return ue()(fe(),de.c,e,a,a,de.c,i,i,le.a.courseInfo,le.a.courseTerm,se.a.profInfo,se.a.profProfReviewsAggregate,se.a.profCourseReviewsAggregate,se.a.profCoursesTaught)};n.d(t,"ExplorePageSwitch",(function(){return he}));var he=function(e){var t=e.isDesktopPage,n=e.location,r=s.a.parse(n.search),a=r.q,i=r.t,c=!i||"course"===i||"c"===i,l=!!r.c,d=l?pe:me,f=Object(u.b)(d("{course_reviews_aggregate: {count: desc}}",a),{variables:{course_offset:0,prof_offset:0}}),g=f.data,p=f.fetchMore,m=f.loading;return t?o.a.createElement(oe,{query:a,codeSearch:l,courseTab:c,data:g,fetchMore:p,loading:m}):o.a.createElement(ae,{query:a,codeSearch:l,courseTab:c,data:g,fetchMore:p,loading:m})};t.default=Object(a.d)(Object(i.b)((function(e){return{isDesktopPage:Object(d.c)(e)}})),c.f)(he)}}]);
//# sourceMappingURL=6.43c42026.chunk.js.map