var yd=Object.defineProperty;var Ed=(n,e,t)=>e in n?yd(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Ut=(n,e,t)=>Ed(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const ao=Math.PI*2;function Ie(n,e){const t=e.x-n.x,i=e.y-n.y;return Math.hypot(t,i)}function Yo(n,e){return{x:(n.x+e.x)/2,y:(n.y+e.y)/2}}function hn(n,e){return Math.atan2(e.y-n.y,e.x-n.x)}function $s(n){let e=n%ao;return e<=-Math.PI&&(e+=ao),e>Math.PI&&(e-=ao),e}function Pl(n,e=45){const t=e*Math.PI/180;return Math.round(n/t)*t}function Ll(n,e,t=45){const i=t*Math.PI/180,r=$s(e-n),s=Math.round(r/i)*i;return n+s}function Ko(n,e,t){return{x:n.x+Math.cos(e)*t,y:n.y+Math.sin(e)*t}}function Cs(n,e,t){return Ie(n,e)<=t}function ns(n,e,t){return(e.x-n.x)*(t.y-n.y)-(e.y-n.y)*(t.x-n.x)}function is(n,e,t,i){return Math.min(n.x,e.x)-i<=t.x&&t.x<=Math.max(n.x,e.x)+i&&Math.min(n.y,e.y)-i<=t.y&&t.y<=Math.max(n.y,e.y)+i}function Ys(n,e,t=1e-6){const{a:i,b:r}=n,{a:s,b:o}=e;if(Ie(i,s)<t||Ie(i,o)<t||Ie(r,s)<t||Ie(r,o)<t)return!1;const a=ns(s,o,i),l=ns(s,o,r),c=ns(i,r,s),u=ns(i,r,o);return!!((a>t&&l<-t||a<-t&&l>t)&&(c>t&&u<-t||c<-t&&u>t)||Math.abs(a)<=t&&is(s,o,i,t)||Math.abs(l)<=t&&is(s,o,r,t)||Math.abs(c)<=t&&is(i,r,s,t)||Math.abs(u)<=t&&is(i,r,o,t))}function nu(n){const e=[];for(let t=0;t<n.length-1;t++)e.push({a:n[t],b:n[t+1]});return e}function Tt(n,e){const t=nu(n);return e&&n.length>=3&&t.push({a:n[n.length-1],b:n[0]}),t}function Ks(n,e,t){const i=t.x-e.x,r=t.y-e.y,s=i*i+r*r;if(s<1e-12)return Ie(n,e);let o=((n.x-e.x)*i+(n.y-e.y)*r)/s;return o=Math.max(0,Math.min(1,o)),Ie(n,{x:e.x+o*i,y:e.y+o*r})}function Zo(n,e,t){const i=t.x-e.x,r=t.y-e.y,s=i*i+r*r;if(s<1e-12)return 0;const o=((n.x-e.x)*i+(n.y-e.y)*r)/s;return Math.max(0,Math.min(1,o))}function Xt(n,e,t){return{x:n.x+(e.x-n.x)*t,y:n.y+(e.y-n.y)*t}}function Wr(n,e,t,i,r){const s=Ie(n,e);if(s<2||i<=0||r<=0)return null;const o=i*r;if(o>s+.5)return null;const a=o/2,l=Math.max(0,s-o),c=Math.min(4,l/2);let u=Math.max(0,Math.min(1,t));const h=a/s,d=c/s,f=Math.min(.5,h+d),m=Math.max(.5,1-h-d);u=Math.max(f,Math.min(m,u));const v=Xt(n,e,u-h),g=Xt(n,e,u+h),p=Xt(n,e,u);return{a:n,b:e,openA:v,openB:g,center:p,dir:hn(n,e),halfWidthPx:Ie(v,g)/2,wallLenPx:s}}function bd(n,e,t,i){const r=Ie(n,e);if(r<1e-6)return[];if(!t.length)return[{a:n,b:e}];const s=[];for(const c of t){const u=Wr(n,e,c.t,c.widthM,i);if(!u)continue;const h=Ie(n,u.openA)/r,d=Ie(n,u.openB)/r;s.push({t0:Math.min(h,d),t1:Math.max(h,d)})}if(!s.length)return[{a:n,b:e}];s.sort((c,u)=>c.t0-u.t0);const o=[];for(const c of s){const u=o[o.length-1];!u||c.t0>u.t1+1e-6?o.push({...c}):u.t1=Math.max(u.t1,c.t1)}const a=[];let l=0;for(const c of o)c.t0-l>1e-4&&a.push({a:Xt(n,e,l),b:Xt(n,e,c.t0)}),l=c.t1;return 1-l>1e-4&&a.push({a:Xt(n,e,l),b:Xt(n,e,1)}),a}function Td(n,e,t,i,r){const s=Tt(e,!0);let o=null,a=r;for(const l of t){const c=s[l.wallIndex];if(!c)continue;const u=Wr(c.a,c.b,l.t,l.widthM,i);if(!u)continue;const h=Ks(n,u.openA,u.openB),d=Ie(n,u.center),f=Math.min(h,d);f<=a&&(a=f,o=l.id)}return o}function Il(n,e,t,i){const r=Tt(e,t);let s=null,o=i;for(let a=0;a<r.length;a++){const l=Ks(n,r[a].a,r[a].b);l<=o&&(o=l,s=a)}return s}function Dl(n,e,t,i=1e-6){if(n.length<1)return!1;const s={a:n[n.length-1],b:e},o=nu(n);for(let a=0;a<o.length;a++)if(a!==o.length-1&&!(t&&a===0)&&Ys(s,o[a],i))return!0;return!1}function iu(n,e){if(n.length<3||e<=0)return 0;let t=0;const i=n.length;for(let s=0;s<i;s++){const o=(s+1)%i;t+=n[s].x*n[o].y-n[o].x*n[s].y}return Math.abs(t)/2/(e*e)}function ru(n,e,t){return t<=0?0:Ie(n,e)/t}function Ja(n,e=2){return`${n.toFixed(e)} m`}function Er(n,e=2){return`${n.toFixed(e)} m²`}function Ad(n,e,t,i){const r=n.length;if(r<2||t<1)return null;const s=i?r:r-1;if(e<0||e>=s)return null;const o=e,a=i?(o+1)%r:o+1,l=n[o],c=n[a],u=Ie(l,c);if(u<1e-9)return null;const h=(c.x-l.x)/u,d=(c.y-l.y)/u,f={x:l.x+h*t,y:l.y+d*t},m=n.map(v=>({...v}));return m[a]=f,m}function wd(n,e){return n.reduce((t,i)=>t+iu(i.vertices,e),0)}function ks(n,e=1){return`${n.toFixed(e)}°`}function Cd(n,e,t){const i=n.x-e.x,r=n.y-e.y,s=t.x-e.x,o=t.y-e.y,a=Math.hypot(i,r),l=Math.hypot(s,o);if(a<1e-9||l<1e-9)return 0;const c=Math.max(-1,Math.min(1,(i*s+r*o)/(a*l)));return Math.acos(c)*180/Math.PI}function su(n,e,t){const i=hn(n,e),r=hn(e,t);return $s(r-i)}function Qa(n){let e=0;const t=n.length;if(t<3)return 1;for(let i=0;i<t;i++){const r=(i+1)%t;e+=n[i].x*n[r].y-n[r].x*n[i].y}return e<0?-1:1}function Br(n,e,t,i){const r=su(n,e,t),s=i>=0?1:-1;let o=Math.PI-s*r;o<=1e-9&&(o+=Math.PI*2),o>Math.PI*2+1e-9&&(o-=Math.PI*2);let a=o*180/Math.PI;a<0&&(a+=360),a>360&&(a-=360),a<.05&&(a=360);const l=360-a;return{interiorDeg:a,exteriorDeg:l,wallWedgeDeg:Cd(n,e,t)}}function Zs(n,e,t){const i=ou(n,e,t);if(!i)return null;const r=t?Qa(n):ja(n);return Br(i.prev,i.corner,i.next,r)}function ja(n){if(n.length<3)return 1;let e=0;for(let t=1;t<n.length-1;t++)e+=su(n[t-1],n[t],n[t+1]);return e<0?-1:1}const Rd=[45,90,135,180,225,270,315];function ur(n,e=45,t=1.5){const i=(n%e+e)%e;return i<=t||e-i<=t}function Jo(n,e=[...Rd]){let t=n%360;t<0&&(t+=360);let i=e[0]??90,r=1/0;for(const s of e){const o=Math.min(Math.abs(t-s),360-Math.abs(t-s));o<r&&(r=o,i=s)}return i}function ou(n,e,t){const i=n.length;if(i<3||!t&&(e<=0||e>=i-1)||t&&(e<0||e>=i))return null;const r=t?(e-1+i)%i:e-1,s=t?(e+1)%i:e+1;return{prev:n[r],corner:n[e],next:n[s],prevIdx:r,nextIdx:s}}function xi(n,e,t){const i=Zs(n,e,t);return i?i.interiorDeg:null}function kr(n,e,t,i){if(n.length<3)return null;const s=ou(n,e,i);if(!s)return null;const a=(i?Qa(n):ja(n))>=0?1:-1,l=Ie(s.corner,s.next);if(l<1e-6)return null;let c=t;if(!Number.isFinite(c))return null;c=Math.max(1,Math.min(359,c));const u=hn(s.prev,s.corner),h=a*(Math.PI-c*Math.PI/180),d=u+h,f=n.map(m=>({...m}));return f[s.nextIdx]=Ko(s.corner,d,l),f}function Pd(n,e,t,i){return kr(n,e,t,i)}function Ld(n,e,t,i=[45,90,135,180,225,270,315]){const r=xi(n,e,t);if(r===null)return null;const s=Jo(r,i);return kr(n,e,s,t)}function Id(n,e,t,i){const r=hn(e,n),s=hn(e,t),o=i>=0?1:-1;let a=$s(s-r);const c=Br(n,e,t,o).interiorDeg*Math.PI/180;let u=a;Math.abs(Math.abs(u)-c)>.15&&(u=u>0?u-Math.PI*2:u+Math.PI*2),Math.abs(Math.abs(u)-c)>.2&&(u=Math.sign(u||o)*c);const h=r+u/2;return{startRad:r,endRad:r+u,midRad:h,sweepRad:u}}function au(n,e,t){const i=hn(n,e),r=hn(e,t);return $s(r-i)*180/Math.PI}function Nl(n,e,t){let i=null,r=t;for(let s=0;s<e.length;s++){const o=Ie(n,e[s]);o<=r&&(r=o,i=s)}return i}function el(n,e,t=1.5){if(n.length<3)return[];const i=[];for(let r=0;r<n.length;r++){const s=xi(n,r,!0);s!==null&&!ur(s,45,t)&&i.push(r)}return i}function Rs(n){const e=Tt(n,!0);for(let t=0;t<e.length;t++)for(let i=t+1;i<e.length;i++)if(i!==t+1&&!(t===0&&i===e.length-1)&&Ys(e[t],e[i]))return!0;return!1}function ii(n,e){if(e)return Rs(n);const t=Tt(n,!1);for(let i=0;i<t.length;i++)for(let r=i+1;r<t.length;r++)if(r!==i+1&&Ys(t[i],t[r]))return!0;return!1}function lu(n,e,t=8){const i=n.length;if(i<3||e<0||e>=i)return n.map(a=>({...a}));let r=n.map(a=>({...a}));for(let a=0;a<t;a++){let l=!1;const c=a%2===0?[...Array(i).keys()]:[...Array(i).keys()].reverse();for(const u of c){if(u===e)continue;const h=xi(r,u,!0);if(h===null)continue;const d=Jo(h);if(Math.abs(h-d)<.75)continue;const f=kr(r,u,d,!0);f&&!Rs(f)&&Ie(f[(u+1)%i],r[(u+1)%i])>.05&&(r=f,l=!0)}if(!l)break}const s=xi(r,e,!0),o=el(r).filter(a=>a!==e);if(o.length===0&&s!==null&&ur(s)){const a=xi(n,e,!0);if(a!==null&&!ur(a)){const l=kr(r,e,a,!0);l&&!Rs(l)&&(r=l)}}else if(o.length>0)for(let a=0;a<i;a++){const l=(e+1+a)%i;if(l===e)continue;const c=xi(r,l,!0);if(c===null)continue;const u=Jo(c);if(Math.abs(c-u)<.75)continue;const h=kr(r,l,u,!0);h&&!Rs(h)&&(r=h)}return r}function Qo(n,e){const t=e.length;if(t<3)return!1;for(let r=0;r<t;r++){const s=e[r],o=e[(r+1)%t];if(Ks(n,s,o)<1e-6)return!0}let i=!1;for(let r=0,s=t-1;r<t;s=r++){const o=e[r].x,a=e[r].y,l=e[s].x,c=e[s].y;a>n.y!=c>n.y&&n.x<(l-o)*(n.y-a)/(c-a+1e-15)+o&&(i=!i)}return i}function tl(n,e,t){const i=Ie(n,e);if(i<8)return!1;const r=(e.x-n.x)/i,s=(e.y-n.y)/i,o=Math.min(3,i*.08),a={x:n.x+r*o,y:n.y+s*o},l={x:e.x-r*o,y:e.y-s*o},c=Tt(t,!0);for(const u of c)if(Ys({a,b:l},u))return!1;for(let u=1;u<=4;u++){const h=u/5,d=Xt(n,e,h);if(!Qo(d,t))return!1}return!0}function Dd(n,e,t){return n===e||(n+1)%t===e||(e+1)%t===n}function Nd(n){const e=n.length;if(e<4)return[];const t=[],i=new Set,r=(o,a,l,c)=>{if(Dd(o,l,e))return;const u=Xt(n[o],n[(o+1)%e],a),h=Xt(n[l],n[(l+1)%e],c);if(!tl(u,h,n))return;let d=o,f=a,m=l,v=c,g=u,p=h;(d>m||d===m&&f>v)&&([d,m]=[m,d],[f,v]=[v,f],[g,p]=[p,g]);const y=`${d}:${f.toFixed(2)}-${m}:${v.toFixed(2)}`;i.has(y)||(i.add(y),t.push({id:y,wallA:d,tA:f,wallB:m,tB:v,a:g,b:p}))},s=[.5,.33,.67];for(let o=0;o<e;o++)for(let a=o+2;a<e;a++)if(!(o===0&&a===e-1))for(const l of s)for(const c of s)r(o,l,a,c);return t.sort((o,a)=>Ie(a.a,a.b)-Ie(o.a,o.b)),t.sort((o,a)=>{const l=c=>(Math.abs(c.tA-.5)<.01&&Math.abs(c.tB-.5)<.01?1e3:0)+Ie(c.a,c.b);return l(a)-l(o)}),t.slice(0,12)}function nl(n,e,t,i,r){const s=n.length;if(s<3||e===i)return null;tl(Xt(n[e],n[(e+1)%s],t),Xt(n[i],n[(i+1)%s],r),n);const o=Array.from({length:s},()=>[]);o[e].push({which:"A",t}),o[i].push({which:"B",t:r});for(const m of o)m.sort((v,g)=>v.t-g.t);const a=[];let l=-1,c=-1;for(let m=0;m<s;m++){const v=n[m],g=n[(m+1)%s],p=a.length;a.push({...v});for(const y of o[m])if(y.t<=1e-6)y.which==="A"?l=p:c=p;else if(!(y.t>=1-1e-6)){const b=Xt(v,g,y.t),S=a.length;a.push(b),y.which==="A"?l=S:c=S}}for(let m=0;m<s;m++)for(const v of o[m])if(v.t>=1-1e-6){const g=(m+1)%s;let p=0;for(let y=0;y<g;y++){p+=1;for(const b of o[y])b.t>1e-6&&b.t<1-1e-6&&(p+=1)}v.which==="A"?l=p:c=p}if(l<0||c<0||l===c)return null;const u=a.length,h=(m,v)=>{const g=[];let p=m;for(let y=0;y<u+2&&(g.push({...a[p]}),p!==v);y++)p=(p+1)%u;return g},d=h(l,c),f=h(c,l);return d.length<3||f.length<3||ii(d,!0)||ii(f,!0)?null:{loopA:d,loopB:f}}function Ui(n,e,t=28){const i=Tt(n,!0);let r=null;for(let s=0;s<i.length;s++){const o=Ks(e,i[s].a,i[s].b),a=Zo(e,i[s].a,i[s].b);(!r||o<r.d)&&(r={wallIndex:s,t:a,d:o})}return!r||r.d>t?null:r}function Ud(n,e,t,i=4,r=1e6){const s=Math.cos(e),o=Math.sin(e),a=Tt(t,!0);let l=null;for(let c=0;c<a.length;c++){const{a:u,b:h}=a[c],d=h.x-u.x,f=h.y-u.y,m=u.x-n.x,v=u.y-n.y,g=s*f-o*d;if(Math.abs(g)<1e-12)continue;const p=(m*f-v*d)/g,y=(m*o-v*s)/g;if(p<i||p>r||y<-.02||y>1.02)continue;const b=Math.max(0,Math.min(1,y)),S={x:u.x+d*b,y:u.y+f*b};Ie(S,n)<i||(!l||p<l.dist)&&(l={point:S,wallIndex:c,tOnWall:b,dist:p})}return l}function cu(n,e,t){const i=Tt(n,!0),r=[];for(let l=0;l<i.length;l++){const{a:c,b:u}=i[l];if(e==="x"){const h=u.x-c.x;if(Math.abs(h)<1e-9)continue;const d=(t-c.x)/h;if(d<-1e-6||d>1+1e-6)continue;const f=Math.max(0,Math.min(1,d)),m=Xt(c,u,f);if(Math.abs(m.x-t)>.5)continue;r.push({p:m,wall:l,t:f})}else{const h=u.y-c.y;if(Math.abs(h)<1e-9)continue;const d=(t-c.y)/h;if(d<-1e-6||d>1+1e-6)continue;const f=Math.max(0,Math.min(1,d)),m=Xt(c,u,f);if(Math.abs(m.y-t)>.5)continue;r.push({p:m,wall:l,t:f})}}if(r.length<2)return null;const s=[];for(const l of r)s.some(c=>Ie(c.p,l.p)<1.5)||s.push(l);if(s.length<2)return null;s.sort((l,c)=>e==="x"?l.p.y-c.p.y:l.p.x-c.p.x);const o=s[0],a=s[s.length-1];return o.wall===a.wall||!tl(o.p,a.p,n)?null:{id:`axis-${e}-${t.toFixed(1)}`,wallA:o.wall,tA:o.t,wallB:a.wall,tB:a.t,a:o.p,b:a.p}}function uu(n,e,t){if(n.length<3||e<2)return null;let i=1/0,r=-1/0,s=1/0,o=-1/0;for(const m of n)i=Math.min(i,m.x),r=Math.max(r,m.x),s=Math.min(s,m.y),o=Math.max(o,m.y);const a=r-i,l=o-s;if(a<20&&l<20)return null;const c=m=>{const v=m==="x"?i:s,p=(m==="x"?r:o)-v;if(p<30)return null;const y=[];for(let b=1;b<e;b++){const S=v+p*b/e,A=cu(n,m,S);if(!A)return null;y.push(A)}return y},u=t==="x"||t==="y"?t:a>=l?"x":"y",h=u==="x"?"y":"x";let d=c(u),f=u;return d||(d=c(h),f=h),!d||d.length!==e-1?null:{parts:e,axis:f,cuts:d}}function Fd(n,e,t){const i=uu(n,e,t);if(!i)return null;const r=[...i.cuts].sort((a,l)=>{const c=i.axis==="x"?(a.a.x+a.b.x)/2:(a.a.y+a.b.y)/2,u=i.axis==="x"?(l.a.x+l.b.x)/2:(l.a.y+l.b.y)/2;return c-u}),s=[];let o=n.map(a=>({...a}));for(let a=0;a<r.length;a++){const l=i.axis==="x"?(r[a].a.x+r[a].b.x)/2:(r[a].a.y+r[a].b.y)/2,c=cu(o,i.axis,l);if(!c)return null;const u=nl(o,c.wallA,c.tA,c.wallB,c.tB);if(!u)return null;const h=Ul(u.loopA),d=Ul(u.loopB),f=i.axis==="x"?h.x:h.y,m=i.axis==="x"?d.x:d.y;f<=m?(s.push(u.loopA),o=u.loopB):(s.push(u.loopB),o=u.loopA)}return s.push(o),s.length!==e?null:s}function Ul(n){let e=0,t=0;for(const r of n)e+=r.x,t+=r.y;const i=Math.max(1,n.length);return{x:e/i,y:t/i}}function Od(n,e){if(e.length<2||n.length<3)return null;const t=Ui(n,e[0],40),i=Ui(n,e[e.length-1],40);if(!t||!i||t.wallIndex===i.wallIndex&&Math.abs(t.t-i.t)<.02)return null;const r=nl(n,t.wallIndex,t.t,i.wallIndex,i.t);if(!r)return null;if(e.length===2)return r;const s=e.slice(1,-1).map(c=>({...c}));if(!s.length)return r;const o=(c,u)=>{if(c.length<2)return c;const h=u?[...s].reverse():[...s];return[...c,...h]},a=o(r.loopA,!0),l=o(r.loopB,!1);return a.length<3||l.length<3?null:ii(a,!0)||ii(l,!0)?r:{loopA:a,loopB:l}}function Bd(n,e,t,i,r=1){return{underMinArea:t>0&&n+1e-6<t,missingDoor:i&&e<r}}const kd=6;function zd(n,e,t,i,r=kd){return Ie(n,t)<r&&Ie(e,i)<r||Ie(n,i)<r&&Ie(e,t)<r}function zs(n,e,t){const i=n[e];if(!i||i.vertices.length<2)return null;const s=Tt(i.vertices,!0)[t];if(!s)return null;for(let o=0;o<n.length;o++){if(o===e)continue;const a=Tt(n[o].vertices,!0);for(let l=0;l<a.length;l++)if(zd(s.a,s.b,a[l].a,a[l].b))return{loopIndex:e,wallIndex:t,partnerLoopIndex:o,partnerWallIndex:l}}return null}function Fl(n,e,t,i){const r=n.length;if(r<3||e<0||e>=r)return null;const s=n.map(l=>({...l})),o=e,a=(e+1)%r;return s[o]={x:s[o].x+t,y:s[o].y+i},s[a]={x:s[a].x+t,y:s[a].y+i},Ie(s[o],s[a])<2?null:s}function Hd(n,e,t,i){const r=n.length,s=t.length;if(r<3||s<3)return null;const o=n[e],a=n[(e+1)%r],l=t[i],c=t[(i+1)%s],u=t.map(f=>({...f})),h=Ie(l,o)+Ie(c,a),d=Ie(l,a)+Ie(c,o);return h<=d?(u[i]={...o},u[(i+1)%s]={...a}):(u[i]={...a},u[(i+1)%s]={...o}),u}function Vd(n,e){const t=Ie(n,e)||1;return{x:-(e.y-n.y)/t,y:(e.x-n.x)/t}}function Gd(n,e,t,i){const r=Vd(t,i),s=n*r.x+e*r.y;return{dx:r.x*s,dy:r.y*s}}function Wd(n,e,t,i){const r=n.length,s=t.length;if(r<3||s<3)return null;const o=n[e],a=n[(e+1)%r],l=t[i],c=t[(i+1)%s],u=8,h=Ie(o,l)<u&&Ie(a,c)<u,d=Ie(o,c)<u&&Ie(a,l)<u;if(!h&&!d)return null;const f=[];let m=(e+1)%r;for(let p=0;p<r-1;p++)f.push({...n[m]}),m=(m+1)%r;let v=(i+1)%s;for(let p=0;p<s-1;p++)f.push({...t[v]}),v=(v+1)%s;const g=[];for(const p of f)(!g.length||Ie(g[g.length-1],p)>1.5)&&g.push(p);return g.length>=2&&Ie(g[0],g[g.length-1])<1.5&&g.pop(),g.length<3||ii(g,!0)?null:g}const Xd=["Slaapkamer","Slaapkamer 1p","Slaapkamer 2p","Gang","Badkamer","Toilet","Woonkamer","Keuken","Berging","Kantoor","Techniek","Entree","Balkon","Overig"],Jt={defaultDoorWidthM:.9,tileSizeM:.3,majorGridM:1,minDoorsPerRoom:1,types:[{id:"bedroom1",code:"1p",labelNl:"Slaapkamer 1p",labelEn:"Bedroom 1p",minAreaM2:3.5,requireDoor:!0},{id:"bedroom2",code:"2p",labelNl:"Slaapkamer 2p",labelEn:"Bedroom 2p",minAreaM2:7,requireDoor:!0},{id:"hall",code:"GANG",labelNl:"Gang",labelEn:"Hall",minAreaM2:0,requireDoor:!1},{id:"bath",code:"BAD",labelNl:"Badkamer",labelEn:"Bathroom",minAreaM2:0,requireDoor:!0},{id:"toilet",code:"WC",labelNl:"Toilet",labelEn:"Toilet",minAreaM2:0,requireDoor:!0},{id:"living",code:"WOON",labelNl:"Woonkamer",labelEn:"Living",minAreaM2:0,requireDoor:!1},{id:"kitchen",code:"KEU",labelNl:"Keuken",labelEn:"Kitchen",minAreaM2:0,requireDoor:!1},{id:"storage",code:"BERG",labelNl:"Berging",labelEn:"Storage",minAreaM2:0,requireDoor:!1},{id:"office",code:"KANT",labelNl:"Kantoor",labelEn:"Office",minAreaM2:0,requireDoor:!0},{id:"other",code:"—",labelNl:"Overig",labelEn:"Other",minAreaM2:0,requireDoor:!1}],defaultTypeId:"other"};function jo(n){return Jt.types.find(t=>t.id===n)??Jt.types.find(t=>t.id===Jt.defaultTypeId)}function qd(n,e,t="nl"){const i=(n??"").trim();if(i)return i;const r=jo(e);return t==="en"?r.labelEn:r.labelNl}let $d=1,Yd=1;function Ri(){return`L${$d++}`}function Kd(){return`D${Yd++}`}const Zd=Jt.defaultDoorWidthM;class Jd{constructor(e,t){Ut(this,"model",{loops:[],status:"idle",vertices:[],draftEnd:null,partitionPath:null,partitionLoopIndex:null});Ut(this,"selection",{kind:"none"});Ut(this,"meetfoutLoopIndex",null);Ut(this,"enabled",!0);Ut(this,"pointerId",null);Ut(this,"active",!1);Ut(this,"dragDoor",null);Ut(this,"dragWall",null);Ut(this,"history",[]);Ut(this,"maxHistory",60);Ut(this,"historyLocked",!1);Ut(this,"onDown",e=>{if(!this.enabled||e.button!==0&&e.pointerType==="mouse")return;const t=this.localPoint(e),{vertices:i,status:r}=this.model;if(r==="partition"&&this.model.partitionLoopIndex!==null){this.handlePartitionClick(t);return}if((r==="open"||r==="drawing")&&i.length>0){const o=i[i.length-1];if(Cs(t,o,this.worldHitRadius()*1.6)){this.model={...this.model,status:"drawing",draftEnd:t},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange();return}}const s=this.hitTestAll(t);if(s.kind==="door"){this.pushHistory(),this.setSelection(s,!1,!1,!0),this.dragDoor={loopIndex:s.loopIndex,doorId:s.doorId},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange();return}if(this.selection.kind==="door"&&s.kind==="wall"&&s.loopIndex===this.selection.loopIndex){const o=this.getSelectedDoor();if(o&&o.wallIndex===s.wallIndex){this.dragDoor={loopIndex:this.selection.loopIndex,doorId:this.selection.doorId},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId);return}}if(s.kind==="wall"&&s.loopIndex!==null){this.pushHistory(),this.setSelection(s,!0,!1),this.dragWall={loopIndex:s.loopIndex,wallIndex:s.wallIndex,partner:zs(this.model.loops,s.loopIndex,s.wallIndex),last:t},this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange();return}if(s.kind==="wall"){this.setSelection(s,!0,!1),this.cfg.onChange();return}if(s.kind==="vertex"){this.setSelection(s,!1,!0),this.cfg.onChange();return}(r==="idle"||r==="open"&&i.length===0)&&(this.pushHistory(),this.model={...this.model,status:"drawing",vertices:[{...t}],draftEnd:t},this.setSelection({kind:"none"}),this.active=!0,this.pointerId=e.pointerId,this.canvas.setPointerCapture(e.pointerId),this.cfg.onChange())});Ut(this,"onMove",e=>{if(!this.enabled)return;const t=this.localPoint(e);if(this.dragDoor){this.moveDoorToPoint(this.dragDoor.loopIndex,this.dragDoor.doorId,t)&&this.cfg.onChange();return}if(this.dragWall){this.moveDraggedWall(t);return}if(this.model.status==="partition"&&this.model.partitionPath&&this.model.partitionPath.length>0){const r=this.snapPartitionDraft(t);this.model={...this.model,draftEnd:r},this.cfg.onChange();return}if(!this.active||e.pointerId!==this.pointerId||this.model.status!=="drawing"||this.model.vertices.length===0)return;const i=this.snapDraft(t);this.model={...this.model,draftEnd:i},this.cfg.onChange()});Ut(this,"onUp",e=>{if(!this.enabled)return;if(this.dragDoor){this.dragDoor=null,this.active=!1,this.pointerId=null,this.cfg.onChange();return}if(this.dragWall){this.dragWall=null,this.active=!1,this.pointerId=null,this.cfg.onChange();return}if(!this.active||this.pointerId!==null&&e.pointerId!==this.pointerId)return;this.active=!1,this.pointerId=null;const{vertices:t,draftEnd:i}=this.model;if(!i||t.length===0){this.finishCancelDraft();return}const r=t[t.length-1],s=Ie(r,i);if(t.length===1&&s<this.cfg.minLengthPx){this.model={...this.model,status:"idle",vertices:[],draftEnd:null},this.cfg.onChange();return}if(s<this.cfg.minLengthPx){this.finishCancelDraft();return}if(t.length>=3&&Cs(i,t[0],this.worldCloseRadius())){if(Dl(t,t[0],!0)){this.cfg.onReject(),this.finishCancelDraft();return}const l=[...t],c={id:Ri(),vertices:l,doors:[],roomTypeId:Jt.defaultTypeId,name:null},u=[...this.model.loops,c],h=u.length-1;this.pushHistory(),this.model={loops:u,status:"idle",vertices:[],draftEnd:null,partitionPath:null,partitionLoopIndex:null},this.meetfoutLoopIndex=h,this.setSelection({kind:"wall",loopIndex:h,wallIndex:0},!0,!1),this.cfg.onChange();const d=el(l);if(d.length>0&&this.cfg.onCloseMeetfout){const f=d.map(m=>{const v=Zs(l,m,!0);return v?{index:m,angles:v}:null}).filter(m=>m!==null);f.length&&this.cfg.onCloseMeetfout(h,f)}return}if(Dl(t,i,!1)){this.cfg.onReject(),this.finishCancelDraft();return}const a=[...t,i];this.pushHistory(),this.model={...this.model,status:"open",vertices:a,draftEnd:null},this.setSelection({kind:"wall",loopIndex:null,wallIndex:a.length-2},!0,!1),this.cfg.onChange()});this.canvas=e,this.cfg=t,this.bind()}cloneModel(e){return JSON.parse(JSON.stringify(e))}cloneSelection(e){return JSON.parse(JSON.stringify(e))}pushHistory(){this.historyLocked||(this.history.push({model:this.cloneModel(this.model),selection:this.cloneSelection(this.selection),meetfoutLoopIndex:this.meetfoutLoopIndex}),this.history.length>this.maxHistory&&this.history.shift())}bind(){this.canvas.addEventListener("pointerdown",this.onDown),this.canvas.addEventListener("pointermove",this.onMove),this.canvas.addEventListener("pointerup",this.onUp),this.canvas.addEventListener("pointercancel",this.onUp)}destroy(){this.canvas.removeEventListener("pointerdown",this.onDown),this.canvas.removeEventListener("pointermove",this.onMove),this.canvas.removeEventListener("pointerup",this.onUp),this.canvas.removeEventListener("pointercancel",this.onUp)}emitSelection(e=!1,t=!1,i=!1){this.selection.kind==="wall"?(this.cfg.onWallSelected?.(this.selection,e),this.cfg.onVertexSelected?.({kind:"none"},!1),this.cfg.onDoorSelected?.({kind:"none"},!1)):this.selection.kind==="vertex"?(this.cfg.onVertexSelected?.(this.selection,t),this.cfg.onWallSelected?.({kind:"none"},!1),this.cfg.onDoorSelected?.({kind:"none"},!1)):this.selection.kind==="door"?(this.cfg.onDoorSelected?.(this.selection,i),this.cfg.onWallSelected?.({kind:"none"},!1),this.cfg.onVertexSelected?.({kind:"none"},!1)):(this.cfg.onWallSelected?.({kind:"none"},!1),this.cfg.onVertexSelected?.({kind:"none"},!1),this.cfg.onDoorSelected?.({kind:"none"},!1))}setSelection(e,t=!1,i=!1,r=!1){this.selection=e,this.emitSelection(t,i,r)}get selectedWallIndex(){return this.selection.kind==="wall"?this.selection.wallIndex:null}set selectedWallIndex(e){if(e===null)this.selection.kind==="wall"&&(this.selection={kind:"none"});else{const t=this.selection.kind==="wall"||this.selection.kind==="vertex"?this.selection.loopIndex:this.model.loops.length?this.model.loops.length-1:null;this.selection={kind:"wall",loopIndex:t,wallIndex:e}}}get selectedVertexIndex(){return this.selection.kind==="vertex"?this.selection.vertexIndex:null}set selectedVertexIndex(e){if(e===null)this.selection.kind==="vertex"&&(this.selection={kind:"none"});else{const t=this.selection.kind==="wall"||this.selection.kind==="vertex"?this.selection.loopIndex:this.model.loops.length?this.model.loops.length-1:null;this.selection={kind:"vertex",loopIndex:t,vertexIndex:e}}}focusCorner(e,t=!0){const i=this.meetfoutLoopIndex??(this.model.loops.length?this.model.loops.length-1:null);this.setSelection({kind:"vertex",loopIndex:i,vertexIndex:e},!1,t),this.cfg.onChange()}vertsForSelection(){if(this.selection.kind==="none"||this.selection.kind==="door")return null;if(this.selection.loopIndex===null)return{vertices:this.model.vertices,closed:!1};const e=this.model.loops[this.selection.loopIndex];return e?{vertices:e.vertices,closed:!0}:null}writeVerts(e,t,i=!1){if(i&&this.pushHistory(),t===null)this.model={...this.model,vertices:e,draftEnd:null};else{const r=this.model.loops.map((s,o)=>o===t?{...s,vertices:e}:s);this.model={...this.model,loops:r}}}writeLoop(e,t,i=!1){i&&this.pushHistory();const r=this.model.loops.map((s,o)=>o===e?{...s,...t}:s);this.model={...this.model,loops:r}}getSelectedDoor(){if(this.selection.kind!=="door")return null;const e=this.selection;return this.model.loops[e.loopIndex]?.doors.find(i=>i.id===e.doorId)??null}absorbMeetfoutAt(e){const t=this.meetfoutLoopIndex;if(t===null)return!1;const i=this.model.loops[t];if(!i)return!1;const r=lu(i.vertices,e);return ii(r,!0)?(this.cfg.onReject(),!1):(this.writeVerts(r,t,!0),this.setSelection({kind:"vertex",loopIndex:t,vertexIndex:e},!1,!1),this.cfg.onChange(),!0)}getSelectedSegment(){if(this.selection.kind!=="wall")return null;const e=this.vertsForSelection();return e?Tt(e.vertices,e.closed)[this.selection.wallIndex]??null:null}getSelectedCornerAngle(){if(this.selection.kind!=="vertex")return null;const e=this.vertsForSelection();return e?xi(e.vertices,this.selection.vertexIndex,e.closed):null}getDraftTurnDeg(){const{vertices:e,draftEnd:t}=this.model;return!t||e.length<2?null:au(e[e.length-2],e[e.length-1],t)}applyCornerAngle(e){if(this.selection.kind!=="vertex")return!1;const t=this.vertsForSelection();if(!t)return!1;const i=Pd(t.vertices,this.selection.vertexIndex,e,t.closed);return i?ii(i,t.closed)?(this.cfg.onReject(),!1):(this.writeVerts(i,this.selection.loopIndex,!0),this.cfg.onChange(),this.emitSelection(!1,!1),!0):!1}snapSelectedCornerCanonical(){if(this.selection.kind!=="vertex")return!1;const e=this.vertsForSelection();if(!e)return!1;const t=Ld(e.vertices,this.selection.vertexIndex,e.closed);return t?ii(t,e.closed)?(this.cfg.onReject(),!1):(this.writeVerts(t,this.selection.loopIndex,!0),this.cfg.onChange(),this.emitSelection(!1,!1),!0):!1}applyWallLengthM(e){if(this.selection.kind!=="wall"||!(e>0)||!Number.isFinite(e))return!1;const t=this.vertsForSelection();if(!t)return!1;const i=this.cfg.getPxPerMeter(),r=e*i,s=Ad(t.vertices,this.selection.wallIndex,r,t.closed);return s?ii(s,t.closed)?(this.cfg.onReject(),!1):(this.writeVerts(s,this.selection.loopIndex,!0),this.cfg.onChange(),this.emitSelection(!1,!1),!0):!1}addDoorOnSelectedWall(e,t=Zd){if(this.selection.kind!=="wall"||this.selection.loopIndex===null)return!1;const i=this.selection.loopIndex,r=this.model.loops[i];if(!r)return!1;const o=Tt(r.vertices,!0)[this.selection.wallIndex];if(!o)return!1;const a=e?Zo(e,o.a,o.b):.5,l=this.cfg.getPxPerMeter();if(!Wr(o.a,o.b,a,t,l))return this.cfg.onReject(),!1;const u={id:Kd(),wallIndex:this.selection.wallIndex,t:a,widthM:t,hinge:"L",swing:1},h=[...r.doors??[],u];return this.writeLoop(i,{doors:h},!0),this.setSelection({kind:"door",loopIndex:i,doorId:u.id},!1,!1,!0),this.cfg.onChange(),!0}applyDoorWidthM(e){if(this.selection.kind!=="door")return!1;const t=this.selection;if(!(e>.2)||!Number.isFinite(e))return!1;const i=t.loopIndex,r=this.model.loops[i];if(!r)return!1;const s=r.doors.find(u=>u.id===t.doorId);if(!s)return!1;const a=Tt(r.vertices,!0)[s.wallIndex];if(!a)return!1;if(!Wr(a.a,a.b,s.t,e,this.cfg.getPxPerMeter()))return this.cfg.onReject(),!1;const c=r.doors.map(u=>u.id===s.id?{...u,widthM:e}:u);return this.writeLoop(i,{doors:c},!0),this.cfg.onChange(),this.emitSelection(!1,!1,!1),!0}removeSelectedDoor(){if(this.selection.kind!=="door")return!1;const e=this.selection,t=e.loopIndex,i=e.doorId,r=this.model.loops[t];return r?(this.writeLoop(t,{doors:r.doors.filter(s=>s.id!==i)},!0),this.setSelection({kind:"none"}),this.cfg.onChange(),!0):!1}setSelectedDoorHinge(e){return this.patchSelectedDoor({hinge:e})}flipSelectedDoorSwing(){const e=this.getSelectedDoor();return e?this.patchSelectedDoor({swing:e.swing===1?-1:1}):!1}setSelectedRoomType(e){const t=this.selectedLoopIndex();return t===null?!1:(this.writeLoop(t,{roomTypeId:e},!0),this.cfg.onChange(),!0)}setSelectedRoomName(e){const t=this.selectedLoopIndex();if(t===null)return!1;const i=(e??"").trim();return this.writeLoop(t,{name:i.length?i:null},!0),this.cfg.onChange(),!0}beginPartitionDraw(e){const t=e??this.selectedLoopIndex();if(t===null)return!1;const i=this.model.loops[t];return!i||i.vertices.length<3?!1:(this.model={...this.model,status:"partition",partitionPath:[],partitionLoopIndex:t,draftEnd:null,vertices:[]},this.setSelection({kind:"none"}),this.cfg.onChange(),!0)}cancelPartitionDraw(){this.model={...this.model,status:"idle",partitionPath:null,partitionLoopIndex:null,draftEnd:null},this.cfg.onChange()}deleteLine(){if(this.model.status==="partition"){const e=this.model.partitionPath??[];return this.pushHistory(),e.length<=1?(this.model={...this.model,status:"idle",partitionPath:null,partitionLoopIndex:null,draftEnd:null},this.cfg.onChange(),!0):(this.model={...this.model,partitionPath:e.slice(0,-1),draftEnd:null},this.cfg.onChange(),!0)}if(this.selection.kind==="door")return this.removeSelectedDoor();if(this.model.vertices.length>0||this.model.status==="drawing"||this.model.status==="open"){this.pushHistory();const e=this.model.vertices.slice(0,-1);return e.length<=1?(this.model={...this.model,status:"idle",vertices:[],draftEnd:null},this.setSelection({kind:"none"})):(this.model={...this.model,status:"open",vertices:e,draftEnd:null},this.setSelection({kind:"wall",loopIndex:null,wallIndex:e.length-2})),this.cfg.onChange(),!0}return this.selection.kind==="wall"&&this.selection.loopIndex!==null?this.deleteSharedWall(this.selection.loopIndex,this.selection.wallIndex):!1}deleteSharedWall(e,t){const i=zs(this.model.loops,e,t);if(!i)return this.cfg.onReject(),!1;const r=this.model.loops[e],s=this.model.loops[i.partnerLoopIndex];if(!r||!s)return!1;const o=Wd(r.vertices,t,s.vertices,i.partnerWallIndex);if(!o)return this.cfg.onReject(),!1;const a=Math.min(e,i.partnerLoopIndex),l=Math.max(e,i.partnerLoopIndex),c={id:Ri(),vertices:o,doors:[],roomTypeId:r.roomTypeId??Jt.defaultTypeId,name:r.name??s.name};this.pushHistory();const u=[...this.model.loops.slice(0,a),c,...this.model.loops.slice(a+1,l),...this.model.loops.slice(l+1)];return this.model={...this.model,loops:u},this.setSelection({kind:"wall",loopIndex:a,wallIndex:0},!0,!1),this.cfg.onChange(),!0}patchSelectedDoor(e){if(this.selection.kind!=="door")return!1;const t=this.selection,i=this.model.loops[t.loopIndex];if(!i||!i.doors.some(s=>s.id===t.doorId))return!1;const r=i.doors.map(s=>s.id===t.doorId?{...s,hinge:s.hinge??"L",swing:s.swing??1,...e}:s);return this.writeLoop(t.loopIndex,{doors:r},!0),this.cfg.onChange(),this.emitSelection(!1,!1,!1),!0}selectedLoopIndex(){return this.selection.kind==="none"?null:this.selection.kind==="door"?this.selection.loopIndex:this.selection.loopIndex}getPartitionCandidates(e){const t=this.model.loops[e];return!t||t.vertices.length<4?[]:Nd(t.vertices)}getEqualDivisionPlan(e,t,i="auto"){const r=this.model.loops[e];return r?uu(r.vertices,t,i):null}splitLoopWithPartition(e,t){const i=this.model.loops[e];if(!i)return!1;const r=nl(i.vertices,t.wallA,t.tA,t.wallB,t.tB);if(!r)return this.cfg.onReject(),!1;const s={id:Ri(),vertices:r.loopA,doors:[],roomTypeId:Jt.defaultTypeId,name:null},o={id:Ri(),vertices:r.loopB,doors:[],roomTypeId:Jt.defaultTypeId,name:null},a=[...this.model.loops.slice(0,e),s,o,...this.model.loops.slice(e+1)];return this.pushHistory(),this.model={...this.model,loops:a},this.meetfoutLoopIndex=null,this.setSelection({kind:"wall",loopIndex:e,wallIndex:0},!0,!1),this.cfg.onChange(),!0}splitLoopEqualParts(e,t,i="auto"){const r=this.model.loops[e];if(!r)return!1;const s=Fd(r.vertices,t,i);if(!s||s.length!==t)return this.cfg.onReject(),!1;const o=s.map(l=>({id:Ri(),vertices:l,doors:[],roomTypeId:Jt.defaultTypeId,name:null})),a=[...this.model.loops.slice(0,e),...o,...this.model.loops.slice(e+1)];return this.pushHistory(),this.model={...this.model,loops:a},this.meetfoutLoopIndex=null,this.setSelection({kind:"wall",loopIndex:e,wallIndex:0},!0,!1),this.cfg.onChange(),!0}moveDoorToPoint(e,t,i){const r=this.model.loops[e];if(!r)return!1;const s=r.doors.find(v=>v.id===t);if(!s)return!1;const a=Tt(r.vertices,!0)[s.wallIndex];if(!a)return!1;const l=Ie(a.a,a.b);if(l<1)return!1;const c=this.cfg.getPxPerMeter(),u=s.widthM*c/2,h=Math.max(0,l-s.widthM*c),d=Math.min(4,h/2),f=Math.min(.5,(u+d)/l);let m=Zo(i,a.a,a.b);return m=Math.max(f,Math.min(1-f,m)),this.writeLoop(e,{doors:r.doors.map(v=>v.id===t?{...v,t:m}:v)}),!0}reset(){this.pushHistory(),this.model={loops:[],status:"idle",vertices:[],draftEnd:null,partitionPath:null,partitionLoopIndex:null},this.selection={kind:"none"},this.meetfoutLoopIndex=null,this.active=!1,this.pointerId=null,this.dragDoor=null,this.dragWall=null,this.emitSelection(),this.cfg.onChange()}loadModel(e){this.history=[],this.historyLocked=!0,this.model={loops:e.loops??[],status:e.status??"idle",vertices:e.vertices??[],draftEnd:e.draftEnd??null,partitionPath:e.partitionPath??null,partitionLoopIndex:e.partitionLoopIndex??null},this.selection={kind:"none"},this.meetfoutLoopIndex=this.model.loops.length>0?this.model.loops.length-1:null,this.active=!1,this.pointerId=null,this.dragDoor=null,this.dragWall=null,this.historyLocked=!1,this.emitSelection(),this.cfg.onChange()}undo(){const e=this.history.pop();return e?(this.historyLocked=!0,this.model=e.model,this.selection=e.selection,this.meetfoutLoopIndex=e.meetfoutLoopIndex,this.historyLocked=!1,this.active=!1,this.pointerId=null,this.dragDoor=null,this.dragWall=null,this.emitSelection(),this.cfg.onChange(),!0):(this.cfg.onReject(),!1)}localPoint(e){const t=this.canvas.getBoundingClientRect(),i=e.clientX-t.left,r=e.clientY-t.top,s=this.cfg.getView?.()??{scale:1,ox:0,oy:0};return{x:(i-s.ox)/s.scale,y:(r-s.oy)/s.scale}}worldHitRadius(){const e=this.cfg.getView?.().scale??1;return this.cfg.hitRadius/Math.max(.25,e)}worldCloseRadius(){const e=this.cfg.getView?.().scale??1;return this.cfg.closeRadius/Math.max(.25,e)}hitTestAll(e){const t=this.cfg.getPxPerMeter(),i=this.worldHitRadius();for(let r=this.model.loops.length-1;r>=0;r--){const s=this.model.loops[r],o=s.doors??[],a=Td(e,s.vertices,o,t,i*1.8);if(a)return{kind:"door",loopIndex:r,doorId:a};const l=Nl(e,s.vertices,i);if(l!==null)return{kind:"vertex",loopIndex:r,vertexIndex:l};const c=Il(e,s.vertices,!0,i);if(c!==null)return{kind:"wall",loopIndex:r,wallIndex:c}}if(this.model.vertices.length>=2){const r=Nl(e,this.model.vertices,i);if(r!==null&&r>0&&r<this.model.vertices.length-1)return{kind:"vertex",loopIndex:null,vertexIndex:r};const s=Il(e,this.model.vertices,!1,i);if(s!==null)return{kind:"wall",loopIndex:null,wallIndex:s}}return{kind:"none"}}snapPartitionDraft(e){const t=this.model.partitionLoopIndex,i=this.model.partitionPath;if(t===null||!i?.length)return e;const r=this.model.loops[t];if(!r)return e;const s=i[0],o=i[i.length-1],a=Math.max(18,this.worldHitRadius()*1.8),l=Ui(r.vertices,s,12),c=hn(o,e),u=Math.max(Ie(o,e),1);let h;if(i.length>=2){const m=i[i.length-2];h=Ll(hn(m,o),c,45)}else h=Pl(c,45);const d=Ud(o,h,r.vertices,10,2e4);if(d&&Ie(d.point,s)>a&&Ie(o,e)>=d.dist-a)return{...d.point};const f=Ui(r.vertices,e,a);if(f){const m=Tt(r.vertices,!0),v=Xt(m[f.wallIndex].a,m[f.wallIndex].b,f.t),g=Ie(v,s)>a*1.25,p=!l||f.wallIndex!==l.wallIndex||Math.abs(f.t-l.t)>.08;if(g&&p)return v}return Ko(o,h,u)}snapPointToLoopWall(e,t,i){const r=Ui(e,t,i);if(!r)return null;const s=Tt(e,!0);return Xt(s[r.wallIndex].a,s[r.wallIndex].b,r.t)}isPartitionEndOnWall(e,t,i,r){const s=Ui(e,t,r);if(!s)return null;const o=Tt(e,!0),a=Xt(o[s.wallIndex].a,o[s.wallIndex].b,s.t);if(Ie(a,i)<Math.max(16,r*.75))return null;const l=Ui(e,i,12);return l&&l.wallIndex===s.wallIndex&&Math.abs(l.t-s.t)<.05?null:a}commitPartitionPath(e,t){const i=this.model.loops[e];if(!i||t.length<2)return!1;const r=this.snapPointToLoopWall(i.vertices,t[0],40),s=this.snapPointToLoopWall(i.vertices,t[t.length-1],40);if(!r||!s)return!1;const o=[r,...t.slice(1,-1),s],a=Od(i.vertices,o);if(!a||a.loopA.length<3||a.loopB.length<3)return!1;this.pushHistory();const l={id:Ri(),vertices:a.loopA,doors:[],roomTypeId:i.roomTypeId??Jt.defaultTypeId,name:null},c={id:Ri(),vertices:a.loopB,doors:[],roomTypeId:Jt.defaultTypeId,name:null},u=[...this.model.loops.slice(0,e),l,c,...this.model.loops.slice(e+1)];return this.model={...this.model,loops:u,status:"idle",partitionPath:null,partitionLoopIndex:null,draftEnd:null},this.setSelection({kind:"wall",loopIndex:e,wallIndex:0},!0,!1),this.cfg.onChange(),!0}moveDraggedWall(e){if(!this.dragWall)return;const{loopIndex:t,wallIndex:i,partner:r,last:s}=this.dragWall,o=this.model.loops[t];if(!o)return;const l=Tt(o.vertices,!0)[i];if(!l)return;const c=e.x-s.x,u=e.y-s.y,{dx:h,dy:d}=Gd(c,u,l.a,l.b);if(Math.hypot(h,d)<.2)return;const f=Fl(o.vertices,i,h,d);if(!f){this.cfg.onReject();return}let m=this.model.loops.map((v,g)=>g===t?{...v,vertices:f}:v);if(r){const v=m[r.partnerLoopIndex];if(v){const g=Fl(v.vertices,r.partnerWallIndex,h,d),p=Hd(f,i,g??v.vertices,r.partnerWallIndex);if(!p){this.cfg.onReject();return}m=m.map((y,b)=>b===r.partnerLoopIndex?{...y,vertices:p}:y)}}this.model={...this.model,loops:m},this.dragWall={...this.dragWall,last:e},this.cfg.onChange()}finishCancelDraft(){const{vertices:e}=this.model;e.length<=1?(this.model={...this.model,status:"idle",vertices:[],draftEnd:null},this.setSelection({kind:"none"})):this.model={...this.model,status:"open",draftEnd:null},this.cfg.onChange()}handlePartitionClick(e){const t=this.model.partitionLoopIndex;if(t===null)return;const i=this.model.loops[t];if(!i)return;const r=[...this.model.partitionPath??[]],s=Math.max(22,this.worldHitRadius()*2);if(r.length===0){const u=this.snapPointToLoopWall(i.vertices,e,s);if(!u){this.cfg.onReject();return}this.model={...this.model,partitionPath:[u],draftEnd:null},this.cfg.onChange();return}const o=r[0],a=this.snapPartitionDraft(e),l=this.isPartitionEndOnWall(i.vertices,a,o,s+6)??this.isPartitionEndOnWall(i.vertices,e,o,s);if(l){const u=[...r,l];this.commitPartitionPath(t,u)||this.cfg.onReject();return}if(!(Qo(a,i.vertices)||Qo(e,i.vertices))){this.cfg.onReject();return}if(Ie(a,o)<12){this.cfg.onReject();return}r.push({...a}),this.model={...this.model,partitionPath:r,draftEnd:null},this.cfg.onChange()}snapDraft(e){const{vertices:t}=this.model,i=t[t.length-1];if(t.length>=3&&Cs(e,t[0],this.worldCloseRadius()))return{...t[0]};const r=Ie(i,e);if(r<1)return{...e};const s=hn(i,e);let o;if(t.length===1)o=Pl(s,45);else{const a=t[t.length-2],l=t[t.length-1];o=Ll(hn(a,l),s,45)}return Ko(i,o,r)}}const Ol=[{id:"switchgear",labelNl:"Schakelmateriaal"},{id:"supply",labelNl:"Voedingen"},{id:"cables",labelNl:"Leidingen"},{id:"standard",labelNl:"Standaard"}],du=[{id:"el-socket-pe",category:"electric",group:"switchgear",labelNl:"Enkele WCD randaarde",code:"WCD",color:"#e8eef7",symbol:"socket-pe"},{id:"el-socket-2",category:"electric",group:"switchgear",labelNl:"Dubbele WCD randaarde",code:"WCD2",color:"#e8eef7",symbol:"socket-double"},{id:"el-centraal",category:"electric",group:"standard",labelNl:"Centraaldoos",code:"CD",color:"#e8eef7",symbol:"centraal"},{id:"el-light",category:"electric",group:"standard",labelNl:"Lamp / lichtpunt",code:"LP",color:"#e8eef7",symbol:"light"},{id:"el-switch-w",category:"electric",group:"switchgear",labelNl:"Wisselschakelaar",code:"SW",color:"#e8eef7",symbol:"switch-wissel"},{id:"el-switch",category:"electric",group:"switchgear",labelNl:"Schakelaar (1-polig)",code:"S",color:"#e8eef7",symbol:"switch-1p"},{id:"el-switch-2",category:"electric",group:"switchgear",labelNl:"Tweepolige schakelaar",code:"S2",color:"#e8eef7",symbol:"switch-2p"},{id:"el-switch-x",category:"electric",group:"switchgear",labelNl:"Kruisschakelaar",code:"SX",color:"#e8eef7",symbol:"switch-kruis"},{id:"el-switch-ser",category:"electric",group:"switchgear",labelNl:"Serieschakelaar",code:"SS",color:"#e8eef7",symbol:"switch-serie"},{id:"el-dimmer",category:"electric",group:"switchgear",labelNl:"Dimmer",code:"DIM",color:"#e8eef7",symbol:"dimmer"},{id:"el-push",category:"electric",group:"switchgear",labelNl:"Drukknop",code:"DK",color:"#e8eef7",symbol:"pushbutton"},{id:"el-combo",category:"electric",group:"switchgear",labelNl:"Schakelaar + WCD",code:"S+W",color:"#e8eef7",symbol:"combo-sw-socket"},{id:"el-socket",category:"electric",group:"switchgear",labelNl:"WCD zonder aarding",code:"WCD0",color:"#e8eef7",symbol:"socket"},{id:"el-socket-4",category:"electric",group:"switchgear",labelNl:"Viervoudige WCD randaarde",code:"WCD4",color:"#e8eef7",symbol:"socket-quad"},{id:"el-mk",category:"electric",group:"supply",labelNl:"Meterkast",code:"MK",color:"#ffd166",symbol:"meterkast"},{id:"el-centraal-light",category:"electric",group:"supply",labelNl:"Centraaldoos met lichtpunt",code:"CD+L",color:"#e8eef7",symbol:"centraal-light"},{id:"el-cable-empty",category:"electric",group:"cables",labelNl:"Loze leiding",code:"LL",color:"#8ab4f8",symbol:"cable-empty",place:"run"},{id:"el-cable-wired",category:"electric",group:"cables",labelNl:"Bedrade leiding",code:"BL",color:"#6cb6ff",symbol:"cable-wired",place:"run"},{id:"el-cable-earth",category:"electric",group:"cables",labelNl:"Leiding met aarding",code:"LA",color:"#3dd68c",symbol:"cable-earth",place:"run"},{id:"el-floor-pass",category:"electric",group:"cables",labelNl:"Doorvoer verdieping",code:"DV",color:"#ffd166",symbol:"floor-pass",place:"point"},{id:"el-light-sig",category:"electric",group:"standard",labelNl:"Lichtpunt signalering",code:"LS",color:"#e8eef7",symbol:"light-signal"},{id:"el-tl",category:"electric",group:"standard",labelNl:"TL-verlichting",code:"TL",color:"#e8eef7",symbol:"light-tl"},{id:"el-junction",category:"electric",group:"standard",labelNl:"Lasdoos",code:"LD",color:"#e8eef7",symbol:"junction"}],hu=["el-socket-pe","el-socket-2","el-centraal","el-light","el-switch-w","el-switch"];function ri(n){return du.find(e=>e.id===n)}function br(n){return n?ri(n)?.place==="run":!1}function Qd(){return hu.map(n=>ri(n)).filter(n=>!!n)}function jd(n){const e=new Set(hu);return du.filter(t=>t.category==="electric"&&t.group===n&&!e.has(t.id))}let eh=1;function th(){return`I${eh++}`}let nh=1;function ih(){return`R${nh++}`}const rh=14,sh=10,oh=[["A",-.22159,0,.27841,270,90],["L",-.22159,0,.05682,0],["L",-.22159,0,.5,12e-5],["C",.11023,12e-5,.0534]],ah=[["C",-.3806,0,.1194],["L",-.26119,-13e-5,.5,0]],lh=[["A",-.22159,0,.27841,270,90],["L",-.22159,0,.05682,0],["L",-.22159,0,.5,12e-5],["C",.11127,12e-5,.0534]],ch=[["C",-.38059,0,.11941],["L",-.26124,-.00363,.5,-.00351]],uh=[["C",-.3806,-.1194,.1194],["L",-.26119,-.11953,.5,-.1194],["C",-.3806,.1194,.1194],["L",-.26119,.11928,.5,.1194]],dh=[["L",-.27013,-13e-5,.5,0],["C",-.37919,0,.12081]],hh=[["C",-.3806,.15097,.1194],["C",-.3806,-.15097,.1194],["L",-.26119,.15084,.5,.15097],["L",-.26119,-.15109,.5,-.15097]],fh=[["L",-.27013,-13e-5,.5,0],["C",-.37919,0,.12081]],ph=[["L",0,.5,0,-.5],["C",0,0,.38333],["L",-.5,0,.5,0],["L",0,.5,-.5,0],["L",-.5,0,0,-.5],["L",0,-.5,.5,0],["L",.5,0,0,.5]],mh=[["A",0,0,.5,3.199,176.801],["P",!1,[[.49922,.0279],[-.49922,.0279]]]],gh=[["C",0,0,.5]],_h=[["L",.00115,.5,-.00115,-.5]],vh=[["L",.5,-.34165,.5,.34165],["L",-.5,-.34165,.5,-.34165],["L",-.5,-.34165,.5,-.34165],["L",.5,.34165,-.5,.34165],["L",.5,.34165,-.5,.34165]],xh=[["L",.5,0,.5,.21284],["L",.5,.21284,.02082,0],["L",.5,0,.5,-.21284],["L",-.5,0,.5,0],["L",.5,-.21284,.02082,0]],Mh=[["L",.31461,.5,-.31461,.5],["L",-.31461,-.5,.31461,-.5],["L",.31461,-.5,.31461,.5],["L",-.31461,.5,-.31461,-.5],["L",-.31461,.5,.31461,-.5],["L",.31461,.5,-.31461,-.5],["L",-.31461,.5,.31461,-.5],["L",.31461,.5,-.31461,-.5]],Sh=[["L",-.5,.04052,.5,-.25125],["L",.5,.25125,-.5,.04052],["L",.5,.25125,.5,-.25125],["L",-.5,.04052,.5,-.25125],["L",.5,.25125,-.5,.04052],["L",.5,.25125,.5,-.25125]],yh={socket_switched_single:oh,socket_switched_double:ah,socket_switched_double_alt:lh,switch_1g:ch,switch_2g:uh,switch_2way:dh,switch_2way_2g:hh,switch_3way:fh,light_pendant:ph,light_wall:mh,light_down:gh,light_tl:_h,cu:vh,push:xh,thermo:Mh,data:Sh},Eh=yh;function bh(n,e,t){const i=Eh[e];if(!i)return;const r=t;for(const s of i){const o=s[0];if(o==="L"){const[,a,l,c,u]=s;n.beginPath(),n.moveTo(a*r,-l*r),n.lineTo(c*r,-u*r),n.stroke()}else if(o==="C"){const[,a,l,c]=s;n.beginPath(),n.arc(a*r,-l*r,c*r,0,Math.PI*2),n.stroke()}else if(o==="A"){const[,a,l,c,u,h]=s;n.beginPath();const d=-u*Math.PI/180,f=-h*Math.PI/180;n.arc(a*r,-l*r,c*r,d,f,!0),n.stroke()}else if(o==="P"){const[,a,l]=s;if(!l.length)continue;n.beginPath(),n.moveTo(l[0][0]*r,-l[0][1]*r);for(let c=1;c<l.length;c++)n.lineTo(l[c][0]*r,-l[c][1]*r);a&&n.closePath(),n.stroke()}}}const Th={"switch-1p":"switch_1g","switch-2p":"switch_2g","switch-wissel":"switch_2way",pushbutton:"push",light:"light_pendant","light-tl":"light_tl",meterkast:"cu"};function fu(n,e,t,i,r,s){const o=r,a=s?.selected??!1,l=Math.max(.05,s?.viewScale??1),c=1.25/l,u=(s?.rotDeg??0)*Math.PI/180,h=8/l;n.save(),n.translate(t,i),u&&n.rotate(u),n.lineCap="round",n.lineJoin="round",n.lineWidth=c,n.strokeStyle=a?"#ffd166":"#e8eef7",n.fillStyle=a?"#ffd166":"#e8eef7",n.font=`600 ${h}px system-ui, sans-serif`;const d=Th[e];if(d)bh(n,d,o*.95);else switch(e){case"switch-kruis":Ah(n,o);break;case"switch-serie":wh(n,o);break;case"dimmer":Ch(n,o);break;case"socket":Tr(n,o,1,!1);break;case"socket-pe":Tr(n,o,1,!0);break;case"socket-double":Tr(n,o,2,!0);break;case"socket-quad":Tr(n,o,4,!0);break;case"combo-sw-socket":Rh(n,o);break;case"light-signal":Ph(n,o);break;case"junction":Lh(n,o);break;case"centraal":Bl(n,o,!1);break;case"centraal-light":Bl(n,o,!0);break;case"cable-empty":lo(n,o,"empty");break;case"cable-wired":lo(n,o,"wired");break;case"cable-earth":lo(n,o,"earth");break;case"floor-pass":Ih(n,o);break;default:Tr(n,o,1,!0)}if(a){const f=o*.52,m=o*.16;n.lineWidth=c*.85,n.strokeStyle="#ffd166",n.beginPath(),n.moveTo(-f,-f+m),n.lineTo(-f,-f),n.lineTo(-f+m,-f),n.moveTo(f-m,-f),n.lineTo(f,-f),n.lineTo(f,-f+m),n.moveTo(f,f-m),n.lineTo(f,f),n.lineTo(f-m,f),n.moveTo(-f+m,f),n.lineTo(-f,f),n.lineTo(-f,f-m),n.stroke()}n.restore()}function Ah(n,e){const t=e*.32;n.beginPath(),n.moveTo(-t,-t),n.lineTo(t,t),n.moveTo(t,-t),n.lineTo(-t,t),n.stroke();for(const[i,r]of[[-t,-t],[t,t],[t,-t],[-t,t]])n.beginPath(),n.arc(i,r,e*.07,0,Math.PI*2),n.stroke()}function wh(n,e){const t=e*.16;n.beginPath(),n.arc(0,t*.9,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(-t*1.6,-t*1.2),n.lineTo(0,t*.2),n.lineTo(t*1.6,-t*1.2),n.stroke()}function Ch(n,e){const t=e*.18;n.beginPath(),n.arc(0,t*.35,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(t*.55,t*.05),n.lineTo(t*1.9,-t*1.55),n.stroke(),n.beginPath(),n.moveTo(t*1.55,-t*1.2),n.lineTo(t*2.05,-t*1.75),n.lineTo(t*1.45,-t*1.65),n.closePath(),n.stroke()}function Tr(n,e,t,i){const r=e*.34,s=e*.36,o=r*.22,a=t*r+Math.max(0,t-1)*o,c=-(s+a)/2,u=c+s;if(n.beginPath(),n.moveTo(0,c),n.lineTo(0,u),n.stroke(),i){const h=r*1.05;n.beginPath(),n.moveTo(-h,u),n.lineTo(h,u),n.stroke()}for(let h=0;h<t;h++){const f=u+h*(r+o)+r;n.beginPath(),n.arc(0,f,r,Math.PI,0,!1),n.stroke()}}function Rh(n,e){const t=e*.14;n.beginPath(),n.arc(0,-t*2.2,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(t*.4,-t*2.5),n.lineTo(t*1.6,-t*3.4),n.stroke();const i=t*.1,r=t*1.35;n.beginPath(),n.moveTo(0,-t*1.1),n.lineTo(0,i),n.stroke(),n.beginPath(),n.moveTo(-t*1.5,i),n.lineTo(t*1.5,i),n.stroke(),n.beginPath(),n.arc(0,i+r,r,Math.PI,0,!1),n.stroke()}function Ph(n,e,t){const i=e*.28;n.beginPath(),n.moveTo(-i*1.3,0),n.lineTo(-i*.15,0),n.stroke(),n.beginPath(),n.arc(i*.35,0,i*.7,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(-i*.05,-i*.55),n.lineTo(i*.75,i*.55),n.moveTo(i*.75,-i*.55),n.lineTo(-i*.05,i*.55),n.stroke()}function Lh(n,e){n.beginPath(),n.arc(0,0,e*.28,0,Math.PI*2),n.stroke()}function Bl(n,e,t){const i=e*.28;if(n.strokeRect(-i,-i,i*2,i*2),t){const r=i*.55;n.beginPath(),n.moveTo(-r,-r),n.lineTo(r,r),n.moveTo(r,-r),n.lineTo(-r,r),n.stroke()}}function lo(n,e,t){const i=e*.55;if(n.beginPath(),n.moveTo(-i,0),n.lineTo(i,0),n.stroke(),n.beginPath(),n.arc(i,0,e*.08,0,Math.PI*2),n.stroke(),t==="empty")n.setLineDash([e*.08,e*.08]),n.beginPath(),n.moveTo(-i*.6,0),n.lineTo(i*.6,0),n.stroke(),n.setLineDash([]);else if(t==="wired")for(const r of[-.25,0,.25]){const s=r*i;n.beginPath(),n.moveTo(s,-e*.14),n.lineTo(s,e*.14),n.stroke()}else n.beginPath(),n.moveTo(0,-e*.18),n.lineTo(0,e*.12),n.moveTo(-e*.16,e*.12),n.lineTo(e*.16,e*.12),n.moveTo(-e*.1,e*.2),n.lineTo(e*.1,e*.2),n.stroke()}function Ih(n,e){const t=e*.28;n.beginPath(),n.arc(0,0,t,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(0,-t*1.15),n.lineTo(0,t*1.15),n.stroke(),n.beginPath(),n.moveTo(-t*.35,-t*.55),n.lineTo(0,-t*1.05),n.lineTo(t*.35,-t*.55),n.stroke(),n.beginPath(),n.moveTo(-t*.35,t*.55),n.lineTo(0,t*1.05),n.lineTo(t*.35,t*.55),n.stroke()}let zr=1;function Re(n){return n/Math.max(.25,zr)}const Ve={bg:"#0f1419",grid:"#1c2430",gridMajor:"#243040",wall:"#e8eef7",selected:"#ffd166",draft:"#6cb6ff",draftBad:"#ff6b6b",vertex:"#6cb6ff",first:"#3dd68c",vertexSel:"#ffd166",labelBg:"rgba(15, 20, 25, 0.75)",labelSelected:"#1a1408",labelSelectedBg:"rgba(255, 209, 102, 0.95)",interior:"#3dd68c",angleBad:"#ff4d4d",angleBadBg:"rgba(90, 20, 20, 0.92)",angleBadFill:"rgba(255, 77, 77, 0.22)",angleBadStroke:"#ff4d4d",popupHi:"rgba(255, 209, 102, 0.28)",door:"#6cb6ff",doorSel:"#ffd166",doorSwing:"rgba(108, 182, 255, 0.35)",partition:"#c792ea",partitionHover:"#ffd166"};function Dh(n,e,t){const i=Math.min(window.devicePixelRatio||1,2);n.width=Math.max(1,Math.floor(e*i)),n.height=Math.max(1,Math.floor(t*i)),n.style.width=`${e}px`,n.style.height=`${t}px`;const r=n.getContext("2d");return r&&r.setTransform(i,0,0,i,0,0),{dpr:i}}function Nh(n,e,t,i,r){const s=r.view??{scale:1,ox:0,oy:0};zr=s.scale,n.clearRect(0,0,e,t),n.fillStyle=Ve.bg,n.fillRect(0,0,e,t),n.save(),n.translate(s.ox,s.oy),n.scale(s.scale,s.scale);const o=-s.ox/s.scale,a=-s.oy/s.scale,l=(e-s.ox)/s.scale,c=(t-s.oy)/s.scale;zh(n,o,a,l,c,r.pxPerMeter);const u=i.loops??[],h=i.vertices??[],d=i.draftEnd,f=["rgba(61, 214, 140, 0.16)","rgba(108, 182, 255, 0.14)","rgba(255, 209, 102, 0.12)","rgba(200, 150, 255, 0.12)"];for(let p=0;p<u.length;p++){const y=u[p].vertices,b=u[p].doors??[];Fh(n,y,r,p,f[p%f.length],b)}if(Hh(n,i,r.pxPerMeter),r.ghostVertices&&r.ghostVertices.length>=2){const p=Tt(r.ghostVertices,!0);for(const y of p)On(n,y.a,y.b,"rgba(255, 176, 32, 0.45)",2,!0)}const m=ja(h),v=Tt(h,!1);for(let p=0;p<v.length;p++){const y=v[p],b=r.selectedLoopIndex===null&&r.selectedWallIndex===p;On(n,y.a,y.b,b?Ve.selected:Ve.wall,b?4.5:3),ta(n,y.a,y.b,r.pxPerMeter,!1,b)}if(h.length>=3)for(let p=1;p<h.length-1;p++){const y=Zs(h,p,!1);if(!y)continue;const b=r.selectedLoopIndex===null&&(r.selectedVertexIndex===p||r.popupCornerIndex===p);Dr(n,h[p-1],h[p],h[p+1],m,y.interiorDeg,b)}if(d&&h.length>0){const p=h[h.length-1],y=r.hitRadius/Math.max(.25,s.scale),b=h.length>=3&&Cs(d,h[0],y*1.5),S=r.rejectFlash?Ve.draftBad:b?Ve.first:Ve.draft;if(On(n,p,d,S,2,!0),Ie(p,d)>4&&ta(n,p,d,r.pxPerMeter,!0),h.length>=2&&Ie(p,d)>8)if(b){const A=h[h.length-2],C=Br(A,p,h[0],m);if(Dr(n,A,p,h[0],m,C.interiorDeg,!0),h.length>=2){const L=Br(p,h[0],h[1],m);Dr(n,p,h[0],h[1],m,L.interiorDeg,!0)}}else{const A=h[h.length-2],C=Br(A,p,d,m);Dr(n,A,p,d,m,C.interiorDeg,!0);const L=au(A,p,d),x=Yo(p,d);ea(n,x.x,x.y-18,`Δ ${ks(L,0)}`)}b&&(n.beginPath(),n.arc(h[0].x,h[0].y,y,0,Math.PI*2),n.strokeStyle=Ve.first,n.lineWidth=Re(2),n.stroke())}for(let p=0;p<h.length;p++){const y=h[p],b=p===0,S=p===h.length-1,A=r.selectedLoopIndex===null&&(r.selectedVertexIndex===p||r.popupCornerIndex===p),C=A?Ve.vertexSel:b?Ve.first:Ve.vertex;Ps(n,y,C,A?5:b||S?4:2.5)}const g=r.partitionOptions??[];for(let p=0;p<g.length;p++){const y=g[p],b=r.partitionHoverIndex===p;On(n,y.a,y.b,b?"#ffd166":"rgba(200, 150, 255, 0.75)",b?4:2.5,!0);const S=Yo(y.a,y.b);ea(n,S.x,S.y,y.label),b&&(Ps(n,y.a,Ve.doorSel,5),Ps(n,y.b,Ve.doorSel,5))}if(r.partitionPath&&r.partitionPath.length){const p=r.partitionPath;for(let y=0;y<p.length-1;y++)On(n,p[y],p[y+1],Ve.partitionHover,3);for(const y of p)n.beginPath(),n.arc(y.x,y.y,Re(5),0,Math.PI*2),n.fillStyle=Ve.partitionHover,n.fill();i.draftEnd&&p.length&&On(n,p[p.length-1],i.draftEnd,Ve.partition,2,!0)}if(r.roomBadges)for(const p of r.roomBadges){const y=i.loops[p.loopIndex];if(!y?.vertices.length)continue;let b=0,S=0;for(const A of y.vertices)b+=A.x,S+=A.y;b/=y.vertices.length,S/=y.vertices.length,kh(n,b,S,p.label,p.areaText,p.ok,p.warn)}if(r.installations?.length){const p=22/Math.max(.05,zr);for(const y of r.installations){const S=ri(y.defId)?.symbol??"socket";fu(n,S,y.x,y.y,p,{selected:!!y.selected,viewScale:zr,rotDeg:y.rot??0})}}Uh(n,r),n.restore()}function Uh(n,e){const t=e.pxPerMeter>0?e.pxPerMeter:50,i=Re(1.6),r=(s,o,a,l)=>{if(s.length<1)return;const c=ri(o),u=a?Ve.selected:c?.color??"#6cb6ff";if(n.strokeStyle=u,n.fillStyle=u,n.lineWidth=i,n.lineCap="round",n.lineJoin="round",c?.symbol==="cable-empty"||l?n.setLineDash([Re(5),Re(4)]):n.setLineDash([]),s.length>=2){n.beginPath(),n.moveTo(s[0].x,s[0].y);for(let d=1;d<s.length;d++)n.lineTo(s[d].x,s[d].y);n.stroke()}n.setLineDash([]);const h=Re(2.4);for(const d of s)n.beginPath(),n.arc(d.x,d.y,h,0,Math.PI*2),n.fill();if(s.length>=2&&!l){n.font=`600 ${Re(10)}px system-ui, sans-serif`,n.textAlign="center",n.textBaseline="bottom";for(let d=1;d<s.length;d++){const f=s[d-1],m=s[d],v=Math.hypot(m.x-f.x,m.y-f.y)/t;if(v<.05)continue;const g=(f.x+m.x)/2,p=(f.y+m.y)/2,y=v>=10?`${Math.round(v)} m`:`${(Math.round(v*10)/10).toFixed(1).replace(".",",")} m`;n.fillStyle=a?Ve.selected:"#9ec5ff",n.fillText(y,g,p-Re(3))}}};if(e.runs?.length)for(const s of e.runs)r(s.points,s.defId,!!s.selected,!1);if(e.runDraft&&e.runDraft.points.length){const s=[...e.runDraft.points];e.runDraft.cursor&&s.push(e.runDraft.cursor),r(s,e.runDraft.defId,!0,!0)}}function Fh(n,e,t,i,r,s=[]){if(e.length<3)return;const o=Qa(e);n.beginPath(),n.moveTo(e[0].x,e[0].y);for(let l=1;l<e.length;l++)n.lineTo(e[l].x,e[l].y);n.closePath(),n.fillStyle=r,n.fill();const a=Tt(e,!0);for(let l=0;l<a.length;l++){const c=a[l],u=t.selectedLoopIndex===i&&t.selectedWallIndex===l,h=s.filter(f=>f.wallIndex===l),d=bd(c.a,c.b,h,t.pxPerMeter);for(const f of d)On(n,f.a,f.b,u?Ve.selected:Ve.wall,u?4.5:3);ta(n,c.a,c.b,t.pxPerMeter,!1,u,o);for(const f of h){const m=Wr(c.a,c.b,f.t,f.widthM,t.pxPerMeter);if(!m)continue;const v=t.selectedDoorId===f.id,g=f.hinge??"L",p=f.swing??1;Oh(n,m,v,g,p)}}for(let l=0;l<e.length;l++){const c=Zs(e,l,!0);if(!c)continue;const u=t.selectedLoopIndex===i&&(t.selectedVertexIndex===l||t.popupCornerIndex===l),h=e[(l-1+e.length)%e.length],d=e[(l+1)%e.length];Dr(n,h,e[l],d,o,c.interiorDeg,u)}for(let l=0;l<e.length;l++){const c=t.selectedLoopIndex===i&&(t.selectedVertexIndex===l||t.popupCornerIndex===l),u=c?Ve.vertexSel:l===0?Ve.first:Ve.vertex;Ps(n,e[l],u,c?5:2.5)}}function Oh(n,e,t,i,r){const s=t?Ve.doorSel:Ve.door,o=Math.cos(e.dir+Math.PI/2),a=Math.sin(e.dir+Math.PI/2),l=6;for(const b of[e.openA,e.openB])On(n,{x:b.x-o*l,y:b.y-a*l},{x:b.x+o*l,y:b.y+a*l},s,t?3:2);On(n,e.openA,e.openB,s,1.5,!0);const c=i==="L"?e.openA:e.openB,u=i==="L"?e.openB:e.openA,h=Ie(e.openA,e.openB),d=hn(c,u),f=d+r*(Math.PI/2),m=d,v=f,g=r>0;n.beginPath(),g?n.arc(c.x,c.y,h,m,v,!1):n.arc(c.x,c.y,h,m,v,!0),n.strokeStyle=t?Ve.doorSel:Ve.doorSwing,n.lineWidth=Re(t?2:1.5),n.setLineDash([Re(4),Re(3)]),n.stroke(),n.setLineDash([]);const p={x:c.x+Math.cos(f)*h,y:c.y+Math.sin(f)*h};On(n,c,p,s,t?2.5:1.8),n.beginPath(),n.arc(c.x,c.y,Re(3.5),0,Math.PI*2),n.fillStyle=s,n.fill();const y=t?`deur ${i==="L"?"L":"R"}${r>0?"↺":"↻"}`:"deur";ea(n,e.center.x,e.center.y-Re(12),y)}function Dr(n,e,t,i,r,s,o){const a=!ur(s),l=o?16:a?12:8,c=Id(e,t,i,r);if(n.beginPath(),n.moveTo(t.x,t.y),n.arc(t.x,t.y,l,c.startRad,c.endRad,c.sweepRad<0),n.closePath(),n.fillStyle=a?Ve.angleBadFill:o?Ve.popupHi:"rgba(61, 214, 140, 0.10)",n.fill(),(a||o)&&(n.strokeStyle=a?Ve.angleBadStroke:Ve.interior,n.lineWidth=Re(a?1.5:1),n.stroke()),a||o){const u={x:t.x+Math.cos(c.midRad)*(l+8),y:t.y+Math.sin(c.midRad)*(l+8)};Bh(n,u.x,u.y,ks(s,a||o?1:0),!0,a)}}function Bh(n,e,t,i,r,s){n.font=s?`700 ${Re(11)}px system-ui, sans-serif`:`600 ${Re(10)}px system-ui, sans-serif`;const o=n.measureText(i).width,a=Re(4);n.fillStyle=s?Ve.angleBadBg:Ve.labelBg,n.fillRect(e-o/2-a,t-Re(8),o+a*2,Re(16)),n.fillStyle=s?Ve.angleBad:Ve.interior,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e,t)}function ea(n,e,t,i,r){n.font=`600 ${Re(9)}px system-ui, sans-serif`;const s=n.measureText(i).width,o=Re(3),a=Re(13);n.fillStyle="rgba(15,20,25,0.85)",n.fillRect(e-s/2-o,t-a/2,s+o*2,a),n.fillStyle=Ve.draft,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e,t)}function kh(n,e,t,i,r,s,o){const a=`500 ${Re(8)}px system-ui, sans-serif`,l=`600 ${Re(10)}px system-ui, sans-serif`;n.font=a;const c=n.measureText(i).width;n.font=l;const u=n.measureText(r).width,h=`500 ${Re(8)}px system-ui, sans-serif`;let d=0;o&&(n.font=h,d=n.measureText(o).width);const f=Math.max(c,u,d),m=Re(6),v=Re(4),g=Re(11),p=o?3:2,y=f+m*2,b=g*p+v*2,S=e-y/2,A=t-b/2;n.fillStyle=s?"rgba(15, 20, 25, 0.82)":"rgba(40, 16, 16, 0.88)",n.strokeStyle=s?"rgba(61, 214, 140, 0.4)":"rgba(255, 107, 107, 0.55)",n.lineWidth=Re(1);const C=Re(4);n.beginPath(),n.moveTo(S+C,A),n.arcTo(S+y,A,S+y,A+b,C),n.arcTo(S+y,A+b,S,A+b,C),n.arcTo(S,A+b,S,A,C),n.arcTo(S,A,S+y,A,C),n.closePath(),n.fill(),n.stroke(),n.textAlign="center",n.textBaseline="middle";let L=A+v+g/2;n.font=a,n.fillStyle="#a8b4c4",n.fillText(i,e,L),L+=g,n.font=l,n.fillStyle=s?Ve.first:"#ff8a8a",n.fillText(r,e,L),o&&(L+=g,n.font=h,n.fillStyle="#ffb020",n.fillText(o,e,L))}function zh(n,e,t,i,r,s){const o=Jt.tileSizeM,a=Jt.majorGridM,l=s*o,c=s*a;if(l<2){const d=Math.floor(e/c)*c,f=Math.floor(t/c)*c;n.lineWidth=Re(1),n.strokeStyle=Ve.gridMajor;for(let m=d;m<=i;m+=c)n.beginPath(),n.moveTo(m,t),n.lineTo(m,r),n.stroke();for(let m=f;m<=r;m+=c)n.beginPath(),n.moveTo(e,m),n.lineTo(i,m),n.stroke();return}const u=Math.floor(e/l)*l,h=Math.floor(t/l)*l;n.lineWidth=Re(1);for(let d=u;d<=i;d+=l){const f=Math.abs(Math.round(d/c)*c-d)<l*.25;n.strokeStyle=f?Ve.gridMajor:Ve.grid,n.lineWidth=Re(f?1.25:.75),n.beginPath(),n.moveTo(d,t),n.lineTo(d,r),n.stroke()}for(let d=h;d<=r;d+=l){const f=Math.abs(Math.round(d/c)*c-d)<l*.25;n.strokeStyle=f?Ve.gridMajor:Ve.grid,n.lineWidth=Re(f?1.25:.75),n.beginPath(),n.moveTo(e,d),n.lineTo(i,d),n.stroke()}}function On(n,e,t,i,r,s=!1){n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(t.x,t.y),n.strokeStyle=i,n.lineWidth=Re(r),n.lineCap="round",n.setLineDash(s?[Re(8),Re(6)]:[]),n.stroke(),n.setLineDash([])}function Ps(n,e,t,i){n.beginPath(),n.arc(e.x,e.y,Re(i),0,Math.PI*2),n.fillStyle=t,n.fill(),n.strokeStyle=Ve.bg,n.lineWidth=Re(1.5),n.stroke()}function ta(n,e,t,i,r=!1,s=!1,o=null){const a=ru(e,t,i);if(a<.04&&!r)return;const l=Ie(e,t);if(!r&&!s&&l*zr<22)return;const c=Ja(a),u=r||s?10:9;n.font=`${s||r?600:500} ${Re(u)}px system-ui, sans-serif`;const h=n.measureText(c).width;if(!r&&!s&&h>l*.92)return;const d=hn(e,t),f=o===null||o>=0?1:-1,m=Re(r||s?12:10)*f,v=Math.sin(d)*m,g=-Math.cos(d)*m,p={x:e.x+v,y:e.y+g},y={x:t.x+v,y:t.y+g},b=Re(4)*f,S=Math.sin(d)*b,A=-Math.cos(d)*b;n.strokeStyle=s?"rgba(255, 209, 102, 0.75)":r?"rgba(108, 182, 255, 0.7)":"rgba(139, 156, 179, 0.55)",n.lineWidth=Re(1),n.setLineDash([]),n.beginPath(),n.moveTo(e.x+S*.2,e.y+A*.2),n.lineTo(p.x+S,p.y+A),n.moveTo(t.x+S*.2,t.y+A*.2),n.lineTo(y.x+S,y.y+A),n.moveTo(p.x,p.y),n.lineTo(y.x,y.y),n.stroke();const C=Yo(p,y),L=Re(7)*f,x=C.x+Math.sin(d)*L,R=C.y-Math.cos(d)*L,O=Re(2.5),N=Re(u+4);n.fillStyle=s?Ve.labelSelectedBg:"rgba(15, 20, 25, 0.82)",n.fillRect(x-h/2-O,R-N/2,h+O*2,N),n.fillStyle=r?Ve.draft:s?Ve.labelSelected:"#a8b4c4",n.textAlign="center",n.textBaseline="middle",n.fillText(c,x,R)}function Hh(n,e,t){const i=Vh(e);if(i.length<1)return;let r=1/0,s=1/0,o=-1/0,a=-1/0;for(const h of i)r=Math.min(r,h.a.x,h.b.x),s=Math.min(s,h.a.y,h.b.y),o=Math.max(o,h.a.x,h.b.x),a=Math.max(a,h.a.y,h.b.y);for(const h of e.vertices??[])r=Math.min(r,h.x),s=Math.min(s,h.y),o=Math.max(o,h.x),a=Math.max(a,h.y);if(!(o>r+2)||!(a>s+2))return;const l=Re(32),c="rgba(108, 182, 255, 0.8)",u="#9ad4ff";Gh(n,r,o,a+l,t,c,u,"totaal"),Wh(n,s,a,r-l,t,c,u,"totaal")}function Vh(n){const e=[],t=n.loops??[];for(let i=0;i<t.length;i++){const r=Tt(t[i].vertices,!0);for(let s=0;s<r.length;s++)zs(t,i,s)||e.push(r[s])}for(const i of Tt(n.vertices??[],!1))e.push(i);return e}function Gh(n,e,t,i,r,s,o,a){const l=Re(5);n.strokeStyle=s,n.lineWidth=Re(1.1),n.beginPath(),n.moveTo(e,i-l),n.lineTo(e,i+l),n.moveTo(t,i-l),n.lineTo(t,i+l),n.moveTo(e,i),n.lineTo(t,i),n.stroke();const c=`${a} ${Ja((t-e)/r)}`;pu(n,(e+t)/2,i+Re(11),c,o)}function Wh(n,e,t,i,r,s,o,a){const l=Re(5);n.strokeStyle=s,n.lineWidth=Re(1.1),n.beginPath(),n.moveTo(i-l,e),n.lineTo(i+l,e),n.moveTo(i-l,t),n.lineTo(i+l,t),n.moveTo(i,e),n.lineTo(i,t),n.stroke();const c=`${a} ${Ja((t-e)/r)}`;pu(n,i-Re(14),(e+t)/2,c,o)}function pu(n,e,t,i,r){n.font=`600 ${Re(10)}px system-ui, sans-serif`;const s=n.measureText(i).width,o=Re(3),a=Re(14);n.fillStyle="rgba(15, 20, 25, 0.88)",n.fillRect(e-s/2-o,t-a/2,s+o*2,a),n.fillStyle=r,n.textAlign="center",n.textBaseline="middle",n.fillText(i,e,t)}const Xh=[{code:"nl",flag:"🇳🇱",name:"Nederlands"},{code:"en",flag:"🇬🇧",name:"English"},{code:"es",flag:"🇪🇸",name:"Español"},{code:"pl",flag:"🇵🇱",name:"Polski"},{code:"ru",flag:"🇷🇺",name:"Русский"}],na={nl:{pageTitle:"Wand-m²",statusEmpty:"Teken wanden · sluit lus · daarna nieuwe lus of maten per lijn",statusDrawing:"Bezig… snapt 45° · dicht bij start = lus sluiten",statusOpen:n=>`Open lus · ${n} muur(en) · sluit of teken verder`,statusWallSelected:"Muur geselecteerd · typ lengte (m) om maat aan te passen",statusCorner:n=>`Binnenhoek ${n}`,statusClosed:n=>`Gesloten · ${n} · teken nieuwe lus of klik lijn`,statusClosedWall:n=>`${n} · typ muurlengte (m) om lijn aan te passen`,statusClosedCorner:(n,e)=>`Gesloten · ${n} · binnenhoek ${e}`,statusClosedOdd:(n,e)=>`Gesloten · ${n} · afwijkend: ${e}`,statusMeetfoutAt:n=>`Meetfout bij hoek ${n} · overige naar 45°/90°/135°`,statusDoor:n=>`Deur ${n} · sleep om te verplaatsen · typ breedte`,statusIdle:"Klaar. Selecteer kamer · type · Deel… of ✂ Teken.",statusPartitionDraw:"✂ Deel kamer: 1) klik op wand 2) sleep rechte/45°/90° naar overkant 3) klik op die wand → 2 kamers. Esc = stop.",wallM:"Muur (m)",doorM:"Deur (m)",addDoor:"+ Deur",removeDoor:"Deur weg",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Deur ${n} · scharnier ${e} · ${t} · sleep om te verplaatsen`,splitLoop:"Deel…",splitKicker:"Scheidingswand",splitTitle:"Deel de lus",splitLead:n=>`${n} vrije optie(s)`,splitLeadEqual:"÷2/÷3/÷4 = gelijke banen. Of kies vrije positie. Of sluit en gebruik ✂ Scheiding voor hoeken/schuin. Geen auto-deuren.",splitApply:"Deel hier",splitCancel:"Annuleren",splitNone:"Geen geldige scheiding voor deze vorm.",splitByN:n=>`Delen door ${n}`,splitFlipAxis:"Wissel horizontaal/verticaal",splitFree:"Of snelle positie (recht):",statusSplit:n=>`Vrije scheiding: optie ${n}`,statusSplitParts:n=>`Delen door ${n} · gelijke banen`,interiorDeg:"Binnenhoek (°)",snapTitle:"Zet binnenhoek op 45° / 90° / 135° (45°-raster)",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Undo",reset:"Reset",dragTitle:"Sleep om te verplaatsen",meetfoutKicker:"Mogelijke meetfout",meetfoutTitle:"Hoeken kloppen niet na sluiten",meetfoutLead:n=>`${n} binnenhoek(en) wijken af van 45°/90°/135° (rood). 135° = 45°-raster. Hover hoeknummer voor live vorm.`,ignore:"Negeren",confirm:"Bevestigen",relocate:"Verplaatsen…",relocateHint:"Kies hoeknummer (hover = live vorm). Oranje stippellijn = origineel. Restfout naar gekozen hoek.",back:"Terug",applyHere:"Corrigeer hier",cornerN:n=>`Hoek ${n}`,residual:"restfout",hoverCorner:n=>`Hover: live vorm met restfout bij hoek ${n}`,hint:"1 Teken wanden → sluit lus  ·  2 Muur selecteren → maten/deur  ·  3 Kamer: ✂ Scheiding of Deel…  ·  Opslaan als je klaar bent"},en:{pageTitle:"Wall-m²",statusEmpty:"Draw walls · close loop · then new loop or edit line lengths",statusDrawing:"Drawing… snaps 45° · near start = close loop",statusOpen:n=>`Open loop · ${n} wall(s)`,statusWallSelected:"Wall selected · type length (m) to resize",statusCorner:n=>`Interior angle ${n}`,statusClosed:n=>`Closed · ${n} · draw new loop or tap a line`,statusClosedWall:n=>`${n} · type wall length (m) to resize line`,statusClosedCorner:(n,e)=>`Closed · ${n} · interior ${e}`,statusClosedOdd:(n,e)=>`Closed · ${n} · off-grid: ${e}`,statusMeetfoutAt:n=>`Error at corner ${n} · rest → 45°/90°/135°`,statusDoor:n=>`Door ${n} · drag · type width`,statusIdle:"Ready. Select room · type · Split… or ✂ Draw.",statusPartitionDraw:"Partition: 1st click on outer wall · corners inside · last click on other wall. Esc = cancel.",wallM:"Wall (m)",doorM:"Door (m)",addDoor:"+ Door",removeDoor:"Remove door",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Door ${n} · hinge ${e} · ${t} · drag to move`,splitLoop:"Split…",splitKicker:"Partition wall",splitTitle:"Split the loop",splitLead:n=>`${n} free option(s)`,splitLeadEqual:"Pick ÷2 / ÷3 / ÷4 (equal strips). Hover = preview. ↻ = flip axis.",splitApply:"Split here",splitCancel:"Cancel",splitNone:"No valid partition for this shape.",splitByN:n=>`Divide by ${n}`,splitFlipAxis:"Toggle horizontal/vertical",splitFree:"Or free position:",statusSplit:n=>`Free partition: option ${n}`,statusSplitParts:n=>`Divide by ${n} · equal strips`,interiorDeg:"Interior (°)",snapTitle:"Snap interior to 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Undo",reset:"Reset",dragTitle:"Drag to move",meetfoutKicker:"Possible measurement error",meetfoutTitle:"Angles do not match after closing",meetfoutLead:n=>`${n} interior angle(s) off 45°/90°/135° (red). 135° is on the 45° grid. Hover a corner number for live shape.`,ignore:"Ignore",confirm:"Confirm",relocate:"Move…",relocateHint:"Pick corner number (hover = live shape). Orange dashed = original. Residual goes to selected corner.",back:"Back",applyHere:"Fix here",cornerN:n=>`Corner ${n}`,residual:"residual",hoverCorner:n=>`Hover: live shape with residual at corner ${n}`,hint:"Multiple loops. Select wall → + Door. Drag door, type width. Line lengths. Languages: flags."},es:{pageTitle:"Pared-m²",statusEmpty:"Dibuja paredes · cierra en el punto de inicio",statusDrawing:"Dibujando… ajuste 45° · cerca del inicio = cierre libre",statusOpen:n=>`Cadena abierta · ${n} pared(es)`,statusWallSelected:"Pared seleccionada · escribe longitud (m)",statusCorner:n=>`Ángulo interior ${n}`,statusClosed:n=>`Cerrado · ${n}`,statusClosedWall:n=>`Cerrado · ${n} · escribe longitud (m)`,statusClosedCorner:(n,e)=>`Cerrado · ${n} · interior ${e}`,statusClosedOdd:(n,e)=>`Cerrado · ${n} · fuera de rejilla: ${e}`,statusMeetfoutAt:n=>`Error en esquina ${n} · resto → 45°/90°/135°`,statusDoor:n=>`Puerta ${n} · arrastra · escribe ancho`,statusIdle:"Listo.",statusPartitionDraw:"Tabique libre: muro → esquinas → muro. Esc = cancelar.",wallM:"Pared (m)",doorM:"Puerta (m)",addDoor:"+ Puerta",removeDoor:"Quitar puerta",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Puerta ${n} · bisagra ${e} · ${t}`,splitLoop:"Dividir…",splitKicker:"Tabique",splitTitle:"Dividir el bucle",splitLead:n=>`${n} opción(es) libres`,splitLeadEqual:"Elige ÷2 / ÷3 / ÷4. Hover = vista. ↻ = eje.",splitApply:"Dividir aquí",splitCancel:"Cancelar",splitNone:"Sin partición válida.",splitByN:n=>`Dividir en ${n}`,splitFlipAxis:"Cambiar eje",splitFree:"O posición libre:",statusSplit:n=>`Libre: opción ${n}`,statusSplitParts:n=>`Dividir en ${n}`,interiorDeg:"Interior (°)",snapTitle:"Ajustar interior a 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Deshacer",reset:"Reiniciar",dragTitle:"Arrastra para mover",meetfoutKicker:"Posible error de medida",meetfoutTitle:"Los ángulos no coinciden al cerrar",meetfoutLead:n=>`${n} ángulo(s) fuera de 45°/90°/135° (rojo). 135° es válido (rejilla 45°). Pasa el ratón por el número.`,ignore:"Ignorar",confirm:"Confirmar",relocate:"Mover…",relocateHint:"Elige número de esquina (hover = forma en vivo). Naranja discontinua = original.",back:"Atrás",applyHere:"Corregir aquí",cornerN:n=>`Esquina ${n}`,residual:"resto",hoverCorner:n=>`Hover: forma en vivo con resto en esquina ${n}`,hint:"Verde = ok (45/90/135°), rojo = error. Popup a la izquierda (arrastrable). Idioma: banderas."},pl:{pageTitle:"Ściana-m²",statusEmpty:"Rysuj ściany · zamknij w punkcie startu",statusDrawing:"Rysowanie… snap 45° · blisko startu = swobodne zamknięcie",statusOpen:n=>`Otwarty łańcuch · ${n} ścian(y)`,statusWallSelected:"Wybrana ściana · wpisz długość (m)",statusCorner:n=>`Kąt wewnętrzny ${n}`,statusClosed:n=>`Zamknięte · ${n}`,statusClosedWall:n=>`Zamknięte · ${n} · wpisz długość (m)`,statusClosedCorner:(n,e)=>`Zamknięte · ${n} · kąt ${e}`,statusClosedOdd:(n,e)=>`Zamknięte · ${n} · poza siatką: ${e}`,statusMeetfoutAt:n=>`Błąd przy rogu ${n} · reszta → 45°/90°/135°`,statusDoor:n=>`Drzwi ${n} · przeciągnij · wpisz szerokość`,statusIdle:"Gotowe.",statusPartitionDraw:"Ściana: mur → narożniki → mur. Esc = stop.",wallM:"Ściana (m)",doorM:"Drzwi (m)",addDoor:"+ Drzwi",removeDoor:"Usuń drzwi",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Drzwi ${n} · zawias ${e} · ${t}`,splitLoop:"Podziel…",splitKicker:"Ściana działowa",splitTitle:"Podziel pętlę",splitLead:n=>`${n} wolnych opcji`,splitLeadEqual:"Wybierz ÷2 / ÷3 / ÷4. Hover = podgląd. ↻ = oś.",splitApply:"Podziel tu",splitCancel:"Anuluj",splitNone:"Brak poprawnej ściany.",splitByN:n=>`Podziel na ${n}`,splitFlipAxis:"Zmień oś",splitFree:"Lub wolna pozycja:",statusSplit:n=>`Wolna: opcja ${n}`,statusSplitParts:n=>`Podziel na ${n}`,interiorDeg:"Kąt wewn. (°)",snapTitle:"Ustaw kąt na 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Cofnij",reset:"Reset",dragTitle:"Przeciągnij, aby przenieść",meetfoutKicker:"Możliwy błąd pomiaru",meetfoutTitle:"Kąty nie pasują po zamknięciu",meetfoutLead:n=>`${n} kąt(ów) poza 45°/90°/135° (czerwony). 135° na siatce 45°. Najedź na numer rogu.`,ignore:"Ignoruj",confirm:"Potwierdź",relocate:"Przenieś…",relocateHint:"Wybierz numer rogu (hover = żywy kształt). Pomarańczowa linia = oryginał.",back:"Wstecz",applyHere:"Popraw tutaj",cornerN:n=>`Róg ${n}`,residual:"reszta",hoverCorner:n=>`Hover: kształt z resztą w rogu ${n}`,hint:"Zielony = ok (45/90/135°), czerwony = błąd. Popup po lewej (przeciągalny). Język: flagi."},ru:{pageTitle:"Стена-м²",statusEmpty:"Рисуйте стены · замкните в начальной точке",statusDrawing:"Рисование… шаг 45° · у старта = свободное замыкание",statusOpen:n=>`Открытая цепь · ${n} стен(ы)`,statusWallSelected:"Стена выбрана · введите длину (м)",statusCorner:n=>`Внутренний угол ${n}`,statusClosed:n=>`Замкнуто · ${n}`,statusClosedWall:n=>`Замкнуто · ${n} · введите длину (м)`,statusClosedCorner:(n,e)=>`Замкнуто · ${n} · угол ${e}`,statusClosedOdd:(n,e)=>`Замкнуто · ${n} · вне сетки: ${e}`,statusMeetfoutAt:n=>`Ошибка в углу ${n} · остальные → 45°/90°/135°`,statusDoor:n=>`Дверь ${n} · перетащите · ширина`,statusIdle:"Готово.",statusPartitionDraw:"Перегородка: стена → углы → стена. Esc = отмена.",wallM:"Стена (м)",doorM:"Дверь (м)",addDoor:"+ Дверь",removeDoor:"Убрать дверь",doorHingeL:"L",doorHingeR:"R",doorSwing:"↺",statusDoorDetail:(n,e,t)=>`Дверь ${n} · петля ${e} · ${t}`,splitLoop:"Разделить…",splitKicker:"Перегородка",splitTitle:"Разделить контур",splitLead:n=>`${n} свободных вариантов`,splitLeadEqual:"Выберите ÷2 / ÷3 / ÷4. Hover = превью. ↻ = ось.",splitApply:"Разделить",splitCancel:"Отмена",splitNone:"Нет допустимой перегородки.",splitByN:n=>`На ${n} части`,splitFlipAxis:"Сменить ось",splitFree:"Или свободная позиция:",statusSplit:n=>`Свободно: вариант ${n}`,statusSplitParts:n=>`Деление на ${n}`,interiorDeg:"Угол (°)",snapTitle:"Привязать угол к 45° / 90° / 135°",snapBtn:"→45/90/135",pxPerM:"px/m",undo:"Отмена",reset:"Сброс",dragTitle:"Перетащите, чтобы переместить",meetfoutKicker:"Возможная ошибка измерения",meetfoutTitle:"Углы не совпадают после замыкания",meetfoutLead:n=>`${n} угол(ов) вне 45°/90°/135° (красный). 135° — на сетке 45°. Наведите на номер угла.`,ignore:"Игнорировать",confirm:"Подтвердить",relocate:"Перенести…",relocateHint:"Выберите номер угла (hover = живая форма). Оранжевый пунктир = оригинал.",back:"Назад",applyHere:"Исправить здесь",cornerN:n=>`Угол ${n}`,residual:"остаток",hoverCorner:n=>`Hover: форма с остатком в углу ${n}`,hint:"Зелёный = ок (45/90/135°), красный = ошибка. Окно слева (перетаскивается). Язык: флаги."}},mu="wand-m2-lang";function qh(){try{const e=localStorage.getItem(mu);if(e&&na[e])return e}catch{}const n=(navigator.language||"nl").slice(0,2).toLowerCase();return n==="nl"||n==="en"||n==="es"||n==="pl"||n==="ru"?n:"nl"}function $h(n){try{localStorage.setItem(mu,n)}catch{}}function kl(n){return na[n]??na.nl}const ia={scale:1,ox:0,oy:0};function Yh(n,e,t){return{x:(n-t.ox)/t.scale,y:(e-t.oy)/t.scale}}function Kh(n,e,t,i,r=.25,s=6){const o=Math.min(s,Math.max(r,n.scale*i));if(o===n.scale)return n;const a=Yh(e,t,n);return{scale:o,ox:e-a.x*o,oy:t-a.y*o}}function Zh(n,e,t,i=48,r=.2,s=8){if(!n.length||e<10||t<10)return{...ia};let o=1/0,a=1/0,l=-1/0,c=-1/0;for(const p of n)o=Math.min(o,p.x),a=Math.min(a,p.y),l=Math.max(l,p.x),c=Math.max(c,p.y);const u=Math.max(40,l-o),h=Math.max(40,c-a),d=(e-i*2)/u,f=(t-i*2)/h,m=Math.min(s,Math.max(r,Math.min(d,f))),v=(o+l)/2,g=(a+c)/2;return{scale:m,ox:e/2-v*m,oy:t/2-g*m}}function Jh(n,e){let t=n;e===1&&(t*=16),e===2&&(t*=400);const i=Math.max(-400,Math.min(400,t));return Math.exp(-i*.0015)}const gu="wand-m2-library",Qh="wand-m2-autosave";function _u(){return`P${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`}function jh(){try{const n=localStorage.getItem(gu);if(!n)return[];const e=JSON.parse(n);return Array.isArray(e)?e:[]}catch{return[]}}function ef(n){localStorage.setItem(gu,JSON.stringify(n))}function zl(n){const e=jh(),t=e.findIndex(i=>i.id===n.id);return t>=0?e[t]=n:e.unshift(n),ef(e),e}function Ls(n,e,t,i=[],r,s=[]){return{v:1,id:r??_u(),name:n.trim()||"Naamloos plan",savedAt:new Date().toISOString(),pxPerMeter:t,model:JSON.parse(JSON.stringify(e)),installations:JSON.parse(JSON.stringify(i)),runs:JSON.parse(JSON.stringify(s))}}function tf(n){if(!n||typeof n!="object")return null;const e=n;if(e.v===1&&e.model&&typeof e.model=="object"){const t=e.model;return Array.isArray(t.loops)?{v:1,id:typeof e.id=="string"?e.id:_u(),name:typeof e.name=="string"?e.name:"Geïmporteerd",savedAt:typeof e.savedAt=="string"?e.savedAt:new Date().toISOString(),pxPerMeter:typeof e.pxPerMeter=="number"?e.pxPerMeter:50,model:t,installations:Array.isArray(e.installations)?e.installations:[],runs:Array.isArray(e.runs)?e.runs:[]}:null}if(e.model&&typeof e.model=="object"){const t=e.model;return Array.isArray(t.loops)?Ls("Geïmporteerd",t,typeof e.pxPerMeter=="number"?e.pxPerMeter:50,[],void 0,[]):null}return null}function nf(n,e){const t=n.querySelector("#electra-palette"),i=n.querySelector("#plan-save-lib"),r=n.querySelector("#plan-name");if(!t)return{setActiveTool:()=>{}};let s=null;const o=Qd(),a=Object.fromEntries(Ol.map(m=>[m.id,jd(m.id)]));t.innerHTML="";const l=document.createElement("div");l.className="symbol-primary",t.appendChild(l);for(const m of o)l.appendChild(f(m.id,m.labelNl,m.code,m.symbol));const c=document.createElement("div");c.className="symbol-groups",t.appendChild(c);const u=[];for(const m of Ol){const v=a[m.id];if(!v.length)continue;const g=document.createElement("div");g.className="symbol-more",g.dataset.group=m.id;const p=document.createElement("span");p.className="symbol-more-label",p.textContent=m.labelNl;const y=document.createElement("select");y.className="symbol-select",y.setAttribute("aria-label",m.labelNl);const b=document.createElement("option");b.value="",b.textContent=`— ${m.labelNl} —`,y.appendChild(b);for(const S of v){const A=document.createElement("option");A.value=S.id,A.textContent=`${S.code} · ${S.labelNl}`,y.appendChild(A)}g.appendChild(p),g.appendChild(y),c.appendChild(g),u.push({group:m.id,sel:y,wrap:g}),y.addEventListener("change",()=>{const S=y.value||null;for(const A of u)A.sel!==y&&(A.sel.value="",A.wrap.classList.remove("active"));if(!S){s&&!o.some(A=>A.id===s)&&(h(null),e.onSelectTool(null));return}s=S,l.querySelectorAll(".symbol-btn").forEach(A=>A.classList.remove("active")),g.classList.add("active"),e.onSelectTool(S)})}function h(m){s=m,l.querySelectorAll(".symbol-btn").forEach(v=>{v.classList.toggle("active",v.dataset.def===m)});for(const v of u){const g=m&&a[v.group].some(p=>p.id===m);v.sel.value=g?m:"",v.wrap.classList.toggle("active",!!g)}}function d(m){const v=s===m?null:m;h(v),e.onSelectTool(v)}function f(m,v,g,p){const y=document.createElement("button");y.type="button",y.className="symbol-btn",y.dataset.def=m,y.title=v,y.setAttribute("aria-label",v);const b=document.createElement("canvas");b.width=32,b.height=32,b.className="symbol-canvas",y.appendChild(b);const S=document.createElement("span");S.className="symbol-lab",S.textContent=g,y.appendChild(S);const A=b.getContext("2d");return A&&(A.clearRect(0,0,32,32),fu(A,p,16,15,22,{viewScale:1})),y.addEventListener("click",()=>d(m)),y}return i?.addEventListener("click",()=>{const m=r?.value.trim();m&&e.setActivePlanMeta(e.getActivePlanMeta().id,m),e.onSave()}),{setActiveTool:m=>h(m)}}function vu(n,e){if(n.length<2||e<=0)return 0;let t=0;for(let i=1;i<n.length;i++)t+=Ie(n[i-1],n[i]);return t/e}function rf(n,e){if(e.length===0)return 1/0;if(e.length===1)return Ie(n,e[0]);let t=1/0;for(let i=1;i<e.length;i++){const r=e[i-1],s=e[i],o=sf(n,r,s);o<t&&(t=o)}return t}function sf(n,e,t){const i=t.x-e.x,r=t.y-e.y,s=i*i+r*r;if(s<1e-12)return Ie(n,e);let o=((n.x-e.x)*i+(n.y-e.y)*r)/s;return o=Math.max(0,Math.min(1,o)),Ie(n,{x:e.x+o*i,y:e.y+o*r})}function of(n,e,t){const i=new Map,r=(s,o,a)=>{const l=ri(s),c=l?.labelNl??s,u=l?.code??s,h=i.get(s);h?h.unit!==a&&a==="m"?(h.unit="m",h.qty=o):h.qty+=o:i.set(s,{defId:s,label:c,code:u,qty:o,unit:a})};for(const s of n)r(s.defId,1,"st");for(const s of e){const o=vu(s.points,t);o>0&&r(s.defId,o,"m")}return[...i.values()].sort((s,o)=>s.unit!==o.unit?s.unit==="st"?-1:1:s.label.localeCompare(o.label,"nl"))}function Hl(n){if(n.unit==="st")return`${Math.round(n.qty)} st`;const e=Math.round(n.qty*10)/10;return`${Number.isInteger(e)?String(e):e.toFixed(1).replace(".",",")} m`}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const il="185",af=0,Vl=1,lf=2,Is=1,cf=2,Nr=3,Si=0,fn=1,kn=2,oi=0,ar=1,Gl=2,Wl=3,Xl=4,uf=5,Fi=100,df=101,hf=102,ff=103,pf=104,mf=200,gf=201,_f=202,vf=203,ra=204,sa=205,xf=206,Mf=207,Sf=208,yf=209,Ef=210,bf=211,Tf=212,Af=213,wf=214,oa=0,aa=1,la=2,dr=3,ca=4,ua=5,da=6,ha=7,xu=0,Cf=1,Rf=2,Vn=0,Mu=1,Su=2,yu=3,Eu=4,bu=5,Tu=6,Au=7,wu=300,zi=301,hr=302,co=303,uo=304,Js=306,fa=1e3,si=1001,pa=1002,qt=1003,Pf=1004,rs=1005,Qt=1006,ho=1007,Bi=1008,vn=1009,Cu=1010,Ru=1011,Xr=1012,rl=1013,Xn=1014,zn=1015,li=1016,sl=1017,ol=1018,qr=1020,Pu=35902,Lu=35899,Iu=1021,Du=1022,In=1023,ci=1026,ki=1027,Nu=1028,al=1029,Hi=1030,ll=1031,cl=1033,Ds=33776,Ns=33777,Us=33778,Fs=33779,ma=35840,ga=35841,_a=35842,va=35843,xa=36196,Ma=37492,Sa=37496,ya=37488,Ea=37489,Hs=37490,ba=37491,Ta=37808,Aa=37809,wa=37810,Ca=37811,Ra=37812,Pa=37813,La=37814,Ia=37815,Da=37816,Na=37817,Ua=37818,Fa=37819,Oa=37820,Ba=37821,ka=36492,za=36494,Ha=36495,Va=36283,Ga=36284,Vs=36285,Wa=36286,Lf=3200,Xa=0,If=1,vi="",_n="srgb",Gs="srgb-linear",Ws="linear",ft="srgb",$i=7680,ql=519,Df=512,Nf=513,Uf=514,ul=515,Ff=516,Of=517,dl=518,Bf=519,$l=35044,Yl="300 es",Hn=2e3,$r=2001;function kf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Xs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zf(){const n=Xs("canvas");return n.style.display="block",n}const Kl={};function Zl(...n){const e="THREE."+n.shift();console.log(e,...n)}function Uu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ke(...n){n=Uu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function at(...n){n=Uu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function lr(...n){const e=n.join(" ");e in Kl||(Kl[e]=!0,ke(...n))}function Hf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Vf={[oa]:aa,[la]:da,[ca]:ha,[dr]:ua,[aa]:oa,[da]:la,[ha]:ca,[ua]:dr};class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fo=Math.PI/180,qa=180/Math.PI;function gr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Je(n,e,t){return Math.max(e,Math.min(t,n))}function Gf(n,e){return(n%e+e)%e}function po(n,e,t){return(1-t)*n+t*e}function Ar(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ml=class Ml{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ml.prototype.isVector2=!0;let Ce=Ml;class _r{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],d=s[o+0],f=s[o+1],m=s[o+2],v=s[o+3];if(h!==v||l!==d||c!==f||u!==m){let g=l*d+c*f+u*m+h*v;g<0&&(d=-d,f=-f,m=-m,v=-v,g=-g);let p=1-a;if(g<.9995){const y=Math.acos(g),b=Math.sin(y);p=Math.sin(p*y)/b,a=Math.sin(a*y)/b,l=l*p+d*a,c=c*p+f*a,u=u*p+m*a,h=h*p+v*a}else{l=l*p+d*a,c=c*p+f*a,u=u*p+m*a,h=h*p+v*a;const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],d=s[o+1],f=s[o+2],m=s[o+3];return e[t]=a*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-a*f,e[t+2]=c*m+u*f+a*d-l*h,e[t+3]=u*m-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),d=l(i/2),f=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>h){const f=2*Math.sqrt(1+i-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-i-h);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Sl=class Sl{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return mo.copy(this).projectOnVector(e),this.sub(mo)}reflect(e){return this.sub(mo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Sl.prototype.isVector3=!0;let k=Sl;const mo=new k,Jl=new _r,yl=class yl{constructor(e,t,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],m=i[8],v=r[0],g=r[3],p=r[6],y=r[1],b=r[4],S=r[7],A=r[2],C=r[5],L=r[8];return s[0]=o*v+a*y+l*A,s[3]=o*g+a*b+l*C,s[6]=o*p+a*S+l*L,s[1]=c*v+u*y+h*A,s[4]=c*g+u*b+h*C,s[7]=c*p+u*S+h*L,s[2]=d*v+f*y+m*A,s[5]=d*g+f*b+m*C,s[8]=d*p+f*S+m*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,f=c*s-o*l,m=t*h+i*d+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=h*v,e[1]=(r*c-u*i)*v,e[2]=(a*i-r*o)*v,e[3]=d*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return lr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(go.makeScale(e,t)),this}rotate(e){return lr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(go.makeRotation(-e)),this}translate(e,t){return lr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(go.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};yl.prototype.isMatrix3=!0;let We=yl;const go=new We,Ql=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jl=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wf(){const n={enabled:!0,workingColorSpace:Gs,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ft&&(r.r=ai(r.r),r.g=ai(r.g),r.b=ai(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ft&&(r.r=cr(r.r),r.g=cr(r.g),r.b=cr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===vi?Ws:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return lr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return lr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Gs]:{primaries:e,whitePoint:i,transfer:Ws,toXYZ:Ql,fromXYZ:jl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_n},outputColorSpaceConfig:{drawingBufferColorSpace:_n}},[_n]:{primaries:e,whitePoint:i,transfer:ft,toXYZ:Ql,fromXYZ:jl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_n}}}),n}const tt=Wf();function ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function cr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Yi;class Xf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Yi===void 0&&(Yi=Xs("canvas")),Yi.width=e.width,Yi.height=e.height;const r=Yi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Yi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ai(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ai(t[i]/255)*255):t[i]=ai(t[i]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qf=0;class hl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=gr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(_o(r[o].image)):s.push(_o(r[o]))}else s=_o(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function _o(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}let $f=0;const vo=new k;class an extends Gi{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,i=si,r=si,s=Qt,o=Bi,a=In,l=vn,c=an.DEFAULT_ANISOTROPY,u=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=gr(),this.name="",this.source=new hl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fa:e.x=e.x-Math.floor(e.x);break;case si:e.x=e.x<0?0:1;break;case pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fa:e.y=e.y-Math.floor(e.y);break;case si:e.y=e.y<0?0:1;break;case pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=wu;an.DEFAULT_ANISOTROPY=1;const El=class El{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,S=(f+1)/2,A=(p+1)/2,C=(u+d)/4,L=(h+v)/4,x=(m+g)/4;return b>S&&b>A?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=C/i,s=L/i):S>A?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=C/r,s=x/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=L/s,r=x/s),this.set(i,r,s,t),this}let y=Math.sqrt((g-m)*(g-m)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(h-v)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};El.prototype.isVector4=!0;let At=El;class Yf extends Gi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new an(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new hl(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends Yf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Fu extends an{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kf extends an{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qs=class qs{constructor(e,t,i,r,s,o,a,l,c,u,h,d,f,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,h,d,f,m,v,g)}set(e,t,i,r,s,o,a,l,c,u,h,d,f,m,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Ki.setFromMatrixColumn(e,0).length(),s=1/Ki.setFromMatrixColumn(e,1).length(),o=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*u,f=o*h,m=a*u,v=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,m=c*u,v=c*h;t[0]=d+v*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-m,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,m=c*u,v=c*h;t[0]=d-v*a,t[4]=-o*h,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*u,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,m=a*u,v=a*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,m=a*l,v=a*c;t[0]=l*u,t[4]=v-d*h,t[8]=m*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-v*h}else if(e.order==="XZY"){const d=o*l,f=o*c,m=a*l,v=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=o*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=a*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zf,e,Jf)}lookAt(e,t,i){const r=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),hi.crossVectors(i,mn),hi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),hi.crossVectors(i,mn)),hi.normalize(),ss.crossVectors(mn,hi),r[0]=hi.x,r[4]=ss.x,r[8]=mn.x,r[1]=hi.y,r[5]=ss.y,r[9]=mn.y,r[2]=hi.z,r[6]=ss.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],m=i[2],v=i[6],g=i[10],p=i[14],y=i[3],b=i[7],S=i[11],A=i[15],C=r[0],L=r[4],x=r[8],R=r[12],O=r[1],N=r[5],H=r[9],Q=r[13],te=r[2],z=r[6],Y=r[10],W=r[14],ne=r[3],re=r[7],ge=r[11],_e=r[15];return s[0]=o*C+a*O+l*te+c*ne,s[4]=o*L+a*N+l*z+c*re,s[8]=o*x+a*H+l*Y+c*ge,s[12]=o*R+a*Q+l*W+c*_e,s[1]=u*C+h*O+d*te+f*ne,s[5]=u*L+h*N+d*z+f*re,s[9]=u*x+h*H+d*Y+f*ge,s[13]=u*R+h*Q+d*W+f*_e,s[2]=m*C+v*O+g*te+p*ne,s[6]=m*L+v*N+g*z+p*re,s[10]=m*x+v*H+g*Y+p*ge,s[14]=m*R+v*Q+g*W+p*_e,s[3]=y*C+b*O+S*te+A*ne,s[7]=y*L+b*N+S*z+A*re,s[11]=y*x+b*H+S*Y+A*ge,s[15]=y*R+b*Q+S*W+A*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15],y=l*f-c*d,b=a*f-c*h,S=a*d-l*h,A=o*f-c*u,C=o*d-l*u,L=o*h-a*u;return t*(v*y-g*b+p*S)-i*(m*y-g*A+p*C)+r*(m*b-v*A+p*L)-s*(m*S-v*C+g*L)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-i*(s*u-a*l)+r*(s*c-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],y=t*a-i*o,b=t*l-r*o,S=t*c-s*o,A=i*l-r*a,C=i*c-s*a,L=r*c-s*l,x=u*v-h*m,R=u*g-d*m,O=u*p-f*m,N=h*g-d*v,H=h*p-f*v,Q=d*p-f*g,te=y*Q-b*H+S*N+A*O-C*R+L*x;if(te===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/te;return e[0]=(a*Q-l*H+c*N)*z,e[1]=(r*H-i*Q-s*N)*z,e[2]=(v*L-g*C+p*A)*z,e[3]=(d*C-h*L-f*A)*z,e[4]=(l*O-o*Q-c*R)*z,e[5]=(t*Q-r*O+s*R)*z,e[6]=(g*S-m*L-p*b)*z,e[7]=(u*L-d*S+f*b)*z,e[8]=(o*H-a*O+c*x)*z,e[9]=(i*O-t*H-s*x)*z,e[10]=(m*C-v*S+p*y)*z,e[11]=(h*S-u*C-f*y)*z,e[12]=(a*R-o*N-l*x)*z,e[13]=(t*N-i*R+r*x)*z,e[14]=(v*b-m*A-g*y)*z,e[15]=(u*A-h*b+d*y)*z,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,f=s*u,m=s*h,v=o*u,g=o*h,p=a*h,y=l*c,b=l*u,S=l*h,A=i.x,C=i.y,L=i.z;return r[0]=(1-(v+p))*A,r[1]=(f+S)*A,r[2]=(m-b)*A,r[3]=0,r[4]=(f-S)*C,r[5]=(1-(d+p))*C,r[6]=(g+y)*C,r[7]=0,r[8]=(m+b)*L,r[9]=(g-y)*L,r[10]=(1-(d+v))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Ki.set(r[0],r[1],r[2]).length();const a=Ki.set(r[4],r[5],r[6]).length(),l=Ki.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Cn.copy(this);const c=1/o,u=1/a,h=1/l;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=h,Cn.elements[9]*=h,Cn.elements[10]*=h,t.setFromRotationMatrix(Cn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,r,s,o,a=Hn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r);let m,v;if(l)m=s/(o-s),v=o*s/(o-s);else if(a===Hn)m=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===$r)m=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Hn,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),f=-(i+r)/(i-r);let m,v;if(l)m=1/(o-s),v=o/(o-s);else if(a===Hn)m=-2/(o-s),v=-(o+s)/(o-s);else if(a===$r)m=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};qs.prototype.isMatrix4=!0;let Ct=qs;const Ki=new k,Cn=new Ct,Zf=new k(0,0,0),Jf=new k(1,1,1),hi=new k,ss=new k,mn=new k,ec=new Ct,tc=new _r;class yi{constructor(e=0,t=0,i=0,r=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ec.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ec,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tc.setFromEuler(this),this.setFromQuaternion(tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class Ou{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qf=0;const nc=new k,Zi=new _r,Qn=new Ct,os=new k,wr=new k,jf=new k,ep=new _r,ic=new k(1,0,0),rc=new k(0,1,0),sc=new k(0,0,1),oc={type:"added"},tp={type:"removed"},Ji={type:"childadded",child:null},xo={type:"childremoved",child:null};class jt extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new k,t=new yi,i=new _r,r=new k(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new We}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ou,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(ic,e)}rotateY(e){return this.rotateOnAxis(rc,e)}rotateZ(e){return this.rotateOnAxis(sc,e)}translateOnAxis(e,t){return nc.copy(e).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ic,e)}translateY(e){return this.translateOnAxis(rc,e)}translateZ(e){return this.translateOnAxis(sc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?os.copy(e):os.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(wr,os,this.up):Qn.lookAt(os,wr,this.up),this.quaternion.setFromRotationMatrix(Qn),r&&(Qn.extractRotation(r.matrixWorld),Zi.setFromRotationMatrix(Qn),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(oc),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tp),xo.child=e,this.dispatchEvent(xo),xo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(oc),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,e,jf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,ep,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}jt.DEFAULT_UP=new k(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ur extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const np={type:"move"};class Mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,i),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(np)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ur;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},as={h:0,s:0,l:0};function So(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=tt.workingColorSpace){if(e=Gf(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=So(o,s,e+1/3),this.g=So(o,s,e),this.b=So(o,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=_n){function i(s){s!==void 0&&parseFloat(s)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_n){const i=Bu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_n){return tt.workingToColorSpace(Zt.copy(this),e),Math.round(Je(Zt.r*255,0,255))*65536+Math.round(Je(Zt.g*255,0,255))*256+Math.round(Je(Zt.b*255,0,255))}getHexString(e=_n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Zt.copy(this),t);const i=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=_n){tt.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,i=Zt.g,r=Zt.b;return e!==_n?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(as);const i=po(fi.h,as.h,t),r=po(fi.s,as.s,t),s=po(fi.l,as.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new Qe;Qe.NAMES=Bu;class fl{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Qe(e),this.near=t,this.far=i}clone(){return new fl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ip extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Rn=new k,jn=new k,yo=new k,ei=new k,Qi=new k,ji=new k,ac=new k,Eo=new k,bo=new k,To=new k,Ao=new At,wo=new At,Co=new At;class Ln{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Rn.subVectors(e,t),r.cross(Rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Rn.subVectors(r,t),jn.subVectors(i,t),yo.subVectors(e,t);const o=Rn.dot(Rn),a=Rn.dot(jn),l=Rn.dot(yo),c=jn.dot(jn),u=jn.dot(yo),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,m=(o*u-a*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ei.x),l.addScaledVector(o,ei.y),l.addScaledVector(a,ei.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Ao.setScalar(0),wo.setScalar(0),Co.setScalar(0),Ao.fromBufferAttribute(e,t),wo.fromBufferAttribute(e,i),Co.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Ao,s.x),o.addScaledVector(wo,s.y),o.addScaledVector(Co,s.z),o}static isFrontFacing(e,t,i,r){return Rn.subVectors(i,t),jn.subVectors(e,t),Rn.cross(jn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Rn.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Ln.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Qi.subVectors(r,i),ji.subVectors(s,i),Eo.subVectors(e,i);const l=Qi.dot(Eo),c=ji.dot(Eo);if(l<=0&&c<=0)return t.copy(i);bo.subVectors(e,r);const u=Qi.dot(bo),h=ji.dot(bo);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Qi,o);To.subVectors(e,s);const f=Qi.dot(To),m=ji.dot(To);if(m>=0&&f<=m)return t.copy(s);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(i).addScaledVector(ji,a);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return ac.subVectors(s,r),a=(h-u)/(h-u+(f-m)),t.copy(r).addScaledVector(ac,a);const p=1/(g+v+d);return o=v*p,a=d*p,t.copy(i).addScaledVector(Qi,o).addScaledVector(ji,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Jr{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Pn):Pn.fromBufferAttribute(s,o),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ls.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(e.matrixWorld),this.union(ls)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),cs.subVectors(this.max,Cr),er.subVectors(e.a,Cr),tr.subVectors(e.b,Cr),nr.subVectors(e.c,Cr),pi.subVectors(tr,er),mi.subVectors(nr,tr),Pi.subVectors(er,nr);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Pi.z,Pi.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Pi.z,0,-Pi.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Pi.y,Pi.x,0];return!Ro(t,er,tr,nr,cs)||(t=[1,0,0,0,1,0,0,0,1],!Ro(t,er,tr,nr,cs))?!1:(us.crossVectors(pi,mi),t=[us.x,us.y,us.z],Ro(t,er,tr,nr,cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ti=[new k,new k,new k,new k,new k,new k,new k,new k],Pn=new k,ls=new Jr,er=new k,tr=new k,nr=new k,pi=new k,mi=new k,Pi=new k,Cr=new k,cs=new k,us=new k,Li=new k;function Ro(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Li.fromArray(n,s);const a=r.x*Math.abs(Li.x)+r.y*Math.abs(Li.y)+r.z*Math.abs(Li.z),l=e.dot(Li),c=t.dot(Li),u=i.dot(Li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ft=new k,ds=new Ce;let rp=0;class Wn extends Gi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=$l,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ds.fromBufferAttribute(this,t),ds.applyMatrix3(e),this.setXY(t,ds.x,ds.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ar(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ar(t,this.array)),t}setX(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ar(t,this.array)),t}setY(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ar(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ar(t,this.array)),t}setW(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$l&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class ku extends Wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zu extends Wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class yn extends Wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const sp=new Jr,Rr=new k,Po=new k;class pl{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):sp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Rr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(Po)),this.expandByPoint(Rr.copy(e.center).sub(Po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let op=0;const Mn=new Ct,Lo=new jt,ir=new k,gn=new Jr,Pr=new Jr,Wt=new k;class $n extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kf(e)?zu:ku)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,i){return Mn.makeTranslation(e,t,i),this.applyMatrix4(Mn),this}scale(e,t,i){return Mn.makeScale(e,t,i),this.applyMatrix4(Mn),this}lookAt(e){return Lo.lookAt(e),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ir).negate(),this.translate(ir.x,ir.y,ir.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new yn(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Pr.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(gn.min,Pr.min),gn.expandByPoint(Wt),Wt.addVectors(gn.max,Pr.max),gn.expandByPoint(Wt)):(gn.expandByPoint(Pr.min),gn.expandByPoint(Pr.max))}gn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Wt.fromBufferAttribute(a,c),l&&(ir.fromBufferAttribute(e,c),Wt.add(ir)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Wn(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let x=0;x<i.count;x++)a[x]=new k,l[x]=new k;const c=new k,u=new k,h=new k,d=new Ce,f=new Ce,m=new Ce,v=new k,g=new k;function p(x,R,O){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,R),h.fromBufferAttribute(i,O),d.fromBufferAttribute(s,x),f.fromBufferAttribute(s,R),m.fromBufferAttribute(s,O),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const N=1/(f.x*m.y-m.x*f.y);isFinite(N)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(N),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(N),a[x].add(v),a[R].add(v),a[O].add(v),l[x].add(g),l[R].add(g),l[O].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,R=y.length;x<R;++x){const O=y[x],N=O.start,H=O.count;for(let Q=N,te=N+H;Q<te;Q+=3)p(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const b=new k,S=new k,A=new k,C=new k;function L(x){A.fromBufferAttribute(r,x),C.copy(A);const R=a[x];b.copy(R),b.sub(A.multiplyScalar(A.dot(R))).normalize(),S.crossVectors(C,R);const N=S.dot(l[x])<0?-1:1;o.setXYZW(x,b.x,b.y,b.z,N)}for(let x=0,R=y.length;x<R;++x){const O=y[x],N=O.start,H=O.count;for(let Q=N,te=N+H;Q<te;Q+=3)L(e.getX(Q+0)),L(e.getX(Q+1)),L(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const r=new k,s=new k,o=new k,a=new k,l=new k,c=new k,u=new k,h=new k;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Wn(d,u,h)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new $n,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let ap=0;class Qr extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=gr(),this.name="",this.type="Material",this.blending=ar,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ra,this.blendDst=sa,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ar&&(i.blending=this.blending),this.side!==Si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ra&&(i.blendSrc=this.blendSrc),this.blendDst!==sa&&(i.blendDst=this.blendDst),this.blendEquation!==Fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ql&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ce().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ce().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ni=new k,Io=new k,hs=new k,gi=new k,Do=new k,fs=new k,No=new k;class lp{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Io.copy(e).add(t).multiplyScalar(.5),hs.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(Io);const s=e.distanceTo(t)*.5,o=-this.direction.dot(hs),a=gi.dot(this.direction),l=-gi.dot(hs),c=gi.lengthSq(),u=Math.abs(1-o*o);let h,d,f,m;if(u>0)if(h=o*l-a,d=o*a-l,m=s*u,h>=0)if(d>=-m)if(d<=m){const v=1/u;h*=v,d*=v,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Io).addScaledVector(hs,d),f}intersectSphere(e,t){ni.subVectors(e.center,this.origin);const i=ni.dot(this.direction),r=ni.dot(ni)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,i,r,s){Do.subVectors(t,e),fs.subVectors(i,e),No.crossVectors(Do,fs);let o=this.direction.dot(No),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gi.subVectors(this.origin,e);const l=a*this.direction.dot(fs.crossVectors(gi,fs));if(l<0)return null;const c=a*this.direction.dot(Do.cross(gi));if(c<0||l+c>o)return null;const u=-a*gi.dot(No);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Hu extends Qr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=xu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lc=new Ct,Ii=new lp,ps=new pl,cc=new k,ms=new k,gs=new k,_s=new k,Uo=new k,vs=new k,uc=new k,xs=new k;class En extends jt{constructor(e=new $n,t=new Hu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){vs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Uo.fromBufferAttribute(h,e),o?vs.addScaledVector(Uo,u):vs.addScaledVector(Uo.sub(t),u))}t.add(vs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ps.copy(i.boundingSphere),ps.applyMatrix4(s),Ii.copy(e.ray).recast(e.near),!(ps.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(ps,cc)===null||Ii.origin.distanceToSquared(cc)>(e.far-e.near)**2))&&(lc.copy(s).invert(),Ii.copy(e.ray).applyMatrix4(lc),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let S=y,A=b;S<A;S+=3){const C=a.getX(S),L=a.getX(S+1),x=a.getX(S+2);r=Ms(this,p,e,i,c,u,h,C,L,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=a.getX(g),b=a.getX(g+1),S=a.getX(g+2);r=Ms(this,o,e,i,c,u,h,y,b,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let S=y,A=b;S<A;S+=3){const C=S,L=S+1,x=S+2;r=Ms(this,p,e,i,c,u,h,C,L,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=g,b=g+1,S=g+2;r=Ms(this,o,e,i,c,u,h,y,b,S),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function cp(n,e,t,i,r,s,o,a){let l;if(e.side===fn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Si,a),l===null)return null;xs.copy(a),xs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(xs);return c<t.near||c>t.far?null:{distance:c,point:xs.clone(),object:n}}function Ms(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,ms),n.getVertexPosition(l,gs),n.getVertexPosition(c,_s);const u=cp(n,e,t,i,ms,gs,_s,uc);if(u){const h=new k;Ln.getBarycoord(uc,ms,gs,_s,h),r&&(u.uv=Ln.getInterpolatedAttribute(r,a,l,c,h,new Ce)),s&&(u.uv1=Ln.getInterpolatedAttribute(s,a,l,c,h,new Ce)),o&&(u.normal=Ln.getInterpolatedAttribute(o,a,l,c,h,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new k,materialIndex:0};Ln.getNormal(ms,gs,_s,d.normal),u.face=d,u.barycoord=h}return u}class up extends an{constructor(e=null,t=1,i=1,r,s,o,a,l,c=qt,u=qt,h,d){super(null,o,a,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fo=new k,dp=new k,hp=new We;class Ni{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Fo.subVectors(i,t).cross(dp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Fo),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||hp.getNormalMatrix(e),r=this.coplanarPoint(Fo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new pl,fp=new Ce(.5,.5),Ss=new k;class ml{constructor(e=new Ni,t=new Ni,i=new Ni,r=new Ni,s=new Ni,o=new Ni){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Hn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],v=s[9],g=s[10],p=s[11],y=s[12],b=s[13],S=s[14],A=s[15];if(r[0].setComponents(c-o,f-u,p-m,A-y).normalize(),r[1].setComponents(c+o,f+u,p+m,A+y).normalize(),r[2].setComponents(c+a,f+h,p+v,A+b).normalize(),r[3].setComponents(c-a,f-h,p-v,A-b).normalize(),i)r[4].setComponents(l,d,g,S).normalize(),r[5].setComponents(c-l,f-d,p-g,A-S).normalize();else if(r[4].setComponents(c-l,f-d,p-g,A-S).normalize(),t===Hn)r[5].setComponents(c+l,f+d,p+g,A+S).normalize();else if(t===$r)r[5].setComponents(l,d,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){Di.center.set(0,0,0);const t=fp.distanceTo(e.center);return Di.radius=.7071067811865476+t,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ss.x=r.normal.x>0?e.max.x:e.min.x,Ss.y=r.normal.y>0?e.max.y:e.min.y,Ss.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vu extends an{constructor(e=[],t=zi,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fr extends an{constructor(e,t,i=Xn,r,s,o,a=qt,l=qt,c,u=ci,h=1){if(u!==ci&&u!==ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new hl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class pp extends fr{constructor(e,t=Xn,i=zi,r,s,o=qt,a=qt,l,c=ci){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Gu extends an{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vr extends $n{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new yn(c,3)),this.setAttribute("normal",new yn(u,3)),this.setAttribute("uv",new yn(h,2));function m(v,g,p,y,b,S,A,C,L,x,R){const O=S/L,N=A/x,H=S/2,Q=A/2,te=C/2,z=L+1,Y=x+1;let W=0,ne=0;const re=new k;for(let ge=0;ge<Y;ge++){const _e=ge*N-Q;for(let be=0;be<z;be++){const nt=be*O-H;re[v]=nt*y,re[g]=_e*b,re[p]=te,c.push(re.x,re.y,re.z),re[v]=0,re[g]=0,re[p]=C>0?1:-1,u.push(re.x,re.y,re.z),h.push(be/L),h.push(1-ge/x),W+=1}}for(let ge=0;ge<x;ge++)for(let _e=0;_e<L;_e++){const be=d+_e+z*ge,nt=d+_e+z*(ge+1),st=d+(_e+1)+z*(ge+1),Ge=d+(_e+1)+z*ge;l.push(be,nt,Ge),l.push(nt,st,Ge),ne+=6}a.addGroup(f,ne,R),f+=ne,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Yn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],d=i[r+1]-u,f=(o-u)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new Ce:new k);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new k,r=[],s=[],o=[],a=new k,l=new Ct;for(let f=0;f<=e;f++){const m=f/e;r[f]=this.getTangentAt(m,new k)}s[0]=new k,o[0]=new k;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Je(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Je(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],f*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class gl extends Yn{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Ce){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class mp extends gl{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function _l(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let d=(o-s)/c-(a-s)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,r(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return n+e*s+t*o+i*a}}}const dc=new k,hc=new k,Oo=new _l,Bo=new _l,ko=new _l;class gp extends Yn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new k){const i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(hc.subVectors(r[0],r[1]).add(r[0]),c=hc);const h=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(dc.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=dc),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),v=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Oo.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,v,g),Bo.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,v,g),ko.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(Oo.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Bo.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),ko.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(Oo.calc(l),Bo.calc(l),ko.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new k().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function fc(n,e,t,i,r){const s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function _p(n,e){const t=1-n;return t*t*e}function vp(n,e){return 2*(1-n)*n*e}function xp(n,e){return n*n*e}function Hr(n,e,t,i){return _p(n,e)+vp(n,t)+xp(n,i)}function Mp(n,e){const t=1-n;return t*t*t*e}function Sp(n,e){const t=1-n;return 3*t*t*n*e}function yp(n,e){return 3*(1-n)*n*n*e}function Ep(n,e){return n*n*n*e}function Vr(n,e,t,i,r){return Mp(n,e)+Sp(n,t)+yp(n,i)+Ep(n,r)}class Wu extends Yn{constructor(e=new Ce,t=new Ce,i=new Ce,r=new Ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Ce){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Vr(e,r.x,s.x,o.x,a.x),Vr(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bp extends Yn{constructor(e=new k,t=new k,i=new k,r=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new k){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Vr(e,r.x,s.x,o.x,a.x),Vr(e,r.y,s.y,o.y,a.y),Vr(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Xu extends Yn{constructor(e=new Ce,t=new Ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ce){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tp extends Yn{constructor(e=new k,t=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new k){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new k){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qu extends Yn{constructor(e=new Ce,t=new Ce,i=new Ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ce){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Hr(e,r.x,s.x,o.x),Hr(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ap extends Yn{constructor(e=new k,t=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new k){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Hr(e,r.x,s.x,o.x),Hr(e,r.y,s.y,o.y),Hr(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $u extends Yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ce){const i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(fc(a,l.x,c.x,u.x,h.x),fc(a,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Ce().fromArray(r))}return this}}var pc=Object.freeze({__proto__:null,ArcCurve:mp,CatmullRomCurve3:gp,CubicBezierCurve:Wu,CubicBezierCurve3:bp,EllipseCurve:gl,LineCurve:Xu,LineCurve3:Tp,QuadraticBezierCurve:qu,QuadraticBezierCurve3:Ap,SplineCurve:$u});class wp extends Yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pc[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new pc[r.type]().fromJSON(r))}return this}}class mc extends wp{constructor(e){super(),this.type="Path",this.currentPoint=new Ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Xu(this.currentPoint.clone(),new Ce(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new qu(this.currentPoint.clone(),new Ce(e,t),new Ce(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){const a=new Wu(this.currentPoint.clone(),new Ce(e,t),new Ce(i,r),new Ce(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new $u(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){const c=new gl(e,t,i,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Yu extends mc{constructor(e){super(e),this.uuid=gr(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new mc().fromJSON(r))}return this}}function Cp(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Ku(n,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=Dp(n,e,s,t)),n.length>80*t){a=n[0],l=n[1];let u=a,h=l;for(let d=t;d<r;d+=t){const f=n[d],m=n[d+1];f<a&&(a=f),m<l&&(l=m),f>u&&(u=f),m>h&&(h=m)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return Yr(s,o,t,a,l,c,0),o}function Ku(n,e,t,i,r){let s;if(r===Wp(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=gc(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=gc(o/i|0,n[o],n[o+1],s);return s&&pr(s,s.next)&&(Zr(s),s=s.next),s}function Vi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(pr(t,t.next)||wt(t.prev,t,t.next)===0)){if(Zr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Yr(n,e,t,i,r,s,o){if(!n)return;!o&&s&&Bp(n,i,r,s);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Pp(n,i,r,s):Rp(n)){e.push(l.i,n.i,c.i),Zr(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Lp(Vi(n),e),Yr(n,e,t,i,r,s,2)):o===2&&Ip(n,e,t,i,r,s):Yr(Vi(n),e,t,i,r,s,1);break}}}function Rp(n){const e=n.prev,t=n,i=n.next;if(wt(e,t,i)>=0)return!1;const r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=Math.min(r,s,o),h=Math.min(a,l,c),d=Math.max(r,s,o),f=Math.max(a,l,c);let m=i.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&Fr(r,a,s,l,o,c,m.x,m.y)&&wt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Pp(n,e,t,i){const r=n.prev,s=n,o=n.next;if(wt(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,d=o.y,f=Math.min(a,l,c),m=Math.min(u,h,d),v=Math.max(a,l,c),g=Math.max(u,h,d),p=$a(f,m,e,t,i),y=$a(v,g,e,t,i);let b=n.prevZ,S=n.nextZ;for(;b&&b.z>=p&&S&&S.z<=y;){if(b.x>=f&&b.x<=v&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&Fr(a,u,l,h,c,d,b.x,b.y)&&wt(b.prev,b,b.next)>=0||(b=b.prevZ,S.x>=f&&S.x<=v&&S.y>=m&&S.y<=g&&S!==r&&S!==o&&Fr(a,u,l,h,c,d,S.x,S.y)&&wt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=v&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&Fr(a,u,l,h,c,d,b.x,b.y)&&wt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;S&&S.z<=y;){if(S.x>=f&&S.x<=v&&S.y>=m&&S.y<=g&&S!==r&&S!==o&&Fr(a,u,l,h,c,d,S.x,S.y)&&wt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Lp(n,e){let t=n;do{const i=t.prev,r=t.next.next;!pr(i,r)&&Ju(i,t,t.next,r)&&Kr(i,r)&&Kr(r,i)&&(e.push(i.i,t.i,r.i),Zr(t),Zr(t.next),t=n=r),t=t.next}while(t!==n);return Vi(t)}function Ip(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Hp(o,a)){let l=Qu(o,a);o=Vi(o,o.next),l=Vi(l,l.next),Yr(o,e,t,i,r,s,0),Yr(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function Dp(n,e,t,i){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=Ku(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(zp(c))}r.sort(Np);for(let s=0;s<r.length;s++)t=Up(r[s],t);return t}function Np(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Up(n,e){const t=Fp(n,e);if(!t)return e;const i=Qu(t,n);return Vi(i,i.next),Vi(t,t.next)}function Fp(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,o;if(pr(n,t))return t;do{if(pr(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,o=t.x<t.next.x?t:t.next,h===i))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Zu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);Kr(t,n)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&Op(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function Op(n,e){return wt(n.prev,n,e.prev)<0&&wt(e.next,n,n.next)<0}function Bp(n,e,t,i){let r=n;do r.z===0&&(r.z=$a(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,kp(r)}function kp(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function $a(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function zp(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Zu(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function Fr(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&Zu(n,e,t,i,r,s,o,a)}function Hp(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Vp(n,e)&&(Kr(n,e)&&Kr(e,n)&&Gp(n,e)&&(wt(n.prev,n,e.prev)||wt(n,e.prev,e))||pr(n,e)&&wt(n.prev,n,n.next)>0&&wt(e.prev,e,e.next)>0)}function wt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function pr(n,e){return n.x===e.x&&n.y===e.y}function Ju(n,e,t,i){const r=Es(wt(n,e,t)),s=Es(wt(n,e,i)),o=Es(wt(t,i,n)),a=Es(wt(t,i,e));return!!(r!==s&&o!==a||r===0&&ys(n,t,e)||s===0&&ys(n,i,e)||o===0&&ys(t,n,i)||a===0&&ys(t,e,i))}function ys(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Es(n){return n>0?1:n<0?-1:0}function Vp(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Ju(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Kr(n,e){return wt(n.prev,n,n.next)<0?wt(n,e,n.next)>=0&&wt(n,n.prev,e)>=0:wt(n,e,n.prev)<0||wt(n,n.next,e)<0}function Gp(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Qu(n,e){const t=Ya(n.i,n.x,n.y),i=Ya(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function gc(n,e,t,i){const r=Ya(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Zr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ya(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Wp(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class Xp{static triangulate(e,t,i=2){return Cp(e,t,i)}}class Gr{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Gr.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];_c(e),vc(i,e);let o=e.length;t.forEach(_c);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,vc(i,t[l]);const a=Xp.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function _c(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function vc(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Qs extends $n{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,d=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<u;p++){const y=p*d-o;for(let b=0;b<c;b++){const S=b*h-s;m.push(S,-y,0),v.push(0,0,1),g.push(b/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const b=y+c*p,S=y+c*(p+1),A=y+1+c*(p+1),C=y+1+c*p;f.push(b,S,C),f.push(S,A,C)}this.setIndex(f),this.setAttribute("position",new yn(m,3)),this.setAttribute("normal",new yn(v,3)),this.setAttribute("uv",new yn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.width,e.height,e.widthSegments,e.heightSegments)}}class vl extends $n{constructor(e=new Yu([new Ce(0,.5),new Ce(-.5,-.5),new Ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new yn(r,3)),this.setAttribute("normal",new yn(s,3)),this.setAttribute("uv",new yn(o,2));function c(u){const h=r.length/3,d=u.extractPoints(t);let f=d.shape;const m=d.holes;Gr.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];Gr.isClockWise(y)===!0&&(m[g]=y.reverse())}const v=Gr.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];r.push(y.x,y.y,0),s.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=v.length;g<p;g++){const y=v[g],b=y[0]+h,S=y[1]+h,A=y[2]+h;i.push(b,S,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return qp(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=t[e.shapes[r]];i.push(o)}return new vl(i,e.curveSegments)}}function qp(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}function mr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(xc(r))r.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(xc(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function on(n){const e={};for(let t=0;t<n.length;t++){const i=mr(n[t]);for(const r in i)e[r]=i[r]}return e}function xc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function $p(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ju(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Yp={clone:mr,merge:on};var Kp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends Qr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kp,this.fragmentShader=Zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mr(e.uniforms),this.uniformsGroups=$p(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Qe().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ce().fromArray(r.value);break;case"v3":this.uniforms[i].value=new k().fromArray(r.value);break;case"v4":this.uniforms[i].value=new At().fromArray(r.value);break;case"m3":this.uniforms[i].value=new We().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ct().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Jp extends qn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Mc extends Qr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xa,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qp extends Qr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class jp extends Qr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ed extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const zo=new Ct,Sc=new k,yc=new k;class em{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new Ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ml,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Sc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sc),yc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yc),t.updateMatrixWorld(),zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===$r||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const bs=new k,Ts=new _r,Un=new k;class td extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bs,Ts,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bs,Ts,Un.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(bs,Ts,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bs,Ts,Un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const _i=new k,Ec=new Ce,bc=new Ce;class Sn extends td{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qa*2*Math.atan(Math.tan(fo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_i.x,_i.y).multiplyScalar(-e/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(_i.x,_i.y).multiplyScalar(-e/_i.z)}getViewSize(e,t){return this.getViewBounds(e,Ec,bc),t.subVectors(bc,Ec)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class xl extends td{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class tm extends em{constructor(){super(new xl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tc extends ed{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new tm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class nm extends ed{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const rr=-90,sr=1;class im extends jt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Sn(rr,sr,e,t);r.layers=this.layers,this.add(r);const s=new Sn(rr,sr,e,t);s.layers=this.layers,this.add(s);const o=new Sn(rr,sr,e,t);o.layers=this.layers,this.add(o);const a=new Sn(rr,sr,e,t);a.layers=this.layers,this.add(a);const l=new Sn(rr,sr,e,t);l.layers=this.layers,this.add(l);const c=new Sn(rr,sr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$r)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class rm extends Sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const bl=class bl{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};bl.prototype.isMatrix2=!0;let Ac=bl;function wc(n,e,t,i){const r=sm(i);switch(t){case Iu:return n*e;case Nu:return n*e/r.components*r.byteLength;case al:return n*e/r.components*r.byteLength;case Hi:return n*e*2/r.components*r.byteLength;case ll:return n*e*2/r.components*r.byteLength;case Du:return n*e*3/r.components*r.byteLength;case In:return n*e*4/r.components*r.byteLength;case cl:return n*e*4/r.components*r.byteLength;case Ds:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Us:case Fs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ga:case va:return Math.max(n,16)*Math.max(e,8)/4;case ma:case _a:return Math.max(n,8)*Math.max(e,8)/2;case xa:case Ma:case ya:case Ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sa:case Hs:case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case wa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case La:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ia:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Na:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Oa:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ba:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ka:case za:case Ha:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Va:case Ga:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Vs:case Wa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sm(n){switch(n){case vn:case Cu:return{byteLength:1,components:1};case Xr:case Ru:case li:return{byteLength:2,components:1};case sl:case ol:return{byteLength:2,components:4};case Xn:case rl:case zn:return{byteLength:4,components:1};case Pu:case Lu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:il}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=il);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nd(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function om(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],v=h[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,h[d]=v)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const v=h[f];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lm=`#ifdef USE_ALPHAHASH
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
#endif`,cm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,um=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fm=`#ifdef USE_AOMAP
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
#endif`,pm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mm=`#ifdef USE_BATCHING
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
#endif`,gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mm=`#ifdef USE_IRIDESCENCE
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
#endif`,Sm=`#ifdef USE_BUMPMAP
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
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Am=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Pm=`#define PI 3.141592653589793
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
} // validated`,Lm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Im=`vec3 transformedNormal = objectNormal;
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
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Um=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Om="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,km=`#ifdef USE_ENVMAP
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
#endif`,zm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hm=`#ifdef USE_ENVMAP
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
#endif`,Vm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gm=`#ifdef USE_ENVMAP
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
#endif`,Wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$m=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ym=`#ifdef USE_GRADIENTMAP
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
}`,Km=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,jm=`#ifdef USE_ENVMAP
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
#endif`,eg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ng=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rg=`PhysicalMaterial material;
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
#endif`,sg=`uniform sampler2D dfgLUT;
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
}`,og=`
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
#endif`,ag=`#if defined( RE_IndirectDiffuse )
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
#endif`,lg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ug=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_g=`#if defined( USE_POINTS_UV )
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
#endif`,vg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Eg=`#ifdef USE_MORPHTARGETS
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
#endif`,bg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ag=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Pg=`#ifdef USE_NORMALMAP
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
#endif`,Lg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ig=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ng=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Og=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qg=`float getShadowMask() {
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
}`,$g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yg=`#ifdef USE_SKINNING
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
#endif`,Kg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zg=`#ifdef USE_SKINNING
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
#endif`,Jg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,e0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,t0=`#ifdef USE_TRANSMISSION
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
#endif`,n0=`#ifdef USE_TRANSMISSION
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
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const a0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l0=`uniform sampler2D t2D;
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
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`#include <common>
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
}`,p0=`#if DEPTH_PACKING == 3200
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
}`,m0=`#define DISTANCE
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
}`,g0=`#define DISTANCE
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
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,v0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`uniform float scale;
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
}`,M0=`uniform vec3 diffuse;
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
}`,S0=`#include <common>
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
}`,y0=`uniform vec3 diffuse;
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
}`,E0=`#define LAMBERT
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
}`,b0=`#define LAMBERT
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
}`,T0=`#define MATCAP
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
}`,A0=`#define MATCAP
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
}`,w0=`#define NORMAL
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
}`,C0=`#define NORMAL
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
}`,R0=`#define PHONG
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
}`,P0=`#define PHONG
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
}`,L0=`#define STANDARD
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
}`,I0=`#define STANDARD
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
}`,D0=`#define TOON
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
}`,N0=`#define TOON
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
}`,U0=`uniform float size;
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
}`,F0=`uniform vec3 diffuse;
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
}`,O0=`#include <common>
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
}`,B0=`uniform vec3 color;
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
}`,k0=`uniform float rotation;
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
}`,z0=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:am,alphahash_pars_fragment:lm,alphamap_fragment:cm,alphamap_pars_fragment:um,alphatest_fragment:dm,alphatest_pars_fragment:hm,aomap_fragment:fm,aomap_pars_fragment:pm,batching_pars_vertex:mm,batching_vertex:gm,begin_vertex:_m,beginnormal_vertex:vm,bsdfs:xm,iridescence_fragment:Mm,bumpmap_pars_fragment:Sm,clipping_planes_fragment:ym,clipping_planes_pars_fragment:Em,clipping_planes_pars_vertex:bm,clipping_planes_vertex:Tm,color_fragment:Am,color_pars_fragment:wm,color_pars_vertex:Cm,color_vertex:Rm,common:Pm,cube_uv_reflection_fragment:Lm,defaultnormal_vertex:Im,displacementmap_pars_vertex:Dm,displacementmap_vertex:Nm,emissivemap_fragment:Um,emissivemap_pars_fragment:Fm,colorspace_fragment:Om,colorspace_pars_fragment:Bm,envmap_fragment:km,envmap_common_pars_fragment:zm,envmap_pars_fragment:Hm,envmap_pars_vertex:Vm,envmap_physical_pars_fragment:jm,envmap_vertex:Gm,fog_vertex:Wm,fog_pars_vertex:Xm,fog_fragment:qm,fog_pars_fragment:$m,gradientmap_pars_fragment:Ym,lightmap_pars_fragment:Km,lights_lambert_fragment:Zm,lights_lambert_pars_fragment:Jm,lights_pars_begin:Qm,lights_toon_fragment:eg,lights_toon_pars_fragment:tg,lights_phong_fragment:ng,lights_phong_pars_fragment:ig,lights_physical_fragment:rg,lights_physical_pars_fragment:sg,lights_fragment_begin:og,lights_fragment_maps:ag,lights_fragment_end:lg,lightprobes_pars_fragment:cg,logdepthbuf_fragment:ug,logdepthbuf_pars_fragment:dg,logdepthbuf_pars_vertex:hg,logdepthbuf_vertex:fg,map_fragment:pg,map_pars_fragment:mg,map_particle_fragment:gg,map_particle_pars_fragment:_g,metalnessmap_fragment:vg,metalnessmap_pars_fragment:xg,morphinstance_vertex:Mg,morphcolor_vertex:Sg,morphnormal_vertex:yg,morphtarget_pars_vertex:Eg,morphtarget_vertex:bg,normal_fragment_begin:Tg,normal_fragment_maps:Ag,normal_pars_fragment:wg,normal_pars_vertex:Cg,normal_vertex:Rg,normalmap_pars_fragment:Pg,clearcoat_normal_fragment_begin:Lg,clearcoat_normal_fragment_maps:Ig,clearcoat_pars_fragment:Dg,iridescence_pars_fragment:Ng,opaque_fragment:Ug,packing:Fg,premultiplied_alpha_fragment:Og,project_vertex:Bg,dithering_fragment:kg,dithering_pars_fragment:zg,roughnessmap_fragment:Hg,roughnessmap_pars_fragment:Vg,shadowmap_pars_fragment:Gg,shadowmap_pars_vertex:Wg,shadowmap_vertex:Xg,shadowmask_pars_fragment:qg,skinbase_vertex:$g,skinning_pars_vertex:Yg,skinning_vertex:Kg,skinnormal_vertex:Zg,specularmap_fragment:Jg,specularmap_pars_fragment:Qg,tonemapping_fragment:jg,tonemapping_pars_fragment:e0,transmission_fragment:t0,transmission_pars_fragment:n0,uv_pars_fragment:i0,uv_pars_vertex:r0,uv_vertex:s0,worldpos_vertex:o0,background_vert:a0,background_frag:l0,backgroundCube_vert:c0,backgroundCube_frag:u0,cube_vert:d0,cube_frag:h0,depth_vert:f0,depth_frag:p0,distance_vert:m0,distance_frag:g0,equirect_vert:_0,equirect_frag:v0,linedashed_vert:x0,linedashed_frag:M0,meshbasic_vert:S0,meshbasic_frag:y0,meshlambert_vert:E0,meshlambert_frag:b0,meshmatcap_vert:T0,meshmatcap_frag:A0,meshnormal_vert:w0,meshnormal_frag:C0,meshphong_vert:R0,meshphong_frag:P0,meshphysical_vert:L0,meshphysical_frag:I0,meshtoon_vert:D0,meshtoon_frag:N0,points_vert:U0,points_frag:F0,shadow_vert:O0,shadow_frag:B0,sprite_vert:k0,sprite_frag:z0},Me={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Bn={basic:{uniforms:on([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:on([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:on([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:on([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:on([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Qe(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:on([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:on([Me.points,Me.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:on([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:on([Me.common,Me.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:on([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:on([Me.sprite,Me.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:on([Me.common,Me.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:on([Me.lights,Me.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Bn.physical={uniforms:on([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const As={r:0,b:0,g:0},H0=new Ct,id=new We;id.set(-1,0,0,0,1,0,0,0,1);function V0(n,e,t,i,r,s){const o=new Qe(0);let a=r===!0?0:1,l,c,u=null,h=0,d=null;function f(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){const S=y.backgroundBlurriness>0;b=e.get(b,S)}return b}function m(y){let b=!1;const S=f(y);S===null?g(o,a):S&&S.isColor&&(g(S,1),b=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(y,b){const S=f(b);S&&(S.isCubeTexture||S.mapping===Js)?(c===void 0&&(c=new En(new vr(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:mr(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(H0.makeRotationFromEuler(b.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(id),c.material.toneMapped=tt.getTransfer(S.colorSpace)!==ft,(u!==S||h!==S.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,h=S.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new En(new Qs(2,2),new qn({name:"BackgroundMaterial",uniforms:mr(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=tt.getTransfer(S.colorSpace)!==ft,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||h!==S.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,h=S.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,b){y.getRGB(As,ju(n)),t.buffers.color.setClear(As.r,As.g,As.b,b,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,b=1){o.set(y),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,g(o,a)},render:m,addToRenderList:v,dispose:p}}function G0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(N,H,Q,te,z){let Y=!1;const W=h(N,te,Q,H);s!==W&&(s=W,c(s.object)),Y=f(N,te,Q,z),Y&&m(N,te,Q,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,S(N,H,Q,te),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(N){return n.bindVertexArray(N)}function u(N){return n.deleteVertexArray(N)}function h(N,H,Q,te){const z=te.wireframe===!0;let Y=i[H.id];Y===void 0&&(Y={},i[H.id]=Y);const W=N.isInstancedMesh===!0?N.id:0;let ne=Y[W];ne===void 0&&(ne={},Y[W]=ne);let re=ne[Q.id];re===void 0&&(re={},ne[Q.id]=re);let ge=re[z];return ge===void 0&&(ge=d(l()),re[z]=ge),ge}function d(N){const H=[],Q=[],te=[];for(let z=0;z<t;z++)H[z]=0,Q[z]=0,te[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Q,attributeDivisors:te,object:N,attributes:{},index:null}}function f(N,H,Q,te){const z=s.attributes,Y=H.attributes;let W=0;const ne=Q.getAttributes();for(const re in ne)if(ne[re].location>=0){const _e=z[re];let be=Y[re];if(be===void 0&&(re==="instanceMatrix"&&N.instanceMatrix&&(be=N.instanceMatrix),re==="instanceColor"&&N.instanceColor&&(be=N.instanceColor)),_e===void 0||_e.attribute!==be||be&&_e.data!==be.data)return!0;W++}return s.attributesNum!==W||s.index!==te}function m(N,H,Q,te){const z={},Y=H.attributes;let W=0;const ne=Q.getAttributes();for(const re in ne)if(ne[re].location>=0){let _e=Y[re];_e===void 0&&(re==="instanceMatrix"&&N.instanceMatrix&&(_e=N.instanceMatrix),re==="instanceColor"&&N.instanceColor&&(_e=N.instanceColor));const be={};be.attribute=_e,_e&&_e.data&&(be.data=_e.data),z[re]=be,W++}s.attributes=z,s.attributesNum=W,s.index=te}function v(){const N=s.newAttributes;for(let H=0,Q=N.length;H<Q;H++)N[H]=0}function g(N){p(N,0)}function p(N,H){const Q=s.newAttributes,te=s.enabledAttributes,z=s.attributeDivisors;Q[N]=1,te[N]===0&&(n.enableVertexAttribArray(N),te[N]=1),z[N]!==H&&(n.vertexAttribDivisor(N,H),z[N]=H)}function y(){const N=s.newAttributes,H=s.enabledAttributes;for(let Q=0,te=H.length;Q<te;Q++)H[Q]!==N[Q]&&(n.disableVertexAttribArray(Q),H[Q]=0)}function b(N,H,Q,te,z,Y,W){W===!0?n.vertexAttribIPointer(N,H,Q,z,Y):n.vertexAttribPointer(N,H,Q,te,z,Y)}function S(N,H,Q,te){v();const z=te.attributes,Y=Q.getAttributes(),W=H.defaultAttributeValues;for(const ne in Y){const re=Y[ne];if(re.location>=0){let ge=z[ne];if(ge===void 0&&(ne==="instanceMatrix"&&N.instanceMatrix&&(ge=N.instanceMatrix),ne==="instanceColor"&&N.instanceColor&&(ge=N.instanceColor)),ge!==void 0){const _e=ge.normalized,be=ge.itemSize,nt=e.get(ge);if(nt===void 0)continue;const st=nt.buffer,Ge=nt.type,j=nt.bytesPerElement,ce=Ge===n.INT||Ge===n.UNSIGNED_INT||ge.gpuType===rl;if(ge.isInterleavedBufferAttribute){const se=ge.data,Fe=se.stride,ze=ge.offset;if(se.isInstancedInterleavedBuffer){for(let De=0;De<re.locationSize;De++)p(re.location+De,se.meshPerAttribute);N.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let De=0;De<re.locationSize;De++)g(re.location+De);n.bindBuffer(n.ARRAY_BUFFER,st);for(let De=0;De<re.locationSize;De++)b(re.location+De,be/re.locationSize,Ge,_e,Fe*j,(ze+be/re.locationSize*De)*j,ce)}else{if(ge.isInstancedBufferAttribute){for(let se=0;se<re.locationSize;se++)p(re.location+se,ge.meshPerAttribute);N.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let se=0;se<re.locationSize;se++)g(re.location+se);n.bindBuffer(n.ARRAY_BUFFER,st);for(let se=0;se<re.locationSize;se++)b(re.location+se,be/re.locationSize,Ge,_e,be*j,be/re.locationSize*se*j,ce)}}else if(W!==void 0){const _e=W[ne];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(re.location,_e);break;case 3:n.vertexAttrib3fv(re.location,_e);break;case 4:n.vertexAttrib4fv(re.location,_e);break;default:n.vertexAttrib1fv(re.location,_e)}}}}y()}function A(){R();for(const N in i){const H=i[N];for(const Q in H){const te=H[Q];for(const z in te){const Y=te[z];for(const W in Y)u(Y[W].object),delete Y[W];delete te[z]}}delete i[N]}}function C(N){if(i[N.id]===void 0)return;const H=i[N.id];for(const Q in H){const te=H[Q];for(const z in te){const Y=te[z];for(const W in Y)u(Y[W].object),delete Y[W];delete te[z]}}delete i[N.id]}function L(N){for(const H in i){const Q=i[H];for(const te in Q){const z=Q[te];if(z[N.id]===void 0)continue;const Y=z[N.id];for(const W in Y)u(Y[W].object),delete Y[W];delete z[N.id]}}}function x(N){for(const H in i){const Q=i[H],te=N.isInstancedMesh===!0?N.id:0,z=Q[te];if(z!==void 0){for(const Y in z){const W=z[Y];for(const ne in W)u(W[ne].object),delete W[ne];delete z[Y]}delete Q[te],Object.keys(Q).length===0&&delete i[H]}}}function R(){O(),o=!0,s!==r&&(s=r,c(s.object))}function O(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:O,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfObject:x,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function W0(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function X0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(L){return!(L!==In&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const x=L===li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==vn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==zn&&!x)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(ke("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:S,maxSamples:A,samples:C}}function q0(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Ni,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||r;return r=d,i=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const y=s?0:i,b=y*4;let S=p.clippingState||null;l.value=S,S=u(m,d,b,f);for(let A=0;A!==b;++A)S[A]=t[A];p.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,m){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,S=f;b!==v;++b,S+=4)o.copy(h[b]).applyMatrix4(y,a),o.normal.toArray(g,S),g[S+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}const Mi=4,Cc=[.125,.215,.35,.446,.526,.582],Oi=20,$0=256,Lr=new xl,Rc=new Qe;let Ho=null,Vo=0,Go=0,Wo=!1;const Y0=new k;class Pc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=Y0}=s;Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ic(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ho,Vo,Go),this._renderer.xr.enabled=Wo,e.scissorTest=!1,or(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===hr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:li,format:In,colorSpace:Gs,depthBuffer:!1},r=Lc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=K0(s)),this._blurMaterial=J0(s,e,t),this._ggxMaterial=Z0(s,e,t)}return r}_compileMaterial(e){const t=new En(new $n,e);this._renderer.compile(t,Lr)}_sceneToCubeUV(e,t,i,r,s){const l=new Sn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Rc),h.toneMapping=Vn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new En(new vr,new Hu({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,p=!0):(g.color.copy(Rc),p=!0);for(let b=0;b<6;b++){const S=b%3;S===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[b],s.y,s.z)):S===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[b]));const A=this._cubeSize;or(r,S*A,b>2?A:0,A,A),h.setRenderTarget(r),p&&h.render(v,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===zi||e.mapping===hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ic());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;or(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Lr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:m}=this,v=this._sizeLods[i],g=3*v*(i>m-Mi?i-m+Mi:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,or(s,g,p,3*v,2*v),r.setRenderTarget(s),r.render(a,Lr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,or(e,g,p,3*v,2*v),r.setRenderTarget(e),r.render(a,Lr)}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&at("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[r];h.material=c;const d=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),v=s/m,g=isFinite(s)?1+Math.floor(u*v):Oi;g>Oi&&ke(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Oi}`);const p=[];let y=0;for(let L=0;L<Oi;++L){const x=L/v,R=Math.exp(-x*x/2);p.push(R),L===0?y+=R:L<g&&(y+=2*R)}for(let L=0;L<p.length;L++)p[L]=p[L]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=m,d.mipInt.value=b-i;const S=this._sizeLods[r],A=3*S*(r>b-Mi?r-b+Mi:0),C=4*(this._cubeSize-S);or(t,A,C,3*S,2*S),l.setRenderTarget(t),l.render(h,Lr)}}function K0(n){const e=[],t=[],i=[];let r=n;const s=n-Mi+1+Cc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-Mi?l=Cc[o-n+Mi-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,v=3,g=2,p=1,y=new Float32Array(v*m*f),b=new Float32Array(g*m*f),S=new Float32Array(p*m*f);for(let C=0;C<f;C++){const L=C%3*2/3-1,x=C>2?0:-1,R=[L,x,0,L+2/3,x,0,L+2/3,x+1,0,L,x,0,L+2/3,x+1,0,L,x+1,0];y.set(R,v*m*C),b.set(d,g*m*C);const O=[C,C,C,C,C,C];S.set(O,p*m*C)}const A=new $n;A.setAttribute("position",new Wn(y,v)),A.setAttribute("uv",new Wn(b,g)),A.setAttribute("faceIndex",new Wn(S,p)),i.push(new En(A,null)),r>Mi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Lc(n,e,t){const i=new Gn(n,e,t);return i.texture.mapping=Js,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function or(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Z0(n,e,t){return new qn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function J0(n,e,t){const i=new Float32Array(Oi),r=new k(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:js(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Ic(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Dc(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function js(){return`

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
	`}class rd extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Vu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new vr(5,5,5),s=new qn({name:"CubemapFromEquirect",uniforms:mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:oi});s.uniforms.tEquirect.value=t;const o=new En(r,s),a=t.minFilter;return t.minFilter===Bi&&(t.minFilter=Qt),new im(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}function Q0(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,f=!1){return d==null?null:f?o(d):s(d)}function s(d){if(d&&d.isTexture){const f=d.mapping;if(f===co||f===uo)if(e.has(d)){const m=e.get(d).texture;return a(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const v=new rd(m.height);return v.fromEquirectangularTexture(n,d),e.set(d,v),d.addEventListener("dispose",c),a(v.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const f=d.mapping,m=f===co||f===uo,v=f===zi||f===hr;if(m||v){let g=t.get(d);const p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new Pc(n)),g=m?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const y=d.image;return m&&y&&y.height>0||v&&y&&l(y)?(i===null&&(i=new Pc(n)),g=m?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function a(d,f){return f===co?d.mapping=zi:f===uo&&(d.mapping=hr),d}function l(d){let f=0;const m=6;for(let v=0;v<m;v++)d[v]!==void 0&&f++;return f===m}function c(d){const f=d.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function j0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&lr("WebGLRenderer: "+i+" extension not supported."),r}}}function e_(n,e,t,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,m=h.attributes.position;let v=0;if(m===void 0)return;if(f!==null){const y=f.array;v=f.version;for(let b=0,S=y.length;b<S;b+=3){const A=y[b+0],C=y[b+1],L=y[b+2];d.push(A,C,C,L,L,A)}}else{const y=m.array;v=m.version;for(let b=0,S=y.length/3-1;b<S;b+=3){const A=b+0,C=b+1,L=b+2;d.push(A,C,C,L,L,A)}}const g=new(m.count>=65535?zu:ku)(d,1);g.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function t_(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*o),t.update(d,i,1)}function c(h,d,f){f!==0&&(n.drawElementsInstanced(i,d,s,h*o,f),t.update(d,i,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,f);let v=0;for(let g=0;g<f;g++)v+=d[g];t.update(v,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function n_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:at("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function i_(n,e,t){const i=new WeakMap,r=new At;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==h){let O=function(){x.dispose(),i.delete(a),a.removeEventListener("dispose",O)};var f=O;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let S=0;m===!0&&(S=1),v===!0&&(S=2),g===!0&&(S=3);let A=a.attributes.position.count*S,C=1;A>e.maxTextureSize&&(C=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const L=new Float32Array(A*C*4*h),x=new Fu(L,A,C,h);x.type=zn,x.needsUpdate=!0;const R=S*4;for(let N=0;N<h;N++){const H=p[N],Q=y[N],te=b[N],z=A*C*4*N;for(let Y=0;Y<H.count;Y++){const W=Y*R;m===!0&&(r.fromBufferAttribute(H,Y),L[z+W+0]=r.x,L[z+W+1]=r.y,L[z+W+2]=r.z,L[z+W+3]=0),v===!0&&(r.fromBufferAttribute(Q,Y),L[z+W+4]=r.x,L[z+W+5]=r.y,L[z+W+6]=r.z,L[z+W+7]=0),g===!0&&(r.fromBufferAttribute(te,Y),L[z+W+8]=r.x,L[z+W+9]=r.y,L[z+W+10]=r.z,L[z+W+11]=te.itemSize===4?r.w:1)}}d={count:h,texture:x,size:new Ce(A,C)},i.set(a,d),a.addEventListener("dispose",O)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function r_(n,e,t,i,r){let s=new WeakMap;function o(c){const u=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return d}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const s_={[Mu]:"LINEAR_TONE_MAPPING",[Su]:"REINHARD_TONE_MAPPING",[yu]:"CINEON_TONE_MAPPING",[Eu]:"ACES_FILMIC_TONE_MAPPING",[Tu]:"AGX_TONE_MAPPING",[Au]:"NEUTRAL_TONE_MAPPING",[bu]:"CUSTOM_TONE_MAPPING"};function o_(n,e,t,i,r,s){const o=new Gn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new fr(e,t):void 0}),a=new Gn(e,t,{type:li,depthBuffer:!1,stencilBuffer:!1}),l=new $n;l.setAttribute("position",new yn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new yn([0,2,0,0,2,0],2));const c=new Jp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new En(l,c),h=new xl(-1,1,1,-1,0,1);let d=null,f=null,m=!1,v,g=null,p=[],y=!1;this.setSize=function(b,S){o.setSize(b,S),a.setSize(b,S);for(let A=0;A<p.length;A++){const C=p[A];C.setSize&&C.setSize(b,S)}},this.setEffects=function(b){p=b,y=p.length>0&&p[0].isRenderPass===!0;const S=o.width,A=o.height;for(let C=0;C<p.length;C++){const L=p[C];L.setSize&&L.setSize(S,A)}},this.begin=function(b,S){if(m||b.toneMapping===Vn&&p.length===0)return!1;if(g=S,S!==null){const A=S.width,C=S.height;(o.width!==A||o.height!==C)&&this.setSize(A,C)}return y===!1&&b.setRenderTarget(o),v=b.toneMapping,b.toneMapping=Vn,!0},this.hasRenderPass=function(){return y},this.end=function(b,S){b.toneMapping=v,m=!0;let A=o,C=a;for(let L=0;L<p.length;L++){const x=p[L];if(x.enabled!==!1&&(x.render(b,C,A,S),x.needsSwap!==!1)){const R=A;A=C,C=R}}if(d!==b.outputColorSpace||f!==b.toneMapping){d=b.outputColorSpace,f=b.toneMapping,c.defines={},tt.getTransfer(d)===ft&&(c.defines.SRGB_TRANSFER="");const L=s_[f];L&&(c.defines[L]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(g),b.render(u,h),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const sd=new an,Ka=new fr(1,1),od=new Fu,ad=new Kf,ld=new Vu,Nc=[],Uc=[],Fc=new Float32Array(16),Oc=new Float32Array(9),Bc=new Float32Array(4);function xr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Nc[r];if(s===void 0&&(s=new Float32Array(r),Nc[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function kt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function eo(n,e){let t=Uc[e];t===void 0&&(t=new Int32Array(e),Uc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function a_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function l_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function c_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function u_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function d_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,i))return;Bc.set(i),n.uniformMatrix2fv(this.addr,!1,Bc),zt(t,i)}}function h_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,i))return;Oc.set(i),n.uniformMatrix3fv(this.addr,!1,Oc),zt(t,i)}}function f_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(kt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,i))return;Fc.set(i),n.uniformMatrix4fv(this.addr,!1,Fc),zt(t,i)}}function p_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function m_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function g_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function __(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function v_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function x_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function M_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function S_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function y_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ka.compareFunction=t.isReversedDepthBuffer()?dl:ul,s=Ka):s=sd,t.setTexture2D(e||s,r)}function E_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ad,r)}function b_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ld,r)}function T_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||od,r)}function A_(n){switch(n){case 5126:return a_;case 35664:return l_;case 35665:return c_;case 35666:return u_;case 35674:return d_;case 35675:return h_;case 35676:return f_;case 5124:case 35670:return p_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return __;case 5125:return v_;case 36294:return x_;case 36295:return M_;case 36296:return S_;case 35678:case 36198:case 36298:case 36306:case 35682:return y_;case 35679:case 36299:case 36307:return E_;case 35680:case 36300:case 36308:case 36293:return b_;case 36289:case 36303:case 36311:case 36292:return T_}}function w_(n,e){n.uniform1fv(this.addr,e)}function C_(n,e){const t=xr(e,this.size,2);n.uniform2fv(this.addr,t)}function R_(n,e){const t=xr(e,this.size,3);n.uniform3fv(this.addr,t)}function P_(n,e){const t=xr(e,this.size,4);n.uniform4fv(this.addr,t)}function L_(n,e){const t=xr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function I_(n,e){const t=xr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function D_(n,e){const t=xr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function N_(n,e){n.uniform1iv(this.addr,e)}function U_(n,e){n.uniform2iv(this.addr,e)}function F_(n,e){n.uniform3iv(this.addr,e)}function O_(n,e){n.uniform4iv(this.addr,e)}function B_(n,e){n.uniform1uiv(this.addr,e)}function k_(n,e){n.uniform2uiv(this.addr,e)}function z_(n,e){n.uniform3uiv(this.addr,e)}function H_(n,e){n.uniform4uiv(this.addr,e)}function V_(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);kt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=Ka:o=sd;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function G_(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);kt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ad,s[o])}function W_(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);kt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ld,s[o])}function X_(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);kt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||od,s[o])}function q_(n){switch(n){case 5126:return w_;case 35664:return C_;case 35665:return R_;case 35666:return P_;case 35674:return L_;case 35675:return I_;case 35676:return D_;case 5124:case 35670:return N_;case 35667:case 35671:return U_;case 35668:case 35672:return F_;case 35669:case 35673:return O_;case 5125:return B_;case 36294:return k_;case 36295:return z_;case 36296:return H_;case 35678:case 36198:case 36298:case 36306:case 35682:return V_;case 35679:case 36299:case 36307:return G_;case 35680:case 36300:case 36308:case 36293:return W_;case 36289:case 36303:case 36311:case 36292:return X_}}class $_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=A_(t.type)}}class Y_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=q_(t.type)}}class K_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function kc(n,e){n.seq.push(e),n.map[e.id]=e}function Z_(n,e,t){const i=n.name,r=i.length;for(Xo.lastIndex=0;;){const s=Xo.exec(i),o=Xo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){kc(t,c===void 0?new $_(a,n,e):new Y_(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new K_(a),kc(t,h)),t=h}}}class Os{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Z_(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function zc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const J_=37297;let Q_=0;function j_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Hc=new We;function ev(n){tt._getMatrix(Hc,tt.workingColorSpace,n);const e=`mat3( ${Hc.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(n)){case Ws:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Vc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+j_(n.getShaderSource(e),a)}else return s}function tv(n,e){const t=ev(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const nv={[Mu]:"Linear",[Su]:"Reinhard",[yu]:"Cineon",[Eu]:"ACESFilmic",[Tu]:"AgX",[Au]:"Neutral",[bu]:"Custom"};function iv(n,e){const t=nv[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ws=new k;function rv(){tt.getLuminanceCoefficients(ws);const n=ws.x.toFixed(4),e=ws.y.toFixed(4),t=ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Or).join(`
`)}function ov(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function av(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Or(n){return n!==""}function Gc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Za(n){return n.replace(lv,uv)}const cv=new Map;function uv(n,e){let t=$e[e];if(t===void 0){const i=cv.get(e);if(i!==void 0)t=$e[i],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Za(t)}const dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xc(n){return n.replace(dv,hv)}function hv(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function qc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const fv={[Is]:"SHADOWMAP_TYPE_PCF",[Nr]:"SHADOWMAP_TYPE_VSM"};function pv(n){return fv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const mv={[zi]:"ENVMAP_TYPE_CUBE",[hr]:"ENVMAP_TYPE_CUBE",[Js]:"ENVMAP_TYPE_CUBE_UV"};function gv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":mv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const _v={[hr]:"ENVMAP_MODE_REFRACTION"};function vv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":_v[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const xv={[xu]:"ENVMAP_BLENDING_MULTIPLY",[Cf]:"ENVMAP_BLENDING_MIX",[Rf]:"ENVMAP_BLENDING_ADD"};function Mv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":xv[n.combine]||"ENVMAP_BLENDING_NONE"}function Sv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function yv(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=pv(t),c=gv(t),u=vv(t),h=Mv(t),d=Sv(t),f=sv(t),m=ov(s),v=r.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Or).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Or).join(`
`),p.length>0&&(p+=`
`)):(g=[qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Or).join(`
`),p=[qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?$e.tonemapping_pars_fragment:"",t.toneMapping!==Vn?iv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,tv("linearToOutputTexel",t.outputColorSpace),rv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Or).join(`
`)),o=Za(o),o=Gc(o,t),o=Wc(o,t),a=Za(a),a=Gc(a,t),a=Wc(a,t),o=Xc(o),a=Xc(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=y+g+o,S=y+p+a,A=zc(r,r.VERTEX_SHADER,b),C=zc(r,r.FRAGMENT_SHADER,S);r.attachShader(v,A),r.attachShader(v,C),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function L(N){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(v)||"",Q=r.getShaderInfoLog(A)||"",te=r.getShaderInfoLog(C)||"",z=H.trim(),Y=Q.trim(),W=te.trim();let ne=!0,re=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,A,C);else{const ge=Vc(r,A,"vertex"),_e=Vc(r,C,"fragment");at("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+z+`
`+ge+`
`+_e)}else z!==""?ke("WebGLProgram: Program Info Log:",z):(Y===""||W==="")&&(re=!1);re&&(N.diagnostics={runnable:ne,programLog:z,vertexShader:{log:Y,prefix:g},fragmentShader:{log:W,prefix:p}})}r.deleteShader(A),r.deleteShader(C),x=new Os(r,v),R=av(r,v)}let x;this.getUniforms=function(){return x===void 0&&L(this),x};let R;this.getAttributes=function(){return R===void 0&&L(this),R};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(v,J_)),O},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Q_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let Ev=0;class bv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Tv(e),t.set(e,i)),i}}class Tv{constructor(e){this.id=Ev++,this.code=e,this.usedTimes=0}}function Av(n){return n===Hi||n===Hs||n===Vs}function wv(n,e,t,i,r,s){const o=new Ou,a=new bv,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,R,O,N,H,Q){const te=N.fog,z=H.geometry,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?N.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ne=e.get(x.envMap||Y,W),re=ne&&ne.mapping===Js?ne.image.height:null,ge=f[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&ke("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const _e=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,be=_e!==void 0?_e.length:0;let nt=0;z.morphAttributes.position!==void 0&&(nt=1),z.morphAttributes.normal!==void 0&&(nt=2),z.morphAttributes.color!==void 0&&(nt=3);let st,Ge,j,ce;if(ge){const Ee=Bn[ge];st=Ee.vertexShader,Ge=Ee.fragmentShader}else{st=x.vertexShader,Ge=x.fragmentShader;const Ee=a.getVertexShaderStage(x),pt=a.getFragmentShaderStage(x);a.update(x,Ee,pt),j=Ee.id,ce=pt.id}const se=n.getRenderTarget(),Fe=n.state.buffers.depth.getReversed(),ze=H.isInstancedMesh===!0,De=H.isBatchedMesh===!0,Mt=!!x.map,Ye=!!x.matcap,it=!!ne,Ze=!!x.aoMap,Ke=!!x.lightMap,ot=!!x.bumpMap&&x.wireframe===!1,yt=!!x.normalMap,Rt=!!x.displacementMap,Lt=!!x.emissiveMap,mt=!!x.metalnessMap,Et=!!x.roughnessMap,U=x.anisotropy>0,Ot=x.clearcoat>0,Oe=x.dispersion>0,w=x.iridescence>0,_=x.sheen>0,B=x.transmission>0,V=U&&!!x.anisotropyMap,X=Ot&&!!x.clearcoatMap,oe=Ot&&!!x.clearcoatNormalMap,ue=Ot&&!!x.clearcoatRoughnessMap,q=w&&!!x.iridescenceMap,Z=w&&!!x.iridescenceThicknessMap,ae=_&&!!x.sheenColorMap,Ae=_&&!!x.sheenRoughnessMap,fe=!!x.specularMap,pe=!!x.specularColorMap,Le=!!x.specularIntensityMap,Ue=B&&!!x.transmissionMap,He=B&&!!x.thicknessMap,D=!!x.gradientMap,de=!!x.alphaMap,J=x.alphaTest>0,me=!!x.alphaHash,ve=!!x.extensions;let ee=Vn;x.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ee=n.toneMapping);const ie={shaderID:ge,shaderType:x.type,shaderName:x.name,vertexShader:st,fragmentShader:Ge,defines:x.defines,customVertexShaderID:j,customFragmentShaderID:ce,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:De,batchingColor:De&&H._colorsTexture!==null,instancing:ze,instancingColor:ze&&H.instanceColor!==null,instancingMorph:ze&&H.morphTexture!==null,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Mt,matcap:Ye,envMap:it,envMapMode:it&&ne.mapping,envMapCubeUVHeight:re,aoMap:Ze,lightMap:Ke,bumpMap:ot,normalMap:yt,displacementMap:Rt,emissiveMap:Lt,normalMapObjectSpace:yt&&x.normalMapType===If,normalMapTangentSpace:yt&&x.normalMapType===Xa,packedNormalMap:yt&&x.normalMapType===Xa&&Av(x.normalMap.format),metalnessMap:mt,roughnessMap:Et,anisotropy:U,anisotropyMap:V,clearcoat:Ot,clearcoatMap:X,clearcoatNormalMap:oe,clearcoatRoughnessMap:ue,dispersion:Oe,iridescence:w,iridescenceMap:q,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:ae,sheenRoughnessMap:Ae,specularMap:fe,specularColorMap:pe,specularIntensityMap:Le,transmission:B,transmissionMap:Ue,thicknessMap:He,gradientMap:D,opaque:x.transparent===!1&&x.blending===ar&&x.alphaToCoverage===!1,alphaMap:de,alphaTest:J,alphaHash:me,combine:x.combine,mapUv:Mt&&m(x.map.channel),aoMapUv:Ze&&m(x.aoMap.channel),lightMapUv:Ke&&m(x.lightMap.channel),bumpMapUv:ot&&m(x.bumpMap.channel),normalMapUv:yt&&m(x.normalMap.channel),displacementMapUv:Rt&&m(x.displacementMap.channel),emissiveMapUv:Lt&&m(x.emissiveMap.channel),metalnessMapUv:mt&&m(x.metalnessMap.channel),roughnessMapUv:Et&&m(x.roughnessMap.channel),anisotropyMapUv:V&&m(x.anisotropyMap.channel),clearcoatMapUv:X&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:oe&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(x.sheenRoughnessMap.channel),specularMapUv:fe&&m(x.specularMap.channel),specularColorMapUv:pe&&m(x.specularColorMap.channel),specularIntensityMapUv:Le&&m(x.specularIntensityMap.channel),transmissionMapUv:Ue&&m(x.transmissionMap.channel),thicknessMapUv:He&&m(x.thicknessMap.channel),alphaMapUv:de&&m(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(yt||U),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!z.attributes.uv&&(Mt||de),fog:!!te,useFog:x.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&yt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Fe,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:nt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:Mt&&x.map.isVideoTexture===!0&&tt.getTransfer(x.map.colorSpace)===ft,decodeVideoTextureEmissive:Lt&&x.emissiveMap.isVideoTexture===!0&&tt.getTransfer(x.emissiveMap.colorSpace)===ft,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===kn,flipSided:x.side===fn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ve&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&x.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ie.vertexUv1s=l.has(1),ie.vertexUv2s=l.has(2),ie.vertexUv3s=l.has(3),l.clear(),ie}function g(x){const R=[];if(x.shaderID?R.push(x.shaderID):(R.push(x.customVertexShaderID),R.push(x.customFragmentShaderID)),x.defines!==void 0)for(const O in x.defines)R.push(O),R.push(x.defines[O]);return x.isRawShaderMaterial===!1&&(p(R,x),y(R,x),R.push(n.outputColorSpace)),R.push(x.customProgramCacheKey),R.join()}function p(x,R){x.push(R.precision),x.push(R.outputColorSpace),x.push(R.envMapMode),x.push(R.envMapCubeUVHeight),x.push(R.mapUv),x.push(R.alphaMapUv),x.push(R.lightMapUv),x.push(R.aoMapUv),x.push(R.bumpMapUv),x.push(R.normalMapUv),x.push(R.displacementMapUv),x.push(R.emissiveMapUv),x.push(R.metalnessMapUv),x.push(R.roughnessMapUv),x.push(R.anisotropyMapUv),x.push(R.clearcoatMapUv),x.push(R.clearcoatNormalMapUv),x.push(R.clearcoatRoughnessMapUv),x.push(R.iridescenceMapUv),x.push(R.iridescenceThicknessMapUv),x.push(R.sheenColorMapUv),x.push(R.sheenRoughnessMapUv),x.push(R.specularMapUv),x.push(R.specularColorMapUv),x.push(R.specularIntensityMapUv),x.push(R.transmissionMapUv),x.push(R.thicknessMapUv),x.push(R.combine),x.push(R.fogExp2),x.push(R.sizeAttenuation),x.push(R.morphTargetsCount),x.push(R.morphAttributeCount),x.push(R.numDirLights),x.push(R.numPointLights),x.push(R.numSpotLights),x.push(R.numSpotLightMaps),x.push(R.numHemiLights),x.push(R.numRectAreaLights),x.push(R.numDirLightShadows),x.push(R.numPointLightShadows),x.push(R.numSpotLightShadows),x.push(R.numSpotLightShadowsWithMaps),x.push(R.numLightProbes),x.push(R.shadowMapType),x.push(R.toneMapping),x.push(R.numClippingPlanes),x.push(R.numClipIntersection),x.push(R.depthPacking)}function y(x,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function b(x){const R=f[x.type];let O;if(R){const N=Bn[R];O=Yp.clone(N.uniforms)}else O=x.uniforms;return O}function S(x,R){let O=u.get(R);return O!==void 0?++O.usedTimes:(O=new yv(n,R,x,r),c.push(O),u.set(R,O)),O}function A(x){if(--x.usedTimes===0){const R=c.indexOf(x);c[R]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function C(x){a.remove(x)}function L(){a.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:b,acquireProgram:S,releaseProgram:A,releaseShaderCache:C,programs:c,dispose:L}}function Cv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Rv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function $c(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Yc(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,v,g,p){let y=n[e];return y===void 0?(y={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:p},n[e]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=m,y.materialVariant=o(d),y.groupOrder=v,y.renderOrder=d.renderOrder,y.z=g,y.group=p),e++,y}function l(d,f,m,v,g,p){const y=a(d,f,m,v,g,p);m.transmission>0?i.push(y):m.transparent===!0?r.push(y):t.push(y)}function c(d,f,m,v,g,p){const y=a(d,f,m,v,g,p);m.transmission>0?i.unshift(y):m.transparent===!0?r.unshift(y):t.unshift(y)}function u(d,f,m){t.length>1&&t.sort(d||Rv),i.length>1&&i.sort(f||$c),r.length>1&&r.sort(f||$c),m&&(t.reverse(),i.reverse(),r.reverse())}function h(){for(let d=e,f=n.length;d<f;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function Pv(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Yc,n.set(i,[o])):r>=s.length?(o=new Yc,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Lv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Qe};break;case"SpotLight":t={position:new k,direction:new k,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function Iv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Dv=0;function Nv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Uv(n){const e=new Lv,t=Iv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new Ct,o=new Ct;function a(c){let u=0,h=0,d=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,y=0,b=0,S=0,A=0,C=0,L=0;c.sort(Nv);for(let R=0,O=c.length;R<O;R++){const N=c[R],H=N.color,Q=N.intensity,te=N.distance;let z=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Hi?z=N.shadow.map.texture:z=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=H.r*Q,h+=H.g*Q,d+=H.b*Q;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(N.sh.coefficients[Y],Q);L++}else if(N.isDirectionalLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const W=N.shadow,ne=t.get(N);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,i.directionalShadow[f]=ne,i.directionalShadowMap[f]=z,i.directionalShadowMatrix[f]=N.shadow.matrix,y++}i.directional[f]=Y,f++}else if(N.isSpotLight){const Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(H).multiplyScalar(Q),Y.distance=te,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,i.spot[v]=Y;const W=N.shadow;if(N.map&&(i.spotLightMap[A]=N.map,A++,W.updateMatrices(N),N.castShadow&&C++),i.spotLightMatrix[v]=W.matrix,N.castShadow){const ne=t.get(N);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,i.spotShadow[v]=ne,i.spotShadowMap[v]=z,S++}v++}else if(N.isRectAreaLight){const Y=e.get(N);Y.color.copy(H).multiplyScalar(Q),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=Y,g++}else if(N.isPointLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const W=N.shadow,ne=t.get(N);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,ne.shadowCameraNear=W.camera.near,ne.shadowCameraFar=W.camera.far,i.pointShadow[m]=ne,i.pointShadowMap[m]=z,i.pointShadowMatrix[m]=N.shadow.matrix,b++}i.point[m]=Y,m++}else if(N.isHemisphereLight){const Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(Q),Y.groundColor.copy(N.groundColor).multiplyScalar(Q),i.hemi[p]=Y,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const x=i.hash;(x.directionalLength!==f||x.pointLength!==m||x.spotLength!==v||x.rectAreaLength!==g||x.hemiLength!==p||x.numDirectionalShadows!==y||x.numPointShadows!==b||x.numSpotShadows!==S||x.numSpotMaps!==A||x.numLightProbes!==L)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=S+A-C,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=L,x.directionalLength=f,x.pointLength=m,x.spotLength=v,x.rectAreaLength=g,x.hemiLength=p,x.numDirectionalShadows=y,x.numPointShadows=b,x.numSpotShadows=S,x.numSpotMaps=A,x.numLightProbes=L,i.version=Dv++)}function l(c,u){let h=0,d=0,f=0,m=0,v=0;const g=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const b=c[p];if(b.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),h++}else if(b.isSpotLight){const S=i.spot[f];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),f++}else if(b.isRectAreaLight){const S=i.rectArea[m];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),o.identity(),s.copy(b.matrixWorld),s.premultiply(g),o.extractRotation(s),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),m++}else if(b.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function Kc(n){const e=new Uv(n),t=[],i=[],r=[];function s(d){h.camera=d,t.length=0,i.length=0,r.length=0}function o(d){t.push(d)}function a(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Fv(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Kc(n),e.set(r,[a])):s>=o.length?(a=new Kc(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const Ov=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bv=`uniform sampler2D shadow_pass;
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
}`,kv=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],zv=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Zc=new Ct,Ir=new k,qo=new k;function Hv(n,e,t){let i=new ml;const r=new Ce,s=new Ce,o=new At,a=new Qp,l=new jp,c={},u=t.maxTextureSize,h={[Si]:fn,[fn]:Si,[kn]:kn},d=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:Ov,fragmentShader:Bv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new $n;m.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new En(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Is;let p=this.type;this.render=function(C,L,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;this.type===cf&&(ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Is);const R=n.getRenderTarget(),O=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),H=n.state;H.setBlending(oi),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const Q=p!==this.type;Q&&L.traverse(function(te){te.material&&(Array.isArray(te.material)?te.material.forEach(z=>z.needsUpdate=!0):te.material.needsUpdate=!0)});for(let te=0,z=C.length;te<z;te++){const Y=C[te],W=Y.shadow;if(W===void 0){ke("WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const ne=W.getFrameExtents();r.multiply(ne),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,W.mapSize.y=s.y));const re=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=re,W.map===null||Q===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Nr){if(Y.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Gn(r.x,r.y,{format:Hi,type:li,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),W.map.texture.name=Y.name+".shadowMap",W.map.depthTexture=new fr(r.x,r.y,zn),W.map.depthTexture.name=Y.name+".shadowMapDepth",W.map.depthTexture.format=ci,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=qt,W.map.depthTexture.magFilter=qt}else Y.isPointLight?(W.map=new rd(r.x),W.map.depthTexture=new pp(r.x,Xn)):(W.map=new Gn(r.x,r.y),W.map.depthTexture=new fr(r.x,r.y,Xn)),W.map.depthTexture.name=Y.name+".shadowMap",W.map.depthTexture.format=ci,this.type===Is?(W.map.depthTexture.compareFunction=re?dl:ul,W.map.depthTexture.minFilter=Qt,W.map.depthTexture.magFilter=Qt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=qt,W.map.depthTexture.magFilter=qt);W.camera.updateProjectionMatrix()}const ge=W.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<ge;_e++){if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,_e),n.clear();else{_e===0&&(n.setRenderTarget(W.map),n.clear());const be=W.getViewport(_e);o.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),H.viewport(o)}if(Y.isPointLight){const be=W.camera,nt=W.matrix,st=Y.distance||be.far;st!==be.far&&(be.far=st,be.updateProjectionMatrix()),Ir.setFromMatrixPosition(Y.matrixWorld),be.position.copy(Ir),qo.copy(be.position),qo.add(kv[_e]),be.up.copy(zv[_e]),be.lookAt(qo),be.updateMatrixWorld(),nt.makeTranslation(-Ir.x,-Ir.y,-Ir.z),Zc.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Zc,be.coordinateSystem,be.reversedDepth)}else W.updateMatrices(Y);i=W.getFrustum(),S(L,x,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===Nr&&y(W,x),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(R,O,N)};function y(C,L){const x=e.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Gn(r.x,r.y,{format:Hi,type:li})),d.uniforms.shadow_pass.value=C.map.depthTexture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(L,null,x,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(L,null,x,f,v,null)}function b(C,L,x,R){let O=null;const N=x.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)O=N;else if(O=x.isPointLight===!0?l:a,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const H=O.uuid,Q=L.uuid;let te=c[H];te===void 0&&(te={},c[H]=te);let z=te[Q];z===void 0&&(z=O.clone(),te[Q]=z,L.addEventListener("dispose",A)),O=z}if(O.visible=L.visible,O.wireframe=L.wireframe,R===Nr?O.side=L.shadowSide!==null?L.shadowSide:L.side:O.side=L.shadowSide!==null?L.shadowSide:h[L.side],O.alphaMap=L.alphaMap,O.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,O.map=L.map,O.clipShadows=L.clipShadows,O.clippingPlanes=L.clippingPlanes,O.clipIntersection=L.clipIntersection,O.displacementMap=L.displacementMap,O.displacementScale=L.displacementScale,O.displacementBias=L.displacementBias,O.wireframeLinewidth=L.wireframeLinewidth,O.linewidth=L.linewidth,x.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const H=n.properties.get(O);H.light=x}return O}function S(C,L,x,R,O){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&O===Nr)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,C.matrixWorld);const Q=e.update(C),te=C.material;if(Array.isArray(te)){const z=Q.groups;for(let Y=0,W=z.length;Y<W;Y++){const ne=z[Y],re=te[ne.materialIndex];if(re&&re.visible){const ge=b(C,re,R,O);C.onBeforeShadow(n,C,L,x,Q,ge,ne),n.renderBufferDirect(x,null,Q,ge,C,ne),C.onAfterShadow(n,C,L,x,Q,ge,ne)}}}else if(te.visible){const z=b(C,te,R,O);C.onBeforeShadow(n,C,L,x,Q,z,null),n.renderBufferDirect(x,null,Q,z,C,null),C.onAfterShadow(n,C,L,x,Q,z,null)}}const H=C.children;for(let Q=0,te=H.length;Q<te;Q++)S(H[Q],L,x,R,O)}function A(C){C.target.removeEventListener("dispose",A);for(const x in c){const R=c[x],O=C.target.uuid;O in R&&(R[O].dispose(),delete R[O])}}}function Vv(n,e){function t(){let D=!1;const de=new At;let J=null;const me=new At(0,0,0,0);return{setMask:function(ve){J!==ve&&!D&&(n.colorMask(ve,ve,ve,ve),J=ve)},setLocked:function(ve){D=ve},setClear:function(ve,ee,ie,Ee,pt){pt===!0&&(ve*=Ee,ee*=Ee,ie*=Ee),de.set(ve,ee,ie,Ee),me.equals(de)===!1&&(n.clearColor(ve,ee,ie,Ee),me.copy(de))},reset:function(){D=!1,J=null,me.set(-1,0,0,0)}}}function i(){let D=!1,de=!1,J=null,me=null,ve=null;return{setReversed:function(ee){if(de!==ee){const ie=e.get("EXT_clip_control");ee?ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.ZERO_TO_ONE_EXT):ie.clipControlEXT(ie.LOWER_LEFT_EXT,ie.NEGATIVE_ONE_TO_ONE_EXT),de=ee;const Ee=ve;ve=null,this.setClear(Ee)}},getReversed:function(){return de},setTest:function(ee){ee?se(n.DEPTH_TEST):Fe(n.DEPTH_TEST)},setMask:function(ee){J!==ee&&!D&&(n.depthMask(ee),J=ee)},setFunc:function(ee){if(de&&(ee=Vf[ee]),me!==ee){switch(ee){case oa:n.depthFunc(n.NEVER);break;case aa:n.depthFunc(n.ALWAYS);break;case la:n.depthFunc(n.LESS);break;case dr:n.depthFunc(n.LEQUAL);break;case ca:n.depthFunc(n.EQUAL);break;case ua:n.depthFunc(n.GEQUAL);break;case da:n.depthFunc(n.GREATER);break;case ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=ee}},setLocked:function(ee){D=ee},setClear:function(ee){ve!==ee&&(ve=ee,de&&(ee=1-ee),n.clearDepth(ee))},reset:function(){D=!1,J=null,me=null,ve=null,de=!1}}}function r(){let D=!1,de=null,J=null,me=null,ve=null,ee=null,ie=null,Ee=null,pt=null;return{setTest:function(lt){D||(lt?se(n.STENCIL_TEST):Fe(n.STENCIL_TEST))},setMask:function(lt){de!==lt&&!D&&(n.stencilMask(lt),de=lt)},setFunc:function(lt,ln,cn){(J!==lt||me!==ln||ve!==cn)&&(n.stencilFunc(lt,ln,cn),J=lt,me=ln,ve=cn)},setOp:function(lt,ln,cn){(ee!==lt||ie!==ln||Ee!==cn)&&(n.stencilOp(lt,ln,cn),ee=lt,ie=ln,Ee=cn)},setLocked:function(lt){D=lt},setClear:function(lt){pt!==lt&&(n.clearStencil(lt),pt=lt)},reset:function(){D=!1,de=null,J=null,me=null,ve=null,ee=null,ie=null,Ee=null,pt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,b=null,S=null,A=null,C=null,L=null,x=new Qe(0,0,0),R=0,O=!1,N=null,H=null,Q=null,te=null,z=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),W=ne>=1):re.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),W=ne>=2);let ge=null,_e={};const be=n.getParameter(n.SCISSOR_BOX),nt=n.getParameter(n.VIEWPORT),st=new At().fromArray(be),Ge=new At().fromArray(nt);function j(D,de,J,me){const ve=new Uint8Array(4),ee=n.createTexture();n.bindTexture(D,ee),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ie=0;ie<J;ie++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,ve):n.texImage2D(de+ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ve);return ee}const ce={};ce[n.TEXTURE_2D]=j(n.TEXTURE_2D,n.TEXTURE_2D,1),ce[n.TEXTURE_CUBE_MAP]=j(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[n.TEXTURE_2D_ARRAY]=j(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ce[n.TEXTURE_3D]=j(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(n.DEPTH_TEST),o.setFunc(dr),ot(!1),yt(Vl),se(n.CULL_FACE),Ze(oi);function se(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function Fe(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function ze(D,de){return d[D]!==de?(n.bindFramebuffer(D,de),d[D]=de,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=de),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=de),!0):!1}function De(D,de){let J=m,me=!1;if(D){J=f.get(de),J===void 0&&(J=[],f.set(de,J));const ve=D.textures;if(J.length!==ve.length||J[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,ie=ve.length;ee<ie;ee++)J[ee]=n.COLOR_ATTACHMENT0+ee;J.length=ve.length,me=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,me=!0);me&&n.drawBuffers(J)}function Mt(D){return v!==D?(n.useProgram(D),v=D,!0):!1}const Ye={[Fi]:n.FUNC_ADD,[df]:n.FUNC_SUBTRACT,[hf]:n.FUNC_REVERSE_SUBTRACT};Ye[ff]=n.MIN,Ye[pf]=n.MAX;const it={[mf]:n.ZERO,[gf]:n.ONE,[_f]:n.SRC_COLOR,[ra]:n.SRC_ALPHA,[Ef]:n.SRC_ALPHA_SATURATE,[Sf]:n.DST_COLOR,[xf]:n.DST_ALPHA,[vf]:n.ONE_MINUS_SRC_COLOR,[sa]:n.ONE_MINUS_SRC_ALPHA,[yf]:n.ONE_MINUS_DST_COLOR,[Mf]:n.ONE_MINUS_DST_ALPHA,[bf]:n.CONSTANT_COLOR,[Tf]:n.ONE_MINUS_CONSTANT_COLOR,[Af]:n.CONSTANT_ALPHA,[wf]:n.ONE_MINUS_CONSTANT_ALPHA};function Ze(D,de,J,me,ve,ee,ie,Ee,pt,lt){if(D===oi){g===!0&&(Fe(n.BLEND),g=!1);return}if(g===!1&&(se(n.BLEND),g=!0),D!==uf){if(D!==p||lt!==O){if((y!==Fi||A!==Fi)&&(n.blendEquation(n.FUNC_ADD),y=Fi,A=Fi),lt)switch(D){case ar:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gl:n.blendFunc(n.ONE,n.ONE);break;case Wl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Xl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:at("WebGLState: Invalid blending: ",D);break}else switch(D){case ar:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Wl:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xl:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",D);break}b=null,S=null,C=null,L=null,x.set(0,0,0),R=0,p=D,O=lt}return}ve=ve||de,ee=ee||J,ie=ie||me,(de!==y||ve!==A)&&(n.blendEquationSeparate(Ye[de],Ye[ve]),y=de,A=ve),(J!==b||me!==S||ee!==C||ie!==L)&&(n.blendFuncSeparate(it[J],it[me],it[ee],it[ie]),b=J,S=me,C=ee,L=ie),(Ee.equals(x)===!1||pt!==R)&&(n.blendColor(Ee.r,Ee.g,Ee.b,pt),x.copy(Ee),R=pt),p=D,O=!1}function Ke(D,de){D.side===kn?Fe(n.CULL_FACE):se(n.CULL_FACE);let J=D.side===fn;de&&(J=!J),ot(J),D.blending===ar&&D.transparent===!1?Ze(oi):Ze(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const me=D.stencilWrite;a.setTest(me),me&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Lt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):Fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function ot(D){N!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),N=D)}function yt(D){D!==af?(se(n.CULL_FACE),D!==H&&(D===Vl?n.cullFace(n.BACK):D===lf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Fe(n.CULL_FACE),H=D}function Rt(D){D!==Q&&(W&&n.lineWidth(D),Q=D)}function Lt(D,de,J){D?(se(n.POLYGON_OFFSET_FILL),(te!==de||z!==J)&&(te=de,z=J,o.getReversed()&&(de=-de),n.polygonOffset(de,J))):Fe(n.POLYGON_OFFSET_FILL)}function mt(D){D?se(n.SCISSOR_TEST):Fe(n.SCISSOR_TEST)}function Et(D){D===void 0&&(D=n.TEXTURE0+Y-1),ge!==D&&(n.activeTexture(D),ge=D)}function U(D,de,J){J===void 0&&(ge===null?J=n.TEXTURE0+Y-1:J=ge);let me=_e[J];me===void 0&&(me={type:void 0,texture:void 0},_e[J]=me),(me.type!==D||me.texture!==de)&&(ge!==J&&(n.activeTexture(J),ge=J),n.bindTexture(D,de||ce[D]),me.type=D,me.texture=de)}function Ot(){const D=_e[ge];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Oe(){try{n.compressedTexImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function _(){try{n.texSubImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function B(){try{n.texSubImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function X(){try{n.compressedTexSubImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function oe(){try{n.texStorage2D(...arguments)}catch(D){at("WebGLState:",D)}}function ue(){try{n.texStorage3D(...arguments)}catch(D){at("WebGLState:",D)}}function q(){try{n.texImage2D(...arguments)}catch(D){at("WebGLState:",D)}}function Z(){try{n.texImage3D(...arguments)}catch(D){at("WebGLState:",D)}}function ae(D){return h[D]!==void 0?h[D]:n.getParameter(D)}function Ae(D,de){h[D]!==de&&(n.pixelStorei(D,de),h[D]=de)}function fe(D){st.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),st.copy(D))}function pe(D){Ge.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Ge.copy(D))}function Le(D,de){let J=c.get(de);J===void 0&&(J=new WeakMap,c.set(de,J));let me=J.get(D);me===void 0&&(me=n.getUniformBlockIndex(de,D.name),J.set(D,me))}function Ue(D,de){const me=c.get(de).get(D);l.get(de)!==me&&(n.uniformBlockBinding(de,me,D.__bindingPointIndex),l.set(de,me))}function He(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},ge=null,_e={},d={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,b=null,S=null,A=null,C=null,L=null,x=new Qe(0,0,0),R=0,O=!1,N=null,H=null,Q=null,te=null,z=null,st.set(0,0,n.canvas.width,n.canvas.height),Ge.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Fe,bindFramebuffer:ze,drawBuffers:De,useProgram:Mt,setBlending:Ze,setMaterial:Ke,setFlipSided:ot,setCullFace:yt,setLineWidth:Rt,setPolygonOffset:Lt,setScissorTest:mt,activeTexture:Et,bindTexture:U,unbindTexture:Ot,compressedTexImage2D:Oe,compressedTexImage3D:w,texImage2D:q,texImage3D:Z,pixelStorei:Ae,getParameter:ae,updateUBOMapping:Le,uniformBlockBinding:Ue,texStorage2D:oe,texStorage3D:ue,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:X,scissor:fe,viewport:pe,reset:He}}function Gv(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,_){return m?new OffscreenCanvas(w,_):Xs("canvas")}function g(w,_,B){let V=1;const X=Oe(w);if((X.width>B||X.height>B)&&(V=B/Math.max(X.width,X.height)),V<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const oe=Math.floor(V*X.width),ue=Math.floor(V*X.height);d===void 0&&(d=v(oe,ue));const q=_?v(oe,ue):d;return q.width=oe,q.height=ue,q.getContext("2d").drawImage(w,0,0,oe,ue),ke("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+oe+"x"+ue+")."),q}else return"data"in w&&ke("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),w;return w}function p(w){return w.generateMipmaps}function y(w){n.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,_,B,V,X,oe=!1){if(w!==null){if(n[w]!==void 0)return n[w];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ue;V&&(ue=e.get("EXT_texture_norm16"),ue||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=_;if(_===n.RED&&(B===n.FLOAT&&(q=n.R32F),B===n.HALF_FLOAT&&(q=n.R16F),B===n.UNSIGNED_BYTE&&(q=n.R8),B===n.UNSIGNED_SHORT&&ue&&(q=ue.R16_EXT),B===n.SHORT&&ue&&(q=ue.R16_SNORM_EXT)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.R8UI),B===n.UNSIGNED_SHORT&&(q=n.R16UI),B===n.UNSIGNED_INT&&(q=n.R32UI),B===n.BYTE&&(q=n.R8I),B===n.SHORT&&(q=n.R16I),B===n.INT&&(q=n.R32I)),_===n.RG&&(B===n.FLOAT&&(q=n.RG32F),B===n.HALF_FLOAT&&(q=n.RG16F),B===n.UNSIGNED_BYTE&&(q=n.RG8),B===n.UNSIGNED_SHORT&&ue&&(q=ue.RG16_EXT),B===n.SHORT&&ue&&(q=ue.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RG8UI),B===n.UNSIGNED_SHORT&&(q=n.RG16UI),B===n.UNSIGNED_INT&&(q=n.RG32UI),B===n.BYTE&&(q=n.RG8I),B===n.SHORT&&(q=n.RG16I),B===n.INT&&(q=n.RG32I)),_===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGB8UI),B===n.UNSIGNED_SHORT&&(q=n.RGB16UI),B===n.UNSIGNED_INT&&(q=n.RGB32UI),B===n.BYTE&&(q=n.RGB8I),B===n.SHORT&&(q=n.RGB16I),B===n.INT&&(q=n.RGB32I)),_===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),B===n.UNSIGNED_INT&&(q=n.RGBA32UI),B===n.BYTE&&(q=n.RGBA8I),B===n.SHORT&&(q=n.RGBA16I),B===n.INT&&(q=n.RGBA32I)),_===n.RGB&&(B===n.UNSIGNED_SHORT&&ue&&(q=ue.RGB16_EXT),B===n.SHORT&&ue&&(q=ue.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),_===n.RGBA){const Z=oe?Ws:tt.getTransfer(X);B===n.FLOAT&&(q=n.RGBA32F),B===n.HALF_FLOAT&&(q=n.RGBA16F),B===n.UNSIGNED_BYTE&&(q=Z===ft?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ue&&(q=ue.RGBA16_EXT),B===n.SHORT&&ue&&(q=ue.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function A(w,_){let B;return w?_===null||_===Xn||_===qr?B=n.DEPTH24_STENCIL8:_===zn?B=n.DEPTH32F_STENCIL8:_===Xr&&(B=n.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Xn||_===qr?B=n.DEPTH_COMPONENT24:_===zn?B=n.DEPTH_COMPONENT32F:_===Xr&&(B=n.DEPTH_COMPONENT16),B}function C(w,_){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==qt&&w.minFilter!==Qt?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function L(w){const _=w.target;_.removeEventListener("dispose",L),R(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function x(w){const _=w.target;_.removeEventListener("dispose",x),N(_)}function R(w){const _=i.get(w);if(_.__webglInit===void 0)return;const B=w.source,V=f.get(B);if(V){const X=V[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&O(w),Object.keys(V).length===0&&f.delete(B)}i.remove(w)}function O(w){const _=i.get(w);n.deleteTexture(_.__webglTexture);const B=w.source,V=f.get(B);delete V[_.__cacheKey],o.memory.textures--}function N(w){const _=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let X=0;X<_.__webglFramebuffer[V].length;X++)n.deleteFramebuffer(_.__webglFramebuffer[V][X]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=w.textures;for(let V=0,X=B.length;V<X;V++){const oe=i.get(B[V]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),o.memory.textures--),i.remove(B[V])}i.remove(w)}let H=0;function Q(){H=0}function te(){return H}function z(w){H=w}function Y(){const w=H;return w>=r.maxTextures&&ke("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),H+=1,w}function W(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function ne(w,_){const B=i.get(w);if(w.isVideoTexture&&U(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const V=w.image;if(V===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(B,w,_);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function re(w,_){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Fe(B,w,_);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function ge(w,_){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){Fe(B,w,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function _e(w,_){const B=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&B.__version!==w.version){ze(B,w,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}const be={[fa]:n.REPEAT,[si]:n.CLAMP_TO_EDGE,[pa]:n.MIRRORED_REPEAT},nt={[qt]:n.NEAREST,[Pf]:n.NEAREST_MIPMAP_NEAREST,[rs]:n.NEAREST_MIPMAP_LINEAR,[Qt]:n.LINEAR,[ho]:n.LINEAR_MIPMAP_NEAREST,[Bi]:n.LINEAR_MIPMAP_LINEAR},st={[Df]:n.NEVER,[Bf]:n.ALWAYS,[Nf]:n.LESS,[ul]:n.LEQUAL,[Uf]:n.EQUAL,[dl]:n.GEQUAL,[Ff]:n.GREATER,[Of]:n.NOTEQUAL};function Ge(w,_){if(_.type===zn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Qt||_.magFilter===ho||_.magFilter===rs||_.magFilter===Bi||_.minFilter===Qt||_.minFilter===ho||_.minFilter===rs||_.minFilter===Bi)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,be[_.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,be[_.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,be[_.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,nt[_.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,nt[_.minFilter]),_.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,st[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===qt||_.minFilter!==rs&&_.minFilter!==Bi||_.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function j(w,_){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",L));const V=_.source;let X=f.get(V);X===void 0&&(X={},f.set(V,X));const oe=W(_);if(oe!==w.__cacheKey){X[oe]===void 0&&(X[oe]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),X[oe].usedTimes++;const ue=X[w.__cacheKey];ue!==void 0&&(X[w.__cacheKey].usedTimes--,ue.usedTimes===0&&O(_)),w.__cacheKey=oe,w.__webglTexture=X[oe].texture}return B}function ce(w,_,B){return Math.floor(Math.floor(w/B)/_)}function se(w,_,B,V){const oe=w.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,B,V,_.data);else{oe.sort((Ae,fe)=>Ae.start-fe.start);let ue=0;for(let Ae=1;Ae<oe.length;Ae++){const fe=oe[ue],pe=oe[Ae],Le=fe.start+fe.count,Ue=ce(pe.start,_.width,4),He=ce(fe.start,_.width,4);pe.start<=Le+1&&Ue===He&&ce(pe.start+pe.count-1,_.width,4)===Ue?fe.count=Math.max(fe.count,pe.start+pe.count-fe.start):(++ue,oe[ue]=pe)}oe.length=ue+1;const q=t.getParameter(n.UNPACK_ROW_LENGTH),Z=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Ae=0,fe=oe.length;Ae<fe;Ae++){const pe=oe[Ae],Le=Math.floor(pe.start/4),Ue=Math.ceil(pe.count/4),He=Le%_.width,D=Math.floor(Le/_.width),de=Ue,J=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,He),t.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,He,D,de,J,B,V,_.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function Fe(w,_,B){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const X=j(w,_),oe=_.source;t.bindTexture(V,w.__webglTexture,n.TEXTURE0+B);const ue=i.get(oe);if(oe.version!==ue.__version||X===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const J=tt.getPrimaries(tt.workingColorSpace),me=_.colorSpace===vi?null:tt.getPrimaries(_.colorSpace),ve=_.colorSpace===vi||J===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=g(_.image,!1,r.maxTextureSize);Z=Ot(_,Z);const ae=s.convert(_.format,_.colorSpace),Ae=s.convert(_.type);let fe=S(_.internalFormat,ae,Ae,_.normalized,_.colorSpace,_.isVideoTexture);Ge(V,_);let pe;const Le=_.mipmaps,Ue=_.isVideoTexture!==!0,He=ue.__version===void 0||X===!0,D=oe.dataReady,de=C(_,Z);if(_.isDepthTexture)fe=A(_.format===ki,_.type),He&&(Ue?t.texStorage2D(n.TEXTURE_2D,1,fe,Z.width,Z.height):t.texImage2D(n.TEXTURE_2D,0,fe,Z.width,Z.height,0,ae,Ae,null));else if(_.isDataTexture)if(Le.length>0){Ue&&He&&t.texStorage2D(n.TEXTURE_2D,de,fe,Le[0].width,Le[0].height);for(let J=0,me=Le.length;J<me;J++)pe=Le[J],Ue?D&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,pe.width,pe.height,ae,Ae,pe.data):t.texImage2D(n.TEXTURE_2D,J,fe,pe.width,pe.height,0,ae,Ae,pe.data);_.generateMipmaps=!1}else Ue?(He&&t.texStorage2D(n.TEXTURE_2D,de,fe,Z.width,Z.height),D&&se(_,Z,ae,Ae)):t.texImage2D(n.TEXTURE_2D,0,fe,Z.width,Z.height,0,ae,Ae,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ue&&He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,fe,Le[0].width,Le[0].height,Z.depth);for(let J=0,me=Le.length;J<me;J++)if(pe=Le[J],_.format!==In)if(ae!==null)if(Ue){if(D)if(_.layerUpdates.size>0){const ve=wc(pe.width,pe.height,_.format,_.type);for(const ee of _.layerUpdates){const ie=pe.data.subarray(ee*ve/pe.data.BYTES_PER_ELEMENT,(ee+1)*ve/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,ee,pe.width,pe.height,1,ae,ie)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,pe.width,pe.height,Z.depth,ae,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,fe,pe.width,pe.height,Z.depth,0,pe.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,pe.width,pe.height,Z.depth,ae,Ae,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,fe,pe.width,pe.height,Z.depth,0,ae,Ae,pe.data)}else{Ue&&He&&t.texStorage2D(n.TEXTURE_2D,de,fe,Le[0].width,Le[0].height);for(let J=0,me=Le.length;J<me;J++)pe=Le[J],_.format!==In?ae!==null?Ue?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,pe.width,pe.height,ae,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,J,fe,pe.width,pe.height,0,pe.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?D&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,pe.width,pe.height,ae,Ae,pe.data):t.texImage2D(n.TEXTURE_2D,J,fe,pe.width,pe.height,0,ae,Ae,pe.data)}else if(_.isDataArrayTexture)if(Ue){if(He&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,fe,Z.width,Z.height,Z.depth),D)if(_.layerUpdates.size>0){const J=wc(Z.width,Z.height,_.format,_.type);for(const me of _.layerUpdates){const ve=Z.data.subarray(me*J/Z.data.BYTES_PER_ELEMENT,(me+1)*J/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,Z.width,Z.height,1,ae,Ae,ve)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ae,Ae,Z.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,fe,Z.width,Z.height,Z.depth,0,ae,Ae,Z.data);else if(_.isData3DTexture)Ue?(He&&t.texStorage3D(n.TEXTURE_3D,de,fe,Z.width,Z.height,Z.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ae,Ae,Z.data)):t.texImage3D(n.TEXTURE_3D,0,fe,Z.width,Z.height,Z.depth,0,ae,Ae,Z.data);else if(_.isFramebufferTexture){if(He)if(Ue)t.texStorage2D(n.TEXTURE_2D,de,fe,Z.width,Z.height);else{let J=Z.width,me=Z.height;for(let ve=0;ve<de;ve++)t.texImage2D(n.TEXTURE_2D,ve,fe,J,me,0,ae,Ae,null),J>>=1,me>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const J=n.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Z.parentNode!==J){J.appendChild(Z),h.add(_),J.onpaint=me=>{const ve=me.changedElements;for(const ee of h)ve.includes(ee.image)&&(ee.needsUpdate=!0)},J.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{const ve=n.RGBA,ee=n.RGBA,ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ve,ee,ie,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ue&&He){const J=Oe(Le[0]);t.texStorage2D(n.TEXTURE_2D,de,fe,J.width,J.height)}for(let J=0,me=Le.length;J<me;J++)pe=Le[J],Ue?D&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ae,Ae,pe):t.texImage2D(n.TEXTURE_2D,J,fe,ae,Ae,pe);_.generateMipmaps=!1}else if(Ue){if(He){const J=Oe(Z);t.texStorage2D(n.TEXTURE_2D,de,fe,J.width,J.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,Ae,Z)}else t.texImage2D(n.TEXTURE_2D,0,fe,ae,Ae,Z);p(_)&&y(V),ue.__version=oe.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ze(w,_,B){if(_.image.length!==6)return;const V=j(w,_),X=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+B);const oe=i.get(X);if(X.version!==oe.__version||V===!0){t.activeTexture(n.TEXTURE0+B);const ue=tt.getPrimaries(tt.workingColorSpace),q=_.colorSpace===vi?null:tt.getPrimaries(_.colorSpace),Z=_.colorSpace===vi||ue===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const ae=_.isCompressedTexture||_.image[0].isCompressedTexture,Ae=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let ee=0;ee<6;ee++)!ae&&!Ae?fe[ee]=g(_.image[ee],!0,r.maxCubemapSize):fe[ee]=Ae?_.image[ee].image:_.image[ee],fe[ee]=Ot(_,fe[ee]);const pe=fe[0],Le=s.convert(_.format,_.colorSpace),Ue=s.convert(_.type),He=S(_.internalFormat,Le,Ue,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,de=oe.__version===void 0||V===!0,J=X.dataReady;let me=C(_,pe);Ge(n.TEXTURE_CUBE_MAP,_);let ve;if(ae){D&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,He,pe.width,pe.height);for(let ee=0;ee<6;ee++){ve=fe[ee].mipmaps;for(let ie=0;ie<ve.length;ie++){const Ee=ve[ie];_.format!==In?Le!==null?D?J&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,0,0,Ee.width,Ee.height,Le,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,He,Ee.width,Ee.height,0,Ee.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,0,0,Ee.width,Ee.height,Le,Ue,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie,He,Ee.width,Ee.height,0,Le,Ue,Ee.data)}}}else{if(ve=_.mipmaps,D&&de){ve.length>0&&me++;const ee=Oe(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,He,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(Ae){D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,fe[ee].width,fe[ee].height,Le,Ue,fe[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,He,fe[ee].width,fe[ee].height,0,Le,Ue,fe[ee].data);for(let ie=0;ie<ve.length;ie++){const pt=ve[ie].image[ee].image;D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,0,0,pt.width,pt.height,Le,Ue,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,He,pt.width,pt.height,0,Le,Ue,pt.data)}}else{D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Le,Ue,fe[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,He,Le,Ue,fe[ee]);for(let ie=0;ie<ve.length;ie++){const Ee=ve[ie];D?J&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,0,0,Le,Ue,Ee.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie+1,He,Le,Ue,Ee.image[ee])}}}p(_)&&y(n.TEXTURE_CUBE_MAP),oe.__version=X.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function De(w,_,B,V,X,oe){const ue=s.convert(B.format,B.colorSpace),q=s.convert(B.type),Z=S(B.internalFormat,ue,q,B.normalized,B.colorSpace),ae=i.get(_),Ae=i.get(B);if(Ae.__renderTarget=_,!ae.__hasExternalTextures){const fe=Math.max(1,_.width>>oe),pe=Math.max(1,_.height>>oe);X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?t.texImage3D(X,oe,Z,fe,pe,_.depth,0,ue,q,null):t.texImage2D(X,oe,Z,fe,pe,0,ue,q,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),Et(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,X,Ae.__webglTexture,0,mt(_)):(X===n.TEXTURE_2D||X>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,X,Ae.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Mt(w,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,w),_.depthBuffer){const V=_.depthTexture,X=V&&V.isDepthTexture?V.type:null,oe=A(_.stencilBuffer,X),ue=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Et(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(_),oe,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(_),oe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,oe,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,w)}else{const V=_.textures;for(let X=0;X<V.length;X++){const oe=V[X],ue=s.convert(oe.format,oe.colorSpace),q=s.convert(oe.type),Z=S(oe.internalFormat,ue,q,oe.normalized,oe.colorSpace);Et(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(_),Z,_.width,_.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ye(w,_,B){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const X=i.get(_.depthTexture);if(X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(X.__webglInit===void 0&&(X.__webglInit=!0,_.depthTexture.addEventListener("dispose",L)),X.__webglTexture===void 0){X.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),Ge(n.TEXTURE_CUBE_MAP,_.depthTexture);const ae=s.convert(_.depthTexture.format),Ae=s.convert(_.depthTexture.type);let fe;_.depthTexture.format===ci?fe=n.DEPTH_COMPONENT24:_.depthTexture.format===ki&&(fe=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,fe,_.width,_.height,0,ae,Ae,null)}}else ne(_.depthTexture,0);const oe=X.__webglTexture,ue=mt(_),q=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,Z=_.depthTexture.format===ki?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===ci)Et(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,q,oe,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,Z,q,oe,0);else if(_.depthTexture.format===ki)Et(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,q,oe,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,Z,q,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(w){const _=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const V=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",X)};V.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=V}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)Ye(_.__webglFramebuffer[V],w,V);else{const V=w.texture.mipmaps;V&&V.length>0?Ye(_.__webglFramebuffer[0],w,0):Ye(_.__webglFramebuffer,w,0)}else if(B){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=n.createRenderbuffer(),Mt(_.__webglDepthbuffer[V],w,!1);else{const X=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}else{const V=w.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Mt(_.__webglDepthbuffer,w,!1);else{const X=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,oe)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ze(w,_,B){const V=i.get(w);_!==void 0&&De(V.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&it(w)}function Ke(w){const _=w.texture,B=i.get(w),V=i.get(_);w.addEventListener("dispose",x);const X=w.textures,oe=w.isWebGLCubeRenderTarget===!0,ue=X.length>1;if(ue||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,o.memory.textures++),oe){B.__webglFramebuffer=[];for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[q]=[];for(let Z=0;Z<_.mipmaps.length;Z++)B.__webglFramebuffer[q][Z]=n.createFramebuffer()}else B.__webglFramebuffer[q]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let q=0;q<_.mipmaps.length;q++)B.__webglFramebuffer[q]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ue)for(let q=0,Z=X.length;q<Z;q++){const ae=i.get(X[q]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&Et(w)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let q=0;q<X.length;q++){const Z=X[q];B.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[q]);const ae=s.convert(Z.format,Z.colorSpace),Ae=s.convert(Z.type),fe=S(Z.internalFormat,ae,Ae,Z.normalized,Z.colorSpace,w.isXRRenderTarget===!0),pe=mt(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,fe,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,B.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Mt(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Ge(n.TEXTURE_CUBE_MAP,_);for(let q=0;q<6;q++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)De(B.__webglFramebuffer[q][Z],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,Z);else De(B.__webglFramebuffer[q],w,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);p(_)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let q=0,Z=X.length;q<Z;q++){const ae=X[q],Ae=i.get(ae);let fe=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(fe=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,Ae.__webglTexture),Ge(fe,ae),De(B.__webglFramebuffer,w,ae,n.COLOR_ATTACHMENT0+q,fe,0),p(ae)&&y(fe)}t.unbindTexture()}else{let q=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(q=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(q,V.__webglTexture),Ge(q,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)De(B.__webglFramebuffer[Z],w,_,n.COLOR_ATTACHMENT0,q,Z);else De(B.__webglFramebuffer,w,_,n.COLOR_ATTACHMENT0,q,0);p(_)&&y(q),t.unbindTexture()}w.depthBuffer&&it(w)}function ot(w){const _=w.textures;for(let B=0,V=_.length;B<V;B++){const X=_[B];if(p(X)){const oe=b(w),ue=i.get(X).__webglTexture;t.bindTexture(oe,ue),y(oe),t.unbindTexture()}}}const yt=[],Rt=[];function Lt(w){if(w.samples>0){if(Et(w)===!1){const _=w.textures,B=w.width,V=w.height;let X=n.COLOR_BUFFER_BIT;const oe=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(w),q=_.length>1;if(q)for(let ae=0;ae<_.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const Z=w.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let ae=0;ae<_.length;ae++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(X|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(X|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[ae]);const Ae=i.get(_[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,B,V,0,0,B,V,X,n.NEAREST),l===!0&&(yt.length=0,Rt.length=0,yt.push(n.COLOR_ATTACHMENT0+ae),w.depthBuffer&&w.resolveDepthBuffer===!1&&(yt.push(oe),Rt.push(oe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Rt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,yt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let ae=0;ae<_.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,ue.__webglColorRenderbuffer[ae]);const Ae=i.get(_[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function mt(w){return Math.min(r.maxSamples,w.samples)}function Et(w){const _=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(w){const _=o.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function Ot(w,_){const B=w.colorSpace,V=w.format,X=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Gs&&B!==vi&&(tt.getTransfer(B)===ft?(V!==In||X!==vn)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",B)),_}function Oe(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=Q,this.getTextureUnits=te,this.setTextureUnits=z,this.setTexture2D=ne,this.setTexture2DArray=re,this.setTexture3D=ge,this.setTextureCube=_e,this.rebindTextures=Ze,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=De,this.useMultisampledRTT=Et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Wv(n,e){function t(i,r=vi){let s;const o=tt.getTransfer(r);if(i===vn)return n.UNSIGNED_BYTE;if(i===sl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ol)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Pu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Lu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Cu)return n.BYTE;if(i===Ru)return n.SHORT;if(i===Xr)return n.UNSIGNED_SHORT;if(i===rl)return n.INT;if(i===Xn)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===li)return n.HALF_FLOAT;if(i===Iu)return n.ALPHA;if(i===Du)return n.RGB;if(i===In)return n.RGBA;if(i===ci)return n.DEPTH_COMPONENT;if(i===ki)return n.DEPTH_STENCIL;if(i===Nu)return n.RED;if(i===al)return n.RED_INTEGER;if(i===Hi)return n.RG;if(i===ll)return n.RG_INTEGER;if(i===cl)return n.RGBA_INTEGER;if(i===Ds||i===Ns||i===Us||i===Fs)if(o===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Fs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ns)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Us)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Fs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ma||i===ga||i===_a||i===va)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ma)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ga)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_a)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===va)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xa||i===Ma||i===Sa||i===ya||i===Ea||i===Hs||i===ba)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===xa||i===Ma)return o===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Sa)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===ya)return s.COMPRESSED_R11_EAC;if(i===Ea)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Hs)return s.COMPRESSED_RG11_EAC;if(i===ba)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ta||i===Aa||i===wa||i===Ca||i===Ra||i===Pa||i===La||i===Ia||i===Da||i===Na||i===Ua||i===Fa||i===Oa||i===Ba)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ta)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Aa)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wa)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ca)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ra)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pa)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===La)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ia)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Da)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Na)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ua)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fa)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Oa)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ba)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ka||i===za||i===Ha)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ka)return o===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===za)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ha)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Va||i===Ga||i===Vs||i===Wa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Va)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ga)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===qr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Xv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qv=`
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

}`;class $v{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Gu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new qn({vertexShader:Xv,fragmentShader:qv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new En(new Qs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yv extends Gi{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",g=new $v,p={},y=t.getContextAttributes();let b=null,S=null;const A=[],C=[],L=new Ce;let x=null;const R=new Sn;R.viewport=new At;const O=new Sn;O.viewport=new At;const N=[R,O],H=new rm;let Q=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ce=A[j];return ce===void 0&&(ce=new Mo,A[j]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(j){let ce=A[j];return ce===void 0&&(ce=new Mo,A[j]=ce),ce.getGripSpace()},this.getHand=function(j){let ce=A[j];return ce===void 0&&(ce=new Mo,A[j]=ce),ce.getHandSpace()};function z(j){const ce=C.indexOf(j.inputSource);if(ce===-1)return;const se=A[ce];se!==void 0&&(se.update(j.inputSource,j.frame,c||o),se.dispatchEvent({type:j.type,data:j.inputSource}))}function Y(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",W);for(let j=0;j<A.length;j++){const ce=C[j];ce!==null&&(C[j]=null,A[j].disconnect(ce))}Q=null,te=null,g.reset();for(const j in p)delete p[j];e.setRenderTarget(b),f=null,d=null,h=null,r=null,S=null,Ge.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",W),y.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Fe=null,ze=null;y.depth&&(ze=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=y.stencil?ki:ci,Fe=y.stencil?qr:Xn);const De={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(De),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Gn(d.textureWidth,d.textureHeight,{format:In,type:vn,depthTexture:new fr(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const se={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Gn(f.framebufferWidth,f.framebufferHeight,{format:In,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ge.setContext(r),Ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function W(j){for(let ce=0;ce<j.removed.length;ce++){const se=j.removed[ce],Fe=C.indexOf(se);Fe>=0&&(C[Fe]=null,A[Fe].disconnect(se))}for(let ce=0;ce<j.added.length;ce++){const se=j.added[ce];let Fe=C.indexOf(se);if(Fe===-1){for(let De=0;De<A.length;De++)if(De>=C.length){C.push(se),Fe=De;break}else if(C[De]===null){C[De]=se,Fe=De;break}if(Fe===-1)break}const ze=A[Fe];ze&&ze.connect(se)}}const ne=new k,re=new k;function ge(j,ce,se){ne.setFromMatrixPosition(ce.matrixWorld),re.setFromMatrixPosition(se.matrixWorld);const Fe=ne.distanceTo(re),ze=ce.projectionMatrix.elements,De=se.projectionMatrix.elements,Mt=ze[14]/(ze[10]-1),Ye=ze[14]/(ze[10]+1),it=(ze[9]+1)/ze[5],Ze=(ze[9]-1)/ze[5],Ke=(ze[8]-1)/ze[0],ot=(De[8]+1)/De[0],yt=Mt*Ke,Rt=Mt*ot,Lt=Fe/(-Ke+ot),mt=Lt*-Ke;if(ce.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(mt),j.translateZ(Lt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ze[10]===-1)j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const Et=Mt+Lt,U=Ye+Lt,Ot=yt-mt,Oe=Rt+(Fe-mt),w=it*Ye/U*Et,_=Ze*Ye/U*Et;j.projectionMatrix.makePerspective(Ot,Oe,w,_,Et,U),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function _e(j,ce){ce===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ce.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ce=j.near,se=j.far;g.texture!==null&&(g.depthNear>0&&(ce=g.depthNear),g.depthFar>0&&(se=g.depthFar)),H.near=O.near=R.near=ce,H.far=O.far=R.far=se,(Q!==H.near||te!==H.far)&&(r.updateRenderState({depthNear:H.near,depthFar:H.far}),Q=H.near,te=H.far),H.layers.mask=j.layers.mask|6,R.layers.mask=H.layers.mask&-5,O.layers.mask=H.layers.mask&-3;const Fe=j.parent,ze=H.cameras;_e(H,Fe);for(let De=0;De<ze.length;De++)_e(ze[De],Fe);ze.length===2?ge(H,R,O):H.projectionMatrix.copy(R.projectionMatrix),be(j,H,Fe)};function be(j,ce,se){se===null?j.matrix.copy(ce.matrixWorld):(j.matrix.copy(se.matrixWorld),j.matrix.invert(),j.matrix.multiply(ce.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=qa*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(j){return p[j]};let nt=null;function st(j,ce){if(u=ce.getViewerPose(c||o),m=ce,u!==null){const se=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Fe=!1;se.length!==H.cameras.length&&(H.cameras.length=0,Fe=!0);for(let Ye=0;Ye<se.length;Ye++){const it=se[Ye];let Ze=null;if(f!==null)Ze=f.getViewport(it);else{const ot=h.getViewSubImage(d,it);Ze=ot.viewport,Ye===0&&(e.setRenderTargetTextures(S,ot.colorTexture,ot.depthStencilTexture),e.setRenderTarget(S))}let Ke=N[Ye];Ke===void 0&&(Ke=new Sn,Ke.layers.enable(Ye),Ke.viewport=new At,N[Ye]=Ke),Ke.matrix.fromArray(it.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(it.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Ye===0&&(H.matrix.copy(Ke.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Fe===!0&&H.cameras.push(Ke)}const ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const Ye=h.getDepthInformation(se[0]);Ye&&Ye.isValid&&Ye.texture&&g.init(Ye,r.renderState)}if(ze&&ze.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let Ye=0;Ye<se.length;Ye++){const it=se[Ye].camera;if(it){let Ze=p[it];Ze||(Ze=new Gu,p[it]=Ze);const Ke=h.getCameraImage(it);Ze.sourceTexture=Ke}}}}for(let se=0;se<A.length;se++){const Fe=C[se],ze=A[se];Fe!==null&&ze!==void 0&&ze.update(Fe,ce,c||o)}nt&&nt(j,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),m=null}const Ge=new nd;Ge.setAnimationLoop(st),this.setAnimationLoop=function(j){nt=j},this.dispose=function(){}}}const Kv=new Ct,cd=new We;cd.set(-1,0,0,0,1,0,0,0,1);function Zv(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,ju(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,y,b,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(g,p):p.isMeshLambertMaterial?(s(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,S)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),v(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,y,b):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===fn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===fn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),b=y.envMap,S=y.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(Kv.makeRotationFromEuler(S)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(cd),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=b*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===fn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Jv(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,A){const C=A.program;i.uniformBlockBinding(S,C)}function c(S,A){let C=r[S.id];C===void 0&&(g(S),C=u(S),r[S.id]=C,S.addEventListener("dispose",y));const L=A.program;i.updateUBOMapping(S,L);const x=e.render.frame;s[S.id]!==x&&(d(S),s[S.id]=x)}function u(S){const A=h();S.__bindingPointIndex=A;const C=n.createBuffer(),L=S.__size,x=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,L,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,C),C}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const A=r[S.id],C=S.uniforms,L=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let x=0,R=C.length;x<R;x++){const O=C[x];if(Array.isArray(O))for(let N=0,H=O.length;N<H;N++)f(O[N],x,N,L);else f(O,x,0,L)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,A,C,L){if(v(S,A,C,L)===!0){const x=S.__offset,R=S.value;if(Array.isArray(R)){let O=0;for(let N=0;N<R.length;N++){const H=R[N],Q=p(H);m(H,S.__data,O),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(O+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(R,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,S.__data)}}function m(S,A,C){typeof S=="number"||typeof S=="boolean"?A[0]=S:S.isMatrix3?(A[0]=S.elements[0],A[1]=S.elements[1],A[2]=S.elements[2],A[3]=0,A[4]=S.elements[3],A[5]=S.elements[4],A[6]=S.elements[5],A[7]=0,A[8]=S.elements[6],A[9]=S.elements[7],A[10]=S.elements[8],A[11]=0):ArrayBuffer.isView(S)?A.set(new S.constructor(S.buffer,S.byteOffset,A.length)):S.toArray(A,C)}function v(S,A,C,L){const x=S.value,R=A+"_"+C;if(L[R]===void 0)return typeof x=="number"||typeof x=="boolean"?L[R]=x:ArrayBuffer.isView(x)?L[R]=x.slice():L[R]=x.clone(),!0;{const O=L[R];if(typeof x=="number"||typeof x=="boolean"){if(O!==x)return L[R]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(O.equals(x)===!1)return O.copy(x),!0}}return!1}function g(S){const A=S.uniforms;let C=0;const L=16;for(let R=0,O=A.length;R<O;R++){const N=Array.isArray(A[R])?A[R]:[A[R]];for(let H=0,Q=N.length;H<Q;H++){const te=N[H],z=Array.isArray(te.value)?te.value:[te.value];for(let Y=0,W=z.length;Y<W;Y++){const ne=z[Y],re=p(ne),ge=C%L,_e=ge%re.boundary,be=ge+_e;C+=_e,be!==0&&L-be<re.storage&&(C+=L-be),te.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),te.__offset=C,C+=re.storage}}}const x=C%L;return x>0&&(C+=L-x),S.__size=C,S.__cache={},this}function p(S){const A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(A.boundary=16,A.storage=S.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",S),A}function y(S){const A=S.target;A.removeEventListener("dispose",y);const C=o.indexOf(A.__bindingPointIndex);o.splice(C,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete s[A.id]}function b(){for(const S in r)n.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:l,update:c,dispose:b}}const Qv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fn=null;function jv(){return Fn===null&&(Fn=new up(Qv,16,16,Hi,li),Fn.name="DFG_LUT",Fn.minFilter=Qt,Fn.magFilter=Qt,Fn.wrapS=si,Fn.wrapT=si,Fn.generateMipmaps=!1,Fn.needsUpdate=!0),Fn}class ex{constructor(e={}){const{canvas:t=zf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=vn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const v=f,g=new Set([cl,ll,al]),p=new Set([vn,Xn,Xr,qr,sl,ol]),y=new Uint32Array(4),b=new Int32Array(4),S=new k;let A=null,C=null;const L=[],x=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let N=!1,H=null,Q=null,te=null,z=null;this._outputColorSpace=_n;let Y=0,W=0,ne=null,re=-1,ge=null;const _e=new At,be=new At;let nt=null;const st=new Qe(0);let Ge=0,j=t.width,ce=t.height,se=1,Fe=null,ze=null;const De=new At(0,0,j,ce),Mt=new At(0,0,j,ce);let Ye=!1;const it=new ml;let Ze=!1,Ke=!1;const ot=new Ct,yt=new k,Rt=new At,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function Et(){return ne===null?se:1}let U=i;function Ot(M,I){return t.getContext(M,I)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${il}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",ln,!1),U===null){const I="webgl2";if(U=Ot(I,M),U===null)throw Ot(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw at("WebGLRenderer: "+M.message),M}let Oe,w,_,B,V,X,oe,ue,q,Z,ae,Ae,fe,pe,Le,Ue,He,D,de,J,me,ve,ee;function ie(){Oe=new j0(U),Oe.init(),me=new Wv(U,Oe),w=new X0(U,Oe,e,me),_=new Vv(U,Oe),w.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),Q=U.createFramebuffer(),te=U.createFramebuffer(),z=U.createFramebuffer(),B=new n_(U),V=new Cv,X=new Gv(U,Oe,_,V,w,me,B),oe=new Q0(O),ue=new om(U),ve=new G0(U,ue),q=new e_(U,ue,B,ve),Z=new r_(U,q,ue,ve,B),D=new i_(U,w,X),Le=new q0(V),ae=new wv(O,oe,Oe,w,ve,Le),Ae=new Zv(O,V),fe=new Pv,pe=new Fv(Oe),He=new V0(O,oe,_,Z,m,l),Ue=new Hv(O,Z,w),ee=new Jv(U,B,w,_),de=new W0(U,Oe,B),J=new t_(U,Oe,B),B.programs=ae.programs,O.capabilities=w,O.extensions=Oe,O.properties=V,O.renderLists=fe,O.shadowMap=Ue,O.state=_,O.info=B}ie(),v!==vn&&(R=new o_(v,t.width,t.height,a,r,s));const Ee=new Yv(O,U);this.xr=Ee,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=Oe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Oe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(M){M!==void 0&&(se=M,this.setSize(j,ce,!1))},this.getSize=function(M){return M.set(j,ce)},this.setSize=function(M,I,G=!0){if(Ee.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}j=M,ce=I,t.width=Math.floor(M*se),t.height=Math.floor(I*se),G===!0&&(t.style.width=M+"px",t.style.height=I+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(j*se,ce*se).floor()},this.setDrawingBufferSize=function(M,I,G){j=M,ce=I,se=G,t.width=Math.floor(M*G),t.height=Math.floor(I*G),this.setViewport(0,0,M,I)},this.setEffects=function(M){if(v===vn){at("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let I=0;I<M.length;I++)if(M[I].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(_e)},this.getViewport=function(M){return M.copy(De)},this.setViewport=function(M,I,G,F){M.isVector4?De.set(M.x,M.y,M.z,M.w):De.set(M,I,G,F),_.viewport(_e.copy(De).multiplyScalar(se).round())},this.getScissor=function(M){return M.copy(Mt)},this.setScissor=function(M,I,G,F){M.isVector4?Mt.set(M.x,M.y,M.z,M.w):Mt.set(M,I,G,F),_.scissor(be.copy(Mt).multiplyScalar(se).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(M){_.setScissorTest(Ye=M)},this.setOpaqueSort=function(M){Fe=M},this.setTransparentSort=function(M){ze=M},this.getClearColor=function(M){return M.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,G=!0){let F=0;if(M){let T=!1;if(ne!==null){const xe=ne.texture.format;T=g.has(xe)}if(T){const xe=ne.texture.type,K=p.has(xe),he=He.getClearColor(),Te=He.getClearAlpha(),we=he.r,Be=he.g,qe=he.b;K?(y[0]=we,y[1]=Be,y[2]=qe,y[3]=Te,U.clearBufferuiv(U.COLOR,0,y)):(b[0]=we,b[1]=Be,b[2]=qe,b[3]=Te,U.clearBufferiv(U.COLOR,0,b))}else F|=U.COLOR_BUFFER_BIT}I&&(F|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(F|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&U.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),H=M},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),He.dispose(),fe.dispose(),pe.dispose(),V.dispose(),oe.dispose(),Z.dispose(),ve.dispose(),ee.dispose(),ae.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Ne),Ee.removeEventListener("sessionend",gt),$t.stop()};function pt(M){M.preventDefault(),Zl("WebGLRenderer: Context Lost."),N=!0}function lt(){Zl("WebGLRenderer: Context Restored."),N=!1;const M=B.autoReset,I=Ue.enabled,G=Ue.autoUpdate,F=Ue.needsUpdate,T=Ue.type;ie(),B.autoReset=M,Ue.enabled=I,Ue.autoUpdate=G,Ue.needsUpdate=F,Ue.type=T}function ln(M){at("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function cn(M){const I=M.target;I.removeEventListener("dispose",cn),Mr(I)}function Mr(M){Sr(M),V.remove(M)}function Sr(M){const I=V.get(M).programs;I!==void 0&&(I.forEach(function(G){ae.releaseProgram(G)}),M.isShaderMaterial&&ae.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,G,F,T,xe){I===null&&(I=Lt);const K=T.isMesh&&T.matrixWorld.determinantAffine()<0,he=nn(M,I,G,F,T);_.setMaterial(F,K);let Te=G.index,we=1;if(F.wireframe===!0){if(Te=q.getWireframeAttribute(G),Te===void 0)return;we=2}const Be=G.drawRange,qe=G.attributes.position;let Pe=Be.start*we,ct=(Be.start+Be.count)*we;xe!==null&&(Pe=Math.max(Pe,xe.start*we),ct=Math.min(ct,(xe.start+xe.count)*we)),Te!==null?(Pe=Math.max(Pe,0),ct=Math.min(ct,Te.count)):qe!=null&&(Pe=Math.max(Pe,0),ct=Math.min(ct,qe.count));const _t=ct-Pe;if(_t<0||_t===1/0)return;ve.setup(T,F,he,G,Te);let St,ut=de;if(Te!==null&&(St=ue.get(Te),ut=J,ut.setIndex(St)),T.isMesh)F.wireframe===!0?(_.setLineWidth(F.wireframeLinewidth*Et()),ut.setMode(U.LINES)):ut.setMode(U.TRIANGLES);else if(T.isLine){let Vt=F.linewidth;Vt===void 0&&(Vt=1),_.setLineWidth(Vt*Et()),T.isLineSegments?ut.setMode(U.LINES):T.isLineLoop?ut.setMode(U.LINE_LOOP):ut.setMode(U.LINE_STRIP)}else T.isPoints?ut.setMode(U.POINTS):T.isSprite&&ut.setMode(U.TRIANGLES);if(T.isBatchedMesh)if(Oe.get("WEBGL_multi_draw"))ut.renderMultiDraw(T._multiDrawStarts,T._multiDrawCounts,T._multiDrawCount);else{const Vt=T._multiDrawStarts,ye=T._multiDrawCounts,rn=T._multiDrawCount,et=Te?ue.get(Te).bytesPerElement:1,un=V.get(F).currentProgram.getUniforms();for(let Gt=0;Gt<rn;Gt++)un.setValue(U,"_gl_DrawID",Gt),ut.render(Vt[Gt]/et,ye[Gt])}else if(T.isInstancedMesh)ut.renderInstances(Pe,_t,T.count);else if(G.isInstancedBufferGeometry){const Vt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ye=Math.min(G.instanceCount,Vt);ut.renderInstances(Pe,_t,ye)}else ut.render(Pe,_t)};function je(M,I,G){M.transparent===!0&&M.side===kn&&M.forceSinglePass===!1?(M.side=fn,M.needsUpdate=!0,Wi(M,I,G),M.side=Si,M.needsUpdate=!0,Wi(M,I,G),M.side=kn):Wi(M,I,G)}this.compile=function(M,I,G=null){G===null&&(G=M),C=pe.get(G),C.init(I),x.push(C),G.traverseVisible(function(T){T.isLight&&T.layers.test(I.layers)&&(C.pushLight(T),T.castShadow&&C.pushShadow(T))}),M!==G&&M.traverseVisible(function(T){T.isLight&&T.layers.test(I.layers)&&(C.pushLight(T),T.castShadow&&C.pushShadow(T))}),C.setupLights();const F=new Set;return M.traverse(function(T){if(!(T.isMesh||T.isPoints||T.isLine||T.isSprite))return;const xe=T.material;if(xe)if(Array.isArray(xe))for(let K=0;K<xe.length;K++){const he=xe[K];je(he,G,T),F.add(he)}else je(xe,G,T),F.add(xe)}),C=x.pop(),F},this.compileAsync=function(M,I,G=null){const F=this.compile(M,I,G);return new Promise(T=>{function xe(){if(F.forEach(function(K){V.get(K).currentProgram.isReady()&&F.delete(K)}),F.size===0){T(M);return}setTimeout(xe,10)}Oe.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let en=null;function bn(M){en&&en(M)}function Ne(){$t.stop()}function gt(){$t.start()}const $t=new nd;$t.setAnimationLoop(bn),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(M){en=M,Ee.setAnimationLoop(M),M===null?$t.stop():$t.start()},Ee.addEventListener("sessionstart",Ne),Ee.addEventListener("sessionend",gt),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;H!==null&&H.renderStart(M,I);const G=Ee.enabled===!0&&Ee.isPresenting===!0,F=R!==null&&(ne===null||G)&&R.begin(O,ne);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(I),I=Ee.getCamera()),M.isScene===!0&&M.onBeforeRender(O,M,I,ne),C=pe.get(M,x.length),C.init(I),C.state.textureUnits=X.getTextureUnits(),x.push(C),ot.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),it.setFromProjectionMatrix(ot,Hn,I.reversedDepth),Ke=this.localClippingEnabled,Ze=Le.init(this.clippingPlanes,Ke),A=fe.get(M,L.length),A.init(),L.push(A),Ee.enabled===!0&&Ee.isPresenting===!0){const K=O.xr.getDepthSensingMesh();K!==null&&Bt(K,I,-1/0,O.sortObjects)}Bt(M,I,0,O.sortObjects),A.finish(),O.sortObjects===!0&&A.sort(Fe,ze,I.reversedDepth),mt=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,mt&&He.addToRenderList(A,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ze===!0&&Le.beginShadows();const T=C.state.shadowsArray;if(Ue.render(T,M,I),Ze===!0&&Le.endShadows(),(F&&R.hasRenderPass())===!1){const K=A.opaque,he=A.transmissive;if(C.setupLights(),I.isArrayCamera){const Te=I.cameras;if(he.length>0)for(let we=0,Be=Te.length;we<Be;we++){const qe=Te[we];Ei(K,he,M,qe)}mt&&He.render(M);for(let we=0,Be=Te.length;we<Be;we++){const qe=Te[we];jr(A,M,qe,qe.viewport)}}else he.length>0&&Ei(K,he,M,I),mt&&He.render(M),jr(A,M,I)}ne!==null&&W===0&&(X.updateMultisampleRenderTarget(ne),X.updateRenderTargetMipmap(ne)),F&&R.end(O),M.isScene===!0&&M.onAfterRender(O,M,I),ve.resetDefaultState(),re=-1,ge=null,x.pop(),x.length>0?(C=x[x.length-1],X.setTextureUnits(C.state.textureUnits),Ze===!0&&Le.setGlobalState(O.clippingPlanes,C.state.camera)):C=null,L.pop(),L.length>0?A=L[L.length-1]:A=null,H!==null&&H.renderEnd()};function Bt(M,I,G,F){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLightProbeGrid)C.pushLightProbeGrid(M);else if(M.isLight)C.pushLight(M),M.castShadow&&C.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||it.intersectsSprite(M)){F&&Rt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ot);const K=Z.update(M),he=M.material;he.visible&&A.push(M,K,he,G,Rt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||it.intersectsObject(M))){const K=Z.update(M),he=M.material;if(F&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Rt.copy(M.boundingSphere.center)):(K.boundingSphere===null&&K.computeBoundingSphere(),Rt.copy(K.boundingSphere.center)),Rt.applyMatrix4(M.matrixWorld).applyMatrix4(ot)),Array.isArray(he)){const Te=K.groups;for(let we=0,Be=Te.length;we<Be;we++){const qe=Te[we],Pe=he[qe.materialIndex];Pe&&Pe.visible&&A.push(M,K,Pe,G,Rt.z,qe)}}else he.visible&&A.push(M,K,he,G,Rt.z,null)}}const xe=M.children;for(let K=0,he=xe.length;K<he;K++)Bt(xe[K],I,G,F)}function jr(M,I,G,F){const{opaque:T,transmissive:xe,transparent:K}=M;C.setupLightsView(G),Ze===!0&&Le.setGlobalState(O.clippingPlanes,G),F&&_.viewport(_e.copy(F)),T.length>0&&bi(T,I,G),xe.length>0&&bi(xe,I,G),K.length>0&&bi(K,I,G),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Ei(M,I,G,F){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[F.id]===void 0){const Pe=Oe.has("EXT_color_buffer_half_float")||Oe.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[F.id]=new Gn(1,1,{generateMipmaps:!0,type:Pe?li:vn,minFilter:Bi,samples:Math.max(4,w.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const xe=C.state.transmissionRenderTarget[F.id],K=F.viewport||_e;xe.setSize(K.z*O.transmissionResolutionScale,K.w*O.transmissionResolutionScale);const he=O.getRenderTarget(),Te=O.getActiveCubeFace(),we=O.getActiveMipmapLevel();O.setRenderTarget(xe),O.getClearColor(st),Ge=O.getClearAlpha(),Ge<1&&O.setClearColor(16777215,.5),O.clear(),mt&&He.render(G);const Be=O.toneMapping;O.toneMapping=Vn;const qe=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),C.setupLightsView(F),Ze===!0&&Le.setGlobalState(O.clippingPlanes,F),bi(M,G,F),X.updateMultisampleRenderTarget(xe),X.updateRenderTargetMipmap(xe),Oe.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let ct=0,_t=I.length;ct<_t;ct++){const St=I[ct],{object:ut,geometry:Vt,material:ye,group:rn}=St;if(ye.side===kn&&ut.layers.test(F.layers)){const et=ye.side;ye.side=fn,ye.needsUpdate=!0,yr(ut,G,F,Vt,ye,rn),ye.side=et,ye.needsUpdate=!0,Pe=!0}}Pe===!0&&(X.updateMultisampleRenderTarget(xe),X.updateRenderTargetMipmap(xe))}O.setRenderTarget(he,Te,we),O.setClearColor(st,Ge),qe!==void 0&&(F.viewport=qe),O.toneMapping=Be}function bi(M,I,G){const F=I.isScene===!0?I.overrideMaterial:null;for(let T=0,xe=M.length;T<xe;T++){const K=M[T],{object:he,geometry:Te,group:we}=K;let Be=K.material;Be.allowOverride===!0&&F!==null&&(Be=F),he.layers.test(G.layers)&&yr(he,I,G,Te,Be,we)}}function yr(M,I,G,F,T,xe){M.onBeforeRender(O,I,G,F,T,xe),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),T.onBeforeRender(O,I,G,F,M,xe),T.transparent===!0&&T.side===kn&&T.forceSinglePass===!1?(T.side=fn,T.needsUpdate=!0,O.renderBufferDirect(G,I,F,T,M,xe),T.side=Si,T.needsUpdate=!0,O.renderBufferDirect(G,I,F,T,M,xe),T.side=kn):O.renderBufferDirect(G,I,F,T,M,xe),M.onAfterRender(O,I,G,F,T,xe)}function Wi(M,I,G){I.isScene!==!0&&(I=Lt);const F=V.get(M),T=C.state.lights,xe=C.state.shadowsArray,K=T.state.version,he=ae.getParameters(M,T.state,xe,I,G,C.state.lightProbeGridArray),Te=ae.getProgramCacheKey(he);let we=F.programs;F.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,F.fog=I.fog;const Be=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;F.envMap=oe.get(M.envMap||F.environment,Be),F.envMapRotation=F.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,we===void 0&&(M.addEventListener("dispose",cn),we=new Map,F.programs=we);let qe=we.get(Te);if(qe!==void 0){if(F.currentProgram===qe&&F.lightsStateVersion===K)return tn(M,he),qe}else he.uniforms=ae.getUniforms(M),H!==null&&M.isNodeMaterial&&H.build(M,G,he),M.onBeforeCompile(he,O),qe=ae.acquireProgram(he,Te),we.set(Te,qe),F.uniforms=he.uniforms;const Pe=F.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=Le.uniform),tn(M,he),F.needsLights=Ht(M),F.lightsStateVersion=K,F.needsLights&&(Pe.ambientLightColor.value=T.state.ambient,Pe.lightProbe.value=T.state.probe,Pe.directionalLights.value=T.state.directional,Pe.directionalLightShadows.value=T.state.directionalShadow,Pe.spotLights.value=T.state.spot,Pe.spotLightShadows.value=T.state.spotShadow,Pe.rectAreaLights.value=T.state.rectArea,Pe.ltc_1.value=T.state.rectAreaLTC1,Pe.ltc_2.value=T.state.rectAreaLTC2,Pe.pointLights.value=T.state.point,Pe.pointLightShadows.value=T.state.pointShadow,Pe.hemisphereLights.value=T.state.hemi,Pe.directionalShadowMatrix.value=T.state.directionalShadowMatrix,Pe.spotLightMatrix.value=T.state.spotLightMatrix,Pe.spotLightMap.value=T.state.spotLightMap,Pe.pointShadowMatrix.value=T.state.pointShadowMatrix),F.lightProbeGrid=C.state.lightProbeGridArray.length>0,F.currentProgram=qe,F.uniformsList=null,qe}function It(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=Os.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function tn(M,I){const G=V.get(M);G.outputColorSpace=I.outputColorSpace,G.batching=I.batching,G.batchingColor=I.batchingColor,G.instancing=I.instancing,G.instancingColor=I.instancingColor,G.instancingMorph=I.instancingMorph,G.skinning=I.skinning,G.morphTargets=I.morphTargets,G.morphNormals=I.morphNormals,G.morphColors=I.morphColors,G.morphTargetsCount=I.morphTargetsCount,G.numClippingPlanes=I.numClippingPlanes,G.numIntersection=I.numClipIntersection,G.vertexAlphas=I.vertexAlphas,G.vertexTangents=I.vertexTangents,G.toneMapping=I.toneMapping}function Tn(M,I){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(I.matrixWorld);for(let G=0,F=M.length;G<F;G++){const T=M[G];if(T.texture!==null&&T.boundingBox.containsPoint(S))return T}return null}function nn(M,I,G,F,T){I.isScene!==!0&&(I=Lt),X.resetTextureUnits();const xe=I.fog,K=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?I.environment:null,he=ne===null?O.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:tt.workingColorSpace,Te=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,we=oe.get(F.envMap||K,Te),Be=F.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,qe=!!G.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Pe=!!G.morphAttributes.position,ct=!!G.morphAttributes.normal,_t=!!G.morphAttributes.color;let St=Vn;F.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(St=O.toneMapping);const ut=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Vt=ut!==void 0?ut.length:0,ye=V.get(F),rn=C.state.lights;if(Ze===!0&&(Ke===!0||M!==ge)){const rt=M===ge&&F.id===re;Le.setState(F,M,rt)}let et=!1;F.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==rn.state.version||ye.outputColorSpace!==he||T.isBatchedMesh&&ye.batching===!1||!T.isBatchedMesh&&ye.batching===!0||T.isBatchedMesh&&ye.batchingColor===!0&&T.colorTexture===null||T.isBatchedMesh&&ye.batchingColor===!1&&T.colorTexture!==null||T.isInstancedMesh&&ye.instancing===!1||!T.isInstancedMesh&&ye.instancing===!0||T.isSkinnedMesh&&ye.skinning===!1||!T.isSkinnedMesh&&ye.skinning===!0||T.isInstancedMesh&&ye.instancingColor===!0&&T.instanceColor===null||T.isInstancedMesh&&ye.instancingColor===!1&&T.instanceColor!==null||T.isInstancedMesh&&ye.instancingMorph===!0&&T.morphTexture===null||T.isInstancedMesh&&ye.instancingMorph===!1&&T.morphTexture!==null||ye.envMap!==we||F.fog===!0&&ye.fog!==xe||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==Le.numPlanes||ye.numIntersection!==Le.numIntersection)||ye.vertexAlphas!==Be||ye.vertexTangents!==qe||ye.morphTargets!==Pe||ye.morphNormals!==ct||ye.morphColors!==_t||ye.toneMapping!==St||ye.morphTargetsCount!==Vt||!!ye.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,ye.__version=F.version);let un=ye.currentProgram;et===!0&&(un=Wi(F,I,T),H&&F.isNodeMaterial&&H.onUpdateProgram(F,un,ye));let Gt=!1,dt=!1,ui=!1;const ht=un.getUniforms(),bt=ye.uniforms;if(_.useProgram(un.program)&&(Gt=!0,dt=!0,ui=!0),F.id!==re&&(re=F.id,dt=!0),ye.needsLights){const rt=Tn(C.state.lightProbeGridArray,T);ye.lightProbeGrid!==rt&&(ye.lightProbeGrid=rt,dt=!0)}if(Gt||ge!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ht.setValue(U,"projectionMatrix",M.projectionMatrix),ht.setValue(U,"viewMatrix",M.matrixWorldInverse);const Dn=ht.map.cameraPosition;Dn!==void 0&&Dn.setValue(U,yt.setFromMatrixPosition(M.matrixWorld)),w.logarithmicDepthBuffer&&ht.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&ht.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),ge!==M&&(ge=M,dt=!0,ui=!0)}if(ye.needsLights&&(rn.state.directionalShadowMap.length>0&&ht.setValue(U,"directionalShadowMap",rn.state.directionalShadowMap,X),rn.state.spotShadowMap.length>0&&ht.setValue(U,"spotShadowMap",rn.state.spotShadowMap,X),rn.state.pointShadowMap.length>0&&ht.setValue(U,"pointShadowMap",rn.state.pointShadowMap,X)),T.isSkinnedMesh){ht.setOptional(U,T,"bindMatrix"),ht.setOptional(U,T,"bindMatrixInverse");const rt=T.skeleton;rt&&(rt.boneTexture===null&&rt.computeBoneTexture(),ht.setValue(U,"boneTexture",rt.boneTexture,X))}T.isBatchedMesh&&(ht.setOptional(U,T,"batchingTexture"),ht.setValue(U,"batchingTexture",T._matricesTexture,X),ht.setOptional(U,T,"batchingIdTexture"),ht.setValue(U,"batchingIdTexture",T._indirectTexture,X),ht.setOptional(U,T,"batchingColorTexture"),T._colorsTexture!==null&&ht.setValue(U,"batchingColorTexture",T._colorsTexture,X));const sn=G.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&D.update(T,G,un),(dt||ye.receiveShadow!==T.receiveShadow)&&(ye.receiveShadow=T.receiveShadow,ht.setValue(U,"receiveShadow",T.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&I.environment!==null&&(bt.envMapIntensity.value=I.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=jv()),dt){if(ht.setValue(U,"toneMappingExposure",O.toneMappingExposure),ye.needsLights&&An(bt,ui),xe&&F.fog===!0&&Ae.refreshFogUniforms(bt,xe),Ae.refreshMaterialUniforms(bt,F,se,ce,C.state.transmissionRenderTarget[M.id]),ye.needsLights&&ye.lightProbeGrid){const rt=ye.lightProbeGrid;bt.probesSH.value=rt.texture,bt.probesMin.value.copy(rt.boundingBox.min),bt.probesMax.value.copy(rt.boundingBox.max),bt.probesResolution.value.copy(rt.resolution)}Os.upload(U,It(ye),bt,X)}if(F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Os.upload(U,It(ye),bt,X),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&ht.setValue(U,"center",T.center),ht.setValue(U,"modelViewMatrix",T.modelViewMatrix),ht.setValue(U,"normalMatrix",T.normalMatrix),ht.setValue(U,"modelMatrix",T.matrixWorld),F.uniformsGroups!==void 0){const rt=F.uniformsGroups;for(let Dn=0,Kn=rt.length;Dn<Kn;Dn++){const Yt=rt[Dn];ee.update(Yt,un),ee.bind(Yt,un)}}return un}function An(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function Ht(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(M,I,G){const F=V.get(M);F.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),V.get(M.texture).__webglTexture=I,V.get(M.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:G,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const G=V.get(M);G.__webglFramebuffer=I,G.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,G=0){ne=M,Y=I,W=G;let F=null,T=!1,xe=!1;if(M){const he=V.get(M);if(he.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,he.__webglFramebuffer),_e.copy(M.viewport),be.copy(M.scissor),nt=M.scissorTest,_.viewport(_e),_.scissor(be),_.setScissorTest(nt),re=-1;return}else if(he.__webglFramebuffer===void 0)X.setupRenderTarget(M);else if(he.__hasExternalTextures)X.rebindTextures(M,V.get(M.texture).__webglTexture,V.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Be=M.depthTexture;if(he.__boundDepthTexture!==Be){if(Be!==null&&V.has(Be)&&(M.width!==Be.image.width||M.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(M)}}const Te=M.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(xe=!0);const we=V.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(we[I])?F=we[I][G]:F=we[I],T=!0):M.samples>0&&X.useMultisampledRTT(M)===!1?F=V.get(M).__webglMultisampledFramebuffer:Array.isArray(we)?F=we[G]:F=we,_e.copy(M.viewport),be.copy(M.scissor),nt=M.scissorTest}else _e.copy(De).multiplyScalar(se).floor(),be.copy(Mt).multiplyScalar(se).floor(),nt=Ye;if(G!==0&&(F=Q),_.bindFramebuffer(U.FRAMEBUFFER,F)&&_.drawBuffers(M,F),_.viewport(_e),_.scissor(be),_.setScissorTest(nt),T){const he=V.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,he.__webglTexture,G)}else if(xe){const he=I;for(let Te=0;Te<M.textures.length;Te++){const we=V.get(M.textures[Te]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Te,we.__webglTexture,G,he)}}else if(M!==null&&G!==0){const he=V.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,he.__webglTexture,G)}re=-1},this.readRenderTargetPixels=function(M,I,G,F,T,xe,K,he=0){if(!(M&&M.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&K!==void 0&&(Te=Te[K]),Te){_.bindFramebuffer(U.FRAMEBUFFER,Te);try{const we=M.textures[he],Be=we.format,qe=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+he),!w.textureFormatReadable(Be)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(qe)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-F&&G>=0&&G<=M.height-T&&U.readPixels(I,G,F,T,me.convert(Be),me.convert(qe),xe)}finally{const we=ne!==null?V.get(ne).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(M,I,G,F,T,xe,K,he=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&K!==void 0&&(Te=Te[K]),Te)if(I>=0&&I<=M.width-F&&G>=0&&G<=M.height-T){_.bindFramebuffer(U.FRAMEBUFFER,Te);const we=M.textures[he],Be=we.format,qe=we.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+he),!w.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Pe),U.bufferData(U.PIXEL_PACK_BUFFER,xe.byteLength,U.STREAM_READ),U.readPixels(I,G,F,T,me.convert(Be),me.convert(qe),0);const ct=ne!==null?V.get(ne).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,ct);const _t=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Hf(U,_t,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Pe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,xe),U.deleteBuffer(Pe),U.deleteSync(_t),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,G=0){const F=Math.pow(2,-G),T=Math.floor(M.image.width*F),xe=Math.floor(M.image.height*F),K=I!==null?I.x:0,he=I!==null?I.y:0;X.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,G,0,0,K,he,T,xe),_.unbindTexture()},this.copyTextureToTexture=function(M,I,G=null,F=null,T=0,xe=0){let K,he,Te,we,Be,qe,Pe,ct,_t;const St=M.isCompressedTexture?M.mipmaps[xe]:M.image;if(G!==null)K=G.max.x-G.min.x,he=G.max.y-G.min.y,Te=G.isBox3?G.max.z-G.min.z:1,we=G.min.x,Be=G.min.y,qe=G.isBox3?G.min.z:0;else{const bt=Math.pow(2,-T);K=Math.floor(St.width*bt),he=Math.floor(St.height*bt),M.isDataArrayTexture?Te=St.depth:M.isData3DTexture?Te=Math.floor(St.depth*bt):Te=1,we=0,Be=0,qe=0}F!==null?(Pe=F.x,ct=F.y,_t=F.z):(Pe=0,ct=0,_t=0);const ut=me.convert(I.format),Vt=me.convert(I.type);let ye;I.isData3DTexture?(X.setTexture3D(I,0),ye=U.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(X.setTexture2DArray(I,0),ye=U.TEXTURE_2D_ARRAY):(X.setTexture2D(I,0),ye=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,I.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,I.unpackAlignment);const rn=_.getParameter(U.UNPACK_ROW_LENGTH),et=_.getParameter(U.UNPACK_IMAGE_HEIGHT),un=_.getParameter(U.UNPACK_SKIP_PIXELS),Gt=_.getParameter(U.UNPACK_SKIP_ROWS),dt=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,St.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,St.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,we),_.pixelStorei(U.UNPACK_SKIP_ROWS,Be),_.pixelStorei(U.UNPACK_SKIP_IMAGES,qe);const ui=M.isDataArrayTexture||M.isData3DTexture,ht=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const bt=V.get(M),sn=V.get(I),rt=V.get(bt.__renderTarget),Dn=V.get(sn.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,rt.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Kn=0;Kn<Te;Kn++)ui&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(M).__webglTexture,T,qe+Kn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(I).__webglTexture,xe,_t+Kn)),U.blitFramebuffer(we,Be,K,he,Pe,ct,K,he,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(T!==0||M.isRenderTargetTexture||V.has(M)){const bt=V.get(M),sn=V.get(I);_.bindFramebuffer(U.READ_FRAMEBUFFER,te),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let rt=0;rt<Te;rt++)ui?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,bt.__webglTexture,T,qe+rt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,bt.__webglTexture,T),ht?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,sn.__webglTexture,xe,_t+rt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,sn.__webglTexture,xe),T!==0?U.blitFramebuffer(we,Be,K,he,Pe,ct,K,he,U.COLOR_BUFFER_BIT,U.NEAREST):ht?U.copyTexSubImage3D(ye,xe,Pe,ct,_t+rt,we,Be,K,he):U.copyTexSubImage2D(ye,xe,Pe,ct,we,Be,K,he);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ht?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(ye,xe,Pe,ct,_t,K,he,Te,ut,Vt,St.data):I.isCompressedArrayTexture?U.compressedTexSubImage3D(ye,xe,Pe,ct,_t,K,he,Te,ut,St.data):U.texSubImage3D(ye,xe,Pe,ct,_t,K,he,Te,ut,Vt,St):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,xe,Pe,ct,K,he,ut,Vt,St.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,xe,Pe,ct,St.width,St.height,ut,St.data):U.texSubImage2D(U.TEXTURE_2D,xe,Pe,ct,K,he,ut,Vt,St);_.pixelStorei(U.UNPACK_ROW_LENGTH,rn),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,et),_.pixelStorei(U.UNPACK_SKIP_PIXELS,un),_.pixelStorei(U.UNPACK_SKIP_ROWS,Gt),_.pixelStorei(U.UNPACK_SKIP_IMAGES,dt),xe===0&&I.generateMipmaps&&U.generateMipmap(ye),_.unbindTexture()},this.initRenderTarget=function(M){V.get(M).__webglFramebuffer===void 0&&X.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?X.setTextureCube(M,0):M.isData3DTexture?X.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?X.setTexture2DArray(M,0):X.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){Y=0,W=0,ne=null,_.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const tx=2.5,Jc=1.65,nx=.1;function Bs(n,e){return{x:n.x/e,z:n.y/e}}function $o(n,e){const t=n.loops.filter(d=>d.vertices.length>=3);if(!t.length)return{eyeX:0,eyeY:Jc,eyeZ:0,yaw:0,pitch:0,fovDeg:75};const i=t[0];let r=0,s=0;for(const d of i.vertices){const f=Bs(d,e);r+=f.x,s+=f.z}const o=i.vertices.length,a=r/o,l=s/o,c=Bs(i.vertices[0],e),u=Bs(i.vertices[1%o],e),h=Math.atan2(u.x-c.x,u.z-c.z);return{eyeX:a,eyeY:Jc,eyeZ:l,yaw:h,pitch:0,fovDeg:75}}function Qc(n,e,t,i){const r=Math.sin(n.yaw),s=Math.cos(n.yaw),o=Math.cos(n.yaw),a=-Math.sin(n.yaw);return{...n,eyeX:n.eyeX+r*e+o*t,eyeZ:n.eyeZ+s*e+a*t,eyeY:Math.max(.15,Math.min(12,n.eyeY+i))}}function ix(n,e,t){const i=Math.max(-1.35,Math.min(1.35,n.pitch+t));return{...n,yaw:n.yaw+e,pitch:i}}function rx(n,e){e.position.set(n.eyeX,n.eyeY,n.eyeZ),e.fov=n.fovDeg,e.near=.08,e.far=200;const t=n.eyeX+Math.sin(n.yaw)*Math.cos(n.pitch),i=n.eyeY+Math.sin(n.pitch),r=n.eyeZ+Math.cos(n.yaw)*Math.cos(n.pitch);e.lookAt(t,i,r),e.updateProjectionMatrix()}function sx(n,e,t){const i=Math.hypot(e.x-n.x,e.z-n.z);if(i<1e-6)return[];const r=(e.x-n.x)/i,s=(e.z-n.z)/i,o=t.map(h=>{const d=h.widthM/2/i;return{t0:Math.max(0,h.t-d),t1:Math.min(1,h.t+d)}});o.sort((h,d)=>h.t0-d.t0);const a=[];for(const h of o){const d=a[a.length-1];d&&h.t0<=d.t1?d.t1=Math.max(d.t1,h.t1):a.push({...h})}const l=[];let c=0;const u=h=>({x:n.x+r*i*h,y:0,z:n.z+s*i*h});for(const h of a)h.t0>c+.001&&l.push({a:u(c),b:u(h.t0)}),c=h.t1;return c<.999&&l.push({a:u(c),b:u(1)}),l}function jc(n,e,t,i,r){const s=t.x-e.x,o=t.z-e.z,a=Math.hypot(s,o);if(a<.02)return;const l=new vr(a,i,nx),c=new En(l,r);c.position.set((e.x+t.x)/2,i/2,(e.z+t.z)/2),c.rotation.y=Math.atan2(s,o),n.add(c)}function eu(n){n.traverse(e=>{if(e instanceof En){e.geometry.dispose();const t=Array.isArray(e.material)?e.material:[e.material];for(const i of t)i.dispose()}})}function ox(n,e,t){const i=new Ur,r=n.loops.filter(s=>s.vertices.length>=3);if(!r.length)return{group:i,hasGeometry:!1};for(let s=0;s<r.length;s++){const o=r[s],a=o.vertices.map(v=>{const g=Bs(v,e);return{x:g.x,y:0,z:g.z}}),l=new Yu;l.moveTo(a[0].x,a[0].z);for(let v=1;v<a.length;v++)l.lineTo(a[v].x,a[v].z);l.closePath();const c=new vl(l);c.rotateX(-Math.PI/2);const u=40+s%3*8,h=new Mc({color:new Qe(`rgb(${u},${u+30},${u+15})`),roughness:.92,metalness:.02,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),d=new En(c,h);d.position.y=.002,i.add(d);const f=new Mc({color:new Qe(4874872),roughness:.88,metalness:.04,side:kn,transparent:!0,opacity:.92,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),m=o.vertices.length;for(let v=0;v<m;v++){const g=a[v],p=a[(v+1)%m],y=(o.doors??[]).filter(b=>b.wallIndex===v);if(y.length===0)jc(i,g,p,t,f);else for(const b of sx(g,p,y))jc(i,b.a,b.b,t,f)}}return{group:i,hasGeometry:!0}}class ax{constructor(e){Ut(this,"renderer");Ut(this,"scene");Ut(this,"camera");Ut(this,"building",null);Ut(this,"hasGeometry",!1);this.renderer=new ex({canvas:e,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=_n,this.scene=new ip,this.scene.background=new Qe(659996),this.scene.fog=new fl(659996,30,120),this.camera=new Sn(75,1,.08,200);const t=new nm(6320272,.55);this.scene.add(t);const i=new Tc(14214384,.85);i.position.set(6,12,4),this.scene.add(i);const r=new Tc(8425640,.25);r.position.set(-4,6,-6),this.scene.add(r)}rebuild(e,t){this.building&&(this.scene.remove(this.building),eu(this.building),this.building=null);const i=t.pxPerMeter>0?t.pxPerMeter:50,r=t.wallHeightM??tx,{group:s,hasGeometry:o}=ox(e,i,r);return this.building=s,this.hasGeometry=o,o&&this.scene.add(s),o}render(e,t,i){const r=Math.max(1,Math.floor(e)),s=Math.max(1,Math.floor(t));return this.renderer.setSize(r,s,!1),this.camera.aspect=r/s,rx(i,this.camera),this.renderer.render(this.scene,this.camera),this.hasGeometry}dispose(){this.building&&(this.scene.remove(this.building),eu(this.building),this.building=null),this.hasGeometry=!1,this.renderer.dispose()}}const tu=16,lx=22,cx=10;function ux(n){const e=n.querySelector("#canvas"),t=n.querySelector("#status"),i=n.querySelector("#area-badge"),r=n.querySelector("#px-per-m"),s=n.querySelector("#wall-length"),o=n.querySelector("#length-field"),a=n.querySelector("#corner-angle"),l=n.querySelector("#angle-field"),c=n.querySelector("#snap-angle"),u=n.querySelector("#add-door"),h=n.querySelector("#door-width"),d=n.querySelector("#door-field"),f=n.querySelector("#remove-door"),m=n.querySelector("#door-hinge-l"),v=n.querySelector("#door-hinge-r"),g=n.querySelector("#door-swing"),p=n.querySelector("#label-door"),y=n.querySelector("#split-loop"),b=n.querySelector("#partition-draw"),S=n.querySelector("#remove-partition"),A=n.querySelector("#room-type"),C=n.querySelector("#room-type-field"),L=n.querySelector("#room-name"),x=n.querySelector("#room-name-field"),R=n.querySelector("#room-name-presets"),O=n.querySelector("#split-popup"),N=n.querySelector("#split-kicker"),H=n.querySelector("#split-popup-title"),Q=n.querySelector("#split-popup-lead"),te=n.querySelector("#split-option-picks"),z=n.querySelector("#split-cancel"),Y=n.querySelector("#split-apply"),W=n.querySelector("#zoom-in"),ne=n.querySelector("#zoom-out"),re=n.querySelector("#zoom-reset"),ge=n.querySelector("#undo"),_e=n.querySelector("#save"),be=n.querySelector("#export-png"),nt=n.querySelector("#view-3d"),st=document.querySelector("#view3d-overlay"),Ge=document.querySelector("#view3d-canvas"),j=document.querySelector("#view3d-close"),ce=n.querySelector("#load"),se=n.querySelector("#load-file"),Fe=n.querySelector("#reset"),ze=n.querySelector("#tab-draw"),De=n.querySelector("#tab-install"),Mt=n.querySelector("#hud-draw"),Ye=n.querySelector("#hud-install"),it=n.querySelector("#install-delete"),Ze=n.querySelector("#install-rotate-cw"),Ke=n.querySelector("#install-rotate-ccw"),ot=n.querySelector("#install-status"),yt=n.querySelector("#run-finish"),Rt=n.querySelector("#run-cancel"),Lt=n.querySelector("#bom-panel"),mt=n.querySelector("#bom-list"),Et=n.querySelector("#bom-count"),U=n.querySelector("#bom-empty"),Ot=n.querySelector(".stage"),Oe=n.querySelector("#angle-popup"),w=n.querySelector("#angle-popup-lead"),_=n.querySelector("#popup-odd-list"),B=n.querySelector("#popup-main-actions"),V=n.querySelector("#popup-relocate-panel"),X=n.querySelector("#popup-corner-picks"),oe=n.querySelector("#angle-ignore"),ue=n.querySelector("#angle-confirm"),q=n.querySelector("#angle-relocate"),Z=n.querySelector("#angle-relocate-cancel"),ae=n.querySelector("#angle-relocate-apply"),Ae=n.querySelector("#popup-drag-handle"),fe=n.querySelector("#lang-picker"),pe=n.querySelector("#label-wall"),Le=n.querySelector("#label-angle"),Ue=n.querySelector("#label-ppm"),He=n.querySelector("#logo"),D=n.querySelector("#popup-kicker"),de=n.querySelector("#angle-popup-title"),J=n.querySelector("#popup-relocate-hint"),me=n.querySelector("#footer-hint");if(!e||!t||!i||!r||!s||!o||!a||!l||!c||!u||!h||!d||!f||!m||!v||!g||!p||!y||!b||!S||!A||!C||!L||!x||!R||!O||!N||!H||!Q||!te||!z||!Y||!W||!ne||!re||!ge||!_e||!be||!nt||!st||!Ge||!j||!ce||!se||!Fe||!ze||!De||!Mt||!Ye||!it||!Ze||!Ke||!Ot||!Oe||!w||!_||!B||!V||!X||!oe||!ue||!q||!Z||!ae||!Ae||!fe||!pe||!Le||!Ue||!He||!D||!de||!J||!me)throw new Error("HUD/canvas elements missing");const ve=e.getContext("2d");if(!ve)throw new Error("2D context unavailable");let ee=qh(),ie=kl(ee),Ee=0,pt=0,lt=!1,ln=null,cn=!1,Mr=!1,Sr=!1,je=null,en=null,bn=null,Ne=null,gt={...ia},$t=null;const Bt=()=>{const E=Number(r.value);return Number.isFinite(E)&&E>=5?E:50},jr=()=>gt;function Ei(){re.textContent=`${Math.round(gt.scale*100)}%`,re.title="Dubbelklik canvas of Fit = passend maken"}function bi(){const E=[];for(const P of T.model.loops)E.push(...P.vertices);E.push(...T.model.vertices),T.model.draftEnd&&E.push(T.model.draftEnd),E.length?gt=Zh(E,Ee,pt,56):gt={...ia},Ei(),K()}function yr(){if(ie=kl(ee),document.documentElement.lang=ee,document.title=ie.pageTitle,He.textContent=ie.pageTitle,pe.textContent="m",Le.textContent="°",p.textContent="m",Ue.textContent="px/m",c.textContent="45°",c.title=ie.snapTitle,u.textContent="+ Deur",f.textContent="×",m.textContent="L",m.title="Scharnier links (L)",v.textContent="R",v.title="Scharnier rechts (R)",g.textContent="↺",g.title="Draairichting omdraaien",y.textContent="Deel…",y.title=ie.splitLoop,b.textContent=T.model.status==="partition"?"Esc":"✂ Scheiding",b.title="Scheidingswand: klik muur → sleep naar andere muur (45°/90°)",S.textContent="Weg",S.title="Scheidingswand weg → 1 ruimte",ge.textContent="↩",ge.title="Laatste handeling ongedaan (Ctrl+Z)",Fe.textContent="Reset",_e.textContent="Opslaan",ce.textContent="Laden",L&&(L.placeholder="Naam…"),Ae.title=ie.dragTitle,D.textContent=ie.meetfoutKicker,de.textContent=ie.meetfoutTitle,J.textContent=ie.relocateHint,oe.textContent=ie.ignore,ue.textContent=ie.confirm,q.textContent=ie.relocate,Z.textContent=ie.back,ae.textContent=ie.applyHere,me.textContent=ie.hint,fe.querySelectorAll(".lang-btn").forEach(E=>{const P=E.dataset.lang;E.classList.toggle("active",P===ee)}),je&&!Oe.classList.contains("hidden")){w.textContent=ie.meetfoutLead(je.odd.length);const E=T.meetfoutLoopIndex,P=bn??(E!==null?T.model.loops[E]?.vertices:null)??[];_t(P,je.absorbIndex),je.mode==="relocate"&&P.length>=3&&et(P.length,je.absorbIndex??0)}vt(T.model)}function Wi(){fe.innerHTML="";for(const E of Xh){const P=document.createElement("button");P.type="button",P.className="lang-btn"+(E.code===ee?" active":""),P.dataset.lang=E.code,P.textContent=E.flag,P.title=E.name,P.setAttribute("aria-label",E.name),P.addEventListener("click",()=>{ee!==E.code&&(ee=E.code,$h(ee),yr())}),fe.appendChild(P)}}let It=[],tn=[],Tn=null,nn="",An="draw",Ht=null,M=null,I=null,G=null,F=null;const T=new Jd(e,{hitRadius:tu,closeRadius:lx,minLengthPx:cx,getPxPerMeter:Bt,getView:jr,onChange:()=>{vt(T.model),K()},onReject:()=>{lt=!0,K(),ln&&window.clearTimeout(ln),ln=window.setTimeout(()=>{lt=!1,K()},280)},onWallSelected:(E,P)=>{je||(Yt(),pn(),dt(),P&&!s.disabled&&requestAnimationFrame(()=>{s.focus(),s.select()}))},onVertexSelected:(E,P)=>{je||(Yt(),pn(),dt(),P&&!a.disabled&&requestAnimationFrame(()=>{a.focus(),a.select()}))},onDoorSelected:(E,P)=>{je||(Yt(),pn(),dt(),P&&!h.disabled&&requestAnimationFrame(()=>{h.focus(),h.select()}))},onCloseMeetfout:(E,P)=>{St(E,P)}});function xe(){const E=T.model;if(bn&&T.meetfoutLoopIndex!==null&&E.loops[T.meetfoutLoopIndex]){const P=T.meetfoutLoopIndex,$=E.loops.map((le,Se)=>Se===P?{...le,vertices:bn}:le);return{...E,loops:$}}return E}function K(){const E=xe(),P=T.selection;Nh(ve,Ee,pt,E,{pxPerMeter:Bt(),hitRadius:tu,rejectFlash:lt,selectedLoopIndex:P.kind==="wall"||P.kind==="vertex"||P.kind==="door"?P.loopIndex:null,selectedWallIndex:P.kind==="wall"?P.wallIndex:null,selectedVertexIndex:P.kind==="vertex"?P.vertexIndex:null,selectedDoorId:P.kind==="door"?P.doorId:null,popupCornerIndex:je?.mode==="relocate"?je.absorbIndex:je?.odd[0]?.index??null,ghostVertices:je?.mode==="relocate"&&bn&&en?en:null,ghostLoopIndex:T.meetfoutLoopIndex,partitionOptions:Ne?(Ne.mode==="equal"?Ne.cuts:Ne.freeCandidates).map(($,le)=>({a:$.a,b:$.b,label:Ne.mode==="equal"?`÷${Ne.parts}`:String(le+1)})):void 0,partitionHoverIndex:Ne?.mode==="free"?Ne.freeHover:null,partitionPath:T.model.partitionPath,roomBadges:qe(E),installations:An==="install"?It.map($=>({x:$.x,y:$.y,defId:$.defId,selected:$.id===M,rot:$.rot??0})):void 0,runs:An==="install"?tn.map($=>({points:$.points,defId:$.defId,selected:$.id===I})):void 0,runDraft:An==="install"&&F?{points:F.points,cursor:F.cursor,defId:F.defId}:null,view:gt})}function he(){if(!mt||!Lt)return;const E=of(It,tn,Bt());mt.innerHTML="";for(const P of E){const $=document.createElement("li");$.innerHTML=`<span class="bom-code">${P.code}</span><span class="bom-label">${P.label}</span><span class="bom-qty">${Hl(P)}</span>`,mt.appendChild($)}Lt.classList.toggle("has-items",E.length>0),Et&&(Et.textContent=E.length?`(${E.length})`:""),U&&(U.hidden=E.length>0)}function Te(){const E=!!F;yt&&(yt.disabled=!E||F.points.length<2),Rt&&(Rt.disabled=!E)}function we(){if(!F||F.points.length<2)return!1;const E={id:ih(),defId:F.defId,points:F.points.map($=>({...$}))};tn=[...tn,E],I=E.id,M=null,F=null,Te(),Ci(!0);const P=vu(E.points,Bt());if(ot){const $=ri(E.defId);ot.textContent=`${$?.labelNl??"Leiding"}: ${Hl({defId:E.defId,qty:P,unit:"m"})} — nog een tekenen of ander symbool`}return Ti(),he(),K(),!0}function Be(){F=null,Te(),K()}function qe(E){const P=Bt();return E.loops.map(($,le)=>{const Se=jo($.roomTypeId),Xe=iu($.vertices,P),Pt=$.doors?.length??0,{underMinArea:xt,missingDoor:Zn}=Bd(Xe,Pt,Se.minAreaM2,Se.requireDoor,Jt.minDoorsPerRoom),Nt=!xt&&!Zn;let Jn=null;xt?Jn=`<${Se.minAreaM2} m²`:Zn&&(Jn="geen deur");const qi=qd($.name,$.roomTypeId,ee==="en"?"en":"nl");return{loopIndex:le,label:qi,areaText:Er(Xe,2),ok:Nt,warn:Jn}})}function Pe(){A.innerHTML="";for(const E of Jt.types){const P=document.createElement("option");P.value=E.id;const $=E.minAreaM2>0?` (≥${String(E.minAreaM2).replace(".",",")} m²)`:"";P.textContent=`${E.labelNl}${$}`,A.appendChild(P)}}function ct(){R.innerHTML="";for(const E of Xd){const P=document.createElement("option");P.value=E,R.appendChild(P)}}function _t(E,P=null){const $=E.length,le=[];for(let Se=0;Se<$;Se++){const Xe=xi(E,Se,!0),Pt=Xe!==null&&!ur(Xe),xt=P===Se,Zn="popup-angle-row interior"+(Pt?" is-odd":"")+(xt?" is-absorb":""),Nt=`${ie.cornerN(Se+1)}${xt?` · ${ie.residual}`:""}`;le.push(`<div class="${Zn}"><span class="tag">${Nt}</span><strong>${Xe!==null?ks(Xe):"—"}</strong></div>`)}_.innerHTML=le.join("")}function St(E,P){const $=T.model.loops[E];en=$?$.vertices.map(le=>({...le})):null,bn=null,T.meetfoutLoopIndex=E,je={odd:P,mode:"review",absorbIndex:null},w.textContent=ie.meetfoutLead(P.length),_t($?.vertices??[],null),B.classList.remove("hidden"),V.classList.add("hidden"),ut(),Oe.classList.remove("hidden"),P[0]&&T.focusCorner(P[0].index,!1),K()}function ut(){Oe.classList.remove("popup-dragged"),Oe.style.left="16px",Oe.style.top="50%",Oe.style.right="auto",Oe.style.bottom="auto",Oe.style.transform="translateY(-50%)"}function Vt(){let E=!1,P=0,$=0,le=0,Se=0,Xe=null;const Pt=Nt=>{if(Nt.button!==0&&Nt.pointerType==="mouse")return;const Jn=Ot.getBoundingClientRect(),qi=Oe.getBoundingClientRect();le=qi.left-Jn.left,Se=qi.top-Jn.top,Oe.classList.add("popup-dragged"),Oe.style.transform="none",Oe.style.left=`${le}px`,Oe.style.top=`${Se}px`,Oe.style.right="auto",P=Nt.clientX,$=Nt.clientY,E=!0,Xe=Nt.pointerId,Ae.setPointerCapture(Nt.pointerId),Nt.preventDefault()},xt=Nt=>{if(!E||Xe!==null&&Nt.pointerId!==Xe)return;const Jn=Ot.getBoundingClientRect(),qi=Oe.offsetWidth,xd=Oe.offsetHeight;let so=le+(Nt.clientX-P),oo=Se+(Nt.clientY-$);const Md=Math.max(4,Jn.width-qi-4),Sd=Math.max(4,Jn.height-xd-4);so=Math.min(Md,Math.max(4,so)),oo=Math.min(Sd,Math.max(4,oo)),Oe.style.left=`${so}px`,Oe.style.top=`${oo}px`},Zn=Nt=>{if(E&&!(Xe!==null&&Nt.pointerId!==Xe)){E=!1,Xe=null;try{Ae.releasePointerCapture(Nt.pointerId)}catch{}}};Ae.addEventListener("pointerdown",Pt),window.addEventListener("pointermove",xt),window.addEventListener("pointerup",Zn),window.addEventListener("pointercancel",Zn)}function ye(E){if(!en){const P=T.meetfoutLoopIndex,$=P!==null?T.model.loops[P]:null;en=$?$.vertices.map(le=>({...le})):null}en&&(bn=lu(en,E),je&&(je={...je,absorbIndex:E,mode:"relocate"}),_t(bn,E),T.selectedVertexIndex=E,T.selectedWallIndex=null,K())}function rn(){if(!je)return;const E=T.meetfoutLoopIndex,P=E!==null&&T.model.loops[E]?T.model.loops[E].vertices.length:0;if(P<3)return;en||(en=T.model.loops[E].vertices.map(le=>({...le})));const $=je.odd[0]?.index??0;je={...je,mode:"relocate",absorbIndex:$},B.classList.add("hidden"),V.classList.remove("hidden"),et(P,$),ye($),ae.disabled=!1}function et(E,P){const $=en??(T.meetfoutLoopIndex!==null?T.model.loops[T.meetfoutLoopIndex]?.vertices:null)??[],le=new Set(el($));X.innerHTML="";for(let Se=0;Se<E;Se++){const Xe=document.createElement("button");Xe.type="button",Xe.className="corner-pick"+(Se===P?" active":"")+(le.has(Se)?" odd":""),Xe.textContent=String(Se+1),Xe.title=ie.hoverCorner(Se+1),Xe.addEventListener("pointerenter",()=>{!je||je.mode!=="relocate"||(ye(Se),X.querySelectorAll(".corner-pick").forEach((Pt,xt)=>{Pt.classList.toggle("active",xt===Se)}))}),Xe.addEventListener("click",()=>{je&&(ye(Se),X.querySelectorAll(".corner-pick").forEach((Pt,xt)=>{Pt.classList.toggle("active",xt===Se)}),ae.disabled=!1)}),X.appendChild(Xe)}}function un(){en=null,bn=null}function Gt(){Oe.classList.add("hidden"),B.classList.remove("hidden"),V.classList.add("hidden"),je=null,un(),Yt(),pn(),dt(),vt(T.model),K()}function dt(){const E=T.getSelectedDoor();Sr=!0;const P=T.selection.kind==="wall"&&T.selection.loopIndex!==null;u.disabled=!P;const $=T.selectedLoopIndex();y.disabled=$===null||(T.model.loops[$]?.vertices.length??0)<3,b.disabled=$===null||(T.model.loops[$]?.vertices.length??0)<3;let le=!1;T.selection.kind==="wall"&&T.selection.loopIndex!==null&&(le=zs(T.model.loops,T.selection.loopIndex,T.selection.wallIndex)!==null),S.disabled=!le;const Se=$!==null;if(A.disabled=!Se,L.disabled=!Se,Se){const Xe=T.model.loops[$];A.value=Xe.roomTypeId??Jt.defaultTypeId,L.value=Xe.name??"",C.classList.add("active"),x.classList.add("active")}else C.classList.remove("active"),x.classList.remove("active"),L.value="";E?(h.disabled=!1,f.disabled=!1,m.disabled=!1,v.disabled=!1,g.disabled=!1,h.value=E.widthM.toFixed(2),d.classList.add("active"),m.classList.toggle("active",(E.hinge??"L")==="L"),v.classList.toggle("active",(E.hinge??"L")==="R")):(h.value="",h.disabled=!0,f.disabled=!0,m.disabled=!0,v.disabled=!0,g.disabled=!0,d.classList.remove("active")),Sr=!1}function ui(){if(je)return;const E=T.selectedLoopIndex();if(E===null)return;const P=T.getEqualDivisionPlan(E,2,"auto"),$=T.getPartitionCandidates(E);if(!P&&$.length===0){t.textContent=ie.splitNone;return}Ne={loopIndex:E,parts:2,axis:P?.axis??"auto",cuts:P?.cuts??[],freeCandidates:$,mode:P?"equal":"free",freeHover:$.length?0:null},N.textContent=ie.splitKicker,H.textContent=ie.splitTitle,z.textContent=ie.splitCancel,Y.textContent=ie.splitApply,Y.disabled=!1,sn(),O.classList.remove("hidden"),O.classList.remove("popup-dragged"),O.style.left="16px",O.style.top="50%",O.style.transform="translateY(-50%)",t.textContent=ie.statusSplitParts(2),K()}function ht(E){if(!Ne)return;const P=T.getEqualDivisionPlan(Ne.loopIndex,E,"auto");if(!P){t.textContent=ie.splitNone;return}Ne={...Ne,parts:E,axis:P.axis,cuts:P.cuts,mode:"equal",freeHover:null},Y.disabled=!1,t.textContent=ie.statusSplitParts(E),sn(),K()}function bt(){if(!Ne||Ne.mode!=="equal")return;const E=Ne.axis==="x"?"y":"x",P=T.getEqualDivisionPlan(Ne.loopIndex,Ne.parts,E);if(!P){t.textContent=ie.splitNone;return}Ne={...Ne,axis:P.axis,cuts:P.cuts},sn(),K()}function sn(){if(!Ne)return;Q.textContent=ie.splitLeadEqual,te.innerHTML="";for(const P of[2,3,4]){const $=document.createElement("button");$.type="button",$.className="corner-pick"+(Ne.mode==="equal"&&Ne.parts===P?" active":""),$.textContent=`÷${P}`,$.title=ie.splitByN(P),$.addEventListener("click",()=>ht(P)),$.addEventListener("pointerenter",()=>{if(!Ne)return;const le=T.getEqualDivisionPlan(Ne.loopIndex,P,"auto");le&&(Ne={...Ne,parts:P,axis:le.axis,cuts:le.cuts,mode:"equal"},t.textContent=ie.statusSplitParts(P),sn(),K())}),te.appendChild($)}const E=document.createElement("button");if(E.type="button",E.className="corner-pick",E.textContent=Ne.axis==="x"?"↕":Ne.axis==="y"?"↔":"↻",E.title=ie.splitFlipAxis,E.addEventListener("click",()=>bt()),te.appendChild(E),Ne.freeCandidates.length>0){const P=document.createElement("span");P.className="popup-hint",P.style.flexBasis="100%",P.textContent=ie.splitFree,te.appendChild(P),Ne.freeCandidates.forEach(($,le)=>{const Se=document.createElement("button");Se.type="button",Se.className="corner-pick"+(Ne.mode==="free"&&Ne.freeHover===le?" active":""),Se.textContent=String(le+1),Se.title=`${$.wallA+1}↔${$.wallB+1}`,Se.addEventListener("pointerenter",()=>{Ne&&(Ne={...Ne,mode:"free",freeHover:le},t.textContent=ie.statusSplit(le+1),sn(),K())}),Se.addEventListener("click",()=>{Ne&&(Ne={...Ne,mode:"free",freeHover:le},Y.disabled=!1,sn(),K())}),te.appendChild(Se)})}}function rt(){O.classList.add("hidden"),Ne=null,K()}function Dn(){if(!Ne)return;const E=Ne.loopIndex;if(Ne.mode==="equal"){const P=Ne.parts,$=Ne.axis==="auto"?"auto":Ne.axis;if(rt(),!T.splitLoopEqualParts(E,P,$))return}else{const P=Ne.freeHover;if(P===null)return;const $=Ne.freeCandidates[P];if(!$||(rt(),!T.splitLoopWithPartition(E,$)))return}dt(),vt(T.model),K()}function Kn(){if(Sr||T.selection.kind!=="door")return;const E=Number(h.value.replace(",","."));if(!T.applyDoorWidthM(E)){dt();return}dt(),vt(T.model),K()}function Yt(){const E=T.getSelectedSegment();if(cn=!0,!E)s.value="",s.disabled=!0,o.classList.remove("active");else{const P=ru(E.a,E.b,Bt());s.disabled=!1,s.value=P.toFixed(2),o.classList.add("active")}cn=!1}function pn(){const E=T.getSelectedCornerAngle();Mr=!0,E===null?(a.value="",a.disabled=!0,c.disabled=!0,l.classList.remove("active","warn")):(a.disabled=!1,c.disabled=!1,a.value=E.toFixed(1),l.classList.add("active"),l.classList.toggle("warn",!ur(E))),Mr=!1}function Tl(){if(cn||T.selection.kind!=="wall")return;const E=Number(s.value.replace(",","."));if(!T.applyWallLengthM(E)){Yt();return}Yt(),vt(T.model),K()}function Al(){if(Mr)return;const E=Number(a.value.replace(",","."));if(!Number.isFinite(E)){pn();return}if(!T.applyCornerAngle(E)){pn();return}pn(),vt(T.model),K()}function vt(E){const P=Bt(),$=T.selection.kind==="wall",le=T.selection.kind==="vertex",Se=T.selection.kind==="door",Xe=E.loops.length,Pt=wd(E.loops,P);if(Xe>0){const xt=Er(Pt);i.textContent=Xe===1?xt:`${Xe}× · ${xt}`,i.classList.remove("hidden")}else i.classList.add("hidden");if(Se){const xt=T.getSelectedDoor();if(xt){const Zn=(xt.hinge??"L")==="L"?"L":"R",Nt=(xt.swing??1)>0?"↺":"↻";t.textContent=ie.statusDoorDetail(`${xt.widthM.toFixed(2)} m`,Zn,Nt)}else t.textContent=ie.statusDoor("—");return}if(le){const xt=T.getSelectedCornerAngle();t.textContent=xt!==null?ie.statusCorner(ks(xt))+(Xe?` · ${Er(Pt)}`:""):ie.statusCorner("—");return}if($){t.textContent=Xe>0?ie.statusClosedWall(Er(Pt)):ie.statusWallSelected;return}if(E.status==="drawing"){t.textContent=ie.statusDrawing;return}if(E.vertices.length>=2){t.textContent=ie.statusOpen(E.vertices.length-1);return}if(Xe>0){t.textContent=ie.statusClosed(Er(Pt));return}t.textContent=ie.statusEmpty}function to(){const E=Ot.getBoundingClientRect();Ee=Math.max(320,Math.floor(E.width)),pt=Math.max(320,Math.floor(E.height)),Dh(e,Ee,pt),K()}oe.addEventListener("click",()=>Gt()),ue.addEventListener("click",()=>Gt()),q.addEventListener("click",()=>rn()),Z.addEventListener("click",()=>{if(!je)return;bn=null,je={...je,mode:"review",absorbIndex:null},B.classList.remove("hidden"),V.classList.add("hidden");const E=T.meetfoutLoopIndex,P=E!==null?T.model.loops[E]?.vertices??[]:[];_t(P),K()}),ae.addEventListener("click",()=>{const E=je?.absorbIndex;if(E==null)return;const P=T.absorbMeetfoutAt(E);Gt(),P&&(t.textContent=ie.statusMeetfoutAt(E+1))}),ge.addEventListener("click",()=>{je&&Gt(),Ne&&rt(),T.undo(),Yt(),pn(),dt(),vt(T.model),K()});const dd=Qh;function hd(){return Ls(nn||"Plan",T.model,Bt(),It,Tn??void 0,tn)}function fd(E){return!E?.model||!Array.isArray(E.model.loops)?!1:(typeof E.pxPerMeter=="number"&&E.pxPerMeter>0&&(r.value=String(Math.round(E.pxPerMeter))),T.loadModel(E.model),It=E.installations??[],tn=E.runs??[],F=null,I=null,M=null,Tn=E.id,nn=E.name,je&&Gt(),Ne&&rt(),Yt(),pn(),dt(),vt(T.model),Te(),he(),K(),n.dispatchEvent(new Event("install-refresh")),!0)}function pd(E){const P=tf(E);return P?fd(P):!1}function Ti(){try{localStorage.setItem(dd,JSON.stringify(hd()))}catch{}}function md(){K();const E=e,P=document.createElement("canvas");P.width=E.width,P.height=E.height;const $=P.getContext("2d");if(!$)return;$.fillStyle="#0f1419",$.fillRect(0,0,P.width,P.height),$.drawImage(E,0,0);const le=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-"),Se=document.createElement("a");Se.href=P.toDataURL("image/png"),Se.download=`wand-m2-${le}.png`,Se.click(),t.textContent="PNG geëxporteerd"}_e.addEventListener("click",()=>{const E=n.querySelector("#plan-name"),P=E?.value.trim()??"";if(P&&(nn=P),!nn.trim()){const Pt=new Date;nn=`Plan ${Pt.toLocaleDateString("nl-NL")} ${Pt.toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"})}`,E&&(E.value=nn)}const $=Ls(nn,T.model,Bt(),It,Tn??void 0,tn);Tn=$.id,nn=$.name,zl($),Ti();const le=new Blob([JSON.stringify($,null,2)],{type:"application/json"}),Se=document.createElement("a"),Xe=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");Se.href=URL.createObjectURL(le),Se.download=`wand-m2-${Xe}.json`,Se.click(),URL.revokeObjectURL(Se.href),t.textContent=`Opgeslagen in bibliotheek: ${$.name}`}),be.addEventListener("click",()=>md());let xn=$o(T.model,Bt()),di=null,Ai=null;const Dt=new Set;let wi=0;function Xi(){if(!di)return;const E=Ge.getBoundingClientRect(),P=Math.max(1,Math.floor(E.width)),$=Math.max(1,Math.floor(E.height));di.render(P,$,xn)}function wl(){if(st.classList.contains("hidden")){wi=0;return}const P=.07*(Dt.has("shift")?2.2:1);let $=0,le=0,Se=0;(Dt.has("w")||Dt.has("arrowup"))&&($+=P),(Dt.has("s")||Dt.has("arrowdown"))&&($-=P),(Dt.has("d")||Dt.has("arrowright"))&&(le+=P),(Dt.has("a")||Dt.has("arrowleft"))&&(le-=P),(Dt.has("e")||Dt.has(" "))&&(Se+=P*.7),(Dt.has("q")||Dt.has("control"))&&(Se-=P*.7),($||le||Se)&&(xn=Qc(xn,$,le,Se)),Xi(),wi=requestAnimationFrame(wl)}function gd(){xn=$o(T.model,Bt()),di?.dispose(),di=new ax(Ge),di.rebuild(T.model,{pxPerMeter:Bt(),wallHeightM:2.5}),st.classList.remove("hidden"),Dt.clear(),Xi(),wi||(wi=requestAnimationFrame(wl)),t.textContent="3D lopen: WASD · sleep om te kijken · Q/E hoogte · Shift sneller · scroll FOV · Esc",Ge.tabIndex=0,Ge.focus()}function no(){st.classList.add("hidden"),Ai=null,Dt.clear(),wi&&(cancelAnimationFrame(wi),wi=0),di?.dispose(),di=null}nt.addEventListener("click",()=>gd()),j.addEventListener("click",()=>no()),n.querySelector("#view3d-reset")?.addEventListener("click",()=>{xn=$o(T.model,Bt()),di?.rebuild(T.model,{pxPerMeter:Bt(),wallHeightM:2.5}),Xi()}),st.addEventListener("click",E=>{E.target===st&&no()}),window.addEventListener("keydown",E=>{if(st.classList.contains("hidden"))return;if(E.key==="Escape"){E.preventDefault(),no();return}const P=E.key.toLowerCase();(P==="w"||P==="a"||P==="s"||P==="d"||P==="q"||P==="e"||P===" "||P==="shift"||P==="control"||E.key==="ArrowUp"||E.key==="ArrowDown"||E.key==="ArrowLeft"||E.key==="ArrowRight")&&(E.preventDefault(),Dt.add(P===" "?" ":P),E.key.startsWith("Arrow")&&Dt.add(E.key.toLowerCase()))}),window.addEventListener("keyup",E=>{if(st.classList.contains("hidden"))return;const P=E.key.toLowerCase();Dt.delete(P),Dt.delete(E.key.toLowerCase()),E.key===" "&&Dt.delete(" ")}),Ge.addEventListener("pointerdown",E=>{E.button===0&&(Ai={x:E.clientX,y:E.clientY},Ge.setPointerCapture(E.pointerId),Ge.focus())}),Ge.addEventListener("pointermove",E=>{if(!Ai)return;const P=E.clientX-Ai.x,$=E.clientY-Ai.y;Ai={x:E.clientX,y:E.clientY},xn=ix(xn,P*.005,-$*.005),Xi()}),Ge.addEventListener("pointerup",E=>{Ai=null;try{Ge.releasePointerCapture(E.pointerId)}catch{}}),Ge.addEventListener("wheel",E=>{if(!st.classList.contains("hidden")){if(E.preventDefault(),E.ctrlKey){const P=E.deltaY>0?-.25:.25;xn=Qc(xn,P,0,0)}else{const P=E.deltaY>0?3:-3;xn={...xn,fovDeg:Math.max(40,Math.min(100,xn.fovDeg+P))}}Xi()}},{passive:!1}),window.addEventListener("resize",()=>{st.classList.contains("hidden")||Xi()}),ce.addEventListener("click",()=>se.click()),se.addEventListener("change",async()=>{const E=se.files?.[0];if(se.value="",!!E)try{const P=await E.text(),$=JSON.parse(P);if(!pd($)){t.textContent="Ongeldig bestand";return}const le=Ls(nn||E.name.replace(/\.json$/i,"")||"Geïmporteerd",T.model,Bt(),It,Tn??void 0,tn);Tn=le.id,nn=le.name,zl(le),Ti(),t.textContent=`Geladen + in bibliotheek: ${le.name}`}catch{t.textContent="Laden mislukt"}});function Cl(E){An=E;const P=E==="draw";ze.classList.toggle("active",P),De.classList.toggle("active",!P),ze.setAttribute("aria-selected",P?"true":"false"),De.setAttribute("aria-selected",P?"false":"true"),Mt.classList.toggle("hidden",!P),Ye.classList.toggle("hidden",P),T.enabled=P,Ht=null,M=null,I=null,G=null,Be(),io.setActiveTool(null),it.disabled=!0,Ze.disabled=!0,Ke.disabled=!0,ot&&(ot.textContent=P?"":"Symbool plaatsen · leiding (menu) = lijn tekenen · Bestellijst onderaan"),P||he(),to(),K()}ze.addEventListener("click",()=>Cl("draw")),De.addEventListener("click",()=>Cl("install"));const io=nf(n,{getActivePlanMeta:()=>({id:Tn,name:nn}),setActivePlanMeta:(E,P)=>{Tn=E,nn=P},onSelectTool:E=>{if(Ht=E,M=null,I=null,F&&F.defId!==E&&Be(),it.disabled=!0,Ze.disabled=!0,Ke.disabled=!0,ot){const P=E?ri(E):null;P&&br(E)?ot.textContent=`${P.labelNl}: klik punten · ✓ Klaar / Enter · Esc annuleer`:P?ot.textContent=`Plaatsen: ${P.labelNl} — klik op de tekening`:ot.textContent="Symbool of leiding kiezen · Bestellijst toont stuks + meters"}K()},onSave:()=>{_e.click()}});function Rl(E){const P=e.getBoundingClientRect(),$=E.clientX-P.left,le=E.clientY-P.top;return{x:($-gt.ox)/gt.scale,y:(le-gt.oy)/gt.scale}}function _d(E){const P=rh/Math.max(.25,gt.scale);let $=null,le=P;for(const Se of It){const Xe=Math.hypot(Se.x-E.x,Se.y-E.y);Xe<=le&&(le=Xe,$=Se.id)}return $}function vd(E){const P=sh/Math.max(.25,gt.scale);let $=null,le=P;for(const Se of tn){const Xe=rf(E,Se.points);Xe<=le&&(le=Xe,$=Se.id)}return $}e.addEventListener("pointerdown",E=>{if(An!=="install"||E.button!==0&&E.pointerType==="mouse")return;const P=Rl(E),$=_d(P);if($&&!br(Ht)){M=$,I=null;const le=It.find(Se=>Se.id===$);G={id:$,ox:P.x-le.x,oy:P.y-le.y},Ht=null,io.setActiveTool(null),Be(),Ci(!0),e.setPointerCapture(E.pointerId),K();return}if(!F){const le=vd(P);if(le&&!br(Ht)){I=le,M=null,Ht=null,io.setActiveTool(null),Ci(!0),K();return}}if(Ht&&br(Ht)){if(!F||F.defId!==Ht)F={defId:Ht,points:[{...P}],cursor:null};else{const le=F.points[F.points.length-1];Math.hypot(le.x-P.x,le.y-P.y)>2&&(F={...F,points:[...F.points,{...P}],cursor:null})}if(I=null,M=null,Te(),Ci(!1),ot){const le=ri(Ht),Se=F.points.length;ot.textContent=`${le?.labelNl??"Leiding"}: ${Se} punt${Se===1?"":"en"} · klik verder · ✓ Klaar`}K();return}if(Ht){const le={id:th(),defId:Ht,x:P.x,y:P.y,loopId:null,note:"",rot:0};It=[...It,le],M=le.id,I=null,Ci(!0),Ti(),he(),K()}}),e.addEventListener("pointermove",E=>{if(An!=="install")return;const P=Rl(E);if(G){It=It.map($=>$.id===G.id?{...$,x:P.x-G.ox,y:P.y-G.oy}:$),K();return}F&&(F={...F,cursor:P},K())}),e.addEventListener("pointerup",E=>{if(An==="install"&&G){G=null,Ti(),he();try{e.releasePointerCapture(E.pointerId)}catch{}}}),e.addEventListener("dblclick",E=>{An!=="install"||!F||(E.preventDefault(),we())}),yt?.addEventListener("click",()=>we()),Rt?.addEventListener("click",()=>{if(Be(),ot&&br(Ht)){const E=ri(Ht);ot.textContent=`${E?.labelNl??"Leiding"}: klik startpunt`}});function Ci(E){const P=!!M;it.disabled=!E,Ze.disabled=!P,Ke.disabled=!P}function es(E){M&&(It=It.map(P=>{if(P.id!==M)return P;const $=(((P.rot??0)+E)%360+360)%360;return{...P,rot:$}}),Ti(),K())}Ze.addEventListener("click",()=>es(45)),Ke.addEventListener("click",()=>es(-45)),window.addEventListener("keydown",E=>{if(An!=="install")return;const P=E.target;if(!(P&&(P.tagName==="INPUT"||P.tagName==="SELECT"||P.tagName==="TEXTAREA"))){if(F){if(E.key==="Enter"){E.preventDefault(),we();return}if(E.key==="Escape"){E.preventDefault(),Be();return}}if(!(!M&&!I))if(E.key==="e"||E.key==="E"){if(!M)return;E.preventDefault(),es(45)}else if(E.key==="q"||E.key==="Q"){if(!M)return;E.preventDefault(),es(-45)}else(E.key==="Delete"||E.key==="Backspace")&&(E.preventDefault(),it.click())}}),it.addEventListener("click",()=>{if(M)It=It.filter(E=>E.id!==M),M=null;else if(I)tn=tn.filter(E=>E.id!==I),I=null;else return;Ci(!1),Ti(),he(),K()}),Fe.addEventListener("click",()=>{je&&Gt(),Ne&&rt(),T.reset(),It=[],tn=[],F=null,Tn=null,nn="",M=null,I=null,Ht=null,Ci(!1),Te(),he();const E=n.querySelector("#plan-name");E&&(E.value=""),Yt(),pn(),dt(),vt(T.model),K()}),r.addEventListener("change",()=>{Yt(),vt(T.model),K()}),r.addEventListener("input",()=>{Yt(),vt(T.model),K()}),s.addEventListener("change",()=>Tl()),s.addEventListener("keydown",E=>{E.key==="Enter"&&(E.preventDefault(),Tl(),s.blur())}),a.addEventListener("change",()=>Al()),a.addEventListener("keydown",E=>{E.key==="Enter"&&(E.preventDefault(),Al(),a.blur())}),c.addEventListener("click",()=>{T.snapSelectedCornerCanonical()&&(pn(),vt(T.model),K())}),u.addEventListener("click",()=>{T.addDoorOnSelectedWall()&&(dt(),vt(T.model),K())}),f.addEventListener("click",()=>{T.removeSelectedDoor()&&(dt(),vt(T.model),K())}),m.addEventListener("click",()=>{T.setSelectedDoorHinge("L")&&(dt(),vt(T.model),K())}),v.addEventListener("click",()=>{T.setSelectedDoorHinge("R")&&(dt(),vt(T.model),K())}),g.addEventListener("click",()=>{T.flipSelectedDoorSwing()&&(dt(),vt(T.model),K())}),y.addEventListener("click",()=>ui()),b.addEventListener("click",()=>{if(T.model.status==="partition"){T.cancelPartitionDraw(),t.textContent=ie.statusIdle,K();return}T.beginPartitionDraw()&&(t.textContent=ie.statusPartitionDraw,K())}),S.addEventListener("click",()=>{T.selection.kind!=="wall"||T.selection.loopIndex===null||T.deleteSharedWall(T.selection.loopIndex,T.selection.wallIndex)&&(dt(),vt(T.model),K())}),A.addEventListener("change",()=>{const E=A.value;if(!T.setSelectedRoomType(E))return;const P=T.selectedLoopIndex();if(P!==null&&!T.model.loops[P].name){const le=jo(E);T.setSelectedRoomName(le.labelNl),L.value=le.labelNl}dt(),vt(T.model),K()}),L.addEventListener("change",()=>{T.setSelectedRoomName(L.value)&&(vt(T.model),K())}),L.addEventListener("keydown",E=>{E.key==="Enter"&&(E.preventDefault(),L.blur())}),z.addEventListener("click",()=>{rt(),vt(T.model)}),Y.addEventListener("click",()=>Dn());function ro(E,P,$){const le=P??Ee/2,Se=$??pt/2;gt=Kh(gt,le,Se,E),Ei(),K()}W.addEventListener("click",()=>ro(1.25)),ne.addEventListener("click",()=>ro(1/1.25)),re.addEventListener("click",()=>bi()),e.addEventListener("wheel",E=>{E.preventDefault();const P=e.getBoundingClientRect(),$=E.clientX-P.left,le=E.clientY-P.top,Se=Jh(E.deltaY,E.deltaMode);ro(Se,$,le)},{passive:!1}),e.addEventListener("dblclick",E=>{E.preventDefault(),bi()});let ts=!1;window.addEventListener("keydown",E=>{if(E.code==="Space"&&!E.repeat&&(ts=!0,e.style.cursor="grab"),E.key==="Escape"&&T.model.status==="partition"&&(T.cancelPartitionDraw(),vt(T.model),K()),(E.ctrlKey||E.metaKey)&&(E.key==="z"||E.key==="Z")&&!E.shiftKey){const P=E.target;if(P&&(P.tagName==="INPUT"||P.tagName==="TEXTAREA"||P.isContentEditable))return;E.preventDefault(),je&&Gt(),Ne&&rt(),T.undo(),Yt(),pn(),dt(),vt(T.model),K()}if(E.key==="Delete"||E.key==="Backspace"){const P=E.target;if(P&&(P.tagName==="INPUT"||P.tagName==="TEXTAREA"||P.isContentEditable))return;E.preventDefault(),T.deleteLine()&&(dt(),vt(T.model),K())}}),window.addEventListener("keyup",E=>{E.code==="Space"&&(ts=!1,e.style.cursor="")}),e.addEventListener("pointerdown",E=>{(E.button===1||E.button===0&&(E.altKey||ts))&&(E.preventDefault(),$t={x:E.clientX,y:E.clientY,ox:gt.ox,oy:gt.oy},e.style.cursor="grabbing",e.setPointerCapture(E.pointerId))}),e.addEventListener("pointermove",E=>{$t&&(gt={scale:gt.scale,ox:$t.ox+(E.clientX-$t.x),oy:$t.oy+(E.clientY-$t.y)},K())}),e.addEventListener("pointerup",E=>{if($t){$t=null,e.style.cursor=ts?"grab":"";try{e.releasePointerCapture(E.pointerId)}catch{}}}),e.addEventListener("contextmenu",E=>E.preventDefault());const wn=new Map;let Nn=null;e.addEventListener("pointerdown",E=>{if(E.pointerType==="touch"&&(wn.set(E.pointerId,{x:E.clientX,y:E.clientY}),wn.size===2)){const P=[...wn.values()],$=P[0].x-P[1].x,le=P[0].y-P[1].y,Se=e.getBoundingClientRect();Nn={dist:Math.hypot($,le)||1,scale:gt.scale,cx:(P[0].x+P[1].x)/2-Se.left,cy:(P[0].y+P[1].y)/2-Se.top}}}),e.addEventListener("pointermove",E=>{if(wn.has(E.pointerId)&&(wn.set(E.pointerId,{x:E.clientX,y:E.clientY}),wn.size===2&&Nn)){const P=[...wn.values()],$=P[0].x-P[1].x,le=P[0].y-P[1].y,Xe=(Math.hypot($,le)||1)/Nn.dist,Pt=Math.min(8,Math.max(.2,Nn.scale*Xe)),xt={x:(Nn.cx-gt.ox)/gt.scale,y:(Nn.cy-gt.oy)/gt.scale};gt={scale:Pt,ox:Nn.cx-xt.x*Pt,oy:Nn.cy-xt.y*Pt},Ei(),K()}}),e.addEventListener("pointerup",E=>{wn.delete(E.pointerId),wn.size<2&&(Nn=null)}),e.addEventListener("pointercancel",E=>{wn.delete(E.pointerId),wn.size<2&&(Nn=null)}),h.addEventListener("change",()=>Kn()),h.addEventListener("keydown",E=>{E.key==="Enter"&&(E.preventDefault(),Kn(),h.blur())}),window.addEventListener("resize",to),Vt(),Wi(),Pe(),ct(),yr(),Ei(),to(),vt(T.model),Yt(),pn(),dt()}const ud=document.querySelector("#app");if(!ud)throw new Error("#app not found");ux(ud);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wand-m2/sw.js").catch(()=>{})});
