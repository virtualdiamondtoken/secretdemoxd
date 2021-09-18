var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},r={},i=t.parcelRequireb88b;null==i&&((i=function(t){if(t in e)return e[t].exports;if(t in r){var i=r[t];delete r[t];var s={id:t,exports:{}};return e[t]=s,i.call(s.exports,s,s.exports),s.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){r[t]=e},t.parcelRequireb88b=i);var s=i("bexK8"),o=i("9ZOeg"),a=i("kXB5i");s=i("bexK8"),s=i("bexK8");class n{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}const l=new s.OrthographicCamera(-1,1,1,-1,0,1),h=new s.BufferGeometry;h.setAttribute("position",new s.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new s.Float32BufferAttribute([0,2,0,0,2,0],2));class u{constructor(t){this._mesh=new s.Mesh(h,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,l)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}s=i("bexK8");var d={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform float opacity;\n\n\t\tuniform sampler2D tDiffuse;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\t\t\tgl_FragColor = opacity * texel;\n\n\t\t}"};const c={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new((s=i("bexK8")).Color)(0)},defaultOpacity:{value:0}},vertexShader:"\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",fragmentShader:"\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}"};class f extends n{constructor(t,e,r,i){super(),this.strength=void 0!==e?e:1,this.radius=r,this.threshold=i,this.resolution=void 0!==t?new s.Vector2(t.x,t.y):new s.Vector2(256,256),this.clearColor=new s.Color(0,0,0);const o={minFilter:s.LinearFilter,magFilter:s.LinearFilter,format:s.RGBAFormat};this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new s.WebGLRenderTarget(a,n,o),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let t=0;t<this.nMips;t++){const e=new s.WebGLRenderTarget(a,n,o);e.texture.name="UnrealBloomPass.h"+t,e.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(e);const r=new s.WebGLRenderTarget(a,n,o);r.texture.name="UnrealBloomPass.v"+t,r.texture.generateMipmaps=!1,this.renderTargetsVertical.push(r),a=Math.round(a/2),n=Math.round(n/2)}void 0===c&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const l=c;this.highPassUniforms=s.UniformsUtils.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new s.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let t=0;t<this.nMips;t++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(h[t])),this.separableBlurMaterials[t].uniforms.texSize.value=new s.Vector2(a,n),a=Math.round(a/2),n=Math.round(n/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new s.Vector3(1,1,1),new s.Vector3(1,1,1),new s.Vector3(1,1,1),new s.Vector3(1,1,1),new s.Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,void 0===d&&console.error("THREE.UnrealBloomPass relies on CopyShader");const f=d;this.copyUniforms=s.UniformsUtils.clone(f.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new s.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader,blending:s.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new s.Color,this.oldClearAlpha=1,this.basic=new s.MeshBasicMaterial,this.fsQuad=new u(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose()}setSize(t,e){let r=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(r,i);for(let t=0;t<this.nMips;t++)this.renderTargetsHorizontal[t].setSize(r,i),this.renderTargetsVertical[t].setSize(r,i),this.separableBlurMaterials[t].uniforms.texSize.value=new s.Vector2(r,i),r=Math.round(r/2),i=Math.round(i/2)}render(t,e,r,i,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let e=0;e<this.nMips;e++)this.fsQuad.material=this.separableBlurMaterials[e],this.separableBlurMaterials[e].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[e].uniforms.direction.value=f.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[e]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[e].uniforms.colorTexture.value=this.renderTargetsHorizontal[e].texture,this.separableBlurMaterials[e].uniforms.direction.value=f.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[e]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[e];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(r),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){return new s.ShaderMaterial({defines:{KERNEL_RADIUS:t,SIGMA:t},uniforms:{colorTexture:{value:null},texSize:{value:new s.Vector2(.5,.5)},direction:{value:new s.Vector2(.5,.5)}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"#include <common>\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 texSize;\n\t\t\t\tuniform vec2 direction;\n\n\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\n\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\n\t\t\t\t}\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\n\t\t\t\t\tfloat fSigma = float(SIGMA);\n\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);\n\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\n\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n\t\t\t\t\t\tfloat x = float(i);\n\t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);\n\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\n\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\n\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\n\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\n\t\t\t\t\t\tweightSum += 2.0 * w;\n\t\t\t\t\t}\n\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}"})}getCompositeMaterial(t){return new s.ShaderMaterial({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},dirtTexture:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:"varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"varying vec2 vUv;\n\t\t\t\tuniform sampler2D blurTexture1;\n\t\t\t\tuniform sampler2D blurTexture2;\n\t\t\t\tuniform sampler2D blurTexture3;\n\t\t\t\tuniform sampler2D blurTexture4;\n\t\t\t\tuniform sampler2D blurTexture5;\n\t\t\t\tuniform sampler2D dirtTexture;\n\t\t\t\tuniform float bloomStrength;\n\t\t\t\tuniform float bloomRadius;\n\t\t\t\tuniform float bloomFactors[NUM_MIPS];\n\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\n\n\t\t\t\tfloat lerpBloomFactor(const in float factor) {\n\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\n\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n\t\t\t\t\t\tlerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n\t\t\t\t}"})}}f.BlurDirectionX=new s.Vector2(1,0),f.BlurDirectionY=new s.Vector2(0,1);s=i("bexK8"),s=i("bexK8");class m extends n{constructor(t,e){super(),this.textureID=void 0!==e?e:"tDiffuse",t instanceof s.ShaderMaterial?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=s.UniformsUtils.clone(t.uniforms),this.material=new s.ShaderMaterial({defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new u(this.material)}render(t,e,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}}class p extends n{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,r){const i=t.getContext(),s=t.state;let o,a;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0),this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(r),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class v extends n{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}new s.OrthographicCamera(-1,1,1,-1,0,1);const g=new s.BufferGeometry;g.setAttribute("position",new s.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),g.setAttribute("uv",new s.Float32BufferAttribute([0,2,0,0,2,0],2));const x=document.querySelector(".content"),b=new s.Scene,w=new s.PerspectiveCamera(60,x.offsetWidth/x.offsetHeight,.001,50);w.position.z=8;const T=new s.WebGLRenderer;T.setPixelRatio(2),T.setSize(x.offsetWidth,x.offsetHeight),x.appendChild(T.domElement);const M=new class extends n{constructor(t,e,r,i,o){super(),this.scene=t,this.camera=e,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=void 0!==o?o:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new s.Color}render(t,e,r){const i=t.autoClear;let s,o;t.autoClear=!1,void 0!==this.overrideMaterial&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(t.getClearColor(this._oldClearColor),s=t.getClearAlpha(),t.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:r),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor&&t.setClearColor(this._oldClearColor,s),void 0!==this.overrideMaterial&&(this.scene.overrideMaterial=o),t.autoClear=i}}(b,w),S=new f(new s.Vector2(x.offsetWidth,x.offsetHeight),1.5,.4,.85);S.threshold=0,S.strength=.6;const C=new class{constructor(t,e){if(this.renderer=t,void 0===e){const r={minFilter:s.LinearFilter,magFilter:s.LinearFilter,format:s.RGBAFormat},i=t.getSize(new s.Vector2);this._pixelRatio=t.getPixelRatio(),this._width=i.width,this._height=i.height,(e=new s.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,r)).texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],void 0===d&&console.error("THREE.EffectComposer relies on CopyShader"),void 0===m&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new m(d),this.clock=new s.Clock}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);-1!==e&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){void 0===t&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let r=!1;for(let e=0,i=this.passes.length;e<i;e++){const i=this.passes[e];if(!1!==i.enabled){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(e),i.render(this.renderer,this.writeBuffer,this.readBuffer,t,r),i.needsSwap){if(r){const e=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(e.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),r.setFunc(e.EQUAL,1,4294967295)}this.swapBuffers()}void 0!==p&&(i instanceof p?r=!0:i instanceof v&&(r=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(void 0===t){const e=this.renderer.getSize(new s.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,(t=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let t=0;t<this.passes.length;t++)this.passes[t].setSize(r,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}}(T);C.setPixelRatio(2),C.addPass(M),C.addPass(S);const y=new s.Group;b.add(y);const B=[],_=new s.BufferGeometry,R=new s.ShaderMaterial({uniforms:{pointTexture:{value:(new s.TextureLoader).load("dotTexture.png")}},vertexShader:document.getElementById("vertexshader").textContent,fragmentShader:document.getElementById("fragmentshader").textContent,blending:s.AdditiveBlending,alphaTest:1,transparent:!0}),U=new s.Points(_,R);y.add(U);let z=null;const F=[];let P=[new s.LineBasicMaterial({transparent:!0,color:1203608}),new s.LineBasicMaterial({transparent:!0,color:13620958})],A=[new s.Color("#f9fbf2").multiplyScalar(.8),new s.Color("#ffede1").multiplyScalar(.8),new s.Color("#05c7f2").multiplyScalar(.8),new s.Color("#0597f2").multiplyScalar(.8),new s.Color("#0476d9").multiplyScalar(.8)];let D=null;(new o.OBJLoader).load("lynx_bobcat_01.obj",(t=>{D=t.children[0];let e=window.screen.height,r=window.screen.width;e<850&&r<400?(D.geometry.scale(.05,.05,.05),D.geometry.translate(0,-4.5,0)):(D.geometry.scale(.065,.065,.065),D.geometry.translate(0,-3,0)),D.geometry.rotateY(.2),function(){z=new a.MeshSurfaceSampler(D).build();for(let t=0;t<6;t++){const e=new s.Line(new s.BufferGeometry,P[t%2]);e.coordinates=[],e.previous=null,F.push(e),y.add(e)}requestAnimationFrame(N)}()}),(t=>console.log(t.loaded/t.total*100+"% loaded")),(t=>console.log("An error happened",t)));const E=new s.Vector3;function L(t){let e=!1;for(;!e;)if(z.sample(E),t.previous&&E.distanceTo(t.previous)<.3){t.coordinates.push(E.x,E.y,E.z),t.previous=E.clone();for(let e=0;e<2;e++){const e=new V;e.setup(E,t.material.color),B.push(e)}e=!0}else t.previous||(t.previous=E.clone())}class V extends s.Vector3{setup(t,e){this.x=t.x,this.y=t.y,this.z=t.z,this.v=new s.Vector3,this.v.x=s.MathUtils.randFloat(.001,.006),this.v.x*=Math.random()>.5?1:-1,this.v.y=s.MathUtils.randFloat(.001,.006),this.v.y*=Math.random()>.5?1:-1,this.v.z=s.MathUtils.randFloat(.001,.006),this.v.z*=Math.random()>.5?1:-1,this.size=4*Math.random()+1,this.slowDown=.4+.58*Math.random(),this.color=e}update(){(this.v.x>.001||this.v.y>.001||this.v.z>.001)&&(this.add(this.v),this.v.multiplyScalar(this.slowDown))}}class H{setup(t){this.r=12*Math.random()+3,this.phi=Math.random()*Math.PI*2,this.theta=Math.random()*Math.PI,this.v=(new s.Vector2).random().subScalar(.5).multiplyScalar(7e-4),this.x=this.r*Math.sin(this.phi)*Math.sin(this.theta),this.y=this.r*Math.cos(this.phi),this.z=this.r*Math.sin(this.phi)*Math.cos(this.theta),this.size=4*Math.random()+1,this.color=t}update(){this.phi+=this.v.x,this.theta+=this.v.y,this.x=this.r*Math.sin(this.phi)*Math.sin(this.theta),this.y=this.r*Math.cos(this.phi),this.z=this.r*Math.sin(this.phi)*Math.cos(this.theta)}}const Q=[],O=[],W=[],G=[];for(let t=0;t<1500;t++){const t=new H;t.setup(A[Math.floor(Math.random()*A.length)]),O.push(t.x,t.y,t.z),W.push(t.color.r,t.color.g,t.color.b),G.push(t.size),Q.push(t)}const I=new s.BufferGeometry;I.setAttribute("size",new s.Float32BufferAttribute(G,1)),I.setAttribute("color",new s.Float32BufferAttribute(W,3));const k=new s.Points(I,R);b.add(k);let K=0;function N(t){requestAnimationFrame(N),k.rotation.y+=5e-4,y.rotation.x=.1*Math.sin(3e-4*t),y.rotation.y+=.001,t-K>30&&(F.forEach((t=>{B.length<35e3&&(L(t),L(t));const e=new Float32Array(t.coordinates);t.geometry.setAttribute("position",new s.BufferAttribute(e,3)),t.geometry.computeBoundingSphere()})),function(){let t=[],e=[];B.forEach((r=>{t.push(r.size),e.push(r.color.r,r.color.g,r.color.b)})),_.setAttribute("color",new s.Float32BufferAttribute(e,3)),_.setAttribute("size",new s.Float32BufferAttribute(t,1))}(),K=t);let e=[];B.forEach((t=>{t.update(),e.push(t.x,t.y,t.z)})),_.setAttribute("position",new s.Float32BufferAttribute(e,3));let r=[];Q.forEach((t=>{t.update(),r.push(t.x,t.y,t.z)})),I.setAttribute("position",new s.Float32BufferAttribute(r,3)),C.render()}window.addEventListener("resize",(function(){w.aspect=x.offsetWidth/x.offsetHeight,w.updateProjectionMatrix(),C.setSize(x.offsetWidth,x.offsetHeight),T.setSize(x.offsetWidth,x.offsetHeight),S.setSize(x.offsetWidth,x.offsetHeight)}));