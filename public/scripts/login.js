import { getElement, getValue, resetError, setError } from "./util.js";
getElement("btn-login").addEventListener("click", async (e) => {
  e.preventDefault();

  resetError();
  let username = getValue("username");
  let password = getValue("password");
  if (!username || !password) {
    setError(
      "Please enter all information to log in");
    return;
  }
  try {
    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      let m = await res.json();
      setError(m.message);
      return;
    }
    document.location.replace("/dashboard");
  } catch (err) {
    setError(err);
    return;
  }
});