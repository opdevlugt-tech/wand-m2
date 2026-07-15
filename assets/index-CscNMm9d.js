var Ju=Object.defineProperty;var Qu=(n,e,t)=>e in n?Ju(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Pt=(n,e,t)=>Qu(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const eo=Math.PI*2;function Le(n,e){const t=e.x-n.x,i=e.y-n.y;return Math.hypot(t,i)}function zo(n,e){return{x:(n.x+e.x)/2,y:(n.y+e.y)/2}}function fn(n,e){return Math.atan2(e.y-n.y,e.x-n.x)}function ks(n){let e=n%eo;return e<=-Math.PI&&(e+=eo),e>Math.PI&&(e-=eo),e}function xl(n,e=45){const t=e*Math.PI/180;return Math.round(n/t)*t}function vl(n,e,t=45){const i=t*Math.PI/180,r=ks(e-n),s=Math.round(r/i)*i;return n+s}function Ho(n,e,t){return{x:n.x+Math.cos(e)*t,y:n.y+Math.sin(e)*t}}function xs(n,e,t){return Le(n,e)<=t}function qr(n,e,t){return(e.x-n.x)*(t.y-n.y)-(e.y-n.y)*(t.x-n.x)}function $r(n,e,t,i){return Math.min(n.x,e.x)-i<=t.x&&t.x<=Math.max(n.x,e.x)+i&&Math.min(n.y,e.y)-i<=t.y&&t.y<=Math.max(n.y,e.y)+i}function zs(n,e,t=1e-6){const{a:i,b:r}=n,{a:s,b:o}=e;if(Le(i,s)<t||Le(i,o)<t||Le(r,s)<t||Le(r,o)<t)return!1;const a=qr(s,o,i),l=qr(s,o,r),c=qr(i,r,s),d=qr(i,r,o);return!!((a>t&&l<-t||a<-t&&l>t)&&(c>t&&d<-t||c<-t&&d>t)||Math.abs(a)<=t&&$r(s,o,i,t)||Math.abs(l)<=t&&$r(s,o,r,t)||Math.abs(c)<=t&&$r(i,r,s,t)||Math.abs(d)<=t&&$r(i,r,o,t))}function Bc(n){const e=[];for(let t=0;t<n.length-1;t++)e.push({a:n[t],b:n[t+1]});return e}function Tt(n,e){const t=Bc(n);return e&&n.length>=3&&t.push({a:n[n.length-1],b:n[0]}),t}function Hs(n,e,t){const i=t.x-e.x,r=t.y-e.y,s=i*i+r*r;if(s<1e-12)return Le(n,e);let o=((n.x-e.x)*i+(n.y-e.y)*r)/s;return o=Math.max(0,Math.min(1,o)),Le(n,{x:e.x+o*i,y:e.y+o*r})}function Go(n,e,t){const i=t.x-e.x,r=t.y-e.y,s=i*i+r*r;if(s<1e-12)return 0;const o=((n.x-e.x)*i+(n.y-e.y)*r)/s;return Math.max(0,Math.min(1,o))}function Wt(n,e,t){return{x:n.x+(e.x-n.x)*t,y:n.y+(e.y-n.y)*t}}function Or(n,e,t,i,r){const s=Le(n,e);if(s<2||i<=0||r<=0)return null;const o=i*r;if(o>s+.5)return null;const a=o/2,l=Math.max(0,s-o),c=Math.min(4,l/2);let d=Math.max(0,Math.min(1,t));const f=a/s,u=c/s,p=Math.min(.5,f+u),m=Math.max(.5,1-f-u);d=Math.max(p,Math.min(m,d));const x=Wt(n,e,d-f),g=Wt(n,e,d+f),h=Wt(n,e,d);return{a:n,b:e,openA:x,openB:g,center:h,dir:fn(n,e),halfWidthPx:Le(x,g)/2,wallLenPx:s}}function ju(n,e,t,i){const r=Le(n,e);if(r<1e-6)return[];if(!t.length)return[{a:n,b:e}];const s=[];for(const c of t){const d=Or(n,e,c.t,c.widthM,i);if(!d)continue;const f=Le(n,d.openA)/r,u=Le(n,d.openB)/r;s.push({t0:Math.min(f,u),t1:Math.max(f,u)})}if(!s.length)return[{a:n,b:e}];s.sort((c,d)=>c.t0-d.t0);const o=[];for(const c of s){const d=o[o.length-1];!d||c.t0>d.t1+1e-6?o.push({...c}):d.t1=Math.max(d.t1,c.t1)}const a=[];let l=0;for(const c of o)c.t0-l>1e-4&&a.push({a:Wt(n,e,l),b:Wt(n,e,c.t0)}),l=c.t1;return 1-l>1e-4&&a.push({a:Wt(n,e,l),b:Wt(n,e,1)}),a}function ed(n,e,t,i,r){const s=Tt(e,!0);let o=null,a=r;for(const l of t){const c=s[l.wallIndex];if(!c)continue;const d=Or(c.a,c.b,l.t,l.widthM,i);if(!d)continue;const f=Hs(n,d.openA,d.openB),u=Le(n,d.center),p=Math.min(f,u);p<=a&&(a=p,o=l.id)}return o}function Ml(n,e,t,i){const r=Tt(e,t);let s=null,o=i;for(let a=0;a<r.length;a++){const l=Hs(n,r[a].a,r[a].b);l<=o&&(o=l,s=a)}return s}function Sl(n,e,t,i=1e-6){if(n.length<1)return!1;const s={a:n[n.length-1],b:e},o=Bc(n);for(let a=0;a<o.length;a++)if(a!==o.length-1&&!(t&&a===0)&&zs(s,o[a],i))return!0;return!1}function kc(n,e){if(n.length<3||e<=0)return 0;let t=0;const i=n.length;for(let s=0;s<i;s++){const o=(s+1)%i;t+=n[s].x*n[o].y-n[o].x*n[s].y}return Math.abs(t)/2/(e*e)}function zc(n,e,t){return t<=0?0:Le(n,e)/t}function Ha(n,e=2){return`${n.toFixed(e)} m`}function vr(n,e=2){return`${n.toFixed(e)} m²`}function td(n,e,t,i){const r=n.length;if(r<2||t<1)return null;const s=i?r:r-1;if(e<0||e>=s)return null;const o=e,a=i?(o+1)%r:o+1,l=n[o],c=n[a],d=Le(l,c);if(d<1e-9)return null;const f=(c.x-l.x)/d,u=(c.y-l.y)/d,p={x:l.x+f*t,y:l.y+u*t},m=n.map(x=>({...x}));return m[a]=p,m}function nd(n,e){return n.reduce((t,i)=>t+kc(i.vertices,e),0)}function Rs(n,e=1){return`${n.toFixed(e)}°`}function id(n,e,t){const i=n.x-e.x,r=n.y-e.y,s=t.x-e.x,o=t.y-e.y,a=Math.hypot(i,r),l=Math.hypot(s,o);if(a<1e-9||l<1e-9)return 0;const c=Math.max(-1,Math.min(1,(i*s+r*o)/(a*l)));return Math.acos(c)*180/Math.PI}function Hc(n,e,t){const i=fn(n,e),r=fn(e,t);return ks(r-i)}function Ga(n){let e=0;const t=n.length;if(t<3)return 1;for(let i=0;i<t;i++){const r=(i+1)%t;e+=n[i].x*n[r].y-n[r].x*n[i].y}return e<0?-1:1}function Nr(n,e,t,i){const r=Hc(n,e,t),s=i>=0?1:-1;let o=Math.PI-s*r;o<=1e-9&&(o+=Math.PI*2),o>Math.PI*2+1e-9&&(o-=Math.PI*2);let a=o*180/Math.PI;a<0&&(a+=360),a>360&&(a-=360),a<.05&&(a=360);const l=360-a;return{interiorDeg:a,exteriorDeg:l,wallWedgeDeg:id(n,e,t)}}function Gs(n,e,t){const i=Gc(n,e,t);if(!i)return null;const r=t?Ga(n):Va(n);return Nr(i.prev,i.corner,i.next,r)}function Va(n){if(n.length<3)return 1;let e=0;for(let t=1;t<n.length-1;t++)e+=Hc(n[t-1],n[t],n[t+1]);return e<0?-1:1}const rd=[45,90,135,180,225,270,315];function or(n,e=45,t=1.5){const i=(n%e+e)%e;return i<=t||e-i<=t}function Vo(n,e=[...rd]){let t=n%360;t<0&&(t+=360);let i=e[0]??90,r=1/0;for(const s of e){const o=Math.min(Math.abs(t-s),360-Math.abs(t-s));o<r&&(r=o,i=s)}return i}function Gc(n,e,t){const i=n.length;if(i<3||!t&&(e<=0||e>=i-1)||t&&(e<0||e>=i))return null;const r=t?(e-1+i)%i:e-1,s=t?(e+1)%i:e+1;return{prev:n[r],corner:n[e],next:n[s],prevIdx:r,nextIdx:s}}function gi(n,e,t){const i=Gs(n,e,t);return i?i.interiorDeg:null}function Ur(n,e,t,i){if(n.length<3)return null;const s=Gc(n,e,i);if(!s)return null;const a=(i?Ga(n):Va(n))>=0?1:-1,l=Le(s.corner,s.next);if(l<1e-6)return null;let c=t;if(!Number.isFinite(c))return null;c=Math.max(1,Math.min(359,c));const d=fn(s.prev,s.corner),f=a*(Math.PI-c*Math.PI/180),u=d+f,p=n.map(m=>({...m}));return p[s.nextIdx]=Ho(s.corner,u,l),p}function sd(n,e,t,i){return Ur(n,e,t,i)}function od(n,e,t,i=[45,90,135,180,225,270,315]){const r=gi(n,e,t);if(r===null)return null;const s=Vo(r,i);return Ur(n,e,s,t)}function ad(n,e,t,i){const r=fn(e,n),s=fn(e,t),o=i>=0?1:-1;let a=ks(s-r);const c=Nr(n,e,t,o).interiorDeg*Math.PI/180;let d=a;Math.abs(Math.abs(d)-c)>.15&&(d=d>0?d-Math.PI*2:d+Math.PI*2),Math.abs(Math.abs(d)-c)>.2&&(d=Math.sign(d||o)*c);const f=r+d/2;return{startRad:r,endRad:r+d,midRad:f,sweepRad:d}}function Vc(n,e,t){const i=fn(n,e),r=fn(e,t);return ks(r-i)*180/Math.PI}function yl(n,e,t){let i=null,r=t;for(let s=0;s<e.length;s++){const o=Le(n,e[s]);o<=r&&(r=o,i=s)}return i}function Wa(n,e,t=1.5){if(n.length<3)return[];const i=[];for(let r=0;r<n.length;r++){const s=gi(n,r,!0);s!==null&&!or(s,45,t)&&i.push(r)}return i}function vs(n){const e=Tt(n,!0);for(let t=0;t<e.length;t++)for(let i=t+1;i<e.length;i++)if(i!==t+1&&!(t===0&&i===e.length-1)&&zs(e[t],e[i]))return!0;return!1}function ti(n,e){if(e)return vs(n);const t=Tt(n,!1);for(let i=0;i<t.length;i++)for(let r=i+1;r<t.length;r++)if(r!==i+1&&zs(t[i],t[r]))return!0;return!1}function Wc(n,e,t=8){const i=n.length;if(i<3||e<0||e>=i)return n.map(a=>({...a}));let r=n.map(a=>({...a}));for(let a=0;a<t;a++){let l=!1;const c=a%2===0?[...Array(i).keys()]:[...Array(i).keys()].reverse();for(const d of c){if(d===e)continue;const f=gi(r,d,!0);if(f===null)continue;const u=Vo(f);if(Math.abs(f-u)<.75)continue;const p=Ur(r,d,u,!0);p&&!vs(p)&&Le(p[(d+1)%i],r[(d+1)%i])>.05&&(r=p,l=!0)}if(!l)break}const s=gi(r,e,!0),o=Wa(r).filter(a=>a!==e);if(o.length===0&&s!==null&&or(s)){const a=gi(n,e,!0);if(a!==null&&!or(a)){const l=Ur(r,e,a,!0);l&&!vs(l)&&(r=l)}}else if(o.length>0)for(let a=0;a<i;a++){const l=(e+1+a)%i;if(l===e)continue;const c=gi(r,l,!0);if(c===null)continue;const d=Vo(c);if(Math.abs(c-d)<.75)continue;const f=Ur(r,l,d,!0);f&&!vs(f)&&(r=f)}return r}function Wo(n,e){const t=e.length;if(t<3)return!1;for(let r=0;r<t;r++){const s=e[r],o=e[(r+1)%t];if(Hs(n,s,o)<1e-6)return!0}let i=!1;for(let r=0,s=t-1;r<t;s=r++){const o=e[r].x,a=e[r].y,l=e[s].x,c=e[s].y;a>n.y!=c>n.y&&n.x<(l-o)*(n.y-a)/(c-a+1e-15)+o&&(i=!i)}return i}function Xa(n,e,t){const i=Le(n,e);if(i<8)return!1;const r=(e.x-n.x)/i,s=(e.y-n.y)/i,o=Math.min(3,i*.08),a={x:n.x+r*o,y:n.y+s*o},l={x:e.x-r*o,y:e.y-s*o},c=Tt(t,!0);for(const d of c)if(zs({a,b:l},d))return!1;for(let d=1;d<=4;d++){const f=d/5,u=Wt(n,e,f);if(!Wo(u,t))return!1}return!0}function ld(n,e,t){return n===e||(n+1)%t===e||(e+1)%t===n}function cd(n){const e=n.length;if(e<4)return[];const t=[],i=new Set,r=(o,a,l,c)=>{if(ld(o,l,e))return;const d=Wt(n[o],n[(o+1)%e],a),f=Wt(n[l],n[(l+1)%e],c);if(!Xa(d,f,n))return;let u=o,p=a,m=l,x=c,g=d,h=f;(u>m||u===m&&p>x)&&([u,m]=[m,u],[p,x]=[x,p],[g,h]=[h,g]);const E=`${u}:${p.toFixed(2)}-${m}:${x.toFixed(2)}`;i.has(E)||(i.add(E),t.push({id:E,wallA:u,tA:p,wallB:m,tB:x,a:g,b:h}))},s=[.5,.33,.67];for(let o=0;o<e;o++)for(let a=o+2;a<e;a++)if(!(o===0&&a===e-1))for(const l of s)for(const c of s)r(o,l,a,c);return t.sort((o,a)=>Le(a.a,a.b)-Le(o.a,o.b)),t.sort((o,a)=>{const l=c=>(Math.abs(c.tA-.5)<.01&&Math.abs(c.tB-.5)<.01?1e3:0)+Le(c.a,c.b);return l(a)-l(o)}),t.slice(0,12)}function qa(n,e,t,i,r){const s=n.length;if(s<3||e===i)return null;Xa(Wt(n[e],n[(e+1)%s],t),Wt(n[i],n[(i+1)%s],r),n);const o=Array.from({length:s},()=>[]);o[e].push({which:"A",t}),o[i].push({which:"B",t:r});for(const m of o)m.sort((x,g)=>x.t-g.t);const a=[];let l=-1,c=-1;for(let m=0;m<s;m++){const x=n[m],g=n[(m+1)%s],h=a.length;a.push({...x});for(const E of o[m])if(E.t<=1e-6)E.which==="A"?l=h:c=h;else if(!(E.t>=1-1e-6)){const w=Wt(x,g,E.t),y=a.length;a.push(w),E.which==="A"?l=y:c=y}}for(let m=0;m<s;m++)for(const x of o[m])if(x.t>=1-1e-6){const g=(m+1)%s;let h=0;for(let E=0;E<g;E++){h+=1;for(const w of o[E])w.t>1e-6&&w.t<1-1e-6&&(h+=1)}x.which==="A"?l=h:c=h}if(l<0||c<0||l===c)return null;const d=a.length,f=(m,x)=>{const g=[];let h=m;for(let E=0;E<d+2&&(g.push({...a[h]}),h!==x);E++)h=(h+1)%d;return g},u=f(l,c),p=f(c,l);return u.length<3||p.length<3||ti(u,!0)||ti(p,!0)?null:{loopA:u,loopB:p}}function Ii(n,e,t=28){const i=Tt(n,!0);let r=null;for(let s=0;s<i.length;s++){const o=Hs(e,i[s].a,i[s].b),a=Go(e,i[s].a,i[s].b);(!r||o<r.d)&&(r={wallIndex:s,t:a,d:o})}return!r||r.d>t?null:r}function ud(n,e,t,i=4,r=1e6){const s=Math.cos(e),o=Math.sin(e),a=Tt(t,!0);let l=null;for(let c=0;c<a.length;c++){const{a:d,b:f}=a[c],u=f.x-d.x,p=f.y-d.y,m=d.x-n.x,x=d.y-n.y,g=s*p-o*u;if(Math.abs(g)<1e-12)continue;const h=(m*p-x*u)/g,E=(m*o-x*s)/g;if(h<i||h>r||E<-.02||E>1.02)continue;const w=Math.max(0,Math.min(1,E)),y={x:d.x+u*w,y:d.y+p*w};Le(y,n)<i||(!l||h<l.dist)&&(l={point:y,wallIndex:c,tOnWall:w,dist:h})}return l}function Xc(n,e,t){const i=Tt(n,!0),r=[];for(let l=0;l<i.length;l++){const{a:c,b:d}=i[l];if(e==="x"){const f=d.x-c.x;if(Math.abs(f)<1e-9)continue;const u=(t-c.x)/f;if(u<-1e-6||u>1+1e-6)continue;const p=Math.max(0,Math.min(1,u)),m=Wt(c,d,p);if(Math.abs(m.x-t)>.5)continue;r.push({p:m,wall:l,t:p})}else{const f=d.y-c.y;if(Math.abs(f)<1e-9)continue;const u=(t-c.y)/f;if(u<-1e-6||u>1+1e-6)continue;const p=Math.max(0,Math.min(1,u)),m=Wt(c,d,p);if(Math.abs(m.y-t)>.5)continue;r.push({p:m,wall:l,t:p})}}if(r.length<2)return null;const s=[];for(const l of r)s.some(c=>Le(c.p,l.p)<1.5)||s.push(l);if(s.length<2)return null;s.sort((l,c)=>e==="x"?l.p.y-c.p.y:l.p.x-c.p.x);const o=s[0],a=s[s.length-1];return o.wall===a.wall||!Xa(o.p,a.p,n)?null:{id:`axis-${e}-${t.toFixed(1)}`,wallA:o.wall,tA:o.t,wallB:a.wall,tB:a.t,a:o.p,b:a.p}}function qc(n,e,t){if(n.length<3||e<2)return null;let i=1/0,r=-1/0,s=1/0,o=-1/0;for(const m of n)i=Math.min(i,m.x),r=Math.max(r,m.x),s=Math.min(s,m.y),o=Math.max(o,m.y);const a=r-i,l=o-s;if(a<20&&l<20)return null;const c=m=>{const x=m==="x"?i:s,h=(m==="x"?r:o)-x;if(h<30)return null;const E=[];for(let w=1;w<e;w++){const y=x+h*w/e,T=Xc(n,m,y);if(!T)return null;E.push(T)}return E},d=t==="x"||t==="y"?t:a>=l?"x":"y",f=d==="x"?"y":"x";let u=c(d),p=d;return u||(u=c(f),p=f),!u||u.length!==e-1?null:{parts:e,axis:p,cuts:u}}function dd(n,e,t){const i=qc(n,e,t);if(!i)return null;const r=[...i.cuts].sort((a,l)=>{const c=i.axis==="x"?(a.a.x+a.b.x)/2:(a.a.y+a.b.y)/2,d=i.axis==="x"?(l.a.x+l.b.x)/2:(l.a.y+l.b.y)/2;return c-d}),s=[];let o=n.map(a=>({...a}));for(let a=0;a<r.length;a++){const l=i.axis==="x"?(r[a].a.x+r[a].b.x)/2:(r[a].a.y+r[a].b.y)/2,c=Xc(o,i.axis,l);if(!c)return null;const d=qa(o,c.wallA,c.tA,c.wallB,c.tB);if(!d)return null;const f=El(d.loopA),u=El(d.loopB),p=i.axis==="x"?f.x:f.y,m=i.axis==="x"?u.x:u.y;p<=m?(s.push(d.loopA),o=d.loopB):(s.push(d.loopB),o=d.loopA)}return s.push(o),s.length!==e?null:s}function El(n){let e=0,t=0;for(const r of n)e+=r.x,t+=r.y;const i=Math.max(1,n.length);return{x:e/i,y:t/i}}function fd(n,e){if(e.length<2||n.length<3)return null;const t=Ii(n,e[0],40),i=Ii(n,e[e.length-1],40);if(!t||!i||t.wallIndex===i.wallIndex&&Math.abs(t.t-i.t)<.02)return null;const r=qa(n,t.wallIndex,t.t,i.wallIndex,i.t);if(!r)return null;if(e.length===2)return r;const s=e.slice(1,-1).map(c=>({...c}));if(!s.length)return r;const o=(c,d)=>{if(c.length<2)return c;const f=d?[...s].reverse():[...s];return[...c,...f]},a=o(r.loopA,!0),l=o(r.loopB,!1);return a.length<3||l.length<3?null:ti(a,!0)||ti(l,!0)?r:{loopA:a,loopB:l}}function hd(n,e,t,i,r=1){return{underMinArea:t>0&&n+1e-6<t,missingDoor:i&&e<r}}const pd=6;function md(n,e,t,i,r=pd){return Le(n,t)<r&&Le(e,i)<r||Le(n,i)<r&&Le(e,t)<r}function Ps(n,e,t){const i=n[e];if(!i||i.vertices.length<2)return null;const s=Tt(i.vertices,!0)[t];if(!s)return null;for(let o=0;o<n.length;o++){if(o===e)continue;const a=Tt(n[o].vertices,!0);for(let l=0;l<a.length;l++)if(md(s.a,s.b,a[l].a,a[l].b))return{loopIndex:e,wallIndex:t,partnerLoopIndex:o,partnerWallIndex:l}}return null}function bl(n,e,t,i){const r=n.length;if(r<3||e<0||e>=r)return null;const s=n.map(l=>({...l})),o=e,a=(e+1)%r;return s[o]={x:s[o].x+t,y:s[o].y+i},s[a]={x:s[a].x+t,y:s[a].y+i},Le(s[o],s[a])<2?null:s}function gd(n,e,t,i){const r=n.length,s=t.length;if(r<3||s<3)return null;const o=n[e],a=n[(e+1)%r],l=t[i],c=t[(i+1)%s],d=t.map(p=>({...p})),f=Le(l,o)+Le(c,a),u=Le(l,a)+Le(c,o);return f<=u?(d[i]={...o},d[(i+1)%s]={...a}):(d[i]={...a},d[(i+1)%s]={...o}),d}function _d(n,e){const t=Le(n,e)||1;return{x:-(e.y-n.y)/t,y:(e.x-n.x)/t}}function xd(n,e,t,i){const r=_d(t,i),s=n*r.x+e*r.y;return{dx:r.x*s,dy:r.y*s}}function vd(n,e,t,i){const r=n.length,s=t.length;if(r<3||s<3)return null;const o=n[e],a=n[(e+1)%r],l=t[i],c=t[(i+1)%s],d=8,f=Le(o,l)<d&&Le(a,c)<d,u=Le(o,c)<d&&Le(a,l)<d;if(!f&&!u)return null;const p=[];let m=(e+1)%r;for(let h=0;h<r-1;h++)p.push({...n[m]}),m=(m+1)%r;let x=(i+1)%s;for(let h=0;h<s-1;h++)p.push({...t[x]}),x=(x+1)%s;const g=[];for(const h of p)(!g.length||Le(g[g.length-1],h)>1.5)&&g.push(h);return g.length>=2&&Le(g[0],g[g.length-1])<1.5&&g.pop(),g.length<3||ti(g,!0)?null:g}const Md=["Slaapkamer","Slaapkamer 1p","Slaapkamer 2p","Gang","Badkamer","Toilet","Woonkamer","Keuken","Berging","Kantoor","Techniek","Entree","Balkon","Overig"],Jt={defaultDoorWidthM:.9,tileSizeM:.3,majorGridM:1,minDoorsPerRoom:1,types:[{id:"bedroom1",code:"1p",labelNl:"Slaapkamer 1p",labelEn:"Bedroom 1p",minAreaM2:3.5,requireDoor:!0},{id:"bedroom2",code:"2p",labelNl:"Slaapkamer 2p",labelEn:"Bedroom 2p",minAreaM2:7,requireDoor:!0},{id:"hall",code:"GANG",labelNl:"Gang",labelEn:"Hall",minAreaM2:0,requireDoor:!1},{id:"bath",code:"BAD",labelNl:"Badkamer",labelEn:"Bathroom",minAreaM2:0,requireDoor:!0},{id:"toilet",code:"WC",labelNl:"Toilet",labelEn:"Toilet",minAreaM2:0,requireDoor:!0},{id:"living",code:"WOON",labelNl:"Woonkamer",labelEn:"Living",minAreaM2:0,requireDoor:!1},{id:"kitchen",code:"KEU",labelNl:"Keuken",labelEn:"Kitchen",minAreaM2:0,requireDoor:!1},{id:"storage",code:"BERG",labelNl:"Berging",labelEn:"Storage",minAreaM2:0,requireDoor:!1},{id:"office",code:"KANT",labelNl:"Kantoor",labelEn:"Office",minAreaM2:0,requireDoor:!0},{id:"other",code:"—",labelNl:"Overig",labelEn:"Other",minAreaM2:0,requireDoor:!1}],defaultTypeId:"other"};function Xo(n){return Jt.types.find(t=>t.id===n)??Jt.types.find(t=>t.id===Jt.defaultTypeId)}function Sd(n,e,t="nl"){const i=(n??"").trim();if(i)return i;const r=Xo(e);return t==="en"?r.labelEn:r.labelNl}let yd=1,Ed=1;function Ai(){return`L${yd++}`}function bd(){return`D${Ed++}`}const Td=Jt.defaultDoorWidthM;class Ad{constructor(e,t){Pt(this,"model",{loops:[],status:"idle",vertices:[],draftEnd:null,partitionPath:null,partitionLoopIndex:null});Pt(this,"selection",{kind:"none"});Pt(this,"meetfoutLoopIndex",null);Pt(this,"enabled",!0);Pt(this,"pointerId",null);Pt(this,"active",!1);Pt(this,"dragDoor",null);Pt(this,"dragWall",null);Pt(this,"history",[]);Pt(this,"maxHistory",60);Pt(this,"historyLocked",!1);Pt(this,"onDown",e=>{if(!this.enabled||e.button!==0&&e.pointerType==="mouse")return;const t=this.localPoint(e),{vertices:i,status:r}=this.model;if(r==="partition"&&this.model.partitionLoopIndex!==null){this.handlePartitionClick(t);return}if((r==="open"||r==="drawing")&&i.length>0){const o=i[i.length-1];if(xs(t,o,this.worldHitRadius()*1.6)){this.model={...this.model,status:"drawing",draftEnd:t},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange();return}}const s=this.hitTestAll(t);if(s.kind==="door"){this.pushHistory(),this.setSelection(s,!1,!1,!0),this.dragDoor={loopIndex:s.loopIndex,doorId:s.doorId},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange();return}if(this.selection.kind==="door"&&s.kind==="wall"&&s.loopIndex===this.selection.loopIndex){const o=this.getSelectedDoor();if(o&&o.wallIndex===s.wallIndex){this.dragDoor={loopIndex:this.selection.loopIndex,doorId:this.selection.doorId},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId);return}}if(s.kind==="wall"&&s.loopIndex!==null){this.pushHistory(),this.setSelection(s,!0,!1),this.dragWall={loopIndex:s.loopIndex,wallIndex:s.wallIndex,partner:Ps(this.model.loops,s.loopIndex,s.wallIndex),last:t},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange();return}if(s.kind==="wall"){this.setSelection(s,!0,!1),this.cfg.onChange();return}if(s.kind==="vertex"){this.setSelection(s,!1,!0),this.cfg.onChange();return}(r==="idle"||r==="open"&&i.length===0)&&(this.pushHistory(),this.model={...this.model,status:"drawing",vertices:[{...t}],draftEnd:t},this.setSelection({kind:"none"}),this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange())});Pt(this,"onMove",e=>{if(!this.enabled)return;const t=this.localPoint(e);if(this.dragDoor){this.moveDoorToPoint(this.dragDoor.loopIndex,this.dragDoor.doorId,t)&&this.cfg.onChange();return}if(this.dragWall){this.moveDraggedWall(t);return}if(this.model.status==="partition"&&this.model.partitionPath&&this.model.partitionPath.length>0){const r=this.snapPartitionDraft(t);this.model={...this.model,draftEnd:r},this.cfg.onChange();return}if(!this.active||e.pointerId!==this.pointerId||this.model.status!=="drawing"||this.model.vertices.length===0)return;const i=this.snapDraft(t);this.model={...this.model,draftEnd:i},this.cfg.onChange()});Pt(this,"onUp",e=>{if(!this.enabled)return;if(this.dragDoor){this.dragDoor=null,this.active=!1,this.pointerId=null,this.cfg.onChange();return}if(this.dragWall){this.dragWall=null,this.active=!1,this.pointerId=null,this.cfg.onChange();return}if(!this.active||this.pointerId!==null&&e.pointerId!==this.pointerId)return;this.active=!1,this.pointerId=null;const{vertices:t,draftEnd:i}=this.model;if(!i||t.length===0){this.finishCancelDraft();return}const r=t[t.length-1],s=Le(r,i);if(t.length===1&&s<this.cfg.minLengthPx){this.model={...this.model,status:"idle",vertices:[],draftEnd:null},this.cfg.onChange();return}if(s<this.cfg.minLengthPx){this.finishCancelDraft();return}if(t.length>=3&&xs(i,t[0],this.worldCloseRadius())){if(Sl(t,t[0],!0)){this.cfg.onReject(),this.finishCancelDraft();return}const l=[...t],c={id:Ai(),vertices:l,doors:[],roomTypeId:Jt.defaultTypeId,name:null},d=[...this.model.loops,c],f=d.length-1;this.pushHistory(),this.model={loops:d,status:"idle",vertices:[],draftEnd:null,partitionPath:null,partitionLoopIndex:null},this.meetfoutLoopIndex=f,this.setSelection({kind:"wall",loopIndex:f,wallIndex:0},!0,!1),this.cfg.onChange();const u=Wa(l);if(u.length>0&&this.cfg.onCloseMeetfout){const p=u.map(m=>{const x=Gs(l,m,!0);return x?{index:m,angles:x}:null}).filter(m=>m!==null);p.length&&this.cfg.onCloseMeetfout(f,p)}return}if(Sl(t,i,!1)){this.cfg.onReject(),this.finishCancelDraft();return}const a=[...t,i];this.pushHistory(),this.model={...this.model,status:"open",vertices:a,draftEnd:null},this.setSelection({kind:"wall",loopIndex:null,wallIndex:a.length-2},!0,!1),this.cfg.onChange()});this.canvas=e,this.cfg=t,this.bind()}cloneModel(e){return JSON.parse(JSON.stringify(e))}cloneSelection(e){return JSON.parse(JSON.stringify(e))}pushHistory(){this.historyLocked||(this.history.push({model:this.cloneModel(this.model),selection:this.cloneSelection(this.selection),meetfoutLoopIndex:this.meetfoutLoopIndex}),this.history.length>this.maxHistory&&this.history.shift())}bind(){this.canvas.addEventListener("pointerdown",this.onDown),this.canvas.addEventListener("pointermove",this.onMove),this.canvas.addEventListener("pointerup",this.onUp),this.canvas.addEventListener("pointercancel",this.onUp)}destroy(){this.canvas.removeEventListener("pointerdown",this.onDown),this.canvas.removeEventListener("pointermove",this.onMove),this.canvas.removeEventListener("pointerup",this.onUp),this.canvas.removeEventListener("pointercancel",this.onUp)}emitSelection(e=!1,t=!1,i=!1){this.selection.kind==="wall"?(this.cfg.onWallSelected?.(this.selection,e),this.cfg.onVertexSelected?.({kind:"none"},!1),this.cfg.onDoorSelected?.({kind:"none"},!1)):this.selection.kind==="vertex"?(this.cfg.onVertexSelected?.(this.selection,t),this.cfg.onWallSelected?.({kind:"none"},!1),this.cfg.onDoorSelected?.({kind:"none"},!1)):this.selection.kind==="door"?(this.cfg.onDoorSelected?.(this.selection,i),this.cfg.onWallSelected?.({kind:"none"},!1),this.cfg.onVertexSelected?.({kind:"none"},!1)):(this.cfg.onWallSelected?.({kind:"none"},!1),this.cfg.onVertexSelected?.({kind:"none"},!1),this.cfg.onDoorSelected?.({kind:"none"},!1))}setSelection(e,t=!1,i=!1,r=!1){this.selection=e,this.emitSelection(t,i,r)}get selectedWallIndex(){return this.selection.kind==="wall"?this.selection.wallIndex:null}set selectedWallIndex(e){if(e===null)this.selection.kind==="wall"&&(this.selection={kind:"none"});else{const t=this.selection.kind==="wall"||this.selection.kind==="vertex"?this.selection.loopIndex:this.model.loops.length?this.model.loops.length-1:null;this.selection={kind:"wall",loopIndex:t,wallIndex:e}}}get selectedVertexIndex(){return this.selection.kind==="vertex"?this.selection.vertexIndex:null}set selectedVertexIndex(e){if(e===null)this.selection.kind==="vertex"&&(this.selection={kind:"none"});else{const t=this.selection.kind==="wall"||this.selection.kind==="vertex"?this.selection.loopIndex:this.model.loops.length?this.model.loops.length-1:null;this.selection={kind:"vertex",loopIndex:t,vertexIndex:e}}}focusCorner(e,t=!0){const i=this.meetfoutLoopIndex??(this.model.loops.length?this.model.loops.length-1:null);this.setSelection({kind:"vertex",loopIndex:i,vertexIndex:e},!1,t),this.cfg.onChange()}vertsForSelection(){if(this.selection.kind==="none"||this.selection.kind==="door")return null;if(this.selection.loopIndex===null)return{vertices:this.model.vertices,closed:!1};const e=this.model.loops[this.selection.loopIndex];return e?{vertices:e.vertices,closed:!0}:null}writeVerts(e,t,i=!1){if(i&&this.pushHistory(),t===null)this.model={...this.model,vertices:e,draftEnd:null};else{const r=this.model.loops.map((s,o)=>o===t?{...s,vertices:e}:s);this.model={...this.model,loops:r}}}writeLoop(e,t,i=!1){i&&this.pushHistory();const r=this.model.loops.map((s,o)=>o===e?{...s,...t}:s);this.model={...this.model,loops:r}}getSelectedDoor(){if(this.selection.kind!=="door")return null;const e=this.selection;return this.model.loops[e.loopIndex]?.doors.find(i=>i.id===e.doorId)??null}absorbMeetfoutAt(e){const t=this.meetfoutLoopIndex;if(t===null)return!1;const i=this.model.loops[t];if(!i)return!1;const r=Wc(i.vertices,e);return ti(r,!0)?(this.cfg.onReject(),!1):(this.writeVerts(r,t,!0),this.setSelection({kind:"vertex",loopIndex:t,vertexIndex:e},!1,!1),this.cfg.onChange(),!0)}getSelectedSegment(){if(this.selection.kind!=="wall")return null;const e=this.vertsForSelection();return e?Tt(e.vertices,e.closed)[this.selection.wallIndex]??null:null}getSelectedCornerAngle(){if(this.selection.kind!=="vertex")return null;const e=this.vertsForSelection();return e?gi(e.vertices,this.selection.vertexIndex,e.closed):null}getDraftTurnDeg(){const{vertices:e,draftEnd:t}=this.model;return!t||e.length<2?null:Vc(e[e.length-2],e[e.length-1],t)}applyCornerAngle(e){if(this.selection.kind!=="vertex")return!1;const t=this.vertsForSelection();if(!t)return!1;const i=sd(t.vertices,this.selection.vertexIndex,e,t.closed);return i?ti(i,t.closed)?(this.cfg.onReject(),!1):(this.writeVerts(i,this.selection.loopIndex,!0),this.cfg.onChange(),this.emitSelection(!1,!1),!0):!1}snapSelectedCornerCanonical(){if(this.selection.kind!=="vertex")return!1;const e=this.vertsForSelection();if(!e)return!1;const t=od(e.vertices,this.selection.vertexIndex,e.closed);return t?ti(t,e.closed)?(this.cfg.onReject(),!1):(this.writeVerts(t,this.selection.loopIndex,!0),this.cfg.onChange(),this.emitSelection(!1,!1),!0):!1}applyWallLengthM(e){if(this.selection.kind!=="wall"||!(e>0)||!Number.isFinite(e))return!1;const t=this.vertsForSelection();if(!t)return!1;const i=this.cfg.getPxPerMeter(),r=e*i,s=td(t.vertices,this.selection.wallIndex,r,t.closed);return s?ti(s,t.closed)?(this.cfg.onReject(),!1):(this.writeVerts(s,this.selection.loopIndex,!0),this.cfg.onChange(),this.emitSelection(!1,!1),!0):!1}addDoorOnSelectedWall(e,t=Td){if(this.selection.kind!=="wall"||this.selection.loopIndex===null)return!1;const i=this.selection.loopIndex,r=this.model.loops[i];if(!r)return!1;const o=Tt(r.vertices,!0)[this.selection.wallIndex];if(!o)return!1;const a=e?Go(e,o.a,o.b):.5,l=this.cfg.getPxPerMeter();if(!Or(o.a,o.b,a,t,l))return this.cfg.onReject(),!1;const d={id:bd(),wallIndex:this.selection.wallIndex,t:a,widthM:t,hinge:"L",swing:1},f=[...r.doors??[],d];return this.writeLoop(i,{doors:f},!0),this.setSelection({kind:"door",loopIndex:i,doorId:d.id},!1,!1,!0),this.cfg.onChange(),!0}applyDoorWidthM(e){if(this.selection.kind!=="door")return!1;const t=this.selection;if(!(e>.2)||!Number.isFinite(e))return!1;const i=t.loopIndex,r=this.model.loops[i];if(!r)return!1;const s=r.doors.find(d=>d.id===t.doorId);if(!s)return!1;const a=Tt(r.vertices,!0)[s.wallIndex];if(!a)return!1;if(!Or(a.a,a.b,s.t,e,this.cfg.getPxPerMeter()))return this.cfg.onReject(),!1;const c=r.doors.map(d=>d.id===s.id?{...d,widthM:e}:d);return this.writeLoop(i,{doors:c},!0),this.cfg.onChange(),this.emitSelection(!1,!1,!1),!0}removeSelectedDoor(){if(this.selection.kind!=="door")return!1;const e=this.selection,t=e.loopIndex,i=e.doorId,r=this.model.loops[t];return r?(this.writeLoop(t,{doors:r.doors.filter(s=>s.id!==i)},!0),this.setSelection({kind:"none"}),this.cfg.onChange(),!0):!1}setSelectedDoorHinge(e){return this.patchSelectedDoor({hinge:e})}flipSelectedDoorSwing(){const e=this.getSelectedDoor();return e?this.patchSelectedDoor({swing:e.swing===1?-1:1}):!1}setSelectedRoomType(e){const t=this.selectedLoopIndex();return t===null?!1:(this.writeLoop(t,{roomTypeId:e},!0),this.cfg.onChange(),!0)}setSelectedRoomName(e){const t=this.selectedLoopIndex();if(t===null)return!1;const i=(e??"").trim();return this.writeLoop(t,{name:i.length?i:null},!0),this.cfg.onChange(),!0}beginPartitionDraw(e){const t=e??this.selectedLoopIndex();if(t===null)return!1;const i=this.model.loops[t];return!i||i.vertices.length<3?!1:(this.model={...this.model,status:"partition",partitionPath:[],partitionLoopIndex:t,draftEnd:null,vertices:[]},this.setSelection({kind:"none"}),this.cfg.onChange(),!0)}cancelPartitionDraw(){this.model={...this.model,status:"idle",partitionPath:null,partitionLoopIndex:null,draftEnd:null},this.cfg.onChange()}deleteLine(){if(this.model.status==="partition"){const e=this.model.partitionPath??[];return this.pushHistory(),e.length<=1?(this.model={...this.model,status:"idle",partitionPath:null,partitionLoopIndex:null,draftEnd:null},this.cfg.onChange(),!0):(this.model={...this.model,partitionPath:e.slice(0,-1),draftEnd:null},this.cfg.onChange(),!0)}if(this.selection.kind==="door")return this.removeSelectedDoor();if(this.model.vertices.length>0||this.model.status==="drawing"||this.model.status==="open"){this.pushHistory();const e=this.model.vertices.slice(0,-1);return e.length<=1?(this.model={...this.model,status:"idle",vertices:[],draftEnd:null},this.setSelection({kind:"none"})):(this.model={...this.model,status:"open",vertices:e,draftEnd:null},this.setSelection({kind:"wall",loopIndex:null,wallIndex:e.length-2})),this.cfg.onChange(),!0}return this.selection.kind==="wall"&&this.selection.loopIndex!==null?this.deleteSharedWall(this.selection.loopIndex,this.selection.wallIndex):!1}deleteSharedWall(e,t){const i=Ps(this.model.loops,e,t);if(!i)return this.cfg.onReject(),!1;const r=this.model.loops[e],s=this.model.loops[i.partnerLoopIndex];if(!r||!s)return!1;const o=vd(r.vertices,t,s.vertices,i.partnerWallIndex);if(!o)return this.cfg.onReject(),!1;const a=Math.min(e,i.partnerLoopIndex),l=Math.max(e,i.partnerLoopIndex),c={id:Ai(),vertices:o,doors:[],roomTypeId:r.roomTypeId??Jt.defaultTypeId,name:r.name??s.name};this.pushHistory();const d=[...this.model.loops.slice(0,a),c,...this.model.loops.slice(a+1,l),...this.model.loops.slice(l+1)];return this.model={...this.model,loops:d},this.setSelection({kind:"wall",loopIndex:a,wallIndex:0},!0,!1),this.cfg.onChange(),!0}patchSelectedDoor(e){if(this.selection.kind!=="door")return!1;const t=this.selection,i=this.model.loops[t.loopIndex];if(!i||!i.doors.some(s=>s.id===t.doorId))return!1;const r=i.doors.map(s=>s.id===t.doorId?{...s,hinge:s.hinge??"L",swing:s.swing??1,...e}:s);return this.writeLoop(t.loopIndex,{doors:r},!0),this.cfg.onChange(),this.emitSelection(!1,!1,!1),!0}selectedLoopIndex(){return this.selection.kind==="none"?null:this.selection.kind==="door"?this.selection.loopIndex:this.selection.loopIndex}getPartitionCandidates(e){const t=this.model.loops[e];return!t||t.vertices.length<4?[]:cd(t.vertices)}getEqualDivisionPlan(e,t,i="auto"){const r=this.model.loops[e];return r?qc(r.vertices,t,i):null}splitLoopWithPartition(e,t){const i=this.model.loops[e];if(!i)return!1;const r=qa(i.vertices,t.wallA,t.tA,t.wallB,t.tB);if(!r)return this.cfg.onReject(),!1;const s={id:Ai(),vertices:r.loopA,doors:[],roomTypeId:Jt.defaultTypeId,name:null},o={id:Ai(),vertices:r.loopB,doors:[],roomTypeId:Jt.defaultTypeId,name:null},a=[...this.model.loops.slice(0,e),s,o,...this.model.loops.slice(e+1)];return this.pushHistory(),this.model={...this.model,loops:a},this.meetfoutLoopIndex=null,this.setSelection({kind:"wall",loopIndex:e,wallIndex:0},!0,!1),this.cfg.onChange(),!0}splitLoopEqualParts(e,t,i="auto"){const r=this.model.loops[e];if(!r)return!1;const s=dd(r.vertices,t,i);if(!s||s.length!==t)return this.cfg.onReject(),!1;const o=s.map(l=>({id:Ai(),vertices:l,doors:[],roomTypeId:Jt.defaultTypeId,name:null})),a=[...this.model.loops.slice(0,e),...o,...this.model.loops.slice(e+1)];return this.pushHistory(),this.model={...this.model,loops:a},this.meetfoutLoopIndex=null,this.setSelection({kind:"wall",loopIndex:e,wallIndex:0},!0,!1),this.cfg.onChange(),!0}moveDoorToPoint(e,t,i){const r=this.model.loops[e];if(!r)return!1;const s=r.doors.find(x=>x.id===t);if(!s)return!1;const a=Tt(r.vertices,!0)[s.wallIndex];if(!a)return!1;const l=Le(a.a,a.b);if(l<1)return!1;const c=this.cfg.getPxPerMeter(),d=s.widthM*c/2,f=Math.max(0,l-s.widthM*c),u=Math.min(4,f/2),p=Math.min(.5,(d+u)/l);let m=Go(i,a.a,a.b);return m=Math.max(p,Math.min(1-p,m)),this.writeLoop(e,{doors:r.doors.map(x=>x.id===t?{...x,t:m}:x)}),!0}reset(){this.pushHistory(),this.model={loops:[],status:"idle",vertices:[],draftEnd:null,partitionPath:null,partitionLoopIndex:null},this.selection={kind:"none"},this.meetfoutLoopIndex=null,this.active=!1,this.pointerId=null,this.dragDoor=null,this.dragWall=null,this.emitSelection(),this.cfg.onChange()}loadModel(e){this.history=[],this.historyLocked=!0,this.model={loops:e.loops??[],status:e.status??"idle",vertices:e.vertices??[],draftEnd:e.draftEnd??null,partitionPath:e.partitionPath??null,partitionLoopIndex:e.partitionLoopIndex??null},this.selection={kind:"none"},this.meetfoutLoopIndex=this.model.loops.length>0?this.model.loops.length-1:null,this.active=!1,this.pointerId=null,this.dragDoor=null,this.dragWall=null,this.historyLocked=!1,this.emitSelection(),this.cfg.onChange()}undo(){const e=this.history.pop();return e?(this.historyLocked=!0,this.model=e.model,this.selection=e.selection,this.meetfoutLoopIndex=e.meetfoutLoopIndex,this.historyLocked=!1,this.active=!1,this.pointerId=null,this.dragDoor=null,this.dragWall=null,this.emitSelection(),this.cfg.onChange(),!0):(this.cfg.onReject(),!1)}localPoint(e){const t=this.canvas.getBoundingClientRect(),i=e.clientX-t.left,r=e.clientY-t.top,s=this.cfg.getView?.()??{scale:1,ox:0,oy:0};return{x:(i-s.ox)/s.scale,y:(r-s.oy)/s.scale}}worldHitRadius(){const e=this.cfg.getView?.().scale??1;return this.cfg.hitRadius/Math.max(.25,e)}worldCloseRadius(){const e=this.cfg.getView?.().scale??1;return this.cfg.closeRadius/Math.max(.25,e)}hitTestAll(e){const t=this.cfg.getPxPerMeter(),i=this.worldHitRadius();for(let r=this.model.loops.length-1;r>=0;r--){const s=this.model.loops[r],o=s.doors??[],a=ed(e,s.vertices,o,t,i*1.8);if(a)return{kind:"door",loopIndex:r,doorId:a};const l=yl(e,s.vertices,i);if(l!==null)return{kind:"vertex",loopIndex:r,vertexIndex:l};const c=Ml(e,s.vertices,!0,i);if(c!==null)return{kind:"wall",loopIndex:r,wallIndex:c}}if(this.model.vertices.length>=2){const r=yl(e,this.model.vertices,i);if(r!==null&&r>0&&r<this.model.vertices.length-1)return{kind:"vertex",loopIndex:null,vertexIndex:r};const s=Ml(e,this.model.vertices,!1,i);if(s!==null)return{kind:"wall",loopIndex:null,wallIndex:s}}return{kind:"none"}}snapPartitionDraft(e){const t=this.model.partitionLoopIndex,i=this.model.partitionPath;if(t===null||!i?.length)return e;const r=this.model.loops[t];if(!r)return e;const s=i[0],o=i[i.length-1],a=Math.max(18,this.worldHitRadius()*1.8),l=Ii(r.vertices,s,12),c=fn(o,e),d=Math.max(Le(o,e),1);let f;if(i.length>=2){const m=i[i.length-2];f=vl(fn(m,o),c,45)}else f=xl(c,45);const u=ud(o,f,r.vertices,10,2e4);if(u&&Le(u.point,s)>a&&Le(o,e)>=u.dist-a)return{...u.point};const p=Ii(r.vertices,e,a);if(p){const m=Tt(r.vertices,!0),x=Wt(m[p.wallIndex].a,m[p.wallIndex].b,p.t),g=Le(x,s)>a*1.25,h=!l||p.wallIndex!==l.wallIndex||Math.abs(p.t-l.t)>.08;if(g&&h)return x}return Ho(o,f,d)}snapPointToLoopWall(e,t,i){const r=Ii(e,t,i);if(!r)return null;const s=Tt(e,!0);return Wt(s[r.wallIndex].a,s[r.wallIndex].b,r.t)}isPartitionEndOnWall(e,t,i,r){const s=Ii(e,t,r);if(!s)return null;const o=Tt(e,!0),a=Wt(o[s.wallIndex].a,o[s.wallIndex].b,s.t);if(Le(a,i)<Math.max(16,r*.75))return null;const l=Ii(e,i,12);return l&&l.wallIndex===s.wallIndex&&Math.abs(l.t-s.t)<.05?null:a}commitPartitionPath(e,t){const i=this.model.loops[e];if(!i||t.length<2)return!1;const r=this.snapPointToLoopWall(i.vertices,t[0],40),s=this.snapPointToLoopWall(i.vertices,t[t.length-1],40);if(!r||!s)return!1;const o=[r,...t.slice(1,-1),s],a=fd(i.vertices,o);if(!a||a.loopA.length<3||a.loopB.length<3)return!1;this.pushHistory();const l={id:Ai(),vertices:a.loopA,doors:[],roomTypeId:i.roomTypeId??Jt.defaultTypeId,name:null},c={id:Ai(),vertices:a.loopB,doors:[],roomTypeId:Jt.defaultTypeId,name:null},d=[...this.model.loops.slice(0,e),l,c,...this.model.loops.slice(e+1)];return this.model={...this.model,loops:d,status:"idle",partitionPath:null,partitionLoopIndex:null,draftEnd:null},this.setSelection({kind:"wall",loopIndex:e,wallIndex:0},!0,!1),this.cfg.onChange(),!0}moveDraggedWall(e){if(!this.dragWall)return;const{loopIndex:t,wallIndex:i,partner:r,last:s}=this.dragWall,o=this.model.loops[t];if(!o)return;const l=Tt(o.vertices,!0)[i];if(!l)return;const c=e.x-s.x,d=e.y-s.y,{dx:f,dy:u}=xd(c,d,l.a,l.b);if(Math.hypot(f,u)<.2)return;const p=bl(o.vertices,i,f,u);if(!p){this.cfg.onReject();return}let m=this.model.loops.map((x,g)=>g===t?{...x,vertices:p}:x);if(r){const x=m[r.partnerLoopIndex];if(x){const g=bl(x.vertices,r.partnerWallIndex,f,u),h=gd(p,i,g??x.vertices,r.partnerWallIndex);if(!h){this.cfg.onReject();return}m=m.map((E,w)=>w===r.partnerLoopIndex?{...E,vertices:h}:E)}}this.model={...this.model,loops:m},this.dragWall={...this.dragWall,last:e},this.cfg.onChange()}finishCancelDraft(){const{vertices:e}=this.model;e.length<=1?(this.model={...this.model,status:"idle",vertices:[],draftEnd:null},this.setSelection({kind:"none"})):this.model={...this.model,status:"open",draftEnd:null},this.cfg.onChange()}handlePartitionClick(e){const t=this.model.partitionLoopIndex;if(t===null)return;const i=this.model.loops[t];if(!i)return;const r=[...this.model.partitionPath??[]],s=Math.max(22,this.worldHitRadius()*2);if(r.length===0){const d=this.snapPointToLoopWall(i.vertices,e,s);if(!d){this.cfg.onReject();return}this.model={...this.model,partitionPath:[d],draftEnd:null},this.cfg.onChange();return}const o=r[0],a=this.snapPartitionDraft(e),l=this.isPartitionEndOnWall(i.vertices,a,o,s+6)??this.isPartitionEndOnWall(i.vertices,e,o,s);if(l){const d=[...r,l];this.commitPartitionPath(t,d)||this.cfg.onReject();return}if(!(Wo(a,i.vertices)||Wo(e,i.vertices))){this.cfg.onReject();return}if(Le(a,o)<12){this.cfg.onReject();return}r.push({...a}),this.model={...this.model,partitionPath:r,draftEnd:null},this.cfg.onChange()}snapDraft(e){const{vertices:t}=this.model,i=t[t.length-1];if(t.length>=3&&xs(e,t[0],this.worldCloseRadius()))return{...t[0]};const r=Le(i,e);if(r<1)return{...e};const s=fn(i,e);let o;if(t.length===1)o=xl(s,45);else{const a=t[t.length-2],l=t[t.length-1];o=vl(fn(a,l),s,45)}return Ho(i,o,r)}}const Tl=[{id:"switchgear",labelNl:"Schakelmateriaal"},{id:"supply",labelNl:"Voedingen"},{id:"cables",labelNl:"Leidingen"},{id:"standard",labelNl:"Standaard"}],$c=[{id:"el-socket-pe",category:"electric",group:"switchgear",labelNl:"Enkele WCD randaarde",code:"WCD",color:"#e8eef7",symbol:"socket-pe"},{id:"el-socket-2",category:"electric",group:"switchgear",labelNl:"Dubbele WCD randaarde",code:"WCD2",color:"#e8eef7",symbol:"socket-double"},{id:"el-centraal",category:"electric",group:"standard",labelNl:"Centraaldoos",code:"CD",color:"#e8eef7",symbol:"centraal"},{id:"el-light",category:"electric",group:"standard",labelNl:"Lamp / lichtpunt",code:"LP",color:"#e8eef7",symbol:"light"},{id:"el-switch-w",category:"electric",group:"switchgear",labelNl:"Wisselschakelaar",code:"SW",color:"#e8eef7",symbol:"switch-wissel"},{id:"el-switch",category:"electric",group:"switchgear",labelNl:"Schakelaar (1-polig)",code:"S",color:"#e8eef7",symbol:"switch-1p"},{id:"el-switch-2",category:"electric",group:"switchgear",labelNl:"Tweepolige schakelaar",code:"S2",color:"#e8eef7",symbol:"switch-2p"},{id:"el-switch-x",category:"electric",group:"switchgear",labelNl:"Kruisschakelaar",code:"SX",color:"#e8eef7",symbol:"switch-kruis"},{id:"el-switch-ser",category:"electric",group:"switchgear",labelNl:"Serieschakelaar",code:"SS",color:"#e8eef7",symbol:"switch-serie"},{id:"el-dimmer",category:"electric",group:"switchgear",labelNl:"Dimmer",code:"DIM",color:"#e8eef7",symbol:"dimmer"},{id:"el-push",category:"electric",group:"switchgear",labelNl:"Drukknop",code:"DK",color:"#e8eef7",symbol:"pushbutton"},{id:"el-combo",category:"electric",group:"switchgear",labelNl:"Schakelaar + WCD",code:"S+W",color:"#e8eef7",symbol:"combo-sw-socket"},{id:"el-socket",category:"electric",group:"switchgear",labelNl:"WCD zonder aarding",code:"WCD0",color:"#e8eef7",symbol:"socket"},{id:"el-socket-4",category:"electric",group:"switchgear",labelNl:"Viervoudige WCD randaarde",code:"WCD4",color:"#e8eef7",symbol:"socket-quad"},{id:"el-mk",category:"electric",group:"supply",labelNl:"Meterkast",code:"MK",color:"#ffd166",symbol:"meterkast"},{id:"el-centraal-light",category:"electric",group:"supply",labelNl:"Centraaldoos met lichtpunt",code:"CD+L",color:"#e8eef7",symbol:"centraal-light"},{id:"el-cable-empty",category:"electric",group:"cables",labelNl:"Loze leiding",code:"LL",color:"#8ab4f8",symbol:"cable-empty",place:"run"},{id:"el-cable-wired",category:"electric",group:"cables",labelNl:"Bedrade leiding",code:"BL",color:"#6cb6ff",symbol:"cable-wired",place:"run"},{id:"el-cable-earth",category:"electric",group:"cables",labelNl:"Leiding met aarding",code:"LA",color:"#3dd68c",symbol:"cable-earth",place:"run"},{id:"el-floor-pass",category:"electric",group:"cables",labelNl:"Doorvoer verdieping",code:"DV",color:"#ffd166",symbol:"floor-pass",place:"point"},{id:"el-light-sig",category:"electric",group:"standard",labelNl:"Lichtpunt signalering",code:"LS",color:"#e8eef7",symbol:"light-signal"},{id:"el-tl",category:"electric",group:"standard",labelNl:"TL-verlichting",code:"TL",color:"#e8eef7",symbol:"light-tl"},{id:"el-junction",category:"electric",group:"standard",labelNl:"Lasdoos",code:"LD",color:"#e8eef7",symbol:"junction"}],Yc=["el-socket-pe","el-socket-2","el-centraal","el-light","el-switch-w","el-switch"];function ni(n){return $c.find(e=>e.id===n)}function Mr(n){return n?ni(n)?.place==="run":!1}function wd(){return Yc.map(n=>ni(n)).filter(n=>!!n)}function Cd(n){const e=new Set(Yc);return $c.filter(t=>t.category==="electric"&&t.group===n&&!e.has(t.id))}let Rd=1;function Pd(){return`I${Rd++}`}let Ld=1;function Id(){return`R${Ld++}`}const Dd=14,Nd=10,Ud=[["A",-.22159,0,.27841,270,90],["L",-.22159,0,.05682,0],["L",-.22159,0,.5,12e-5],["C",.11023,12e-5,.0534]],Fd=[["C",-.3806,0,.1194],["L",-.26119,-13e-5,.5,0]],Od=[["A",-.22159,0,.27841,270,90],["L",-.22159,0,.05682,0],["L",-.22159,0,.5,12e-5],["C",.11127,12e-5,.0534]],Bd=[["C",-.38059,0,.11941],["L",-.26124,-.00363,.5,-.00351]],kd=[["C",-.3806,-.1194,.1194],["L",-.26119,-.11953,.5,-.1194],["C",-.3806,.1194,.1194],["L",-.26119,.11928,.5,.1194]],zd=[["L",-.27013,-13e-5,.5,0],["C",-.37919,0,.12081]],Hd=[["C",-.3806,.15097,.1194],["C",-.3806,-.15097,.1194],["L",-.26119,.15084,.5,.15097],["L",-.26119,-.15109,.5,-.15097]],Gd=[["L",-.27013,-13e-5,.5,0],["C",-.37919,0,.12081]],Vd=[["L",0,.5,0,-.5],["C",0,0,.38333],["L",-.5,0,.5,0],["L",0,.5,-.5,0],["L",-.5,0,0,-.5],["L",0,-.5,.5,0],["L",.5,0,0,.5]],Wd=[["A",0,0,.5,3.199,176.801],["P",!1,[[.49922,.0279],[-.49922,.0279]]]],Xd=[["C",0,0,.5]],qd=[["L",.00115,.5,-.00115,-.5]],$d=[["L",.5,-.34165,.5,.34165],["L",-.5,-.34165,.5,-.34165],["L",-.5,-.34165,.5,-.34165],["L",.5,.34165,-.5,.34165],["L",.5,.34165,-.5,.34165]],Yd=[["L",.5,0,.5,.21284],["L",.5,.21284,.02082,0],["L",.5,0,.5,-.21284],["L",-.5,0,.5,0],["L",.5,-.21284,.02082,0]],Kd=[["L",.31461,.5,-.31461,.5],["L",-.31461,-.5,.31461,-.5],["L",.31461,-.5,.31461,.5],["L",-.31461,.5,-.31461,-.5],["L",-.31461,.5,.31461,-.5],["L",.31461,.5,-.31461,-.5],["L",-.31461,.5,.31461,-.5],["L",.31461,.5,-.31461,-.5]],Zd=[["L",-.5,.04052,.5,-.25125],["L",.5,.25125,-.5,.04052],["L",.5,.25125,.5,-.25125],["L",-.5,.04052,.5,-.25125],["L",.5,.25125,-.5,.04052],["L",.5,.25125,.5,-.25125]],Jd={socket_switched_single:Ud,socket_switched_double:Fd,socket_switched_double_alt:Od,switch_1g:Bd,switch_2g:kd,switch_2way:zd,switch_2way_2g:Hd,switch_3way:Gd,light_pendant:Vd,light_wall:Wd,light_down:Xd,light_tl:qd,cu:$d,push:Yd,thermo:Kd,data:Zd},Qd=Jd;function jd(n,e,t){const i=Qd[e];if(!i)return;const r=t;for(const s of i){const o=s[0];if(o==="L"){const[,a,l,c,d]=s;n.beginPath(),n.moveTo(a*r,-l*r),n.lineTo(c*r,-d*r),n.stroke()}else if(o==="C"){const[,a,l,c]=s;n.beginPath(),n.arc(a*r,-l*r,c*r,0,Math.PI*2),n.stroke()}else if(o==="A"){const[,a,l,c,d,f]=s;n.beginPath();const u=-d*Math.PI/180,p=-f*Math.PI/180;n.arc(a*r,-l*r,c*r,u,p,!0),n.stroke()}else if(o==="P"){const[,a,l]=s;if(!l.length)continue;n.beginPath(),n.moveTo(l[0][0]*r,-l[0][1]*r);for(let c=1;c<l.length;c++)n.lineTo(l[c][0]*r,-l[c][1]*r);a&&n.closePath(),n.stroke()}}}const ef={"switch-1p":"switch_1g","switch-2p":"switch_2g","switch-wissel":"switch_2way",pushbutton:"push",light:"light_pendant","light-tl":"light_tl",meterkast:"cu"};function Kc(n,e,t,i,r,s){const o=r,a=s?.selected??!1,l=Math.max(.05,s?.viewScale??1),c=1.25/l,d=(s?.rotDeg??0)*Math.PI/180,f=8/l;n.save(),n.translate(t,i),d&&n.rotate(d),n.lineCap="round",n.lineJoin="round",n.lineWidth=c,n.strokeStyle=a?"#ffd166":"#e8eef7",n.fillStyle=a?"#ffd166":"#e8eef7",n.font=`600 ${f}px system-ui, sans-serif`;const u=ef[e];if(u)jd(n,u,o*.95);else switch(e){case"switch-kruis":tf(n,o);break;case"switch-serie":nf(n,o);break;case"dimmer":rf(n,o);break;case"socket":Sr(n,o,1,!1);break;case"socket-pe":Sr(n,o,1,!0);break;case"socket-double":Sr(n,o,2,!0);break;case"socket-quad":Sr(n,o,4,!0);break;case"combo-sw-socket":sf(n,o);break;case"light-signal":of(n,o);break;case"junction":af(n,o);break;case"centraal":Al(n,o,!1);break;case"centraal-light":Al(n,o,!0);break;case"cable-empty":to(n,o,"empty");break;case"cable-wired":to(n,o,"wired");break;case"cable-earth":to(n,o,"earth");break;case"floor-pass":lf(n,o);break;default:Sr(n,o,1,!0)}if(a){const p=o*.52,m=o*.16;n.lineWidth=c*.85,n.strokeStyle="#ffd166",n.beginPath(),n.moveTo(-p,-p+m),n.lineTo(-p,-p),n.lineTo(-p+m,-p),n.moveTo(p-m,-p),n.lineTo(p,-p),n.lineTo(p,-p+m),n.moveTo(p,p-m),n.lineTo(p,p),n.lineTo(p-m,p),n.moveTo(-p+m,p),n.lineTo(-p,p),n.lineTo(-p,p-m),n.stroke()}n.restore()}function tf(n,e){const t=e*.32;n.beginPath(),n.moveTo(-t,-t),n.lineTo(t,t),n.moveTo(t,-t),n.lineTo(-t,t),n.stroke();for(const[i,r]of[[-t,-t],[t,t],[t,-t],[-t,t]])n.beginPath(),n.arc(i,r,e*.07,0,Math.PI*2),n.stroke()}function nf(n,e){const t=e*.16;n.beginPath(),n.arc(0,t*.9,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(-t*1.6,-t*1.2),n.lineTo(0,t*.2),n.lineTo(t*1.6,-t*1.2),n.stroke()}function rf(n,e){const t=e*.18;n.beginPath(),n.arc(0,t*.35,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(t*.55,t*.05),n.lineTo(t*1.9,-t*1.55),n.stroke(),n.beginPath(),n.moveTo(t*1.55,-t*1.2),n.lineTo(t*2.05,-t*1.75),n.lineTo(t*1.45,-t*1.65),n.closePath(),n.stroke()}function Sr(n,e,t,i){const r=e*.34,s=e*.36,o=r*.22,a=t*r+Math.max(0,t-1)*o,c=-(s+a)/2,d=c+s;if(n.beginPath(),n.moveTo(0,c),n.lineTo(0,d),n.stroke(),i){const f=r*1.05;n.beginPath(),n.moveTo(-f,d),n.lineTo(f,d),n.stroke()}for(let f=0;f<t;f++){const p=d+f*(r+o)+r;n.beginPath(),n.arc(0,p,r,Math.PI,0,!1),n.stroke()}}function sf(n,e){const t=e*.14;n.beginPath(),n.arc(0,-t*2.2,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(t*.4,-t*2.5),n.lineTo(t*1.6,-t*3.4),n.stroke();const i=t*.1,r=t*1.35;n.beginPath(),n.moveTo(0,-t*1.1),n.lineTo(0,i),n.stroke(),n.beginPath(),n.moveTo(-t*1.5,i),n.lineTo(t*1.5,i),n.stroke(),n.beginPath(),n.arc(0,i+r,r,Math.PI,0,!1),n.stroke()}function of(n,e,t){const i=e*.28;n.beginPath(),n.moveTo(-i*1.3,0),n.lineTo(-i*.15,0),n.stroke(),n.beginPath(),n.arc(i*.35,0,i*.7,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(-i*.05,-i*.55),n.lineTo(i*.75,i*.55),n.moveTo(i*.75,-i*.55),n.lineTo(-i*.05,i*.55),n.stroke()}function af(n,e){n.beginPath(),n.arc(0,0,e*.28,0,Math.PI*2),n.stroke()}function Al(n,e,t){const i=e*.28;if(n.strokeRect(-i,-i,i*2,i*2),t){const r=i*.55;n.beginPath(),n.moveTo(-r,-r),n.lineTo(r,r),n.moveTo(r,-r),n.lineTo(-r,r),n.stroke()}}function to(n,e,t){const i=e*.55;if(n.beginPath(),n.moveTo(-i,0),n.lineTo(i,0),n.stroke(),n.beginPath(),n.arc(i,0,e*.08,0,Math.PI*2),n.stroke(),t==="empty")n.setLineDash([e*.08,e*.08]),n.beginPath(),n.moveTo(-i*.6,0),n.lineTo(i*.6,0),n.stroke(),n.setLineDash([]);else if(t==="wired")for(const r of[-.25,0,.25]){const s=r*i;n.beginPath(),n.moveTo(s,-e*.14),n.lineTo(s,e*.14),n.stroke()}else n.beginPath(),n.moveTo(0,-e*.18),n.lineTo(0,e*.12),n.moveTo(-e*.16,e*.12),n.lineTo(e*.16,e*.12),n.moveTo(-e*.1,e*.2),n.lineTo(e*.1,e*.2),n.stroke()}function lf(n,e){const t=e*.28;n.beginPath(),n.arc(0,0,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(0,-t*1.15),n.lineTo(0,t*1.15),n.stroke(),n.beginPath(),n.moveTo(-t*.35,-t*.55),n.lineTo(0,-t*1.05),n.lineTo(t*.35,-t*.55),n.stroke(),n.beginPath(),n.moveTo(-t*.35,t*.55),n.lineTo(0,t*1.05),n.lineTo(t*.35,t*.55),n.stroke()}let Fr=1;function Ce(n){return n/Math.max(.25,Fr)}const Ge={bg:"#0f1419",grid:"#1c2430",gridMajor:"#243040",wall:"#e8eef7",selected:"#ffd166",draft:"#6cb6ff",draftBad:"#ff6b6b",vertex:"#6cb6ff",first:"#3dd68c",vertexSel:"#ffd166",labelBg:"rgba(15, 20, 25, 0.75)",labelSelected:"#1a1408",labelSelectedBg:"rgba(255, 209, 102, 0.95)",interior:"#3dd68c",angleBad:"#ff4d4d",angleBadBg:"rgba(90, 20, 20, 0.92)",angleBadFill:"rgba(255, 77, 77, 0.22)",angleBadStroke:"#ff4d4d",popupHi:"rgba(255, 209, 102, 0.28)",door:"#6cb6ff",doorSel:"#ffd166",doorSwing:"rgba(108, 182, 255, 0.35)",partition:"#c792ea",partitionHover:"#ffd166"};function cf(n,e,t){const i=Math.min(window.devicePixelRatio||1,2);n.width=Math.max(1,Math.floor(e*i)),n.height=Math.max(1,Math.floor(t*i)),n.style.width=`${e}px`,n.style.height=`${t}px`;const r=n.getContext("2d");return r&&r.setTransform(i,0,0,i,0,0),{dpr:i}}function uf(n,e,t,i,r){const s=r.view??{scale:1,ox:0,oy:0};Fr=s.scale,n.clearRect(0,0,e,t),n.fillStyle=Ge.bg,n.fillRect(0,0,e,t),n.save(),n.translate(s.ox,s.oy),n.scale(s.scale,s.scale);const o=-s.ox/s.scale,a=-s.oy/s.scale,l=(e-s.ox)/s.scale,c=(t-s.oy)/s.scale;gf(n,o,a,l,c,r.pxPerMeter);const d=i.loops??[],f=i.vertices??[],u=i.draftEnd,p=["rgba(61, 214, 140, 0.16)","rgba(108, 182, 255, 0.14)","rgba(255, 209, 102, 0.12)","rgba(200, 150, 255, 0.12)"];for(let h=0;h<d.length;h++){const E=d[h].vertices,w=d[h].doors??[];ff(n,E,r,h,p[h%p.length],w)}if(_f(n,i,r.pxPerMeter),r.ghostVertices&&r.ghostVertices.length>=2){const h=Tt(r.ghostVertices,!0);for(const E of h)Bn(n,E.a,E.b,"rgba(255, 176, 32, 0.45)",2,!0)}const m=Va(f),x=Tt(f,!1);for(let h=0;h<x.length;h++){const E=x[h],w=r.selectedLoopIndex===null&&r.selectedWallIndex===h;Bn(n,E.a,E.b,w?Ge.selected:Ge.wall,w?4.5:3),$o(n,E.a,E.b,r.pxPerMeter,!1,w)}if(f.length>=3)for(let h=1;h<f.length-1;h++){const E=Gs(f,h,!1);if(!E)continue;const w=r.selectedLoopIndex===null&&(r.selectedVertexIndex===h||r.popupCornerIndex===h);Pr(n,f[h-1],f[h],f[h+1],m,E.interiorDeg,w)}if(u&&f.length>0){const h=f[f.length-1],E=r.hitRadius/Math.max(.25,s.scale),w=f.length>=3&&xs(u,f[0],E*1.5),y=r.rejectFlash?Ge.draftBad:w?Ge.first:Ge.draft;if(Bn(n,h,u,y,2,!0),Le(h,u)>4&&$o(n,h,u,r.pxPerMeter,!0),f.length>=2&&Le(h,u)>8)if(w){const T=f[f.length-2],C=Nr(T,h,f[0],m);if(Pr(n,T,h,f[0],m,C.interiorDeg,!0),f.length>=2){const L=Nr(h,f[0],f[1],m);Pr(n,h,f[0],f[1],m,L.interiorDeg,!0)}}else{const T=f[f.length-2],C=Nr(T,h,u,m);Pr(n,T,h,u,m,C.interiorDeg,!0);const L=Vc(T,h,u),v=zo(h,u);qo(n,v.x,v.y-18,`Δ ${Rs(L,0)}`)}w&&(n.beginPath(),n.arc(f[0].x,f[0].y,E,0,Math.PI*2),n.strokeStyle=Ge.first,n.lineWidth=Ce(2),n.stroke())}for(let h=0;h<f.length;h++){const E=f[h],w=h===0,y=h===f.length-1,T=r.selectedLoopIndex===null&&(r.selectedVertexIndex===h||r.popupCornerIndex===h),C=T?Ge.vertexSel:w?Ge.first:Ge.vertex;Ms(n,E,C,T?5:w||y?4:2.5)}const g=r.partitionOptions??[];for(let h=0;h<g.length;h++){const E=g[h],w=r.partitionHoverIndex===h;Bn(n,E.a,E.b,w?"#ffd166":"rgba(200, 150, 255, 0.75)",w?4:2.5,!0);const y=zo(E.a,E.b);qo(n,y.x,y.y,E.label),w&&(Ms(n,E.a,Ge.doorSel,5),Ms(n,E.b,Ge.doorSel,5))}if(r.partitionPath&&r.partitionPath.length){const h=r.partitionPath;for(let E=0;E<h.length-1;E++)Bn(n,h[E],h[E+1],Ge.partitionHover,3);for(const E of h)n.beginPath(),n.arc(E.x,E.y,Ce(5),0,Math.PI*2),n.fillStyle=Ge.partitionHover,n.fill();i.draftEnd&&h.length&&Bn(n,h[h.length-1],i.draftEnd,Ge.partition,2,!0)}if(r.roomBadges)for(const h of r.roomBadges){const E=i.loops[h.loopIndex];if(!E?.vertices.length)continue;let w=0,y=0;for(const T of E.vertices)w+=T.x,y+=T.y;w/=E.vertices.length,y/=E.vertices.length,mf(n,w,y,h.label,h.areaText,h.ok,h.warn)}if(r.installations?.length){const h=22/Math.max(.05,Fr);for(const E of r.installations){const y=ni(E.defId)?.symbol??"socket";Kc(n,y,E.x,E.y,h,{selected:!!E.selected,viewScale:Fr,rotDeg:E.rot??0})}}df(n,r),n.restore()}function df(n,e){const t=e.pxPerMeter>0?e.pxPerMeter:50,i=Ce(1.6),r=(s,o,a,l)=>{if(s.length<1)return;const c=ni(o),d=a?Ge.selected:c?.color??"#6cb6ff";if(n.strokeStyle=d,n.fillStyle=d,n.lineWidth=i,n.lineCap="round",n.lineJoin="round",c?.symbol==="cable-empty"||l?n.setLineDash([Ce(5),Ce(4)]):n.setLineDash([]),s.length>=2){n.beginPath(),n.moveTo(s[0].x,s[0].y);for(let u=1;u<s.length;u++)n.lineTo(s[u].x,s[u].y);n.stroke()}n.setLineDash([]);const f=Ce(2.4);for(const u of s)n.beginPath(),n.arc(u.x,u.y,f,0,Math.PI*2),n.fill();if(s.length>=2&&!l){n.font=`600 ${Ce(10)}px system-ui, sans-serif`,n.textAlign="center",n.textBaseline="bottom";for(let u=1;u<s.length;u++){const p=s[u-1],m=s[u],x=Math.hypot(m.x-p.x,m.y-p.y)/t;if(x<.05)continue;const g=(p.x+m.x)/2,h=(p.y+m.y)/2,E=x>=10?`${Math.round(x)} m`:`${(Math.round(x*10)/10).toFixed(1).replace(".",",")} m`;n.fillStyle=a?Ge.selected:"#9ec5ff",n.fillText(E,g,h-Ce(3))}}};if(e.runs?.length)for(const s of e.runs)r(s.points,s.defId,!!s.selected,!1);if(e.runDraft&&e.runDraft.points.length){const s=[...e.runDraft.points];e.runDraft.cursor&&s.push(e.runDraft.cursor),r(s,e.runDraft.defId,!0,!0)}}function ff(n,e,t,i,r,s=[]){if(e.length<3)return;const o=Ga(e);n.beginPath(),n.moveTo(e[0].x,e[0].y);for(let l=1;l<e.length;l++)n.lineTo(e[l].x,e[l].y);n.closePath(),n.fillStyle=r,n.fill();const a=Tt(e,!0);for(let l=0;l<a.length;l++){const c=a[l],d=t.selectedLoopIndex===i&&t.selectedWallIndex===l,f=s.filter(p=>p.wallIndex===l),u=ju(c.a,c.b,f,t.pxPerMeter);for(const p of u)Bn(n,p.a,p.b,d?Ge.selected:Ge.wall,d?4.5:3);$o(n,c.a,c.b,t.pxPerMeter,!1,d,o);for(const p of f){const m=Or(c.a,c.b,p.t,p.widthM,t.pxPerMeter);if(!m)continue;const x=t.selectedDoorId===p.id,g=p.hinge??"L",h=p.swing??1;hf(n,m,x,g,h)}}for(let l=0;l<e.length;l++){const c=Gs(e,l,!0);if(!c)continue;const d=t.selectedLoopIndex===i&&(t.selectedVertexIndex===l||t.popupCornerIndex===l),f=e[(l-1+e.length)%e.length],u=e[(l+1)%e.length];Pr(n,f,e[l],u,o,c.interiorDeg,d)}for(let l=0;l<e.length;l++){const c=t.selectedLoopIndex===i&&(t.selectedVertexIndex===l||t.popupCornerIndex===l),d=c?Ge.vertexSel:l===0?Ge.first:Ge.vertex;Ms(n,e[l],d,c?5:2.5)}}function hf(n,e,t,i,r){const s=t?Ge.doorSel:Ge.door,o=Math.cos(e.dir+Math.PI/2),a=Math.sin(e.dir+Math.PI/2),l=6;for(const w of[e.openA,e.openB])Bn(n,{x:w.x-o*l,y:w.y-a*l},{x:w.x+o*l,y:w.y+a*l},s,t?3:2);Bn(n,e.openA,e.openB,s,1.5,!0);const c=i==="L"?e.openA:e.openB,d=i==="L"?e.openB:e.openA,f=Le(e.openA,e.openB),u=fn(c,d),p=u+r*(Math.PI/2),m=u,x=p,g=r>0;n.beginPath(),g?n.arc(c.x,c.y,f,m,x,!1):n.arc(c.x,c.y,f,m,x,!0),n.strokeStyle=t?Ge.doorSel:Ge.doorSwing,n.lineWidth=Ce(t?2:1.5),n.setLineDash([Ce(4),Ce(3)]),n.stroke(),n.setLineDash([]);const h={x:c.x+Math.cos(p)*f,y:c.y+Math.sin(p)*f};Bn(n,c,h,s,t?2.5:1.8),n.beginPath(),n.arc(c.x,c.y,Ce(3.5),0,Math.PI*2),n.fillStyle=s,n.fill();const E=t?`deur ${i==="L"?"L":"R"}${r>0?"↺":"↻"}`:"deur";qo(n,e.center.x,e.center.y-Ce(12),E)}function Pr(n,e,t,i,r,s,o){const a=!or(s),l=o?16:a?12:8,c=ad(e,t,i,r);if(n.beginPath(),n.moveTo(t.x,t.y),n.arc(t.x,t.y,l,c.startRad,c.endRad,c.sweepRad<0),n.closePath(),n.fillStyle=a?Ge.angleBadFill:o?Ge.popupHi:"rgba(61, 214, 140, 0.10)",n.fill(),(a||o)&&(n.strokeStyle=a?Ge.angleBadStroke:Ge.interior,n.lineWidth=Ce(a?1.5:1),n.stroke()),a||o){const d={x:t.x+Math.cos(c.midRad)*(l+8),y:t.y+Math.sin(c.midRad)*(l+8)};pf(n,d.x,d.y,Rs(s,a||o?1:0),!0,a)}}function pf(n,e,t,i,r,s){n.font=s?`700 ${Ce(11)}px system-ui, sans-serif`:`600 ${Ce(10)}px system-ui, sans-serif`;const o=n.measureText(i).width,a=Ce(4);n.fillStyle=s?Ge.angleBadBg:Ge.labelBg,n.fillRect(e-o/2-a,t-Ce(8),o+a*2,Ce(16)),n.fillStyle=s?Ge.angleBad:Ge.interior,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e,t)}function qo(n,e,t,i,r){n.font=`600 ${Ce(9)}px system-ui, sans-serif`;const s=n.measureText(i).width,o=Ce(3),a=Ce(13);n.fillStyle="rgba(15,20,25,0.85)",n.fillRect(e-s/2-o,t-a/2,s+o*2,a),n.fillStyle=Ge.draft,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e,t)}function mf(n,e,t,i,r,s,o){const a=`500 ${Ce(8)}px system-ui, sans-serif`,l=`600 ${Ce(10)}px system-ui, sans-serif`;n.font=a;const c=n.measureText(i).width;n.font=l;const d=n.measureText(r).width,f=`500 ${Ce(8)}px system-ui, sans-serif`;let u=0;o&&(n.font=f,u=n.measureText(o).width);const p=Math.max(c,d,u),m=Ce(6),x=Ce(4),g=Ce(11),h=o?3:2,E=p+m*2,w=g*h+x*2,y=e-E/2,T=t-w/2;n.fillStyle=s?"rgba(15, 20, 25, 0.82)":"rgba(40, 16, 16, 0.88)",n.strokeStyle=s?"rgba(61, 214, 140, 0.4)":"rgba(255, 107, 107, 0.55)",n.lineWidth=Ce(1);const C=Ce(4);n.beginPath(),n.moveTo(y+C,T),n.arcTo(y+E,T,y+E,T+w,C),n.arcTo(y+E,T+w,y,T+w,C),n.arcTo(y,T+w,y,T,C),n.arcTo(y,T,y+E,T,C),n.closePath(),n.fill(),n.stroke(),n.textAlign="center",n.textBaseline="middle";let L=T+x+g/2;n.font=a,n.fillStyle="#a8b4c4",n.fillText(i,e,L),L+=g,n.font=l,n.fillStyle=s?Ge.first:"#ff8a8a",n.fillText(r,e,L),o&&(L+=g,n.font=f,n.fillStyle="#ffb020",n.fillText(o,e,L))}function gf(n,e,t,i,r,s){const o=Jt.tileSizeM,a=Jt.majorGridM,l=s*o,c=s*a;if(l<2){const u=Math.floor(e/c)*c,p=Math.floor(t/c)*c;n.lineWidth=Ce(1),n.strokeStyle=Ge.gridMajor;for(let m=u;m<=i;m+=c)n.beginPath(),n.moveTo(m,t),n.lineTo(m,r),n.stroke();for(let m=p;m<=r;m+=c)n.beginPath(),n.moveTo(e,m),n.lineTo(i,m),n.stroke();return}const d=Math.floor(e/l)*l,f=Math.floor(t/l)*l;n.lineWidth=Ce(1);for(let u=d;u<=i;u+=l){const p=Math.abs(Math.round(u/c)*c-u)<l*.25;n.strokeStyle=p?Ge.gridMajor:Ge.grid,n.lineWidth=Ce(p?1.25:.75),n.beginPath(),n.moveTo(u,t),n.lineTo(u,r),n.stroke()}for(let u=f;u<=r;u+=l){const p=Math.abs(Math.round(u/c)*c-u)<l*.25;n.strokeStyle=p?Ge.gridMajor:Ge.grid,n.lineWidth=Ce(p?1.25:.75),n.beginPath(),n.moveTo(e,u),n.lineTo(i,u),n.stroke()}}function Bn(n,e,t,i,r,s=!1){n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(t.x,t.y),n.strokeStyle=i,n.lineWidth=Ce(r),n.lineCap="round",n.setLineDash(s?[Ce(8),Ce(6)]:[]),n.stroke(),n.setLineDash([])}function Ms(n,e,t,i){n.beginPath(),n.arc(e.x,e.y,Ce(i),0,Math.PI*2),n.fillStyle=t,n.fill(),n.strokeStyle=Ge.bg,n.lineWidth=Ce(1.5),n.stroke()}function $o(n,e,t,i,r=!1,s=!1,o=null){const a=zc(e,t,i);if(a<.04&&!r)return;const l=Le(e,t);if(!r&&!s&&l*Fr<22)return;const c=Ha(a),d=r||s?10:9;n.font=`${s||r?600:500} ${Ce(d)}px system-ui, sans-serif`;const f=n.measureText(c).width;if(!r&&!s&&f>l*.92)return;const u=fn(e,t),p=o===null||o>=0?1:-1,m=Ce(r||s?12:10)*p,x=Math.sin(u)*m,g=-Math.cos(u)*m,h={x:e.x+x,y:e.y+g},E={x:t.x+x,y:t.y+g},w=Ce(4)*p,y=Math.sin(u)*w,T=-Math.cos(u)*w;n.strokeStyle=s?"rgba(255, 209, 102, 0.75)":r?"rgba(108, 182, 255, 0.7)":"rgba(139, 156, 179, 0.55)",n.lineWidth=Ce(1),n.setLineDash([]),n.beginPath(),n.moveTo(e.x+y*.2,e.y+T*.2),n.lineTo(h.x+y,h.y+T),n.moveTo(t.x+y*.2,t.y+T*.2),n.lineTo(E.x+y,E.y+T),n.moveTo(h.x,h.y),n.lineTo(E.x,E.y),n.stroke();const C=zo(h,E),L=Ce(7)*p,v=C.x+Math.sin(u)*L,R=C.y-Math.cos(u)*L,O=Ce(2.5),N=Ce(d+4);n.fillStyle=s?Ge.labelSelectedBg:"rgba(15, 20, 25, 0.82)",n.fillRect(v-f/2-O,R-N/2,f+O*2,N),n.fillStyle=r?Ge.draft:s?Ge.labelSelected:"#a8b4c4",n.textAlign="center",n.textBaseline="middle",n.fillText(c,v,R)}function _f(n,e,t){const i=xf(e);if(i.length<1)return;let r=1/0,s=1/0,o=-1/0,a=-1/0;for(const f of i)r=Math.min(r,f.a.x,f.b.x),s=Math.min(s,f.a.y,f.b.y),o=Math.max(o,f.a.x,f.b.x),a=Math.max(a,f.a.y,f.b.y);for(const f of e.vertices??[])r=Math.min(r,f.x),s=Math.min(s,f.y),o=Math.max(o,f.x),a=Math.max(a,f.y);if(!(o>r+2)||!(a>s+2))return;const l=Ce(32),c="rgba(108, 182, 255, 0.8)",d="#9ad4ff";vf(n,r,o,a+l,t,c,d,"totaal"),Mf(n,s,a,r-l,t,c,d,"totaal")}function xf(n){const e=[],t=n.loops??[];for(let i=0;i<t.length;i++){const r=Tt(t[i].vertices,!0);for(let s=0;s<r.length;s++)Ps(t,i,s)||e.push(r[s])}for(const i of Tt(n.vertices??[],!1))e.push(i);return e}function vf(n,e,t,i,r,s,o,a){const l=Ce(5);n.strokeStyle=s,n.lineWidth=Ce(1.1),n.beginPath(),n.moveTo(e,i-l),n.lineTo(e,i+l),n.moveTo(t,i-l),n.lineTo(t,i+l),n.moveTo(e,i),n.lineTo(t,i),n.stroke();const c=`${a} ${Ha((t-e)/r)}`;Zc(n,(e+t)/2,i+Ce(11),c,o)}function Mf(n,e,t,i,r,s,o,a){const l=Ce(5);n.strokeStyle=s,n.lineWidth=Ce(1.1),n.beginPath(),n.moveTo(i-l,e),n.lineTo(i+l,e),n.moveTo(i-l,t),n.lineTo(i+l,t),n.moveTo(i,e),n.lineTo(i,t),n.stroke();const c=`${a} ${Ha((t-e)/r)}`;Zc(n,i-Ce(14),(e+t)/2,c,o)}function Zc(n,e,t,i,r){n.font=`600 ${Ce(10)}px system-ui, sans-serif`;const s=n.measureText(i).width,o=Ce(3),a=Ce(14);n.fillStyle="rgba(15, 20, 25, 0.88)",n.fillRect(e-s/2-o,t-a/2,s+o*2,a),n.fillStyle=r,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e,t)}const Sf=[{code:"nl",flag:"🇳🇱",name:"Nederlands"},{code:"en",flag:"🇬🇧",name:"English"},{code:"es",flag:"🇪🇸",name:"Español"},{code:"pl",flag:"🇵🇱",name:"Polski"},{code:"ru",flag:"🇷🇺",name:"Русский"}],Yo={nl:{pageTitle:"Wand-m²",statusEmpty:"Teken wanden · sluit lus · daarna nieuwe lus of maten per lijn",statusDrawing:"Bezig… snapt 45° · dicht bij start = lus sluiten",statusOpen:n=>`Open lus · ${n} muur(en) · sluit of teken verder`,statusWallSelected:"Muur geselecteerd · typ lengte (m) om maat aan te passen",statusCorner:n=>`Binnenhoek ${n}`,statusClosed:n=>`Gesloten · ${n} · teken nieuwe lus of klik lijn`,statusClosedWall:n=>`${n} · typ muurlengte (m) om lijn aan te passen`,statusClosedCorner:(n,e)=>`Gesloten · ${n} · binnenhoek ${e}`,statusClosedOdd:(n,e)=>`Gesloten · ${n} · afwijkend: ${e}`,statusMeetfoutAt:n=>`Meetfout bij hoek ${n} · overige naar 45°/90°/135°`,statusDoor:n=>`Deur ${n} · sleep om te verplaatsen · typ breedte`,statusIdle:"Klaar. Selecteer kamer · type · Deel… of ✂ Teken.",statusPartitionDraw:"✂ Deel kamer: 1) klik op wand 2) sleep rechte/45°/90° naar overkant 3) klik op die wand → 2 kamers. Esc = stop.",wallM:"Muur (m)",doorM:"Deur (m)",addDoor:"+ Deur",removeDoor:"Deur weg",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Deur ${n} · scharnier ${e} · ${t} · sleep om te verplaatsen`,splitLoop:"Deel…",splitKicker:"Scheidingswand",splitTitle:"Deel de lus",splitLead:n=>`${n} vrije optie(s)`,splitLeadEqual:"÷2/÷3/÷4 = gelijke banen. Of kies vrije positie. Of sluit en gebruik ✂ Scheiding voor hoeken/schuin. Geen auto-deuren.",splitApply:"Deel hier",splitCancel:"Annuleren",splitNone:"Geen geldige scheiding voor deze vorm.",splitByN:n=>`Delen door ${n}`,splitFlipAxis:"Wissel horizontaal/verticaal",splitFree:"Of snelle positie (recht):",statusSplit:n=>`Vrije scheiding: optie ${n}`,statusSplitParts:n=>`Delen door ${n} · gelijke banen`,interiorDeg:"Binnenhoek (°)",snapTitle:"Zet binnenhoek op 45° / 90° / 135° (45°-raster)",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Undo",reset:"Reset",dragTitle:"Sleep om te verplaatsen",meetfoutKicker:"Mogelijke meetfout",meetfoutTitle:"Hoeken kloppen niet na sluiten",meetfoutLead:n=>`${n} binnenhoek(en) wijken af van 45°/90°/135° (rood). 135° = 45°-raster. Hover hoeknummer voor live vorm.`,ignore:"Negeren",confirm:"Bevestigen",relocate:"Verplaatsen…",relocateHint:"Kies hoeknummer (hover = live vorm). Oranje stippellijn = origineel. Restfout naar gekozen hoek.",back:"Terug",applyHere:"Corrigeer hier",cornerN:n=>`Hoek ${n}`,residual:"restfout",hoverCorner:n=>`Hover: live vorm met restfout bij hoek ${n}`,hint:"1 Teken wanden → sluit lus  ·  2 Muur selecteren → maten/deur  ·  3 Kamer: ✂ Scheiding of Deel…  ·  Opslaan als je klaar bent"},en:{pageTitle:"Wall-m²",statusEmpty:"Draw walls · close loop · then new loop or edit line lengths",statusDrawing:"Drawing… snaps 45° · near start = close loop",statusOpen:n=>`Open loop · ${n} wall(s)`,statusWallSelected:"Wall selected · type length (m) to resize",statusCorner:n=>`Interior angle ${n}`,statusClosed:n=>`Closed · ${n} · draw new loop or tap a line`,statusClosedWall:n=>`${n} · type wall length (m) to resize line`,statusClosedCorner:(n,e)=>`Closed · ${n} · interior ${e}`,statusClosedOdd:(n,e)=>`Closed · ${n} · off-grid: ${e}`,statusMeetfoutAt:n=>`Error at corner ${n} · rest → 45°/90°/135°`,statusDoor:n=>`Door ${n} · drag · type width`,statusIdle:"Ready. Select room · type · Split… or ✂ Draw.",statusPartitionDraw:"Partition: 1st click on outer wall · corners inside · last click on other wall. Esc = cancel.",wallM:"Wall (m)",doorM:"Door (m)",addDoor:"+ Door",removeDoor:"Remove door",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Door ${n} · hinge ${e} · ${t} · drag to move`,splitLoop:"Split…",splitKicker:"Partition wall",splitTitle:"Split the loop",splitLead:n=>`${n} free option(s)`,splitLeadEqual:"Pick ÷2 / ÷3 / ÷4 (equal strips). Hover = preview. ↻ = flip axis.",splitApply:"Split here",splitCancel:"Cancel",splitNone:"No valid partition for this shape.",splitByN:n=>`Divide by ${n}`,splitFlipAxis:"Toggle horizontal/vertical",splitFree:"Or free position:",statusSplit:n=>`Free partition: option ${n}`,statusSplitParts:n=>`Divide by ${n} · equal strips`,interiorDeg:"Interior (°)",snapTitle:"Snap interior to 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Undo",reset:"Reset",dragTitle:"Drag to move",meetfoutKicker:"Possible measurement error",meetfoutTitle:"Angles do not match after closing",meetfoutLead:n=>`${n} interior angle(s) off 45°/90°/135° (red). 135° is on the 45° grid. Hover a corner number for live shape.`,ignore:"Ignore",confirm:"Confirm",relocate:"Move…",relocateHint:"Pick corner number (hover = live shape). Orange dashed = original. Residual goes to selected corner.",back:"Back",applyHere:"Fix here",cornerN:n=>`Corner ${n}`,residual:"residual",hoverCorner:n=>`Hover: live shape with residual at corner ${n}`,hint:"Multiple loops. Select wall → + Door. Drag door, type width. Line lengths. Languages: flags."},es:{pageTitle:"Pared-m²",statusEmpty:"Dibuja paredes · cierra en el punto de inicio",statusDrawing:"Dibujando… ajuste 45° · cerca del inicio = cierre libre",statusOpen:n=>`Cadena abierta · ${n} pared(es)`,statusWallSelected:"Pared seleccionada · escribe longitud (m)",statusCorner:n=>`Ángulo interior ${n}`,statusClosed:n=>`Cerrado · ${n}`,statusClosedWall:n=>`Cerrado · ${n} · escribe longitud (m)`,statusClosedCorner:(n,e)=>`Cerrado · ${n} · interior ${e}`,statusClosedOdd:(n,e)=>`Cerrado · ${n} · fuera de rejilla: ${e}`,statusMeetfoutAt:n=>`Error en esquina ${n} · resto → 45°/90°/135°`,statusDoor:n=>`Puerta ${n} · arrastra · escribe ancho`,statusIdle:"Listo.",statusPartitionDraw:"Tabique libre: muro → esquinas → muro. Esc = cancelar.",wallM:"Pared (m)",doorM:"Puerta (m)",addDoor:"+ Puerta",removeDoor:"Quitar puerta",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Puerta ${n} · bisagra ${e} · ${t}`,splitLoop:"Dividir…",splitKicker:"Tabique",splitTitle:"Dividir el bucle",splitLead:n=>`${n} opción(es) libres`,splitLeadEqual:"Elige ÷2 / ÷3 / ÷4. Hover = vista. ↻ = eje.",splitApply:"Dividir aquí",splitCancel:"Cancelar",splitNone:"Sin partición válida.",splitByN:n=>`Dividir en ${n}`,splitFlipAxis:"Cambiar eje",splitFree:"O posición libre:",statusSplit:n=>`Libre: opción ${n}`,statusSplitParts:n=>`Dividir en ${n}`,interiorDeg:"Interior (°)",snapTitle:"Ajustar interior a 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Deshacer",reset:"Reiniciar",dragTitle:"Arrastra para mover",meetfoutKicker:"Posible error de medida",meetfoutTitle:"Los ángulos no coinciden al cerrar",meetfoutLead:n=>`${n} ángulo(s) fuera de 45°/90°/135° (rojo). 135° es válido (rejilla 45°). Pasa el ratón por el número.`,ignore:"Ignorar",confirm:"Confirmar",relocate:"Mover…",relocateHint:"Elige número de esquina (hover = forma en vivo). Naranja discontinua = original.",back:"Atrás",applyHere:"Corregir aquí",cornerN:n=>`Esquina ${n}`,residual:"resto",hoverCorner:n=>`Hover: forma en vivo con resto en esquina ${n}`,hint:"Verde = ok (45/90/135°), rojo = error. Popup a la izquierda (arrastrable). Idioma: banderas."},pl:{pageTitle:"Ściana-m²",statusEmpty:"Rysuj ściany · zamknij w punkcie startu",statusDrawing:"Rysowanie… snap 45° · blisko startu = swobodne zamknięcie",statusOpen:n=>`Otwarty łańcuch · ${n} ścian(y)`,statusWallSelected:"Wybrana ściana · wpisz długość (m)",statusCorner:n=>`Kąt wewnętrzny ${n}`,statusClosed:n=>`Zamknięte · ${n}`,statusClosedWall:n=>`Zamknięte · ${n} · wpisz długość (m)`,statusClosedCorner:(n,e)=>`Zamknięte · ${n} · kąt ${e}`,statusClosedOdd:(n,e)=>`Zamknięte · ${n} · poza siatką: ${e}`,statusMeetfoutAt:n=>`Błąd przy rogu ${n} · reszta → 45°/90°/135°`,statusDoor:n=>`Drzwi ${n} · przeciągnij · wpisz szerokość`,statusIdle:"Gotowe.",statusPartitionDraw:"Ściana: mur → narożniki → mur. Esc = stop.",wallM:"Ściana (m)",doorM:"Drzwi (m)",addDoor:"+ Drzwi",removeDoor:"Usuń drzwi",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Drzwi ${n} · zawias ${e} · ${t}`,splitLoop:"Podziel…",splitKicker:"Ściana działowa",splitTitle:"Podziel pętlę",splitLead:n=>`${n} wolnych opcji`,splitLeadEqual:"Wybierz ÷2 / ÷3 / ÷4. Hover = podgląd. ↻ = oś.",splitApply:"Podziel tu",splitCancel:"Anuluj",splitNone:"Brak poprawnej ściany.",splitByN:n=>`Podziel na ${n}`,splitFlipAxis:"Zmień oś",splitFree:"Lub wolna pozycja:",statusSplit:n=>`Wolna: opcja ${n}`,statusSplitParts:n=>`Podziel na ${n}`,interiorDeg:"Kąt wewn. (°)",snapTitle:"Ustaw kąt na 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Cofnij",reset:"Reset",dragTitle:"Przeciągnij, aby przenieść",meetfoutKicker:"Możliwy błąd pomiaru",meetfoutTitle:"Kąty nie pasują po zamknięciu",meetfoutLead:n=>`${n} kąt(ów) poza 45°/90°/135° (czerwony). 135° na siatce 45°. Najedź na numer rogu.`,ignore:"Ignoruj",confirm:"Potwierdź",relocate:"Przenieś…",relocateHint:"Wybierz numer rogu (hover = żywy kształt). Pomarańczowa linia = oryginał.",back:"Wstecz",applyHere:"Popraw tutaj",cornerN:n=>`Róg ${n}`,residual:"reszta",hoverCorner:n=>`Hover: kształt z resztą w rogu ${n}`,hint:"Zielony = ok (45/90/135°), czerwony = błąd. Popup po lewej (przeciągalny). Język: flagi."},ru:{pageTitle:"Стена-м²",statusEmpty:"Рисуйте стены · замкните в начальной точке",statusDrawing:"Рисование… шаг 45° · у старта = свободное замыкание",statusOpen:n=>`Открытая цепь · ${n} стен(ы)`,statusWallSelected:"Стена выбрана · введите длину (м)",statusCorner:n=>`Внутренний угол ${n}`,statusClosed:n=>`Замкнуто · ${n}`,statusClosedWall:n=>`Замкнуто · ${n} · введите длину (м)`,statusClosedCorner:(n,e)=>`Замкнуто · ${n} · угол ${e}`,statusClosedOdd:(n,e)=>`Замкнуто · ${n} · вне сетки: ${e}`,statusMeetfoutAt:n=>`Ошибка в углу ${n} · остальные → 45°/90°/135°`,statusDoor:n=>`Дверь ${n} · перетащите · ширина`,statusIdle:"Готово.",statusPartitionDraw:"Перегородка: стена → углы → стена. Esc = отмена.",wallM:"Стена (м)",doorM:"Дверь (м)",addDoor:"+ Дверь",removeDoor:"Убрать дверь",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Дверь ${n} · петля ${e} · ${t}`,splitLoop:"Разделить…",splitKicker:"Перегородка",splitTitle:"Разделить контур",splitLead:n=>`${n} свободных вариантов`,splitLeadEqual:"Выберите ÷2 / ÷3 / ÷4. Hover = превью. ↻ = ось.",splitApply:"Разделить",splitCancel:"Отмена",splitNone:"Нет допустимой перегородки.",splitByN:n=>`На ${n} части`,splitFlipAxis:"Сменить ось",splitFree:"Или свободная позиция:",statusSplit:n=>`Свободно: вариант ${n}`,statusSplitParts:n=>`Деление на ${n}`,interiorDeg:"Угол (°)",snapTitle:"Привязать угол к 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Отмена",reset:"Сброс",dragTitle:"Перетащите, чтобы переместить",meetfoutKicker:"Возможная ошибка измерения",meetfoutTitle:"Углы не совпадают после замыкания",meetfoutLead:n=>`${n} угол(ов) вне 45°/90°/135° (красный). 135° — на сетке 45°. Наведите на номер угла.`,ignore:"Игнорировать",confirm:"Подтвердить",relocate:"Перенести…",relocateHint:"Выберите номер угла (hover = живая форма). Оранжевый пунктир = оригинал.",back:"Назад",applyHere:"Исправить здесь",cornerN:n=>`Угол ${n}`,residual:"остаток",hoverCorner:n=>`Hover: форма с остатком в углу ${n}`,hint:"Зелёный = ок (45/90/135°), красный = ошибка. Окно слева (перетаскивается). Язык: флаги."}},Jc="wand-m2-lang";function yf(){try{const e=localStorage.getItem(Jc);if(e&&Yo[e])return e}catch{}const n=(navigator.language||"nl").slice(0,2).toLowerCase();return n==="nl"||n==="en"||n==="es"||n==="pl"||n==="ru"?n:"nl"}function Ef(n){try{localStorage.setItem(Jc,n)}catch{}}function wl(n){return Yo[n]??Yo.nl}const Ko={scale:1,ox:0,oy:0};function bf(n,e,t){return{x:(n-t.ox)/t.scale,y:(e-t.oy)/t.scale}}function Tf(n,e,t,i,r=.25,s=6){const o=Math.min(s,Math.max(r,n.scale*i));if(o===n.scale)return n;const a=bf(e,t,n);return{scale:o,ox:e-a.x*o,oy:t-a.y*o}}function Af(n,e,t,i=48,r=.2,s=8){if(!n.length||e<10||t<10)return{...Ko};let o=1/0,a=1/0,l=-1/0,c=-1/0;for(const h of n)o=Math.min(o,h.x),a=Math.min(a,h.y),l=Math.max(l,h.x),c=Math.max(c,h.y);const d=Math.max(40,l-o),f=Math.max(40,c-a),u=(e-i*2)/d,p=(t-i*2)/f,m=Math.min(s,Math.max(r,Math.min(u,p))),x=(o+l)/2,g=(a+c)/2;return{scale:m,ox:e/2-x*m,oy:t/2-g*m}}function wf(n,e){let t=n;e===1&&(t*=16),e===2&&(t*=400);const i=Math.max(-400,Math.min(400,t));return Math.exp(-i*.0015)}const Qc="wand-m2-library",Cf="wand-m2-autosave";function jc(){return`P${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`}function Rf(){try{const n=localStorage.getItem(Qc);if(!n)return[];const e=JSON.parse(n);return Array.isArray(e)?e:[]}catch{return[]}}function Pf(n){localStorage.setItem(Qc,JSON.stringify(n))}function Cl(n){const e=Rf(),t=e.findIndex(i=>i.id===n.id);return t>=0?e[t]=n:e.unshift(n),Pf(e),e}function Ss(n,e,t,i=[],r,s=[]){return{v:1,id:r??jc(),name:n.trim()||"Naamloos plan",savedAt:new Date().toISOString(),pxPerMeter:t,model:JSON.parse(JSON.stringify(e)),installations:JSON.parse(JSON.stringify(i)),runs:JSON.parse(JSON.stringify(s))}}function Lf(n){if(!n||typeof n!="object")return null;const e=n;if(e.v===1&&e.model&&typeof e.model=="object"){const t=e.model;return Array.isArray(t.loops)?{v:1,id:typeof e.id=="string"?e.id:jc(),name:typeof e.name=="string"?e.name:"Geïmporteerd",savedAt:typeof e.savedAt=="string"?e.savedAt:new Date().toISOString(),pxPerMeter:typeof e.pxPerMeter=="number"?e.pxPerMeter:50,model:t,installations:Array.isArray(e.installations)?e.installations:[],runs:Array.isArray(e.runs)?e.runs:[]}:null}if(e.model&&typeof e.model=="object"){const t=e.model;return Array.isArray(t.loops)?Ss("Geïmporteerd",t,typeof e.pxPerMeter=="number"?e.pxPerMeter:50,[],void 0,[]):null}return null}function If(n,e){const t=n.querySelector("#electra-palette"),i=n.querySelector("#plan-save-lib"),r=n.querySelector("#plan-name");if(!t)return{setActiveTool:()=>{}};let s=null;const o=wd(),a=Object.fromEntries(Tl.map(m=>[m.id,Cd(m.id)]));t.innerHTML="";const l=document.createElement("div");l.className="symbol-primary",t.appendChild(l);for(const m of o)l.appendChild(p(m.id,m.labelNl,m.code,m.symbol));const c=document.createElement("div");c.className="symbol-groups",t.appendChild(c);const d=[];for(const m of Tl){const x=a[m.id];if(!x.length)continue;const g=document.createElement("div");g.className="symbol-more",g.dataset.group=m.id;const h=document.createElement("span");h.className="symbol-more-label",h.textContent=m.labelNl;const E=document.createElement("select");E.className="symbol-select",E.setAttribute("aria-label",m.labelNl);const w=document.createElement("option");w.value="",w.textContent=`— ${m.labelNl} —`,E.appendChild(w);for(const y of x){const T=document.createElement("option");T.value=y.id,T.textContent=`${y.code} · ${y.labelNl}`,E.appendChild(T)}g.appendChild(h),g.appendChild(E),c.appendChild(g),d.push({group:m.id,sel:E,wrap:g}),E.addEventListener("change",()=>{const y=E.value||null;for(const T of d)T.sel!==E&&(T.sel.value="",T.wrap.classList.remove("active"));if(!y){s&&!o.some(T=>T.id===s)&&(f(null),e.onSelectTool(null));return}s=y,l.querySelectorAll(".symbol-btn").forEach(T=>T.classList.remove("active")),g.classList.add("active"),e.onSelectTool(y)})}function f(m){s=m,l.querySelectorAll(".symbol-btn").forEach(x=>{x.classList.toggle("active",x.dataset.def===m)});for(const x of d){const g=m&&a[x.group].some(h=>h.id===m);x.sel.value=g?m:"",x.wrap.classList.toggle("active",!!g)}}function u(m){const x=s===m?null:m;f(x),e.onSelectTool(x)}function p(m,x,g,h){const E=document.createElement("button");E.type="button",E.className="symbol-btn",E.dataset.def=m,E.title=x,E.setAttribute("aria-label",x);const w=document.createElement("canvas");w.width=32,w.height=32,w.className="symbol-canvas",E.appendChild(w);const y=document.createElement("span");y.className="symbol-lab",y.textContent=g,E.appendChild(y);const T=w.getContext("2d");return T&&(T.clearRect(0,0,32,32),Kc(T,h,16,15,22,{viewScale:1})),E.addEventListener("click",()=>u(m)),E}return i?.addEventListener("click",()=>{const m=r?.value.trim();m&&e.setActivePlanMeta(e.getActivePlanMeta().id,m),e.onSave()}),{setActiveTool:m=>f(m)}}function eu(n,e){if(n.length<2||e<=0)return 0;let t=0;for(let i=1;i<n.length;i++)t+=Le(n[i-1],n[i]);return t/e}function Df(n,e){if(e.length===0)return 1/0;if(e.length===1)return Le(n,e[0]);let t=1/0;for(let i=1;i<e.length;i++){const r=e[i-1],s=e[i],o=Nf(n,r,s);o<t&&(t=o)}return t}function Nf(n,e,t){const i=t.x-e.x,r=t.y-e.y,s=i*i+r*r;if(s<1e-12)return Le(n,e);let o=((n.x-e.x)*i+(n.y-e.y)*r)/s;return o=Math.max(0,Math.min(1,o)),Le(n,{x:e.x+o*i,y:e.y+o*r})}function Uf(n,e,t){const i=new Map,r=(s,o,a)=>{const l=ni(s),c=l?.labelNl??s,d=l?.code??s,f=i.get(s);f?f.unit!==a&&a==="m"?(f.unit="m",f.qty=o):f.qty+=o:i.set(s,{defId:s,label:c,code:d,qty:o,unit:a})};for(const s of n)r(s.defId,1,"st");for(const s of e){const o=eu(s.points,t);o>0&&r(s.defId,o,"m")}return[...i.values()].sort((s,o)=>s.unit!==o.unit?s.unit==="st"?-1:1:s.label.localeCompare(o.label,"nl"))}function Rl(n){if(n.unit==="st")return`${Math.round(n.qty)} st`;const e=Math.round(n.qty*10)/10;return`${Number.isInteger(e)?String(e):e.toFixed(1).replace(".",",")} m`}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $a="185",Ff=0,Pl=1,Of=2,ys=1,Bf=2,Lr=3,xi=0,hn=1,Ln=2,ri=0,ir=1,Ll=2,Il=3,Dl=4,kf=5,Di=100,zf=101,Hf=102,Gf=103,Vf=104,Wf=200,Xf=201,qf=202,$f=203,Zo=204,Jo=205,Yf=206,Kf=207,Zf=208,Jf=209,Qf=210,jf=211,eh=212,th=213,nh=214,Qo=0,jo=1,ea=2,ar=3,ta=4,na=5,ia=6,ra=7,tu=0,ih=1,rh=2,Gn=0,nu=1,iu=2,ru=3,su=4,ou=5,au=6,lu=7,cu=300,Oi=301,lr=302,no=303,io=304,Vs=306,sa=1e3,ii=1001,oa=1002,qt=1003,sh=1004,Yr=1005,Qt=1006,ro=1007,Ui=1008,xn=1009,uu=1010,du=1011,Br=1012,Ya=1013,Xn=1014,zn=1015,oi=1016,Ka=1017,Za=1018,kr=1020,fu=35902,hu=35899,pu=1021,mu=1022,Dn=1023,ai=1026,Fi=1027,gu=1028,Ja=1029,Bi=1030,Qa=1031,ja=1033,Es=33776,bs=33777,Ts=33778,As=33779,aa=35840,la=35841,ca=35842,ua=35843,da=36196,fa=37492,ha=37496,pa=37488,ma=37489,Ls=37490,ga=37491,_a=37808,xa=37809,va=37810,Ma=37811,Sa=37812,ya=37813,Ea=37814,ba=37815,Ta=37816,Aa=37817,wa=37818,Ca=37819,Ra=37820,Pa=37821,La=36492,Ia=36494,Da=36495,Na=36283,Ua=36284,Is=36285,Fa=36286,oh=3200,Oa=0,ah=1,mi="",_n="srgb",Ds="srgb-linear",Ns="linear",ht="srgb",Vi=7680,Nl=519,lh=512,ch=513,uh=514,el=515,dh=516,fh=517,tl=518,hh=519,Ul=35044,Fl="300 es",Hn=2e3,zr=2001;function ph(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Us(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function mh(){const n=Us("canvas");return n.style.display="block",n}const Ol={};function Bl(...n){const e="THREE."+n.shift();console.log(e,...n)}function _u(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=_u(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function at(...n){n=_u(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function rr(...n){const e=n.join(" ");e in Ol||(Ol[e]=!0,Oe(...n))}function gh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const _h={[Qo]:jo,[ea]:ia,[ta]:ra,[ar]:na,[jo]:Qo,[ia]:ea,[ra]:ta,[na]:ar};class ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],so=Math.PI/180,Ba=180/Math.PI;function Hr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function xh(n,e){return(n%e+e)%e}function oo(n,e,t){return(1-t)*n+t*e}function yr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const al=class al{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};al.prototype.isVector2=!0;let st=al;class dr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3],u=s[o+0],p=s[o+1],m=s[o+2],x=s[o+3];if(f!==x||l!==u||c!==p||d!==m){let g=l*u+c*p+d*m+f*x;g<0&&(u=-u,p=-p,m=-m,x=-x,g=-g);let h=1-a;if(g<.9995){const E=Math.acos(g),w=Math.sin(E);h=Math.sin(h*E)/w,a=Math.sin(a*E)/w,l=l*h+u*a,c=c*h+p*a,d=d*h+m*a,f=f*h+x*a}else{l=l*h+u*a,c=c*h+p*a,d=d*h+m*a,f=f*h+x*a;const E=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=E,c*=E,d*=E,f*=E}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],d=i[r+3],f=s[o],u=s[o+1],p=s[o+2],m=s[o+3];return e[t]=a*m+d*f+l*p-c*u,e[t+1]=l*m+d*u+c*f-a*p,e[t+2]=c*m+d*p+a*u-l*f,e[t+3]=d*m-a*f-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(r/2),f=a(s/2),u=l(i/2),p=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"YXZ":this._x=u*d*f+c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"ZXY":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f-u*p*m;break;case"ZYX":this._x=u*d*f-c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f+u*p*m;break;case"YZX":this._x=u*d*f+c*p*m,this._y=c*p*f+u*d*m,this._z=c*d*m-u*p*f,this._w=c*d*f-u*p*m;break;case"XZY":this._x=u*d*f-c*p*m,this._y=c*p*f-u*d*m,this._z=c*d*m+u*p*f,this._w=c*d*f+u*p*m;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],f=t[10],u=i+a+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(d-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+o*a+r*c-s*l,this._y=r*d+o*l+s*a-i*c,this._z=s*d+o*c+i*l-r*a,this._w=o*d-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ll=class ll{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),d=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*d,this.y=i+l*d+a*c-s*f,this.z=r+l*f+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ao.copy(this).projectOnVector(e),this.sub(ao)}reflect(e){return this.sub(ao.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ll.prototype.isVector3=!0;let k=ll;const ao=new k,kl=new dr,cl=class cl{constructor(e,t,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],f=i[7],u=i[2],p=i[5],m=i[8],x=r[0],g=r[3],h=r[6],E=r[1],w=r[4],y=r[7],T=r[2],C=r[5],L=r[8];return s[0]=o*x+a*E+l*T,s[3]=o*g+a*w+l*C,s[6]=o*h+a*y+l*L,s[1]=c*x+d*E+f*T,s[4]=c*g+d*w+f*C,s[7]=c*h+d*y+f*L,s[2]=u*x+p*E+m*T,s[5]=u*g+p*w+m*C,s[8]=u*h+p*y+m*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-i*s*d+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=d*o-a*c,u=a*l-d*s,p=c*s-o*l,m=t*f+i*u+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=f*x,e[1]=(r*c-d*i)*x,e[2]=(a*i-r*o)*x,e[3]=u*x,e[4]=(d*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return rr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(lo.makeScale(e,t)),this}rotate(e){return rr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(lo.makeRotation(-e)),this}translate(e,t){return rr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};cl.prototype.isMatrix3=!0;let Ve=cl;const lo=new Ve,zl=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hl=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vh(){const n={enabled:!0,workingColorSpace:Ds,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ht&&(r.r=si(r.r),r.g=si(r.g),r.b=si(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(r.r=sr(r.r),r.g=sr(r.g),r.b=sr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===mi?Ns:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return rr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return rr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ds]:{primaries:e,whitePoint:i,transfer:Ns,toXYZ:zl,fromXYZ:Hl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_n},outputColorSpaceConfig:{drawingBufferColorSpace:_n}},[_n]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:zl,fromXYZ:Hl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_n}}}),n}const je=vh();function si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function sr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Wi;class Mh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Wi===void 0&&(Wi=Us("canvas")),Wi.width=e.width,Wi.height=e.height;const r=Wi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Wi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Us("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=si(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(si(t[i]/255)*255):t[i]=si(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sh=0;class nl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=Hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(co(r[o].image)):s.push(co(r[o]))}else s=co(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function co(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Mh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let yh=0;const uo=new k;class on extends ki{constructor(e=on.DEFAULT_IMAGE,t=on.DEFAULT_MAPPING,i=ii,r=ii,s=Qt,o=Ui,a=Dn,l=xn,c=on.DEFAULT_ANISOTROPY,d=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=Hr(),this.name="",this.source=new nl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(uo).x}get height(){return this.source.getSize(uo).y}get depth(){return this.source.getSize(uo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sa:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case oa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sa:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case oa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=cu;on.DEFAULT_ANISOTROPY=1;const ul=class ul{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],d=l[4],f=l[8],u=l[1],p=l[5],m=l[9],x=l[2],g=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(f-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,y=(p+1)/2,T=(h+1)/2,C=(d+u)/4,L=(f+x)/4,v=(m+g)/4;return w>y&&w>T?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=C/i,s=L/i):y>T?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=C/r,s=v/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=L/s,r=v/s),this.set(i,r,s,t),this}let E=Math.sqrt((g-m)*(g-m)+(f-x)*(f-x)+(u-d)*(u-d));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(f-x)/E,this.z=(u-d)/E,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ul.prototype.isVector4=!0;let At=ul;class Eh extends ki{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new on(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new nl(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vn extends Eh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class xu extends on{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bh extends on{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bs=class Bs{constructor(e,t,i,r,s,o,a,l,c,d,f,u,p,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,d,f,u,p,m,x,g)}set(e,t,i,r,s,o,a,l,c,d,f,u,p,m,x,g){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=d,h[10]=f,h[14]=u,h[3]=p,h[7]=m,h[11]=x,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Xi.setFromMatrixColumn(e,0).length(),s=1/Xi.setFromMatrixColumn(e,1).length(),o=1/Xi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=o*d,p=o*f,m=a*d,x=a*f;t[0]=l*d,t[4]=-l*f,t[8]=c,t[1]=p+m*c,t[5]=u-x*c,t[9]=-a*l,t[2]=x-u*c,t[6]=m+p*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*d,p=l*f,m=c*d,x=c*f;t[0]=u+x*a,t[4]=m*a-p,t[8]=o*c,t[1]=o*f,t[5]=o*d,t[9]=-a,t[2]=p*a-m,t[6]=x+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*d,p=l*f,m=c*d,x=c*f;t[0]=u-x*a,t[4]=-o*f,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*d,t[9]=x-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*d,p=o*f,m=a*d,x=a*f;t[0]=l*d,t[4]=m*c-p,t[8]=u*c+x,t[1]=l*f,t[5]=x*c+u,t[9]=p*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,m=a*l,x=a*c;t[0]=l*d,t[4]=x-u*f,t[8]=m*f+p,t[1]=f,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=p*f+m,t[10]=u-x*f}else if(e.order==="XZY"){const u=o*l,p=o*c,m=a*l,x=a*c;t[0]=l*d,t[4]=-f,t[8]=c*d,t[1]=u*f+x,t[5]=o*d,t[9]=p*f-m,t[2]=m*f-p,t[6]=a*d,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Th,e,Ah)}lookAt(e,t,i){const r=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),ci.crossVectors(i,mn),ci.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),ci.crossVectors(i,mn)),ci.normalize(),Kr.crossVectors(mn,ci),r[0]=ci.x,r[4]=Kr.x,r[8]=mn.x,r[1]=ci.y,r[5]=Kr.y,r[9]=mn.y,r[2]=ci.z,r[6]=Kr.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],f=i[5],u=i[9],p=i[13],m=i[2],x=i[6],g=i[10],h=i[14],E=i[3],w=i[7],y=i[11],T=i[15],C=r[0],L=r[4],v=r[8],R=r[12],O=r[1],N=r[5],H=r[9],Q=r[13],te=r[2],z=r[6],Y=r[10],W=r[14],ne=r[3],re=r[7],ge=r[11],_e=r[15];return s[0]=o*C+a*O+l*te+c*ne,s[4]=o*L+a*N+l*z+c*re,s[8]=o*v+a*H+l*Y+c*ge,s[12]=o*R+a*Q+l*W+c*_e,s[1]=d*C+f*O+u*te+p*ne,s[5]=d*L+f*N+u*z+p*re,s[9]=d*v+f*H+u*Y+p*ge,s[13]=d*R+f*Q+u*W+p*_e,s[2]=m*C+x*O+g*te+h*ne,s[6]=m*L+x*N+g*z+h*re,s[10]=m*v+x*H+g*Y+h*ge,s[14]=m*R+x*Q+g*W+h*_e,s[3]=E*C+w*O+y*te+T*ne,s[7]=E*L+w*N+y*z+T*re,s[11]=E*v+w*H+y*Y+T*ge,s[15]=E*R+w*Q+y*W+T*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],f=e[6],u=e[10],p=e[14],m=e[3],x=e[7],g=e[11],h=e[15],E=l*p-c*u,w=a*p-c*f,y=a*u-l*f,T=o*p-c*d,C=o*u-l*d,L=o*f-a*d;return t*(x*E-g*w+h*y)-i*(m*E-g*T+h*C)+r*(m*w-x*T+h*L)-s*(m*y-x*C+g*L)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],l=e[2],c=e[6],d=e[10];return t*(o*d-a*c)-i*(s*d-a*l)+r*(s*c-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=e[9],u=e[10],p=e[11],m=e[12],x=e[13],g=e[14],h=e[15],E=t*a-i*o,w=t*l-r*o,y=t*c-s*o,T=i*l-r*a,C=i*c-s*a,L=r*c-s*l,v=d*x-f*m,R=d*g-u*m,O=d*h-p*m,N=f*g-u*x,H=f*h-p*x,Q=u*h-p*g,te=E*Q-w*H+y*N+T*O-C*R+L*v;if(te===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/te;return e[0]=(a*Q-l*H+c*N)*z,e[1]=(r*H-i*Q-s*N)*z,e[2]=(x*L-g*C+h*T)*z,e[3]=(u*C-f*L-p*T)*z,e[4]=(l*O-o*Q-c*R)*z,e[5]=(t*Q-r*O+s*R)*z,e[6]=(g*y-m*L-h*w)*z,e[7]=(d*L-u*y+p*w)*z,e[8]=(o*H-a*O+c*v)*z,e[9]=(i*O-t*H-s*v)*z,e[10]=(m*C-x*y+h*E)*z,e[11]=(f*y-d*C-p*E)*z,e[12]=(a*R-o*N-l*v)*z,e[13]=(t*N-i*R+r*v)*z,e[14]=(x*w-m*T-g*E)*z,e[15]=(d*T-f*w+u*E)*z,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+i,d*l-r*o,0,c*l-r*a,d*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,d=o+o,f=a+a,u=s*c,p=s*d,m=s*f,x=o*d,g=o*f,h=a*f,E=l*c,w=l*d,y=l*f,T=i.x,C=i.y,L=i.z;return r[0]=(1-(x+h))*T,r[1]=(p+y)*T,r[2]=(m-w)*T,r[3]=0,r[4]=(p-y)*C,r[5]=(1-(u+h))*C,r[6]=(g+E)*C,r[7]=0,r[8]=(m+w)*L,r[9]=(g-E)*L,r[10]=(1-(u+x))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Xi.set(r[0],r[1],r[2]).length();const a=Xi.set(r[4],r[5],r[6]).length(),l=Xi.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Cn.copy(this);const c=1/o,d=1/a,f=1/l;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=d,Cn.elements[5]*=d,Cn.elements[6]*=d,Cn.elements[8]*=f,Cn.elements[9]*=f,Cn.elements[10]*=f,t.setFromRotationMatrix(Cn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,r,s,o,a=Hn,l=!1){const c=this.elements,d=2*s/(t-e),f=2*s/(i-r),u=(t+e)/(t-e),p=(i+r)/(i-r);let m,x;if(l)m=s/(o-s),x=o*s/(o-s);else if(a===Hn)m=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===zr)m=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Hn,l=!1){const c=this.elements,d=2/(t-e),f=2/(i-r),u=-(t+e)/(t-e),p=-(i+r)/(i-r);let m,x;if(l)m=1/(o-s),x=o/(o-s);else if(a===Hn)m=-2/(o-s),x=-(o+s)/(o-s);else if(a===zr)m=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Bs.prototype.isMatrix4=!0;let wt=Bs;const Xi=new k,Cn=new wt,Th=new k(0,0,0),Ah=new k(1,1,1),ci=new k,Kr=new k,mn=new k,Gl=new wt,Vl=new dr;class vi{constructor(e=0,t=0,i=0,r=vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],d=r[9],f=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Gl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vi.DEFAULT_ORDER="XYZ";class vu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wh=0;const Wl=new k,qi=new dr,Zn=new wt,Zr=new k,Er=new k,Ch=new k,Rh=new dr,Xl=new k(1,0,0),ql=new k(0,1,0),$l=new k(0,0,1),Yl={type:"added"},Ph={type:"removed"},$i={type:"childadded",child:null},fo={type:"childremoved",child:null};class Xt extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=Hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new k,t=new vi,i=new dr,r=new k(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new Ve}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.multiply(qi),this}rotateOnWorldAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.premultiply(qi),this}rotateX(e){return this.rotateOnAxis(Xl,e)}rotateY(e){return this.rotateOnAxis(ql,e)}rotateZ(e){return this.rotateOnAxis($l,e)}translateOnAxis(e,t){return Wl.copy(e).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xl,e)}translateY(e){return this.translateOnAxis(ql,e)}translateZ(e){return this.translateOnAxis($l,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Zr.copy(e):Zr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Er,Zr,this.up):Zn.lookAt(Zr,Er,this.up),this.quaternion.setFromRotationMatrix(Zn),r&&(Zn.extractRotation(r.matrixWorld),qi.setFromRotationMatrix(Zn),this.quaternion.premultiply(qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yl),$i.child=e,this.dispatchEvent($i),$i.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ph),fo.child=e,this.dispatchEvent(fo),fo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yl),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,e,Ch),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,Rh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),f=o(e.shapes),u=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Xt.DEFAULT_UP=new k(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ir extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lh={type:"move"};class ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),h=this._getHandJoint(c,x);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Lh)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ir;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function po(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class $e{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=je.workingColorSpace){if(e=xh(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=po(o,s,e+1/3),this.g=po(o,s,e),this.b=po(o,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=_n){function i(s){s!==void 0&&parseFloat(s)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_n){const i=Mu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=sr(e.r),this.g=sr(e.g),this.b=sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_n){return je.workingToColorSpace(Zt.copy(this),e),Math.round(et(Zt.r*255,0,255))*65536+Math.round(et(Zt.g*255,0,255))*256+Math.round(et(Zt.b*255,0,255))}getHexString(e=_n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Zt.copy(this),t);const i=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=d<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=_n){je.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,i=Zt.g,r=Zt.b;return e!==_n?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Jr);const i=oo(ui.h,Jr.h,t),r=oo(ui.s,Jr.s,t),s=oo(ui.l,Jr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new $e;$e.NAMES=Mu;class il{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new $e(e),this.near=t,this.far=i}clone(){return new il(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ih extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Rn=new k,Jn=new k,mo=new k,Qn=new k,Yi=new k,Ki=new k,Kl=new k,go=new k,_o=new k,xo=new k,vo=new At,Mo=new At,So=new At;class In{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Rn.subVectors(e,t),r.cross(Rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Rn.subVectors(r,t),Jn.subVectors(i,t),mo.subVectors(e,t);const o=Rn.dot(Rn),a=Rn.dot(Jn),l=Rn.dot(mo),c=Jn.dot(Jn),d=Jn.dot(mo),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const u=1/f,p=(c*l-a*d)*u,m=(o*d-a*l)*u;return s.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Qn.x),l.addScaledVector(o,Qn.y),l.addScaledVector(a,Qn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return vo.setScalar(0),Mo.setScalar(0),So.setScalar(0),vo.fromBufferAttribute(e,t),Mo.fromBufferAttribute(e,i),So.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(vo,s.x),o.addScaledVector(Mo,s.y),o.addScaledVector(So,s.z),o}static isFrontFacing(e,t,i,r){return Rn.subVectors(i,t),Jn.subVectors(e,t),Rn.cross(Jn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Rn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return In.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return In.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Yi.subVectors(r,i),Ki.subVectors(s,i),go.subVectors(e,i);const l=Yi.dot(go),c=Ki.dot(go);if(l<=0&&c<=0)return t.copy(i);_o.subVectors(e,r);const d=Yi.dot(_o),f=Ki.dot(_o);if(d>=0&&f<=d)return t.copy(r);const u=l*f-d*c;if(u<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(i).addScaledVector(Yi,o);xo.subVectors(e,s);const p=Yi.dot(xo),m=Ki.dot(xo);if(m>=0&&p<=m)return t.copy(s);const x=p*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(i).addScaledVector(Ki,a);const g=d*m-p*f;if(g<=0&&f-d>=0&&p-m>=0)return Kl.subVectors(s,r),a=(f-d)/(f-d+(p-m)),t.copy(r).addScaledVector(Kl,a);const h=1/(g+x+u);return o=x*h,a=u*h,t.copy(i).addScaledVector(Yi,o).addScaledVector(Ki,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Gr{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Pn):Pn.fromBufferAttribute(s,o),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qr.copy(i.boundingBox)),Qr.applyMatrix4(e.matrixWorld),this.union(Qr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),jr.subVectors(this.max,br),Zi.subVectors(e.a,br),Ji.subVectors(e.b,br),Qi.subVectors(e.c,br),di.subVectors(Ji,Zi),fi.subVectors(Qi,Ji),wi.subVectors(Zi,Qi);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-wi.z,wi.y,di.z,0,-di.x,fi.z,0,-fi.x,wi.z,0,-wi.x,-di.y,di.x,0,-fi.y,fi.x,0,-wi.y,wi.x,0];return!yo(t,Zi,Ji,Qi,jr)||(t=[1,0,0,0,1,0,0,0,1],!yo(t,Zi,Ji,Qi,jr))?!1:(es.crossVectors(di,fi),t=[es.x,es.y,es.z],yo(t,Zi,Ji,Qi,jr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new k,new k,new k,new k,new k,new k,new k,new k],Pn=new k,Qr=new Gr,Zi=new k,Ji=new k,Qi=new k,di=new k,fi=new k,wi=new k,br=new k,jr=new k,es=new k,Ci=new k;function yo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ci.fromArray(n,s);const a=r.x*Math.abs(Ci.x)+r.y*Math.abs(Ci.y)+r.z*Math.abs(Ci.z),l=e.dot(Ci),c=t.dot(Ci),d=i.dot(Ci);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const Ut=new k,ts=new st;let Dh=0;class Wn extends ki{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ul,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ts.fromBufferAttribute(this,t),ts.applyMatrix3(e),this.setXY(t,ts.x,ts.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=yr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yr(t,this.array)),t}setX(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yr(t,this.array)),t}setY(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yr(t,this.array)),t}setW(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ul&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Su extends Wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class yu extends Wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class an extends Wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Nh=new Gr,Tr=new k,Eo=new k;class Ws{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Nh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tr.subVectors(e,this.center);const t=Tr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Tr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Eo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tr.copy(e.center).add(Eo)),this.expandByPoint(Tr.copy(e.center).sub(Eo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Uh=0;const vn=new wt,bo=new Xt,ji=new k,gn=new Gr,Ar=new Gr,Vt=new k;class yn extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ph(e)?yu:Su)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return bo.lookAt(e),bo.updateMatrix(),this.applyMatrix4(bo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new an(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ar.setFromBufferAttribute(a),this.morphTargetsRelative?(Vt.addVectors(gn.min,Ar.min),gn.expandByPoint(Vt),Vt.addVectors(gn.max,Ar.max),gn.expandByPoint(Vt)):(gn.expandByPoint(Ar.min),gn.expandByPoint(Ar.max))}gn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Vt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Vt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Vt.fromBufferAttribute(a,c),l&&(ji.fromBufferAttribute(e,c),Vt.add(ji)),r=Math.max(r,i.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Wn(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new k,l[v]=new k;const c=new k,d=new k,f=new k,u=new st,p=new st,m=new st,x=new k,g=new k;function h(v,R,O){c.fromBufferAttribute(i,v),d.fromBufferAttribute(i,R),f.fromBufferAttribute(i,O),u.fromBufferAttribute(s,v),p.fromBufferAttribute(s,R),m.fromBufferAttribute(s,O),d.sub(c),f.sub(c),p.sub(u),m.sub(u);const N=1/(p.x*m.y-m.x*p.y);isFinite(N)&&(x.copy(d).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(N),g.copy(f).multiplyScalar(p.x).addScaledVector(d,-m.x).multiplyScalar(N),a[v].add(x),a[R].add(x),a[O].add(x),l[v].add(g),l[R].add(g),l[O].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let v=0,R=E.length;v<R;++v){const O=E[v],N=O.start,H=O.count;for(let Q=N,te=N+H;Q<te;Q+=3)h(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const w=new k,y=new k,T=new k,C=new k;function L(v){T.fromBufferAttribute(r,v),C.copy(T);const R=a[v];w.copy(R),w.sub(T.multiplyScalar(T.dot(R))).normalize(),y.crossVectors(C,R);const N=y.dot(l[v])<0?-1:1;o.setXYZW(v,w.x,w.y,w.z,N)}for(let v=0,R=E.length;v<R;++v){const O=E[v],N=O.start,H=O.count;for(let Q=N,te=N+H;Q<te;Q+=3)L(e.getX(Q+0)),L(e.getX(Q+1)),L(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const r=new k,s=new k,o=new k,a=new k,l=new k,c=new k,d=new k,f=new k;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),a.add(d),l.add(d),c.add(d),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,f=a.normalized,u=new c.constructor(l.length*d);let p=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*d;for(let h=0;h<d;h++)u[m++]=c[p++]}return new Wn(u,d,f)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,f=c.length;d<f;d++){const u=c[d],p=e(u,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let u=0,p=f.length;u<p;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Fh=0;class fr extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=Hr(),this.name="",this.type="Material",this.blending=ir,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zo,this.blendDst=Jo,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ir&&(i.blending=this.blending),this.side!==xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Zo&&(i.blendSrc=this.blendSrc),this.blendDst!==Jo&&(i.blendDst=this.blendDst),this.blendEquation!==Di&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ar&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new $e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new st().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new st().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ei=new k,To=new k,ns=new k,hi=new k,Ao=new k,is=new k,wo=new k;class Eu{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){To.copy(e).add(t).multiplyScalar(.5),ns.copy(t).sub(e).normalize(),hi.copy(this.origin).sub(To);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ns),a=hi.dot(this.direction),l=-hi.dot(ns),c=hi.lengthSq(),d=Math.abs(1-o*o);let f,u,p,m;if(d>0)if(f=o*l-a,u=o*a-l,m=s*d,f>=0)if(u>=-m)if(u<=m){const x=1/d;f*=x,u*=x,p=f*(f+o*u+2*a)+u*(o*f+u+2*l)+c}else u=s,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*l)+c;else u<=-m?(f=Math.max(0,-(-o*s+a)),u=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+u*(u+2*l)+c):u<=m?(f=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(f=Math.max(0,-(o*s+a)),u=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+u*(u+2*l)+c);else u=o>0?-s:s,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(To).addScaledVector(ns,u),p}intersectSphere(e,t){ei.subVectors(e.center,this.origin);const i=ei.dot(this.direction),r=ei.dot(ei)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,o=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,o=(e.min.y-u.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(a=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,i,r,s){Ao.subVectors(t,e),is.subVectors(i,e),wo.crossVectors(Ao,is);let o=this.direction.dot(wo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hi.subVectors(this.origin,e);const l=a*this.direction.dot(is.crossVectors(hi,is));if(l<0)return null;const c=a*this.direction.dot(Ao.cross(hi));if(c<0||l+c>o)return null;const d=-a*hi.dot(wo);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bu extends fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=tu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zl=new wt,Ri=new Eu,rs=new Ws,Jl=new k,ss=new k,os=new k,as=new k,Co=new k,ls=new k,Ql=new k,cs=new k;class Sn extends Xt{constructor(e=new yn,t=new bu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ls.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],f=s[l];d!==0&&(Co.fromBufferAttribute(f,e),o?ls.addScaledVector(Co,d):ls.addScaledVector(Co.sub(t),d))}t.add(ls)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),rs.copy(i.boundingSphere),rs.applyMatrix4(s),Ri.copy(e.ray).recast(e.near),!(rs.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(rs,Jl)===null||Ri.origin.distanceToSquared(Jl)>(e.far-e.near)**2))&&(Zl.copy(s).invert(),Ri.copy(e.ray).applyMatrix4(Zl),!(i.boundingBox!==null&&Ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){const g=u[m],h=o[g.materialIndex],E=Math.max(g.start,p.start),w=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let y=E,T=w;y<T;y+=3){const C=a.getX(y),L=a.getX(y+1),v=a.getX(y+2);r=us(this,h,e,i,c,d,f,C,L,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=m,h=x;g<h;g+=3){const E=a.getX(g),w=a.getX(g+1),y=a.getX(g+2);r=us(this,o,e,i,c,d,f,E,w,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){const g=u[m],h=o[g.materialIndex],E=Math.max(g.start,p.start),w=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let y=E,T=w;y<T;y+=3){const C=y,L=y+1,v=y+2;r=us(this,h,e,i,c,d,f,C,L,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=m,h=x;g<h;g+=3){const E=g,w=g+1,y=g+2;r=us(this,o,e,i,c,d,f,E,w,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Oh(n,e,t,i,r,s,o,a){let l;if(e.side===hn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===xi,a),l===null)return null;cs.copy(a),cs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(cs);return c<t.near||c>t.far?null:{distance:c,point:cs.clone(),object:n}}function us(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,ss),n.getVertexPosition(l,os),n.getVertexPosition(c,as);const d=Oh(n,e,t,i,ss,os,as,Ql);if(d){const f=new k;In.getBarycoord(Ql,ss,os,as,f),r&&(d.uv=In.getInterpolatedAttribute(r,a,l,c,f,new st)),s&&(d.uv1=In.getInterpolatedAttribute(s,a,l,c,f,new st)),o&&(d.normal=In.getInterpolatedAttribute(o,a,l,c,f,new k),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new k,materialIndex:0};In.getNormal(ss,os,as,u.normal),d.face=u,d.barycoord=f}return d}class Bh extends on{constructor(e=null,t=1,i=1,r,s,o,a,l,c=qt,d=qt,f,u){super(null,o,a,l,c,d,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ro=new k,kh=new k,zh=new Ve;class Li{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ro.subVectors(i,t).cross(kh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ro),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||zh.getNormalMatrix(e),r=this.coplanarPoint(Ro).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Ws,Hh=new st(.5,.5),ds=new k;class rl{constructor(e=new Li,t=new Li,i=new Li,r=new Li,s=new Li,o=new Li){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Hn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],d=s[4],f=s[5],u=s[6],p=s[7],m=s[8],x=s[9],g=s[10],h=s[11],E=s[12],w=s[13],y=s[14],T=s[15];if(r[0].setComponents(c-o,p-d,h-m,T-E).normalize(),r[1].setComponents(c+o,p+d,h+m,T+E).normalize(),r[2].setComponents(c+a,p+f,h+x,T+w).normalize(),r[3].setComponents(c-a,p-f,h-x,T-w).normalize(),i)r[4].setComponents(l,u,g,y).normalize(),r[5].setComponents(c-l,p-u,h-g,T-y).normalize();else if(r[4].setComponents(c-l,p-u,h-g,T-y).normalize(),t===Hn)r[5].setComponents(c+l,p+u,h+g,T+y).normalize();else if(t===zr)r[5].setComponents(l,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){Pi.center.set(0,0,0);const t=Hh.distanceTo(e.center);return Pi.radius=.7071067811865476+t,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ds.x=r.normal.x>0?e.max.x:e.min.x,ds.y=r.normal.y>0?e.max.y:e.min.y,ds.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ds)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tu extends fr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fs=new k,Os=new k,jl=new wt,wr=new Eu,fs=new Ws,Po=new k,ec=new k;class Gh extends Xt{constructor(e=new yn,t=new Tu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Fs.fromBufferAttribute(t,r-1),Os.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Fs.distanceTo(Os);e.setAttribute("lineDistance",new an(i,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fs.copy(i.boundingSphere),fs.applyMatrix4(r),fs.radius+=s,e.ray.intersectsSphere(fs)===!1)return;jl.copy(r).invert(),wr.copy(e.ray).applyMatrix4(jl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let x=p,g=m-1;x<g;x+=c){const h=d.getX(x),E=d.getX(x+1),w=hs(this,e,wr,l,h,E,x);w&&t.push(w)}if(this.isLineLoop){const x=d.getX(m-1),g=d.getX(p),h=hs(this,e,wr,l,x,g,m-1);h&&t.push(h)}}else{const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=p,g=m-1;x<g;x+=c){const h=hs(this,e,wr,l,x,x+1,x);h&&t.push(h)}if(this.isLineLoop){const x=hs(this,e,wr,l,m-1,p,m-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hs(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(Fs.fromBufferAttribute(a,r),Os.fromBufferAttribute(a,s),t.distanceSqToSegment(Fs,Os,Po,ec)>i)return;Po.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Po);if(!(c<e.near||c>e.far))return{distance:c,point:ec.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const tc=new k,nc=new k;class Vh extends Gh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)tc.fromBufferAttribute(t,r),nc.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+tc.distanceTo(nc);e.setAttribute("lineDistance",new an(i,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Au extends on{constructor(e=[],t=Oi,i,r,s,o,a,l,c,d){super(e,t,i,r,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cr extends on{constructor(e,t,i=Xn,r,s,o,a=qt,l=qt,c,d=ai,f=1){if(d!==ai&&d!==Fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,s,o,a,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new nl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Wh extends cr{constructor(e,t=Xn,i=Oi,r,s,o=qt,a=qt,l,c=ai){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,r,s,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class wu extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class hr extends yn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],f=[];let u=0,p=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new an(c,3)),this.setAttribute("normal",new an(d,3)),this.setAttribute("uv",new an(f,2));function m(x,g,h,E,w,y,T,C,L,v,R){const O=y/L,N=T/v,H=y/2,Q=T/2,te=C/2,z=L+1,Y=v+1;let W=0,ne=0;const re=new k;for(let ge=0;ge<Y;ge++){const _e=ge*N-Q;for(let be=0;be<z;be++){const tt=be*O-H;re[x]=tt*E,re[g]=_e*w,re[h]=te,c.push(re.x,re.y,re.z),re[x]=0,re[g]=0,re[h]=C>0?1:-1,d.push(re.x,re.y,re.z),f.push(be/L),f.push(1-ge/v),W+=1}}for(let ge=0;ge<v;ge++)for(let _e=0;_e<L;_e++){const be=u+_e+z*ge,tt=u+_e+z*(ge+1),nt=u+(_e+1)+z*(ge+1),ze=u+(_e+1)+z*ge;l.push(be,tt,ze),l.push(tt,nt,ze),ne+=6}a.addGroup(p,ne,R),p+=ne,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Xs extends yn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,d=l+1,f=e/a,u=t/l,p=[],m=[],x=[],g=[];for(let h=0;h<d;h++){const E=h*u-o;for(let w=0;w<c;w++){const y=w*f-s;m.push(y,-E,0),x.push(0,0,1),g.push(w/a),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let E=0;E<a;E++){const w=E+c*h,y=E+c*(h+1),T=E+1+c*(h+1),C=E+1+c*h;p.push(w,y,C),p.push(y,T,C)}this.setIndex(p),this.setAttribute("position",new an(m,3)),this.setAttribute("normal",new an(x,3)),this.setAttribute("uv",new an(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.width,e.height,e.widthSegments,e.heightSegments)}}function ur(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(ic(r))r.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(ic(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function sn(n){const e={};for(let t=0;t<n.length;t++){const i=ur(n[t]);for(const r in i)e[r]=i[r]}return e}function ic(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Xh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Cu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const qh={clone:ur,merge:sn};var $h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$h,this.fragmentShader=Yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ur(e.uniforms),this.uniformsGroups=Xh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new $e().setHex(r.value);break;case"v2":this.uniforms[i].value=new st().fromArray(r.value);break;case"v3":this.uniforms[i].value=new k().fromArray(r.value);break;case"v4":this.uniforms[i].value=new At().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new wt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Kh extends qn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ru extends fr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oa,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zh extends fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jh extends fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class sl extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Qh extends sl{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Lo=new wt,rc=new k,sc=new k;class jh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rl,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;rc.setFromMatrixPosition(e.matrixWorld),t.position.copy(rc),sc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sc),t.updateMatrixWorld(),Lo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===zr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ps=new k,ms=new dr,Fn=new k;class Pu extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ps,ms,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ps,ms,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ps,ms,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ps,ms,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const pi=new k,oc=new st,ac=new st;class Mn extends Pu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ba*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ba*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,oc,ac),t.subVectors(ac,oc)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(so*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ol extends Pu{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ep extends jh{constructor(){super(new ol(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class lc extends sl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new ep}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class tp extends sl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const er=-90,tr=1;class np extends Xt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Mn(er,tr,e,t);r.layers=this.layers,this.add(r);const s=new Mn(er,tr,e,t);s.layers=this.layers,this.add(s);const o=new Mn(er,tr,e,t);o.layers=this.layers,this.add(o);const a=new Mn(er,tr,e,t);a.layers=this.layers,this.add(a);const l=new Mn(er,tr,e,t);l.layers=this.layers,this.add(l);const c=new Mn(er,tr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class ip extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const dl=class dl{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};dl.prototype.isMatrix2=!0;let cc=dl;class rp extends Vh{constructor(e=10,t=10,i=4473924,r=8947848){i=new $e(i),r=new $e(r);const s=t/2,o=e/t,a=e/2,l=[],c=[];for(let u=0,p=0,m=-a;u<=t;u++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);const x=u===s?i:r;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}const d=new yn;d.setAttribute("position",new an(l,3)),d.setAttribute("color",new an(c,3));const f=new Tu({vertexColors:!0,toneMapped:!1});super(d,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function uc(n,e,t,i){const r=sp(i);switch(t){case pu:return n*e;case gu:return n*e/r.components*r.byteLength;case Ja:return n*e/r.components*r.byteLength;case Bi:return n*e*2/r.components*r.byteLength;case Qa:return n*e*2/r.components*r.byteLength;case mu:return n*e*3/r.components*r.byteLength;case Dn:return n*e*4/r.components*r.byteLength;case ja:return n*e*4/r.components*r.byteLength;case Es:case bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ts:case As:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case la:case ua:return Math.max(n,16)*Math.max(e,8)/4;case aa:case ca:return Math.max(n,8)*Math.max(e,8)/2;case da:case fa:case pa:case ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ha:case Ls:case ga:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _a:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case va:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ya:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ba:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ta:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case wa:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ra:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Pa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case La:case Ia:case Da:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Na:case Ua:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Is:case Fa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sp(n){switch(n){case xn:case uu:return{byteLength:1,components:1};case Br:case du:case oi:return{byteLength:2,components:1};case Ka:case Za:return{byteLength:2,components:4};case Xn:case Ya:case zn:return{byteLength:4,components:1};case fu:case hu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$a}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$a);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Lu(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function op(n){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const d=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,d);else{f.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<f.length;p++){const m=f[u],x=f[p];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,f[u]=x)}f.length=u+1;for(let p=0,m=f.length;p<m;p++){const x=f[p];n.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var ap=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,gp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_p=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Mp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Pp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ip=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Op="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$p=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,jp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,om=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,am=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,um=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_m=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ym=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Em=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,bm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Am=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Pm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Lm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Im=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Um=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,km=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$m=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ym=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Km=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,eg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ng=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,og=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ag=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,mg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,yg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ag=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ig=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ug=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Og=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:ap,alphahash_pars_fragment:lp,alphamap_fragment:cp,alphamap_pars_fragment:up,alphatest_fragment:dp,alphatest_pars_fragment:fp,aomap_fragment:hp,aomap_pars_fragment:pp,batching_pars_vertex:mp,batching_vertex:gp,begin_vertex:_p,beginnormal_vertex:xp,bsdfs:vp,iridescence_fragment:Mp,bumpmap_pars_fragment:Sp,clipping_planes_fragment:yp,clipping_planes_pars_fragment:Ep,clipping_planes_pars_vertex:bp,clipping_planes_vertex:Tp,color_fragment:Ap,color_pars_fragment:wp,color_pars_vertex:Cp,color_vertex:Rp,common:Pp,cube_uv_reflection_fragment:Lp,defaultnormal_vertex:Ip,displacementmap_pars_vertex:Dp,displacementmap_vertex:Np,emissivemap_fragment:Up,emissivemap_pars_fragment:Fp,colorspace_fragment:Op,colorspace_pars_fragment:Bp,envmap_fragment:kp,envmap_common_pars_fragment:zp,envmap_pars_fragment:Hp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:jp,envmap_vertex:Vp,fog_vertex:Wp,fog_pars_vertex:Xp,fog_fragment:qp,fog_pars_fragment:$p,gradientmap_pars_fragment:Yp,lightmap_pars_fragment:Kp,lights_lambert_fragment:Zp,lights_lambert_pars_fragment:Jp,lights_pars_begin:Qp,lights_toon_fragment:em,lights_toon_pars_fragment:tm,lights_phong_fragment:nm,lights_phong_pars_fragment:im,lights_physical_fragment:rm,lights_physical_pars_fragment:sm,lights_fragment_begin:om,lights_fragment_maps:am,lights_fragment_end:lm,lightprobes_pars_fragment:cm,logdepthbuf_fragment:um,logdepthbuf_pars_fragment:dm,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:hm,map_fragment:pm,map_pars_fragment:mm,map_particle_fragment:gm,map_particle_pars_fragment:_m,metalnessmap_fragment:xm,metalnessmap_pars_fragment:vm,morphinstance_vertex:Mm,morphcolor_vertex:Sm,morphnormal_vertex:ym,morphtarget_pars_vertex:Em,morphtarget_vertex:bm,normal_fragment_begin:Tm,normal_fragment_maps:Am,normal_pars_fragment:wm,normal_pars_vertex:Cm,normal_vertex:Rm,normalmap_pars_fragment:Pm,clearcoat_normal_fragment_begin:Lm,clearcoat_normal_fragment_maps:Im,clearcoat_pars_fragment:Dm,iridescence_pars_fragment:Nm,opaque_fragment:Um,packing:Fm,premultiplied_alpha_fragment:Om,project_vertex:Bm,dithering_fragment:km,dithering_pars_fragment:zm,roughnessmap_fragment:Hm,roughnessmap_pars_fragment:Gm,shadowmap_pars_fragment:Vm,shadowmap_pars_vertex:Wm,shadowmap_vertex:Xm,shadowmask_pars_fragment:qm,skinbase_vertex:$m,skinning_pars_vertex:Ym,skinning_vertex:Km,skinnormal_vertex:Zm,specularmap_fragment:Jm,specularmap_pars_fragment:Qm,tonemapping_fragment:jm,tonemapping_pars_fragment:eg,transmission_fragment:tg,transmission_pars_fragment:ng,uv_pars_fragment:ig,uv_pars_vertex:rg,uv_vertex:sg,worldpos_vertex:og,background_vert:ag,background_frag:lg,backgroundCube_vert:cg,backgroundCube_frag:ug,cube_vert:dg,cube_frag:fg,depth_vert:hg,depth_frag:pg,distance_vert:mg,distance_frag:gg,equirect_vert:_g,equirect_frag:xg,linedashed_vert:vg,linedashed_frag:Mg,meshbasic_vert:Sg,meshbasic_frag:yg,meshlambert_vert:Eg,meshlambert_frag:bg,meshmatcap_vert:Tg,meshmatcap_frag:Ag,meshnormal_vert:wg,meshnormal_frag:Cg,meshphong_vert:Rg,meshphong_frag:Pg,meshphysical_vert:Lg,meshphysical_frag:Ig,meshtoon_vert:Dg,meshtoon_frag:Ng,points_vert:Ug,points_frag:Fg,shadow_vert:Og,shadow_frag:Bg,sprite_vert:kg,sprite_frag:zg},Me={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},kn={basic:{uniforms:sn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:sn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:sn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:sn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:sn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new $e(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:sn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:sn([Me.points,Me.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:sn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:sn([Me.common,Me.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:sn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:sn([Me.sprite,Me.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:sn([Me.common,Me.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:sn([Me.lights,Me.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};kn.physical={uniforms:sn([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const gs={r:0,b:0,g:0},Hg=new wt,Iu=new Ve;Iu.set(-1,0,0,0,1,0,0,0,1);function Gg(n,e,t,i,r,s){const o=new $e(0);let a=r===!0?0:1,l,c,d=null,f=0,u=null;function p(E){let w=E.isScene===!0?E.background:null;if(w&&w.isTexture){const y=E.backgroundBlurriness>0;w=e.get(w,y)}return w}function m(E){let w=!1;const y=p(E);y===null?g(o,a):y&&y.isColor&&(g(y,1),w=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(E,w){const y=p(w);y&&(y.isCubeTexture||y.mapping===Vs)?(c===void 0&&(c=new Sn(new hr(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:ur(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Iu),c.material.toneMapped=je.getTransfer(y.colorSpace)!==ht,(d!==y||f!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Sn(new Xs(2,2),new qn({name:"BackgroundMaterial",uniforms:ur(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=je.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||f!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=y,f=y.version,u=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function g(E,w){E.getRGB(gs,Cu(n)),t.buffers.color.setClear(gs.r,gs.g,gs.b,w,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,w=1){o.set(E),a=w,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(E){a=E,g(o,a)},render:m,addToRenderList:x,dispose:h}}function Vg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,o=!1;function a(N,H,Q,te,z){let Y=!1;const W=f(N,te,Q,H);s!==W&&(s=W,c(s.object)),Y=p(N,te,Q,z),Y&&m(N,te,Q,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,y(N,H,Q,te),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(N){return n.bindVertexArray(N)}function d(N){return n.deleteVertexArray(N)}function f(N,H,Q,te){const z=te.wireframe===!0;let Y=i[H.id];Y===void 0&&(Y={},i[H.id]=Y);const W=N.isInstancedMesh===!0?N.id:0;let ne=Y[W];ne===void 0&&(ne={},Y[W]=ne);let re=ne[Q.id];re===void 0&&(re={},ne[Q.id]=re);let ge=re[z];return ge===void 0&&(ge=u(l()),re[z]=ge),ge}function u(N){const H=[],Q=[],te=[];for(let z=0;z<t;z++)H[z]=0,Q[z]=0,te[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Q,attributeDivisors:te,object:N,attributes:{},index:null}}function p(N,H,Q,te){const z=s.attributes,Y=H.attributes;let W=0;const ne=Q.getAttributes();for(const re in ne)if(ne[re].location>=0){const _e=z[re];let be=Y[re];if(be===void 0&&(re==="instanceMatrix"&&N.instanceMatrix&&(be=N.instanceMatrix),re==="instanceColor"&&N.instanceColor&&(be=N.instanceColor)),_e===void 0||_e.attribute!==be||be&&_e.data!==be.data)return!0;W++}return s.attributesNum!==W||s.index!==te}function m(N,H,Q,te){const z={},Y=H.attributes;let W=0;const ne=Q.getAttributes();for(const re in ne)if(ne[re].location>=0){let _e=Y[re];_e===void 0&&(re==="instanceMatrix"&&N.instanceMatrix&&(_e=N.instanceMatrix),re==="instanceColor"&&N.instanceColor&&(_e=N.instanceColor));const be={};be.attribute=_e,_e&&_e.data&&(be.data=_e.data),z[re]=be,W++}s.attributes=z,s.attributesNum=W,s.index=te}function x(){const N=s.newAttributes;for(let H=0,Q=N.length;H<Q;H++)N[H]=0}function g(N){h(N,0)}function h(N,H){const Q=s.newAttributes,te=s.enabledAttributes,z=s.attributeDivisors;Q[N]=1,te[N]===0&&(n.enableVertexAttribArray(N),te[N]=1),z[N]!==H&&(n.vertexAttribDivisor(N,H),z[N]=H)}function E(){const N=s.newAttributes,H=s.enabledAttributes;for(let Q=0,te=H.length;Q<te;Q++)H[Q]!==N[Q]&&(n.disableVertexAttribArray(Q),H[Q]=0)}function w(N,H,Q,te,z,Y,W){W===!0?n.vertexAttribIPointer(N,H,Q,z,Y):n.vertexAttribPointer(N,H,Q,te,z,Y)}function y(N,H,Q,te){x();const z=te.attributes,Y=Q.getAttributes(),W=H.defaultAttributeValues;for(const ne in Y){const re=Y[ne];if(re.location>=0){let ge=z[ne];if(ge===void 0&&(ne==="instanceMatrix"&&N.instanceMatrix&&(ge=N.instanceMatrix),ne==="instanceColor"&&N.instanceColor&&(ge=N.instanceColor)),ge!==void 0){const _e=ge.normalized,be=ge.itemSize,tt=e.get(ge);if(tt===void 0)continue;const nt=tt.buffer,ze=tt.type,j=tt.bytesPerElement,ce=ze===n.INT||ze===n.UNSIGNED_INT||ge.gpuType===Ya;if(ge.isInterleavedBufferAttribute){const se=ge.data,Ue=se.stride,ke=ge.offset;if(se.isInstancedInterleavedBuffer){for(let Ie=0;Ie<re.locationSize;Ie++)h(re.location+Ie,se.meshPerAttribute);N.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ie=0;Ie<re.locationSize;Ie++)g(re.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let Ie=0;Ie<re.locationSize;Ie++)w(re.location+Ie,be/re.locationSize,ze,_e,Ue*j,(ke+be/re.locationSize*Ie)*j,ce)}else{if(ge.isInstancedBufferAttribute){for(let se=0;se<re.locationSize;se++)h(re.location+se,ge.meshPerAttribute);N.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let se=0;se<re.locationSize;se++)g(re.location+se);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let se=0;se<re.locationSize;se++)w(re.location+se,be/re.locationSize,ze,_e,be*j,be/re.locationSize*se*j,ce)}}else if(W!==void 0){const _e=W[ne];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(re.location,_e);break;case 3:n.vertexAttrib3fv(re.location,_e);break;case 4:n.vertexAttrib4fv(re.location,_e);break;default:n.vertexAttrib1fv(re.location,_e)}}}}E()}function T(){R();for(const N in i){const H=i[N];for(const Q in H){const te=H[Q];for(const z in te){const Y=te[z];for(const W in Y)d(Y[W].object),delete Y[W];delete te[z]}}delete i[N]}}function C(N){if(i[N.id]===void 0)return;const H=i[N.id];for(const Q in H){const te=H[Q];for(const z in te){const Y=te[z];for(const W in Y)d(Y[W].object),delete Y[W];delete te[z]}}delete i[N.id]}function L(N){for(const H in i){const Q=i[H];for(const te in Q){const z=Q[te];if(z[N.id]===void 0)continue;const Y=z[N.id];for(const W in Y)d(Y[W].object),delete Y[W];delete z[N.id]}}}function v(N){for(const H in i){const Q=i[H],te=N.isInstancedMesh===!0?N.id:0,z=Q[te];if(z!==void 0){for(const Y in z){const W=z[Y];for(const ne in W)d(W[ne].object),delete W[ne];delete z[Y]}delete Q[te],Object.keys(Q).length===0&&delete i[H]}}}function R(){O(),o=!0,s!==r&&(s=r,c(s.object))}function O(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:O,dispose:T,releaseStatesOfGeometry:C,releaseStatesOfObject:v,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:g,disableUnusedAttributes:E}}function Wg(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function a(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function Xg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(L){return!(L!==Dn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const v=L===oi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==xn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==zn&&!v)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Oe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:y,maxSamples:T,samples:C}}function qg(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Li,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||r;return r=u,i=f.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,p){const m=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,h=n.get(f);if(!r||m===null||m.length===0||s&&!g)s?d(null):c();else{const E=s?0:i,w=E*4;let y=h.clippingState||null;l.value=y,y=d(m,u,w,p);for(let T=0;T!==w;++T)y[T]=t[T];h.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,p,m){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const h=p+x*4,E=u.matrixWorldInverse;a.getNormalMatrix(E),(g===null||g.length<h)&&(g=new Float32Array(h));for(let w=0,y=p;w!==x;++w,y+=4)o.copy(f[w]).applyMatrix4(E,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const _i=4,dc=[.125,.215,.35,.446,.526,.582],Ni=20,$g=256,Cr=new ol,fc=new $e;let Io=null,Do=0,No=0,Uo=!1;const Yg=new k;class hc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=Yg}=s;Io=this._renderer.getRenderTarget(),Do=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Io,Do,No),this._renderer.xr.enabled=Uo,e.scissorTest=!1,nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Oi||e.mapping===lr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Io=this._renderer.getRenderTarget(),Do=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:oi,format:Dn,colorSpace:Ds,depthBuffer:!1},r=pc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Kg(s)),this._blurMaterial=Jg(s,e,t),this._ggxMaterial=Zg(s,e,t)}return r}_compileMaterial(e){const t=new Sn(new yn,e);this._renderer.compile(t,Cr)}_sceneToCubeUV(e,t,i,r,s){const l=new Mn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(fc),f.toneMapping=Gn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Sn(new hr,new bu({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let h=!1;const E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,h=!0):(g.color.copy(fc),h=!0);for(let w=0;w<6;w++){const y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[w],s.y,s.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[w]));const T=this._cubeSize;nr(r,y*T,w>2?T:0,T,T),f.setRenderTarget(r),h&&f.render(x,l),f.render(e,l)}f.toneMapping=p,f.autoClear=u,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Oi||e.mapping===lr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=gc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;nr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Cr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=0+c*1.25,p=f*u,{_lodMax:m}=this,x=this._sizeLods[i],g=3*x*(i>m-_i?i-m+_i:0),h=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=m-t,nr(s,g,h,3*x,2*x),r.setRenderTarget(s),r.render(a,Cr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,nr(e,g,h,3*x,2*x),r.setRenderTarget(e),r.render(a,Cr)}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&at("blur direction must be either latitudinal or longitudinal!");const d=3,f=this._lodMeshes[r];f.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ni-1),x=s/m,g=isFinite(s)?1+Math.floor(d*x):Ni;g>Ni&&Oe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ni}`);const h=[];let E=0;for(let L=0;L<Ni;++L){const v=L/x,R=Math.exp(-v*v/2);h.push(R),L===0?E+=R:L<g&&(E+=2*R)}for(let L=0;L<h.length;L++)h[L]=h[L]/E;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=h,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:w}=this;u.dTheta.value=m,u.mipInt.value=w-i;const y=this._sizeLods[r],T=3*y*(r>w-_i?r-w+_i:0),C=4*(this._cubeSize-y);nr(t,T,C,3*y,2*y),l.setRenderTarget(t),l.render(f,Cr)}}function Kg(n){const e=[],t=[],i=[];let r=n;const s=n-_i+1+dc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-_i?l=dc[o-n+_i-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),d=-c,f=1+c,u=[d,d,f,d,f,f,d,d,f,f,d,f],p=6,m=6,x=3,g=2,h=1,E=new Float32Array(x*m*p),w=new Float32Array(g*m*p),y=new Float32Array(h*m*p);for(let C=0;C<p;C++){const L=C%3*2/3-1,v=C>2?0:-1,R=[L,v,0,L+2/3,v,0,L+2/3,v+1,0,L,v,0,L+2/3,v+1,0,L,v+1,0];E.set(R,x*m*C),w.set(u,g*m*C);const O=[C,C,C,C,C,C];y.set(O,h*m*C)}const T=new yn;T.setAttribute("position",new Wn(E,x)),T.setAttribute("uv",new Wn(w,g)),T.setAttribute("faceIndex",new Wn(y,h)),i.push(new Sn(T,null)),r>_i&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function pc(n,e,t){const i=new Vn(n,e,t);return i.texture.mapping=Vs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Zg(n,e,t){return new qn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$g,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Jg(n,e,t){const i=new Float32Array(Ni),r=new k(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function mc(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function gc(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function qs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Du extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Au(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new hr(5,5,5),s=new qn({name:"CubemapFromEquirect",uniforms:ur(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:ri});s.uniforms.tEquirect.value=t;const o=new Sn(r,s),a=t.minFilter;return t.minFilter===Ui&&(t.minFilter=Qt),new np(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}function Qg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,p=!1){return u==null?null:p?o(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===no||p===io)if(e.has(u)){const m=e.get(u).texture;return a(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const x=new Du(m.height);return x.fromEquirectangularTexture(n,u),e.set(u,x),u.addEventListener("dispose",c),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const p=u.mapping,m=p===no||p===io,x=p===Oi||p===lr;if(m||x){let g=t.get(u);const h=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new hc(n)),g=m?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const E=u.image;return m&&E&&E.height>0||x&&E&&l(E)?(i===null&&(i=new hc(n)),g=m?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function a(u,p){return p===no?u.mapping=Oi:p===io&&(u.mapping=lr),u}function l(u){let p=0;const m=6;for(let x=0;x<m;x++)u[x]!==void 0&&p++;return p===m}function c(u){const p=u.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function jg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&rr("WebGLRenderer: "+i+" extension not supported."),r}}}function e0(n,e,t,i){const r={},s=new WeakMap;function o(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",o),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(f,u){return r[u.id]===!0||(u.addEventListener("dispose",o),r[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(f){const u=[],p=f.index,m=f.attributes.position;let x=0;if(m===void 0)return;if(p!==null){const E=p.array;x=p.version;for(let w=0,y=E.length;w<y;w+=3){const T=E[w+0],C=E[w+1],L=E[w+2];u.push(T,C,C,L,L,T)}}else{const E=m.array;x=m.version;for(let w=0,y=E.length/3-1;w<y;w+=3){const T=w+0,C=w+1,L=w+2;u.push(T,C,C,L,L,T)}}const g=new(m.count>=65535?yu:Su)(u,1);g.version=x;const h=s.get(f);h&&e.remove(h),s.set(f,g)}function d(f){const u=s.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:d}}function t0(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,u){n.drawElements(i,u,s,f*o),t.update(u,i,1)}function c(f,u,p){p!==0&&(n.drawElementsInstanced(i,u,s,f*o,p),t.update(u,i,p))}function d(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,p);let x=0;for(let g=0;g<p;g++)x+=u[g];t.update(x,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function n0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:at("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function i0(n,e,t){const i=new WeakMap,r=new At;function s(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(a);if(u===void 0||u.count!==f){let O=function(){v.dispose(),i.delete(a),a.removeEventListener("dispose",O)};var p=O;u!==void 0&&u.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let y=0;m===!0&&(y=1),x===!0&&(y=2),g===!0&&(y=3);let T=a.attributes.position.count*y,C=1;T>e.maxTextureSize&&(C=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const L=new Float32Array(T*C*4*f),v=new xu(L,T,C,f);v.type=zn,v.needsUpdate=!0;const R=y*4;for(let N=0;N<f;N++){const H=h[N],Q=E[N],te=w[N],z=T*C*4*N;for(let Y=0;Y<H.count;Y++){const W=Y*R;m===!0&&(r.fromBufferAttribute(H,Y),L[z+W+0]=r.x,L[z+W+1]=r.y,L[z+W+2]=r.z,L[z+W+3]=0),x===!0&&(r.fromBufferAttribute(Q,Y),L[z+W+4]=r.x,L[z+W+5]=r.y,L[z+W+6]=r.z,L[z+W+7]=0),g===!0&&(r.fromBufferAttribute(te,Y),L[z+W+8]=r.x,L[z+W+9]=r.y,L[z+W+10]=r.z,L[z+W+11]=te.itemSize===4?r.w:1)}}u={count:f,texture:v,size:new st(T,C)},i.set(a,u),a.addEventListener("dispose",O)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function r0(n,e,t,i,r){let s=new WeakMap;function o(c){const d=r.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function a(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:a}}const s0={[nu]:"LINEAR_TONE_MAPPING",[iu]:"REINHARD_TONE_MAPPING",[ru]:"CINEON_TONE_MAPPING",[su]:"ACES_FILMIC_TONE_MAPPING",[au]:"AGX_TONE_MAPPING",[lu]:"NEUTRAL_TONE_MAPPING",[ou]:"CUSTOM_TONE_MAPPING"};function o0(n,e,t,i,r,s){const o=new Vn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new cr(e,t):void 0}),a=new Vn(e,t,{type:oi,depthBuffer:!1,stencilBuffer:!1}),l=new yn;l.setAttribute("position",new an([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new an([0,2,0,0,2,0],2));const c=new Kh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Sn(l,c),f=new ol(-1,1,1,-1,0,1);let u=null,p=null,m=!1,x,g=null,h=[],E=!1;this.setSize=function(w,y){o.setSize(w,y),a.setSize(w,y);for(let T=0;T<h.length;T++){const C=h[T];C.setSize&&C.setSize(w,y)}},this.setEffects=function(w){h=w,E=h.length>0&&h[0].isRenderPass===!0;const y=o.width,T=o.height;for(let C=0;C<h.length;C++){const L=h[C];L.setSize&&L.setSize(y,T)}},this.begin=function(w,y){if(m||w.toneMapping===Gn&&h.length===0)return!1;if(g=y,y!==null){const T=y.width,C=y.height;(o.width!==T||o.height!==C)&&this.setSize(T,C)}return E===!1&&w.setRenderTarget(o),x=w.toneMapping,w.toneMapping=Gn,!0},this.hasRenderPass=function(){return E},this.end=function(w,y){w.toneMapping=x,m=!0;let T=o,C=a;for(let L=0;L<h.length;L++){const v=h[L];if(v.enabled!==!1&&(v.render(w,C,T,y),v.needsSwap!==!1)){const R=T;T=C,C=R}}if(u!==w.outputColorSpace||p!==w.toneMapping){u=w.outputColorSpace,p=w.toneMapping,c.defines={},je.getTransfer(u)===ht&&(c.defines.SRGB_TRANSFER="");const L=s0[p];L&&(c.defines[L]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(g),w.render(d,f),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const Nu=new on,ka=new cr(1,1),Uu=new xu,Fu=new bh,Ou=new Au,_c=[],xc=[],vc=new Float32Array(16),Mc=new Float32Array(9),Sc=new Float32Array(4);function pr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=_c[r];if(s===void 0&&(s=new Float32Array(r),_c[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Ot(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function $s(n,e){let t=xc[e];t===void 0&&(t=new Int32Array(e),xc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function a0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function l0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2fv(this.addr,e),Bt(t,e)}}function c0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;n.uniform3fv(this.addr,e),Bt(t,e)}}function u0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4fv(this.addr,e),Bt(t,e)}}function d0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,i))return;Sc.set(i),n.uniformMatrix2fv(this.addr,!1,Sc),Bt(t,i)}}function f0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,i))return;Mc.set(i),n.uniformMatrix3fv(this.addr,!1,Mc),Bt(t,i)}}function h0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,i))return;vc.set(i),n.uniformMatrix4fv(this.addr,!1,vc),Bt(t,i)}}function p0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function m0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2iv(this.addr,e),Bt(t,e)}}function g0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3iv(this.addr,e),Bt(t,e)}}function _0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4iv(this.addr,e),Bt(t,e)}}function x0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function v0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2uiv(this.addr,e),Bt(t,e)}}function M0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3uiv(this.addr,e),Bt(t,e)}}function S0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4uiv(this.addr,e),Bt(t,e)}}function y0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ka.compareFunction=t.isReversedDepthBuffer()?tl:el,s=ka):s=Nu,t.setTexture2D(e||s,r)}function E0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Fu,r)}function b0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ou,r)}function T0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Uu,r)}function A0(n){switch(n){case 5126:return a0;case 35664:return l0;case 35665:return c0;case 35666:return u0;case 35674:return d0;case 35675:return f0;case 35676:return h0;case 5124:case 35670:return p0;case 35667:case 35671:return m0;case 35668:case 35672:return g0;case 35669:case 35673:return _0;case 5125:return x0;case 36294:return v0;case 36295:return M0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return y0;case 35679:case 36299:case 36307:return E0;case 35680:case 36300:case 36308:case 36293:return b0;case 36289:case 36303:case 36311:case 36292:return T0}}function w0(n,e){n.uniform1fv(this.addr,e)}function C0(n,e){const t=pr(e,this.size,2);n.uniform2fv(this.addr,t)}function R0(n,e){const t=pr(e,this.size,3);n.uniform3fv(this.addr,t)}function P0(n,e){const t=pr(e,this.size,4);n.uniform4fv(this.addr,t)}function L0(n,e){const t=pr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function I0(n,e){const t=pr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function D0(n,e){const t=pr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function N0(n,e){n.uniform1iv(this.addr,e)}function U0(n,e){n.uniform2iv(this.addr,e)}function F0(n,e){n.uniform3iv(this.addr,e)}function O0(n,e){n.uniform4iv(this.addr,e)}function B0(n,e){n.uniform1uiv(this.addr,e)}function k0(n,e){n.uniform2uiv(this.addr,e)}function z0(n,e){n.uniform3uiv(this.addr,e)}function H0(n,e){n.uniform4uiv(this.addr,e)}function G0(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=ka:o=Nu;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function V0(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Fu,s[o])}function W0(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Ou,s[o])}function X0(n,e,t){const i=this.cache,r=e.length,s=$s(t,r);Ot(i,s)||(n.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Uu,s[o])}function q0(n){switch(n){case 5126:return w0;case 35664:return C0;case 35665:return R0;case 35666:return P0;case 35674:return L0;case 35675:return I0;case 35676:return D0;case 5124:case 35670:return N0;case 35667:case 35671:return U0;case 35668:case 35672:return F0;case 35669:case 35673:return O0;case 5125:return B0;case 36294:return k0;case 36295:return z0;case 36296:return H0;case 35678:case 36198:case 36298:case 36306:case 35682:return G0;case 35679:case 36299:case 36307:return V0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return X0}}class $0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=A0(t.type)}}class Y0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=q0(t.type)}}class K0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Fo=/(\w+)(\])?(\[|\.)?/g;function yc(n,e){n.seq.push(e),n.map[e.id]=e}function Z0(n,e,t){const i=n.name,r=i.length;for(Fo.lastIndex=0;;){const s=Fo.exec(i),o=Fo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){yc(t,c===void 0?new $0(a,n,e):new Y0(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new K0(a),yc(t,f)),t=f}}}class ws{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Z0(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ec(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const J0=37297;let Q0=0;function j0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const bc=new Ve;function e_(n){je._getMatrix(bc,je.workingColorSpace,n);const e=`mat3( ${bc.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case Ns:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Tc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+j0(n.getShaderSource(e),a)}else return s}function t_(n,e){const t=e_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const n_={[nu]:"Linear",[iu]:"Reinhard",[ru]:"Cineon",[su]:"ACESFilmic",[au]:"AgX",[lu]:"Neutral",[ou]:"Custom"};function i_(n,e){const t=n_[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _s=new k;function r_(){je.getLuminanceCoefficients(_s);const n=_s.x.toFixed(4),e=_s.y.toFixed(4),t=_s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function s_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Dr).join(`
`)}function o_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function a_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Dr(n){return n!==""}function Ac(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const l_=/^[ \t]*#include +<([\w\d./]+)>/gm;function za(n){return n.replace(l_,u_)}const c_=new Map;function u_(n,e){let t=qe[e];if(t===void 0){const i=c_.get(e);if(i!==void 0)t=qe[i],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return za(t)}const d_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cc(n){return n.replace(d_,f_)}function f_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Rc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const h_={[ys]:"SHADOWMAP_TYPE_PCF",[Lr]:"SHADOWMAP_TYPE_VSM"};function p_(n){return h_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const m_={[Oi]:"ENVMAP_TYPE_CUBE",[lr]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE_UV"};function g_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":m_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const __={[lr]:"ENVMAP_MODE_REFRACTION"};function x_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":__[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const v_={[tu]:"ENVMAP_BLENDING_MULTIPLY",[ih]:"ENVMAP_BLENDING_MIX",[rh]:"ENVMAP_BLENDING_ADD"};function M_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":v_[n.combine]||"ENVMAP_BLENDING_NONE"}function S_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function y_(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=p_(t),c=g_(t),d=x_(t),f=M_(t),u=S_(t),p=s_(t),m=o_(s),x=r.createProgram();let g,h,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Dr).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Dr).join(`
`),h.length>0&&(h+=`
`)):(g=[Rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Dr).join(`
`),h=[Rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Gn?i_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,t_("linearToOutputTexel",t.outputColorSpace),r_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Dr).join(`
`)),o=za(o),o=Ac(o,t),o=wc(o,t),a=za(a),a=Ac(a,t),a=wc(a,t),o=Cc(o),a=Cc(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const w=E+g+o,y=E+h+a,T=Ec(r,r.VERTEX_SHADER,w),C=Ec(r,r.FRAGMENT_SHADER,y);r.attachShader(x,T),r.attachShader(x,C),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function L(N){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(x)||"",Q=r.getShaderInfoLog(T)||"",te=r.getShaderInfoLog(C)||"",z=H.trim(),Y=Q.trim(),W=te.trim();let ne=!0,re=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,T,C);else{const ge=Tc(r,T,"vertex"),_e=Tc(r,C,"fragment");at("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+z+`
`+ge+`
`+_e)}else z!==""?Oe("WebGLProgram: Program Info Log:",z):(Y===""||W==="")&&(re=!1);re&&(N.diagnostics={runnable:ne,programLog:z,vertexShader:{log:Y,prefix:g},fragmentShader:{log:W,prefix:h}})}r.deleteShader(T),r.deleteShader(C),v=new ws(r,x),R=a_(r,x)}let v;this.getUniforms=function(){return v===void 0&&L(this),v};let R;this.getAttributes=function(){return R===void 0&&L(this),R};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(x,J0)),O},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Q0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=C,this}let E_=0;class b_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new T_(e),t.set(e,i)),i}}class T_{constructor(e){this.id=E_++,this.code=e,this.usedTimes=0}}function A_(n){return n===Bi||n===Ls||n===Is}function w_(n,e,t,i,r,s){const o=new vu,a=new b_,l=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,R,O,N,H,Q){const te=N.fog,z=H.geometry,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ne=e.get(v.envMap||Y,W),re=ne&&ne.mapping===Vs?ne.image.height:null,ge=p[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const _e=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,be=_e!==void 0?_e.length:0;let tt=0;z.morphAttributes.position!==void 0&&(tt=1),z.morphAttributes.normal!==void 0&&(tt=2),z.morphAttributes.color!==void 0&&(tt=3);let nt,ze,j,ce;if(ge){const Ee=kn[ge];nt=Ee.vertexShader,ze=Ee.fragmentShader}else{nt=v.vertexShader,ze=v.fragmentShader;const Ee=a.getVertexShaderStage(v),pt=a.getFragmentShaderStage(v);a.update(v,Ee,pt),j=Ee.id,ce=pt.id}const se=n.getRenderTarget(),Ue=n.state.buffers.depth.getReversed(),ke=H.isInstancedMesh===!0,Ie=H.isBatchedMesh===!0,Mt=!!v.map,Ye=!!v.matcap,it=!!ne,Ze=!!v.aoMap,Ke=!!v.lightMap,ot=!!v.bumpMap&&v.wireframe===!1,yt=!!v.normalMap,Ct=!!v.displacementMap,Lt=!!v.emissiveMap,mt=!!v.metalnessMap,Et=!!v.roughnessMap,U=v.anisotropy>0,Ft=v.clearcoat>0,Fe=v.dispersion>0,A=v.iridescence>0,_=v.sheen>0,B=v.transmission>0,G=U&&!!v.anisotropyMap,X=Ft&&!!v.clearcoatMap,oe=Ft&&!!v.clearcoatNormalMap,ue=Ft&&!!v.clearcoatRoughnessMap,q=A&&!!v.iridescenceMap,Z=A&&!!v.iridescenceThicknessMap,ae=_&&!!v.sheenColorMap,Ae=_&&!!v.sheenRoughnessMap,he=!!v.specularMap,pe=!!v.specularColorMap,Pe=!!v.specularIntensityMap,Ne=B&&!!v.transmissionMap,He=B&&!!v.thicknessMap,D=!!v.gradientMap,de=!!v.alphaMap,J=v.alphaTest>0,me=!!v.alphaHash,xe=!!v.extensions;let ee=Gn;v.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ee=n.toneMapping);const ie={shaderID:ge,shaderType:v.type,shaderName:v.name,vertexShader:nt,fragmentShader:ze,defines:v.defines,customVertexShaderID:j,customFragmentShaderID:ce,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ie,batchingColor:Ie&&H._colorsTexture!==null,instancing:ke,instancingColor:ke&&H.instanceColor!==null,instancingMorph:ke&&H.morphTexture!==null,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Mt,matcap:Ye,envMap:it,envMapMode:it&&ne.mapping,envMapCubeUVHeight:re,aoMap:Ze,lightMap:Ke,bumpMap:ot,normalMap:yt,displacementMap:Ct,emissiveMap:Lt,normalMapObjectSpace:yt&&v.normalMapType===ah,normalMapTangentSpace:yt&&v.normalMapType===Oa,packedNormalMap:yt&&v.normalMapType===Oa&&A_(v.normalMap.format),metalnessMap:mt,roughnessMap:Et,anisotropy:U,anisotropyMap:G,clearcoat:Ft,clearcoatMap:X,clearcoatNormalMap:oe,clearcoatRoughnessMap:ue,dispersion:Fe,iridescence:A,iridescenceMap:q,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:ae,sheenRoughnessMap:Ae,specularMap:he,specularColorMap:pe,specularIntensityMap:Pe,transmission:B,transmissionMap:Ne,thicknessMap:He,gradientMap:D,opaque:v.transparent===!1&&v.blending===ir&&v.alphaToCoverage===!1,alphaMap:de,alphaTest:J,alphaHash:me,combine:v.combine,mapUv:Mt&&m(v.map.channel),aoMapUv:Ze&&m(v.aoMap.channel),lightMapUv:Ke&&m(v.lightMap.channel),bumpMapUv:ot&&m(v.bumpMap.channel),normalMapUv:yt&&m(v.normalMap.channel),displacementMapUv:Ct&&m(v.displacementMap.channel),emissiveMapUv:Lt&&m(v.emissiveMap.channel),metalnessMapUv:mt&&m(v.metalnessMap.channel),roughnessMapUv:Et&&m(v.roughnessMap.channel),anisotropyMapUv:G&&m(v.anisotropyMap.channel),clearcoatMapUv:X&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(v.sheenRoughnessMap.channel),specularMapUv:he&&m(v.specularMap.channel),specularColorMapUv:pe&&m(v.specularColorMap.channel),specularIntensityMapUv:Pe&&m(v.specularIntensityMap.channel),transmissionMapUv:Ne&&m(v.transmissionMap.channel),thicknessMapUv:He&&m(v.thicknessMap.channel),alphaMapUv:de&&m(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(yt||U),vertexNormals:!!z.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!z.attributes.uv&&(Mt||de),fog:!!te,useFog:v.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||z.attributes.normal===void 0&&yt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ue,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:tt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:Mt&&v.map.isVideoTexture===!0&&je.getTransfer(v.map.colorSpace)===ht,decodeVideoTextureEmissive:Lt&&v.emissiveMap.isVideoTexture===!0&&je.getTransfer(v.emissiveMap.colorSpace)===ht,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ln,flipSided:v.side===hn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ie.vertexUv1s=l.has(1),ie.vertexUv2s=l.has(2),ie.vertexUv3s=l.has(3),l.clear(),ie}function g(v){const R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(const O in v.defines)R.push(O),R.push(v.defines[O]);return v.isRawShaderMaterial===!1&&(h(R,v),E(R,v),R.push(n.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function h(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function E(v,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function w(v){const R=p[v.type];let O;if(R){const N=kn[R];O=qh.clone(N.uniforms)}else O=v.uniforms;return O}function y(v,R){let O=d.get(R);return O!==void 0?++O.usedTimes:(O=new y_(n,R,v,r),c.push(O),d.set(R,O)),O}function T(v){if(--v.usedTimes===0){const R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),d.delete(v.cacheKey),v.destroy()}}function C(v){a.remove(v)}function L(){a.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:w,acquireProgram:y,releaseProgram:T,releaseShaderCache:C,programs:c,dispose:L}}function C_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function R_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Pc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Lc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,m,x,g,h){let E=n[e];return E===void 0?(E={id:u.id,object:u,geometry:p,material:m,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:h},n[e]=E):(E.id=u.id,E.object=u,E.geometry=p,E.material=m,E.materialVariant=o(u),E.groupOrder=x,E.renderOrder=u.renderOrder,E.z=g,E.group=h),e++,E}function l(u,p,m,x,g,h){const E=a(u,p,m,x,g,h);m.transmission>0?i.push(E):m.transparent===!0?r.push(E):t.push(E)}function c(u,p,m,x,g,h){const E=a(u,p,m,x,g,h);m.transmission>0?i.unshift(E):m.transparent===!0?r.unshift(E):t.unshift(E)}function d(u,p,m){t.length>1&&t.sort(u||R_),i.length>1&&i.sort(p||Pc),r.length>1&&r.sort(p||Pc),m&&(t.reverse(),i.reverse(),r.reverse())}function f(){for(let u=e,p=n.length;u<p;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:d}}function P_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Lc,n.set(i,[o])):r>=s.length?(o=new Lc,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function L_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new $e};break;case"SpotLight":t={position:new k,direction:new k,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function I_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let D_=0;function N_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function U_(n){const e=new L_,t=I_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new wt,o=new wt;function a(c){let d=0,f=0,u=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let p=0,m=0,x=0,g=0,h=0,E=0,w=0,y=0,T=0,C=0,L=0;c.sort(N_);for(let R=0,O=c.length;R<O;R++){const N=c[R],H=N.color,Q=N.intensity,te=N.distance;let z=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Bi?z=N.shadow.map.texture:z=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)d+=H.r*Q,f+=H.g*Q,u+=H.b*Q;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(N.sh.coefficients[Y],Q);L++}else if(N.isDirectionalLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const W=N.shadow,ne=t.get(N);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,i.directionalShadow[p]=ne,i.directionalShadowMap[p]=z,i.directionalShadowMatrix[p]=N.shadow.matrix,E++}i.directional[p]=Y,p++}else if(N.isSpotLight){const Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(H).multiplyScalar(Q),Y.distance=te,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,i.spot[x]=Y;const W=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,W.updateMatrices(N),N.castShadow&&C++),i.spotLightMatrix[x]=W.matrix,N.castShadow){const ne=t.get(N);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,i.spotShadow[x]=ne,i.spotShadowMap[x]=z,y++}x++}else if(N.isRectAreaLight){const Y=e.get(N);Y.color.copy(H).multiplyScalar(Q),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=Y,g++}else if(N.isPointLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const W=N.shadow,ne=t.get(N);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,ne.shadowCameraNear=W.camera.near,ne.shadowCameraFar=W.camera.far,i.pointShadow[m]=ne,i.pointShadowMap[m]=z,i.pointShadowMatrix[m]=N.shadow.matrix,w++}i.point[m]=Y,m++}else if(N.isHemisphereLight){const Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(Q),Y.groundColor.copy(N.groundColor).multiplyScalar(Q),i.hemi[h]=Y,h++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==p||v.pointLength!==m||v.spotLength!==x||v.rectAreaLength!==g||v.hemiLength!==h||v.numDirectionalShadows!==E||v.numPointShadows!==w||v.numSpotShadows!==y||v.numSpotMaps!==T||v.numLightProbes!==L)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=y+T-C,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=L,v.directionalLength=p,v.pointLength=m,v.spotLength=x,v.rectAreaLength=g,v.hemiLength=h,v.numDirectionalShadows=E,v.numPointShadows=w,v.numSpotShadows=y,v.numSpotMaps=T,v.numLightProbes=L,i.version=D_++)}function l(c,d){let f=0,u=0,p=0,m=0,x=0;const g=d.matrixWorldInverse;for(let h=0,E=c.length;h<E;h++){const w=c[h];if(w.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),f++}else if(w.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),p++}else if(w.isRectAreaLight){const y=i.rectArea[m];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(w.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(w.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(g),u++}else if(w.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:i}}function Ic(n){const e=new U_(n),t=[],i=[],r=[];function s(u){f.camera=u,t.length=0,i.length=0,r.length=0}function o(u){t.push(u)}function a(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:d,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function F_(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Ic(n),e.set(r,[a])):s>=o.length?(a=new Ic(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const O_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,B_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,k_=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],z_=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Dc=new wt,Rr=new k,Oo=new k;function H_(n,e,t){let i=new rl;const r=new st,s=new st,o=new At,a=new Zh,l=new Jh,c={},d=t.maxTextureSize,f={[xi]:hn,[hn]:xi,[Ln]:Ln},u=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:O_,fragmentShader:B_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new yn;m.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Sn(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ys;let h=this.type;this.render=function(C,L,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;this.type===Bf&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ys);const R=n.getRenderTarget(),O=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),H=n.state;H.setBlending(ri),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const Q=h!==this.type;Q&&L.traverse(function(te){te.material&&(Array.isArray(te.material)?te.material.forEach(z=>z.needsUpdate=!0):te.material.needsUpdate=!0)});for(let te=0,z=C.length;te<z;te++){const Y=C[te],W=Y.shadow;if(W===void 0){Oe("WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const ne=W.getFrameExtents();r.multiply(ne),s.copy(W.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/ne.x),r.x=s.x*ne.x,W.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/ne.y),r.y=s.y*ne.y,W.mapSize.y=s.y));const re=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=re,W.map===null||Q===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Lr){if(Y.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Vn(r.x,r.y,{format:Bi,type:oi,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),W.map.texture.name=Y.name+".shadowMap",W.map.depthTexture=new cr(r.x,r.y,zn),W.map.depthTexture.name=Y.name+".shadowMapDepth",W.map.depthTexture.format=ai,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=qt,W.map.depthTexture.magFilter=qt}else Y.isPointLight?(W.map=new Du(r.x),W.map.depthTexture=new Wh(r.x,Xn)):(W.map=new Vn(r.x,r.y),W.map.depthTexture=new cr(r.x,r.y,Xn)),W.map.depthTexture.name=Y.name+".shadowMap",W.map.depthTexture.format=ai,this.type===ys?(W.map.depthTexture.compareFunction=re?tl:el,W.map.depthTexture.minFilter=Qt,W.map.depthTexture.magFilter=Qt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=qt,W.map.depthTexture.magFilter=qt);W.camera.updateProjectionMatrix()}const ge=W.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<ge;_e++){if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,_e),n.clear();else{_e===0&&(n.setRenderTarget(W.map),n.clear());const be=W.getViewport(_e);o.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),H.viewport(o)}if(Y.isPointLight){const be=W.camera,tt=W.matrix,nt=Y.distance||be.far;nt!==be.far&&(be.far=nt,be.updateProjectionMatrix()),Rr.setFromMatrixPosition(Y.matrixWorld),be.position.copy(Rr),Oo.copy(be.position),Oo.add(k_[_e]),be.up.copy(z_[_e]),be.lookAt(Oo),be.updateMatrixWorld(),tt.makeTranslation(-Rr.x,-Rr.y,-Rr.z),Dc.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Dc,be.coordinateSystem,be.reversedDepth)}else W.updateMatrices(Y);i=W.getFrustum(),y(L,v,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===Lr&&E(W,v),W.needsUpdate=!1}h=this.type,g.needsUpdate=!1,n.setRenderTarget(R,O,N)};function E(C,L){const v=e.update(x);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Vn(r.x,r.y,{format:Bi,type:oi})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(L,null,v,u,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(L,null,v,p,x,null)}function w(C,L,v,R){let O=null;const N=v.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)O=N;else if(O=v.isPointLight===!0?l:a,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const H=O.uuid,Q=L.uuid;let te=c[H];te===void 0&&(te={},c[H]=te);let z=te[Q];z===void 0&&(z=O.clone(),te[Q]=z,L.addEventListener("dispose",T)),O=z}if(O.visible=L.visible,O.wireframe=L.wireframe,R===Lr?O.side=L.shadowSide!==null?L.shadowSide:L.side:O.side=L.shadowSide!==null?L.shadowSide:f[L.side],O.alphaMap=L.alphaMap,O.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,O.map=L.map,O.clipShadows=L.clipShadows,O.clippingPlanes=L.clippingPlanes,O.clipIntersection=L.clipIntersection,O.displacementMap=L.displacementMap,O.displacementScale=L.displacementScale,O.displacementBias=L.displacementBias,O.wireframeLinewidth=L.wireframeLinewidth,O.linewidth=L.linewidth,v.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const H=n.properties.get(O);H.light=v}return O}function y(C,L,v,R,O){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&O===Lr)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,C.matrixWorld);const Q=e.update(C),te=C.material;if(Array.isArray(te)){const z=Q.groups;for(let Y=0,W=z.length;Y<W;Y++){const ne=z[Y],re=te[ne.materialIndex];if(re&&re.visible){const ge=w(C,re,R,O);C.onBeforeShadow(n,C,L,v,Q,ge,ne),n.renderBufferDirect(v,null,Q,ge,C,ne),C.onAfterShadow(n,C,L,v,Q,ge,ne)}}}else if(te.visible){const z=w(C,te,R,O);C.onBeforeShadow(n,C,L,v,Q,z,null),n.renderBufferDirect(v,null,Q,z,C,null),C.onAfterShadow(n,C,L,v,Q,z,null)}}const H=C.children;for(let Q=0,te=H.length;Q<te;Q++)y(H[Q],L,v,R,O)}function T(C){C.target.removeEventListener("dispose",T);for(const v in c){const R=c[v],O=C.target.uuid;O in R&&(R[O].dispose(),delete R[O])}}}function G_(n,e){function t(){let D=!1;const de=new At;let J=null;const me=new At(0,0,0,0);return{setMask:function(xe){J!==xe&&!D&&(n.colorMask(xe,xe,xe,xe),J=xe)},setLocked:function(xe){D=xe},setClear:function(xe,ee,ie,Ee,pt){pt===!0&&(xe*=Ee,ee*=Ee,ie*=Ee),de.set(xe,ee,ie,Ee),me.equals(de)===!1&&(n.clearColor(xe,ee,ie,Ee),me.copy(de))},reset:function(){D=!1,J=null,me.set(-1,0,0,0)}}}function i(){let D=!1,de=!1,J=null,me=null,xe=null;return{setReversed:function(ee){if(de!==ee){const ie=e.get("EXT_clip_control");ee?ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.ZERO_TO_ONE_EXT):ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.NEGATIVE_ONE_TO_ONE_EXT),de=ee;const Ee=xe;xe=null,this.setClear(Ee)}},getReversed:function(){return de},setTest:function(ee){ee?se(n.DEPTH_TEST):Ue(n.DEPTH_TEST)},setMask:function(ee){J!==ee&&!D&&(n.depthMask(ee),J=ee)},setFunc:function(ee){if(de&&(ee=_h[ee]),me!==ee){switch(ee){case Qo:n.depthFunc(n.NEVER);break;case jo:n.depthFunc(n.ALWAYS);break;case ea:n.depthFunc(n.LESS);break;case ar:n.depthFunc(n.LEQUAL);break;case ta:n.depthFunc(n.EQUAL);break;case na:n.depthFunc(n.GEQUAL);break;case ia:n.depthFunc(n.GREATER);break;case ra:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=ee}},setLocked:function(ee){D=ee},setClear:function(ee){xe!==ee&&(xe=ee,de&&(ee=1-ee),n.clearDepth(ee))},reset:function(){D=!1,J=null,me=null,xe=null,de=!1}}}function r(){let D=!1,de=null,J=null,me=null,xe=null,ee=null,ie=null,Ee=null,pt=null;return{setTest:function(lt){D||(lt?se(n.STENCIL_TEST):Ue(n.STENCIL_TEST))},setMask:function(lt){de!==lt&&!D&&(n.stencilMask(lt),de=lt)},setFunc:function(lt,ln,cn){(J!==lt||me!==ln||xe!==cn)&&(n.stencilFunc(lt,ln,cn),J=lt,me=ln,xe=cn)},setOp:function(lt,ln,cn){(ee!==lt||ie!==ln||Ee!==cn)&&(n.stencilOp(lt,ln,cn),ee=lt,ie=ln,Ee=cn)},setLocked:function(lt){D=lt},setClear:function(lt){pt!==lt&&(n.clearStencil(lt),pt=lt)},reset:function(){D=!1,de=null,J=null,me=null,xe=null,ee=null,ie=null,Ee=null,pt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let d={},f={},u={},p=new WeakMap,m=[],x=null,g=!1,h=null,E=null,w=null,y=null,T=null,C=null,L=null,v=new $e(0,0,0),R=0,O=!1,N=null,H=null,Q=null,te=null,z=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),W=ne>=1):re.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),W=ne>=2);let ge=null,_e={};const be=n.getParameter(n.SCISSOR_BOX),tt=n.getParameter(n.VIEWPORT),nt=new At().fromArray(be),ze=new At().fromArray(tt);function j(D,de,J,me){const xe=new Uint8Array(4),ee=n.createTexture();n.bindTexture(D,ee),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ie=0;ie<J;ie++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(de+ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return ee}const ce={};ce[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),ce[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ce[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(n.DEPTH_TEST),o.setFunc(ar),ot(!1),yt(Pl),se(n.CULL_FACE),Ze(ri);function se(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function Ue(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function ke(D,de){return u[D]!==de?(n.bindFramebuffer(D,de),u[D]=de,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=de),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=de),!0):!1}function Ie(D,de){let J=m,me=!1;if(D){J=p.get(de),J===void 0&&(J=[],p.set(de,J));const xe=D.textures;if(J.length!==xe.length||J[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,ie=xe.length;ee<ie;ee++)J[ee]=n.COLOR_ATTACHMENT0+ee;J.length=xe.length,me=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,me=!0);me&&n.drawBuffers(J)}function Mt(D){return x!==D?(n.useProgram(D),x=D,!0):!1}const Ye={[Di]:n.FUNC_ADD,[zf]:n.FUNC_SUBTRACT,[Hf]:n.FUNC_REVERSE_SUBTRACT};Ye[Gf]=n.MIN,Ye[Vf]=n.MAX;const it={[Wf]:n.ZERO,[Xf]:n.ONE,[qf]:n.SRC_COLOR,[Zo]:n.SRC_ALPHA,[Qf]:n.SRC_ALPHA_SATURATE,[Zf]:n.DST_COLOR,[Yf]:n.DST_ALPHA,[$f]:n.ONE_MINUS_SRC_COLOR,[Jo]:n.ONE_MINUS_SRC_ALPHA,[Jf]:n.ONE_MINUS_DST_COLOR,[Kf]:n.ONE_MINUS_DST_ALPHA,[jf]:n.CONSTANT_COLOR,[eh]:n.ONE_MINUS_CONSTANT_COLOR,[th]:n.CONSTANT_ALPHA,[nh]:n.ONE_MINUS_CONSTANT_ALPHA};function Ze(D,de,J,me,xe,ee,ie,Ee,pt,lt){if(D===ri){g===!0&&(Ue(n.BLEND),g=!1);return}if(g===!1&&(se(n.BLEND),g=!0),D!==kf){if(D!==h||lt!==O){if((E!==Di||T!==Di)&&(n.blendEquation(n.FUNC_ADD),E=Di,T=Di),lt)switch(D){case ir:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ll:n.blendFunc(n.ONE,n.ONE);break;case Il:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:at("WebGLState: Invalid blending: ",D);break}else switch(D){case ir:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ll:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Il:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dl:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",D);break}w=null,y=null,C=null,L=null,v.set(0,0,0),R=0,h=D,O=lt}return}xe=xe||de,ee=ee||J,ie=ie||me,(de!==E||xe!==T)&&(n.blendEquationSeparate(Ye[de],Ye[xe]),E=de,T=xe),(J!==w||me!==y||ee!==C||ie!==L)&&(n.blendFuncSeparate(it[J],it[me],it[ee],it[ie]),w=J,y=me,C=ee,L=ie),(Ee.equals(v)===!1||pt!==R)&&(n.blendColor(Ee.r,Ee.g,Ee.b,pt),v.copy(Ee),R=pt),h=D,O=!1}function Ke(D,de){D.side===Ln?Ue(n.CULL_FACE):se(n.CULL_FACE);let J=D.side===hn;de&&(J=!J),ot(J),D.blending===ir&&D.transparent===!1?Ze(ri):Ze(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const me=D.stencilWrite;a.setTest(me),me&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Lt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):Ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function ot(D){N!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),N=D)}function yt(D){D!==Ff?(se(n.CULL_FACE),D!==H&&(D===Pl?n.cullFace(n.BACK):D===Of?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ue(n.CULL_FACE),H=D}function Ct(D){D!==Q&&(W&&n.lineWidth(D),Q=D)}function Lt(D,de,J){D?(se(n.POLYGON_OFFSET_FILL),(te!==de||z!==J)&&(te=de,z=J,o.getReversed()&&(de=-de),n.polygonOffset(de,J))):Ue(n.POLYGON_OFFSET_FILL)}function mt(D){D?se(n.SCISSOR_TEST):Ue(n.SCISSOR_TEST)}function Et(D){D===void 0&&(D=n.TEXTURE0+Y-1),ge!==D&&(n.activeTexture(D),ge=D)}function U(D,de,J){J===void 0&&(ge===null?J=n.TEXTURE0+Y-1:J=ge);let me=_e[J];me===void 0&&(me={type:void 0,texture:void 0},_e[J]=me),(me.type!==D||me.texture!==de)&&(ge!==J&&(n.activeTexture(J),ge=J),n.bindTexture(D,de||ce[D]),me.type=D,me.texture=de)}function Ft(){const D=_e[ge];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Fe(){try{n.compressedTexImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function _(){try{n.texSubImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function B(){try{n.texSubImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function X(){try{n.compressedTexSubImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function oe(){try{n.texStorage2D(...arguments)}catch(D){at("WebGLState:",D)}}function ue(){try{n.texStorage3D(...arguments)}catch(D){at("WebGLState:",D)}}function q(){try{n.texImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function Z(){try{n.texImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function ae(D){return f[D]!==void 0?f[D]:n.getParameter(D)}function Ae(D,de){f[D]!==de&&(n.pixelStorei(D,de),f[D]=de)}function he(D){nt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),nt.copy(D))}function pe(D){ze.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),ze.copy(D))}function Pe(D,de){let J=c.get(de);J===void 0&&(J=new WeakMap,c.set(de,J));let me=J.get(D);me===void 0&&(me=n.getUniformBlockIndex(de,D.name),J.set(D,me))}function Ne(D,de){const me=c.get(de).get(D);l.get(de)!==me&&(n.uniformBlockBinding(de,me,D.__bindingPointIndex),l.set(de,me))}function He(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},ge=null,_e={},u={},p=new WeakMap,m=[],x=null,g=!1,h=null,E=null,w=null,y=null,T=null,C=null,L=null,v=new $e(0,0,0),R=0,O=!1,N=null,H=null,Q=null,te=null,z=null,nt.set(0,0,n.canvas.width,n.canvas.height),ze.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Ue,bindFramebuffer:ke,drawBuffers:Ie,useProgram:Mt,setBlending:Ze,setMaterial:Ke,setFlipSided:ot,setCullFace:yt,setLineWidth:Ct,setPolygonOffset:Lt,setScissorTest:mt,activeTexture:Et,bindTexture:U,unbindTexture:Ft,compressedTexImage2D:Fe,compressedTexImage3D:A,texImage2D:q,texImage3D:Z,pixelStorei:Ae,getParameter:ae,updateUBOMapping:Pe,uniformBlockBinding:Ne,texStorage2D:oe,texStorage3D:ue,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:G,compressedTexSubImage3D:X,scissor:he,viewport:pe,reset:He}}function V_(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new st,d=new WeakMap,f=new Set;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,_){return m?new OffscreenCanvas(A,_):Us("canvas")}function g(A,_,B){let G=1;const X=Fe(A);if((X.width>B||X.height>B)&&(G=B/Math.max(X.width,X.height)),G<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const oe=Math.floor(G*X.width),ue=Math.floor(G*X.height);u===void 0&&(u=x(oe,ue));const q=_?x(oe,ue):u;return q.width=oe,q.height=ue,q.getContext("2d").drawImage(A,0,0,oe,ue),Oe("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+oe+"x"+ue+")."),q}else return"data"in A&&Oe("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),A;return A}function h(A){return A.generateMipmaps}function E(A){n.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(A,_,B,G,X,oe=!1){if(A!==null){if(n[A]!==void 0)return n[A];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ue;G&&(ue=e.get("EXT_texture_norm16"),ue||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=_;if(_===n.RED&&(B===n.FLOAT&&(q=n.R32F),B===n.HALF_FLOAT&&(q=n.R16F),B===n.UNSIGNED_BYTE&&(q=n.R8),B===n.UNSIGNED_SHORT&&ue&&(q=ue.R16_EXT),B===n.SHORT&&ue&&(q=ue.R16_SNORM_EXT)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.R8UI),B===n.UNSIGNED_SHORT&&(q=n.R16UI),B===n.UNSIGNED_INT&&(q=n.R32UI),B===n.BYTE&&(q=n.R8I),B===n.SHORT&&(q=n.R16I),B===n.INT&&(q=n.R32I)),_===n.RG&&(B===n.FLOAT&&(q=n.RG32F),B===n.HALF_FLOAT&&(q=n.RG16F),B===n.UNSIGNED_BYTE&&(q=n.RG8),B===n.UNSIGNED_SHORT&&ue&&(q=ue.RG16_EXT),B===n.SHORT&&ue&&(q=ue.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RG8UI),B===n.UNSIGNED_SHORT&&(q=n.RG16UI),B===n.UNSIGNED_INT&&(q=n.RG32UI),B===n.BYTE&&(q=n.RG8I),B===n.SHORT&&(q=n.RG16I),B===n.INT&&(q=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGB8UI),B===n.UNSIGNED_SHORT&&(q=n.RGB16UI),B===n.UNSIGNED_INT&&(q=n.RGB32UI),B===n.BYTE&&(q=n.RGB8I),B===n.SHORT&&(q=n.RGB16I),B===n.INT&&(q=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),B===n.UNSIGNED_INT&&(q=n.RGBA32UI),B===n.BYTE&&(q=n.RGBA8I),B===n.SHORT&&(q=n.RGBA16I),B===n.INT&&(q=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_SHORT&&ue&&(q=ue.RGB16_EXT),B===n.SHORT&&ue&&(q=ue.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),_===n.RGBA){const Z=oe?Ns:je.getTransfer(X);B===n.FLOAT&&(q=n.RGBA32F),B===n.HALF_FLOAT&&(q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(q=Z===ht?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ue&&(q=ue.RGBA16_EXT),B===n.SHORT&&ue&&(q=ue.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function T(A,_){let B;return A?_===null||_===Xn||_===kr?B=n.DEPTH24_STENCIL8:_===zn?B=n.DEPTH32F_STENCIL8:_===Br&&(B=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Xn||_===kr?B=n.DEPTH_COMPONENT24:_===zn?B=n.DEPTH_COMPONENT32F:_===Br&&(B=n.DEPTH_COMPONENT16),B}function C(A,_){return h(A)===!0||A.isFramebufferTexture&&A.minFilter!==qt&&A.minFilter!==Qt?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function L(A){const _=A.target;_.removeEventListener("dispose",L),R(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function v(A){const _=A.target;_.removeEventListener("dispose",v),N(_)}function R(A){const _=i.get(A);if(_.__webglInit===void 0)return;const B=A.source,G=p.get(B);if(G){const X=G[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&O(A),Object.keys(G).length===0&&p.delete(B)}i.remove(A)}function O(A){const _=i.get(A);n.deleteTexture(_.__webglTexture);const B=A.source,G=p.get(B);delete G[_.__cacheKey],o.memory.textures--}function N(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let X=0;X<_.__webglFramebuffer[G].length;X++)n.deleteFramebuffer(_.__webglFramebuffer[G][X]);else n.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)n.deleteFramebuffer(_.__webglFramebuffer[G]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=A.textures;for(let G=0,X=B.length;G<X;G++){const oe=i.get(B[G]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),o.memory.textures--),i.remove(B[G])}i.remove(A)}let H=0;function Q(){H=0}function te(){return H}function z(A){H=A}function Y(){const A=H;return A>=r.maxTextures&&Oe("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),H+=1,A}function W(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function ne(A,_){const B=i.get(A);if(A.isVideoTexture&&U(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&B.__version!==A.version){const G=A.image;if(G===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(B,A,_);return}}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function re(A,_){const B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Ue(B,A,_);return}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function ge(A,_){const B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Ue(B,A,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function _e(A,_){const B=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&B.__version!==A.version){ke(B,A,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}const be={[sa]:n.REPEAT,[ii]:n.CLAMP_TO_EDGE,[oa]:n.MIRRORED_REPEAT},tt={[qt]:n.NEAREST,[sh]:n.NEAREST_MIPMAP_NEAREST,[Yr]:n.NEAREST_MIPMAP_LINEAR,[Qt]:n.LINEAR,[ro]:n.LINEAR_MIPMAP_NEAREST,[Ui]:n.LINEAR_MIPMAP_LINEAR},nt={[lh]:n.NEVER,[hh]:n.ALWAYS,[ch]:n.LESS,[el]:n.LEQUAL,[uh]:n.EQUAL,[tl]:n.GEQUAL,[dh]:n.GREATER,[fh]:n.NOTEQUAL};function ze(A,_){if(_.type===zn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Qt||_.magFilter===ro||_.magFilter===Yr||_.magFilter===Ui||_.minFilter===Qt||_.minFilter===ro||_.minFilter===Yr||_.minFilter===Ui)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,be[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,be[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,be[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,tt[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,tt[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,nt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===qt||_.minFilter!==Yr&&_.minFilter!==Ui||_.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function j(A,_){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",L));const G=_.source;let X=p.get(G);X===void 0&&(X={},p.set(G,X));const oe=W(_);if(oe!==A.__cacheKey){X[oe]===void 0&&(X[oe]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),X[oe].usedTimes++;const ue=X[A.__cacheKey];ue!==void 0&&(X[A.__cacheKey].usedTimes--,ue.usedTimes===0&&O(_)),A.__cacheKey=oe,A.__webglTexture=X[oe].texture}return B}function ce(A,_,B){return Math.floor(Math.floor(A/B)/_)}function se(A,_,B,G){const oe=A.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,G,_.data);else{oe.sort((Ae,he)=>Ae.start-he.start);let ue=0;for(let Ae=1;Ae<oe.length;Ae++){const he=oe[ue],pe=oe[Ae],Pe=he.start+he.count,Ne=ce(pe.start,_.width,4),He=ce(he.start,_.width,4);pe.start<=Pe+1&&Ne===He&&ce(pe.start+pe.count-1,_.width,4)===Ne?he.count=Math.max(he.count,pe.start+pe.count-he.start):(++ue,oe[ue]=pe)}oe.length=ue+1;const q=t.getParameter(n.UNPACK_ROW_LENGTH),Z=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Ae=0,he=oe.length;Ae<he;Ae++){const pe=oe[Ae],Pe=Math.floor(pe.start/4),Ne=Math.ceil(pe.count/4),He=Pe%_.width,D=Math.floor(Pe/_.width),de=Ne,J=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,He),t.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,He,D,de,J,B,G,_.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function Ue(A,_,B){let G=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=n.TEXTURE_3D);const X=j(A,_),oe=_.source;t.bindTexture(G,A.__webglTexture,n.TEXTURE0+B);const ue=i.get(oe);if(oe.version!==ue.__version||X===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const J=je.getPrimaries(je.workingColorSpace),me=_.colorSpace===mi?null:je.getPrimaries(_.colorSpace),xe=_.colorSpace===mi||J===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=g(_.image,!1,r.maxTextureSize);Z=Ft(_,Z);const ae=s.convert(_.format,_.colorSpace),Ae=s.convert(_.type);let he=y(_.internalFormat,ae,Ae,_.normalized,_.colorSpace,_.isVideoTexture);ze(G,_);let pe;const Pe=_.mipmaps,Ne=_.isVideoTexture!==!0,He=ue.__version===void 0||X===!0,D=oe.dataReady,de=C(_,Z);if(_.isDepthTexture)he=T(_.format===Fi,_.type),He&&(Ne?t.texStorage2D(n.TEXTURE_2D,1,he,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,he,Z.width,Z.height,0,ae,Ae,null));else if(_.isDataTexture)if(Pe.length>0){Ne&&He&&t.texStorage2D(n.TEXTURE_2D,de,he,Pe[0].width,Pe[0].height);for(let J=0,me=Pe.length;J<me;J++)pe=Pe[J],Ne?D&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,pe.width,pe.height,ae,Ae,pe.data):t.texImage2D(n.TEXTURE_2D,J,he,pe.width,pe.height,0,ae,Ae,pe.data);_.generateMipmaps=!1}else Ne?(He&&t.texStorage2D(n.TEXTURE_2D,de,he,Z.width,Z.height),D&&se(_,Z,ae,Ae)):t.texImage2D(n.TEXTURE_2D,0,he,Z.width,Z.height,0,ae,Ae,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ne&&He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,he,Pe[0].width,Pe[0].height,Z.depth);for(let J=0,me=Pe.length;J<me;J++)if(pe=Pe[J],_.format!==Dn)if(ae!==null)if(Ne){if(D)if(_.layerUpdates.size>0){const xe=uc(pe.width,pe.height,_.format,_.type);for(const ee of _.layerUpdates){const ie=pe.data.subarray(ee*xe/pe.data.BYTES_PER_ELEMENT,(ee+1)*xe/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,ee,pe.width,pe.height,1,ae,ie)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,pe.width,pe.height,Z.depth,ae,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,he,pe.width,pe.height,Z.depth,0,pe.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,pe.width,pe.height,Z.depth,ae,Ae,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,he,pe.width,pe.height,Z.depth,0,ae,Ae,pe.data)}else{Ne&&He&&t.texStorage2D(n.TEXTURE_2D,de,he,Pe[0].width,Pe[0].height);for(let J=0,me=Pe.length;J<me;J++)pe=Pe[J],_.format!==Dn?ae!==null?Ne?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,pe.width,pe.height,ae,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,J,he,pe.width,pe.height,0,pe.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?D&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,pe.width,pe.height,ae,Ae,pe.data):t.texImage2D(n.TEXTURE_2D,J,he,pe.width,pe.height,0,ae,Ae,pe.data)}else if(_.isDataArrayTexture)if(Ne){if(He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,he,Z.width,Z.height,Z.depth),D)if(_.layerUpdates.size>0){const J=uc(Z.width,Z.height,_.format,_.type);for(const me of _.layerUpdates){const xe=Z.data.subarray(me*J/Z.data.BYTES_PER_ELEMENT,(me+1)*J/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,Z.width,Z.height,1,ae,Ae,xe)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ae,Ae,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,he,Z.width,Z.height,Z.depth,0,ae,Ae,Z.data);else if(_.isData3DTexture)Ne?(He&&t.texStorage3D(n.TEXTURE_3D,de,he,Z.width,Z.height,Z.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ae,Ae,Z.data)):t.texImage3D(n.TEXTURE_3D,0,he,Z.width,Z.height,Z.depth,0,ae,Ae,Z.data);else if(_.isFramebufferTexture){if(He)if(Ne)t.texStorage2D(n.TEXTURE_2D,de,he,Z.width,Z.height);else{let J=Z.width,me=Z.height;for(let xe=0;xe<de;xe++)t.texImage2D(n.TEXTURE_2D,xe,he,J,me,0,ae,Ae,null),J>>=1,me>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const J=n.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Z.parentNode!==J){J.appendChild(Z),f.add(_),J.onpaint=me=>{const xe=me.changedElements;for(const ee of f)xe.includes(ee.image)&&(ee.needsUpdate=!0)},J.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{const xe=n.RGBA,ee=n.RGBA,ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,xe,ee,ie,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Ne&&He){const J=Fe(Pe[0]);t.texStorage2D(n.TEXTURE_2D,de,he,J.width,J.height)}for(let J=0,me=Pe.length;J<me;J++)pe=Pe[J],Ne?D&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ae,Ae,pe):t.texImage2D(n.TEXTURE_2D,J,he,ae,Ae,pe);_.generateMipmaps=!1}else if(Ne){if(He){const J=Fe(Z);t.texStorage2D(n.TEXTURE_2D,de,he,J.width,J.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,Ae,Z)}else t.texImage2D(n.TEXTURE_2D,0,he,ae,Ae,Z);h(_)&&E(G),ue.__version=oe.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function ke(A,_,B){if(_.image.length!==6)return;const G=j(A,_),X=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+B);const oe=i.get(X);if(X.version!==oe.__version||G===!0){t.activeTexture(n.TEXTURE0+B);const ue=je.getPrimaries(je.workingColorSpace),q=_.colorSpace===mi?null:je.getPrimaries(_.colorSpace),Z=_.colorSpace===mi||ue===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const ae=_.isCompressedTexture||_.image[0].isCompressedTexture,Ae=_.image[0]&&_.image[0].isDataTexture,he=[];for(let ee=0;ee<6;ee++)!ae&&!Ae?he[ee]=g(_.image[ee],!0,r.maxCubemapSize):he[ee]=Ae?_.image[ee].image:_.image[ee],he[ee]=Ft(_,he[ee]);const pe=he[0],Pe=s.convert(_.format,_.colorSpace),Ne=s.convert(_.type),He=y(_.internalFormat,Pe,Ne,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,de=oe.__version===void 0||G===!0,J=X.dataReady;let me=C(_,pe);ze(n.TEXTURE_CUBE_MAP,_);let xe;if(ae){D&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,He,pe.width,pe.height);for(let ee=0;ee<6;ee++){xe=he[ee].mipmaps;for(let ie=0;ie<xe.length;ie++){const Ee=xe[ie];_.format!==Dn?Pe!==null?D?J&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,0,0,Ee.width,Ee.height,Pe,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,He,Ee.width,Ee.height,0,Ee.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,0,0,Ee.width,Ee.height,Pe,Ne,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,He,Ee.width,Ee.height,0,Pe,Ne,Ee.data)}}}else{if(xe=_.mipmaps,D&&de){xe.length>0&&me++;const ee=Fe(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,He,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(Ae){D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,he[ee].width,he[ee].height,Pe,Ne,he[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,He,he[ee].width,he[ee].height,0,Pe,Ne,he[ee].data);for(let ie=0;ie<xe.length;ie++){const pt=xe[ie].image[ee].image;D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,0,0,pt.width,pt.height,Pe,Ne,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,He,pt.width,pt.height,0,Pe,Ne,pt.data)}}else{D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Pe,Ne,he[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,He,Pe,Ne,he[ee]);for(let ie=0;ie<xe.length;ie++){const Ee=xe[ie];D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,0,0,Pe,Ne,Ee.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,He,Pe,Ne,Ee.image[ee])}}}h(_)&&E(n.TEXTURE_CUBE_MAP),oe.__version=X.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Ie(A,_,B,G,X,oe){const ue=s.convert(B.format,B.colorSpace),q=s.convert(B.type),Z=y(B.internalFormat,ue,q,B.normalized,B.colorSpace),ae=i.get(_),Ae=i.get(B);if(Ae.__renderTarget=_,!ae.__hasExternalTextures){const he=Math.max(1,_.width>>oe),pe=Math.max(1,_.height>>oe);X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?t.texImage3D(X,oe,Z,he,pe,_.depth,0,ue,q,null):t.texImage2D(X,oe,Z,he,pe,0,ue,q,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Et(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,X,Ae.__webglTexture,0,mt(_)):(X===n.TEXTURE_2D||X>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,X,Ae.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Mt(A,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){const G=_.depthTexture,X=G&&G.isDepthTexture?G.type:null,oe=T(_.stencilBuffer,X),ue=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Et(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(_),oe,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(_),oe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,oe,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,A)}else{const G=_.textures;for(let X=0;X<G.length;X++){const oe=G[X],ue=s.convert(oe.format,oe.colorSpace),q=s.convert(oe.type),Z=y(oe.internalFormat,ue,q,oe.normalized,oe.colorSpace);Et(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(_),Z,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ye(A,_,B){const G=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const X=i.get(_.depthTexture);if(X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),G){if(X.__webglInit===void 0&&(X.__webglInit=!0,_.depthTexture.addEventListener("dispose",L)),X.__webglTexture===void 0){X.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),ze(n.TEXTURE_CUBE_MAP,_.depthTexture);const ae=s.convert(_.depthTexture.format),Ae=s.convert(_.depthTexture.type);let he;_.depthTexture.format===ai?he=n.DEPTH_COMPONENT24:_.depthTexture.format===Fi&&(he=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,he,_.width,_.height,0,ae,Ae,null)}}else ne(_.depthTexture,0);const oe=X.__webglTexture,ue=mt(_),q=G?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,Z=_.depthTexture.format===Fi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===ai)Et(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,q,oe,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,Z,q,oe,0);else if(_.depthTexture.format===Fi)Et(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,q,oe,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,Z,q,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(A){const _=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const G=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){const X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",X)};G.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=G}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let G=0;G<6;G++)Ye(_.__webglFramebuffer[G],A,G);else{const G=A.texture.mipmaps;G&&G.length>0?Ye(_.__webglFramebuffer[0],A,0):Ye(_.__webglFramebuffer,A,0)}else if(B){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=n.createRenderbuffer(),Mt(_.__webglDepthbuffer[G],A,!1);else{const X=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}else{const G=A.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Mt(_.__webglDepthbuffer,A,!1);else{const X=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ze(A,_,B){const G=i.get(A);_!==void 0&&Ie(G.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&it(A)}function Ke(A){const _=A.texture,B=i.get(A),G=i.get(_);A.addEventListener("dispose",v);const X=A.textures,oe=A.isWebGLCubeRenderTarget===!0,ue=X.length>1;if(ue||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=_.version,o.memory.textures++),oe){B.__webglFramebuffer=[];for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[q]=[];for(let Z=0;Z<_.mipmaps.length;Z++)B.__webglFramebuffer[q][Z]=n.createFramebuffer()}else B.__webglFramebuffer[q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let q=0;q<_.mipmaps.length;q++)B.__webglFramebuffer[q]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ue)for(let q=0,Z=X.length;q<Z;q++){const ae=i.get(X[q]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Et(A)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let q=0;q<X.length;q++){const Z=X[q];B.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[q]);const ae=s.convert(Z.format,Z.colorSpace),Ae=s.convert(Z.type),he=y(Z.internalFormat,ae,Ae,Z.normalized,Z.colorSpace,A.isXRRenderTarget===!0),pe=mt(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,he,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,B.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Mt(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),ze(n.TEXTURE_CUBE_MAP,_);for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Ie(B.__webglFramebuffer[q][Z],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Z);else Ie(B.__webglFramebuffer[q],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);h(_)&&E(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let q=0,Z=X.length;q<Z;q++){const ae=X[q],Ae=i.get(ae);let he=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(he=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,Ae.__webglTexture),ze(he,ae),Ie(B.__webglFramebuffer,A,ae,n.COLOR_ATTACHMENT0+q,he,0),h(ae)&&E(he)}t.unbindTexture()}else{let q=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(q=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(q,G.__webglTexture),ze(q,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Ie(B.__webglFramebuffer[Z],A,_,n.COLOR_ATTACHMENT0,q,Z);else Ie(B.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,q,0);h(_)&&E(q),t.unbindTexture()}A.depthBuffer&&it(A)}function ot(A){const _=A.textures;for(let B=0,G=_.length;B<G;B++){const X=_[B];if(h(X)){const oe=w(A),ue=i.get(X).__webglTexture;t.bindTexture(oe,ue),E(oe),t.unbindTexture()}}}const yt=[],Ct=[];function Lt(A){if(A.samples>0){if(Et(A)===!1){const _=A.textures,B=A.width,G=A.height;let X=n.COLOR_BUFFER_BIT;const oe=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(A),q=_.length>1;if(q)for(let ae=0;ae<_.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const Z=A.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let ae=0;ae<_.length;ae++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(X|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(X|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[ae]);const Ae=i.get(_[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,B,G,0,0,B,G,X,n.NEAREST),l===!0&&(yt.length=0,Ct.length=0,yt.push(n.COLOR_ATTACHMENT0+ae),A.depthBuffer&&A.resolveDepthBuffer===!1&&(yt.push(oe),Ct.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ct)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,yt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let ae=0;ae<_.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,ue.__webglColorRenderbuffer[ae]);const Ae=i.get(_[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function mt(A){return Math.min(r.maxSamples,A.samples)}function Et(A){const _=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(A){const _=o.render.frame;d.get(A)!==_&&(d.set(A,_),A.update())}function Ft(A,_){const B=A.colorSpace,G=A.format,X=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Ds&&B!==mi&&(je.getTransfer(B)===ht?(G!==Dn||X!==xn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",B)),_}function Fe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=Q,this.getTextureUnits=te,this.setTextureUnits=z,this.setTexture2D=ne,this.setTexture2DArray=re,this.setTexture3D=ge,this.setTextureCube=_e,this.rebindTextures=Ze,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=Et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function W_(n,e){function t(i,r=mi){let s;const o=je.getTransfer(r);if(i===xn)return n.UNSIGNED_BYTE;if(i===Ka)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Za)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===hu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===uu)return n.BYTE;if(i===du)return n.SHORT;if(i===Br)return n.UNSIGNED_SHORT;if(i===Ya)return n.INT;if(i===Xn)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===oi)return n.HALF_FLOAT;if(i===pu)return n.ALPHA;if(i===mu)return n.RGB;if(i===Dn)return n.RGBA;if(i===ai)return n.DEPTH_COMPONENT;if(i===Fi)return n.DEPTH_STENCIL;if(i===gu)return n.RED;if(i===Ja)return n.RED_INTEGER;if(i===Bi)return n.RG;if(i===Qa)return n.RG_INTEGER;if(i===ja)return n.RGBA_INTEGER;if(i===Es||i===bs||i===Ts||i===As)if(o===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Es)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===As)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Es)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ts)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===As)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===aa||i===la||i===ca||i===ua)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===aa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===la)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ca)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ua)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===da||i===fa||i===ha||i===pa||i===ma||i===Ls||i===ga)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===da||i===fa)return o===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ha)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===pa)return s.COMPRESSED_R11_EAC;if(i===ma)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ls)return s.COMPRESSED_RG11_EAC;if(i===ga)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===_a||i===xa||i===va||i===Ma||i===Sa||i===ya||i===Ea||i===ba||i===Ta||i===Aa||i===wa||i===Ca||i===Ra||i===Pa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===_a)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xa)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===va)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ma)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Sa)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ya)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ea)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ba)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ta)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Aa)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wa)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ca)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ra)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Pa)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===La||i===Ia||i===Da)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===La)return o===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ia)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Da)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Na||i===Ua||i===Is||i===Fa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Na)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ua)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Is)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===kr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const X_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new wu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new qn({vertexShader:X_,fragmentShader:q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Sn(new Xs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Y_ extends ki{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,f=null,u=null,p=null,m=null;const x=typeof XRWebGLBinding<"u",g=new $_,h={},E=t.getContextAttributes();let w=null,y=null;const T=[],C=[],L=new st;let v=null;const R=new Mn;R.viewport=new At;const O=new Mn;O.viewport=new At;const N=[R,O],H=new ip;let Q=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ce=T[j];return ce===void 0&&(ce=new ho,T[j]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(j){let ce=T[j];return ce===void 0&&(ce=new ho,T[j]=ce),ce.getGripSpace()},this.getHand=function(j){let ce=T[j];return ce===void 0&&(ce=new ho,T[j]=ce),ce.getHandSpace()};function z(j){const ce=C.indexOf(j.inputSource);if(ce===-1)return;const se=T[ce];se!==void 0&&(se.update(j.inputSource,j.frame,c||o),se.dispatchEvent({type:j.type,data:j.inputSource}))}function Y(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",W);for(let j=0;j<T.length;j++){const ce=C[j];ce!==null&&(C[j]=null,T[j].disconnect(ce))}Q=null,te=null,g.reset();for(const j in h)delete h[j];e.setRenderTarget(w),p=null,u=null,f=null,r=null,y=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",W),E.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(L),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Ue=null,ke=null;E.depth&&(ke=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=E.stencil?Fi:ai,Ue=E.stencil?kr:Xn);const Ie={colorFormat:t.RGBA8,depthFormat:ke,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(Ie),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Vn(u.textureWidth,u.textureHeight,{format:Dn,type:xn,depthTexture:new cr(u.textureWidth,u.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Vn(p.framebufferWidth,p.framebufferHeight,{format:Dn,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ze.setContext(r),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(j){for(let ce=0;ce<j.removed.length;ce++){const se=j.removed[ce],Ue=C.indexOf(se);Ue>=0&&(C[Ue]=null,T[Ue].disconnect(se))}for(let ce=0;ce<j.added.length;ce++){const se=j.added[ce];let Ue=C.indexOf(se);if(Ue===-1){for(let Ie=0;Ie<T.length;Ie++)if(Ie>=C.length){C.push(se),Ue=Ie;break}else if(C[Ie]===null){C[Ie]=se,Ue=Ie;break}if(Ue===-1)break}const ke=T[Ue];ke&&ke.connect(se)}}const ne=new k,re=new k;function ge(j,ce,se){ne.setFromMatrixPosition(ce.matrixWorld),re.setFromMatrixPosition(se.matrixWorld);const Ue=ne.distanceTo(re),ke=ce.projectionMatrix.elements,Ie=se.projectionMatrix.elements,Mt=ke[14]/(ke[10]-1),Ye=ke[14]/(ke[10]+1),it=(ke[9]+1)/ke[5],Ze=(ke[9]-1)/ke[5],Ke=(ke[8]-1)/ke[0],ot=(Ie[8]+1)/Ie[0],yt=Mt*Ke,Ct=Mt*ot,Lt=Ue/(-Ke+ot),mt=Lt*-Ke;if(ce.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(mt),j.translateZ(Lt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ke[10]===-1)j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Et=Mt+Lt,U=Ye+Lt,Ft=yt-mt,Fe=Ct+(Ue-mt),A=it*Ye/U*Et,_=Ze*Ye/U*Et;j.projectionMatrix.makePerspective(Ft,Fe,A,_,Et,U),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function _e(j,ce){ce===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ce.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ce=j.near,se=j.far;g.texture!==null&&(g.depthNear>0&&(ce=g.depthNear),g.depthFar>0&&(se=g.depthFar)),H.near=O.near=R.near=ce,H.far=O.far=R.far=se,(Q!==H.near||te!==H.far)&&(r.updateRenderState({depthNear:H.near,depthFar:H.far}),Q=H.near,te=H.far),H.layers.mask=j.layers.mask|6,R.layers.mask=H.layers.mask&-5,O.layers.mask=H.layers.mask&-3;const Ue=j.parent,ke=H.cameras;_e(H,Ue);for(let Ie=0;Ie<ke.length;Ie++)_e(ke[Ie],Ue);ke.length===2?ge(H,R,O):H.projectionMatrix.copy(R.projectionMatrix),be(j,H,Ue)};function be(j,ce,se){se===null?j.matrix.copy(ce.matrixWorld):(j.matrix.copy(se.matrixWorld),j.matrix.invert(),j.matrix.multiply(ce.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ba*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(j){return h[j]};let tt=null;function nt(j,ce){if(d=ce.getViewerPose(c||o),m=ce,d!==null){const se=d.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Ue=!1;se.length!==H.cameras.length&&(H.cameras.length=0,Ue=!0);for(let Ye=0;Ye<se.length;Ye++){const it=se[Ye];let Ze=null;if(p!==null)Ze=p.getViewport(it);else{const ot=f.getViewSubImage(u,it);Ze=ot.viewport,Ye===0&&(e.setRenderTargetTextures(y,ot.colorTexture,ot.depthStencilTexture),e.setRenderTarget(y))}let Ke=N[Ye];Ke===void 0&&(Ke=new Mn,Ke.layers.enable(Ye),Ke.viewport=new At,N[Ye]=Ke),Ke.matrix.fromArray(it.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(it.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Ye===0&&(H.matrix.copy(Ke.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Ue===!0&&H.cameras.push(Ke)}const ke=r.enabledFeatures;if(ke&&ke.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const Ye=f.getDepthInformation(se[0]);Ye&&Ye.isValid&&Ye.texture&&g.init(Ye,r.renderState)}if(ke&&ke.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let Ye=0;Ye<se.length;Ye++){const it=se[Ye].camera;if(it){let Ze=h[it];Ze||(Ze=new wu,h[it]=Ze);const Ke=f.getCameraImage(it);Ze.sourceTexture=Ke}}}}for(let se=0;se<T.length;se++){const Ue=C[se],ke=T[se];Ue!==null&&ke!==void 0&&ke.update(Ue,ce,c||o)}tt&&tt(j,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),m=null}const ze=new Lu;ze.setAnimationLoop(nt),this.setAnimationLoop=function(j){tt=j},this.dispose=function(){}}}const K_=new wt,Bu=new Ve;Bu.set(-1,0,0,0,1,0,0,0,1);function Z_(n,e){function t(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,Cu(n)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,E,w,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(g,h):h.isMeshLambertMaterial?(s(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(g,h),f(g,h)):h.isMeshPhongMaterial?(s(g,h),d(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(g,h),u(g,h),h.isMeshPhysicalMaterial&&p(g,h,y)):h.isMeshMatcapMaterial?(s(g,h),m(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),x(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?l(g,h,E,w):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,t(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,t(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===hn&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,t(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===hn&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,t(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,t(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const E=e.get(h),w=E.envMap,y=E.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(K_.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Bu),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,t(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,E,w){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*E,g.scale.value=w*.5,h.map&&(g.map.value=h.map,t(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,t(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,t(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function d(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function f(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function u(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,E){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===hn&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,h){h.matcap&&(g.matcap.value=h.matcap)}function x(g,h){const E=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function J_(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){const C=T.program;i.uniformBlockBinding(y,C)}function c(y,T){let C=r[y.id];C===void 0&&(g(y),C=d(y),r[y.id]=C,y.addEventListener("dispose",E));const L=T.program;i.updateUBOMapping(y,L);const v=e.render.frame;s[y.id]!==v&&(u(y),s[y.id]=v)}function d(y){const T=f();y.__bindingPointIndex=T;const C=n.createBuffer(),L=y.__size,v=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,L,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,C),C}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const T=r[y.id],C=y.uniforms,L=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let v=0,R=C.length;v<R;v++){const O=C[v];if(Array.isArray(O))for(let N=0,H=O.length;N<H;N++)p(O[N],v,N,L);else p(O,v,0,L)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,T,C,L){if(x(y,T,C,L)===!0){const v=y.__offset,R=y.value;if(Array.isArray(R)){let O=0;for(let N=0;N<R.length;N++){const H=R[N],Q=h(H);m(H,y.__data,O),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(O+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(R,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,y.__data)}}function m(y,T,C){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,C)}function x(y,T,C,L){const v=y.value,R=T+"_"+C;if(L[R]===void 0)return typeof v=="number"||typeof v=="boolean"?L[R]=v:ArrayBuffer.isView(v)?L[R]=v.slice():L[R]=v.clone(),!0;{const O=L[R];if(typeof v=="number"||typeof v=="boolean"){if(O!==v)return L[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(O.equals(v)===!1)return O.copy(v),!0}}return!1}function g(y){const T=y.uniforms;let C=0;const L=16;for(let R=0,O=T.length;R<O;R++){const N=Array.isArray(T[R])?T[R]:[T[R]];for(let H=0,Q=N.length;H<Q;H++){const te=N[H],z=Array.isArray(te.value)?te.value:[te.value];for(let Y=0,W=z.length;Y<W;Y++){const ne=z[Y],re=h(ne),ge=C%L,_e=ge%re.boundary,be=ge+_e;C+=_e,be!==0&&L-be<re.storage&&(C+=L-be),te.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),te.__offset=C,C+=re.storage}}}const v=C%L;return v>0&&(C+=L-v),y.__size=C,y.__cache={},this}function h(y){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",y),T}function E(y){const T=y.target;T.removeEventListener("dispose",E);const C=o.indexOf(T.__bindingPointIndex);o.splice(C,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function w(){for(const y in r)n.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:c,dispose:w}}const Q_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let On=null;function j_(){return On===null&&(On=new Bh(Q_,16,16,Bi,oi),On.name="DFG_LUT",On.minFilter=Qt,On.magFilter=Qt,On.wrapS=ii,On.wrapT=ii,On.generateMipmaps=!1,On.needsUpdate=!0),On}class ex{constructor(e={}){const{canvas:t=mh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=xn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const x=p,g=new Set([ja,Qa,Ja]),h=new Set([xn,Xn,Br,kr,Ka,Za]),E=new Uint32Array(4),w=new Int32Array(4),y=new k;let T=null,C=null;const L=[],v=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let N=!1,H=null,Q=null,te=null,z=null;this._outputColorSpace=_n;let Y=0,W=0,ne=null,re=-1,ge=null;const _e=new At,be=new At;let tt=null;const nt=new $e(0);let ze=0,j=t.width,ce=t.height,se=1,Ue=null,ke=null;const Ie=new At(0,0,j,ce),Mt=new At(0,0,j,ce);let Ye=!1;const it=new rl;let Ze=!1,Ke=!1;const ot=new wt,yt=new k,Ct=new At,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function Et(){return ne===null?se:1}let U=i;function Ft(M,I){return t.getContext(M,I)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$a}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",ln,!1),U===null){const I="webgl2";if(U=Ft(I,M),U===null)throw Ft(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw at("WebGLRenderer: "+M.message),M}let Fe,A,_,B,G,X,oe,ue,q,Z,ae,Ae,he,pe,Pe,Ne,He,D,de,J,me,xe,ee;function ie(){Fe=new jg(U),Fe.init(),me=new W_(U,Fe),A=new Xg(U,Fe,e,me),_=new G_(U,Fe),A.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),Q=U.createFramebuffer(),te=U.createFramebuffer(),z=U.createFramebuffer(),B=new n0(U),G=new C_,X=new V_(U,Fe,_,G,A,me,B),oe=new Qg(O),ue=new op(U),xe=new Vg(U,ue),q=new e0(U,ue,B,xe),Z=new r0(U,q,ue,xe,B),D=new i0(U,A,X),Pe=new qg(G),ae=new w_(O,oe,Fe,A,xe,Pe),Ae=new Z_(O,G),he=new P_,pe=new F_(Fe),He=new Gg(O,oe,_,Z,m,l),Ne=new H_(O,Z,A),ee=new J_(U,B,A,_),de=new Wg(U,Fe,B),J=new t0(U,Fe,B),B.programs=ae.programs,O.capabilities=A,O.extensions=Fe,O.properties=G,O.renderLists=he,O.shadowMap=Ne,O.state=_,O.info=B}ie(),x!==xn&&(R=new o0(x,t.width,t.height,a,r,s));const Ee=new Y_(O,U);this.xr=Ee,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=Fe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Fe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(M){M!==void 0&&(se=M,this.setSize(j,ce,!1))},this.getSize=function(M){return M.set(j,ce)},this.setSize=function(M,I,V=!0){if(Ee.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}j=M,ce=I,t.width=Math.floor(M*se),t.height=Math.floor(I*se),V===!0&&(t.style.width=M+"px",t.style.height=I+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(j*se,ce*se).floor()},this.setDrawingBufferSize=function(M,I,V){j=M,ce=I,se=V,t.width=Math.floor(M*V),t.height=Math.floor(I*V),this.setViewport(0,0,M,I)},this.setEffects=function(M){if(x===xn){at("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let I=0;I<M.length;I++)if(M[I].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(_e)},this.getViewport=function(M){return M.copy(Ie)},this.setViewport=function(M,I,V,F){M.isVector4?Ie.set(M.x,M.y,M.z,M.w):Ie.set(M,I,V,F),_.viewport(_e.copy(Ie).multiplyScalar(se).round())},this.getScissor=function(M){return M.copy(Mt)},this.setScissor=function(M,I,V,F){M.isVector4?Mt.set(M.x,M.y,M.z,M.w):Mt.set(M,I,V,F),_.scissor(be.copy(Mt).multiplyScalar(se).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(M){_.setScissorTest(Ye=M)},this.setOpaqueSort=function(M){Ue=M},this.setTransparentSort=function(M){ke=M},this.getClearColor=function(M){return M.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,V=!0){let F=0;if(M){let b=!1;if(ne!==null){const ve=ne.texture.format;b=g.has(ve)}if(b){const ve=ne.texture.type,K=h.has(ve),fe=He.getClearColor(),Te=He.getClearAlpha(),we=fe.r,Be=fe.g,Xe=fe.b;K?(E[0]=we,E[1]=Be,E[2]=Xe,E[3]=Te,U.clearBufferuiv(U.COLOR,0,E)):(w[0]=we,w[1]=Be,w[2]=Xe,w[3]=Te,U.clearBufferiv(U.COLOR,0,w))}else F|=U.COLOR_BUFFER_BIT}I&&(F|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(F|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&U.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),H=M},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),He.dispose(),he.dispose(),pe.dispose(),G.dispose(),oe.dispose(),Z.dispose(),xe.dispose(),ee.dispose(),ae.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",De),Ee.removeEventListener("sessionend",gt),$t.stop()};function pt(M){M.preventDefault(),Bl("WebGLRenderer: Context Lost."),N=!0}function lt(){Bl("WebGLRenderer: Context Restored."),N=!1;const M=B.autoReset,I=Ne.enabled,V=Ne.autoUpdate,F=Ne.needsUpdate,b=Ne.type;ie(),B.autoReset=M,Ne.enabled=I,Ne.autoUpdate=V,Ne.needsUpdate=F,Ne.type=b}function ln(M){at("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function cn(M){const I=M.target;I.removeEventListener("dispose",cn),mr(I)}function mr(M){gr(M),G.remove(M)}function gr(M){const I=G.get(M).programs;I!==void 0&&(I.forEach(function(V){ae.releaseProgram(V)}),M.isShaderMaterial&&ae.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,V,F,b,ve){I===null&&(I=Lt);const K=b.isMesh&&b.matrixWorld.determinantAffine()<0,fe=tn(M,I,V,F,b);_.setMaterial(F,K);let Te=V.index,we=1;if(F.wireframe===!0){if(Te=q.getWireframeAttribute(V),Te===void 0)return;we=2}const Be=V.drawRange,Xe=V.attributes.position;let Re=Be.start*we,ct=(Be.start+Be.count)*we;ve!==null&&(Re=Math.max(Re,ve.start*we),ct=Math.min(ct,(ve.start+ve.count)*we)),Te!==null?(Re=Math.max(Re,0),ct=Math.min(ct,Te.count)):Xe!=null&&(Re=Math.max(Re,0),ct=Math.min(ct,Xe.count));const _t=ct-Re;if(_t<0||_t===1/0)return;xe.setup(b,F,fe,V,Te);let St,ut=de;if(Te!==null&&(St=ue.get(Te),ut=J,ut.setIndex(St)),b.isMesh)F.wireframe===!0?(_.setLineWidth(F.wireframeLinewidth*Et()),ut.setMode(U.LINES)):ut.setMode(U.TRIANGLES);else if(b.isLine){let Ht=F.linewidth;Ht===void 0&&(Ht=1),_.setLineWidth(Ht*Et()),b.isLineSegments?ut.setMode(U.LINES):b.isLineLoop?ut.setMode(U.LINE_LOOP):ut.setMode(U.LINE_STRIP)}else b.isPoints?ut.setMode(U.POINTS):b.isSprite&&ut.setMode(U.TRIANGLES);if(b.isBatchedMesh)if(Fe.get("WEBGL_multi_draw"))ut.renderMultiDraw(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount);else{const Ht=b._multiDrawStarts,ye=b._multiDrawCounts,nn=b._multiDrawCount,Qe=Te?ue.get(Te).bytesPerElement:1,un=G.get(F).currentProgram.getUniforms();for(let Gt=0;Gt<nn;Gt++)un.setValue(U,"_gl_DrawID",Gt),ut.render(Ht[Gt]/Qe,ye[Gt])}else if(b.isInstancedMesh)ut.renderInstances(Re,_t,b.count);else if(V.isInstancedBufferGeometry){const Ht=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ye=Math.min(V.instanceCount,Ht);ut.renderInstances(Re,_t,ye)}else ut.render(Re,_t)};function Je(M,I,V){M.transparent===!0&&M.side===Ln&&M.forceSinglePass===!1?(M.side=hn,M.needsUpdate=!0,zi(M,I,V),M.side=xi,M.needsUpdate=!0,zi(M,I,V),M.side=Ln):zi(M,I,V)}this.compile=function(M,I,V=null){V===null&&(V=M),C=pe.get(V),C.init(I),v.push(C),V.traverseVisible(function(b){b.isLight&&b.layers.test(I.layers)&&(C.pushLight(b),b.castShadow&&C.pushShadow(b))}),M!==V&&M.traverseVisible(function(b){b.isLight&&b.layers.test(I.layers)&&(C.pushLight(b),b.castShadow&&C.pushShadow(b))}),C.setupLights();const F=new Set;return M.traverse(function(b){if(!(b.isMesh||b.isPoints||b.isLine||b.isSprite))return;const ve=b.material;if(ve)if(Array.isArray(ve))for(let K=0;K<ve.length;K++){const fe=ve[K];Je(fe,V,b),F.add(fe)}else Je(ve,V,b),F.add(ve)}),C=v.pop(),F},this.compileAsync=function(M,I,V=null){const F=this.compile(M,I,V);return new Promise(b=>{function ve(){if(F.forEach(function(K){G.get(K).currentProgram.isReady()&&F.delete(K)}),F.size===0){b(M);return}setTimeout(ve,10)}Fe.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let jt=null;function En(M){jt&&jt(M)}function De(){$t.stop()}function gt(){$t.start()}const $t=new Lu;$t.setAnimationLoop(En),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(M){jt=M,Ee.setAnimationLoop(M),M===null?$t.stop():$t.start()},Ee.addEventListener("sessionstart",De),Ee.addEventListener("sessionend",gt),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;H!==null&&H.renderStart(M,I);const V=Ee.enabled===!0&&Ee.isPresenting===!0,F=R!==null&&(ne===null||V)&&R.begin(O,ne);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(I),I=Ee.getCamera()),M.isScene===!0&&M.onBeforeRender(O,M,I,ne),C=pe.get(M,v.length),C.init(I),C.state.textureUnits=X.getTextureUnits(),v.push(C),ot.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),it.setFromProjectionMatrix(ot,Hn,I.reversedDepth),Ke=this.localClippingEnabled,Ze=Pe.init(this.clippingPlanes,Ke),T=he.get(M,L.length),T.init(),L.push(T),Ee.enabled===!0&&Ee.isPresenting===!0){const K=O.xr.getDepthSensingMesh();K!==null&&kt(K,I,-1/0,O.sortObjects)}kt(M,I,0,O.sortObjects),T.finish(),O.sortObjects===!0&&T.sort(Ue,ke,I.reversedDepth),mt=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,mt&&He.addToRenderList(T,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ze===!0&&Pe.beginShadows();const b=C.state.shadowsArray;if(Ne.render(b,M,I),Ze===!0&&Pe.endShadows(),(F&&R.hasRenderPass())===!1){const K=T.opaque,fe=T.transmissive;if(C.setupLights(),I.isArrayCamera){const Te=I.cameras;if(fe.length>0)for(let we=0,Be=Te.length;we<Be;we++){const Xe=Te[we];Mi(K,fe,M,Xe)}mt&&He.render(M);for(let we=0,Be=Te.length;we<Be;we++){const Xe=Te[we];Vr(T,M,Xe,Xe.viewport)}}else fe.length>0&&Mi(K,fe,M,I),mt&&He.render(M),Vr(T,M,I)}ne!==null&&W===0&&(X.updateMultisampleRenderTarget(ne),X.updateRenderTargetMipmap(ne)),F&&R.end(O),M.isScene===!0&&M.onAfterRender(O,M,I),xe.resetDefaultState(),re=-1,ge=null,v.pop(),v.length>0?(C=v[v.length-1],X.setTextureUnits(C.state.textureUnits),Ze===!0&&Pe.setGlobalState(O.clippingPlanes,C.state.camera)):C=null,L.pop(),L.length>0?T=L[L.length-1]:T=null,H!==null&&H.renderEnd()};function kt(M,I,V,F){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLightProbeGrid)C.pushLightProbeGrid(M);else if(M.isLight)C.pushLight(M),M.castShadow&&C.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||it.intersectsSprite(M)){F&&Ct.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ot);const K=Z.update(M),fe=M.material;fe.visible&&T.push(M,K,fe,V,Ct.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||it.intersectsObject(M))){const K=Z.update(M),fe=M.material;if(F&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ct.copy(M.boundingSphere.center)):(K.boundingSphere===null&&K.computeBoundingSphere(),Ct.copy(K.boundingSphere.center)),Ct.applyMatrix4(M.matrixWorld).applyMatrix4(ot)),Array.isArray(fe)){const Te=K.groups;for(let we=0,Be=Te.length;we<Be;we++){const Xe=Te[we],Re=fe[Xe.materialIndex];Re&&Re.visible&&T.push(M,K,Re,V,Ct.z,Xe)}}else fe.visible&&T.push(M,K,fe,V,Ct.z,null)}}const ve=M.children;for(let K=0,fe=ve.length;K<fe;K++)kt(ve[K],I,V,F)}function Vr(M,I,V,F){const{opaque:b,transmissive:ve,transparent:K}=M;C.setupLightsView(V),Ze===!0&&Pe.setGlobalState(O.clippingPlanes,V),F&&_.viewport(_e.copy(F)),b.length>0&&Si(b,I,V),ve.length>0&&Si(ve,I,V),K.length>0&&Si(K,I,V),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Mi(M,I,V,F){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[F.id]===void 0){const Re=Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[F.id]=new Vn(1,1,{generateMipmaps:!0,type:Re?oi:xn,minFilter:Ui,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const ve=C.state.transmissionRenderTarget[F.id],K=F.viewport||_e;ve.setSize(K.z*O.transmissionResolutionScale,K.w*O.transmissionResolutionScale);const fe=O.getRenderTarget(),Te=O.getActiveCubeFace(),we=O.getActiveMipmapLevel();O.setRenderTarget(ve),O.getClearColor(nt),ze=O.getClearAlpha(),ze<1&&O.setClearColor(16777215,.5),O.clear(),mt&&He.render(V);const Be=O.toneMapping;O.toneMapping=Gn;const Xe=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),C.setupLightsView(F),Ze===!0&&Pe.setGlobalState(O.clippingPlanes,F),Si(M,V,F),X.updateMultisampleRenderTarget(ve),X.updateRenderTargetMipmap(ve),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ct=0,_t=I.length;ct<_t;ct++){const St=I[ct],{object:ut,geometry:Ht,material:ye,group:nn}=St;if(ye.side===Ln&&ut.layers.test(F.layers)){const Qe=ye.side;ye.side=hn,ye.needsUpdate=!0,_r(ut,V,F,Ht,ye,nn),ye.side=Qe,ye.needsUpdate=!0,Re=!0}}Re===!0&&(X.updateMultisampleRenderTarget(ve),X.updateRenderTargetMipmap(ve))}O.setRenderTarget(fe,Te,we),O.setClearColor(nt,ze),Xe!==void 0&&(F.viewport=Xe),O.toneMapping=Be}function Si(M,I,V){const F=I.isScene===!0?I.overrideMaterial:null;for(let b=0,ve=M.length;b<ve;b++){const K=M[b],{object:fe,geometry:Te,group:we}=K;let Be=K.material;Be.allowOverride===!0&&F!==null&&(Be=F),fe.layers.test(V.layers)&&_r(fe,I,V,Te,Be,we)}}function _r(M,I,V,F,b,ve){M.onBeforeRender(O,I,V,F,b,ve),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),b.onBeforeRender(O,I,V,F,M,ve),b.transparent===!0&&b.side===Ln&&b.forceSinglePass===!1?(b.side=hn,b.needsUpdate=!0,O.renderBufferDirect(V,I,F,b,M,ve),b.side=xi,b.needsUpdate=!0,O.renderBufferDirect(V,I,F,b,M,ve),b.side=Ln):O.renderBufferDirect(V,I,F,b,M,ve),M.onAfterRender(O,I,V,F,b,ve)}function zi(M,I,V){I.isScene!==!0&&(I=Lt);const F=G.get(M),b=C.state.lights,ve=C.state.shadowsArray,K=b.state.version,fe=ae.getParameters(M,b.state,ve,I,V,C.state.lightProbeGridArray),Te=ae.getProgramCacheKey(fe);let we=F.programs;F.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,F.fog=I.fog;const Be=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;F.envMap=oe.get(M.envMap||F.environment,Be),F.envMapRotation=F.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,we===void 0&&(M.addEventListener("dispose",cn),we=new Map,F.programs=we);let Xe=we.get(Te);if(Xe!==void 0){if(F.currentProgram===Xe&&F.lightsStateVersion===K)return en(M,fe),Xe}else fe.uniforms=ae.getUniforms(M),H!==null&&M.isNodeMaterial&&H.build(M,V,fe),M.onBeforeCompile(fe,O),Xe=ae.acquireProgram(fe,Te),we.set(Te,Xe),F.uniforms=fe.uniforms;const Re=F.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=Pe.uniform),en(M,fe),F.needsLights=zt(M),F.lightsStateVersion=K,F.needsLights&&(Re.ambientLightColor.value=b.state.ambient,Re.lightProbe.value=b.state.probe,Re.directionalLights.value=b.state.directional,Re.directionalLightShadows.value=b.state.directionalShadow,Re.spotLights.value=b.state.spot,Re.spotLightShadows.value=b.state.spotShadow,Re.rectAreaLights.value=b.state.rectArea,Re.ltc_1.value=b.state.rectAreaLTC1,Re.ltc_2.value=b.state.rectAreaLTC2,Re.pointLights.value=b.state.point,Re.pointLightShadows.value=b.state.pointShadow,Re.hemisphereLights.value=b.state.hemi,Re.directionalShadowMatrix.value=b.state.directionalShadowMatrix,Re.spotLightMatrix.value=b.state.spotLightMatrix,Re.spotLightMap.value=b.state.spotLightMap,Re.pointShadowMatrix.value=b.state.pointShadowMatrix),F.lightProbeGrid=C.state.lightProbeGridArray.length>0,F.currentProgram=Xe,F.uniformsList=null,Xe}function It(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=ws.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function en(M,I){const V=G.get(M);V.outputColorSpace=I.outputColorSpace,V.batching=I.batching,V.batchingColor=I.batchingColor,V.instancing=I.instancing,V.instancingColor=I.instancingColor,V.instancingMorph=I.instancingMorph,V.skinning=I.skinning,V.morphTargets=I.morphTargets,V.morphNormals=I.morphNormals,V.morphColors=I.morphColors,V.morphTargetsCount=I.morphTargetsCount,V.numClippingPlanes=I.numClippingPlanes,V.numIntersection=I.numClipIntersection,V.vertexAlphas=I.vertexAlphas,V.vertexTangents=I.vertexTangents,V.toneMapping=I.toneMapping}function bn(M,I){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(I.matrixWorld);for(let V=0,F=M.length;V<F;V++){const b=M[V];if(b.texture!==null&&b.boundingBox.containsPoint(y))return b}return null}function tn(M,I,V,F,b){I.isScene!==!0&&(I=Lt),X.resetTextureUnits();const ve=I.fog,K=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?I.environment:null,fe=ne===null?O.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:je.workingColorSpace,Te=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,we=oe.get(F.envMap||K,Te),Be=F.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xe=!!V.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Re=!!V.morphAttributes.position,ct=!!V.morphAttributes.normal,_t=!!V.morphAttributes.color;let St=Gn;F.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(St=O.toneMapping);const ut=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ht=ut!==void 0?ut.length:0,ye=G.get(F),nn=C.state.lights;if(Ze===!0&&(Ke===!0||M!==ge)){const rt=M===ge&&F.id===re;Pe.setState(F,M,rt)}let Qe=!1;F.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==nn.state.version||ye.outputColorSpace!==fe||b.isBatchedMesh&&ye.batching===!1||!b.isBatchedMesh&&ye.batching===!0||b.isBatchedMesh&&ye.batchingColor===!0&&b.colorTexture===null||b.isBatchedMesh&&ye.batchingColor===!1&&b.colorTexture!==null||b.isInstancedMesh&&ye.instancing===!1||!b.isInstancedMesh&&ye.instancing===!0||b.isSkinnedMesh&&ye.skinning===!1||!b.isSkinnedMesh&&ye.skinning===!0||b.isInstancedMesh&&ye.instancingColor===!0&&b.instanceColor===null||b.isInstancedMesh&&ye.instancingColor===!1&&b.instanceColor!==null||b.isInstancedMesh&&ye.instancingMorph===!0&&b.morphTexture===null||b.isInstancedMesh&&ye.instancingMorph===!1&&b.morphTexture!==null||ye.envMap!==we||F.fog===!0&&ye.fog!==ve||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Pe.numPlanes||ye.numIntersection!==Pe.numIntersection)||ye.vertexAlphas!==Be||ye.vertexTangents!==Xe||ye.morphTargets!==Re||ye.morphNormals!==ct||ye.morphColors!==_t||ye.toneMapping!==St||ye.morphTargetsCount!==Ht||!!ye.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,ye.__version=F.version);let un=ye.currentProgram;Qe===!0&&(un=zi(F,I,b),H&&F.isNodeMaterial&&H.onUpdateProgram(F,un,ye));let Gt=!1,dt=!1,li=!1;const ft=un.getUniforms(),bt=ye.uniforms;if(_.useProgram(un.program)&&(Gt=!0,dt=!0,li=!0),F.id!==re&&(re=F.id,dt=!0),ye.needsLights){const rt=bn(C.state.lightProbeGridArray,b);ye.lightProbeGrid!==rt&&(ye.lightProbeGrid=rt,dt=!0)}if(Gt||ge!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ft.setValue(U,"projectionMatrix",M.projectionMatrix),ft.setValue(U,"viewMatrix",M.matrixWorldInverse);const Nn=ft.map.cameraPosition;Nn!==void 0&&Nn.setValue(U,yt.setFromMatrixPosition(M.matrixWorld)),A.logarithmicDepthBuffer&&ft.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&ft.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),ge!==M&&(ge=M,dt=!0,li=!0)}if(ye.needsLights&&(nn.state.directionalShadowMap.length>0&&ft.setValue(U,"directionalShadowMap",nn.state.directionalShadowMap,X),nn.state.spotShadowMap.length>0&&ft.setValue(U,"spotShadowMap",nn.state.spotShadowMap,X),nn.state.pointShadowMap.length>0&&ft.setValue(U,"pointShadowMap",nn.state.pointShadowMap,X)),b.isSkinnedMesh){ft.setOptional(U,b,"bindMatrix"),ft.setOptional(U,b,"bindMatrixInverse");const rt=b.skeleton;rt&&(rt.boneTexture===null&&rt.computeBoneTexture(),ft.setValue(U,"boneTexture",rt.boneTexture,X))}b.isBatchedMesh&&(ft.setOptional(U,b,"batchingTexture"),ft.setValue(U,"batchingTexture",b._matricesTexture,X),ft.setOptional(U,b,"batchingIdTexture"),ft.setValue(U,"batchingIdTexture",b._indirectTexture,X),ft.setOptional(U,b,"batchingColorTexture"),b._colorsTexture!==null&&ft.setValue(U,"batchingColorTexture",b._colorsTexture,X));const rn=V.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&D.update(b,V,un),(dt||ye.receiveShadow!==b.receiveShadow)&&(ye.receiveShadow=b.receiveShadow,ft.setValue(U,"receiveShadow",b.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&I.environment!==null&&(bt.envMapIntensity.value=I.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=j_()),dt){if(ft.setValue(U,"toneMappingExposure",O.toneMappingExposure),ye.needsLights&&Tn(bt,li),ve&&F.fog===!0&&Ae.refreshFogUniforms(bt,ve),Ae.refreshMaterialUniforms(bt,F,se,ce,C.state.transmissionRenderTarget[M.id]),ye.needsLights&&ye.lightProbeGrid){const rt=ye.lightProbeGrid;bt.probesSH.value=rt.texture,bt.probesMin.value.copy(rt.boundingBox.min),bt.probesMax.value.copy(rt.boundingBox.max),bt.probesResolution.value.copy(rt.resolution)}ws.upload(U,It(ye),bt,X)}if(F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(ws.upload(U,It(ye),bt,X),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&ft.setValue(U,"center",b.center),ft.setValue(U,"modelViewMatrix",b.modelViewMatrix),ft.setValue(U,"normalMatrix",b.normalMatrix),ft.setValue(U,"modelMatrix",b.matrixWorld),F.uniformsGroups!==void 0){const rt=F.uniformsGroups;for(let Nn=0,$n=rt.length;Nn<$n;Nn++){const Yt=rt[Nn];ee.update(Yt,un),ee.bind(Yt,un)}}return un}function Tn(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function zt(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(M,I,V){const F=G.get(M);F.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),G.get(M.texture).__webglTexture=I,G.get(M.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:V,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const V=G.get(M);V.__webglFramebuffer=I,V.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,V=0){ne=M,Y=I,W=V;let F=null,b=!1,ve=!1;if(M){const fe=G.get(M);if(fe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,fe.__webglFramebuffer),_e.copy(M.viewport),be.copy(M.scissor),tt=M.scissorTest,_.viewport(_e),_.scissor(be),_.setScissorTest(tt),re=-1;return}else if(fe.__webglFramebuffer===void 0)X.setupRenderTarget(M);else if(fe.__hasExternalTextures)X.rebindTextures(M,G.get(M.texture).__webglTexture,G.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Be=M.depthTexture;if(fe.__boundDepthTexture!==Be){if(Be!==null&&G.has(Be)&&(M.width!==Be.image.width||M.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(M)}}const Te=M.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ve=!0);const we=G.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(we[I])?F=we[I][V]:F=we[I],b=!0):M.samples>0&&X.useMultisampledRTT(M)===!1?F=G.get(M).__webglMultisampledFramebuffer:Array.isArray(we)?F=we[V]:F=we,_e.copy(M.viewport),be.copy(M.scissor),tt=M.scissorTest}else _e.copy(Ie).multiplyScalar(se).floor(),be.copy(Mt).multiplyScalar(se).floor(),tt=Ye;if(V!==0&&(F=Q),_.bindFramebuffer(U.FRAMEBUFFER,F)&&_.drawBuffers(M,F),_.viewport(_e),_.scissor(be),_.setScissorTest(tt),b){const fe=G.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,fe.__webglTexture,V)}else if(ve){const fe=I;for(let Te=0;Te<M.textures.length;Te++){const we=G.get(M.textures[Te]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Te,we.__webglTexture,V,fe)}}else if(M!==null&&V!==0){const fe=G.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,fe.__webglTexture,V)}re=-1},this.readRenderTargetPixels=function(M,I,V,F,b,ve,K,fe=0){if(!(M&&M.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&K!==void 0&&(Te=Te[K]),Te){_.bindFramebuffer(U.FRAMEBUFFER,Te);try{const we=M.textures[fe],Be=we.format,Xe=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+fe),!A.textureFormatReadable(Be)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Xe)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-F&&V>=0&&V<=M.height-b&&U.readPixels(I,V,F,b,me.convert(Be),me.convert(Xe),ve)}finally{const we=ne!==null?G.get(ne).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(M,I,V,F,b,ve,K,fe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=G.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&K!==void 0&&(Te=Te[K]),Te)if(I>=0&&I<=M.width-F&&V>=0&&V<=M.height-b){_.bindFramebuffer(U.FRAMEBUFFER,Te);const we=M.textures[fe],Be=we.format,Xe=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+fe),!A.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.bufferData(U.PIXEL_PACK_BUFFER,ve.byteLength,U.STREAM_READ),U.readPixels(I,V,F,b,me.convert(Be),me.convert(Xe),0);const ct=ne!==null?G.get(ne).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,ct);const _t=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await gh(U,_t,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ve),U.deleteBuffer(Re),U.deleteSync(_t),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,V=0){const F=Math.pow(2,-V),b=Math.floor(M.image.width*F),ve=Math.floor(M.image.height*F),K=I!==null?I.x:0,fe=I!==null?I.y:0;X.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,V,0,0,K,fe,b,ve),_.unbindTexture()},this.copyTextureToTexture=function(M,I,V=null,F=null,b=0,ve=0){let K,fe,Te,we,Be,Xe,Re,ct,_t;const St=M.isCompressedTexture?M.mipmaps[ve]:M.image;if(V!==null)K=V.max.x-V.min.x,fe=V.max.y-V.min.y,Te=V.isBox3?V.max.z-V.min.z:1,we=V.min.x,Be=V.min.y,Xe=V.isBox3?V.min.z:0;else{const bt=Math.pow(2,-b);K=Math.floor(St.width*bt),fe=Math.floor(St.height*bt),M.isDataArrayTexture?Te=St.depth:M.isData3DTexture?Te=Math.floor(St.depth*bt):Te=1,we=0,Be=0,Xe=0}F!==null?(Re=F.x,ct=F.y,_t=F.z):(Re=0,ct=0,_t=0);const ut=me.convert(I.format),Ht=me.convert(I.type);let ye;I.isData3DTexture?(X.setTexture3D(I,0),ye=U.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(X.setTexture2DArray(I,0),ye=U.TEXTURE_2D_ARRAY):(X.setTexture2D(I,0),ye=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,I.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,I.unpackAlignment);const nn=_.getParameter(U.UNPACK_ROW_LENGTH),Qe=_.getParameter(U.UNPACK_IMAGE_HEIGHT),un=_.getParameter(U.UNPACK_SKIP_PIXELS),Gt=_.getParameter(U.UNPACK_SKIP_ROWS),dt=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,St.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,St.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,we),_.pixelStorei(U.UNPACK_SKIP_ROWS,Be),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Xe);const li=M.isDataArrayTexture||M.isData3DTexture,ft=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const bt=G.get(M),rn=G.get(I),rt=G.get(bt.__renderTarget),Nn=G.get(rn.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,rt.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,Nn.__webglFramebuffer);for(let $n=0;$n<Te;$n++)li&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(M).__webglTexture,b,Xe+$n),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(I).__webglTexture,ve,_t+$n)),U.blitFramebuffer(we,Be,K,fe,Re,ct,K,fe,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(b!==0||M.isRenderTargetTexture||G.has(M)){const bt=G.get(M),rn=G.get(I);_.bindFramebuffer(U.READ_FRAMEBUFFER,te),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let rt=0;rt<Te;rt++)li?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,bt.__webglTexture,b,Xe+rt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,bt.__webglTexture,b),ft?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,rn.__webglTexture,ve,_t+rt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,rn.__webglTexture,ve),b!==0?U.blitFramebuffer(we,Be,K,fe,Re,ct,K,fe,U.COLOR_BUFFER_BIT,U.NEAREST):ft?U.copyTexSubImage3D(ye,ve,Re,ct,_t+rt,we,Be,K,fe):U.copyTexSubImage2D(ye,ve,Re,ct,we,Be,K,fe);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ft?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(ye,ve,Re,ct,_t,K,fe,Te,ut,Ht,St.data):I.isCompressedArrayTexture?U.compressedTexSubImage3D(ye,ve,Re,ct,_t,K,fe,Te,ut,St.data):U.texSubImage3D(ye,ve,Re,ct,_t,K,fe,Te,ut,Ht,St):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ve,Re,ct,K,fe,ut,Ht,St.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ve,Re,ct,St.width,St.height,ut,St.data):U.texSubImage2D(U.TEXTURE_2D,ve,Re,ct,K,fe,ut,Ht,St);_.pixelStorei(U.UNPACK_ROW_LENGTH,nn),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Qe),_.pixelStorei(U.UNPACK_SKIP_PIXELS,un),_.pixelStorei(U.UNPACK_SKIP_ROWS,Gt),_.pixelStorei(U.UNPACK_SKIP_IMAGES,dt),ve===0&&I.generateMipmaps&&U.generateMipmap(ye),_.unbindTexture()},this.initRenderTarget=function(M){G.get(M).__webglFramebuffer===void 0&&X.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?X.setTextureCube(M,0):M.isData3DTexture?X.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?X.setTexture2DArray(M,0):X.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){Y=0,W=0,ne=null,_.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const tx=2.5,Nc=1.65,nx=.12;function Cs(n,e){return{x:n.x/e,z:n.y/e}}function Bo(n,e){const t=n.loops.filter(p=>p.vertices.length>=3);if(!t.length)return{eyeX:0,eyeY:Nc,eyeZ:0,yaw:0,pitch:0,fovDeg:75};const i=t[0];let r=0,s=0;for(const p of i.vertices){const m=Cs(p,e);r+=m.x,s+=m.z}const o=i.vertices.length,a=r/o,l=s/o;let c=-1,d=a,f=l+1;for(let p=0;p<o;p++){const m=Cs(i.vertices[p],e),x=Cs(i.vertices[(p+1)%o],e),g=Math.hypot(x.x-m.x,x.z-m.z);g>c&&(c=g,d=(m.x+x.x)/2,f=(m.z+x.z)/2)}const u=Math.atan2(d-a,f-l);return{eyeX:a,eyeY:Nc,eyeZ:l,yaw:u,pitch:0,fovDeg:75}}function ko(n,e,t,i){const r=Math.sin(n.yaw),s=Math.cos(n.yaw),o=Math.cos(n.yaw),a=-Math.sin(n.yaw);return{...n,eyeX:n.eyeX+r*e+o*t,eyeZ:n.eyeZ+s*e+a*t,eyeY:Math.max(.3,Math.min(8,n.eyeY+i))}}function ix(n,e,t){return{...n,yaw:n.yaw+e,pitch:Math.max(-1.2,Math.min(1.2,n.pitch+t))}}function rx(n,e){e.position.set(n.eyeX,n.eyeY,n.eyeZ),e.fov=n.fovDeg,e.near=.05,e.far=300;const t=Math.cos(n.pitch),i=n.eyeX+Math.sin(n.yaw)*t,r=n.eyeY+Math.sin(n.pitch),s=n.eyeZ+Math.cos(n.yaw)*t;e.lookAt(i,r,s),e.updateProjectionMatrix()}function sx(n,e,t){const i=Math.hypot(e.x-n.x,e.z-n.z);if(i<1e-6)return[];const r=(e.x-n.x)/i,s=(e.z-n.z)/i,o=t.map(f=>{const u=f.widthM/2/i;return{t0:Math.max(0,f.t-u),t1:Math.min(1,f.t+u)}});o.sort((f,u)=>f.t0-u.t0);const a=[];for(const f of o){const u=a[a.length-1];u&&f.t0<=u.t1?u.t1=Math.max(u.t1,f.t1):a.push({...f})}const l=[];let c=0;const d=f=>({x:n.x+r*i*f,y:0,z:n.z+s*i*f});for(const f of a)f.t0>c+.002&&l.push({a:d(c),b:d(f.t0)}),c=f.t1;return c<.998&&l.push({a:d(c),b:d(1)}),l}function Uc(n,e,t,i,r){const s=t.x-e.x,o=t.z-e.z,a=Math.hypot(s,o);if(a<.03)return;const l=new hr(a,i,nx),c=new Sn(l,r);c.position.set((e.x+t.x)/2,i/2,(e.z+t.z)/2),c.rotation.y=Math.atan2(-o,s),n.add(c)}function ox(n,e,t){if(e.length<3)return;let i=0,r=0;for(const d of e)i+=d.x,r+=d.z;i/=e.length,r/=e.length;const s=[],o=[],a=[];s.push(i,.01,r),o.push(0,1,0);for(const d of e)s.push(d.x,.01,d.z),o.push(0,1,0);for(let d=0;d<e.length;d++){const f=1+d,u=1+(d+1)%e.length;a.push(0,f,u)}const l=new yn;l.setAttribute("position",new an(s,3)),l.setAttribute("normal",new an(o,3)),l.setIndex(a),l.computeVertexNormals();const c=new Ru({color:t,roughness:.9,metalness:.02,side:Ln});n.add(new Sn(l,c))}function Fc(n){n.traverse(e=>{if(e instanceof Sn){e.geometry.dispose();const t=Array.isArray(e.material)?e.material:[e.material];for(const i of t)i.dispose()}})}function ax(n,e,t){const i=new Ir,r=n.loops.filter(a=>a.vertices.length>=3);if(!r.length)return{group:i,hasGeometry:!1};const s=new Ru({color:6980764,roughness:.85,metalness:.05,side:Ln});for(let a=0;a<r.length;a++){const l=r[a],c=l.vertices.map(u=>{const p=Cs(u,e);return{x:p.x,y:0,z:p.z}}),d=45+a%3*12;ox(i,c,new $e(`rgb(${d},${d+35},${d+18})`));const f=c.length;for(let u=0;u<f;u++){const p=c[u],m=c[(u+1)%f],x=(l.doors??[]).filter(g=>g.wallIndex===u);if(x.length===0)Uc(i,p,m,t,s);else for(const g of sx(p,m,x))Uc(i,g.a,g.b,t,s)}}const o=new rp(40,40,2766920,1713200);return o.position.y=0,i.add(o),{group:i,hasGeometry:!0}}class lx{constructor(e){Pt(this,"renderer");Pt(this,"scene");Pt(this,"camera");Pt(this,"building",null);Pt(this,"hasGeometry",!1);Pt(this,"alive",!0);this.renderer=new ex({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=_n,this.renderer.setClearColor(659996,1),this.scene=new Ih,this.scene.background=new $e(659996),this.scene.fog=new il(659996,25,80),this.camera=new Mn(75,1,.05,300),this.scene.add(new tp(9478328,.65));const t=new lc(16777215,.9);t.position.set(8,14,6),this.scene.add(t);const i=new lc(8954048,.35);i.position.set(-6,8,-4),this.scene.add(i);const r=new Qh(12636392,2764840,.35);this.scene.add(r)}rebuild(e,t){if(!this.alive)return!1;this.building&&(this.scene.remove(this.building),Fc(this.building),this.building=null);const i=t.pxPerMeter>0?t.pxPerMeter:50,r=t.wallHeightM??tx,{group:s,hasGeometry:o}=ax(e,i,r);return this.building=s,this.hasGeometry=o,o&&this.scene.add(s),o}render(e,t,i){if(!this.alive)return!1;const r=Math.max(1,Math.floor(e)),s=Math.max(1,Math.floor(t));return this.renderer.setSize(r,s,!1),this.camera.aspect=r/Math.max(1,s),rx(i,this.camera),this.renderer.render(this.scene,this.camera),this.hasGeometry}clearBuilding(){this.building&&(this.scene.remove(this.building),Fc(this.building),this.building=null),this.hasGeometry=!1}dispose(){this.clearBuilding(),this.alive=!1,this.renderer.dispose()}}const Oc=16,cx=22,ux=10;function dx(n){const e=n.querySelector("#canvas"),t=n.querySelector("#status"),i=n.querySelector("#area-badge"),r=n.querySelector("#px-per-m"),s=n.querySelector("#wall-length"),o=n.querySelector("#length-field"),a=n.querySelector("#corner-angle"),l=n.querySelector("#angle-field"),c=n.querySelector("#snap-angle"),d=n.querySelector("#add-door"),f=n.querySelector("#door-width"),u=n.querySelector("#door-field"),p=n.querySelector("#remove-door"),m=n.querySelector("#door-hinge-l"),x=n.querySelector("#door-hinge-r"),g=n.querySelector("#door-swing"),h=n.querySelector("#label-door"),E=n.querySelector("#split-loop"),w=n.querySelector("#partition-draw"),y=n.querySelector("#remove-partition"),T=n.querySelector("#room-type"),C=n.querySelector("#room-type-field"),L=n.querySelector("#room-name"),v=n.querySelector("#room-name-field"),R=n.querySelector("#room-name-presets"),O=n.querySelector("#split-popup"),N=n.querySelector("#split-kicker"),H=n.querySelector("#split-popup-title"),Q=n.querySelector("#split-popup-lead"),te=n.querySelector("#split-option-picks"),z=n.querySelector("#split-cancel"),Y=n.querySelector("#split-apply"),W=n.querySelector("#zoom-in"),ne=n.querySelector("#zoom-out"),re=n.querySelector("#zoom-reset"),ge=n.querySelector("#undo"),_e=n.querySelector("#save"),be=n.querySelector("#export-png"),tt=n.querySelector("#view-3d"),nt=document.querySelector("#view3d-overlay"),ze=document.querySelector("#view3d-canvas"),j=document.querySelector("#view3d-close"),ce=n.querySelector("#load"),se=n.querySelector("#load-file"),Ue=n.querySelector("#reset"),ke=n.querySelector("#tab-draw"),Ie=n.querySelector("#tab-install"),Mt=n.querySelector("#hud-draw"),Ye=n.querySelector("#hud-install"),it=n.querySelector("#install-delete"),Ze=n.querySelector("#install-rotate-cw"),Ke=n.querySelector("#install-rotate-ccw"),ot=n.querySelector("#install-status"),yt=n.querySelector("#run-finish"),Ct=n.querySelector("#run-cancel"),Lt=n.querySelector("#bom-panel"),mt=n.querySelector("#bom-list"),Et=n.querySelector("#bom-count"),U=n.querySelector("#bom-empty"),Ft=n.querySelector(".stage"),Fe=n.querySelector("#angle-popup"),A=n.querySelector("#angle-popup-lead"),_=n.querySelector("#popup-odd-list"),B=n.querySelector("#popup-main-actions"),G=n.querySelector("#popup-relocate-panel"),X=n.querySelector("#popup-corner-picks"),oe=n.querySelector("#angle-ignore"),ue=n.querySelector("#angle-confirm"),q=n.querySelector("#angle-relocate"),Z=n.querySelector("#angle-relocate-cancel"),ae=n.querySelector("#angle-relocate-apply"),Ae=n.querySelector("#popup-drag-handle"),he=n.querySelector("#lang-picker"),pe=n.querySelector("#label-wall"),Pe=n.querySelector("#label-angle"),Ne=n.querySelector("#label-ppm"),He=n.querySelector("#logo"),D=n.querySelector("#popup-kicker"),de=n.querySelector("#angle-popup-title"),J=n.querySelector("#popup-relocate-hint"),me=n.querySelector("#footer-hint");if(!e||!t||!i||!r||!s||!o||!a||!l||!c||!d||!f||!u||!p||!m||!x||!g||!h||!E||!w||!y||!T||!C||!L||!v||!R||!O||!N||!H||!Q||!te||!z||!Y||!W||!ne||!re||!ge||!_e||!be||!tt||!nt||!ze||!j||!ce||!se||!Ue||!ke||!Ie||!Mt||!Ye||!it||!Ze||!Ke||!Ft||!Fe||!A||!_||!B||!G||!X||!oe||!ue||!q||!Z||!ae||!Ae||!he||!pe||!Pe||!Ne||!He||!D||!de||!J||!me)throw new Error("HUD/canvas elements missing");const xe=e.getContext("2d");if(!xe)throw new Error("2D context unavailable");let ee=yf(),ie=wl(ee),Ee=0,pt=0,lt=!1,ln=null,cn=!1,mr=!1,gr=!1,Je=null,jt=null,En=null,De=null,gt={...Ko},$t=null;const kt=()=>{const S=Number(r.value);return Number.isFinite(S)&&S>=5?S:50},Vr=()=>gt;function Mi(){re.textContent=`${Math.round(gt.scale*100)}%`,re.title="Dubbelklik canvas of Fit = passend maken"}function Si(){const S=[];for(const P of b.model.loops)S.push(...P.vertices);S.push(...b.model.vertices),b.model.draftEnd&&S.push(b.model.draftEnd),S.length?gt=Af(S,Ee,pt,56):gt={...Ko},Mi(),K()}function _r(){if(ie=wl(ee),document.documentElement.lang=ee,document.title=ie.pageTitle,He.textContent=ie.pageTitle,pe.textContent="m",Pe.textContent="°",h.textContent="m",Ne.textContent="px/m",c.textContent="45°",c.title=ie.snapTitle,d.textContent="+ Deur",p.textContent="×",m.textContent="L",m.title="Scharnier links (L)",x.textContent="R",x.title="Scharnier rechts (R)",g.textContent="↺",g.title="Draairichting omdraaien",E.textContent="Deel…",E.title=ie.splitLoop,w.textContent=b.model.status==="partition"?"Esc":"✂ Scheiding",w.title="Scheidingswand: klik muur → sleep naar andere muur (45°/90°)",y.textContent="Weg",y.title="Scheidingswand weg → 1 ruimte",ge.textContent="↩",ge.title="Laatste handeling ongedaan (Ctrl+Z)",Ue.textContent="Reset",_e.textContent="Opslaan",ce.textContent="Laden",L&&(L.placeholder="Naam…"),Ae.title=ie.dragTitle,D.textContent=ie.meetfoutKicker,de.textContent=ie.meetfoutTitle,J.textContent=ie.relocateHint,oe.textContent=ie.ignore,ue.textContent=ie.confirm,q.textContent=ie.relocate,Z.textContent=ie.back,ae.textContent=ie.applyHere,me.textContent=ie.hint,he.querySelectorAll(".lang-btn").forEach(S=>{const P=S.dataset.lang;S.classList.toggle("active",P===ee)}),Je&&!Fe.classList.contains("hidden")){A.textContent=ie.meetfoutLead(Je.odd.length);const S=b.meetfoutLoopIndex,P=En??(S!==null?b.model.loops[S]?.vertices:null)??[];_t(P,Je.absorbIndex),Je.mode==="relocate"&&P.length>=3&&Qe(P.length,Je.absorbIndex??0)}xt(b.model)}function zi(){he.innerHTML="";for(const S of Sf){const P=document.createElement("button");P.type="button",P.className="lang-btn"+(S.code===ee?" active":""),P.dataset.lang=S.code,P.textContent=S.flag,P.title=S.name,P.setAttribute("aria-label",S.name),P.addEventListener("click",()=>{ee!==S.code&&(ee=S.code,Ef(ee),_r())}),he.appendChild(P)}}let It=[],en=[],bn=null,tn="",Tn="draw",zt=null,M=null,I=null,V=null,F=null;const b=new Ad(e,{hitRadius:Oc,closeRadius:cx,minLengthPx:ux,getPxPerMeter:kt,getView:Vr,onChange:()=>{xt(b.model),K()},onReject:()=>{lt=!0,K(),ln&&window.clearTimeout(ln),ln=window.setTimeout(()=>{lt=!1,K()},280)},onWallSelected:(S,P)=>{Je||(Yt(),pn(),dt(),P&&!s.disabled&&requestAnimationFrame(()=>{s.focus(),s.select()}))},onVertexSelected:(S,P)=>{Je||(Yt(),pn(),dt(),P&&!a.disabled&&requestAnimationFrame(()=>{a.focus(),a.select()}))},onDoorSelected:(S,P)=>{Je||(Yt(),pn(),dt(),P&&!f.disabled&&requestAnimationFrame(()=>{f.focus(),f.select()}))},onCloseMeetfout:(S,P)=>{St(S,P)}});function ve(){const S=b.model;if(En&&b.meetfoutLoopIndex!==null&&S.loops[b.meetfoutLoopIndex]){const P=b.meetfoutLoopIndex,$=S.loops.map((le,Se)=>Se===P?{...le,vertices:En}:le);return{...S,loops:$}}return S}function K(){const S=ve(),P=b.selection;uf(xe,Ee,pt,S,{pxPerMeter:kt(),hitRadius:Oc,rejectFlash:lt,selectedLoopIndex:P.kind==="wall"||P.kind==="vertex"||P.kind==="door"?P.loopIndex:null,selectedWallIndex:P.kind==="wall"?P.wallIndex:null,selectedVertexIndex:P.kind==="vertex"?P.vertexIndex:null,selectedDoorId:P.kind==="door"?P.doorId:null,popupCornerIndex:Je?.mode==="relocate"?Je.absorbIndex:Je?.odd[0]?.index??null,ghostVertices:Je?.mode==="relocate"&&En&&jt?jt:null,ghostLoopIndex:b.meetfoutLoopIndex,partitionOptions:De?(De.mode==="equal"?De.cuts:De.freeCandidates).map(($,le)=>({a:$.a,b:$.b,label:De.mode==="equal"?`÷${De.parts}`:String(le+1)})):void 0,partitionHoverIndex:De?.mode==="free"?De.freeHover:null,partitionPath:b.model.partitionPath,roomBadges:Xe(S),installations:Tn==="install"?It.map($=>({x:$.x,y:$.y,defId:$.defId,selected:$.id===M,rot:$.rot??0})):void 0,runs:Tn==="install"?en.map($=>({points:$.points,defId:$.defId,selected:$.id===I})):void 0,runDraft:Tn==="install"&&F?{points:F.points,cursor:F.cursor,defId:F.defId}:null,view:gt})}function fe(){if(!mt||!Lt)return;const S=Uf(It,en,kt());mt.innerHTML="";for(const P of S){const $=document.createElement("li");$.innerHTML=`<span class="bom-code">${P.code}</span><span class="bom-label">${P.label}</span><span class="bom-qty">${Rl(P)}</span>`,mt.appendChild($)}Lt.classList.toggle("has-items",S.length>0),Et&&(Et.textContent=S.length?`(${S.length})`:""),U&&(U.hidden=S.length>0)}function Te(){const S=!!F;yt&&(yt.disabled=!S||F.points.length<2),Ct&&(Ct.disabled=!S)}function we(){if(!F||F.points.length<2)return!1;const S={id:Id(),defId:F.defId,points:F.points.map($=>({...$}))};en=[...en,S],I=S.id,M=null,F=null,Te(),Ti(!0);const P=eu(S.points,kt());if(ot){const $=ni(S.defId);ot.textContent=`${$?.labelNl??"Leiding"}: ${Rl({defId:S.defId,qty:P,unit:"m"})} — nog een tekenen of ander symbool`}return yi(),fe(),K(),!0}function Be(){F=null,Te(),K()}function Xe(S){const P=kt();return S.loops.map(($,le)=>{const Se=Xo($.roomTypeId),We=kc($.vertices,P),Rt=$.doors?.length??0,{underMinArea:vt,missingDoor:Yn}=hd(We,Rt,Se.minAreaM2,Se.requireDoor,Jt.minDoorsPerRoom),Nt=!vt&&!Yn;let Kn=null;vt?Kn=`<${Se.minAreaM2} m²`:Yn&&(Kn="geen deur");const Gi=Sd($.name,$.roomTypeId,ee==="en"?"en":"nl");return{loopIndex:le,label:Gi,areaText:vr(We,2),ok:Nt,warn:Kn}})}function Re(){T.innerHTML="";for(const S of Jt.types){const P=document.createElement("option");P.value=S.id;const $=S.minAreaM2>0?` (≥${String(S.minAreaM2).replace(".",",")} m²)`:"";P.textContent=`${S.labelNl}${$}`,T.appendChild(P)}}function ct(){R.innerHTML="";for(const S of Md){const P=document.createElement("option");P.value=S,R.appendChild(P)}}function _t(S,P=null){const $=S.length,le=[];for(let Se=0;Se<$;Se++){const We=gi(S,Se,!0),Rt=We!==null&&!or(We),vt=P===Se,Yn="popup-angle-row interior"+(Rt?" is-odd":"")+(vt?" is-absorb":""),Nt=`${ie.cornerN(Se+1)}${vt?` · ${ie.residual}`:""}`;le.push(`<div class="${Yn}"><span class="tag">${Nt}</span><strong>${We!==null?Rs(We):"—"}</strong></div>`)}_.innerHTML=le.join("")}function St(S,P){const $=b.model.loops[S];jt=$?$.vertices.map(le=>({...le})):null,En=null,b.meetfoutLoopIndex=S,Je={odd:P,mode:"review",absorbIndex:null},A.textContent=ie.meetfoutLead(P.length),_t($?.vertices??[],null),B.classList.remove("hidden"),G.classList.add("hidden"),ut(),Fe.classList.remove("hidden"),P[0]&&b.focusCorner(P[0].index,!1),K()}function ut(){Fe.classList.remove("popup-dragged"),Fe.style.left="16px",Fe.style.top="50%",Fe.style.right="auto",Fe.style.bottom="auto",Fe.style.transform="translateY(-50%)"}function Ht(){let S=!1,P=0,$=0,le=0,Se=0,We=null;const Rt=Nt=>{if(Nt.button!==0&&Nt.pointerType==="mouse")return;const Kn=Ft.getBoundingClientRect(),Gi=Fe.getBoundingClientRect();le=Gi.left-Kn.left,Se=Gi.top-Kn.top,Fe.classList.add("popup-dragged"),Fe.style.transform="none",Fe.style.left=`${le}px`,Fe.style.top=`${Se}px`,Fe.style.right="auto",P=Nt.clientX,$=Nt.clientY,S=!0,We=Nt.pointerId,Ae.setPointerCapture(Nt.pointerId),Nt.preventDefault()},vt=Nt=>{if(!S||We!==null&&Nt.pointerId!==We)return;const Kn=Ft.getBoundingClientRect(),Gi=Fe.offsetWidth,Yu=Fe.offsetHeight;let Qs=le+(Nt.clientX-P),js=Se+(Nt.clientY-$);const Ku=Math.max(4,Kn.width-Gi-4),Zu=Math.max(4,Kn.height-Yu-4);Qs=Math.min(Ku,Math.max(4,Qs)),js=Math.min(Zu,Math.max(4,js)),Fe.style.left=`${Qs}px`,Fe.style.top=`${js}px`},Yn=Nt=>{if(S&&!(We!==null&&Nt.pointerId!==We)){S=!1,We=null;try{Ae.releasePointerCapture(Nt.pointerId)}catch{}}};Ae.addEventListener("pointerdown",Rt),window.addEventListener("pointermove",vt),window.addEventListener("pointerup",Yn),window.addEventListener("pointercancel",Yn)}function ye(S){if(!jt){const P=b.meetfoutLoopIndex,$=P!==null?b.model.loops[P]:null;jt=$?$.vertices.map(le=>({...le})):null}jt&&(En=Wc(jt,S),Je&&(Je={...Je,absorbIndex:S,mode:"relocate"}),_t(En,S),b.selectedVertexIndex=S,b.selectedWallIndex=null,K())}function nn(){if(!Je)return;const S=b.meetfoutLoopIndex,P=S!==null&&b.model.loops[S]?b.model.loops[S].vertices.length:0;if(P<3)return;jt||(jt=b.model.loops[S].vertices.map(le=>({...le})));const $=Je.odd[0]?.index??0;Je={...Je,mode:"relocate",absorbIndex:$},B.classList.add("hidden"),G.classList.remove("hidden"),Qe(P,$),ye($),ae.disabled=!1}function Qe(S,P){const $=jt??(b.meetfoutLoopIndex!==null?b.model.loops[b.meetfoutLoopIndex]?.vertices:null)??[],le=new Set(Wa($));X.innerHTML="";for(let Se=0;Se<S;Se++){const We=document.createElement("button");We.type="button",We.className="corner-pick"+(Se===P?" active":"")+(le.has(Se)?" odd":""),We.textContent=String(Se+1),We.title=ie.hoverCorner(Se+1),We.addEventListener("pointerenter",()=>{!Je||Je.mode!=="relocate"||(ye(Se),X.querySelectorAll(".corner-pick").forEach((Rt,vt)=>{Rt.classList.toggle("active",vt===Se)}))}),We.addEventListener("click",()=>{Je&&(ye(Se),X.querySelectorAll(".corner-pick").forEach((Rt,vt)=>{Rt.classList.toggle("active",vt===Se)}),ae.disabled=!1)}),X.appendChild(We)}}function un(){jt=null,En=null}function Gt(){Fe.classList.add("hidden"),B.classList.remove("hidden"),G.classList.add("hidden"),Je=null,un(),Yt(),pn(),dt(),xt(b.model),K()}function dt(){const S=b.getSelectedDoor();gr=!0;const P=b.selection.kind==="wall"&&b.selection.loopIndex!==null;d.disabled=!P;const $=b.selectedLoopIndex();E.disabled=$===null||(b.model.loops[$]?.vertices.length??0)<3,w.disabled=$===null||(b.model.loops[$]?.vertices.length??0)<3;let le=!1;b.selection.kind==="wall"&&b.selection.loopIndex!==null&&(le=Ps(b.model.loops,b.selection.loopIndex,b.selection.wallIndex)!==null),y.disabled=!le;const Se=$!==null;if(T.disabled=!Se,L.disabled=!Se,Se){const We=b.model.loops[$];T.value=We.roomTypeId??Jt.defaultTypeId,L.value=We.name??"",C.classList.add("active"),v.classList.add("active")}else C.classList.remove("active"),v.classList.remove("active"),L.value="";S?(f.disabled=!1,p.disabled=!1,m.disabled=!1,x.disabled=!1,g.disabled=!1,f.value=S.widthM.toFixed(2),u.classList.add("active"),m.classList.toggle("active",(S.hinge??"L")==="L"),x.classList.toggle("active",(S.hinge??"L")==="R")):(f.value="",f.disabled=!0,p.disabled=!0,m.disabled=!0,x.disabled=!0,g.disabled=!0,u.classList.remove("active")),gr=!1}function li(){if(Je)return;const S=b.selectedLoopIndex();if(S===null)return;const P=b.getEqualDivisionPlan(S,2,"auto"),$=b.getPartitionCandidates(S);if(!P&&$.length===0){t.textContent=ie.splitNone;return}De={loopIndex:S,parts:2,axis:P?.axis??"auto",cuts:P?.cuts??[],freeCandidates:$,mode:P?"equal":"free",freeHover:$.length?0:null},N.textContent=ie.splitKicker,H.textContent=ie.splitTitle,z.textContent=ie.splitCancel,Y.textContent=ie.splitApply,Y.disabled=!1,rn(),O.classList.remove("hidden"),O.classList.remove("popup-dragged"),O.style.left="16px",O.style.top="50%",O.style.transform="translateY(-50%)",t.textContent=ie.statusSplitParts(2),K()}function ft(S){if(!De)return;const P=b.getEqualDivisionPlan(De.loopIndex,S,"auto");if(!P){t.textContent=ie.splitNone;return}De={...De,parts:S,axis:P.axis,cuts:P.cuts,mode:"equal",freeHover:null},Y.disabled=!1,t.textContent=ie.statusSplitParts(S),rn(),K()}function bt(){if(!De||De.mode!=="equal")return;const S=De.axis==="x"?"y":"x",P=b.getEqualDivisionPlan(De.loopIndex,De.parts,S);if(!P){t.textContent=ie.splitNone;return}De={...De,axis:P.axis,cuts:P.cuts},rn(),K()}function rn(){if(!De)return;Q.textContent=ie.splitLeadEqual,te.innerHTML="";for(const P of[2,3,4]){const $=document.createElement("button");$.type="button",$.className="corner-pick"+(De.mode==="equal"&&De.parts===P?" active":""),$.textContent=`÷${P}`,$.title=ie.splitByN(P),$.addEventListener("click",()=>ft(P)),$.addEventListener("pointerenter",()=>{if(!De)return;const le=b.getEqualDivisionPlan(De.loopIndex,P,"auto");le&&(De={...De,parts:P,axis:le.axis,cuts:le.cuts,mode:"equal"},t.textContent=ie.statusSplitParts(P),rn(),K())}),te.appendChild($)}const S=document.createElement("button");if(S.type="button",S.className="corner-pick",S.textContent=De.axis==="x"?"↕":De.axis==="y"?"↔":"↻",S.title=ie.splitFlipAxis,S.addEventListener("click",()=>bt()),te.appendChild(S),De.freeCandidates.length>0){const P=document.createElement("span");P.className="popup-hint",P.style.flexBasis="100%",P.textContent=ie.splitFree,te.appendChild(P),De.freeCandidates.forEach(($,le)=>{const Se=document.createElement("button");Se.type="button",Se.className="corner-pick"+(De.mode==="free"&&De.freeHover===le?" active":""),Se.textContent=String(le+1),Se.title=`${$.wallA+1}↔${$.wallB+1}`,Se.addEventListener("pointerenter",()=>{De&&(De={...De,mode:"free",freeHover:le},t.textContent=ie.statusSplit(le+1),rn(),K())}),Se.addEventListener("click",()=>{De&&(De={...De,mode:"free",freeHover:le},Y.disabled=!1,rn(),K())}),te.appendChild(Se)})}}function rt(){O.classList.add("hidden"),De=null,K()}function Nn(){if(!De)return;const S=De.loopIndex;if(De.mode==="equal"){const P=De.parts,$=De.axis==="auto"?"auto":De.axis;if(rt(),!b.splitLoopEqualParts(S,P,$))return}else{const P=De.freeHover;if(P===null)return;const $=De.freeCandidates[P];if(!$||(rt(),!b.splitLoopWithPartition(S,$)))return}dt(),xt(b.model),K()}function $n(){if(gr||b.selection.kind!=="door")return;const S=Number(f.value.replace(",","."));if(!b.applyDoorWidthM(S)){dt();return}dt(),xt(b.model),K()}function Yt(){const S=b.getSelectedSegment();if(cn=!0,!S)s.value="",s.disabled=!0,o.classList.remove("active");else{const P=zc(S.a,S.b,kt());s.disabled=!1,s.value=P.toFixed(2),o.classList.add("active")}cn=!1}function pn(){const S=b.getSelectedCornerAngle();mr=!0,S===null?(a.value="",a.disabled=!0,c.disabled=!0,l.classList.remove("active","warn")):(a.disabled=!1,c.disabled=!1,a.value=S.toFixed(1),l.classList.add("active"),l.classList.toggle("warn",!or(S))),mr=!1}function fl(){if(cn||b.selection.kind!=="wall")return;const S=Number(s.value.replace(",","."));if(!b.applyWallLengthM(S)){Yt();return}Yt(),xt(b.model),K()}function hl(){if(mr)return;const S=Number(a.value.replace(",","."));if(!Number.isFinite(S)){pn();return}if(!b.applyCornerAngle(S)){pn();return}pn(),xt(b.model),K()}function xt(S){const P=kt(),$=b.selection.kind==="wall",le=b.selection.kind==="vertex",Se=b.selection.kind==="door",We=S.loops.length,Rt=nd(S.loops,P);if(We>0){const vt=vr(Rt);i.textContent=We===1?vt:`${We}× · ${vt}`,i.classList.remove("hidden")}else i.classList.add("hidden");if(Se){const vt=b.getSelectedDoor();if(vt){const Yn=(vt.hinge??"L")==="L"?"L":"R",Nt=(vt.swing??1)>0?"↺":"↻";t.textContent=ie.statusDoorDetail(`${vt.widthM.toFixed(2)} m`,Yn,Nt)}else t.textContent=ie.statusDoor("—");return}if(le){const vt=b.getSelectedCornerAngle();t.textContent=vt!==null?ie.statusCorner(Rs(vt))+(We?` · ${vr(Rt)}`:""):ie.statusCorner("—");return}if($){t.textContent=We>0?ie.statusClosedWall(vr(Rt)):ie.statusWallSelected;return}if(S.status==="drawing"){t.textContent=ie.statusDrawing;return}if(S.vertices.length>=2){t.textContent=ie.statusOpen(S.vertices.length-1);return}if(We>0){t.textContent=ie.statusClosed(vr(Rt));return}t.textContent=ie.statusEmpty}function Ys(){const S=Ft.getBoundingClientRect();Ee=Math.max(320,Math.floor(S.width)),pt=Math.max(320,Math.floor(S.height)),cf(e,Ee,pt),K()}oe.addEventListener("click",()=>Gt()),ue.addEventListener("click",()=>Gt()),q.addEventListener("click",()=>nn()),Z.addEventListener("click",()=>{if(!Je)return;En=null,Je={...Je,mode:"review",absorbIndex:null},B.classList.remove("hidden"),G.classList.add("hidden");const S=b.meetfoutLoopIndex,P=S!==null?b.model.loops[S]?.vertices??[]:[];_t(P),K()}),ae.addEventListener("click",()=>{const S=Je?.absorbIndex;if(S==null)return;const P=b.absorbMeetfoutAt(S);Gt(),P&&(t.textContent=ie.statusMeetfoutAt(S+1))}),ge.addEventListener("click",()=>{Je&&Gt(),De&&rt(),b.undo(),Yt(),pn(),dt(),xt(b.model),K()});const zu=Cf;function Hu(){return Ss(tn||"Plan",b.model,kt(),It,bn??void 0,en)}function Gu(S){return!S?.model||!Array.isArray(S.model.loops)?!1:(typeof S.pxPerMeter=="number"&&S.pxPerMeter>0&&(r.value=String(Math.round(S.pxPerMeter))),b.loadModel(S.model),It=S.installations??[],en=S.runs??[],F=null,I=null,M=null,bn=S.id,tn=S.name,Je&&Gt(),De&&rt(),Yt(),pn(),dt(),xt(b.model),Te(),fe(),K(),n.dispatchEvent(new Event("install-refresh")),!0)}function Vu(S){const P=Lf(S);return P?Gu(P):!1}function yi(){try{localStorage.setItem(zu,JSON.stringify(Hu()))}catch{}}function Wu(){K();const S=e,P=document.createElement("canvas");P.width=S.width,P.height=S.height;const $=P.getContext("2d");if(!$)return;$.fillStyle="#0f1419",$.fillRect(0,0,P.width,P.height),$.drawImage(S,0,0);const le=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-"),Se=document.createElement("a");Se.href=P.toDataURL("image/png"),Se.download=`wand-m2-${le}.png`,Se.click(),t.textContent="PNG geëxporteerd"}_e.addEventListener("click",()=>{const S=n.querySelector("#plan-name"),P=S?.value.trim()??"";if(P&&(tn=P),!tn.trim()){const Rt=new Date;tn=`Plan ${Rt.toLocaleDateString("nl-NL")} ${Rt.toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"})}`,S&&(S.value=tn)}const $=Ss(tn,b.model,kt(),It,bn??void 0,en);bn=$.id,tn=$.name,Cl($),yi();const le=new Blob([JSON.stringify($,null,2)],{type:"application/json"}),Se=document.createElement("a"),We=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");Se.href=URL.createObjectURL(le),Se.download=`wand-m2-${We}.json`,Se.click(),URL.revokeObjectURL(Se.href),t.textContent=`Opgeslagen in bibliotheek: ${$.name}`}),be.addEventListener("click",()=>Wu());let An=Bo(b.model,kt()),Hi=null,Ei=null;const Dt=new Set;let bi=0;function pl(){return Hi||(Hi=new lx(ze)),Hi}function xr(){if(!Hi)return;const S=ze.getBoundingClientRect(),P=Math.max(1,Math.floor(S.width)||ze.clientWidth||800),$=Math.max(1,Math.floor(S.height)||ze.clientHeight||500);P<2||$<2||Hi.render(P,$,An)}function ml(){if(nt.classList.contains("hidden")){bi=0;return}const P=.085*(Dt.has("shift")?2.4:1);let $=0,le=0,Se=0;(Dt.has("w")||Dt.has("arrowup"))&&($+=P),(Dt.has("s")||Dt.has("arrowdown"))&&($-=P),(Dt.has("d")||Dt.has("arrowright"))&&(le+=P),(Dt.has("a")||Dt.has("arrowleft"))&&(le-=P),(Dt.has("e")||Dt.has(" "))&&(Se+=P*.65),(Dt.has("q")||Dt.has("control"))&&(Se-=P*.65),($||le||Se)&&(An=ko(An,$,le,Se)),xr(),bi=requestAnimationFrame(ml)}function Xu(){const S=kt();An=Bo(b.model,S);const $=pl().rebuild(b.model,{pxPerMeter:S,wallHeightM:2.5});nt.classList.remove("hidden"),Dt.clear(),t.textContent=$?"3D: WASD lopen · sleep kijken · Q/E hoogte · Shift sneller · Esc":"3D: teken eerst een gesloten plattegrond",ze.tabIndex=0,requestAnimationFrame(()=>{xr(),requestAnimationFrame(()=>{xr(),ze.focus(),bi||(bi=requestAnimationFrame(ml))})})}function Ks(){nt.classList.add("hidden"),Ei=null,Dt.clear(),bi&&(cancelAnimationFrame(bi),bi=0),Hi?.clearBuilding()}tt.addEventListener("click",()=>Xu()),j.addEventListener("click",()=>Ks()),n.querySelector("#view3d-reset")?.addEventListener("click",()=>{An=Bo(b.model,kt()),pl().rebuild(b.model,{pxPerMeter:kt(),wallHeightM:2.5}),xr()}),nt.addEventListener("click",S=>{S.target===nt&&Ks()}),window.addEventListener("keydown",S=>{if(nt.classList.contains("hidden"))return;if(S.key==="Escape"){S.preventDefault(),Ks();return}const P=S.key.toLowerCase();(P==="w"||P==="a"||P==="s"||P==="d"||P==="q"||P==="e"||P===" "||P==="shift"||P==="control"||S.key==="ArrowUp"||S.key==="ArrowDown"||S.key==="ArrowLeft"||S.key==="ArrowRight")&&(S.preventDefault(),S.key.startsWith("Arrow")?Dt.add(S.key.toLowerCase()):Dt.add(P===" "?" ":P))}),window.addEventListener("keyup",S=>{if(nt.classList.contains("hidden"))return;const P=S.key.toLowerCase();Dt.delete(P),Dt.delete(S.key.toLowerCase()),S.key===" "&&Dt.delete(" ")}),ze.addEventListener("pointerdown",S=>{nt.classList.contains("hidden")||S.button===0&&(Ei={x:S.clientX,y:S.clientY},ze.setPointerCapture(S.pointerId),ze.focus())}),ze.addEventListener("pointermove",S=>{if(!Ei)return;const P=S.clientX-Ei.x,$=S.clientY-Ei.y;Ei={x:S.clientX,y:S.clientY},An=ix(An,P*.0045,-$*.0045)}),ze.addEventListener("pointerup",S=>{Ei=null;try{ze.releasePointerCapture(S.pointerId)}catch{}}),ze.addEventListener("wheel",S=>{if(!nt.classList.contains("hidden"))if(S.preventDefault(),S.ctrlKey){const P=S.deltaY>0?-.35:.35;An=ko(An,P,0,0)}else{const P=S.deltaY>0?-.4:.4;An=ko(An,P,0,0)}},{passive:!1}),window.addEventListener("resize",()=>{nt.classList.contains("hidden")||xr()}),ce.addEventListener("click",()=>se.click()),se.addEventListener("change",async()=>{const S=se.files?.[0];if(se.value="",!!S)try{const P=await S.text(),$=JSON.parse(P);if(!Vu($)){t.textContent="Ongeldig bestand";return}const le=Ss(tn||S.name.replace(/\.json$/i,"")||"Geïmporteerd",b.model,kt(),It,bn??void 0,en);bn=le.id,tn=le.name,Cl(le),yi(),t.textContent=`Geladen + in bibliotheek: ${le.name}`}catch{t.textContent="Laden mislukt"}});function gl(S){Tn=S;const P=S==="draw";ke.classList.toggle("active",P),Ie.classList.toggle("active",!P),ke.setAttribute("aria-selected",P?"true":"false"),Ie.setAttribute("aria-selected",P?"false":"true"),Mt.classList.toggle("hidden",!P),Ye.classList.toggle("hidden",P),b.enabled=P,zt=null,M=null,I=null,V=null,Be(),Zs.setActiveTool(null),it.disabled=!0,Ze.disabled=!0,Ke.disabled=!0,ot&&(ot.textContent=P?"":"Symbool plaatsen · leiding (menu) = lijn tekenen · Bestellijst onderaan"),P||fe(),Ys(),K()}ke.addEventListener("click",()=>gl("draw")),Ie.addEventListener("click",()=>gl("install"));const Zs=If(n,{getActivePlanMeta:()=>({id:bn,name:tn}),setActivePlanMeta:(S,P)=>{bn=S,tn=P},onSelectTool:S=>{if(zt=S,M=null,I=null,F&&F.defId!==S&&Be(),it.disabled=!0,Ze.disabled=!0,Ke.disabled=!0,ot){const P=S?ni(S):null;P&&Mr(S)?ot.textContent=`${P.labelNl}: klik punten · ✓ Klaar / Enter · Esc annuleer`:P?ot.textContent=`Plaatsen: ${P.labelNl} — klik op de tekening`:ot.textContent="Symbool of leiding kiezen · Bestellijst toont stuks + meters"}K()},onSave:()=>{_e.click()}});function _l(S){const P=e.getBoundingClientRect(),$=S.clientX-P.left,le=S.clientY-P.top;return{x:($-gt.ox)/gt.scale,y:(le-gt.oy)/gt.scale}}function qu(S){const P=Dd/Math.max(.25,gt.scale);let $=null,le=P;for(const Se of It){const We=Math.hypot(Se.x-S.x,Se.y-S.y);We<=le&&(le=We,$=Se.id)}return $}function $u(S){const P=Nd/Math.max(.25,gt.scale);let $=null,le=P;for(const Se of en){const We=Df(S,Se.points);We<=le&&(le=We,$=Se.id)}return $}e.addEventListener("pointerdown",S=>{if(Tn!=="install"||S.button!==0&&S.pointerType==="mouse")return;const P=_l(S),$=qu(P);if($&&!Mr(zt)){M=$,I=null;const le=It.find(Se=>Se.id===$);V={id:$,ox:P.x-le.x,oy:P.y-le.y},zt=null,Zs.setActiveTool(null),Be(),Ti(!0),e.setPointerCapture(S.pointerId),K();return}if(!F){const le=$u(P);if(le&&!Mr(zt)){I=le,M=null,zt=null,Zs.setActiveTool(null),Ti(!0),K();return}}if(zt&&Mr(zt)){if(!F||F.defId!==zt)F={defId:zt,points:[{...P}],cursor:null};else{const le=F.points[F.points.length-1];Math.hypot(le.x-P.x,le.y-P.y)>2&&(F={...F,points:[...F.points,{...P}],cursor:null})}if(I=null,M=null,Te(),Ti(!1),ot){const le=ni(zt),Se=F.points.length;ot.textContent=`${le?.labelNl??"Leiding"}: ${Se} punt${Se===1?"":"en"} · klik verder · ✓ Klaar`}K();return}if(zt){const le={id:Pd(),defId:zt,x:P.x,y:P.y,loopId:null,note:"",rot:0};It=[...It,le],M=le.id,I=null,Ti(!0),yi(),fe(),K()}}),e.addEventListener("pointermove",S=>{if(Tn!=="install")return;const P=_l(S);if(V){It=It.map($=>$.id===V.id?{...$,x:P.x-V.ox,y:P.y-V.oy}:$),K();return}F&&(F={...F,cursor:P},K())}),e.addEventListener("pointerup",S=>{if(Tn==="install"&&V){V=null,yi(),fe();try{e.releasePointerCapture(S.pointerId)}catch{}}}),e.addEventListener("dblclick",S=>{Tn!=="install"||!F||(S.preventDefault(),we())}),yt?.addEventListener("click",()=>we()),Ct?.addEventListener("click",()=>{if(Be(),ot&&Mr(zt)){const S=ni(zt);ot.textContent=`${S?.labelNl??"Leiding"}: klik startpunt`}});function Ti(S){const P=!!M;it.disabled=!S,Ze.disabled=!P,Ke.disabled=!P}function Wr(S){M&&(It=It.map(P=>{if(P.id!==M)return P;const $=(((P.rot??0)+S)%360+360)%360;return{...P,rot:$}}),yi(),K())}Ze.addEventListener("click",()=>Wr(45)),Ke.addEventListener("click",()=>Wr(-45)),window.addEventListener("keydown",S=>{if(Tn!=="install")return;const P=S.target;if(!(P&&(P.tagName==="INPUT"||P.tagName==="SELECT"||P.tagName==="TEXTAREA"))){if(F){if(S.key==="Enter"){S.preventDefault(),we();return}if(S.key==="Escape"){S.preventDefault(),Be();return}}if(!(!M&&!I))if(S.key==="e"||S.key==="E"){if(!M)return;S.preventDefault(),Wr(45)}else if(S.key==="q"||S.key==="Q"){if(!M)return;S.preventDefault(),Wr(-45)}else(S.key==="Delete"||S.key==="Backspace")&&(S.preventDefault(),it.click())}}),it.addEventListener("click",()=>{if(M)It=It.filter(S=>S.id!==M),M=null;else if(I)en=en.filter(S=>S.id!==I),I=null;else return;Ti(!1),yi(),fe(),K()}),Ue.addEventListener("click",()=>{Je&&Gt(),De&&rt(),b.reset(),It=[],en=[],F=null,bn=null,tn="",M=null,I=null,zt=null,Ti(!1),Te(),fe();const S=n.querySelector("#plan-name");S&&(S.value=""),Yt(),pn(),dt(),xt(b.model),K()}),r.addEventListener("change",()=>{Yt(),xt(b.model),K()}),r.addEventListener("input",()=>{Yt(),xt(b.model),K()}),s.addEventListener("change",()=>fl()),s.addEventListener("keydown",S=>{S.key==="Enter"&&(S.preventDefault(),fl(),s.blur())}),a.addEventListener("change",()=>hl()),a.addEventListener("keydown",S=>{S.key==="Enter"&&(S.preventDefault(),hl(),a.blur())}),c.addEventListener("click",()=>{b.snapSelectedCornerCanonical()&&(pn(),xt(b.model),K())}),d.addEventListener("click",()=>{b.addDoorOnSelectedWall()&&(dt(),xt(b.model),K())}),p.addEventListener("click",()=>{b.removeSelectedDoor()&&(dt(),xt(b.model),K())}),m.addEventListener("click",()=>{b.setSelectedDoorHinge("L")&&(dt(),xt(b.model),K())}),x.addEventListener("click",()=>{b.setSelectedDoorHinge("R")&&(dt(),xt(b.model),K())}),g.addEventListener("click",()=>{b.flipSelectedDoorSwing()&&(dt(),xt(b.model),K())}),E.addEventListener("click",()=>li()),w.addEventListener("click",()=>{if(b.model.status==="partition"){b.cancelPartitionDraw(),t.textContent=ie.statusIdle,K();return}b.beginPartitionDraw()&&(t.textContent=ie.statusPartitionDraw,K())}),y.addEventListener("click",()=>{b.selection.kind!=="wall"||b.selection.loopIndex===null||b.deleteSharedWall(b.selection.loopIndex,b.selection.wallIndex)&&(dt(),xt(b.model),K())}),T.addEventListener("change",()=>{const S=T.value;if(!b.setSelectedRoomType(S))return;const P=b.selectedLoopIndex();if(P!==null&&!b.model.loops[P].name){const le=Xo(S);b.setSelectedRoomName(le.labelNl),L.value=le.labelNl}dt(),xt(b.model),K()}),L.addEventListener("change",()=>{b.setSelectedRoomName(L.value)&&(xt(b.model),K())}),L.addEventListener("keydown",S=>{S.key==="Enter"&&(S.preventDefault(),L.blur())}),z.addEventListener("click",()=>{rt(),xt(b.model)}),Y.addEventListener("click",()=>Nn());function Js(S,P,$){const le=P??Ee/2,Se=$??pt/2;gt=Tf(gt,le,Se,S),Mi(),K()}W.addEventListener("click",()=>Js(1.25)),ne.addEventListener("click",()=>Js(1/1.25)),re.addEventListener("click",()=>Si()),e.addEventListener("wheel",S=>{S.preventDefault();const P=e.getBoundingClientRect(),$=S.clientX-P.left,le=S.clientY-P.top,Se=wf(S.deltaY,S.deltaMode);Js(Se,$,le)},{passive:!1}),e.addEventListener("dblclick",S=>{S.preventDefault(),Si()});let Xr=!1;window.addEventListener("keydown",S=>{if(S.code==="Space"&&!S.repeat&&(Xr=!0,e.style.cursor="grab"),S.key==="Escape"&&b.model.status==="partition"&&(b.cancelPartitionDraw(),xt(b.model),K()),(S.ctrlKey||S.metaKey)&&(S.key==="z"||S.key==="Z")&&!S.shiftKey){const P=S.target;if(P&&(P.tagName==="INPUT"||P.tagName==="TEXTAREA"||P.isContentEditable))return;S.preventDefault(),Je&&Gt(),De&&rt(),b.undo(),Yt(),pn(),dt(),xt(b.model),K()}if(S.key==="Delete"||S.key==="Backspace"){const P=S.target;if(P&&(P.tagName==="INPUT"||P.tagName==="TEXTAREA"||P.isContentEditable))return;S.preventDefault(),b.deleteLine()&&(dt(),xt(b.model),K())}}),window.addEventListener("keyup",S=>{S.code==="Space"&&(Xr=!1,e.style.cursor="")}),e.addEventListener("pointerdown",S=>{(S.button===1||S.button===0&&(S.altKey||Xr))&&(S.preventDefault(),$t={x:S.clientX,y:S.clientY,ox:gt.ox,oy:gt.oy},e.style.cursor="grabbing",e.setPointerCapture(S.pointerId))}),e.addEventListener("pointermove",S=>{$t&&(gt={scale:gt.scale,ox:$t.ox+(S.clientX-$t.x),oy:$t.oy+(S.clientY-$t.y)},K())}),e.addEventListener("pointerup",S=>{if($t){$t=null,e.style.cursor=Xr?"grab":"";try{e.releasePointerCapture(S.pointerId)}catch{}}}),e.addEventListener("contextmenu",S=>S.preventDefault());const wn=new Map;let Un=null;e.addEventListener("pointerdown",S=>{if(S.pointerType==="touch"&&(wn.set(S.pointerId,{x:S.clientX,y:S.clientY}),wn.size===2)){const P=[...wn.values()],$=P[0].x-P[1].x,le=P[0].y-P[1].y,Se=e.getBoundingClientRect();Un={dist:Math.hypot($,le)||1,scale:gt.scale,cx:(P[0].x+P[1].x)/2-Se.left,cy:(P[0].y+P[1].y)/2-Se.top}}}),e.addEventListener("pointermove",S=>{if(wn.has(S.pointerId)&&(wn.set(S.pointerId,{x:S.clientX,y:S.clientY}),wn.size===2&&Un)){const P=[...wn.values()],$=P[0].x-P[1].x,le=P[0].y-P[1].y,We=(Math.hypot($,le)||1)/Un.dist,Rt=Math.min(8,Math.max(.2,Un.scale*We)),vt={x:(Un.cx-gt.ox)/gt.scale,y:(Un.cy-gt.oy)/gt.scale};gt={scale:Rt,ox:Un.cx-vt.x*Rt,oy:Un.cy-vt.y*Rt},Mi(),K()}}),e.addEventListener("pointerup",S=>{wn.delete(S.pointerId),wn.size<2&&(Un=null)}),e.addEventListener("pointercancel",S=>{wn.delete(S.pointerId),wn.size<2&&(Un=null)}),f.addEventListener("change",()=>$n()),f.addEventListener("keydown",S=>{S.key==="Enter"&&(S.preventDefault(),$n(),f.blur())}),window.addEventListener("resize",Ys),Ht(),zi(),Re(),ct(),_r(),Mi(),Ys(),xt(b.model),Yt(),pn(),dt()}const ku=document.querySelector("#app");if(!ku)throw new Error("#app not found");dx(ku);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wand-m2/sw.js").catch(()=>{})});
