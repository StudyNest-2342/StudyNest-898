// App bootstrapping + view-level event wiring

function wireView(){
  // Wishlist toggle (delegated)
  $("#view").addEventListener("click", onViewClick);

  // Search / filters
  if($("#notes-grid") && $("#filters")) wireNotesFilters();

  // FAQ accordion
  $$("#faq .faq-item").forEach(item=>{
    item.addEventListener("click",()=> item.classList.toggle("open"));
  });

  // Login
  const lf = $("#login-form");
  if(lf) lf.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd = new FormData(lf);
    try{
      Auth.login({email:fd.get("email"), password:fd.get("password"), remember:fd.get("remember")});
      toast("Welcome back 👋"); location.hash="#/dashboard"; render();
    }catch(err){ toast(err.message); }
  });

  const sf = $("#signup-form");
  if(sf) sf.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd = new FormData(sf);
    try{
      Auth.signup({name:fd.get("name"), email:fd.get("email"), password:fd.get("password")});
      toast("Account created 🎉"); location.hash="#/dashboard"; render();
    }catch(err){ toast(err.message); }
  });

  const ff = $("#forgot-form");
  if(ff) ff.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd = new FormData(ff);
    try{
      Auth.resetPassword(fd.get("email"), fd.get("password"));
      toast("Password reset. Please log in."); location.hash="#/login"; render();
    }catch(err){ toast(err.message); }
  });

  const cf = $("#contact-form");
  if(cf) cf.addEventListener("submit",(e)=>{
    e.preventDefault(); cf.reset(); toast("Message sent — we'll get back to you!");
  });

  const pf = $("#profile-form");
  if(pf) pf.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd = new FormData(pf);
    try{ Auth.updateProfile({name:fd.get("name")}); toast("Profile updated"); render(); }
    catch(err){ toast(err.message); }
  });
}

function onViewClick(e){
  const wish = e.target.closest("[data-wish]");
  if(wish){
    const id = wish.dataset.wish;
    const on = UserData.toggleWish(id);
    toast(on?"Added to wishlist ❤️":"Removed from wishlist");
    render(); return;
  }
  const bm = e.target.closest("[data-bm]");
  if(bm){
    const on = UserData.toggleBm(bm.dataset.bm);
    toast(on?"Bookmarked 🔖":"Bookmark removed"); render(); return;
  }
  const dl = e.target.closest("[data-download]");
  if(dl){
    const n = noteById(dl.dataset.download);
    if(!n) return;
    if(n.premium && !Auth.isAuthed()){ toast("Please log in to download premium notes"); location.hash="#/login"; render(); return; }
    UserData.addDownload(n.id);
    toast(`Downloading ${n.title}…`);
    // Trigger a real link (works when the PDF exists in /assets/pdfs/)
    const a = document.createElement("a");
    a.href = `assets/pdfs/${n.pdf}`;
    a.download = n.pdf;
    a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
    return;
  }
  const buy = e.target.closest("[data-buy]");
  if(buy){
    const plan = (window.PRICING||[]).find(p=>p.id===buy.dataset.buy);
    if(!plan) return;
    if(!Auth.isAuthed()){ toast("Please log in to continue"); location.hash="#/login"; render(); return; }
    if(plan.id==="free"){ toast("You're on the free tier — enjoy!"); return; }
    UserData.addOrder({plan:plan.name, price:plan.price});
    Auth.updateProfile({plan:plan.name});
    toast(`Upgraded to ${plan.name} 🎉`);
    location.hash = "#/dashboard/orders"; render();
  }
}

// Boot
window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", ()=>{
  const t = store.get("sn:theme","dark");
  if(t==="light") document.documentElement.setAttribute("data-theme","light");
  render();
});
