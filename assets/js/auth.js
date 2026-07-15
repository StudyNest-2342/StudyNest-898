// Fake auth backed by localStorage. Replace later with real backend.
const Auth = {
  USERS_KEY: "sn:users",
  SESSION_KEY: "sn:session",

  users(){ return store.get(this.USERS_KEY, []); },
  saveUsers(list){ store.set(this.USERS_KEY, list); },
  current(){ return store.get(this.SESSION_KEY, null); },
  isAuthed(){ return !!this.current(); },

  signup({name,email,password}){
    email = (email||"").toLowerCase().trim();
    if(!name || !email || !password) throw new Error("All fields are required");
    if(password.length<6) throw new Error("Password must be at least 6 characters");
    const users = this.users();
    if(users.find(u=>u.email===email)) throw new Error("An account with that email already exists");
    const user = { name, email, password, joined:Date.now(), plan:"Starter", avatar:name.trim()[0]?.toUpperCase()||"U" };
    users.push(user); this.saveUsers(users);
    store.set(this.SESSION_KEY, { name:user.name, email:user.email, plan:user.plan, avatar:user.avatar });
    return user;
  },

  login({email, password, remember}){
    email = (email||"").toLowerCase().trim();
    const user = this.users().find(u=>u.email===email && u.password===password);
    if(!user) throw new Error("Invalid email or password");
    const sess = { name:user.name, email:user.email, plan:user.plan, avatar:user.avatar };
    store.set(this.SESSION_KEY, sess);
    if(remember) store.set("sn:remember", email); else store.del("sn:remember");
    return sess;
  },

  logout(){ store.del(this.SESSION_KEY); },

  updateProfile(patch){
    const sess = this.current(); if(!sess) throw new Error("Not signed in");
    const users = this.users();
    const i = users.findIndex(u=>u.email===sess.email);
    if(i<0) throw new Error("User missing");
    users[i] = { ...users[i], ...patch };
    this.saveUsers(users);
    const newSess = { ...sess, ...patch };
    if(patch.name) newSess.avatar = patch.name.trim()[0]?.toUpperCase()||sess.avatar;
    store.set(this.SESSION_KEY, newSess);
    return newSess;
  },

  resetPassword(email, newPassword){
    email=(email||"").toLowerCase().trim();
    const users = this.users();
    const u = users.find(x=>x.email===email);
    if(!u) throw new Error("No account found with that email");
    u.password = newPassword; this.saveUsers(users);
  },
};
