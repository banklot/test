import BaseService from "./BaseService";


class MainService extends BaseService {
    // Login



    async getFundsHistory() {
        return fetch('temp/history_funds.json')
        .then((res) => res.json())
        .then((d) => d);
    }
    async getWinHistory() {
        return fetch('temp/history_win.json')
        .then((res) => res.json())
        .then((d) => d);
    }

}

export default MainService
