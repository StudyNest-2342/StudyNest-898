// Dashboard, Profile, Settings, Orders — all under /dashboard/*
const Dash = {
  sections: [
    ["overview", "🏠 Overview"],
    ["downloads", "⬇ Downloads"],
    ["bookmarks", "🔖 Bookmarks"],
    ["wishlist", "❤️ Wishlist"],
    ["activity", "⚡ Recent activity"],
    ["orders", "🧾 Order history"],
    ["notifications", "🔔 Notifications"],
    ["profile", "👤 Profile"],
    ["settings", "⚙️ Settings"],
  ],
};

Pages.dashboard = (section="overview") => {
  const u = Auth.current();
  if(!u){ location.hash="#/login"; return "<div class='container section'><p class='muted'>Redirecting to login…</p></div>"; }

  const side = `
    <aside class="dash-side">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
        <div class="avatar" style="width:52px;height:52px;font-size:1.2rem">${esc(u.avatar)}</div>
        <div><div style="font-weight:700">${esc(u.name)}</div><div class="muted" style="font-size:.82rem">${esc(u.plan)} plan</div></div>
      </div>
      ${Dash.sections.map(([k,l])=>`<a href="#/dashboard/${k}" class="${section===k?'active':''}">${l}</a>`).join("")}
      <button class="btn btn-ghost btn-block" style="margin-top:14px" data-logout>Log out</button>
    </aside>`;

  const body = ({
    overview: dashOverview,
    downloads: dashDownloads,
    bookmarks: dashBookmarks,
    wishlist: dashWishlist,
    activity: dashActivity,
    orders: dashOrders,
    notifications: dashNotifs,
    profile: dashProfile,
    settings: dashSettings,
  }[section] || dashOverview)(u);

  return `<div class="container dash">${side}<div class="dash-main">${body}</div></div>`;
};

function dashOverview(u){
  const dl = UserData.downloads().length;
  const wl = UserData.wish().length;
  const bm = UserData.bookmarks().length;
  const nn = UserData.notifs().filter(n=>!n.read).length;
  const bars = [40,65,55,80,72,90,68].map((h,i)=>`<div class="bar" style="height:${h}%"><span>${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span></div>`).join("");
  return `
    <h2>Welcome back, ${esc(u.name.split(" ")[0])} 👋</h2>
    <p class="muted">Here's a snapshot of your learning this week.</p>
    <div class="stat-grid" style="margin-top:22px">
      <div class="stat-card"><div class="n">${dl}</div><div class="l">Downloads</div><div class="d">+3 this week</div></div>
      <div class="stat-card"><div class="n">${wl}</div><div class="l">Wishlist</div><div class="d">+1 this week</div></div>
      <div class="stat-card"><div class="n">${bm}</div><div class="l">Bookmarks</div><div class="d">Stay organised</div></div>
      <div class="stat-card"><div class="n">${nn}</div><div class="l">Unread alerts</div><div class="d">Check inbox</div></div>
    </div>
    <div class="card" style="padding:24px;margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3>Study minutes · last 7 days</h3><span class="tag">Fictional demo data</span>
      </div>
      <div class="chart"><div class="bars">${bars}</div></div>
    </div>
    <div class="section-head"><div><h3>Continue where you left off</h3></div><a class="btn btn-outline btn-sm" href="#/notes/free">Browse notes</a></div>
    <div class="notes-grid">${(window.NOTES||[]).slice(0,3).map(noteCard).join("")}</div>`;
}
function dashDownloads(){ const l = UserData.downloads().map(d=>noteById(d.id)).filter(Boolean);
  return `<h2>Downloads</h2><p class="muted">Your offline library.</p><div class="notes-grid" style="margin-top:22px">${l.length?l.map(noteCard).join(""):emptyState("Empty","Download a note to see it here.")}</div>`; }
function dashBookmarks(){ const l = UserData.bookmarks().map(id=>noteById(id)).filter(Boolean);
  return `<h2>Bookmarks</h2><div class="notes-grid" style="margin-top:22px">${l.length?l.map(noteCard).join(""):emptyState("No bookmarks","Tap the 🔖 button on any note.")}</div>`; }
function dashWishlist(){ const l = UserData.wish().map(id=>noteById(id)).filter(Boolean);
  return `<h2>Wishlist</h2><div class="notes-grid" style="margin-top:22px">${l.length?l.map(noteCard).join(""):emptyState("Empty","Tap ❤️ on any note.")}</div>`; }
function dashActivity(){
  const items = UserData.downloads().slice(0,10).map(d=>{
    const n = noteById(d.id); if(!n) return "";
    return `<div class="card" style="padding:14px 18px;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div><div style="font-weight:600">Downloaded — ${esc(n.title)}</div><div class="muted" style="font-size:.82rem">${new Date(d.at).toLocaleString()}</div></div>
      <a class="btn btn-outline btn-sm" href="#/note/${n.id}">Open</a></div>`;
  }).join("");
  return `<h2>Recent activity</h2><div style="margin-top:22px">${items||emptyState("Nothing yet","Your activity will show up here.")}</div>`;
}
function dashOrders(){
  const o = UserData.orders();
  return `<h2>Order history</h2><div style="margin-top:22px;display:grid;gap:10px">${o.length?o.map(x=>`
    <div class="card" style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-weight:700">${esc(x.plan)} plan</div><div class="muted" style="font-size:.82rem">${esc(x.id)} · ${new Date(x.at).toLocaleDateString()}</div></div>
      <div style="font-weight:700">${esc(x.price)}</div>
    </div>`).join(""):emptyState("No orders","Upgrade any plan on the pricing page.")}</div>`;
}
function dashNotifs(){ return Pages.notifications().replace('<section class="container section" style="max-width:760px;margin-inline:auto">','<section>').replace('</section>','</section>'); }
function dashProfile(u){
  return `<h2>Profile</h2><p class="muted">This is how you appear across StudyNest.</p>
    <form id="profile-form" class="card" style="padding:26px;margin-top:22px;max-width:520px">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:22px">
        <div class="avatar" style="width:72px;height:72px;font-size:1.6rem">${esc(u.avatar)}</div>
        <div><div style="font-weight:700;font-size:1.1rem">${esc(u.name)}</div><div class="muted">${esc(u.email)}</div></div>
      </div>
      <label class="field"><span>Full name</span><input class="input" name="name" value="${esc(u.name)}" required/></label>
      <label class="field"><span>Email</span><input class="input" type="email" value="${esc(u.email)}" disabled/></label>
      <button class="btn btn-primary">Save changes</button>
    </form>`;
}
function dashSettings(u){
  return `<h2>Settings</h2>
    <div class="card" style="padding:22px;margin-top:22px">
      <h3>Appearance</h3><p class="muted" style="font-size:.9rem;margin-top:4px">Toggle the whole platform between dark and light.</p>
      <div style="margin-top:14px;display:flex;gap:10px">
        <button class="btn btn-outline btn-sm" onclick="document.documentElement.removeAttribute('data-theme');store.set('sn:theme','dark');toast('Dark mode on')">Dark</button>
        <button class="btn btn-outline btn-sm" onclick="document.documentElement.setAttribute('data-theme','light');store.set('sn:theme','light');toast('Light mode on')">Light</button>
      </div>
    </div>
    <div class="card" style="padding:22px;margin-top:16px">
      <h3>Notifications</h3><p class="muted" style="font-size:.9rem;margin-top:4px">Choose what lands in your inbox.</p>
      <label style="display:block;margin-top:10px"><input type="checkbox" checked/> New note releases</label>
      <label style="display:block;margin-top:6px"><input type="checkbox" checked/> Weekly digest</label>
      <label style="display:block;margin-top:6px"><input type="checkbox"/> Promotional offers</label>
    </div>
    <div class="card" style="padding:22px;margin-top:16px;border-color:rgba(239,68,68,.4)">
      <h3 style="color:#fca5a5">Danger zone</h3>
      <p class="muted" style="font-size:.9rem;margin-top:4px">Delete all local data for this account.</p>
      <button class="btn btn-outline btn-sm" style="margin-top:12px;color:#fca5a5;border-color:rgba(239,68,68,.4)" onclick="if(confirm('Delete all local data for this account?')){localStorage.clear();location.hash='#/';location.reload()}">Delete account</button>
    </div>`;
}
