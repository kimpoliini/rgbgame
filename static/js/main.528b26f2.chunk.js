(this.webpackJsonprgbgame=this.webpackJsonprgbgame||[]).push([[0],[,,,,,,,,,,,,function(e,t,c){},function(e,t,c){},,,,,,,function(e,t,c){},function(e,t,c){},,function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),r=c(14),i=c.n(r),s=(c(20),c(2)),o=(c(21),c(6)),l=c(11),u=c(15),f=(c(12),[{name:"Triangle",baseRps:.2,basePrice:[30,0,0],price:[30,0,0],count:0,vertices:3,image:"/assets/generators/triangle.png",imageAnim:"/assets/generators/triangle-anim.gif"},{name:"Square",baseRps:1,basePrice:[200,0,0],price:[200,0,0],count:0,vertices:4,image:"/assets/generators/square.png",imageAnim:"/assets/generators/square-anim.gif"},{name:"Pentagon",baseRps:3,basePrice:[0,3,0],price:[0,3,0],count:0,vertices:5,image:"/assets/generators/pentagon.png",imageAnim:"/assets/generators/pentagon-anim.gif"},{name:"Hexagon",baseRps:15,basePrice:[0,18,0],price:[0,18,0],count:0,vertices:6,image:"/assets/generators/hexagon.png",imageAnim:"/assets/generators/hexagon-anim.gif"},{name:"Septagon",baseRps:50,basePrice:[0,80,0],price:[0,80,0],count:0,vertices:7,image:"/assets/generators/septagon.png",imageAnim:"/assets/generators/septagon-anim.gif"},{name:"Octagon",baseRps:125,basePrice:[0,0,1],price:[0,0,1],count:0,vertices:8,image:"/assets/generators/octagon.png",imageAnim:"/assets/generators/octagon-anim.gif"},{name:"Pyramid",baseRps:750,basePrice:[0,0,5],price:[0,0,5],count:0,vertices:5,image:"/assets/generators/pyramid.png",imageAnim:"/assets/generators/pyramid-anim.gif"},{name:"Cube",baseRps:3e3,basePrice:[0,0,24],price:[0,0,24],count:0,vertices:8,image:"/assets/generators/cube.png",imageAnim:"/assets/generators/cube-anim.gif"},{name:"Dodecahedron",baseRps:12e3,basePrice:[0,0,100],price:[0,0,100],count:0,vertices:20,image:"/assets/generators/dodecahedron.png",imageAnim:"/assets/generators/dodecahedron-anim.gif"}]),p=[{threshold:10,bonus:1.1},{threshold:25,bonus:1.2},{threshold:50,bonus:1.25},{threshold:75,bonus:1.1},{threshold:100,bonus:1.5},{threshold:150,bonus:1.2},{threshold:200,bonus:1.5},{threshold:250,bonus:1.2},{threshold:300,bonus:1.25},{threshold:400,bonus:1.25},{threshold:500,bonus:1.25}],d=[{title:"Enable animations",tooltip:"Enable animations like Generators spinning when hovering over them",type:"switch",value:!0},{title:"Enable click effect",tooltip:"Enables a graphical effect when clicking",type:"switch",value:!0},{title:"Click effect",tooltip:"What effect to be shown when clicking",type:"dropdown",typeValues:["ripple","material ripple","splash"],value:"material ripple"},{title:"Enable click text",tooltip:"Enables the the text shown when clicking",type:"switch",value:!0},{title:"Show stats on-screen",tooltip:"Show statistics like total multiplier, vertice count, amount of upgrades purchased etc. on the main screen",type:"switch",value:!1},{title:"Framerate",tooltip:"How many times numbers are calculated each second. Does not affect RPS. High values might have a negative impact on performance",type:"dropdown",typeValues:[144,120,75,60,30,15,10,5,1],value:30},{title:"Background color update frequency",tooltip:"How many times the background color refreshes each second. Values higher than 5 might have a negative impact on performance",type:"dropdown",typeValues:[10,5,2,1],value:5},{title:"Reset game",tooltip:"Resets your progress, not just prestige. Make sure you want to do this before continuing!",type:"button",value:"reset"}],b=function(e){for(var t=[parseFloat(e.toFixed(2)),0,0,0],c=0;c<3;c++)if(t[c]>=256){var n=Math.floor(t[c]/256);t[c+1]=n,t[c]%=256}return t},m=function(e){for(var t=4;t>0&&0!==t;t--)e[t]>0&&(e[t-1]+=256*e[t],e[t]=0);return e[0]},h=function(e,t){var c=m(t),n=m(e);return n>=c?b(n-=c):(console.log("cannot afford!!!"),null)},j=["K","M","B","T","Qa","Qi","Sx","Sp","O","N","D"];function g(e){if(e>=1e3){var t=Math.floor(Math.log10(e)),c=Math.floor(t/3)-1,n=(e/Math.pow(10,t-t%3)).toFixed(3);return"".concat(n," ").concat(j[c])}return e}var v=c(0),O=function(e){var t=e.onClick,c=e.genId,a=Object(n.useState)(f[c]),r=Object(s.a)(a,2),i=r[0],o=(r[1],Object(n.useState)(0)),l=Object(s.a)(o,2),u=l[0],b=l[1],m=Object(n.useState)(0),h=Object(s.a)(m,2),j=h[0],O=h[1],x=Object(n.useState)(i.image),k=Object(s.a)(x,2),y=k[0],M=k[1];function S(){for(var e in p){var t=p[e].threshold,c=0;if(e>0&&(c=p[e-1].threshold),i.count<t){var n=(i.count-c)/(t-c)%t*100;b(n),O(e);break}}}return Object(n.useEffect)((function(){S()}),[]),Object(v.jsxs)("div",{id:"generator-".concat(c),className:"side-menu-item cannot-afford",onClick:function(){t(),S()},onMouseEnter:function(){d[0].value&&(document.querySelector("#generator-".concat(c)).classList.contains("cannot-afford")||M(i.imageAnim))},onMouseLeave:function(){return M(i.image)},children:[Object(v.jsx)("h5",{children:i.name}),Object(v.jsxs)("div",{children:[Object(v.jsxs)("p",{children:["+",i.rps?g(i.rps.toFixed(2)):i.baseRps,"/s"]}),Object(v.jsxs)("p",{children:["(",i.count>0?g((i.rps*i.count).toFixed(2)):"0","/s)"]}),Object(v.jsxs)("div",{className:"generator-price",children:[Object(v.jsx)("span",{children:i.price[0]}),Object(v.jsx)("span",{children:i.price[1]}),Object(v.jsx)("span",{children:i.price[2]})]}),Object(v.jsxs)("div",{className:"generator-count",children:[Object(v.jsx)("span",{children:i.count}),Object(v.jsx)("div",{className:"generator-count-bar",style:{width:"".concat(u,"%")}}),Object(v.jsxs)("span",{className:"next-level-bonus",children:["+",(100*(p[j].bonus-1)).toFixed(0),"%"]})]})]}),Object(v.jsx)("img",{className:"generator-image",src:"/rgbgame"+y,alt:i.name}),Object(v.jsx)("div",{className:"prevent-flicker"})]})},x=[{name:"Paint brush",description:"Adds +1 red to your clicks",maxRanks:10,price:[100,0,0],effect:1,effectModifier:"add",type:"click"},{name:"Paint bucket",description:"Adds +0.1 red to your clicks for each vertex acquired",maxRanks:5,price:[0,10,0],effect:.1,effectModifier:"add",type:"vertex.click"},{name:"Vertex extraction",description:"Gains +0.1% RPS for each vertex owned",maxRanks:10,price:[0,10,0],effect:.001,effectModifier:"add",type:"vertex.rps"},{name:"Brighter colors",description:"You gain +10% rps",price:[100,1,0],effect:1.1,effectModifier:"multiply",type:"rps"},{name:"Higher saturation",description:"You gain +10% rps",price:[0,3,0],effect:1.1,effectModifier:"multiply",type:"rps"},{name:"Redder reds",description:"You gain +15% rps",price:[0,8,0],effect:1.15,effectModifier:"multiply",type:"rps"},{name:"Bluer blues",description:"You gain +15% rps",price:[0,25,0],effect:1.15,effectModifier:"multiply",type:"rps"},{name:"Greener greens",description:"You gain +15% rps",price:[0,75,0],effect:1.15,effectModifier:"multiply",type:"rps"},{name:"CMYK",description:"You gain +25% rps",price:[0,100,0],effect:1.25,effectModifier:"multiply",type:"rps"},{name:"Better color mixing",description:"You gain +25% rps",price:[0,150,0],effect:1.25,effectModifier:"multiply",type:"rps"},{name:"JPEG artifacts",description:"For some reasons gains you +1% rps",price:[0,100,0],effect:1.01,effectModifier:"multiply",type:"rps"},{name:"SCART connectors",description:"Multiples click value by 2%",price:[0,1,0],effect:1.02,effectModifier:"multiply",type:"click"},{name:"RCA connectors",description:"Multiples click value by 4%",price:[0,4,0],effect:1.04,effectModifier:"multiply",type:"click"},{name:"VGA connectors",description:"Multiples click value by 6%",price:[0,75,0],effect:1.06,effectModifier:"multiply",type:"click"},{name:"DVI connectors",description:"Multiples click value by 8%",price:[0,200,0],effect:1.08,effectModifier:"multiply",type:"click"},{name:"HDMI connectors",description:"Multiples click value by 10%",price:[0,0,2],effect:1.1,effectModifier:"multiply",type:"click"},{name:"DisplayPort connectors",description:"Multiples click value by 10%",price:[0,0,8],effect:1.1,effectModifier:"multiply",type:"click"}],k=function(e){var t=e.onClick,c=e.upgradeId,a=Object(n.useState)(x[c]),r=Object(s.a)(a,2),i=r[0];r[1];return Object(v.jsxs)("div",{id:"upgrade-".concat(c),className:"side-menu-item cannot-afford",onClick:t,children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("h5",{children:i.name+(i.maxRanks?i.rank?" "+(i.rank+1):" 1":"")}),Object(v.jsx)("p",{children:i.description}),Object(v.jsxs)("div",{className:"generator-price",children:[Object(v.jsx)("span",{children:i.price[0]}),Object(v.jsx)("span",{children:i.price[1]}),Object(v.jsx)("span",{children:i.price[2]})]})]}),Object(v.jsx)("div",{className:"prevent-flicker"})]})},y=(c(23),c(24),function(e,t){var c=Object(n.useRef)();Object(n.useEffect)((function(){c.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){c.current()}),t);return function(){return clearInterval(e)}}}),[t])}),M=[{name:"Sharper edges",description:"Your Triangles are 100% more effective",MaxRanks:10,price:[150,0,0],effect:2,effectModifier:"multiply"},{name:"I guess it kinda looks like a cursor?",description:"Each triangle add +1 red to your clicks",MaxRanks:5,price:[0,8,0],effect:2,effectModifier:"add"},{name:"Straighter corners",description:"Your Squares are 100% more effective",MaxRanks:10,price:[235,3,0],effect:2,effectModifier:"multiply"},{name:"Square root",description:"Adds \u221a(amount of Squares)% to your rps",MaxRanks:1,price:[0,12,0],effect:1,effectModifier:"multiply"},{name:"Demonic angles",description:"Your Pentagons are 100% more effective",MaxRanks:10,price:[0,15,0],effect:2,effectModifier:"multiply"},{name:"Benzene",description:"Your Hexagons are 100% more effective",MaxRanks:10,price:[0,90,0],effect:2,effectModifier:"multiply"},{name:"Hepta or Septa?",description:"Your Septagons are 100% more effective",MaxRanks:10,price:[0,145,1],effect:2,effectModifier:"multiply"},{name:"1080\xba",description:"Your Octagons are 100% more effective",MaxRanks:10,price:[0,0,5],effect:2,effectModifier:"multiply"}],S={color:[0,0,0,0],rpsMultiplier:1,clickValue:1,clickMultiplier:1,vertices:0,vertexRpsMultiplier:0,vertexClickMultiplier:0,clickValuePerVertex:0},w=function(e,t){var c=x[e],n=c.effectModifier,a=c.type.split("."),r=a[0];switch(n){case"multiply":!function(e,t){switch(e){case"rps":S.rpsMultiplier*=t;break;case"click":S.clickMultiplier*=t}}(r,c.effect);break;case"add":!function(e,t){switch(e){case"rps":break;case"click":S.clickValue+=t}}(r,c.effect);break;case"time":!function(e,t){var c=b(60*e*t);S.color.forEach((function(e,t){S.color[t]+=c[t]}))}(c.effect,t)}switch(r){case"vertex":!function(e,t,c){switch(e){case"rps":"add"===t?S.vertexRpsMultiplier+=c:"multiply"===t&&(S.vertexRpsMultiplier*=c);break;case"click":"add"===t?S.clickValuePerVertex+=c:"multiply"===t&&(S.clickValuePerVertex*=c)}}(a[1],n,c.effect)}};var C=c(28),R=(c(25),function(e){var t=e.important,c=void 0!==t&&t,n=e.text;return Object(v.jsx)("div",{className:c?"notification important":"notification simple",children:Object(v.jsx)("p",{children:n})})});var N=function(){var e=Object(C.a)([]),t=Object(s.a)(e,3),c=t[0],a=t[1],r=(t[2],Object(n.useState)({left:!1,right:!1})),i=Object(s.a)(r,2),j=i[0],N=i[1],E=Object(n.useState)(30),q=Object(s.a)(E,2),P=q[0],V=q[1],A=Object(n.useState)(!0),F=Object(s.a)(A,2),L=F[0],T=F[1],Y=Object(n.useState)([]),H=Object(s.a)(Y,2),I=H[0],B=H[1],G=Object(n.useState)([]),D=Object(s.a)(G,2),W=D[0],J=D[1],z=Object(n.useState)({main:null,header:null,background:null,container:null,transformContainer:null}),K=Object(s.a)(z,2),Q=K[0],U=K[1],X=Object(n.useState)(0),Z=Object(s.a)(X,2),$=Z[0],_=Z[1],ee=Object(n.useState)({r:0,g:0,b:0,p:0}),te=Object(s.a)(ee,2),ce=te[0],ne=te[1],ae=Object(n.useState)(1*S.clickValue),re=Object(s.a)(ae,2),ie=re[0],se=re[1],oe=Object(n.useState)([0,0,0,0]),le=Object(s.a)(oe,2),ue=le[0],fe=le[1],pe=Object(n.useState)(0),de=Object(s.a)(pe,2),be=de[0],me=de[1],he=Object(n.useState)(0),je=Object(s.a)(he,2),ge=je[0],ve=je[1],Oe=Object(n.useState)([0,0,0,0]),xe=Object(s.a)(Oe,2),ke=xe[0],ye=xe[1],Me=Object(n.useState)([0,0,0,0]),Se=Object(s.a)(Me,2),we=Se[0],Ce=Se[1],Re=Object(n.useState)({generatorCount:0,upgradeCount:0,totalMultiplier:1}),Ne=Object(s.a)(Re,2),Ee=Ne[0],qe=Ne[1],Pe=Object(n.useState)([]),Ve=Object(s.a)(Pe,2),Ae=Ve[0],Fe=Ve[1];function Le(){var e=S.color;f.forEach((function(t,c){m(Object.assign({},t.price))>m([e[0],e[1],e[2],e[3]])?document.querySelector("#generator-".concat(c)).classList.add("cannot-afford"):document.querySelector("#generator-".concat(c)).classList.remove("cannot-afford")})),x.forEach((function(t,c){if(!t.bought){var n=document.querySelector("#upgrade-".concat(c));n&&(m(Object.assign({},t.price))>m([e[0],e[1],e[2],e[3]])?n.classList.add("cannot-afford"):n.classList.remove("cannot-afford"))}}))}function Te(e){var t=S.color;S.color=[t[0]+e[0],t[1]+e[1],t[2]+e[2],t[3]+e[3]],Ye()}function Ye(){var e=b(m(S.color));S.color=e,ne({r:e[0],g:e[1],b:e[2],p:e[3]})}function He(){var e=0,t=0,c=0;f.forEach((function(n,a){var r=n.count*n.baseRps;n.multiplier&&(r*=n.multiplier),e+=r,t+=n.count*n.vertices,c+=n.count})),S.vertices=t;var n=0;x.forEach((function(e,t){e.bought&&n++}));var a=S.rpsMultiplier,r=S.clickMultiplier;t>0&&(a*=1+t*S.vertexRpsMultiplier,r*=1+t*S.vertexClickMultiplier);var i=(S.clickValue+t*S.clickValuePerVertex)*r,s=e*a;se(i),me(s),qe({generatorCount:c,upgradeCount:n,totalMultiplier:a}),S.rps=s,f.forEach((function(e,t){e.rps=e.baseRps*a,e.multiplier&&(e.rps*=e.multiplier)}))}function Ie(){var e=f.map((function(e,t){return Object(v.jsx)(O,{genId:t,onClick:function(){return function(e){var t=f[e],c=Object.assign({},t.price),n=S.color,a=h([n[0],n[1],n[2],n[3]],c);if(null!=a){S.color=[a[0],a[1],a[2],a[3]],t.count+=1;var r=1;for(var i in p){var s=p[i].threshold,o=p[i].bonus;if(!(t.count>=s))break;r*=o}t.multiplier=r;var l=(108+e)/100;t.price=b(Math.floor(m(c)*l)),He(),Le(),Ie()}}(t)}},t)}));B(e)}function Be(){var e=Object(u.a)(x).sort((function(e,t){return m(Object.assign({},e.price))-m(Object.assign({},t.price))})).map((function(e,t){var c=x.indexOf(e);return e.bought?void 0:Object(v.jsx)(k,{upgradeId:c,onClick:function(){return function(e){var t=x[e],c=Object.assign({},t.price),n=S.color,a=h([n[0],n[1],n[2],n[3]],c);console.log(t),null!=a&&(S.color=[a[0],a[1],a[2],a[3]],w(e,S.rps),t.maxRanks?(t.rank?t.rank+=1:t.rank=1,t.rank>=t.maxRanks?(t.bought=!0,console.log("max rank reached")):t.price=b(Math.floor(1.5*m(t.price)))):t.bought=!0,Be(),Le())}(c)}},c)}));J(e),Ye(),He(),Ie()}function Ge(e){var t=document.querySelector(".".concat(e,"-menu")),c=document.querySelector(".open-".concat(e));t.classList.toggle("hidden-".concat(e)),j[e]?c.firstChild.innerText=">":c.firstChild.innerText="<",N(Object(l.a)(Object(l.a)({},j),{},Object(o.a)({},e,!j[e])))}Object(n.useEffect)((function(){if(U({main:document.querySelector(".the-square"),header:document.querySelector(".App-header"),background:document.querySelector(".background"),container:document.querySelector(".square-container"),transformContainer:document.querySelector(".square-transform-container")}),console.log(M.length+x.length+" total upgrades"),c.values)for(var e in c.values)S[e]=c.values[e];else console.log("welcome!");c.generators&&f.forEach((function(e,t){for(var n in c.generators[t])e[n]=c.generators[t][n]})),c.upgrades&&x.forEach((function(e,t){null!=c.upgrades[t]?(e.bought=c.upgrades[t].bought,c.upgrades[t].rank&&(console.log("".concat(e.name," has rank ").concat(c.upgrades[t].rank)),e.rank=c.upgrades[t].rank,e.price=c.upgrades[t].price)):e.bought=!1})),c.options&&d.forEach((function(e,t){null!=c.options[t]&&(e.value=c.options[t].value)})),_(document.querySelector(".background").offsetHeight/3),Be()}),[]),document.addEventListener("visibilitychange",(function(){document.hidden?T(!1):T(!0)})),window.addEventListener("resize",(function(){Q.background&&_(Q.background.offsetHeight/3)})),y((function(){var e=[];f.forEach((function(t,c){for(var n in e.push({}),f[c])"count"!==n&&"price"!==n&&"multiplier"!==n||(e[c][n]=f[c][n])}));var t=[];x.forEach((function(e,c){t.push({}),t[c].bought=e.bought,e.rank&&(t[c].rank=e.rank,t[c].price=e.price)}));var c=[];d.forEach((function(e,t){c.push({}),c[t].value=e.value})),a("values",S),a("generators",e),a("upgrades",t),a("options",c),console.log("saved"),function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];Fe([Object(v.jsx)(R,{text:e,important:t})]),setTimeout((function(){Fe([])}),t?4e3:2500)}("Saved")}),6e3),y((function(){be>0&&Te(we),P!=d[5].value&&V(d[5].value)}),1e3/P),y((function(){var e=Q.main;ke[2]>=1?e.style.backgroundColor="rgb(255, 255, ".concat(ce.b,")"):ke[1]>=1?e.style.backgroundColor="rgb(255, ".concat(ce.g,", ").concat(ce.b,")"):e.style.backgroundColor="rgb(".concat(ce.r,", ").concat(ce.g,", ").concat(ce.b,")")}),1e3/d[6].value),y((function(){Le()}),500),Object(n.useEffect)((function(){fe(b(ie))}),[ie]),Object(n.useEffect)((function(){document.hidden?ve(be):ve(be/(1e3/(1e3/P))),ye(b(be))}),[be,P,L]),Object(n.useEffect)((function(){Ce(b(ge))}),[ge]),Object(n.useEffect)((function(){null!=Q.main&&(Q.main.style.backgroundColor="rgb(".concat(ce.r,", ").concat(ce.g,", ").concat(ce.b,")"))}),[Q.main]);var De=Object(v.jsxs)("div",{className:"left-menu side-menu",children:[Object(v.jsxs)("div",{className:"left-menu-content menu-content",children:[Object(v.jsx)("h4",{children:"Upgrades"}),W]}),Object(v.jsx)("button",{className:"open-left menu-button",onClick:function(){return Ge("left")},children:Object(v.jsx)("span",{children:">"})})]}),We=Object(v.jsxs)("div",{className:"right-menu side-menu",children:[Object(v.jsx)("button",{className:"open-right menu-button",onClick:function(){return Ge("right")},children:Object(v.jsx)("span",{children:">"})}),Object(v.jsxs)("div",{className:"right-menu-content menu-content",children:[Object(v.jsx)("h4",{children:"Generators"}),I]})]}),Je=Object(v.jsxs)("div",{className:"stats bottom-right",children:[Object(v.jsxs)("p",{children:["R/t: ",ge.toFixed(2)]}),Object(v.jsxs)("p",{children:["RGB/s: ",ke[0].toFixed(2),", ",ke[1],", ",ke[2],", ",ke[3]]}),Object(v.jsxs)("p",{children:["RGB/t: ",we[0].toFixed(2),", ",we[1],", ",we[2],", ",we[3]]}),Object(v.jsxs)("p",{children:["R/click: ",ie]})]}),ze=Object(v.jsxs)("div",{className:"stats bottom-left",children:[Object(v.jsxs)("p",{children:["Total multiplier: ",Ee.totalMultiplier.toFixed(3),"x"]}),Object(v.jsxs)("p",{children:["Total Generators: ",Ee.generatorCount]}),Object(v.jsxs)("p",{children:["Vertices: ",S.vertices]}),Object(v.jsxs)("p",{children:["Upgrades purchased: ",Ee.upgradeCount]})]}),Ke=Object(v.jsx)("div",{className:"the-square square-clip",onClick:function(e){!function(e,t,c){t.transformContainer.classList.remove("on-click");var n,a,r=0,i=0;if((d[1].value||d[3].value)&&(t.header.offsetHeight,n=e.clientX,a=e.clientY,r=Math.floor(60*Math.random())-30,i=Math.floor(40*Math.random())),d[3].value){var s=document.createElement("span");s.innerText=g(c.toFixed(0)),s.className="click-text effect",t.container.appendChild(s);var o=n-s.offsetWidth+r+s.offsetWidth/2,l=a-s.offsetHeight-i;l<=0&&(l=8),s.style.left="".concat(o,"px"),s.style.top="".concat(l,"px"),setTimeout((function(){s.remove()}),800)}if(d[1].value){var u=document.createElement("div");switch(u.style.position="absolute",t.main.appendChild(u),d[2].value){case"ripple":u.className="ripple effect";break;case"material ripple":u.className="ripple-simple effect";break;case"splash":u.className="splash effect";for(var f=0;f<5;f++){var p=document.createElement("div"),b=360*Math.random();p.classList.add("splash-line"),p.style.transform="rotate(".concat(b,"deg)"),u.appendChild(p)}}var m=window.pageYOffset+t.main.getBoundingClientRect().top,h=window.pageXOffset+t.main.getBoundingClientRect().left;u.style.left="".concat(n-h-u.offsetWidth/2,"px"),u.style.top="".concat(a-m-u.offsetHeight/2,"px"),setTimeout((function(){u.remove()}),400)}t.transformContainer.classList.add("on-click")}(e,Q,ie),Te(ue)},style:{height:($>160?$:160)+"px",width:($>160?$:160)+"px"}});return Object(v.jsxs)("section",{children:[Object(v.jsx)("div",{className:"background"}),Object(v.jsxs)("div",{className:"color-values ",children:[Object(v.jsx)("span",{className:"cur-r",children:Math.floor(ce.r)}),Object(v.jsx)("span",{className:"cur-g",children:ce.g}),Object(v.jsx)("span",{className:"cur-b",children:ce.b}),Object(v.jsxs)("span",{className:"cur-p",children:[g(ce.p)," px"]}),Object(v.jsxs)("p",{children:["rps: ",g(be.toFixed(1))]})]}),Object(v.jsx)("div",{className:"square-container",children:Object(v.jsx)("div",{className:"square-transform-container",children:Ke})}),De,We,d[4].value?Je:null,d[4].value?ze:null,Ae]})},E=(c(13),c(26),function(e){var t=e.text;return Object(v.jsx)("div",{className:"tooltip",children:t})}),q=function(e){var t=e.optionId,c=e.callback,a=Object(n.useState)(d[t]),r=Object(s.a)(a,2),i=r[0],o=(r[1],Object(n.useState)()),l=Object(s.a)(o,2),u=l[0],f=l[1],p=Object(n.useState)(!1),b=Object(s.a)(p,2),m=b[0],h=b[1],j=Object(n.useState)(""),g=Object(s.a)(j,2),O=g[0],x=g[1],k=Object(n.useState)(),y=Object(s.a)(k,2),M=y[0],S=y[1];function w(){if("switch"===i.type)i.value=!i.value,h(i.value);else if("button"==i.type)switch(i.value){case"reset":c()}}return Object(n.useEffect)((function(){var e=Object(v.jsx)("div",{});switch(i.type){case"switch":e=Object(v.jsx)("div",{className:"switch-icon ".concat(i.value?"enabled":"disabled"),children:Object(v.jsx)("div",{})}),h(i.value);break;case"dropdown":var c=i.typeValues.map((function(e,t){return Object(v.jsx)("option",{id:"option-".concat(t),value:e,children:e},t)}));e=Object(v.jsx)("select",{id:"option-".concat(t),value:i.value,name:i.title,onChange:function(e){i.value=e.target.value,x(i.value)},children:c});break;case"button":e=Object(v.jsx)("div",{className:"button",onClick:w,children:Object(v.jsx)("div",{children:i.value})})}f(e)}),[m,O]),Object(v.jsxs)("div",{className:"option",onClick:"button"==i.type?null:w,onMouseEnter:function(){S(Object(v.jsx)(E,{text:i.tooltip}))},onMouseLeave:function(){S(null)},children:[Object(v.jsx)("span",{children:i.title}),u,M]})},P=function(e){var t=e.dismiss,c=Object(C.a)([]),a=Object(s.a)(c,3),r=a[0],i=(a[1],a[2]),o=Object(n.useState)([]),l=Object(s.a)(o,2),u=l[0],f=l[1];Object(n.useEffect)((function(){var e={},t=d.map((function(t,c){if("button"==t.type)switch(t.value){case"reset":console.log(c+" is reset"),e=p}return Object(v.jsx)(q,{optionId:c,callback:function(){return e()}},c)}));f(t)}),[]);var p=function(){for(var e in console.log("reset"),r)i(e.toString());window.location.reload(),console.log("removed cookies")};return Object(v.jsx)("div",{className:"options-background",onClick:function(e){return function(e){if(e.currentTarget===e.target){var c=document.querySelector(".the-square");"splash"==d[2].value?c.classList.remove("square-clip"):c.classList.add("square-clip"),t()}}(e)},children:Object(v.jsxs)("div",{className:"options-content",children:[Object(v.jsx)("h3",{children:"Options"}),Object(v.jsx)("div",{children:u})]})})};var V=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),c=t[0],a=t[1];function r(){c?(document.querySelector(".options-background").classList.add("on-remove"),setTimeout((function(){a(!c)}),250)):a(!c)}return Object(v.jsxs)("div",{className:"App",children:[Object(v.jsxs)("header",{className:"App-header",children:[Object(v.jsx)("h3",{className:"title",children:"rgb"}),Object(v.jsx)("button",{className:"header-button",onClick:r,children:Object(v.jsx)("h3",{children:"options"})})]}),Object(v.jsxs)("main",{children:[c?Object(v.jsx)(P,{dismiss:r}):null,Object(v.jsx)(N,{})]})]})},A=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,30)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;c(e),n(e),a(e),r(e),i(e)}))},F=c(29);i.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(F.a,{children:Object(v.jsx)(V,{})})}),document.getElementById("root")),A()}],[[27,1,2]]]);
//# sourceMappingURL=main.528b26f2.chunk.js.map