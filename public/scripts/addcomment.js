import { getElement, getAttr, getValue, resetError, setError } from "./util.js";
getElement("btn-addComment").addEventListener("click", async (e) => {
  e.preventDefault();

  resetError();
  let id = getAttr('btn-addComment', 'data-id');
  if (!id) {
    setError('unable to determine the id of the entry');
    return;
  }
  let content = getValue("content");
  if ( !content) {
    setError(
      "Please add comment");
    return;
  }
  try {
    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ content, blog_id:id }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      let m = await res.json();
      setError(m.message);
      return;
    }
    document.location.replace("/home");
  } catch (err) {
    setError(err);
    return;
  }
});