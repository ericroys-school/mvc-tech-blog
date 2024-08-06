import { getElement, getValue, resetError, setError } from "./util.js";
getElement("btn-createBlog").addEventListener("click", async (e) => {
  e.preventDefault();

  resetError();
  let title = getValue("title");
  let content = getValue("content");
  if (!title || !content) {
    setError(
      "Please enter all information to create an entry");
    return;
  }
  try {
    const res = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({ title, content }),
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