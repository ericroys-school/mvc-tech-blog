
import { getElement } from "./util.js";

let login = null;
if((login = getElement("btn-main-login")))
 login.addEventListener("click", async (e) => {
    document.location.replace("/login");
});

let dash = null;
if((dash = getElement("btn-dashboard")))
dash.addEventListener("click", async (e) => {
    document.location.replace("/dashboard");
});

let logout = null;
if((logout = getElement("btn-logout")))
logout.addEventListener("click", async (e) => {
    try {
        const res = await fetch("/api/user/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error(err);
      }
    document.location.replace("/home");
});

let home = null;
if((home = getElement("btn-home")))
  home.addEventListener("click", async (e) => {
    document.location.replace("/home");
});

let register = null;
if((register = getElement("btn-register")))
  register.addEventListener("click", async (e) => {
    document.location.replace("/register");
});