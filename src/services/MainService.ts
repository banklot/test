import BaseService from "./BaseService";


class MainService extends BaseService {
    // Login
    async getStates() {
        try {
            const response = await this.axios.get('/auth/states');
            return response.data.response;
        } catch (e) {
            return {error: e.response.data.response.message};
        }
    }

    async getMunicipalities(req) {
        try {
            const response = await this.axios.post('/auth/municipalities', req);
            return response.data.response;
        } catch (e) {
            return {error: e.response.data.response};
        }
    }

    async getBanks() {
        try {
            const response = await this.axios.get('/auth/banks');
            return response.data.response;
        } catch (e) {
            return {error: e.response.data.response.message};
        }
    }

    async getAreaCode() {
        return fetch('temp/areaCode.json')
            .then((res) => res.json())
            .then((d) => d);
    }


}

export default MainService
