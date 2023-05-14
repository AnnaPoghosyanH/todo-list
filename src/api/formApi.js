const formApiUrl = process.env.REACT_APP_API_URL + "/form";

class FormApi {
  #request(method, data = {}) {
    const { body, params, filters } = data;
    const req = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      req.body = JSON.stringify(body);
    }
    let url = formApiUrl;
    if (params) {
      url = `${url}/${params}`;
    }

    if (filters) {
      let query = "?";
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        query += `${key}=${value}&`;
      });
      url += query;
    }

    return fetch(url, req)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        return data;
      });
  }
  sendForm(form) {
    return this.#request("POST", { body: form });
  }
}

export default FormApi;
