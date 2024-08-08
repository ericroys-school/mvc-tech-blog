import { getElement, getValue, resetError, setError } from './util.js';

let login = null;
if ((login = getElement('btn-login')))
  login.addEventListener('click', async (e) => {
    e.preventDefault();

    resetError();
    let username = getValue('username');
    let password = getValue('password');
    if (!username || !password) {
      setError('Please enter all information to log in');
      return;
    }
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
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

let reg = null;
if ((reg = getElement('btn-register')))
  reg.addEventListener('click', async (e) => {
    e.preventDefault();

    resetError();
    let username = getValue('username');
    let password = getValue('password0');
    let confirm = getValue('password1');
    if (!username || !password || !confirm) {
      setError('Please enter all information to log in');
      return;
    }
    if (password !== confirm) {
      setError('The passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        let m = await res.json();
        setError(m.message);
        return;
      }
      document.location.replace('/login');
    } catch (err) {
      setError(err);
      return;
    }
  });
