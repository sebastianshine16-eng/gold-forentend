import API from "./api";

const authService = {
  login: async (credentials) => {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await API.post("/auth/register", {
      email: userData.email,
      password: userData.password
    });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
