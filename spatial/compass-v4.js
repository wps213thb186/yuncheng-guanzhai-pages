const stage=document.querySelector('three-d-stage');
const style=document.createElement('style');style.textContent='.toolbar,.note,.err{display:none!important}';stage.shadowRoot.append(style);
try{
const {THREE:T}=await stage.ready;
const house=new T.Group();house.name='Example_home';
const furniture=new T.Group();furniture.name='Example_furniture';house.add(furniture);
function mat(name,color){const m=new T.MeshStandardMaterial({color,roughness:.86});m.name=name;return m;}
const plaster=mat('Warm_plaster','#eee8db'),oak=mat('Natural_oak','#bfa181'),cloth=mat('Linen','#ded7c8'),green=mat('Sage_fabric','#778979'),stone=mat('Stone','#a8ada6');
function box(name,x,y,z,w,h,d,m=plaster,parent=house){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.name=name;parent.add(mesh);return mesh;}
function cylinder(name,x,y,z,r,h,m,parent=furniture){const mesh=new T.Mesh(new T.CylinderGeometry(r,r,h,48),m);mesh.position.set(x,y,z);mesh.name=name;parent.add(mesh);return mesh;}
box('Foundation',0,-.18,0,10.3,.36,8.3,plaster);
box('Oak_floor',0,.01,0,10,.06,8,oak);
for(let z=-3.9;z<4;z+=.24)box('Floor_joint',0,.043,z,10,.003,.007,cloth);
box('Back_wall',0,.72,-4,10.2,1.44,.15);box('Left_wall',-5,.72,0,.15,1.44,8);
box('Front_low_wall',0,.16,4,10.2,.32,.15);box('Right_low_wall_back',5,.32,-1.8,.15,.64,4.4);box('Right_low_wall_front',5,.32,3.05,.15,.64,1.9);
// Interior door openings are explicit gaps; half-height walls keep rooms readable.
box('Bedroom_partition_back',-.5,.6,-2.4,.12,1.2,3.2);box('Bedroom_partition_front',-.5,.6,3.3,.12,1.2,1.4);
box('Bedroom_cross_wall_left',-3.6,.6,.3,2.8,1.2,.12);box('Bedroom_cross_wall_right',-.95,.6,.3,.9,1.2,.12);
box('Kitchen_wall_a',2,.53,-1.7,1.1,1.06,.12);box('Kitchen_wall_b',4.5,.53,-1.7,1,1.06,.12);
box('Kitchen_left',1.4,.53,-2.9,.12,1.06,2.3);
// Wide recessed glazing on back facade.
box('Window_frame',-2.8,.87,-3.89,2.8,.63,.09,oak);box('Window_glass',-2.8,.9,-3.82,2.65,.48,.04,stone);
box('Window_sill',-2.8,.58,-3.75,3,.08,.35,plaster);
// Primary bedroom.
box('Bed_base',-2.9,.23,-2.05,1.9,.35,2.25,oak,furniture);box('Mattress',-2.9,.48,-2.05,1.88,.23,2.2,cloth,furniture);box('Duvet',-2.9,.62,-1.68,1.92,.13,1.45,green,furniture);box('Headboard',-2.9,.62,-3.24,2.05,1,.12,oak,furniture);
[-3.38,-2.43].forEach((x,i)=>box('Pillow_'+i,x,.65,-2.78,.72,.18,.4,plaster,furniture));
box('Bedside_table',-4.25,.32,-2.85,.55,.6,.65,oak,furniture);cylinder('Bedside_lamp',-4.25,.72,-2.85,.14,.24,cloth);
box('Wardrobe',-4.52,.7,-.75,.7,1.4,1.5,plaster,furniture);
// Secondary bedroom / work corner.
box('Second_bed_base',-3.3,.25,2.55,1.5,.45,2.25,oak,furniture);box('Second_bed_linen',-3.3,.53,2.55,1.5,.18,2.2,cloth,furniture);box('Second_pillow',-3.3,.68,1.72,1.03,.14,.45,plaster,furniture);
box('Desk',-1.5,.73,1.13,1.4,.09,.6,oak,furniture);[-2.1,-.9].forEach(x=>box('Desk_leg',x,.36,1.13,.06,.72,.46,oak,furniture));
// Living space: rug, sofa, low table and storage.
box('Living_rug',2.4,.065,2.3,3.9,.025,2.6,cloth,furniture);
box('Sofa_base',1.15,.28,2.5,1,.43,2.5,green,furniture);box('Sofa_back',.71,.58,2.5,.22,.75,2.5,green,furniture);
[1.4,3.6].forEach(z=>box('Sofa_arm',1.15,.53,z,1,.52,.22,green,furniture));
[1.82,2.52,3.19].forEach(z=>box('Seat_cushion',1.28,.54,z,.71,.13,.64,cloth,furniture));
cylinder('Coffee_table',2.7,.34,2.4,.58,.1,oak);cylinder('Coffee_table_base',2.7,.17,2.4,.2,.3,oak);
box('Console',4.55,.3,2.6,.53,.5,1.65,oak,furniture);
// Dining.
cylinder('Dining_top',2.7,.77,-.28,.73,.1,oak);cylinder('Dining_pedestal',2.7,.39,-.28,.17,.7,oak);
for(const [x,z] of [[1.64,-.28],[3.76,-.28],[2.7,.8],[2.7,-1.32]]){box('Dining_chair',x,.4,z,.45,.1,.45,green,furniture);box('Chair_leg',x,.2,z,.07,.4,.07,oak,furniture);}
// Kitchen.
box('Kitchen_units',3.25,.46,-3.51,3.25,.9,.77,plaster,furniture);box('Kitchen_counter',3.25,.95,-3.51,3.3,.09,.82,stone,furniture);box('Kitchen_return',4.53,.46,-2.7,.7,.9,1,plaster,furniture);box('Kitchen_return_top',4.53,.95,-2.7,.74,.09,1.08,stone,furniture);box('Sink',2.45,1.003,-3.5,.7,.014,.45,green,furniture);[3.75,4.08].forEach(x=>cylinder('Hob',x,1.014,-3.5,.12,.02,stone));
cylinder('Plant_pot',4.2,.27,3.4,.22,.45,cloth);for(let i=0;i<7;i++){const leaf=new T.Mesh(new T.SphereGeometry(.18,16,12),green);leaf.scale.set(.7,2.3,.7);leaf.position.set(4.2+Math.cos(i)*.15,.78+(i%2)*.12,3.4+Math.sin(i)*.15);leaf.rotation.z=Math.cos(i)*.5;leaf.name='Plant_leaf_'+i;furniture.add(leaf);}
const spotMat=new T.MeshBasicMaterial({color:'#b77857',transparent:true,opacity:.13,depthWrite:false});spotMat.name='Room_selection';
const spot=box('Room_selection',2.5,.092,1.1,4.65,.014,5.4,spotMat);stage.setObject(house);
stage._key.shadow.bias=-.001;stage._key.shadow.normalBias=.04;stage._controls.maxPolarAngle=Math.PI*.49;stage._controls.minDistance=10;stage._controls.maxDistance=35;stage._scene.background=null;
const board=new T.Group();board.name='Bazhai_palaces';house.add(board);
const cells=[['乾',-10/3,-8/3],['坎',0,-8/3],['艮',10/3,-8/3],['兑',-10/3,0],['中',0,0],['震',10/3,0],['坤',-10/3,8/3],['离',0,8/3],['巽',10/3,8/3]];
const row=g=>window.YC_DEMO.palaces.find(p=>p.gong===g);
const good=s=>['生气','天医','延年'].includes(s);
function tint(g){return g==='中'||g==='震'?'#a58a4a':good(row(g).star)?'#598875':'#a2624c';}
function label(text,x,y,z,color='#6e654d',width=1.45){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.font='500 49px "Songti SC",serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,64);const tex=new T.CanvasTexture(c);const m=new T.SpriteMaterial({map:tex,depthTest:false,transparent:true});m.name='Palace_label_material';const s=new T.Sprite(m);s.name='Label_'+text;s.position.set(x,y,z);s.scale.set(width,width/4,1);board.add(s);return s;}
function line(points,color='#a18c55',opacity=.7){const m=new T.LineBasicMaterial({color,transparent:true,opacity,depthTest:false});m.name='Compass_line';const l=new T.Line(new T.BufferGeometry().setFromPoints(points.map(a=>new T.Vector3(...a))),m);l.name='Compass_and_grid';board.add(l);return l;}
for(const [g,x,z] of cells){const m=new T.MeshBasicMaterial({color:tint(g),transparent:true,opacity:g==='中'?.08:.17,depthWrite:false});m.name='Palace_tint_'+g;box('Palace_'+g,x,.105,z,3.31,.008,2.64,m,board);}
for(const x of [-5,-5/3,5/3,5])line([[x,.16,-4],[x,.16,4]]);
for(const z of [-4,-4/3,4/3,4])line([[-5,.16,z],[5,.16,z]]);
// The compass is part of the 3D stage, under the house, rather than a separate product panel.
const compassDisk=new T.Group();compassDisk.name='Animated_luopan';house.add(compassDisk);
const dialCanvas=document.createElement('canvas');dialCanvas.width=dialCanvas.height=2048;
const dialTexture=new T.CanvasTexture(dialCanvas);dialTexture.colorSpace=T.SRGBColorSpace;dialTexture.anisotropy=8;
const dialMaterial=new T.MeshBasicMaterial({map:dialTexture,transparent:true,side:T.DoubleSide,depthWrite:false});
const dialMesh=new T.Mesh(new T.PlaneGeometry(16.8,16.8),dialMaterial);dialMesh.rotation.x=-Math.PI/2;dialMesh.position.y=-.34;compassDisk.add(dialMesh);
const compassDirs=['坎','艮','震','巽','离','坤','兑','乾'],compassSymbols=['☵','☶','☳','☴','☲','☷','☱','☰'];
let selectedCompass='震',compassReveal=0;
function drawCompass(g){selectedCompass=g;const ctx=dialCanvas.getContext('2d');ctx.clearRect(0,0,2048,2048);ctx.save();ctx.translate(1024,1024);const unit=120;
ctx.beginPath();ctx.arc(0,0,8.1*unit,0,Math.PI*2);ctx.arc(0,0,5.65*unit,0,Math.PI*2,true);ctx.fillStyle='#294135';ctx.fill();
const selected=compassDirs.indexOf(g);if(selected>=0){ctx.beginPath();const a=selected*Math.PI/4-Math.PI/2;ctx.arc(0,0,8.02*unit,a-Math.PI/8,a+Math.PI/8);ctx.arc(0,0,5.7*unit,a+Math.PI/8,a-Math.PI/8,true);ctx.closePath();ctx.fillStyle='#6f7045';ctx.fill();}
for(const r of [5.67,6.45,7.28,7.72,8.1]){ctx.beginPath();ctx.arc(0,0,r*unit,0,Math.PI*2);ctx.strokeStyle='#baa373';ctx.lineWidth=r===8.1?4:1.5;ctx.stroke();}
for(let i=0;i<72;i++){ctx.save();ctx.rotate(i*Math.PI/36);ctx.beginPath();ctx.moveTo(0,-(i%9===0?7.73:i%3===0?7.88:7.98)*unit);ctx.lineTo(0,-8.1*unit);ctx.strokeStyle='#e6cf98';ctx.lineWidth=i%9===0?3:1.5;ctx.stroke();ctx.restore();}
compassDirs.forEach((g,i)=>{const data=row(g);ctx.save();ctx.rotate(i*Math.PI/4);ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillStyle='#ece0bb';ctx.font='24px "PingFang SC",sans-serif';ctx.fillText(`${String(i*45).padStart(3,'0')}°`,0,-7.53*unit);
ctx.font='38px "Songti SC",serif';ctx.fillText(`${compassSymbols[i]}  ${g} · ${data.direction}`,0,-6.87*unit);
ctx.fillStyle=i===selected?'#ffe0a2':'#ccd5be';ctx.font='34px "Songti SC",serif';ctx.fillText(data.star,0,-6.05*unit);
ctx.rotate(Math.PI/8);ctx.beginPath();ctx.moveTo(0,-5.67*unit);ctx.lineTo(0,-7.28*unit);ctx.strokeStyle='#a9986966';ctx.lineWidth=1.5;ctx.stroke();ctx.restore();});
ctx.beginPath();ctx.moveTo(-16,-8.15*unit);ctx.lineTo(16,-8.15*unit);ctx.lineTo(0,-7.8*unit);ctx.closePath();ctx.fillStyle='#d07b5f';ctx.fill();ctx.restore();dialTexture.needsUpdate=true;
const data=row(g);document.querySelector('#scene-palace').textContent=data?`${data.direction}${g}宫 · ${data.star}`:'中宫 · 立极';document.querySelector('#scene-palace-relation').textContent=data?data.desc:'宅心立极，不排游星';}
drawCompass('震');
const rim=new T.Mesh(new T.TorusGeometry(8.12,.035,8,180),mat('Brass_compass_edge','#ac945c'));rim.rotation.x=Math.PI/2;rim.position.y=-.32;compassDisk.add(rim);
const palaceOutline=line([[-1.65,.23,-1.32],[1.65,.23,-1.32],[1.65,.23,1.32],[-1.65,.23,1.32],[-1.65,.23,-1.32]],'#ac6937',1);palaceOutline.renderOrder=8;
const beacons={door:[5,.45,1.2],bed:[-2.9,.95,-2.05],kitchen:[3.9,1.15,-3.5]};
for(const [key,pos] of Object.entries(beacons)){const m=new T.MeshBasicMaterial({color:key==='door'?'#b39142':'#a25d46',depthTest:false});m.name='Marker_'+key;const ring=new T.Mesh(new T.TorusGeometry(.21,.025,8,36),m);ring.name='Marker_ring_'+key;ring.rotation.x=-Math.PI/2;ring.position.set(...pos);board.add(ring);}

// 3D 点位标记：地面光环 + 光柱 + 悬浮徽标（3D 内完成，不依赖网页定位）
const marksGroup=new T.Group();marksGroup.name='Point_marks';house.add(marksGroup);
const markDefs={door:{p:[5,.45,1.2],c:'230,194,122',rgb:'#e6c27a',t:'门 · 入户门'},bed:{p:[-2.9,.95,-2.05],c:'224,136,98',rgb:'#e08862',t:'主 · 主位'},kitchen:{p:[3.9,1.15,-3.5],c:'224,136,98',rgb:'#e08862',t:'灶 · 灶点'}};
function glowTexture(rgb){
  const c=document.createElement('canvas');c.width=c.height=128;
  const x=c.getContext('2d');const g=x.createRadialGradient(64,64,0,64,64,64);
  g.addColorStop(0,'rgba('+rgb+',.85)');g.addColorStop(.45,'rgba('+rgb+',.25)');g.addColorStop(1,'rgba('+rgb+',0)');
  x.fillStyle=g;x.fillRect(0,0,128,128);
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}
function beamTexture(rgb){
  const c=document.createElement('canvas');c.width=32;c.height=128;
  const x=c.getContext('2d');const g=x.createLinearGradient(0,128,0,0);
  g.addColorStop(0,'rgba('+rgb+',.55)');g.addColorStop(.6,'rgba('+rgb+',.15)');g.addColorStop(1,'rgba('+rgb+',0)');
  x.fillStyle=g;x.fillRect(0,0,32,128);
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}
function badgeTexture(text,rgb){
  const c=document.createElement('canvas');c.width=512;c.height=160;
  const x=c.getContext('2d');
  x.clearRect(0,0,512,160);
  const r=54;
  x.beginPath();
  x.moveTo(28+r,20);x.lineTo(484-r,20);x.quadraticCurveTo(484,20,484,20+r);
  x.lineTo(484,140-r);x.quadraticCurveTo(484,140,484-r,140);
  x.lineTo(28+r,140);x.quadraticCurveTo(28,140,28,140-r);
  x.lineTo(28,20+r);x.quadraticCurveTo(28,20,28+r,20);
  x.closePath();
  x.fillStyle='rgba(11,14,13,.9)';x.fill();
  x.strokeStyle=rgb;x.lineWidth=3;x.stroke();
  x.font='600 64px "PingFang SC","Hiragino Sans GB",sans-serif';
  x.textAlign='center';x.textBaseline='middle';x.fillStyle=rgb;
  x.fillText(text,256,84);
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}
for(const [mk,mv] of Object.entries(markDefs)){
  const g=new T.Group();g.name='Mark_'+mk;g.position.set(mv.p[0],0,mv.p[2]);
  const haloMat=new T.MeshBasicMaterial({map:glowTexture(mv.c),transparent:true,depthWrite:false,side:T.DoubleSide});
  const halo=new T.Mesh(new T.PlaneGeometry(2,2),haloMat);
  halo.rotation.x=-Math.PI/2;halo.position.y=.02;g.add(halo);
  const ring=new T.Mesh(new T.TorusGeometry(.52,.035,8,64),new T.MeshBasicMaterial({color:mv.rgb,transparent:true,opacity:.9,depthWrite:false}));
  ring.rotation.x=-Math.PI/2;ring.position.y=.04;g.add(ring);
  const beamMat=new T.MeshBasicMaterial({map:beamTexture(mv.c),transparent:true,depthWrite:false,side:T.DoubleSide});
  for(const rot of [0,Math.PI/2]){
    const beam=new T.Mesh(new T.PlaneGeometry(.9,2.6),beamMat);
    beam.position.y=1.3;beam.rotation.y=rot;g.add(beam);
  }
  const badge=new T.Sprite(new T.SpriteMaterial({map:badgeTexture(mv.t,mv.rgb),transparent:true,depthTest:false}));
  badge.scale.set(1.35,.42,1);badge.position.y=2.15;g.add(badge);
  g.userData.halo=halo;
  marksGroup.add(g);
}
marksGroup.visible=false;

// 全息扫描：一道水平扫描面从地面扫到屋顶，配地面网格
const holoGroup=new T.Group();holoGroup.name='Holo_scan';house.add(holoGroup);
const grid=new T.GridHelper(10,10,0xd8b25e,0x7c8a7a);
grid.position.y=.02;
const gmat=Array.isArray(grid.material)?grid.material:[grid.material];
gmat.forEach(m=>{m.transparent=true;m.opacity=.16;m.depthWrite=false;});
holoGroup.add(grid);
const scanDisc=new T.Mesh(new T.CircleGeometry(5.5,72),new T.MeshBasicMaterial({color:'#d8b25e',transparent:true,opacity:.07,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending}));
scanDisc.rotation.x=-Math.PI/2;holoGroup.add(scanDisc);
const scanEdge=new T.Mesh(new T.TorusGeometry(5.5,.02,8,96),new T.MeshBasicMaterial({color:'#e8cd93',transparent:true,opacity:.45,depthWrite:false}));
scanEdge.rotation.x=-Math.PI/2;holoGroup.add(scanEdge);
holoGroup.userData={disc:scanDisc,edge:scanEdge};
holoGroup.visible=false;

// 罗盘扫描：三圈从中心扩散，表达“罗盘扫全屋”
const scanGroup=new T.Group();scanGroup.name='Compass_scan';house.add(scanGroup);
for(let si=0;si<3;si++){
  const sm=new T.MeshBasicMaterial({color:'#d8b25e',transparent:true,opacity:.25,depthTest:false});
  const ring=new T.Mesh(new T.TorusGeometry(1,.012,6,96),sm);
  ring.rotation.x=-Math.PI/2;ring.position.y=.12;ring.userData.phase=si/3;scanGroup.add(ring);
}
scanGroup.visible=false;
spot.visible=false;
const palaceGrid=document.querySelector('.palaces');
for(const [g] of cells){const b=document.createElement('button');b.dataset.gong=g;b.className='palace '+(g==='中'||g==='震'?'base':good(row(g).star)?'good':'bad');b.innerHTML=g==='中'?'<span>立极</span><b>中宫</b><small>不排游星</small>':`<span>${row(g).direction} · ${g}宫</span><b>${row(g).star}</b><small>${row(g).element}宫 · ${row(g).starElement}星</small>`;palaceGrid.append(b);}
const texts={door:['震门 / 东四宅组','门落震宫，以伏位起大游年。','示例入户门位于正东的震宫。以此为起点，八宫依次排布游星；伏位在这里表示门宫起点，不直接简化为“吉位”。','入户门 → 正东震宫 → 伏位','九宫按矩形边界等分；门点在东侧中格，朝向为示例预设。','卷一“大游年歌”“东西四宅论”','震'],bed:['主位演示点 / 西北乾宫','主位示例落乾宫，对应五鬼星。','按震门游星表，乾宫临五鬼；五鬼属火，乾宫属金，形成星克宫。这里展示推演链路，不凭一个星名直接推断现实祸福。','五鬼火 → 克 → 乾宫金','“主”暂以示例床中心作演示代理点；真实主位与跨宫范围须另行核定。','卷一“大游年歌”“五鬼临宫要诀”“星宫生克吉凶论”','乾'],kitchen:['示例灶点 / 东北艮宫','灶点示例落艮宫，对应六煞星。','按震门游星表，艮宫临六煞；艮土克六煞水，形成宫克星。灶点落宫与灶向是不同输入，本例尚未给出灶向。','艮宫土 → 克 → 六煞水','这是灶点落宫演示，不代表整间厨房结论；实际还需确认灶座、灶向及流派口径。','卷一“大游年歌”“六煞临宫要诀”“星宫生克吉凶论”','艮']};
function showReading(key){const t=texts[key];['reading-kicker','reading-title','reading-text','relation-line','reading-limit'].forEach((id,i)=>document.getElementById(id).textContent=t[i]);document.querySelector('#reading-source').textContent='八宅通法 · 原文待复核。参照《阳宅爱众篇》'+t[5]+'；游星表及五行关系已对照冻结 Beta 引擎。';document.querySelectorAll('[data-reading]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.reading===key));selectPalace(t[6]);}
function selectPalace(g){drawCompass(g);document.querySelectorAll('[data-gong]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.gong===g));const c=cells.find(c=>c[0]===g);palaceOutline.position.set(c[1],0,c[2]);spot.position.set(c[1],.125,c[2]);spot.scale.set(3.31/4.65,1,2.64/5.4);spot.visible=true;}
const qiGroup=new T.Group();qiGroup.name='Qi_rule_illustration';house.add(qiGroup);qiGroup.visible=false;
const qHeight=.32;
const qiModes={
flow:{name:'流通 · 有进有出',color:'#198b65',path:[[5.4,1.1],[3.3,1.1],[2.1,1.1],[1.8,.65],[.1,.65],[-1.8,.65],[-1.8,-.1],[-1.3,-.5],[-1.25,-2.8],[-1.8,-3.65],[-2.8,-3.85]],title:'流通不等于直进直出。',description:'示例气路由东侧入户，经客餐厅、过道到达西北窗。弯曲路径与开放窗只是部分条件，还需核对缓急、直冲与其他宫位。',trace:'门 → 客餐厅 → 过道 → 西北窗',condition:'流通四要件：有进有出、回旋有情、缓急有度、诸宫皆活。本图无法证实气流缓急，不作实宅成立判断。',combined:'流通，也不能直接等同于吉。',star:'本例气路通向乾宫，震门排得五鬼星。师承规则强调“凶星得气亦增其势”，所以星位与气态需要合看。',assumptions:'西北窗作为泄口，门廊可通；整条路径人工绘制。',source:'four_states.流通之气；四要件、辨析与星气合断。'},
trapped:{name:'窝气 · 尽头无泄口',color:'#d3901f',path:[[5.4,1.1],[3.3,1.1],[2.1,1.1],[1.8,.65],[.1,.65],[-.95,.65],[-.95,1.7],[-.95,3.5]],title:'气至而困：走到了，却没有出口。',description:'切换到次卧一侧的预设气路，光点行至末端后聚集。本情景假设末端没有窗、后门或其他泄口，用来解释“窝气”的条件。',trace:'入户 → 过道 → 无泄口的末端',condition:'规则判定要件是“气路尽头无泄口”。看不见窗不等于无窗，真实图纸必须先核实开口。',combined:'吉星所在，也要看气是否被困。',star:'示例末端点位于离宫，震门排得生气星。师承口径中，吉星窝气可能使吉应不显；这只展示规则组合，不作现实应验推断。',assumptions:'次卧末端没有泄口是本情景预设，并非 OCR 识别结论。',source:'four_states.窝气.定义、判定；星气组合依据同条“吉星窝则吉应不显”。'},
still:{name:'死气 · 多拐后停驻',color:'#a95947',path:[[5.4,1.1],[3.3,1.1],[2.1,1.1],[1.8,.65],[.1,.65],[.1,1.7],[-.6,1.7],[-.6,2.1],[-.95,2.1],[-.95,3.45]],title:'多次转折、尽头无泄，是条件线索。',description:'示例光点沿多次转折的路径缓慢移动，在末端停驻。它把规则中的“多拐”和“无泄口”画出来，但不把必要条件当成充分判定。',trace:'入户 → 多次转折 → 末端停驻',condition:'仓库标注“两拐以上 + 尽头无泄口”为必要条件。实际仍需核实连通性、开口与停滞状态。',combined:'星位相同，气态仍可能不同。',star:'本例仍以离宫末端作对照：窝气强调“气至而困”，死气强调“多拐后停驻”。不能仅数拐弯次数就自动给真实住宅定性。',assumptions:'多拐路径与停驻动效为人工演示；未做流速、压差或通风计算。',source:'four_states.死气.定义、判定（原规则明确“必要条件”）。'},
back:{name:'背气 · 背侧朝向气口',color:'#208eaf',path:[[-2.9,-3.15],[-2.9,-3.45],[-2.8,-3.85]],title:'按老师纠正口径：看背侧与气口。',description:'以示例床头的背侧作为观察代理，短箭头由背侧向北面窗延伸。具体关系是背侧朝向气口、气向口外行，不是“从背后冲来”。',trace:'示例背侧 → 背侧气口 → 向外',condition:'规则需确认床、座位、灶台等背侧与门窗或过道口的关系；床头位置只是本例演示代理，不代表人的实际姿态。',combined:'先确认朝向关系，再落宫合看。',star:'本例背侧与气口位于乾宫范围。缺少实际坐卧朝向与遮挡信息时，不据房间名称或一张 box 判定背气。',assumptions:'床头背侧指向西北窗是预设关系；无人物、无真实居住信息。',source:'four_states.背气.定义、判定（优先采用括注“师父纠正口径”，不按总诀简写画反方向）。'}
};
furniture.children.filter(m=>m.name==='Desk'||m.name==='Desk_leg').forEach(m=>m.position.x-=.5);
let qiMode='flow',qiCurve,qiParticles=[],qiArrows=[];
function setQi(mode,activate=true){qiMode=mode;const q=qiModes[mode];flowClock=0;qiCurve=new T.CurvePath();for(let i=1;i<q.path.length;i++){const a=q.path[i-1],b=q.path[i];qiCurve.add(new T.LineCurve3(new T.Vector3(a[0],qHeight,a[1]),new T.Vector3(b[0],qHeight,b[1])));}document.querySelector('.hero-scene').style.setProperty('--flow-color',q.color);document.querySelector('.hero-scene').dataset.qiMode=mode;
const mapping={'qi-title':'title','qi-description':'description','qi-trace':'trace','qi-condition':'condition','qi-combined':'combined','qi-star':'star','qi-assumptions':'assumptions','qi-source':'source'};for(const [id,k] of Object.entries(mapping))document.getElementById(id).textContent=q[k];document.querySelector('#qi-badge-label').textContent=q.name;document.querySelectorAll('[data-qi]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.qi===mode));if(activate){stopAuto();changeStep(3);document.querySelector('#caption-title').textContent=q.name;document.querySelector('#caption-copy').textContent=q.trace;}}
let flowClock=0,flowPaused=matchMedia('(prefers-reduced-motion: reduce)').matches;
const svgNS='http://www.w3.org/2000/svg',overlay=document.querySelector('.flow-overlay'),packets=[];
for(let i=0;i<7;i++){const group=document.createElementNS(svgNS,'g');const arrow=document.createElementNS(svgNS,'path');arrow.setAttribute('d','M -9 -6 L 0 0 L -9 6 L -5 0 Z');group.append(arrow);document.querySelector('#stream-packets').append(group);packets.push(group);}
const toggle=document.querySelector('#flow-toggle');
function flowButton(){toggle.textContent=flowPaused?'▶ 播放流动':'Ⅱ 暂停流动';toggle.setAttribute('aria-pressed',flowPaused);}
toggle.onclick=()=>{flowPaused=!flowPaused;flowButton();};flowButton();
function projectPoint(v){const p=v.clone().project(stage._camera);return[(p.x+1)*stage.clientWidth/2,(1-p.y)*stage.clientHeight/2];}
function animateQi(ms){if(!qiCurve)return;const w=stage.clientWidth,h=stage.clientHeight;overlay.setAttribute('viewBox',`0 0 ${w} ${h}`);const q=qiModes[qiMode];
 const pts=q.path.map(([x,z])=>projectPoint(new T.Vector3(x,qHeight,z)));const d=pts.map((p,i)=>`${i?'L':'M'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
 for(const id of ['route-halo','route-base','route-running'])document.getElementById(id).setAttribute('d',d);document.querySelector('#route-running').setAttribute('stroke-dashoffset',-ms/(qiMode==='still'?120:40));
 const trapped=qiMode==='trapped',still=qiMode==='still',back=qiMode==='back';const cycle=back?1800:still?11500:trapped?6000:4500;
 const activeCount=back?2:packets.length;
 for(let i=0;i<packets.length;i++){packets[i].style.display=i<activeCount?'':'none';if(i>=activeCount)continue;let p=((ms/cycle)+i/activeCount)%1;if(still)p=1-Math.pow(1-p,2.2);if(trapped)p=Math.min(1,p*1.5);const pos=projectPoint(qiCurve.getPoint(p)),ahead=projectPoint(qiCurve.getPoint(Math.min(.9999,p+.005)));const behind=projectPoint(qiCurve.getPoint(Math.max(0,p-.005)));const dx=ahead[0]-behind[0],dy=ahead[1]-behind[1];packets[i].setAttribute('transform',`translate(${pos[0]} ${pos[1]}) rotate(${Math.atan2(dy,dx)*180/Math.PI})`);packets[i].style.opacity=String(trapped&&p>=1?0:still?Math.max(.06,1-p*.95):1);}
 const end=pts.at(-1),start=pts[0],mid=projectPoint(qiCurve.getPoint(.48));
 for(const [id,p] of [['route-start',start],['route-middle',mid],['route-end',end]])document.getElementById(id).setAttribute('transform',`translate(${p[0]} ${p[1]})`);
 document.querySelector('#route-start text').textContent=back?'床头背侧':'入气口 → 门';
 document.querySelector('#route-middle text').textContent=still?'多次转折 · 衰减':trapped?'沿通路进入':'经过点 · 门廊';document.querySelector('#route-middle').style.display=back?'none':'';
 document.querySelector('#route-end text').textContent=trapped?'无泄口 · 聚集':still?'无泄口 · 停滞':'泄气口 → 窗外';
 const effect=document.querySelector('#end-effect');effect.setAttribute('transform',`translate(${end[0]} ${end[1]})`);effect.style.display=trapped||still?'':'none';effect.querySelectorAll('circle').forEach((c,i)=>{const t=((ms/1800)+i*.5)%1;c.setAttribute('r',trapped?10+t*18:12+i*7);c.style.opacity=String(trapped?1-t:.5);});effect.querySelector('path').style.display=still?'':'none';
 // Explicit visual state markers also make pause verification observable.
 overlay.dataset.motionMs=String(Math.round(ms));overlay.dataset.mode=qiMode;
}

document.querySelectorAll('[data-qi]').forEach(b=>b.onclick=()=>setQi(b.dataset.qi));document.querySelector('#watch-qi').onclick=()=>{setQi(qiMode);document.querySelector('.hero-scene').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});};

const panel=document.querySelector('.hero-scene');document.querySelector('#fallback').hidden=true;
const labels=[['先定向，看清户型','上北下南是本例预设，真实住宅需核对。'],['以宅心立极，罗盘随宅展开','点选盘面八方，联动九宫与游星。北向为示例预设。'],['门主灶，各自落宫','点击门、主、灶，展开对应游星与生克。'],['沿气路，看星气如何合看','有进有出、尽头无泄，条件要分开看。']];
let current=0,paused=false,automatic=true,elapsed=0,last=performance.now(),transition=null,visible=true;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function changeStep(n,instant=false){current=n;panel.dataset.step=String(n+1);document.querySelectorAll('.story-steps button').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.step)===n));document.querySelector('#caption-num').textContent='0'+(n+1);document.querySelector('#caption-title').textContent=labels[n][0];document.querySelector('#caption-copy').textContent=labels[n][1];document.querySelector('#scene-status').textContent=['定向 · 看平面','立极 · 九宫布星','察门主灶 · 读生克','走气路 · 师承四态'][n];
 document.querySelectorAll('[data-animation-view]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.animationView)===n));
 const mobile=stage.clientWidth<500;let camera=n===0?new T.Vector3(0,mobile?23:20,.01):new T.Vector3(mobile?14:12,mobile?19:16,mobile?18:16);if(n===1||n===2)camera=new T.Vector3(mobile?10:10,mobile?27:19,mobile?19:15);if(n===3)camera=qiMode==='back'?new T.Vector3(-.9,9.5,3.5):new T.Vector3(mobile?8:7,mobile?19:17,mobile?14:12);
 transition={age:0,duration:instant||reduced?0:1700,from:stage._camera.position.clone(),to:camera,scale:house.scale.y,target:n===0?.025:1};board.visible=n>0&&n<3&&document.querySelector('#show-bazhai').checked;compassDisk.visible=n>0&&n<3;if(n===1||n===2)compassReveal=instant?1:(n===1?0:compassReveal);spot.visible=false;qiGroup.visible=n===3;marksGroup.visible=n===2;scanGroup.visible=n===1;holoGroup.visible=n===1;document.querySelector('.qi-badge').hidden=n!==3;
 document.querySelectorAll('.room-pins button').forEach(b=>{b.disabled=n!==2;b.tabIndex=n===2?0:-1;});
 if(instant||reduced){stage._camera.position.copy(camera);house.scale.y=transition.target;transition=null;}stage._controls.target.set(...(n===3&&qiMode==='back'?[-2.7,0,-2.6]:[0,0,0]));stage._controls.update();}
function pauseUI(){document.querySelector('#pause').textContent=paused?'继续演示':'暂停演示';document.querySelector('#pause').setAttribute('aria-pressed',paused);}
function stopAuto(){automatic=false;paused=true;document.querySelector('#pause').textContent='自动演示';document.querySelector('#pause').setAttribute('aria-pressed','true');}
document.querySelectorAll('[data-animation-view]').forEach(b=>b.onclick=()=>{stopAuto();changeStep(Number(b.dataset.animationView));if(Number(b.dataset.animationView)<3)selectPalace(selectedCompass);});
document.querySelectorAll('.story-steps button').forEach(b=>b.onclick=()=>{stopAuto();changeStep(Number(b.dataset.step));});
document.querySelector('#replay').onclick=()=>{paused=false;automatic=true;elapsed=0;house.rotation.y=0;pauseUI();changeStep(0);};
document.querySelector('#pause').onclick=()=>{if(!automatic){automatic=true;elapsed=current*4000;paused=false;}else paused=!paused;pauseUI();};
document.querySelectorAll('[data-focus]').forEach(b=>b.onclick=()=>{if(current!==2)return;stopAuto();showReading(b.dataset.focus);document.querySelector('#caption-title').textContent=texts[b.dataset.focus][1];document.querySelector('#caption-copy').textContent=texts[b.dataset.focus][3];});
document.querySelectorAll('[data-reading]').forEach(b=>b.onclick=()=>{stopAuto();changeStep(2);showReading(b.dataset.reading);});
document.querySelectorAll('[data-gong]').forEach(b=>b.onclick=()=>{const g=b.dataset.gong;stopAuto();changeStep(2);selectPalace(g);document.querySelectorAll('[data-reading]').forEach(x=>x.setAttribute('aria-pressed','false'));document.querySelector('#reading-kicker').textContent='震门起伏位 / 八宫游星';document.querySelector('#reading-title').textContent=g==='中'?'中宫立极，不排八宫游星。':`${row(g).direction}${g}宫 · ${row(g).star}`;document.querySelector('#reading-text').textContent=g==='中'?'本例以规则矩形中心为立极点。真实不规则户型需先确认边界与立极口径。':'本格展示方位、游星及五行关系。房间跨宫时还需核定取点与范围，不能用本格星名概括整个房间。';document.querySelector('#relation-line').textContent=g==='中'?'宅心 → 立极 → 分宫':row(g).desc;document.querySelector('#reading-limit').textContent='传统文化规则示例；吉凶还需结合星宫生克及具体应用口径。';document.querySelector('#reading-source').textContent='八宅通法 · 原文待复核。《阳宅爱众篇》卷一“八卦分宫论”“大游年歌”“星宫生克吉凶论”。';});
document.querySelector('#show-bazhai').onchange=e=>{board.visible=e.target.checked&&current>0;};
document.querySelector('#back-demo').onclick=()=>{stopAuto();changeStep(2);panel.scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});};
stage._controls.addEventListener('start',()=>{stopAuto();transition=null;});
new IntersectionObserver(([e])=>{visible=e.isIntersecting;},{threshold:.08}).observe(panel);
function frame(now){const dt=Math.min(now-last,60);last=now;if(visible&&!document.hidden){if(transition){transition.age+=dt;const a=Math.min(1,transition.age/transition.duration),k=a*a*(3-2*a);stage._camera.position.lerpVectors(transition.from,transition.to,k);house.scale.y=transition.scale+(transition.target-transition.scale)*k;stage._controls.update();if(a===1)transition=null;}
 if(automatic&&!paused&&!reduced){elapsed+=dt;const n=Math.min(3,Math.floor(elapsed/4000));if(n!==current)changeStep(n);if(elapsed>=16000)stopAuto();}
 if(holoGroup.visible){const ht=(performance.now()/3400)%1;const hy=.08+ht*3.2;holoGroup.userData.disc.position.y=hy;holoGroup.userData.edge.position.y=hy;holoGroup.userData.disc.material.opacity=.09*(1-ht*.7);holoGroup.userData.edge.material.opacity=.5*(1-ht*.8);}if(marksGroup.visible){const mt=performance.now()/1000;marksGroup.children.forEach((c,i)=>{const h=c.userData.halo;if(h){const k=1+0.08*Math.sin(mt*2.2+i*1.7);h.scale.set(k,k,k);}});}if(scanGroup.visible){for(const sr of scanGroup.children){const p=((performance.now()/3200)+sr.userData.phase)%1;sr.scale.setScalar(.7+p*5.4);sr.material.opacity=.32*(1-p);}} if(compassDisk.visible){compassReveal=Math.min(1,compassReveal+dt/1100);const k=reduced?1:compassReveal*compassReveal*(3-2*compassReveal);compassDisk.scale.setScalar(.78+.22*k);dialMaterial.opacity=1;rim.material.transparent=false;rim.material.opacity=1;}
 if(current===3){if(!flowPaused)flowClock+=dt;animateQi(flowClock);}
 if(current===2){for(const [key,pos] of Object.entries(beacons)){const v=new T.Vector3(...pos).project(stage._camera),pin=document.querySelector(`[data-focus="${key}"]`);pin.style.left=((v.x+1)*50)+'%';pin.style.top=((-v.y+1)*50)+'%';}}}
 requestAnimationFrame(frame);}
const initialMode=new URLSearchParams(location.search).get('mode');setQi(Object.hasOwn(qiModes,initialMode)?initialMode:'flow',false);showReading('door');const query=new URLSearchParams(location.search),qs=Number(query.get('step'));
if(reduced){stopAuto();changeStep(1,true);selectPalace('震');}else if(query.has('step')&&[0,1,2,3].includes(qs)){stopAuto();changeStep(qs,true);}else {stopAuto();changeStep(1,true);selectPalace('震');}
let pointerStart=null;
stage.addEventListener('pointerdown',e=>{pointerStart=[e.clientX,e.clientY];});
stage.addEventListener('pointerup',e=>{if(!pointerStart||!compassDisk.visible||Math.hypot(e.clientX-pointerStart[0],e.clientY-pointerStart[1])>6)return;pointerStart=null;const rect=stage.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,1-(e.clientY-rect.top)/rect.height*2),stage._camera);const hit=ray.intersectObject(dialMesh)[0];if(!hit)return;const v=dialMesh.worldToLocal(hit.point.clone()),r=Math.hypot(v.x,v.y);if(r<5.65||r>8.12)return;const a=(Math.atan2(v.x,v.y)*180/Math.PI+360)%360,g=compassDirs[Math.floor((a+22.5)/45)%8];document.querySelector(`.palaces [data-gong="${g}"]`).click();document.querySelector('#caption-title').textContent=`${row(g).direction}${g}宫 · ${row(g).star}`;document.querySelector('#caption-copy').textContent=row(g).desc;});
requestAnimationFrame(frame);

// 首页翻页模式用：允许外部切换“只留立体宅 / 叠加盘面与九宫”的装饰层，并覆盖状态文案
window.YC_HOME={mode(m){const hs=document.querySelector('.hero-scene');if(hs)hs.classList.toggle('marks-only',m==='marks');},jump(n){stopAuto();changeStep(n,true);},marks(show){marksGroup.visible=!!show;},decor(show){compassDisk.visible=!!show&&current>0&&current<3;board.visible=!!show&&current>0&&current<3&&document.querySelector('#show-bazhai').checked;spot.visible=false;},setStatus(t){const el=document.querySelector('#scene-status');if(el)el.textContent=t;}};
}catch(e){document.querySelector('.hero-scene').classList.add('no-3d');const reason=e&&e.message||'',soft=reason==='no-webgl'||reason==='save-data';document.querySelector('#scene-status').textContent=soft?'平面示例':'3D 加载失败';document.querySelector('#fallback p').textContent=reason==='no-webgl'?'当前设备不支持 3D，已显示平面示例。':reason==='save-data'?'已按省流量设置显示平面示例。':'当前显示平面样例，3D 未能加载。';document.querySelector('#pause').hidden=true;document.querySelector('#replay').hidden=true;document.querySelectorAll('.story-steps button').forEach(b=>b.disabled=true);console.error(e);}
