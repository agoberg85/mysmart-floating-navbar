const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",v=u.reactiveElementPolyfillSupport,f=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!a(t,e),g={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??g}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??b)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[f("elementProperties")]=new Map,y[f("finalized")]=new Map,v?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,x=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,H=document,U=()=>H.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,D=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,F=H.createTreeWalker(H,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=T;for(let e=0;e<s;e++){const s=t[e];let a,h,c=-1,l=0;for(;l<s.length&&(o.lastIndex=l,h=o.exec(s),null!==h);)l=o.lastIndex,o===T?"!--"===h[1]?o=R:void 0!==h[1]?o=z:void 0!==h[2]?(D.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=L):void 0!==h[3]&&(o=L):o===L?">"===h[0]?(o=n??T,c=-1):void 0===h[1]?c=-2:(c=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?L:'"'===h[3]?B:j):o===B||o===j?o=L:o===R||o===z?o=T:(o=L,n=void 0);const d=o===L&&t[e+1].startsWith("/>")?" ":"";r+=o===T?s+k:c>=0?(i.push(a),s.slice(0,c)+S+s.slice(c)+C+d):s+C+(-2===c?e:d)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[h,c]=K(t,e);if(this.el=X.createElement(h,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[r++],s=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Q}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),F.nextNode(),a.push({type:2,index:++n});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const s=H.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===V)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=M(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??H).importNode(e,!0);F.currentNode=i;let n=F.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new G(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=F.nextNode(),r++)}return F.currentNode=H,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new X(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new G(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=Z(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Z(this,i[s+o],e,o),a===V&&(a=this._$AH[o]),r||=!M(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends Q{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===V)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(X,G),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class ot extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new G(e.insertBefore(U(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");customElements.define("mysmart-floating-navbar",class extends ot{static get properties(){return{hass:{},_config:{},_navItems:{state:!0},_openMenu:{state:!0},_currentHash:{state:!0},_currentPath:{state:!0}}}constructor(){super(),this._openMenu=null,this._currentHash=window.location.hash,this._currentPath=window.location.pathname,this._boundEventHandlers=this._handleBrowserEvents.bind(this),this._boundClickOutside=this._handleClickOutside.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("hashchange",this._boundEventHandlers),window.addEventListener("location-changed",this._boundEventHandlers),window.addEventListener("popstate",this._boundEventHandlers),document.addEventListener("click",this._boundClickOutside)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this._boundEventHandlers),window.removeEventListener("location-changed",this._boundEventHandlers),window.removeEventListener("popstate",this._boundEventHandlers),document.removeEventListener("click",this._boundClickOutside)}willUpdate(t){if(this._currentPath!==window.location.pathname&&(this._currentPath=window.location.pathname),this._currentHash!==window.location.hash&&(this._currentHash=window.location.hash),t.has("_config")){const t=this._config.styles||{};t.z_index&&this.style.setProperty("--z-index",t.z_index),t.margin_left&&this.style.setProperty("--margin-left",t.margin_left),this.style.setProperty("--spacer-height",t.spacer_height||"80px")}}_handleBrowserEvents(){this._openMenu=null,setTimeout(()=>{this._currentPath=window.location.pathname,this._currentHash=window.location.hash,this.requestUpdate()},50)}_handleClickOutside(t){if(!this._openMenu)return;t.composedPath().includes(this)||(this._openMenu=null)}setConfig(t){if(!t.items)throw new Error("You need to define a list of items");this._config=t,this._navItems=t.items.map((t,e)=>({...t,id:t.id||`item-${e}`}))}_evaluateBadge(t){if(t.badge_template)try{return new Function("states","user","hass",`return ${t.badge_template}`)(this.hass.states,this.hass.user,this.hass)}catch(t){return!1}if(t.badge_entity){const e=this.hass.states[t.badge_entity];return!!e&&("on"===e.state||Number(e.state)>0)}return!1}_checkUserVisibility(t){return!t.users||(!this.hass||!this.hass.user||t.users.some(t=>t.toLowerCase()===this.hass.user.name.toLowerCase()))}_handleAction(t){if(t.sub_items)return void(this._openMenu=this._openMenu===t.id?null:t.id);if(this._openMenu=null,!t.tap_action)return;const e=t.tap_action;if("navigate"===e.action){const t=e.navigation_path;if(t){if(t.includes("#")){const e=t.substring(t.indexOf("#"));this._currentHash===e?(window.history.pushState(null,"",window.location.pathname),this._currentHash=""):(window.history.pushState(null,"",t),this._currentHash=e),window.dispatchEvent(new Event("hashchange"))}else window.history.pushState(null,"",t);window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0}))}}else if("call-service"===e.action){const[t,s]=e.service.split(".");this.hass.callService(t,s,e.service_data||e.data)}else if("fire-dom-event"===e.action){const t=new Event("ll-custom",{bubbles:!0,composed:!0});t.detail=e,this.dispatchEvent(t)}else"toggle-menu"===e.action?this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0})):"url"===e.action&&window.open(e.url_path)}_isActive(t){if(this._openMenu)return t.id===this._openMenu||!(!t.sub_items||!t.sub_items.some(t=>this._isActive(t)));if(!0===t.active)return!0;if(t.active_template)try{return new Function("states","user","hass","path","hash",`return ${t.active_template}`)(this.hass.states,this.hass.user,this.hass,this._currentPath,this._currentHash)}catch(t){return!1}if(t.sub_items)return t.sub_items.some(t=>this._isActive(t));if(t.tap_action&&t.tap_action.navigation_path){const e=t.tap_action.navigation_path;if(e.includes("#"))return e.endsWith(this._currentHash)&&""!==this._currentHash;return this._currentPath.replace(/\/$/,"")===e.replace(/\/$/,"")}return!1}render(){if(!this._navItems)return I``;const t=this._config.styles||{},e=null!==this.closest("hui-card-preview");return I`
      <div class="floating-layer ${e?"preview-mode":""}" style="
        --navbar-bg: ${t.background||"#ffffff"};
        --navbar-blur: ${t.blur||"10px"};
        --navbar-color: ${t.color||"#454545"};
        --navbar-active-color: ${t.active_color||"#000000"};
        --navbar-width: ${t.width||"100%"};
        --icon-size: ${t.icon_size||"24px"};
        --button-padding: ${t.button_padding||"6px"};
      ">
        <div class="navbar-container">
          ${this._navItems.map(t=>{if(!this._checkUserVisibility(t))return I``;const e=this._isActive(t),s=this._evaluateBadge(t),i=this._openMenu===t.id;return I`
              <div class="nav-item-wrapper">
                ${t.sub_items&&i?I`
                  <div class="sub-menu">
                    ${t.sub_items.map(t=>{if(!this._checkUserVisibility(t))return I``;let e=!1;if(t.tap_action&&t.tap_action.navigation_path){e=this._currentPath.replace(/\/$/,"")===t.tap_action.navigation_path.replace(/\/$/,"")}return I`
                            <div class="sub-menu-item ${t.name?"":"icon-only"} ${e?"active":""}" 
                                 @click=${e=>{e.stopPropagation(),this._handleAction(t)}}>
                              <ha-icon icon="${t.icon}"></ha-icon>
                              ${t.name?I`<span>${t.name}</span>`:""}
                            </div>
                        `})}
                  </div>
                `:""}

                <div 
                  class="nav-item ${e?"active":""}" 
                  @click=${()=>this._handleAction(t)}
                >
                  <div class="icon-container">
                      <ha-icon icon="${t.icon}"></ha-icon>
                      ${s?I`<div class="badge"></div>`:""}
                  </div>
                  ${t.name&&!t.hide_name?I`<span class="title">${t.name}</span>`:""}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}static get styles(){return r`
      :host {
        display: block;
        width: 100%;
        height: var(--spacer-height, 80px);
        background: transparent;
        margin-left: var(--margin-left, 0px);
        transition: margin-left 0.3s ease;
      }
      @media (max-width: 870px) {
        :host { margin-left: 0px !important; }
      }
      .floating-layer {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        max-width: 600px;
        z-index: var(--z-index, 6);
      }
      .navbar-container {
        display: flex;
        align-items: center;
        background: var(--navbar-bg);
        backdrop-filter: blur(var(--navbar-blur));
        -webkit-backdrop-filter: blur(var(--navbar-blur));
        border-radius: 35px;
        padding: 10px 16px; 
        width: var(--navbar-width);
        box-shadow: 0px 4px 20px rgba(0,0,0,0.15);
        border: 1px solid rgba(255,255,255,0.2);
        box-sizing: border-box;
      }
      .floating-layer.preview-mode {
        position: absolute;
        bottom: 0; left: 0;
        transform: none;
        width: 100%; max-width: 100%;
      }
      :host-context(hui-card-preview) {
        z-index: 1 !important;
        margin-left: 0 !important;
        height: auto; 
        display: block;
        position: relative;
      }
      .nav-item-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        flex: 1; 
      }
      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--navbar-color);
        transition: all 0.2s ease;
        padding: var(--button-padding);
        border-radius: 12px;
      }
      .nav-item:hover { opacity: 1; background-color: rgba(255,255,255,0.1); }
      .nav-item.active {
        color: var(--navbar-active-color);
        opacity: 1;
        transform: scale(1.05);
      }
      .nav-item.active::after {
        content: ''; position: absolute; bottom: 2px;
        width: 4px; height: 4px;
        background: var(--navbar-active-color);
        border-radius: 50%;
      }
      ha-icon { --mdc-icon-size: var(--icon-size); }
      .title { font-size: 10px; margin-top: 4px; font-weight: 500; }
      .icon-container { position: relative; display: flex; align-items: center; justify-content: center; }
      .badge {
        position: absolute; top: -2px; right: -2px;
        width: 8px; height: 8px;
        background-color: var(--error-color);
        border-radius: 50%;
        border: 1px solid var(--navbar-bg);
      }
      .sub-menu {
        position: absolute; bottom: 75px; left: 50%;
        transform: translateX(-50%);
        background: var(--navbar-bg);
        border-radius: 16px;
        padding: 8px;
        box-shadow: 0px 4px 15px rgba(0,0,0,0.2);
        display: flex; flex-direction: column; gap: 6px;
        animation: fadeUp 0.2s ease-out;
        z-index: 1000;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(var(--navbar-blur));
        -webkit-backdrop-filter: blur(var(--navbar-blur));
      }
      .sub-menu-item {
        display: flex; align-items: center; gap: 12px;
        padding: 10px 12px;
        border-radius: 8px; cursor: pointer;
        white-space: nowrap;
        color: var(--navbar-color);
      }
      .sub-menu-item.icon-only { justify-content: center; }
      .sub-menu-item:hover { background: rgba(0,0,0,0.05); color: var(--navbar-active-color); }
      .sub-menu-item span { font-size: 14px; font-weight: 500; }
      .sub-menu-item.active {
        color: var(--navbar-active-color);
        background: rgba(0,0,0,0.05);
        font-weight: bold;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translate(-50%, 10px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"mysmart-floating-navbar",name:"MySmart Floating Navbar",description:"A floating bottom navigation bar."});
//# sourceMappingURL=mysmart-floating-navbar.js.map
