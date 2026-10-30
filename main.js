
var CRAFT = {
  edith: {
    tag:'First Build \u2014 Spider-Man: Far From Home EDITH Drone',
    name:'STARK EDITH DRONE',
    uni:'Flight Fiction \u2014 Inspired by Iron Man / MCU',
    desc:"This is a 3D-printed quadcopter with custom modelled armor shell designed and printed. The casing is styled after Tony Stark\u2019s (Iron Man) Stark Industries combat EDITH drones.",
    specs:[
      {l:'Frame',v:'3D Printed PLA'},{l:'Shell Parts',v:'Back, Front, 2x Side Armor'},
      {l:'Status',v:'Complete'}
    ], stl:'edith'
  },
  redwing: {
    tag:'Redwing \u2014 Captain America: Civil War',
    name:"FALCON\u2019S REDWING DRONE",
    uni:'Flight Fiction \u2014 Inspired by Falcon\u2019s Redwing / MCU',
    desc:'This is a compact drone with 3D-printed body panels, PCB casing, tail, and wing structures. Every part is designed and printed from scratch and is inspired by Redwing from the Marvel Cinematic Universe (In the comics, Redwing is a bird!).',
    specs:[
      {l:'Body Parts',v:'Nose, PCB Case, Tail, Wings'},{l:'Material',v:'3D Printed PLA'},
      {l:'Design',v:'Fully Custom CAD'},{l:'Inspiration',v:'MCU Redwing'},
      {l:'Status',v:'Complete'}
    ], stl:'redwing'
  },
  helicarrier: {
    tag:'Fictional Aircraft Model',
    name:"S.H.I.E.L.D. HELICARRIER",
    uni:'Fictional Model \u2014 Inspired by Marvel / MCU',
    desc:'A full single-piece 3D model of the S.H.I.E.L.D. Helicarrier. Open the file to rotate the ~90,600-triangle hull directly in the browser.',
    specs:[
      {l:'Category',v:'Fictional Aircraft Model'},{l:'Format',v:'Single-Piece STL'},
      {l:'Triangle Count',v:'~90,600'},{l:'Purpose',v:'CAD Reference / Visualization'},
      {l:'Real Hardware',v:'No \u2014 Model Only'},{l:'Inspiration',v:'MCU Helicarrier'},
      {l:'Scale Class',v:'Large VTOL Carrier'},{l:'Status',v:'Model Complete'}
    ], stl:'helicarrier'
  },
  tie: {
    tag:'Fictional Aircraft Model \u2014 3D Reference',
    name:"IMPERIAL TIE FIGHTER",
    uni:'Fictional Model \u2014 Inspired by Star Wars (Classic Trilogy)',
    desc:'A full single-piece 3D model of the classic Imperial TIE Fighter. Open the file to rotate the ~246,800-triangle hull directly in the browser.',
    specs:[
      {l:'Category',v:'Fictional Aircraft Model'},{l:'Format',v:'Single-Piece STL'},
      {l:'Triangle Count',v:'~246,800'},{l:'Purpose',v:'CAD Reference / Visualization'},
      {l:'Real Hardware',v:'No \u2014 Model Only'},{l:'Inspiration',v:'Star Wars Classic Trilogy'},
      {l:'Wing Design',v:'Hexagonal Solar Panel'},{l:'Status',v:'Model Complete'}
    ], stl:'tie'
  },
  batwing: {
    tag:'Fictional Aircraft Model \u2014 3D Reference',
    name:"1989 BATWING",
    uni:'Fictional Model \u2014 Inspired by Batman (1989)',
    desc:'A full single-piece 3D model of the 1989 Batwing. Open the file to rotate the ~184,100-triangle hull directly in the browser.',
    specs:[
      {l:'Category',v:'Fictional Aircraft Model'},{l:'Format',v:'Single-Piece STL'},
      {l:'Triangle Count',v:'~184,100'},{l:'Purpose',v:'CAD Reference / Visualization'},
      {l:'Real Hardware',v:'No \u2014 Model Only'},{l:'Inspiration',v:'Batman (1989)'},
      {l:'Wing Design',v:'Flying-Wing / Crescent'},{l:'Status',v:'Model Complete'}
    ], stl:'batwing'
  },
  dune: {
    tag:'Fictional Aircraft Model \u2014 3D Reference',
    name:"DUNE ORNITHOPTER",
    uni:'Fictional Model \u2014 Inspired by Dune',
    desc:'A full single-piece 3D model of the Dune ornithopter \u2014 the insect-winged VTOL aircraft central to Arrakis travel, modelled as a reference study in multi-wing flapping-flight mechanics. Open the file to rotate the ~673,200-triangle hull directly in the browser.',
    specs:[
      {l:'Category',v:'Fictional Aircraft Model'},{l:'Format',v:'Single-Piece STL'},
      {l:'Triangle Count',v:'~673,200'},{l:'Purpose',v:'CAD Reference / Visualization'},
      {l:'Real Hardware',v:'No \u2014 Model Only'},{l:'Inspiration',v:'Dune'},
      {l:'Wing Design',v:'Multi-Wing Flapping'},{l:'Status',v:'Model Complete'}
    ], stl:'dune'
  }
};


// ── CONTENT PATCHES (applied on top of data-media.js) ───────────────────────
(function () {
  try {
    // Redwing: the old top-down photo is no longer shown anywhere
    if (typeof MEDIA !== 'undefined' && MEDIA.redwing) {
      MEDIA.redwing = MEDIA.redwing.filter(function (m) { return m.caption !== 'Top-down view'; });
    }
    // Dune: the page uses the same new render as the card
    var dc = document.getElementById('dune-card-img');
    if (dc && typeof MEDIA !== 'undefined' && MEDIA.dune && MEDIA.dune[0]) MEDIA.dune[0].src = dc.src;
  } catch (e) { /* never block the page */ }
})();

// ── PAGE TRANSITIONS ─────────────────────────────────────────────────────────
var currentPageId = 'home', pageTimer = null;
function showPage(id) {
  if (id === currentPageId) return;
  var prev = document.getElementById('page-' + currentPageId);
  var next = document.getElementById('page-' + id);
  currentPageId = id;
  prev.classList.add('page-exiting');
  prev.classList.remove('page-visible');
  next.classList.remove('page-exiting');
  next.classList.add('active');
  void next.offsetWidth;
  next.classList.add('page-visible');
  if (pageTimer) clearTimeout(pageTimer);
  pageTimer = setTimeout(function(){
    document.querySelectorAll('.page.active').forEach(function(p){
      if (p.id !== 'page-'+currentPageId) p.classList.remove('active','page-exiting');
    });
  }, 440);
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(kick, 80);
}
function goHome(){ showPage('home'); }
function later(id){ setTimeout(function(){ var el=document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth'}); }, 280); }

// ── TABS ─────────────────────────────────────────────────────────────────────
var currentTab = 'overview';
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.modal-tab').forEach(function(b){ b.classList.remove('active'); });
  document.querySelectorAll('.modal-panel').forEach(function(p){ p.classList.remove('active'); });
  var idx = ['overview','specs','model'].indexOf(tab);
  document.querySelectorAll('.modal-tab')[idx].classList.add('active');
  document.getElementById('panel-'+tab).classList.add('active');
  if (tab === 'model' && stlPendingId) { initSTLViewer(stlPendingId); stlPendingId = null; }
}

// ── MEDIA GALLERY ────────────────────────────────────────────────────────────
// Safari/iOS has a long history of unreliably decoding <video src="data:..."> --
// the data: scheme skips the normal resource-loading path video elements
// expect. Converting the base64 payload to a real Blob and handing the
// video element a blob: URL instead is the standard, reliable fix.
function dataURItoBlob(dataURI) {
  var commaIdx = dataURI.indexOf(',');
  var meta = dataURI.slice(5, commaIdx); // strip "data:"
  var mime = meta.split(';')[0] || 'application/octet-stream';
  var bin = atob(dataURI.slice(commaIdx + 1));
  var arr = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], {type: mime});
}
var blobUrlCache = {};
function getBlobUrl(dataUri) {
  if (blobUrlCache[dataUri]) return blobUrlCache[dataUri];
  var url = URL.createObjectURL(dataURItoBlob(dataUri));
  blobUrlCache[dataUri] = url;
  return url;
}
function renderMediaItem(item) {
  if (item.type === 'video') {
    // Offer every encoded format as its own <source> so the browser picks
    // whichever it can actually decode (H.264/MP4 vs VP9/WebM have very
    // different real-world support, esp. on Safari/iOS vs Chrome/Firefox).
    var srcList = item.sources || [{src:item.src, mime:'video/mp4'}];
    var sourceTags = srcList.map(function(s){
      return '<source src="'+getBlobUrl(s.src)+'" type="'+s.mime+'">';
    }).join('');
    return '<video controls playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block;">'+sourceTags+'Your browser does not support this video format.</video>';
  }
  return '<img src="'+item.src+'" alt="'+(item.caption||'')+'" style="width:100%;height:100%;object-fit:cover;display:block;">';
}
function switchMedia(id, idx) {
  var items = MEDIA[id];
  document.getElementById('modal-media-main').innerHTML = renderMediaItem(items[idx]);
  document.querySelectorAll('.mm-thumb').forEach(function(t,i){ t.classList.toggle('active', i===idx); });
}

// ── MODAL ────────────────────────────────────────────────────────────────────
var currentModalId = null, stlPendingId = null, stlRenderer = null;
function openModal(id) {
  var c = CRAFT[id];
  currentModalId = id;
  document.getElementById('modal-tag').textContent = c.tag;
  document.getElementById('modal-name').textContent = c.name;
  document.getElementById('modal-uni').textContent = c.uni;
  document.getElementById('modal-desc').textContent = c.desc;
  document.getElementById('modal-specs').innerHTML = c.specs.map(function(s){
    return '<div><div class="ms-l">'+s.l+'</div><div class="ms-v">'+s.v+'</div></div>';
  }).join('');

  var items = MEDIA[id] || [];
  var main = document.getElementById('modal-media-main');
  var thumbs = document.getElementById('modal-media-thumbs');
  if (items.length) {
    main.innerHTML = renderMediaItem(items[0]);
    if (items.length > 1) {
      thumbs.innerHTML = items.map(function(it,i){
        var cls = 'mm-thumb'+(i===0?' active':'')+(it.type==='video'?' vt':'');
        var tsrc = it.type==='video' ? (MEDIA[id].find(function(m){return m.type==='img';}) || {src:''}).src : it.src;
        return '<div class="'+cls+'" onclick="switchMedia(\''+id+'\',' + i + ')" ><img src="'+tsrc+'" alt=""></div>';
      }).join('');
      thumbs.classList.add('show');
    } else {
      thumbs.innerHTML = '';
      thumbs.classList.remove('show');
    }
  } else {
    main.innerHTML = '';
    thumbs.innerHTML = '';
    thumbs.classList.remove('show');
  }

  // show/hide 3D tab
  var has3d = !!getSTL(c.stl) || hasModelFiles(c.stl);
  document.getElementById('tab-3d').style.display = has3d ? '' : 'none';
  // Hide the tab again if the model files turn out not to exist.
  if (has3d && !getSTL(c.stl)) {
    loadModelFiles(c.stl).then(function(d){
      if (!d && currentModalId === id) document.getElementById('tab-3d').style.display = 'none';
    });
  }
  stlPendingId = id;

  // reset tabs
  currentTab = 'overview';
  document.querySelectorAll('.modal-tab').forEach(function(b){ b.classList.remove('active'); });
  document.querySelectorAll('.modal-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.modal-tab')[0].classList.add('active');
  document.getElementById('panel-overview').classList.add('active');

  // destroy previous STL renderer if any
  if (stlRenderer) { stlRenderer.dispose(); stlRenderer = null; }

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  currentModalId = null;
  if (stlRenderer) { stlRenderer.dispose(); stlRenderer = null; }
}
document.getElementById('modal').addEventListener('click', function(e){ if(e.target===this) closeModal(); });

// ── 3D STL VIEWER ────────────────────────────────────────────────────────────
function b64toArrayBuffer(b64) {
  if (typeof b64 !== 'string') return b64; // already an ArrayBuffer (loaded from assets/models/*.stl)
  var bin = atob(b64);
  var buf = new ArrayBuffer(bin.length);
  var view = new Uint8Array(buf);
  for (var i=0; i<bin.length; i++) view[i] = bin.charCodeAt(i);
  return buf;
}

function parseSTL(buf) {
  // binary STL: 80 header + 4 count + N*(12 normal + 3*12 verts + 2 attr)
  var view = new DataView(buf);
  var count = view.getUint32(80, true);
  var positions = [], normals = [];
  var off = 84;
  for (var i=0; i<count; i++) {
    var nx=view.getFloat32(off,true), ny=view.getFloat32(off+4,true), nz=view.getFloat32(off+8,true);
    off+=12;
    for (var j=0; j<3; j++) {
      positions.push(view.getFloat32(off,true), view.getFloat32(off+4,true), view.getFloat32(off+8,true));
      normals.push(nx,ny,nz);
      off+=12;
    }
    off+=2;
  }
  return {positions: new Float32Array(positions), normals: new Float32Array(normals)};
}

var stlScene, stlMeshes={}, stlCamera, stlRenderer2, stlCanvas2;
var stlDrag={active:false,x:0,y:0};
var stlRot={x:-0.4, y:0.3};
var stlActiveMesh=null, stlPartCache={}, stlActivePart=null;

function showSTLMessage(wrap, ctrls, innerHtml) {
  // Empty/error states are just a short message + maybe a button, not a
  // full 3D canvas -- keep the box a normal card height instead of the
  // aspect-ratio:1/1 square sized for an actual rotating model, or the
  // message ends up looking like a big empty black void.
  wrap.style.aspectRatio = 'auto';
  wrap.style.minHeight = '0';
  wrap.style.height = '280px';
  wrap.innerHTML = '<div class="stl-empty">'+innerHtml+'</div>';
  ctrls.innerHTML = '';
}
// Looks up a model's 3D data without ever throwing. If a data file failed to
// load (missing upload, bad path, network error) the model simply has no 3D tab,
// instead of the page erroring out and breaking every project card.
function getSTL(id) {
  try {
    var all = {
      edith: typeof STL_EDITH !== 'undefined' ? STL_EDITH : null,
      redwing: typeof STL_REDWING !== 'undefined' ? STL_REDWING : null,
      helicarrier: typeof STL_HELICARRIER !== 'undefined' ? STL_HELICARRIER : null,
      tie: typeof STL_TIE !== 'undefined' ? STL_TIE : null,
      batwing: typeof STL_BATWING !== 'undefined' ? STL_BATWING : null,
      dune: typeof STL_DUNE !== 'undefined' ? STL_DUNE : null
    };
    var d = all[id];
    if (!d) return null;
    var keys = Object.keys(d);
    if (!keys.length) return null;
    for (var i = 0; i < keys.length; i++) { if (!d[keys[i]]) return null; }
    return d;
  } catch (e) { return null; }
}
// ── STL FILE LOADING (assets/models/*.stl, listed in js/models.js) ───────────
var stlFileCache = {};
function hasModelFiles(id) {
  return typeof MODEL_FILES !== 'undefined' && !!MODEL_FILES[id];
}
function loadModelFiles(id) {
  if (!hasModelFiles(id)) return Promise.resolve(null);
  if (stlFileCache[id]) return stlFileCache[id];
  var files = MODEL_FILES[id], names = Object.keys(files), data = {};
  stlFileCache[id] = Promise.all(names.map(function(n){
    var urls = [].concat(files[n]);
    return Promise.all(urls.map(function(u){
      return fetch(u).then(function(r){
        if (!r.ok) throw new Error(u + ' ' + r.status);
        return r.arrayBuffer();
      });
    })).then(function(bufs){
      var total = bufs.reduce(function(t,x){ return t + x.byteLength; }, 0);
      var all = new Uint8Array(total), off = 0;
      bufs.forEach(function(x){ all.set(new Uint8Array(x), off); off += x.byteLength; });
      data[n] = all.buffer;
    }).catch(function(){ /* part missing: skip it */ });
  })).then(function(){
    return Object.keys(data).length ? data : null;
  });
  return stlFileCache[id];
}
function initSTLViewer(modalId) {
  var stlData = getSTL(modalId);
  if (stlData) return startSTLViewer(modalId, stlData);
  var wrap = document.getElementById('stl-viewer-wrap');
  var ctrls = document.getElementById('stl-controls');
  if (hasModelFiles(modalId)) {
    showSTLMessage(wrap, ctrls, '<div class="stl-empty-title">LOADING 3D MODEL</div><div>Fetching model files\u2026</div>');
    loadModelFiles(modalId).then(function(d){
      if (currentModalId !== modalId) return; // modal was closed meanwhile
      startSTLViewer(modalId, d);
    });
    return;
  }
  startSTLViewer(modalId, null);
}
function startSTLViewer(modalId, stlData) {
  var wrap = document.getElementById('stl-viewer-wrap');
  var canvas = document.getElementById('stl-canvas');
  var ctrls = document.getElementById('stl-controls');

  if (!stlData) {
    showSTLMessage(wrap, ctrls, '<div class="stl-empty-title">3D MODEL</div><div>No STL files uploaded for this build yet.</div><div class="stl-empty-sub">Files will appear here once added.</div>');
    return;
  }

  // The 3D viewer depends on Three.js loading from a CDN. If that script
  // failed (slow connection, ad blocker, offline, etc.) THREE is undefined
  // and every call below would throw, silently leaving a bare black canvas
  // with no explanation. Fail visibly instead, with a retry option.
  if (typeof THREE === 'undefined') {
    showSTLMessage(wrap, ctrls, '<div class="stl-empty-title">3D VIEWER UNAVAILABLE</div><div>The 3D engine couldn\'t load \u2014 check your connection and try again.</div><button class="stl-retry-btn" onclick="initSTLViewer(\''+modalId+'\')">Retry</button>');
    return;
  }

  try {
    buildSTLScene(modalId, stlData, wrap, ctrls);
  } catch (err) {
    console.error('STL viewer failed:', err);
    showSTLMessage(wrap, ctrls, '<div class="stl-empty-title">3D VIEWER ERROR</div><div>Something went wrong loading this model.</div><button class="stl-retry-btn" onclick="initSTLViewer(\''+modalId+'\')">Retry</button>');
  }
}

function buildSTLScene(modalId, stlData, wrap, ctrls) {

  // Rebuild the canvas each time (innerHTML wipe above may have removed it on a prior empty-state view).
  // Also undo any inline sizing left over from a compact error/empty message.
  wrap.style.aspectRatio = '';
  wrap.style.minHeight = '';
  wrap.style.height = '';
  wrap.innerHTML = '<canvas id="stl-canvas"></canvas>';
  var canvas = document.getElementById('stl-canvas');
  canvas.width = wrap.offsetWidth;
  canvas.height = wrap.offsetHeight;

  stlRenderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true, alpha:false});
  stlRenderer.setSize(wrap.offsetWidth, wrap.offsetHeight);
  stlRenderer.setPixelRatio(window.devicePixelRatio > 1 ? 1.5 : 1);
  stlRenderer.setClearColor(0x060606, 1);

  stlScene = new THREE.Scene();
  stlCamera = new THREE.PerspectiveCamera(42, wrap.offsetWidth/wrap.offsetHeight, 0.1, 4000);

  var amb = new THREE.AmbientLight(0xffffff, 0.45);
  stlScene.add(amb);
  var d1 = new THREE.DirectionalLight(0xffffff, 0.85);
  d1.position.set(1,2,1); stlScene.add(d1);
  var d2 = new THREE.DirectionalLight(0xE8000D, 0.3);
  d2.position.set(-1,-1,-1); stlScene.add(d2);
  var d3 = new THREE.DirectionalLight(0xaaddff, 0.3);
  d3.position.set(0,1,-2); stlScene.add(d3);

  var colors = {
    Back:'#d0d0d0', Front:'#b8b8b8',
    RightArmor:'#E8000D', LeftArmor:'#E8000D',
    Nose:'#cc2200', PCB:'#1a5c1a', Tail:'#cc2200', Wings:'#cc2200',
    Hull:'#9aa4ad'
  };

  var parts = Object.keys(stlData);
  var pivot = new THREE.Group();
  stlScene.add(pivot);
  stlActiveMesh = null;
  stlPartCache = {};

  // Parse every part once up front and cache the raw Float32Arrays + each
  // part's own bounding box. Displaying is then just swapping which single
  // mesh is attached to the pivot -- no re-parsing, and no cross-part
  // bounding-box math that made parts drift out of frame relative to each
  // other when they didn't share a common origin.
  parts.forEach(function(name) {
    var buf = b64toArrayBuffer(stlData[name]);
    var parsed = parseSTL(buf);
    var p = parsed.positions;
    var minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity,minZ=Infinity,maxZ=-Infinity;
    for (var i=0; i<p.length; i+=3) {
      var x=p[i], y=p[i+1], z=p[i+2];
      if (x<minX) minX=x; if (x>maxX) maxX=x;
      if (y<minY) minY=y; if (y>maxY) maxY=y;
      if (z<minZ) minZ=z; if (z>maxZ) maxZ=z;
    }
    stlPartCache[name] = {
      positions: p, normals: parsed.normals,
      center: [(minX+maxX)/2, (minY+maxY)/2, (minZ+maxZ)/2],
      size: Math.max(maxX-minX, maxY-minY, maxZ-minZ) || 1
    };
  });

  // Fixed on-screen target size: every part -- whether it's a tiny nose cone
  // or a huge hull -- gets scaled so its own longest dimension fills the same
  // amount of frame. That's what makes single-part viewing both "positioned
  // correctly" (each part centers on itself, not a stale multi-part bbox)
  // and "a lot bigger" (small parts no longer render tiny next to big ones).
  var TARGET_SIZE = 230;
  var CAMERA_DIST = 300;

  function showPart(name) {
    if (stlActiveMesh) { pivot.remove(stlActiveMesh); stlActiveMesh.geometry.dispose(); stlActiveMesh.material.dispose(); }
    var cache = stlPartCache[name];
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(cache.positions,3));
    geo.setAttribute('normal', new THREE.BufferAttribute(cache.normals,3));
    var mat = new THREE.MeshPhongMaterial({color: colors[name] || '#cccccc', shininess:40, specular:'#333'});
    var mesh = new THREE.Mesh(geo, mat);
    var scale = TARGET_SIZE / cache.size;
    mesh.position.set(-cache.center[0]*scale, -cache.center[1]*scale, -cache.center[2]*scale);
    mesh.scale.set(scale,scale,scale);
    pivot.add(mesh);
    stlActiveMesh = mesh;
    stlActivePart = name;
    document.querySelectorAll('.stl-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.part === name); });
    stlRot.x=-0.3; stlRot.y=0.4;
  }

  stlCamera.position.set(0, 20, CAMERA_DIST);
  stlCamera.lookAt(0,0,0);

  var ctrlHtml = parts.map(function(name){
    return '<button class="stl-btn" data-part="'+name+'" onclick="selectPart(\''+name+'\')">'+name.replace(/([A-Z])/g,' $1').trim()+'</button>';
  }).join('');
  ctrlHtml += '<span class="stl-info">Drag to rotate &bull; Scroll to zoom</span>';
  ctrls.innerHTML = ctrlHtml;

  showPart(parts[0]);

  canvas.onmousedown = function(e){ stlDrag.active=true; stlDrag.x=e.clientX; stlDrag.y=e.clientY; };
  window.onmousemove = function(e){
    if (!stlDrag.active) return;
    var dx=e.clientX-stlDrag.x, dy=e.clientY-stlDrag.y;
    stlRot.y+=dx*0.008; stlRot.x+=dy*0.008;
    stlDrag.x=e.clientX; stlDrag.y=e.clientY;
  };
  window.onmouseup = function(){ stlDrag.active=false; };
  canvas.onwheel = function(e){
    e.preventDefault();
    stlCamera.position.z += e.deltaY * 0.4;
    stlCamera.position.z = Math.max(90, Math.min(900, stlCamera.position.z));
  };
  // Touch support (drag to rotate, pinch not implemented -- single-finger rotate is enough here)
  canvas.ontouchstart = function(e){ var t=e.touches[0]; stlDrag.active=true; stlDrag.x=t.clientX; stlDrag.y=t.clientY; };
  canvas.ontouchmove = function(e){
    if (!stlDrag.active) return;
    var t=e.touches[0];
    var dx=t.clientX-stlDrag.x, dy=t.clientY-stlDrag.y;
    stlRot.y+=dx*0.008; stlRot.x+=dy*0.008;
    stlDrag.x=t.clientX; stlDrag.y=t.clientY;
    e.preventDefault();
  };
  canvas.ontouchend = function(){ stlDrag.active=false; };

  window.selectPart = function(name) { showPart(name); };

  function animate() {
    if (!stlRenderer || !stlScene) return;
    requestAnimationFrame(animate);
    pivot.rotation.y = stlRot.y;
    pivot.rotation.x = stlRot.x;
    stlRenderer.render(stlScene, stlCamera);
  }
  animate();
}

// ── POSTS ────────────────────────────────────────────────────────────────────


document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ closeModal(); } });

// ── SCROLL OBSERVER ──────────────────────────────────────────────────────────
function kick() {
  document.querySelectorAll('.fu').forEach(function(el){
    if (el.getBoundingClientRect().top < window.innerHeight*0.93) el.classList.add('on');
  });
}
var obs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('on'); });
},{threshold:0.07});
document.querySelectorAll('.fu').forEach(function(el){ obs.observe(el); });
window.addEventListener('scroll', kick);
window.addEventListener('load', kick);

