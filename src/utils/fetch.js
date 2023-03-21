let baseUrl, username, password;
baseUrl = import.meta.env.VITE_BASE_URL;
username = import.meta.env.VITE_USERNAME;
password = import.meta.env.VITE_PASSWORD;

const pull = (endPoint) => {
  return fetch(baseUrl + endPoint, {
    headers: {
      Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`)
    }
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => json);
};

const push = (endPoint, payload, method) => {
  return fetch(baseUrl + endPoint, {
    method: method ? method : "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: !username ? "" : "Basic " + btoa(`${username}:${password}`)
    }
  });
};

export { pull, push };
