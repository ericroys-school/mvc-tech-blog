import { getElement, getAttr, getValue, resetError, setError } from './util.js';
getElement('btn-editBlog').addEventListener('click', async (e) => {
  e.preventDefault();

  resetError();
  let id = getAttr('btn-editBlog', 'data-id');
  if (!id) {
    setError('unable to determine the id of the entry');
    return;
  }

  let title = getValue('title');
  let content = getValue('content');

  if (!title || !content) {
    setError('Please enter all information to update an entry');
    return;
  }

  try {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      let m = await res.json();
      setError(m.message);
      return;
    }
    document.location.replace('/dashboard');
  } catch (err) {
    setError(err);
    return;
  }
});

getElement('btn-deleteBlog').addEventListener('click', async (e) => {
  e.preventDefault();

  resetError();
  let id = getAttr('btn-deleteBlog', 'data-id');
  if (!id) {
    setError('unable to determine the id of the entry');
    return;
  }

  try {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      let m = await res.json();
      setError(m.message);
      return;
    }
    document.location.replace('/dashboard');
  } catch (err) {
    setError(err);
    return;
  }
});
