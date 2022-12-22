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

    if (response === true) {
      //localStorage.setItem('token', response['token']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    return true;
  }
}

export default AuthService;
  