!function(){"use strict";var e={n:function(t){var l=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(l,{a:l}),l},d:function(t,l){for(var a in l)e.o(l,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:l[a]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.blocks,l=JSON.parse('{"apiVersion":2,"name":"alecg/swipe-gallery","title":"Swipe Gallery","icon":"screenoptions","category":"media","editorScript":"alecg-swipe-gallery-editor","editorStyle":"file:./css/editor.css","style":"file:./css/frontend.css","attributes":{"images":{"type":"array","default":[]},"aspectRatio":{"enum":["16-9","4-3","3-2","1-1"],"default":"3-2"},"desktopItemsPerRow":{"type":"integer","default":4},"mobileItemsPerRow":{"type":"integer","default":2}}}');function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a])}return e},a.apply(this,arguments)}var r=window.wp.element,i=window.wp.i18n,o=window.wp.blockEditor,s=window.wp.components,n=window.wp.primitives,c=window.lodash,m=e.n(c),p=window.wp.compose,d=window.jQuery,u=e.n(d),g=e=>{const{items:t,onItemsChange:l,children:a,isDisabled:i=!1,desktopItemsPerRow:o,mobileItemsPerRow:s}=e,n=(0,r.useRef)(),c=(0,p.useRefEffect)((e=>{const t=u()(e).sortable({cursor:"grabbing",tolerance:"pointer",classes:{"ui-sortable-helper":"item-dragged","ui-sortable-placeholder":"sortable-gallery-item"},placeholder:"item-placeholder",appendTo:u()(e).closest(".wp-block-alecg-swipe-gallery"),disabled:i});return()=>{t.sortable("destroy")}}),[]),m=(0,p.useMergeRefs)([n,c]);(0,r.useEffect)((()=>{if(void 0===n.current)return;const e=u()(n.current);e.sortable("option","stop",((a,r)=>{const i=[...r.item.get(0).parentElement.children].map((e=>e.dataset.id)).map((e=>t[e]));e.sortable("cancel"),l(i)}))}),[t]),(0,r.useEffect)((()=>{n.current&&(console.log("Setting gallery to disabled"),u()(n.current).sortable("option","disabled",i))}),[i]);const d=`sortable-items-per-row-desktop-${o}`,g=`sortable-items-per-row-mobile-${s}`;return 0===t.length?null:(0,r.createElement)("div",{className:`sortable-gallery ${d} ${g} ${i&&"sortable-gallery-disabled"}`,ref:m},a.map(((e,a)=>(e.props.onRemoveClick=()=>function(e){const a=[...t.slice(0,e),...t.slice(e+1)];l(a)}(a),(0,r.createElement)("div",{className:"sortable-gallery-item",key:a,"data-id":a},e)))))},w=e=>{const[t,l]=(0,r.useState)(!1),{image:o,index:n,onRemoveClick:c,aspectRatio:m}=e,p=`swipe-gallery-item-aspect-ratio-${m}`,d={"data-id":n};return 0!==o.url.indexOf("blob:")||o.id?(0,r.createElement)("figure",a({className:`swipe-gallery-item swipe-gallery-item-loaded ${p}`},d),(0,r.createElement)("img",{src:o.url}),(0,r.createElement)("button",{className:"swipe-gallery-item-remove",title:(0,i.__)("Remove Image","alecg-swipe-gallery"),onClick:()=>l(!0)},(0,r.createElement)("span",{class:"dashicons dashicons-no-alt"})),t&&(0,r.createElement)(s.Modal,{className:"swipe-gallery-item-remove-modal",title:(0,i.__)("Remove image from gallery?","alecg-swipe-gallery"),onRequestClose:()=>l(!1)},(0,r.createElement)(s.Button,{variant:"primary",onClick:()=>(l(!1),void c(n))},(0,i.__)("Remove","alecg-swipe-gallery")),(0,r.createElement)(s.Button,{onClick:()=>l(!1)},(0,i.__)("Cancel","alecg-swipe-gallery")))):(0,r.createElement)("figure",a({className:`swipe-gallery-item swipe-gallery-item-loading ${p}`},d),(0,r.createElement)("img",{src:o.url}),(0,r.createElement)(s.Spinner,null))},b=e=>{const{attributes:t,setAttributes:l}=e,{aspectRatio:a,desktopItemsPerRow:n,mobileItemsPerRow:c}=t,m=[{value:"16-9",label:(0,i.__)("16:9")},{value:"4-3",label:(0,i.__)("4:3")},{value:"3-2",label:(0,i.__)("3:2")},{value:"1-1",label:(0,i.__)("1:1")}];return(0,r.createElement)(o.InspectorControls,null,(0,r.createElement)(s.PanelBody,{title:(0,i.__)("Display Settings")},(0,r.createElement)(s.SelectControl,{label:(0,i.__)("Thumbnail Aspect Ratio"),value:a,onChange:function(e){l({aspectRatio:e})},options:m}),(0,r.createElement)(s.RangeControl,{label:(0,i.__)("Items per Row on Desktop"),value:n,onChange:function(e){l({desktopItemsPerRow:e})},min:1,max:6}),(0,r.createElement)(s.RangeControl,{label:(0,i.__)("Items per Row on Mobile"),value:c,onChange:function(e){l({mobileItemsPerRow:e})},min:1,max:6})))};const{name:y}=l;(0,t.registerBlockType)(y,{edit:e=>{var t;const{attributes:l,setAttributes:s,isSelected:c}=e,p=(0,o.useBlockProps)(),[d,u]=(0,r.useState)(null!==(t=l.images)&&void 0!==t?t:[]);function y(e){return 0===e.url.indexOf("blob:")&&!e.id}(0,r.useEffect)((()=>{const e=d.filter((e=>!y(e)));s({images:e})}),[d]);const f={allowedTypes:["image"],multiple:!0,onSelect:function(e){const t=m().uniqBy([...d,...e],(e=>e.id?e.id:e.url)).map((e=>({id:e.id,url:e.url})));u(t)}},E=(0,r.createElement)(b,{attributes:l,setAttributes:s});if(0===d.length)return(0,r.createElement)(n.View,p,E,(0,r.createElement)(o.MediaPlaceholder,a({},f,{labels:{title:(0,i.__)("Swipe Gallery","alecg-swipe-gallery"),instructions:(0,i.__)("Drag, upload, or select images to be displayed in the gallery.","alecg-swipe-gallery")}})));{const e=d.some(y);return(0,r.createElement)(n.View,p,E,(0,r.createElement)(g,{items:d,onItemsChange:function(e){u(e)},isDisabled:e,desktopItemsPerRow:l.desktopItemsPerRow,mobileItemsPerRow:l.mobileItemsPerRow},d.map((e=>(0,r.createElement)(w,{image:e,aspectRatio:l.aspectRatio})))),!c&&!e&&(0,r.createElement)("p",{className:"swipe-gallery-upload-text"},(0,i.__)("Add to swipe gallery...","alecg-swipe-gallery")),c&&!e&&(0,r.createElement)(o.MediaPlaceholder,a({},f,{className:"swipe-gallery-append-media-placeholder",isAppender:!0,labels:{instructions:!1,title:!1}})))}},save:e=>{var t;const l=o.useBlockProps.save(),{attributes:a}=e,i=null!==(t=a.images)&&void 0!==t?t:[];return(0,r.createElement)(n.View,l,(0,r.createElement)("ul",null,i.map((e=>(0,r.createElement)("li",null,(0,r.createElement)("div",{class:"swipe-gallery-media-item","data-id":e.id},e.id))))))}})}();