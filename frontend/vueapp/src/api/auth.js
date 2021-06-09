  
import api from "./axios-api";

export default {
  login(username, password) {
    return session.post(
      `${process.env.VUE_APP_BACK_BASE_URL}/rest-auth/login/`,
      { username, password }
    );
  },
}