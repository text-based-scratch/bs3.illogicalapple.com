!function(){function e(e,t){document.addEventListener?e.addEventListener("scroll",t,!1):e.attachEvent("scroll",t)}function t(e){this.g=document.createElement("div"),this.g.setAttribute("aria-hidden","true"),this.g.appendChild(document.createTextNode(e)),this.h=document.createElement("span"),this.i=document.createElement("span"),this.m=document.createElement("span"),this.j=document.createElement("span"),this.l=-1,this.h.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.i.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.j.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.m.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.h.appendChild(this.m),this.i.appendChild(this.j),this.g.appendChild(this.h),this.g.appendChild(this.i)}function n(e,t){e.g.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+t+";"}function i(e){var t=e.g.offsetWidth,n=t+100;return e.j.style.width=n+"px",e.i.scrollLeft=n,e.h.scrollLeft=e.h.scrollWidth+100,e.l!==t&&(e.l=t,!0)}function o(t,n){function o(){var e=s;i(e)&&null!==e.g.parentNode&&n(e.l)}var s=t;e(t.h,o),e(t.i,o),i(t)}function s(e,t,n){t=t||{},n=n||window,this.family=e,this.style=t.style||"normal",this.weight=t.weight||"normal",this.stretch=t.stretch||"normal",this.context=n}var d=null,l=null,a=null,r=null;function c(e){return null===r&&(r=!!e.document.fonts),r}function h(e,t){var n=e.style,i=e.weight;if(null===a){var o=document.createElement("div");try{o.style.font="condensed 100px sans-serif"}catch(e){}a=""!==o.style.font}return[n,i,a?e.stretch:"","100px",t].join(" ")}s.prototype.load=function(e,i){var s=this,a=e||"BESbswy",r=0,u=i||3e3,m=(new Date).getTime();return new Promise((function(e,i){if(c(s.context)&&!function(e){return null===l&&(c(e)&&/Apple/.test(window.navigator.vendor)?(e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent),l=!!e&&603>parseInt(e[1],10)):l=!1),l}(s.context)){var f=new Promise((function(e,t){!function n(){(new Date).getTime()-m>=u?t(Error(u+"ms timeout exceeded")):s.context.document.fonts.load(h(s,'"'+s.family+'"'),a).then((function(t){1<=t.length?e():setTimeout(n,25)}),t)}()})),p=new Promise((function(e,t){r=setTimeout((function(){t(Error(u+"ms timeout exceeded"))}),u)}));Promise.race([p,f]).then((function(){clearTimeout(r),e(s)}),i)}else!function(e){document.body?e():document.addEventListener?document.addEventListener("DOMContentLoaded",(function t(){document.removeEventListener("DOMContentLoaded",t),e()})):document.attachEvent("onreadystatechange",(function t(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",t),e())}))}((function(){function l(){var t;(t=-1!=w&&-1!=g||-1!=w&&-1!=v||-1!=g&&-1!=v)&&((t=w!=g&&w!=v&&g!=v)||(null===d&&(t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),d=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))),t=d&&(w==y&&g==y&&v==y||w==x&&g==x&&v==x||w==E&&g==E&&v==E)),t=!t),t&&(null!==b.parentNode&&b.parentNode.removeChild(b),clearTimeout(r),e(s))}var c=new t(a),f=new t(a),p=new t(a),w=-1,g=-1,v=-1,y=-1,x=-1,E=-1,b=document.createElement("div");b.dir="ltr",n(c,h(s,"sans-serif")),n(f,h(s,"serif")),n(p,h(s,"monospace")),b.appendChild(c.g),b.appendChild(f.g),b.appendChild(p.g),s.context.document.body.appendChild(b),y=c.g.offsetWidth,x=f.g.offsetWidth,E=p.g.offsetWidth,function e(){if((new Date).getTime()-m>=u)null!==b.parentNode&&b.parentNode.removeChild(b),i(Error(u+"ms timeout exceeded"));else{var t=s.context.document.hidden;!0!==t&&void 0!==t||(w=c.g.offsetWidth,g=f.g.offsetWidth,v=p.g.offsetWidth,l()),r=setTimeout(e,50)}}(),o(c,(function(e){w=e,l()})),n(c,h(s,'"'+s.family+'",sans-serif')),o(f,(function(e){g=e,l()})),n(f,h(s,'"'+s.family+'",serif')),o(p,(function(e){v=e,l()})),n(p,h(s,'"'+s.family+'",monospace'))}))}))},"object"==typeof module?module.exports=s:(window.FontFaceObserver=s,window.FontFaceObserver.prototype.load=s.prototype.load)}();
//# sourceMappingURL=index.b9c43661.js.map
