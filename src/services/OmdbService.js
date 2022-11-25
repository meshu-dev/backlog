class OmdbService {
    constructor(apiService) {
      this.apiService = apiService;
    }

    async search(term) {
      return await this.apiService.sendRequest(
        'GET',
        `search/${term}`
      );
    }
  
    async getById(id) {
      return await this.apiService.sendRequest(
        'GET',
        `id/${id}`
      );
    }
  }
  
  export default OmdbService;
  