class ApiService {
  constructor(tokenService, apiUrl) {
    this.tokenService = tokenService;
    this.apiUrl = apiUrl;
  }

  async sendRequest(method, path, params) {
    const headers = {'Content-Type': 'application/json'};
    const url = `${this.apiUrl}/${path}`;
    const token = this.tokenService.get();

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchParams = {
      method,
      headers
    };

    console.log('apiRequest', params, JSON.stringify(params));

    if (params) {
      fetchParams['body'] = JSON.stringify(params);
    }

    let response = await fetch(url, fetchParams);
    response = await response.json();

    return response;
  }
}

export default ApiService;
