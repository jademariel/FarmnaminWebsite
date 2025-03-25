import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; 

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Signup failed" };
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      username,
      password,
    });

    if (response.data.tokens) {
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      localStorage.setItem("username", username); 
    }

    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Login failed" };
  }
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
};