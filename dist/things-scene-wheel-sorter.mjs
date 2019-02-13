import{ValueHolder as e,Component as t,RectPath as a,Shape as r,Donut as l,Polygon as n}from"@hatiolab/things-scene";const i=["#ccc","#afd0f1","#afd0f1","#ffba00","#e9746b"],o=["#999","#87b1db","#87b1db","#d96f21","#a73928"];const s=[function(e){var{height:t}=e.bounds,{rollWidth:a=10,animated:r}=e.model,l=Math.max(a,1),n=i[e.value]||i[0],s=o[e.value]||o[0],h=Math.min(1,l/10);l+=2*h,e._roller_pattern||(e._roller_pattern=document.createElement("canvas"));var d=Math.floor(2*l/3);e._roller_pattern.width=l+d,e._roller_pattern.height=t;var p=e._roller_pattern.getContext("2d");if(p.beginPath(),p.fillStyle=n,p.strokeStyle=s,p.lineWidth=h,p.ellipse(h+l/2,t-l/4-h,l/2,l/4,0,0,Math.PI),p.moveTo(h,t-l/4),p.lineTo(h,l/4),p.ellipse(h+l/2,l/4+h,l/2,l/4,0,Math.PI,0),p.lineTo(h+l,t-l/4),p.fill(),p.stroke(),p.globalAlpha=.2,p.lineWidth=l/3,r){var c=e._step%l;2==e.value&&(c=l-c),p.moveTo(c,t-l/4),p.lineTo(c,l/4),p.stroke()}return e._roller_pattern},function(e){var{height:t}=e.bounds,{rollWidth:a=10}=e.model,r=Math.max(a,1),l=i[e.value]||i[0],n=o[e.value]||o[0];e._roller_pattern||(e._roller_pattern=document.createElement("canvas")),e._roller_pattern.width=r,e._roller_pattern.height=t;var s=e._roller_pattern.getContext("2d");s.beginPath(),s.fillStyle=l,s.strokeStyle=n,s.lineWidth=1,s.moveTo(0,0),s.lineTo(r,0),s.lineTo(r,t),s.lineTo(0,t),s.lineTo(0,0),s.fill(),s.beginPath(),s.globalAlpha=.2;var h=(e._step||0)%r;return 2==e.value&&(h=r-h),s.moveTo(h,t),s.lineTo(h,0),s.stroke(),e._roller_pattern}];var h=a=>{var r=class extends(e(a)){dispose(){super.dispose(),delete this._roller_pattern}animOnState(){if(!(1!==this.value&&2!==this.value||this.disposed)){(!this._step||this._step>4e4)&&(this._step=0==this.value),this._step++;var e=this;requestAnimationFrame(function(){e.clearCache("fillStyle"),e.invalidate()})}}get conveyorType(){var e=this.get("conveyorType");return 1!=e&&0!=e&&(e=0),e}get fillStyle(){return{image:s[this.conveyorType](this),offsetX:0,offsetY:0,type:"pattern"}}};return t.memoize(r.prototype,"fillStyle",!1),t.memoize(r.prototype,"conveyorType",!1),r};const d={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"select",label:"conveyor-type",name:"conveyorType",property:{options:[{display:"Roller",value:0},{display:"Belt",value:1}]}},{type:"number",label:"roll-width",name:"rollWidth"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};class p extends(h(a(r))){get nature(){return d}render(e){var{width:t,height:a,left:r,top:l,animated:n=!1}=this.model;n&&this.animOnState(),e.beginPath(),e.rect(r,l,t,a)}is3dish(){return!1}}t.register("conveyor",p),t.register("conveyor-belt",p);const c={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"select",label:"conveyor-type",name:"conveyorType",property:{options:[{display:"Roller",value:0},{display:"Belt",value:1}]}},{type:"angle",label:"start-angle",name:"startAngle"},{type:"angle",label:"end-angle",name:"endAngle"},{type:"number",label:"ratio",name:"ratio"},{type:"number",label:"roll-width",name:"rollWidth"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};Math.PI;var u={ondragmove:function(e,t,a){var{cx:r,rx:l}=a.model,n=(a.transcoordP2S(e.x,e.y).x-r)/l*100;n=n>=100||n<=-100?100:Math.abs(n),a.set({ratio:n})}},m={ondragmove:function(e,t,a){var{cx:r,cy:l}=a.model,n=a.transcoordP2S(e.x,e.y),i=Math.atan2(-(n.y-l),n.x-r);i>0&&i<=Math.PI/2&&(i=Math.PI/2),i<0&&i>=-Math.PI/2&&(i=-Math.PI/2);var o=-i+Math.PI/2;a.set({startAngle:o})}},v={ondragmove:function(e,t,a){var{cx:r,cy:l}=a.model,n=a.transcoordP2S(e.x,e.y),i=Math.atan2(-(n.y-l),n.x-r);i>0&&i>=Math.PI/2&&(i=Math.PI/2),i<0&&i<=-Math.PI/2&&(i=-Math.PI/2);var o=-i+Math.PI/2;a.set({endAngle:o})}};class b extends(h(l)){get nature(){return c}is3dish(){return!1}render(e){var{ratio:t=50,cx:a,cy:r,rx:l,ry:n,startAngle:i=0,endAngle:o=Math.PI/2,animated:s=!1}=this.model;s&&this.animOnState(),e.beginPath(),i-=Math.PI/2,o-=Math.PI/2,e.ellipse(a,r,Math.abs(l),Math.abs(n),0,i,o),e.ellipse(a,r,Math.abs(l/100*t),Math.abs(n/100*t),0,o,i,!0),e.lineTo(l*Math.cos(i)+a,l*Math.sin(i)+r)}get controls(){var{cx:e,cy:t,rx:a,ratio:r,startAngle:l,endAngle:n}=this.model,i=[];return i.push({x:e+(a+a*r/100)/2*Math.sin(l),y:t-(a+a*r/100)/2*Math.cos(l),handler:m}),i.push({x:e+(a+a*r/100)/2*Math.sin(n),y:t-(a+a*r/100)/2*Math.cos(n),handler:v}),i.push({x:e+a/100*r,y:t,handler:u}),i}}t.register("conveyor-join",b);const y={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"select",label:"conveyor-type",name:"conveyorType",property:{options:[{display:"Roller",value:0},{display:"Belt",value:1}]}},{type:"number",label:"roll-width",name:"rollWidth"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};class g extends(h(n)){get nature(){return y}is3dish(){return!1}render(e){this.get("animated")&&this.animOnState(),super.render(e)}}t.register("conveyor-join-trapezoid",g);const f=["#ccc","#afd0f1","#ffba00","#e9746b"],_=["#999","#87b1db","#d96f21","#a73928"];var T=a=>{var r=class extends(e(a)){animOnState(){if(1===this.value&&!this.disposed){var e=this,t=Math.floor(100*Math.random());t=t<10?2:t>90?1:0,requestAnimationFrame(function(){e.delta("tilt",t),e.clearCache("fillStyle"),e.invalidate()})}}_draw_pattern(e){var{width:t,height:a,left:r,top:l}=this.bounds,{tilt:n=0,wheelSize:i=3}=this.model;n+=this.delta("tilt")||0,n%=3,n-=1;var o=f[this.value]||f[0],s=_[this.value]||_[0],h=10*i||Math.min(t/5,a/5);e.beginPath(),e.fillStyle=o,e.rect(r,l,t,a),e.fill(),e.strokeStyle=s,e.lineWidth=1,this._draw_wheel(e,h,n)}_draw_circle(e,t){for(var{width:a,height:r}=this.bounds,l=0,n=0;n<r;){for(l=0;l<a;)e.moveTo(l+t/2+t/3,n+t/2),e.ellipse(l+t/2,n+t/2,t/3,t/3,0,0,2*Math.PI,0),l+=t;n+=t}e.stroke()}_draw_inner(e,t,a){for(var{width:r,height:l}=this.bounds,n=0,i=0;i<l;){for(n=0;n<r;)e.translate(n,i),e.beginPath(),e.translate(t/2,t/2),e.rotate(a),e.moveTo(-t/6,-t/6),e.lineTo(-t/6,t/6),e.moveTo(t/6,-t/6),e.lineTo(t/6,t/6),e.stroke(),e.rotate(-a),e.translate(-t/2,-t/2),e.translate(-n,-i),n+=t;i+=t}}_draw_wheel(e,t,a){var{left:r,top:l}=this.bounds;e.beginPath(),e.translate(r,l),this._draw_circle(e,t),this._draw_inner(e,t,a)}};return t.memoize(r.prototype,"fillStyle",!1),r};const M={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"tilt",name:"tilt"},{type:"number",label:"wheel-size",name:"wheelSize"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};class x extends(T(a(r))){get nature(){return M}render(e){var{width:t,height:a,left:r,top:l,animated:n}=this.model;n&&this.animOnState(),e.beginPath(),e.rect(r,l,t,a),e.clip()}postrender(e){super.postrender(e),this._draw_pattern(e)}is3dish(){return!1}}t.register("wheel-sorter",x);const P=["rgba(0,0,0,.4)","rgba(175,208,241,.7)","rgba(255,186,0,.7)","rgba(198,50,40,.7)"],S=["rgba(0,0,0,.7)","rgba(175,208,241,1)","rgba(255,186,0,1)","rgba(198,50,40,1)"];function w(e){var{width:t,height:a}=e.bounds,r=P[e.value]||P[0],l=S[e.value]||S[0];e._scanner_pattern||(e._scanner_pattern=document.createElement("canvas")),e._scanner_pattern.width=t,e._scanner_pattern.height=a;var n,i=e._scanner_pattern.getContext("2d"),o=0,s=0;i.beginPath(),i.fillStyle=r,i.strokeStyle=l,i.rect(0,0,t,a),i.fill(),n=t/40,o=t/4,s=a/4,i.beginPath(),i.fillStyle="rgba(0,0,0,.7)",i.strokeStyle=null,i.moveTo(o+n,s),i.lineTo(o+t/2-n,s),i.quadraticCurveTo(o+t/2,s,o+t/2,s+n),i.lineTo(o+t/2,s+a/2-n),i.quadraticCurveTo(o+t/2,s+a/2,o+t/2-n,s+a/2),i.lineTo(o+n,s+a/2),i.quadraticCurveTo(o,s+a/2,o,s+a/2-n),i.lineTo(o,s+n),i.quadraticCurveTo(o,s,o+n,s),i.fill(),o+=.1*t,s+=.05*a;var h=0,d=.3*t,p=.4*a;return i.beginPath(),i.fillStyle="#fff",i.moveTo(o,s),i.rect(o,s+h,d,p/14*.9),h=p/14*2,i.rect(o,s+h,d,p/14*.3),h=p/14*4,i.rect(o,s+h,d,p/14*.4),h=p/14*6,i.rect(o,s+h,d,p/14*.8),h=p/14*8,i.rect(o,s+h,d,p/14*.6),h=p/14*10,i.rect(o,s+h,d,p/14),h=p/14*11,i.rect(o,s+h,d,p/14),h=p/14*14,i.rect(o,s+h,d,p/14*.3),i.fill(),i.beginPath(),o=t/2,s=.1*a,i.strokeStyle="#cc3300",i.lineWidth=1,i.moveTo(o,s),i.lineTo(o,.9*a),i.stroke(),e._scanner_pattern}var I=a=>{var r=class extends(e(a)){dispose(){super.dispose(),delete this._scanner_pattern}get fillStyle(){return{image:w(this),offsetX:0,offsetY:0,type:"pattern",fitPattern:!0}}};return t.memoize(r.prototype,"fillStyle",!1),r};const k={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"value",name:"value"},{type:"number",label:"round",name:"round"}]};class z extends(I(a(r))){get nature(){return k}render(e){var{width:t,height:a,left:r,top:l}=this.model,n=t/10;e.beginPath(),e.moveTo(r+n,l),e.lineTo(r+t-n,l),e.quadraticCurveTo(r+t,l,r+t,l+n),e.lineTo(r+t,l+a-n),e.quadraticCurveTo(r+t,l+a,r+t-n,l+a),e.lineTo(r+n,l+a),e.quadraticCurveTo(r,l+a,r,l+a-n),e.lineTo(r,l+n),e.quadraticCurveTo(r,l,r+n,l),e.clip()}is3dish(){return!1}}t.register("scanner",z);export{p as Conveyor,b as ConveyorJoin,g as ConveyorJoinTrapezoid,x as WheelSorter,z as Scanner};
