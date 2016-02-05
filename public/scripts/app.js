!function(){"use strict";var n="undefined"==typeof window?global:window;if("function"!=typeof n.require){var e={},r={},t={},i={}.hasOwnProperty,o="components/",s=function(n,e){var r=0;e&&(0===e.indexOf(o)&&(r=o.length),e.indexOf("/",r)>0&&(e=e.substring(r,e.indexOf("/",r))));var i=t[n+"/index.js"]||t[e+"/deps/"+n+"/index.js"];return i?o+i.substring(0,i.length-".js".length):n},a=/^\.\.?(\/|$)/,c=function(n,e){for(var r,t=[],i=(a.test(e)?n+"/"+e:e).split("/"),o=0,s=i.length;s>o;o++)r=i[o],".."===r?t.pop():"."!==r&&""!==r&&t.push(r);return t.join("/")},u=function(n){return n.split("/").slice(0,-1).join("/")},l=function(e){return function(r){var t=c(u(e),r);return n.require(t,e)}},f=function(n,e){var t={id:n,exports:{}};return r[n]=t,e(t.exports,l(n),t),t.exports},p=function(n,t){var o=c(n,".");if(null==t&&(t="/"),o=s(n,t),i.call(r,o))return r[o].exports;if(i.call(e,o))return f(o,e[o]);var a=c(o,"./index");if(i.call(r,a))return r[a].exports;if(i.call(e,a))return f(a,e[a]);throw new Error('Cannot find module "'+n+'" from "'+t+'"')};p.alias=function(n,e){t[e]=n},p.register=p.define=function(n,r){if("object"==typeof n)for(var t in n)i.call(n,t)&&(e[t]=n[t]);else e[n]=r},p.list=function(){var n=[];for(var r in e)i.call(e,r)&&n.push(r);return n},p.brunch=!0,p._cache=r,n.require=p}}(),require.register("helpers/helpers",function(n,e,r){"use strict";var t=e("lodash"),i=e("jquery"),o=e("humanize-duration"),s=t.curry(function(n,e){return e[n]}),a=t.curry(function(n,e){return t.map(e,n)}),c=function(n){return console.log(JSON.stringify(n)),n},u=function(n){return new Promise(function(e,r){return i.getJSON({url:n,timeout:7e3},e).fail(r)})},l=function(n){i(n).hide()},f=function(n,e){i(n).append(e)},p=t.curry(function(n,e){return e.split(n)}),d=t.curry(function(n,e){return e.join(n)}),v=t.flow(s("search"),t.tail,d(""),p("&"),a(p("=")),t.fromPairs,s("env")),h=o.humanizer({language:"shortEn",languages:{shortEn:{h:function(){return"h"},m:function(){return"min"},s:function(){return"s"},ms:function(){return"ms"}}},round:!0,spacer:"",delimiter:""}),m={prop:s,map:a,trace:c,$getJSON:u,$hide:l,$append:f,env:v,formatDuration:h};r.exports=m}),require.register("views/components/jobView",function(n,e,r){"use strict";var t=e("lodash"),i=e("moment"),o=e("../../helpers/helpers").formatDuration,s=function(n){return'<div class="duration col s5" title="Job took '+n+' running last time"><i class="icon fa fa-clock-o"></i>'+n+"</div>"},a=t.flow(o,s),c=function(n){return'<div class="lastrun col s7 truncate" title="Last time the job ran was '+n+'"><i class="icon fa fa-flag-checkered"></i>'+n+"</div>"},u=t.curry(function(n,e){return n(e).fromNow()}),l=t.flow(Number,u(i),c),f=function(n){return l(n.finishedAt).concat(a(n.duration))},p='<div class="loading progress col s12"><div class="indeterminate"></div></div>',d=function(n){return"running"===n.status?p:f(n)},v=function(n){return'<article class="job-card col s12 m2 card"><div class="title-wrapper card-content truncate"><span title="'+n.name+'" class="title card-title">'+n.name+'</span></div><div class="job-status card-action valign-wrapper row" data-status="'+n.status+'">'+d(n)+"</div></article>"};r.exports={render:v}}),require.register("views/components/pipelineView",function(n,e,r){"use strict";var t=e("./jobView"),i=function(n){var e=n.jobs||[];return'<section class="row"><header class="pipeline-title row"><span class="title col">'+n.name+'</span><span class="revision col">#'+n.revision+'</span></header><section class="row">'+e.map(t.render).join("")+'</section><div class="divider"></div></section>'};r.exports={render:i}}),require.register("views/index",function(n,e,r){"use strict";var t=e("../helpers/helpers"),i=e("./components/pipelineView").render,o=function(){return Promise.resolve(["Digital Service","Transversal Service","Web Application"])},s=function(n){return t.$getJSON("/api/pipelines/"+n)},a=function(n){t.$append("#content-container",i(n))},c=function(n,e){return n.then(function(){return e}).then(a)},u=function(n){t.$append("#content-container","Fetching pipelines has a problem. Please try again"),t.trace(n)},l=function(){t.$hide(".pipelines-loading")};r.exports={init:function(){o().then(function(n){return n.map(s).reduce(c,Promise.resolve())})["catch"](u).then(l)}}});