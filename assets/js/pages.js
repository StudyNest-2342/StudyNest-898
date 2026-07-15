// All page renderers. Each returns HTML string; router calls it and mounts.

const Pages = {};

// ------- HOME -------
Pages.home = () => {
  const latest = [...(window.NOTES||[])].sort((a,b)=>new Date(b.updated)-new Date(a.updated)).slice(0,6);
  const classesTop = (window.CLASSES||[]).slice(0,6);
  const t = (window.TESTIMONIALS||[]).slice(0,3);

  return `
  <section class="hero container">
    <div class="hero-grid">
      <div>
        <span class="eyebrow">🎓 Trusted by 200k+ students</span>
        <h1>Learn calmly. <span class="gradient-text">Revise smarter.</span> Excel confidently.</h1>
        <p class="lead">A curated library of premium notes, mind maps and past-paper solutions — for every class, every subject, every board.</p>
        <div class="hero-cta">
          <a class="btn btn-primary" href="#/notes/free">Browse free notes →</a>
          <a class="btn btn-ghost" href="#/pricing">See plans</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><span class="num" data-count="12000">0</span><span class="lbl">Notes & resources</span></div>
          <div class="stat"><span class="num" data-count="200">0</span><span class="lbl">k+ learners</span></div>
          <div class="stat"><span class="num" data-count="98">0</span><span class="lbl">% satisfaction</span></div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="blob"></div>
        <div class="hero-cards">
          <div class="hero-card c1"><div class="row"><div class="dot">📗</div><div><div class="t">Class 12 · Physics</div><div class="s">Just updated · 12 min</div></div></div></div>
          <div class="hero-card c2"><div class="row"><div class="dot">🧪</div><div><div class="t">Organic Reactions</div><div class="s">Mind-map · Premium</div></div></div></div>
          <div class="hero-card c3"><div class="row"><div class="dot">📘</div><div><div class="t">Trigonometry Hub</div><div class="s">Cheatsheet · Free</div></div></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section container">
    <div class="features">
      ${[
        ["📚","Curated by educators","Every note is reviewed by senior teachers before it ships."],
        ["⚡","Instant downloads","Grab any PDF in one click. Works fully offline."],
        ["🎯","Exam-first design","Built around what actually appears in boards & entrance exams."],
        ["💜","Free forever tier","Hundreds of resources at zero cost. No card required."],
      ].map(([i,t,d])=>`<div class="feature reveal"><div class="ico">${i}</div><h4>${t}</h4><p>${d}</p></div>`).join("")}
    </div>
  </section>

  <section class="section container">
    <div class="section-head">
      <div>
        <span class="eyebrow">Latest drops</span>
        <h2>Fresh notes, hot off the press</h2>
        <p>New releases from our editors this week.</p>
      </div>
      <a class="btn btn-outline" href="#/notes/free">View all</a>
    </div>
    <div class="notes-grid">${latest.map(noteCard).join("")}</div>
  </section>

  <section class="section container">
    <div class="section-head">
      <div><span class="eyebrow">Explore</span><h2>Pick your class</h2></div>
      <a class="btn btn-outline" href="#/classes">All classes</a>
    </div>
    <div class="classes-grid">
      ${classesTop.map(c=>`
        <a href="#/class/${c.id}" class="card reveal" style="text-decoration:none">
          <div style="font-size:2.6rem">${c.emoji}</div>
          <h3 style="margin-top:8px">${esc(c.name)}</h3>
          <p class="muted" style="font-size:.88rem;margin-top:4px">${esc(c.desc)}</p>
          <div class="muted" style="font-size:.8rem;margin-top:10px">👥 ${esc(c.students)}</div>
        </a>`).join("")}
    </div>
  </section>

  <section class="section container">
    <div class="section-head"><div><span class="eyebrow">Loved by students</span><h2>What learners are saying</h2></div>
      <a class="btn btn-outline" href="#/testimonials">Read more</a></div>
    <div class="tst-grid">
      ${t.map(x=>`<div class="tst-card reveal"><div class="stars">★★★★★</div><q>${esc(x.text)}</q>
        <div class="tst-user"><div class="avatar">${esc(x.initial)}</div><div><div style="font-weight:600">${esc(x.name)}</div><div class="muted" style="font-size:.82rem">${esc(x.role)}</div></div></div></div>`).join("")}
    </div>
  </section>

  <section class="section container">
    <div class="glass" style="padding:52px;text-align:center;background:linear-gradient(135deg,rgba(124,92,255,.18),rgba(34,211,238,.10))">
      <h2>Ready to raise your average?</h2>
      <p class="muted" style="margin:10px auto 22px;max-width:520px">Join 200,000+ students already using StudyNest. Start free, upgrade whenever.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a class="btn btn-primary" href="#/signup">Create free account</a>
        <a class="btn btn-ghost" href="#/pricing">Compare plans</a>
      </div>
    </div>
  </section>`;
};

// ------- ABOUT -------
Pages.about = () => `
  <section class="container section">
    <div style="max-width:780px">
      <span class="eyebrow">About us</span>
      <h1 style="margin-top:14px">Notes that respect your time.</h1>
      <p class="muted" style="font-size:1.15rem;margin-top:16px">
        StudyNest started as a shared Google Drive between three friends preparing for boards.
        Today it's a curated, teacher-reviewed library used by over two hundred thousand students across India.
      </p>
    </div>
    <div class="features" style="margin-top:48px">
      ${[
        ["🎯","Our mission","Make world-class study material accessible to every student, regardless of city or budget."],
        ["📖","Our method","Every note is written by senior teachers, edited for clarity, and reviewed by exam toppers."],
        ["💬","Our promise","No paywalls on essentials. No dark patterns. No selling your data. Ever."],
        ["🌱","Our roots","Built by students, for students — with feedback shaping every release."],
      ].map(([i,t,d])=>`<div class="feature reveal"><div class="ico">${i}</div><h4>${t}</h4><p>${d}</p></div>`).join("")}
    </div>
    <div class="section-head" style="margin-top:60px"><div><h2>The team</h2><p>Educators, engineers and designers who care about learning outcomes.</p></div></div>
    <div class="tst-grid">
      ${[["Ananya Rao","Head of Content","AR"],["Kabir Shah","Product Design","KS"],["Meera Iyer","Curriculum Lead","MI"]]
        .map(([n,r,i])=>`<div class="tst-card reveal"><div class="tst-user"><div class="avatar">${i}</div><div><div style="font-weight:600">${n}</div><div class="muted" style="font-size:.82rem">${r}</div></div></div><p class="muted" style="margin-top:12px">Ten years of teaching, obsessed with clarity and calm.</p></div>`).join("")}
    </div>
  </section>`;

// ------- CLASSES + CLASS DETAILS -------
Pages.classes = () => `
  <section class="container section">
    <span class="eyebrow">All classes</span>
    <h1 style="margin-top:12px">Choose your class</h1>
    <p class="muted" style="max-width:560px;margin-top:8px">Structured notes, chapter-wise revision material and past-paper packs.</p>
    <div class="classes-grid" style="margin-top:36px">
      ${(window.CLASSES||[]).map(c=>`
        <a href="#/class/${c.id}" class="card reveal" style="text-decoration:none">
          <div style="font-size:2.6rem">${c.emoji}</div>
          <h3 style="margin-top:8px">${esc(c.name)}</h3>
          <p class="muted" style="font-size:.88rem;margin-top:4px">${esc(c.desc)}</p>
          <div class="muted" style="font-size:.8rem;margin-top:10px">👥 ${esc(c.students)}</div>
        </a>`).join("")}
    </div>
  </section>`;

Pages.classDetail = (id) => {
  const c = classById(id); if(!c) return Pages.notFound();
  const notes = (window.NOTES||[]).filter(n=>n.class===id);
  return `
  <section class="container section">
    <a href="#/classes" class="muted">← All classes</a>
    <div style="display:flex;gap:20px;align-items:center;margin-top:14px">
      <div style="font-size:3.4rem">${c.emoji}</div>
      <div><h1>${esc(c.name)}</h1><p class="muted">${esc(c.desc)}</p></div>
    </div>
    <div class="section-head" style="margin-top:44px"><div><h2>Notes for ${esc(c.name)}</h2><p>${notes.length} resources available</p></div></div>
    <div class="notes-grid">${notes.length?notes.map(noteCard).join(""):emptyState("No notes yet","We're cooking new material for this class.")}</div>
  </section>`;
};

// ------- SUBJECTS -------
Pages.subjects = () => `
  <section class="container section">
    <span class="eyebrow">Subjects</span>
    <h1 style="margin-top:12px">Explore by subject</h1>
    <div class="classes-grid" style="margin-top:36px">
      ${(window.SUBJECTS||[]).map(s=>`
        <a href="#/subject/${s.id}" class="card reveal" style="text-decoration:none">
          <div style="font-size:2.4rem">${s.emoji}</div>
          <h3 style="margin-top:8px">${esc(s.name)}</h3>
          <p class="muted" style="font-size:.88rem;margin-top:4px">${esc(s.desc)}</p>
        </a>`).join("")}
    </div>
  </section>`;

Pages.subjectDetail = (id) => {
  const s = subjectById(id); if(!s) return Pages.notFound();
  const notes = (window.NOTES||[]).filter(n=>n.subject===id);
  return `
  <section class="container section">
    <a href="#/subjects" class="muted">← All subjects</a>
    <div style="display:flex;gap:20px;align-items:center;margin-top:14px">
      <div style="width:70px;height:70px;border-radius:18px;background:linear-gradient(135deg,${s.color},#22d3ee);display:grid;place-items:center;font-size:2rem">${s.emoji}</div>
      <div><h1>${esc(s.name)}</h1><p class="muted">${esc(s.desc)}</p></div>
    </div>
    <div class="section-head" style="margin-top:44px"><div><h2>${esc(s.name)} notes</h2><p>${notes.length} resources</p></div></div>
    <div class="notes-grid">${notes.length?notes.map(noteCard).join(""):emptyState("No notes yet","Check back soon.")}</div>
  </section>`;
};

// ------- NOTES LIST (premium/free/search) -------
function notesListPage({title, subtitle, filter=()=>true}) {
  const all = (window.NOTES||[]).filter(filter);
  const q = new URLSearchParams(location.hash.split("?")[1]||"").get("q")||"";
  return `
  <section class="container section">
    <span class="eyebrow">${esc(subtitle)}</span>
    <h1 style="margin-top:12px">${esc(title)}</h1>
    <div class="searchbar" style="margin-top:24px;max-width:640px">
      <span style="padding-left:8px">🔍</span>
      <input id="q" type="text" placeholder="Search by title, tag or subject..." value="${esc(q)}"/>
      <button class="btn btn-primary btn-sm" id="qbtn">Search</button>
    </div>
    <div class="filters" id="filters">
      <button class="chip active" data-f="all">All</button>
      ${(window.SUBJECTS||[]).map(s=>`<button class="chip" data-f="sub:${s.id}">${s.emoji} ${esc(s.name)}</button>`).join("")}
      ${(window.CLASSES||[]).slice(0,5).map(c=>`<button class="chip" data-f="cls:${c.id}">${esc(c.name)}</button>`).join("")}
      <button class="chip" data-f="premium">★ Premium</button>
      <button class="chip" data-f="free">Free</button>
    </div>
    <div class="notes-grid" id="notes-grid">${all.map(noteCard).join("")||emptyState("Nothing here","Adjust your filters.")}</div>
  </section>`;
}

Pages.notesFree = () => notesListPage({title:"Free notes", subtitle:"Zero cost, all quality", filter:n=>!n.premium});
Pages.notesPremium = () => notesListPage({title:"Premium notes", subtitle:"Curated deep-dives", filter:n=>n.premium});
Pages.search = () => notesListPage({title:"Search everything", subtitle:"Notes · Subjects · Classes"});

function wireNotesFilters(){
  const grid = $("#notes-grid"); if(!grid) return;
  let active = "all"; let query="";
  const apply = () => {
    let list = window.NOTES||[];
    if(active.startsWith("sub:")) list = list.filter(n=>n.subject===active.slice(4));
    else if(active.startsWith("cls:")) list = list.filter(n=>n.class===active.slice(4));
    else if(active==="premium") list = list.filter(n=>n.premium);
    else if(active==="free") list = list.filter(n=>!n.premium);
    if(query){
      const q=query.toLowerCase();
      list = list.filter(n=>[n.title,n.desc,...(n.tags||[]),n.subject,n.class].join(" ").toLowerCase().includes(q));
    }
    grid.innerHTML = list.length?list.map(noteCard).join(""):emptyState("No matches","Try a different search or filter.");
    observeReveal(grid);
  };
  $$("#filters .chip").forEach(c=>c.addEventListener("click",()=>{
    $$("#filters .chip").forEach(x=>x.classList.remove("active")); c.classList.add("active");
    active = c.dataset.f; apply();
  }));
  const qi = $("#q"), qb=$("#qbtn");
  const doSearch = ()=>{ query = qi.value.trim(); apply(); };
  qi.addEventListener("input", doSearch);
  qb.addEventListener("click", doSearch);
  if(qi.value) doSearch();
}

// ------- CLASS DETAIL (already above) / SUBJECT DETAIL / NOTE DETAIL -------
Pages.noteDetail = (id) => {
  const n = noteById(id); if(!n) return Pages.notFound();
  const cls = classById(n.class), sub = subjectById(n.subject);
  const related = (window.NOTES||[]).filter(x=>x.id!==id && (x.subject===n.subject||x.class===n.class)).slice(0,3);
  return `
  <section class="container section">
    <a href="#/notes/${n.premium?'premium':'free'}" class="muted">← Back to notes</a>
    <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:32px;margin-top:20px" class="note-detail-grid">
      <div>
        <div style="aspect-ratio:16/9;border-radius:20px;background:linear-gradient(135deg,${sub?.color||'#7c5cff'},#22d3ee);display:grid;place-items:center;font-size:5rem">${n.thumb}</div>
        <div class="meta" style="margin-top:18px">
          ${n.premium?'<span class="tag premium">★ Premium</span>':'<span class="tag free">Free</span>'}
          <span class="tag">${esc(sub?.name)}</span><span class="tag">${esc(cls?.name)}</span>
          <span class="tag">${esc(n.semester||"")}</span>${(n.tags||[]).map(t=>`<span class="tag">#${esc(t)}</span>`).join("")}
        </div>
        <h1 style="margin-top:14px">${esc(n.title)}</h1>
        <p class="muted" style="margin-top:12px;font-size:1.05rem">${esc(n.desc)}</p>
        <h3 style="margin-top:24px">What's inside</h3>
        <ul style="margin-top:8px;padding-left:20px;color:var(--text-dim)">
          <li>Concept-first explanations with real-world context</li>
          <li>Solved examples ordered by difficulty</li>
          <li>Common mistakes and exam traps to avoid</li>
          <li>Printable summary sheet at the end</li>
        </ul>
      </div>
      <aside class="glass" style="padding:24px;height:fit-content;position:sticky;top:90px">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div><div class="muted" style="font-size:.8rem">Format</div><div style="font-weight:700">PDF · ${esc(n.category||"Notes")}</div></div>
          <div style="text-align:right"><div class="muted" style="font-size:.8rem">Updated</div><div style="font-weight:700">${esc(n.updated||"")}</div></div>
        </div>
        <div style="display:flex;gap:10px;margin-top:20px">
          <button class="btn btn-primary btn-block" data-download="${n.id}">⬇ Download PDF</button>
        </div>
        <button class="btn btn-ghost btn-block" style="margin-top:8px" data-wish="${n.id}">${UserData.wish().includes(n.id)?'❤️ In wishlist':'🤍 Add to wishlist'}</button>
        <button class="btn btn-outline btn-block" style="margin-top:8px" data-bm="${n.id}">🔖 Bookmark</button>
        <div class="muted" style="font-size:.82rem;margin-top:14px;text-align:center">⬇ ${fmtNum(n.downloads||0)} downloads</div>
      </aside>
    </div>

    ${related.length?`<div class="section-head" style="margin-top:60px"><div><h2>Related notes</h2></div></div>
    <div class="notes-grid">${related.map(noteCard).join("")}</div>`:""}
  </section>`;
};

// ------- DOWNLOADS / WISHLIST / NOTIFICATIONS -------
Pages.downloads = () => {
  const list = UserData.downloads().map(d=>noteById(d.id)).filter(Boolean);
  return `
  <section class="container section">
    <span class="eyebrow">Your library</span><h1 style="margin-top:12px">Downloads</h1>
    <p class="muted">Everything you've saved for offline reading.</p>
    <div class="notes-grid" style="margin-top:28px">${list.length?list.map(noteCard).join(""):emptyState("No downloads yet","Open any note and hit Download.")}</div>
  </section>`;
};

Pages.wishlist = () => {
  const list = UserData.wish().map(id=>noteById(id)).filter(Boolean);
  return `
  <section class="container section">
    <span class="eyebrow">Saved for later</span><h1 style="margin-top:12px">Wishlist</h1>
    <div class="notes-grid" style="margin-top:28px">${list.length?list.map(noteCard).join(""):emptyState("Nothing saved yet","Tap the ❤️ on any note to save it here.")}</div>
  </section>`;
};

Pages.notifications = () => {
  const items = UserData.notifs();
  UserData.markAllRead();
  return `
  <section class="container section" style="max-width:760px;margin-inline:auto">
    <div class="section-head"><div><span class="eyebrow">Inbox</span><h1 style="margin-top:12px">Notifications</h1></div></div>
    <div style="display:grid;gap:10px">
      ${items.length?items.map(x=>`
        <div class="card" style="padding:16px 20px;display:flex;gap:14px;align-items:center">
          <div style="width:38px;height:38px;border-radius:10px;background:var(--grad-1);display:grid;place-items:center">${x.type==='promo'?'🎁':x.type==='event'?'📅':x.type==='update'?'✨':'🔔'}</div>
          <div style="flex:1"><div style="font-weight:600">${esc(x.title)}</div><div class="muted" style="font-size:.82rem">${esc(x.date)}</div></div>
        </div>`).join(""):emptyState("All caught up","We'll ping you when something new drops.")}
    </div>
  </section>`;
};

// ------- PRICING / TESTIMONIALS / FAQ / BLOG -------
Pages.pricing = () => `
  <section class="container section">
    <div style="text-align:center;max-width:640px;margin-inline:auto">
      <span class="eyebrow">Pricing</span>
      <h1 style="margin-top:12px">Simple, fair pricing</h1>
      <p class="muted" style="margin-top:10px">Start free forever. Upgrade only when you need the deep library.</p>
    </div>
    <div class="pricing-grid" style="margin-top:44px">
      ${(window.PRICING||[]).map(p=>`
        <div class="price-card reveal ${p.featured?'featured':''}">
          ${p.featured?'<div class="badge-pop">Most popular</div>':''}
          <h3>${esc(p.name)}</h3>
          <div class="price">${esc(p.price)}<span style="font-size:1rem;font-weight:500;color:var(--muted)">${esc(p.period)}</span></div>
          <p class="muted">${esc(p.desc)}</p>
          <ul>${p.features.map(f=>`<li>${esc(f)}</li>`).join("")}</ul>
          <button class="btn btn-primary btn-block" data-buy="${p.id}">${esc(p.cta)}</button>
        </div>`).join("")}
    </div>
  </section>`;

Pages.testimonials = () => `
  <section class="container section">
    <div style="text-align:center;max-width:640px;margin-inline:auto">
      <span class="eyebrow">Testimonials</span><h1 style="margin-top:12px">Real stories, real results</h1>
    </div>
    <div class="tst-grid" style="margin-top:44px">
      ${(window.TESTIMONIALS||[]).map(x=>`<div class="tst-card reveal"><div class="stars">★★★★★</div><q>${esc(x.text)}</q>
        <div class="tst-user"><div class="avatar">${esc(x.initial)}</div><div><div style="font-weight:600">${esc(x.name)}</div><div class="muted" style="font-size:.82rem">${esc(x.role)}</div></div></div></div>`).join("")}
    </div>
  </section>`;

Pages.faq = () => `
  <section class="container section">
    <div style="text-align:center;max-width:640px;margin-inline:auto">
      <span class="eyebrow">Help center</span><h1 style="margin-top:12px">Frequently asked</h1>
    </div>
    <div class="faq-list" style="margin-top:36px" id="faq">
      ${(window.FAQS||[]).map((f,i)=>`<div class="faq-item ${i===0?'open':''}"><div class="faq-q">${esc(f.q)}<span class="plus">+</span></div><div class="faq-a">${esc(f.a)}</div></div>`).join("")}
    </div>
  </section>`;

Pages.blog = () => `
  <section class="container section">
    <span class="eyebrow">Journal</span><h1 style="margin-top:12px">The StudyNest Blog</h1>
    <p class="muted">Study strategies, exam breakdowns and student stories.</p>
    <div class="blog-grid" style="margin-top:36px">
      ${(window.BLOGS||[]).map(b=>`
        <a href="#/blog/${b.id}" class="card blog-card reveal" style="text-decoration:none">
          <div class="thumb">${b.cover||"📖"}</div>
          <div class="meta"><span class="tag">${esc(b.tag)}</span><span class="tag">${esc(b.read)}</span></div>
          <h3 style="margin-top:6px">${esc(b.title)}</h3>
          <p class="muted" style="font-size:.88rem;margin-top:6px">${esc(b.excerpt)}</p>
          <div class="muted" style="font-size:.8rem;margin-top:12px">${esc(b.author)} · ${esc(b.date)}</div>
        </a>`).join("")}
    </div>
  </section>`;

Pages.blogSingle = (id) => {
  const b = (window.BLOGS||[]).find(x=>x.id===id); if(!b) return Pages.notFound();
  return `
  <section class="container section blog-single">
    <a href="#/blog" class="muted">← All posts</a>
    <div class="cover" style="margin-top:14px;display:grid;place-items:center;font-size:5rem">${b.cover}</div>
    <span class="tag">${esc(b.tag)}</span>
    <h1 style="margin-top:14px">${esc(b.title)}</h1>
    <div class="muted" style="margin-top:8px">${esc(b.author)} · ${esc(b.date)} · ${esc(b.read)} read</div>
    <p>${esc(b.excerpt)}</p>
    <h3>Why this matters</h3>
    <p>Learning is a compounding game. Small daily habits, executed for weeks, outperform week-long cramming sessions every single time. The best students aren't the ones who study the longest — they're the ones who study the smartest.</p>
    <h3>Step by step</h3>
    <p>1. Start with the syllabus. Print it. Tick chapters as you master them.</p>
    <p>2. For each chapter, do a 25-minute active-recall session followed by 5 minutes of review.</p>
    <p>3. End every week with a 60-minute mixed-practice quiz using past papers.</p>
    <h3>What to do next</h3>
    <p>Pick one habit from this post and commit to it for the next 14 days. Track it. Then come back and tell us how it went — we love hearing from readers.</p>
  </section>`;
};

// ------- CONTACT -------
Pages.contact = () => `
  <section class="container section">
    <span class="eyebrow">Contact</span><h1 style="margin-top:12px">Let's talk</h1>
    <p class="muted" style="max-width:520px">Question, feedback or partnership? We reply within one working day.</p>
    <div class="contact-grid" style="margin-top:36px">
      <form class="card" id="contact-form" style="padding:28px">
        <label class="field"><span>Name</span><input class="input" name="name" required/></label>
        <label class="field"><span>Email</span><input class="input" type="email" name="email" required/></label>
        <label class="field"><span>Subject</span><input class="input" name="subject" required/></label>
        <label class="field"><span>Message</span><textarea class="input" name="msg" rows="5" required></textarea></label>
        <button class="btn btn-primary btn-block">Send message</button>
      </form>
      <div class="contact-info card" style="padding:28px">
        <div class="info-item"><div class="ico">📍</div><div><div style="font-weight:600">HQ</div><div class="muted">4th Floor, Innov8, Koramangala, Bengaluru, India</div></div></div>
        <div class="info-item"><div class="ico">✉️</div><div><div style="font-weight:600">Email</div><div class="muted">hello@studynest.app</div></div></div>
        <div class="info-item"><div class="ico">📞</div><div><div style="font-weight:600">Phone</div><div class="muted">+91 80 4567 8901</div></div></div>
        <div class="info-item" style="border:none"><div class="ico">⏰</div><div><div style="font-weight:600">Hours</div><div class="muted">Mon–Sat · 9am – 7pm IST</div></div></div>
      </div>
    </div>
  </section>`;

// ------- AUTH PAGES -------
Pages.login = () => {
  const remembered = store.get("sn:remember","");
  return `
  <div class="auth-wrap container">
    <div class="auth-card glass">
      <h2>Welcome back</h2>
      <p class="sub">Log in to continue learning.</p>
      <form id="login-form">
        <label class="field"><span>Email</span><input class="input" type="email" name="email" value="${esc(remembered)}" required/></label>
        <label class="field"><span>Password</span><input class="input" type="password" name="password" minlength="6" required/></label>
        <label style="display:flex;justify-content:space-between;align-items:center;font-size:.9rem;margin:10px 0 18px">
          <span><input type="checkbox" name="remember" ${remembered?"checked":""}/> Remember me</span>
          <a href="#/forgot" style="color:var(--primary)">Forgot?</a>
        </label>
        <button class="btn btn-primary btn-block">Log in</button>
      </form>
      <div class="divider">or</div>
      <p style="text-align:center" class="muted">New here? <a href="#/signup" style="color:var(--primary)">Create an account</a></p>
    </div>
  </div>`;
};

Pages.signup = () => `
  <div class="auth-wrap container">
    <div class="auth-card glass">
      <h2>Create your account</h2>
      <p class="sub">Free forever. No card required.</p>
      <form id="signup-form">
        <label class="field"><span>Full name</span><input class="input" name="name" required/></label>
        <label class="field"><span>Email</span><input class="input" type="email" name="email" required/></label>
        <label class="field"><span>Password</span><input class="input" type="password" name="password" minlength="6" required/></label>
        <button class="btn btn-primary btn-block" style="margin-top:8px">Create account</button>
      </form>
      <div class="divider">or</div>
      <p style="text-align:center" class="muted">Already have one? <a href="#/login" style="color:var(--primary)">Log in</a></p>
    </div>
  </div>`;

Pages.forgot = () => `
  <div class="auth-wrap container">
    <div class="auth-card glass">
      <h2>Reset password</h2>
      <p class="sub">Enter your email and pick a new password. (Demo: instant reset.)</p>
      <form id="forgot-form">
        <label class="field"><span>Email</span><input class="input" type="email" name="email" required/></label>
        <label class="field"><span>New password</span><input class="input" type="password" name="password" minlength="6" required/></label>
        <button class="btn btn-primary btn-block">Reset password</button>
      </form>
      <p style="text-align:center;margin-top:14px" class="muted"><a href="#/login" style="color:var(--primary)">Back to login</a></p>
    </div>
  </div>`;

// ------- LEGAL -------
function legal(title, sections){
  return `<section class="container section legal">
    <span class="eyebrow">Legal</span><h1 style="margin-top:12px">${esc(title)}</h1>
    <p class="muted">Last updated: December 2025</p>
    ${sections.map(([h,p])=>`<h3>${esc(h)}</h3><p>${esc(p)}</p>`).join("")}
  </section>`;
}
Pages.privacy = () => legal("Privacy Policy", [
  ["What we collect","For this demo, we only store your name, email and preferences locally in your browser. No data leaves your device."],
  ["Cookies","We use minimal cookies for theme preference and remember-me. No third-party tracking."],
  ["Your rights","You can clear all data anytime from Settings → Delete account."],
  ["Contact","Questions? Email privacy@studynest.app."],
]);
Pages.terms = () => legal("Terms & Conditions", [
  ["Use of the platform","You agree to use StudyNest for lawful, personal educational purposes only."],
  ["Content ownership","All notes, mind maps and materials are copyright StudyNest or their authors. Do not redistribute without written permission."],
  ["Premium subscriptions","Billed monthly, cancel anytime. Renews automatically until cancelled."],
  ["Limitation of liability","StudyNest is provided as-is. We aim for accuracy but recommend cross-checking with your textbook."],
]);
Pages.refund = () => legal("Refund Policy", [
  ["Seven-day guarantee","Not satisfied? Email us within 7 days of purchase for a full refund. No questions."],
  ["How to request","Send your order ID to billing@studynest.app. Refunds are processed within 3–5 business days."],
  ["Exclusions","Institute plans past the trial period are non-refundable but transferrable."],
]);

// ------- 404 -------
Pages.notFound = () => `
  <section class="container nf">
    <div>
      <div class="big">404</div>
      <h2 style="margin-top:4px">Lost in the library</h2>
      <p class="muted" style="margin-top:8px">This page doesn't exist — or it went to grab a coffee.</p>
      <a href="#/" class="btn btn-primary" style="margin-top:20px">Take me home</a>
    </div>
  </section>`;

// ------- Small helpers -------
function emptyState(title, sub){
  return `<div class="empty" style="grid-column:1/-1"><div class="ico">📭</div><h3>${esc(title)}</h3><p>${esc(sub)}</p></div>`;
}

// Counters
function animateCounters(){
  $$("[data-count]").forEach(el=>{
    const target = parseInt(el.dataset.count,10)||0;
    const dur = 1400, start = performance.now();
    function step(t){
      const p = Math.min(1,(t-start)/dur);
      const val = Math.floor(target * (0.2 + 0.8*p*(2-p)));
      el.textContent = fmtNum(val);
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
