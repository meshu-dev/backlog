class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async sendRequest(method, path, params) {
    const url = `${this.apiUrl}/${path}`;

    params = this.prepareParams(method, params);

    let response = null;

    const handleError = this.getErrorHandler();

    response = await (fetch(url, params).catch(handleError));
    response = await this.checkResponse(response);

    return response;
  }

  prepareParams(method, params) {
    const headers = {'Content-Type': 'application/json'};

    const fetchParams = {
      method,
      headers,
      credentials: 'include'
    };

    if (params) {
      fetchParams['body'] = JSON.stringify(params);
    }

    return fetchParams;
  }

  getErrorHandler() {
    return (err) => {
      return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
      }));
    }
  }

  async checkResponse(response) {
    if (response.status === 401) {
      throw new Error('EEEE', { cause: 401 });
    }

    if (response.status === 204) {
      return true;
    }

    console.log(`API`, response, response.body);

    try {
      response = await response.json();
    } catch (error) {
      response = null;
    }
    return response;
  }
}

export default ApiService;
