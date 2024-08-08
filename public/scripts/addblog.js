/**
 * Scripting to add a blog via api call to server
 */

import { getElement, getValue, resetError, setError } from "./util.js";
getElement("btn-createBlog").addEventListener("click", async (e) => {
  e.preventDefault();

  //clear error(s)
  resetError();
  //get the form values
  let title = getValue("title");
  let content = getValue("content");
  //quick validate
  if (!title || !content) {
    setError(
      "Please enter all information to create an entry");
    return;
  }
  //make the call
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
    //direct to the dashboard since should be on the dashboard and
    //this provides a 'refresh' to display new entry
    document.location.replace("/dashboard");
  } catch (err) {
    setError(err);
    return;
  }
});