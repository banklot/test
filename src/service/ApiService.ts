import BaseService from "./BaseService";

class ApiService extends BaseService {

  async loadData() {
    try {
      const response = await this.axios.get('/boards.json', {});
      return response.data;
    } catch (e) {
      return {error: e.response.data.message};
    }
  }

}

export default ApiService
