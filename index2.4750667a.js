var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequireb88b;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},e.parcelRequireb88b=n);var i=n("bexK8"),r=n("9ZOeg"),s=n("kXB5i");const l=document.querySelector(".content"),a=new i.Scene,d=new i.PerspectiveCamera(75,l.offsetWidth/l.offsetHeight,.1,1e3),u=new i.WebGLRenderer({antialias:!0});u.setSize(l.offsetWidth,l.offsetHeight),l.appendChild(u.domElement),d.position.z=50,d.position.y=50,d.lookAt(0,0,0);const c=new i.Group;a.add(c);const f=[];window.sparkles=f;const h=new i.BufferGeometry,p=new i.ShaderMaterial({uniforms:{pointTexture:{value:(new i.TextureLoader).load("dotTexture.png")}},vertexShader:document.getElementById("vertexshader").textContent,fragmentShader:document.getElementById("fragmentshader").textContent,depthTest:!1,depthWrite:!1,blending:i.AdditiveBlending}),w=new i.Points(h,p);c.add(w);const m=new i.Vector3;let x=null;const g=[];let y=[new i.Color(16428416).multiplyScalar(.5),new i.Color(16738151).multiplyScalar(.5),new i.Color(16727400).multiplyScalar(.5),new i.Color(10957961).multiplyScalar(.5)];let b=null;(new r.OBJLoader).load("Turtle_Model.obj",(e=>{b=e.children[0],b.geometry.rotateX(-.5*Math.PI),b.geometry.rotateY(-.3*Math.PI),function(){x=new s.MeshSurfaceSampler(b).build();for(let e=0;e<6;e++){x.sample(m);const t={colorIndex:e%4,previous:m.clone()};g.push(t)}u.setAnimationLoop(C)}()}),(e=>console.log(e.loaded/e.total*100+"% loaded")),(e=>console.error(e)));const S=[];function v(e){let t=!1;for(;!t;)if(x.sample(m),m.distanceTo(e.previous)<2){e.previous=m.clone();const o=new z;o.setup(e.previous),f.push(o),S.push(y[e.colorIndex].r,y[e.colorIndex].g,y[e.colorIndex].b),h.setAttribute("color",new i.Float32BufferAttribute(S,3)),t=!0}}class z extends i.Vector3{setup(e){this.add(e).multiplyScalar(2),this.dest=e,this._size=5*Math.random()+.5,this.size=1,this.scaleSpeed=.03*Math.random()+.03,this.stop=!1}update(){this.x+=.08*(this.dest.x-this.x),this.y+=.08*(this.dest.y-this.y),this.z+=.08*(this.dest.z-this.z),this.size<this._size&&(this.size+=this.scaleSpeed)}}let A=[],B=[];function C(e){c.rotation.y+=.002,f.length<4e4&&g.forEach((e=>{v(e),v(e),v(e)})),f.forEach(((e,t)=>{e.stop||e.update(),A[3*t]=e.x,A[3*t+1]=e.y,A[3*t+2]=e.z,B[t]=e.size})),h.setAttribute("position",new i.Float32BufferAttribute(A,3)),h.setAttribute("size",new i.Float32BufferAttribute(B,1)),u.render(a,d)}window.addEventListener("resize",(function(){d.aspect=l.offsetWidth/l.offsetHeight,d.updateProjectionMatrix(),u.setSize(l.offsetWidth,l.offsetHeight)}),!1);