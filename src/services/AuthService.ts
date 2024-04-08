import BaseService from "./BaseService";

class AuthService extends BaseService {
  // Login
  async login(user) {
    try {
      const response = await this.axios.post(this.apiLoginURL, {
        email: user.email,
        password: user.password
      });
      return response.data;
    } catch (e) {
      return this.parseError(e);
    }
  }
  // Register
  async register(user) {
    try {
      return await this.axios.post('/auth/register', user);
    } catch (e) {
      return {error: e.response.data.message};
    }
  }

  async logout() {
    try {
      const response = await this.axios.post(this.apiLogoutURL);
      return response.data;
    } catch (e) {
      return this.parseError(e);
    }
  }

  private parseError(e) {
    // if(e.response.data === '') {
    //   return {'error': 'API fuera de linea'};
    // }
    const error = {
      error: ""
    }
    if (e.message) {
      error.error = e.message
    }
    if (e.response && e.response.data?.message) {
      error.error = e.response.data.message
    } else if (e.response && e.response.data?.error) {
      error.error = e.response.data.error
    }
    return error;
  }
}

export default AuthService
