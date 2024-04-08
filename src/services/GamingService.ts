import BaseService from "./BaseService";


class GamingService extends BaseService {
    async getGames(req) {
        try {
            const response = await this.axios.post('/gaming/games', req);
            return response.data.response;
        } catch (e) {
            return {error: e.response.data.response};
        }
    }

    async getProducts() {
        try {
            const response = await this.axios.get('/gaming/products');
            return response.data.response;
        } catch (e) {
            return {error: e.response.data.response};
        }
    }

    async getEvents(req) {
        try {
            const response = await this.axios.post('/gaming/events/search', req);
            return response.data.response;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getResults(req) {
        const response = await this.axios.post('/gaming/results/0', req);
        return response.data.response;
    }


}

export default GamingService
