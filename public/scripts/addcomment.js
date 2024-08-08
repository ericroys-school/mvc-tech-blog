/**
 * Add comment for an existing blog
 */

import { getElement, getAttr, getValue, resetError, setError } from "./util.js";
getElement("btn-addComment").addEventListener("click", async (e) => {
  e.preventDefault();

  //clear error(s)
  resetError();
  //get form vals
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
  //send to server
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
    //comments are on the home page so direct there as a 'refresh' to display added comment
    document.location.replace("/home");
  } catch (err) {
    setError(err);
    return;
  }
});