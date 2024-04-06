import BaseService from "./BaseService";

class AuthService extends BaseService {
  // Login
  async login(user) {
    try {
      const response = await this.axios.post('/auth/login', {
        email: user.email,
        password: user.password
      });
      return response.data;
    } catch (e) {
      return {error: e.response.data.message};
    }
  }
  // Register
  async register(user) {
    try {
      const response = await this.axios.post('/auth/register', {
        name: user.name,
        email: user.email,
        password: user.password
      });
      return response.data;
    } catch (e) {
      return {error: e.response.data.message};
    }
  }
}

export default AuthService
