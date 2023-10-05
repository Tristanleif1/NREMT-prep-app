import Cookies from 'js-cookie'

export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  const csrfToken = Cookies.get('csrf_token');
  console.log('CSRF Token:', csrfToken);  // Log CSRF token for debugging

  if (options.method.toUpperCase() !== 'GET') {
    if (options.headers["Content-Type"] === "multipart/form-data") {
      delete options.headers["Content-Type"];
    } else {
      options.headers['Content-Type'] =
        options.headers['Content-Type'] || 'application/json';
    }
    options.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development

