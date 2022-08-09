export const $ajax = () => {
  const customFetch = (url, options) => {
    const defaultHeaders = {
      accept: 'application/json',
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || 'GET';
    options.headers = options.headers 
      ? { ...defaultHeaders, ...options.headers } : defaultHeaders;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body; // no se puede enviar un body falso o vacio

    // console.log(options);

    let timer = setTimeout(() => {
      controller.abort();
    }, 3000);

    clearTimeout(timer);

    return fetch(url, options)
      .then((res) => res.ok ? res.json() : Promise.reject({ err: true, status: res.status || "00", statusText: res.statusText || "Oppps, ha ocurrido un error."}))
      .catch((err) => err);
  };
  
  const get = (url, options = {}) => customFetch(url, options);

  return { get };
}