import BaseService from "./BaseService";


class MainService extends BaseService {
    // Login
    async createTicket(req: object) {
        try {
            const response = await this.axios.post('/ticket/create', req);
            return response.data;
        } catch (e) {
            console.log(e)
            return {error: e.response.data};
        }
    }

}
export default MainService
