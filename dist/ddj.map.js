!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.ddj=n():t.ddj=n()}(this,(function(){return function(t){var n={};function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=n,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,n){if(1&n&&(t=o(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)o.d(e,r,function(n){return t[n]}.bind(null,r));return e},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=0)}([function(t,n,o){"use strict";o.r(n),o.d(n,"autostart",(function(){return f})),o.d(n,"data",(function(){return e})),o.d(n,"map",(function(){return i})),o.d(n,"mapcontrols",(function(){return a})),o.d(n,"marker",(function(){return u})),o.d(n,"quickinfo",(function(){return l})),o.d(n,"search",(function(){return c})),o.d(n,"tools",(function(){return r})),o.d(n,"tutorial",(function(){return d}));var e={};o.r(e),o.d(e,"default",(function(){return p})),o.d(e,"getRow",(function(){return m})),o.d(e,"get",(function(){return y})),o.d(e,"init",(function(){return g})),o.d(e,"getUniqueIdentifier",(function(){return h})),o.d(e,"setUniqueIdentifier",(function(){return b}));var r={};o.r(r),o.d(r,"default",(function(){return v})),o.d(r,"getMetaContent",(function(){return S})),o.d(r,"getMetaContentArray",(function(){return w})),o.d(r,"showSelection",(function(){return k})),o.d(r,"getSelectionValue",(function(){return x})),o.d(r,"setSelectionValue",(function(){return j})),o.d(r,"getSelectionHTML",(function(){return C})),o.d(r,"getAllObjects",(function(){return I}));var i={};o.r(i),o.d(i,"default",(function(){return A})),o.d(i,"get",(function(){return T})),o.d(i,"set",(function(){return P})),o.d(i,"getDOMName",(function(){return F})),o.d(i,"setDOMName",(function(){return q})),o.d(i,"init",(function(){return E})),o.d(i,"autostart",(function(){return z}));var a={};o.r(a),o.d(a,"default",(function(){return H})),o.d(a,"init",(function(){return _})),o.d(a,"autostart",(function(){return R}));var u={};o.r(u),o.d(u,"default",(function(){return B})),o.d(u,"init",(function(){return J})),o.d(u,"fixGeometryData",(function(){return X})),o.d(u,"update",(function(){return Q})),o.d(u,"autostart",(function(){return K}));var l={};o.r(l),o.d(l,"default",(function(){return ot})),o.d(l,"init",(function(){return rt})),o.d(l,"update",(function(){return it})),o.d(l,"setVisible",(function(){return at})),o.d(l,"show",(function(){return ut})),o.d(l,"autostart",(function(){return lt}));var c={};o.r(c),o.d(c,"default",(function(){return ft})),o.d(c,"init",(function(){return pt})),o.d(c,"update",(function(){return mt})),o.d(c,"autostart",(function(){return yt}));var d={};o.r(d),o.d(d,"default",(function(){return gt})),o.d(d,"init",(function(){return bt})),o.d(d,"update",(function(){return vt})),o.d(d,"gotoFirstPage",(function(){return St})),o.d(d,"onBack",(function(){return wt})),o.d(d,"onNext",(function(){return kt})),o.d(d,"autostart",(function(){return xt}));var f={};o.r(f),o.d(f,"default",(function(){return Ct})),o.d(f,"onDone",(function(){return Lt}));var s={userData:null,uniqueIdentifier:null},p=s;function m(t){return null==t?s.userData:s.userData[t]}function y(t){var n=m(t);return n&&n.geometry&&n.properties&&(n=n.properties),n}function g(t){s.userData=t,t&&t.type&&"FeatureCollection"===t.type&&t.features&&(s.userData=t.features),String.prototype.startsWith=String.prototype.startsWith||function(t){return 0===this.indexOf(t)},void 0===Array.isArray&&(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)})}function h(){var t=s.uniqueIdentifier;return void 0===t||null==t||""===t?null:t}function b(t){s.uniqueIdentifier=t}var v={};function S(t){var n=document.querySelector('meta[name="'+t+'"]');return n&&n.content||""}function w(t){var n=document.querySelectorAll('meta[name="'+t+'"]'),o=[];if(n)for(var e=0;e<n.length;++e)o.push(n[e].content||"");return o}function k(t,n){var o,e;for(t=t||"",o=document.querySelectorAll(t),e=0;e<o.length;++e)o[e].style.display=n?"block":"none"}function x(t){if(t){var n=document.querySelectorAll(t);if(n.length>0)return n[0].value}return""}function j(t,n){var o,e;for(t=t||"",o=document.querySelectorAll(t),e=0;e<o.length;++e)o[e].value=n}function C(t){if(t){var n=document.querySelectorAll(t);if(n.length>0)return n[0].innerHTML}return""}function I(t){var n,o=[],e=h();if(null===e)return t;for(n=0;n<p.userData.length;++n)p.userData[n][e]===t[e]&&o.push(p.userData[n]);return 1===o.length?o[0]:o}function M(t){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var O={map:null,mapDOMelementID:""},A=O,D={mapboxId:"tursics.l7ad5ee8",mapboxToken:"pk.eyJ1IjoidHVyc2ljcyIsImEiOiI1UWlEY3RNIn0.U9sg8F_23xWXLn4QdfZeqg",attribution:"",centerLat:52.518413,centerLng:13.408368,zoom:13,onFocusOnce:null,onZoomed:null,onMoved:null};function T(){return O.map}function P(t){O.map=t}function F(){return O.mapDOMelementID}function q(t){O.mapDOMelementID=t}function E(t,n){if(null===T())if("undefined"!=typeof L&&null!==L){var o,e,r=[];if(null!==n&&"object"===M(n))for(o in n)n.hasOwnProperty(o)&&D.hasOwnProperty(o)&&(D[o]=n[o]);r.push('<a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap-Mitwirkende</a>'),r.push('<a href="https://www.mapbox.com" target="_blank">Mapbox</a>'),""!==D.attribution&&r.push(D.attribution),e=L.tileLayer("https://{s}.tiles.mapbox.com/v4/"+D.mapboxId+"/{z}/{x}/{y}.png?access_token="+D.mapboxToken,{attribution:r.join(", ")}),q(t),P(L.map(t,{zoomControl:!1,scrollWheelZoom:!0}).addLayer(e).setView([D.centerLat,D.centerLng],D.zoom)),T().addControl(L.control.zoom({position:"bottomright"})),T().once("focus",(function(){D.onFocusOnce&&D.onFocusOnce()})),T().on("zoomend",(function(){D.onZoomed&&D.onZoomed()})),T().on("moveend",(function(){D.onMoved&&D.onMoved()}))}else console.error("Error: Please include leaflet.js in your html file.")}function z(){var t=document.getElementById("map"),n=S("ddj:mapCenter"),o=t.getElementsByClassName("attribution");t&&2===n.split(",").length&&E("map",{mapboxId:S("ddj:mapboxId"),mapboxToken:S("ddj:mapboxToken"),attribution:o.length>0?o[0].innerHTML:"",centerLat:n.split(",")[0].trim(),centerLng:n.split(",")[1].trim(),zoom:S("ddj:mapZoom")})}function N(t){return(N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}String.prototype.startsWith=String.prototype.startsWith||function(t){return 0===this.indexOf(t)};var H={},G={},V=L.Control.extend({options:{position:"bottomright"},onAdd:function(){var t,n=L.DomUtil.create("div","leaflet-bar leaflet-control leaflet-control-custom");return 1===$("#popupShare").length&&(t=$("#popupShare").data("icon")||"fa fa-share-alt",n.innerHTML='<a style="font-size:1.2em" href="#popupShare" title="Teilen" data-rel="popup" data-position-to="window" data-transition="pop"><i class="'+t+'" aria-hidden="true"></i></a>'),1===$("#popupInfo").length&&(t=$("#popupInfo").data("icon")||"fa fa-info",n.innerHTML+='<a style="font-size:1.2em" href="#popupInfo" title="Info" data-rel="popup" data-position-to="window" data-transition="pop"><i class="'+t+'" aria-hidden="true"></i></a>'),1===$("#popupAuthor").length&&(t=$("#popupAuthor").data("icon")||"fa fa-envelope",n.innerHTML+='<a style="font-size:1.2em" href="#popupAuthor" title="Autor" data-rel="popup" data-position-to="window" data-transition="pop"><i class="'+t+'" aria-hidden="true"></i></a>'),1===$('[data-tutorial="dialog"]').length&&(t=$('[data-tutorial="dialog"]').data("icon")||"fa fa-graduation-cap",n.innerHTML+='<a style="font-size:1.2em" href="#popupTutorial" title="Anleitung" data-rel="popup" data-position-to="window" data-transition="pop"><i class="'+t+'" aria-hidden="true"></i></a>'),n}});function W(){var t=$("#selectEmbedSize").val().split("x"),n=t[0],o=t[1],e='<iframe src="'+(S("ddj:shareURI")||"")+'" width="'+n+'" height="'+o+'" frameborder="0" style="border:0" allowfullscreen></iframe>';$("#inputEmbedURI").val(e),-1===$("#embedMap iframe")[0].outerHTML.indexOf('width="'+n+'"')&&($("#embedMap iframe")[0].outerHTML=e.replace('.html"',".html?foo="+(new Date).getTime()+'"'),$("#embedMap input").focus().select())}function _(t){if(null!==T()){var n;if(null!==t&&"object"===N(t))for(n in t)t.hasOwnProperty(n)&&G.hasOwnProperty(n)&&(G[n]=t[n]);T().addControl(new V),$("#popupShare").on("popupafteropen",(function(){$("#shareLink input").focus().select()})),$("#tabShareLink").on("click",(function(){$("#popupShare").popup("reposition","positionTo: window"),$("#shareLink input").focus().select()})),$("#tabEmbedMap").on("click",(function(){W(),$("#popupShare").popup("reposition","positionTo: window"),$("#embedMap input").focus().select()})),$("#selectEmbedSize").val("400x300").selectmenu("refresh"),$("#selectEmbedSize").on("change",(function(){W(),$("#popupShare").popup("reposition","positionTo: window")}))}}function R(){_()}function U(t){return(U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var Z={layerGroup:null},B=Z,Y={onAdd:function(){return!0},onAddHTML:function(){return!1},onMouseOver:null,onMouseOut:null,onClick:null};function J(t){if(null===Z.layerGroup)if("undefined"!=typeof L&&null!==L){var n;if(null!==t&&"object"===U(t))for(n in t)t.hasOwnProperty(n)&&Y.hasOwnProperty(n)&&(Y[n]=t[n]);Q()}else console.error("Error: Please include leaflet.js in your html file.")}function X(t){if(t.geometry&&t.properties){var n,o,e,r,i,a,u,l,c,d;if("Polygon"===t.geometry.type){for(e=t.geometry.coordinates[0][0][1],r=t.geometry.coordinates[0][0][1],i=t.geometry.coordinates[0][0][0],a=t.geometry.coordinates[0][0][0],u=0;u<t.geometry.coordinates.length;++u)for(l=t.geometry.coordinates[u],c=0;c<l.length;++c)(d=l[c])[1]<e&&(e=d[1]),d[1]>r&&(r=d[1]),d[0]<i&&(i=d[0]),d[0]>a&&(a=d[0]);n=(e+r)/2,o=(i+a)/2}else"Point"===t.geometry.type?(n=t.geometry.coordinates[1],o=t.geometry.coordinates[0]):console.log(t.geometry.type+" not yet implemented");(t=t.properties).lat=t.lat||n,t.lng=t.lng||o}return t}function Q(){var t,n,o,e,r,i,a,u=[],l=h();if(Z.layerGroup&&(T().removeLayer(Z.layerGroup),Z.layerGroup=null),Z.layerGroup=L.featureGroup([]),Z.layerGroup.addTo(T()),Z.layerGroup.addEventListener("mouseover",(function(t){Y.onMouseOver&&Y.onMouseOver([t.latlng.lat,t.latlng.lng],y(t.layer.options.data))})),Z.layerGroup.addEventListener("mouseout",(function(t){Y.onMouseOut&&Y.onMouseOut([t.latlng.lat,t.latlng.lng],y(t.layer.options.data))})),Z.layerGroup.addEventListener("click",(function(t){Y.onClick&&Y.onClick([t.latlng.lat,t.latlng.lng],y(t.layer.options.data))})),m())for(t=0;t<m().length;++t)if(n=o=X(o=m(t)),e=1,Array.isArray(n)&&(o=n[0],e=n.length),!(null!==l&&u.indexOf(o[l])>-1)&&void 0!==o.lat&&""!==o.lat&&void 0!==o.lng&&""!==o.lng){r={index:t,count:e,lat:parseFloat(o.lat),lng:parseFloat(o.lng),color:"blue",opacity:1,clickable:1,iconPrefix:"fa",iconFace:"fa-dot-circle-o",htmlClass:"",htmlIconSize:null,htmlElement:""};try{i=Y.onAdd(r,o)}catch(t){console.log(t),i=!1}try{a=Y.onAddHTML(r,o)}catch(t){console.log(t),a=!1}!1!==i&&(Z.layerGroup.addLayer(L.marker([r.lat,r.lng],{data:r.index,icon:L.AwesomeMarkers.icon({prefix:r.iconPrefix,icon:r.iconFace,markerColor:r.color}),opacity:r.opacity,clickable:r.clickable})),u.push(o[l])),!1!==a&&(Z.layerGroup.addLayer(L.marker([r.lat,r.lng],{data:r.index,icon:L.divIcon({className:r.htmlClass,iconSize:r.htmlIconSize,html:r.htmlElement}),opacity:r.opacity,clickable:r.clickable})),u.push(o[l]))}}function K(t){var n=S("ddj:pinColor")||"",o=S("ddj:pinColorColumn")||"",e=S("ddj:pinIcon")||"",r=S("ddj:pinIconColumn")||"",i=S("ddj:pinIconPrefix")||"",a=S("ddj:pinIconPrefixColumn")||"";J({onAdd:function(t,u){return""!==n&&(t.color=n),""!==o&&u[o]&&(t.color=u[o]),""!==e&&(t.iconPrefix=i,t.iconFace=e),""!==r&&u[r]&&(t.iconPrefix=u[a],t.iconFace=u[r]),!0},onClick:function(n,o){t.onClick&&t.onClick(n,o)}})}function tt(t){return(tt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var nt={root:null},ot=nt,et={dictYes:"ja",dictNo:"nein",onShow:null,onHide:null};function rt(t){if(null===nt.root){var n;if(null!==t&&"object"===tt(t))for(n in t)t.hasOwnProperty(n)&&et.hasOwnProperty(n)&&(et[n]=t[n]);nt.root=$("div").find('[data-quickinfo="box"]'),nt.root.find('[data-quickinfo="close"]').on("click",(function(){at(!1)})),nt.root.find('[data-quickinfo="group"]').on("click",(function(){$(this).toggleClass("groupClosed")}))}}function it(){}function at(t){t?(nt.root.css("display","block"),et.onShow&&et.onShow()):(nt.root.css("display","none"),et.onHide&&et.onHide())}function ut(t){function n(t,n){var o=nt.root.find('[data-quickdata="'+t+'"]');if(o.length>0&&(o.parent().hasClass("number")?n=function(t){var n="",o=0;for("-"===(t=String(parseInt(t,10)))[0]&&(n="-",t=t.slice(1)),o=t.length;o>3;)o-=3,t=t.slice(0,o)+"."+t.slice(o);return n+t}(n):o.parent().hasClass("boolean")&&(n=1===n?et.dictYes:et.dictNo),o.text(n)),(o=nt.root.find('[data-hide-if-zero="'+t+'"]')).length>0){var e="block";"0"!==n&&0!==n&&null!==n||(e="none"),o.css("display",e)}}var o,e,r,i,a,u=t,l=[],c=[];if(Array.isArray(u)||(u=[t]),1===(a=nt.root.find('[data-quickinfo="list"]')).length)for(l=a.find('[data-quickinfo="item"]');l.length>1;)$(l[0]).remove(),l=a.find('[data-quickinfo="item"]');for(o=0;o<u.length;++o){for(r in e=u[o])e.hasOwnProperty(r)&&n(r,e[r]);l.length>0&&c.push($(l[0]).clone())}if(l.length>0)for($(l[0]).remove(),i=0;i<c.length;++i)c[i].appendTo(a);at(!0)}function lt(){rt({onShow:function(){k('[data-welcome="box"]',!1)},onHide:function(){j('[data-search="textinput"]',""),k('[data-welcome="box"]',!0),lt.default.selectedItem=null}})}function ct(t){return(ct="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var dt={objects:[]},ft=dt,st={htmlDOMelementID:"autocomplete",onAdd:function(){return!0},onClick:null,onFocus:null,onFormat:null,orientation:"bottom",showNoSuggestion:!0,titleNoSuggestion:'<i class="fa fa-info-circle" aria-hidden="true"></i> Geben sie bitte einen Suchbegriff ein'};function pt(t){if(0===dt.objects.length){var n;if(null!==t&&"object"===ct(t))for(n in t)t.hasOwnProperty(n)&&st.hasOwnProperty(n)&&(st[n]=t[n]);$("#"+st.htmlDOMelementID).focus((function(){st.onFocus&&st.onFocus()})),mt()}}function mt(){var t,n,o,e,r,i=0,a=[],u=h();for(y()&&(i=y().length),dt.objects=[],t=0;t<i;++t)n=o=y(t),e=1,Array.isArray(o)&&(n=o[0],e=o.length),null!==u&&a.indexOf(n[u])>-1||(r={index:t,count:e,value:"",sortValue1:t,sortValue2:t},!1!==st.onAdd(r,n)&&(dt.objects.push(r),a.push(n[u])));dt.objects.sort((function(t,n){return t.sortValue1===n.sortValue1?t.sortValue2>n.sortValue2?1:-1:t.sortValue1>n.sortValue1?1:-1})),$("#"+st.htmlDOMelementID).autocomplete({lookup:dt.objects,onSelect:function(t){st.onClick&&st.onClick(y(t.index))},formatResult:function(t,n){if(st.onFormat)return st.onFormat(t,n);var o="";return o+='<div class="autocomplete-icon backblue"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></div>',o+='<div style="line-height: 32px;">'+t.value.replace(new RegExp(n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),"gi"),"<strong>"+n+"</strong>")+"</div>"},orientation:st.orientation,showNoSuggestionNotice:st.showNoSuggestion,noSuggestionNotice:st.titleNoSuggestion})}function yt(t){var n=C('[data-search="noSuggestion"]')||st.titleNoSuggestion,o=S("ddj:pinColor")||"",e=S("ddj:pinColorColumn")||"",r=S("ddj:pinIcon")||"",i=S("ddj:pinIconColumn")||"",a=S("ddj:pinIconPrefix")||"",u=S("ddj:pinIconPrefixColumn")||"",l=S("ddj:searchTitleColumn")||"",c=S("ddj:searchDescriptionColumn")||"",d=h();pt({orientation:"auto",showNoSuggestion:!0,titleNoSuggestion:n,onAdd:function(t,n){var f="",s="",p="blue",m="fa",y="fa-dot-circle-o";return""!==l&&n[l]&&(f=n[l]),""!==c&&n[c]&&(s=n[c]),""!==o&&(p=o),""!==e&&n[e]&&(p=n[e]),""!==r&&(m=a,y=r),""!==i&&n[i]&&(m=n[u],y=n[i]),t.sortValue1=f,t.sortValue2=n[d],t.data=n[d],t.color=p,t.value=f,t.desc=s,t.iconPrefix=m,t.iconFace=y,!0},onFocus:function(){window.scrollTo(0,0),document.body.scrollTop=0,$("#pageMap").animate({scrollTop:parseInt(0,10)},500)},onFormat:function(t,n){var o=t.color,e="";return e+='<div class="autocomplete-icon back'+o+'"><i class="'+t.iconPrefix+" "+t.iconFace+'" aria-hidden="true"></i></div>',e+="<div>"+t.value.replace(new RegExp(n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),"gi"),"<strong>"+n+"</strong>")+"</div>",e+='<div class="'+o+'">'+t.desc+"</div>"},onClick:function(n){t.onClick&&(Array.isArray(n)?t.onClick(n[0][d]):t.onClick(n[d]))}})}var gt={};function ht(){var t=$('[data-tutorial="dialog"]'),n=$("[data-tutorial-currentpage]")[0],o=parseInt(n.textContent,10),e=t.find('[data-tutorial="page"]'),r=$(e[o-1]).data("position-to"),i=t.find('[data-role="controlgroup"] a'),a=$(i[0]);e.css("display","none"),$(e[o-1]).css("display","block"),t.popup("option","positionTo",r||"origin"),o<2?a.removeClass("disabled").addClass("disabled"):a.removeClass("disabled")}function bt(){if(1===$('[data-tutorial="dialog"]').length){var t=$('[data-tutorial="dialog"]'),n=t.find('[data-tutorial="page"]');t.append('<div data-tutorial="footer"><div>Seite <span data-tutorial-currentpage>1</span> von '+n.length+'</div><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-btn ui-corner-all ui-btn-a" onclick="ddj.tutorial.onBack()"><i class="fa fa-chevron-left" aria-hidden="true"></i></a><a href="#" class="ui-btn ui-corner-all ui-btn-a" onclick="ddj.tutorial.onNext()"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></div></div>'),t.find('[data-role="controlgroup"]').controlgroup({direction:"horizontal"}),$('[data-tutorial="dialog"]').popup({afterclose:function(){St()}}),St()}}function vt(){}function St(){$("[data-tutorial-currentpage]")[0].textContent=1,ht()}function wt(){var t=$("[data-tutorial-currentpage]")[0],n=parseInt(t.textContent,10);n>1&&(t.textContent=n-1),ht()}function kt(){var t=$("[data-tutorial-currentpage]")[0],n=$('[data-tutorial="dialog"]').find('[data-tutorial="page"]'),o=parseInt(t.textContent,10);o<n.length?(t.textContent=o+1,ht()):$('[data-tutorial="dialog"]').popup("close")}function xt(){bt(),window.setTimeout((function(){$('[data-tutorial="dialog"]').popup("open")}),0)}var jt={selectedItem:null,onDoneCallback:null,eventPageShowWasSet:!1},Ct=jt;function It(t){jt.selectedItem=t,ut(jt.selectedItem)}function Lt(t){jt.onDoneCallback=t}jt.eventPageShowWasSet||(jt.eventPageShowWasSet=!0,window.addEventListener("pageshow",(function(){var t=w("ddj:data"),n=w("ddj:dataIgnoreSecondLine"),o=w("ddj:dataIgnoreLastLine"),e=S("ddj:dataUniqueIdentifier")||"";function r(){lt(),K({onClick:function(t,n){It(n)}}),yt({onClick:function(t){!function(t){var n,o,e=y(),r=h();for(n=0;n<e.length;++n)if((o=e[n])&&o[r]===t)return o.lat&&o.lng&&T().panTo(new L.LatLng(o.lat,o.lng)),void It(I(o))}(t)}}),k(".visibleWithoutData",!1),k(".visibleWithData",!0)}function i(){jt.onDoneCallback&&jt.onDoneCallback()}window.location.hash&&history.replaceState(null,null," "),jt.selectedItem=null,j('[data-search="textinput"]',""),z(),R(),xt(),function a(u){if(u<t.length){var l=t[u]+"?nocache="+(new Date).getTime(),c="true"===(u<n.length?n[u]:""),d="true"===(u<o.length?o[u]:"");(f=l,s=function(t){var n=t;c&&n.shift(),d&&n.pop(),g(n),""!==e&&b(e)},p={onDone:null,onFail:null,onAlways:null,done:function(t){return this.onDone=t,this},fail:function(t){return this.onFail=t,this},always:function(t){return this.onAlways=t,this}},m=new XMLHttpRequest,m.open("GET",f,!0),m.onreadystatechange=function(){if(4===this.readyState)if(this.status>=200&&this.status<400){var t=JSON.parse(this.responseText);s&&s(t),p.onDone&&p.onDone(t),p.onAlways&&p.onAlways()}else p.onFail&&p.onFail(null,"",null),p.onAlways&&p.onAlways()},m.send(),m=null,p).done((function(){a(u+1)})).fail((function(){k(".visibleWithoutErrors",!1),k(".visibleWithErrors",!0),i()}))}else u>0&&r(),i();var f,s,p,m}(0)})))}])}));
//# sourceMappingURL=ddj.map.js.map