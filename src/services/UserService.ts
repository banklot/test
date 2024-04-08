import BaseService from "./BaseService";

export default class UserService extends BaseService {

    async getUser(user) {
        try {
            const response = await this.axios.post('/user/get', user);
            return response.data;
        } catch (e) {
            return {error: e.response.data};
        }
    }

    async createUser(user) {
        try {
            const response = await this.axios.post('/user/create', user);
            return response.data;
        } catch (e) {
            return {error: e.response.data.message};
        }
    }

    async updateUser(req) {
        try {
            const response = await this.axios.post('/user/update', req);
            return response.data;
        } catch (e) {
            return {error: e.message};
        }
    }

    async getWagers(req) {
        try {
            const response = await this.axios.post('/user/wager', req);
            return response.data.response;
        } catch (e) {
            return {error: e.message};
        }
    }


    async getTransactions(req) {
        try {
            const response = await this.axios.post('/user/transaction', req);
            return response.data;
        } catch (e) {
            return {error: e.message};
        }
    }

    async refreshBalance(req) {
        try {
            const response = await this.axios.post('/user/refresh-balance', req);
            return response.data;
        } catch (e) {
            return {error: e.message};
        }
    }

    async createTransaction(req) {
        try {
            const response = await this.axios.post('/user/transaction/create', req);
            return response.data;
        } catch (e) {
            return {error: e.message};
        }
    }

    async createTransactionRequest(req) {
        try {
            const response = await this.axios.post('/user/transaction-request/create', req);

            return response.data.response;
        } catch (e) {
            this.handleError(e)
        }
    }

    async getTransactionRequests(req) {
        try {
            const response = await this.axios.post('/user/transaction-request', req);

            return response.data.response;
        } catch (e) {
            this.handleError(e)
        }
    }

    async getMaxTransactionRequests(req) {
        try {
            const response = await this.axios.post('/user/transaction-request/max', req);

            return response.data;
        } catch (e) {
            this.handleError(e)
        }
    }

    async getTickets(req) {
        try {
            const response = await this.axios.post('/user/tickets', req);

            return response.data.response;
        } catch (e) {
            this.handleError(e)
        }
    }

}
