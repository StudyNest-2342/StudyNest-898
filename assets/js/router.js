// Hash router
const Routes = [
  [/^#\/?$/,                    () => Pages.home()],
  [/^#\/about$/,                () => Pages.about()],
  [/^#\/classes$/,              () => Pages.classes()],
  [/^#\/class\/([^/?]+)/,       (m) => Pages.classDetail(m[1])],
  [/^#\/subjects$/,             () => Pages.subjects()],
  [/^#\/subject\/([^/?]+)/,     (m) => Pages.subjectDetail(m[1])],
  [/^#\/notes\/premium/,        () => Pages.notesPremium()],
  [/^#\/notes\/free/,           () => Pages.notesFree()],
  [/^#\/search/,                () => Pages.search()],
  [/^#\/note\/([^/?]+)/,        (m) => Pages.noteDetail(m[1])],
  [/^#\/downloads/,             () => Pages.downloads()],
  [/^#\/wishlist/,              () => Pages.wishlist()],
  [/^#\/notifications/,         () => Pages.notifications()],
  [/^#\/pricing/,               () => Pages.pricing()],
  [/^#\/testimonials/,          () => Pages.testimonials()],
  [/^#\/faq/,                   () => Pages.faq()],
  [/^#\/blog\/([^/?]+)/,        (m) => Pages.blogSingle(m[1])],
  [/^#\/blog/,                  () => Pages.blog()],
  [/^#\/contact/,               () => Pages.contact()],
  [/^#\/login/,                 () => Pages.login()],
  [/^#\/signup/,                () => Pages.signup()],
  [/^#\/forgot/,                () => Pages.forgot()],
  [/^#\/dashboard\/([^/?]+)/,   (m) => Pages.dashboard(m[1])],
  [/^#\/dashboard/,             () => Pages.dashboard("overview")],
  [/^#\/privacy/,               () => Pages.privacy()],
  [/^#\/terms/,                 () => Pages.terms()],
  [/^#\/refund/,                () => Pages.refund()],
];

function resolve(hash){
  for(const [re, fn] of Routes){ const m = hash.match(re); if(m) return fn(m); }
  return Pages.notFound();
}

function render(){
  const hash = location.hash || "#/";
  renderHeader();
  renderFooter();
  $("#view").innerHTML = resolve(hash);
  window.scrollTo({top:0, behavior:"instant"});
  wireView();
  observeReveal();
  if(hash==="#/" || hash==="") animateCounters();
}
