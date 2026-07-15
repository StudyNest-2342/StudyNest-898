// Shared UI: header, footer, note card

function renderHeader(){
  const u = Auth.current();
  const menuLinks = [
    ["#/", "Home"],
    ["#/classes", "Classes"],
    ["#/subjects", "Subjects"],
    ["#/notes/premium", "Premium"],
    ["#/notes/free", "Free"],
    ["#/blog", "Blog"],
    ["#/pricing", "Pricing"],
    ["#/contact", "Contact"],
  ];
  const links = menuLinks.map(([h,l])=>`<a href="${h}" data-nav>${l}</a>`).join("");

  const userMenu = u
    ? `<a href="#/dashboard" class="btn btn-ghost btn-sm hide-sm"><span class="avatar" style="width:26px;height:26px;font-size:.75rem">${esc(u.avatar)}</span> ${esc(u.name.split(" ")[0])}</a>
       <button class="btn btn-primary btn-sm" data-logout>Log out</button>`
    : `<a href="#/login" class="btn btn-ghost btn-sm hide-sm">Log in</a>
       <a href="#/signup" class="btn btn-primary btn-sm">Get started</a>`;

  const html = `
    <div class="header">
      <div class="container nav">
        <a class="brand" href="#/">
          <span class="brand-logo">S</span>
          <span>Study<span class="gradient-text">Nest</span></span>
        </a>
        <nav class="nav-links">${links}
          <div class="mega-wrap"><a href="#/downloads" data-nav>More ▾</a>
            <div class="mega">
              <div>
                <h5>Library</h5>
                <a href="#/notes/free">Free notes</a>
                <a href="#/notes/premium">Premium notes</a>
                <a href="#/downloads">Downloads</a>
                <a href="#/wishlist">Wishlist</a>
              </div>
              <div>
                <h5>Company</h5>
                <a href="#/about">About us</a>
                <a href="#/testimonials">Testimonials</a>
                <a href="#/faq">FAQ</a>
                <a href="#/contact">Contact</a>
              </div>
            </div>
          </div>
        </nav>
        <div class="nav-actions">
          <button class="icon-btn hide-sm" data-search title="Search">🔍</button>
          <button class="icon-btn hide-sm" data-theme title="Toggle theme">🌓</button>
          <a class="icon-btn hide-sm" href="#/notifications" title="Notifications">🔔</a>
          ${userMenu}
          <button class="icon-btn mobile-toggle" data-menu title="Menu">☰</button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        ${menuLinks.map(([h,l])=>`<a href="${h}" data-nav>${l}</a>`).join("")}
        <a href="#/dashboard" data-nav>Dashboard</a>
        <a href="#/notifications" data-nav>Notifications</a>
        ${u ? `<button class="btn btn-primary" data-logout>Log out</button>` : `<a class="btn btn-primary" href="#/login">Log in</a>`}
      </div>
    </div>`;
  $("#site-header").innerHTML = html;

  // Event wiring
  $("#site-header").addEventListener("click", (e)=>{
    const t = e.target.closest("[data-logout],[data-theme],[data-menu],[data-search]");
    if(!t) return;
    if(t.hasAttribute("data-logout")){ Auth.logout(); toast("Logged out"); location.hash="#/"; render(); }
    if(t.hasAttribute("data-theme")){
      const cur = document.documentElement.getAttribute("data-theme")==="light"?"":"light";
      if(cur) document.documentElement.setAttribute("data-theme",cur); else document.documentElement.removeAttribute("data-theme");
      store.set("sn:theme", cur||"dark");
    }
    if(t.hasAttribute("data-menu")){ $("#mobile-menu").classList.toggle("open"); }
    if(t.hasAttribute("data-search")){ location.hash="#/search"; }
  });

  // Active link
  const path = location.hash || "#/";
  $$("#site-header a[data-nav]").forEach(a=>{
    if(a.getAttribute("href")===path) a.classList.add("active");
  });
}

function renderFooter(){
  const html = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="#/"><span class="brand-logo">S</span><strong>Study<span class="gradient-text">Nest</span></strong></a>
          <p class="muted" style="margin-top:12px;max-width:340px">Premium notes, curated classes, and a calm space to actually learn. Built for students, teachers and parents.</p>
          <form class="newsletter" onsubmit="event.preventDefault();toast('Subscribed 🎉');this.reset();">
            <input type="email" placeholder="Your email" required />
            <button class="btn btn-primary btn-sm">Subscribe</button>
          </form>
          <div class="socials">
            <a href="#" title="Twitter">𝕏</a><a href="#" title="Instagram">📸</a>
            <a href="#" title="YouTube">▶</a><a href="#" title="LinkedIn">in</a>
          </div>
        </div>
        <div><h5>Learn</h5>
          <a href="#/classes">Classes</a><a href="#/subjects">Subjects</a>
          <a href="#/notes/free">Free notes</a><a href="#/notes/premium">Premium notes</a>
        </div>
        <div><h5>Company</h5>
          <a href="#/about">About</a><a href="#/blog">Blog</a>
          <a href="#/testimonials">Testimonials</a><a href="#/contact">Contact</a>
        </div>
        <div><h5>Support</h5>
          <a href="#/faq">Help center</a><a href="#/downloads">My downloads</a>
          <a href="#/pricing">Pricing</a><a href="#/dashboard">Dashboard</a>
        </div>
        <div><h5>Legal</h5>
          <a href="#/privacy">Privacy Policy</a><a href="#/terms">Terms &amp; Conditions</a>
          <a href="#/refund">Refund Policy</a>
        </div>
      </div>
      <div class="foot-bar">
        <span>© ${new Date().getFullYear()} StudyNest. Built with ♥ for learners.</span>
        <span>Made with vanilla HTML · CSS · JS</span>
      </div>
    </div>`;
  $("#site-footer").innerHTML = html;
}

function noteCard(n){
  const cls = classById(n.class), sub = subjectById(n.subject);
  const wished = UserData.wish().includes(n.id);
  return `
  <article class="card reveal" data-id="${n.id}">
    <div class="thumb" style="background:linear-gradient(135deg,${sub?.color||'#7c5cff'},#22d3ee)">${n.thumb||"📄"}</div>
    <div class="meta">
      ${n.premium?'<span class="tag premium">★ Premium</span>':'<span class="tag free">Free</span>'}
      <span class="tag">${esc(sub?.name||n.subject)}</span>
      <span class="tag">${esc(cls?.name||n.class)}</span>
    </div>
    <h3 style="margin:6px 0 6px">${esc(n.title)}</h3>
    <p class="muted" style="font-size:.9rem;min-height:44px">${esc(n.desc)}</p>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:8px">
      <span class="muted" style="font-size:.8rem">⬇ ${fmtNum(n.downloads||0)} · ${esc(n.semester||"")}</span>
      <div style="display:flex;gap:6px">
        <button class="icon-btn" style="width:34px;height:34px" data-wish="${n.id}" title="Wishlist">${wished?"❤️":"🤍"}</button>
        <a class="btn btn-primary btn-sm" href="#/note/${n.id}">Open</a>
      </div>
    </div>
  </article>`;
}
