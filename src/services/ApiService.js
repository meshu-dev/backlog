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

    // console.log('apiRequest', params, JSON.stringify(params));

    if (params) {
      fetchParams['body'] = JSON.stringify(params);
    }

    let response = null;

    const handleError = (err) => {
      console.log('ffff');
      return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
      }));
    }

    console.log('TRY');
    response = await (fetch(url, fetchParams).catch(handleError));

    if (response.status === 401) {
      throw new Error('EEEE', { cause: 401 });
    }

    console.log('TRY 2', response);
    response = await response.json();

    return response;
  }
}

export default ApiService;
