class Ajax {
  constructor() {

  }

  static get(url = null) {
    return new Promise((resolve, reject) => {
      if(!url) {
        console.warn('Calling Ajax.get() without URL - bailing.');
        return reject('URL is required when doing ajax calls.');
      }

      let request = new XMLHttpRequest();

      request.onload = () => {
        if(request.readyState === 4) {
          if(request.status === 200) {
            resolve(request.response);
          } else {
            reject({
              response: request.response,
              status: request.status,
              text: request.statusText
            });
          }
        }
      };

      request.onerror = () => {
        reject(request.responseText);
      };

      request.open('GET', url);
      request.send();
    });
  }

  static post(url = null, data = {}) {
    return new Promise((resolve, reject) => {
      if(!url) {
        console.warn('Calling Ajax.get() without URL - bailing.');
        return reject('URL is required when doing ajax calls.');
      }

      let request = new XMLHttpRequest();
      request.onreadystatechange = () => {
        if(request.readyState === 4) {
          if(request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(request.responseText);
          }
        }
      };

      request.open('POST', url);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.send(data);
    });
  }
}

export { Ajax };