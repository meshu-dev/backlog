class AuthService {
  constructor(apiService, urlPath) {
    this.apiService = apiService;
    this.urlPath = urlPath;
  }

  async login(username, password) {
    const response = await this.apiService.sendRequest(
      'POST',
      this.urlPath,
      { username, password }
    );

    return response;
  }
}

export default AuthService;
  