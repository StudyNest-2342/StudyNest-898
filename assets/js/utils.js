// ---- Small helpers ----
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const el = (html) => { const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstElementChild; };
const esc = (s="") => String(s).replace(/[&<>"']/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

const store = {
  get:(k, d=null)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch{ return d; } },
  set:(k, v)=>localStorage.setItem(k, JSON.stringify(v)),
  del:(k)=>localStorage.removeItem(k),
};

function toast(msg, ms=2200){
  const t = $("#toast"); if(!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(()=>t.classList.remove("show"), ms);
}

function fmtNum(n){ if(n>=1000) return (n/1000).toFixed(n>=10000?0:1)+"k"; return String(n); }
function classById(id){ return (window.CLASSES||[]).find(c=>c.id===id); }
function subjectById(id){ return (window.SUBJECTS||[]).find(s=>s.id===id); }
function noteById(id){ return (window.NOTES||[]).find(n=>n.id===id); }

// Wishlist / bookmarks / downloads / notifications
const UserData = {
  key(prefix){ const u=Auth.current(); return `sn:${prefix}:${u?u.email:"guest"}`; },
  wish(){ return store.get(this.key("wish"), []); },
  toggleWish(id){ const list=this.wish(); const i=list.indexOf(id); if(i>=0) list.splice(i,1); else list.push(id); store.set(this.key("wish"), list); return i<0; },
  bookmarks(){ return store.get(this.key("bm"), []); },
  toggleBm(id){ const list=this.bookmarks(); const i=list.indexOf(id); if(i>=0) list.splice(i,1); else list.push(id); store.set(this.key("bm"), list); return i<0; },
  downloads(){ return store.get(this.key("dl"), []); },
  addDownload(id){ const list=this.downloads(); list.unshift({id, at:Date.now()}); store.set(this.key("dl"), list.slice(0,50)); },
  notifs(){
    let n = store.get(this.key("notif"), null);
    if(!n){ n = (window.ANNOUNCEMENTS||[]).map(a=>({...a, read:false})); store.set(this.key("notif"), n); }
    return n;
  },
  markAllRead(){ const n=this.notifs().map(x=>({...x,read:true})); store.set(this.key("notif"), n); },
  orders(){ return store.get(this.key("orders"), []); },
  addOrder(o){ const list=this.orders(); list.unshift({...o, id:"ORD-"+Date.now(), at:Date.now()}); store.set(this.key("orders"), list); },
};

// Reveal-on-scroll
function observeReveal(root=document){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:.1 });
  $$(".reveal", root).forEach(x=>io.observe(x));
}
