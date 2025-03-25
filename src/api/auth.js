import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const signup = async (
  username,
  email,
  contactNumber,
  password,
  confirmPassword
) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, {
      username,
      email,
      contact_number: contactNumber, // using snake_case to match the backend field
      password,
      confirm_password: confirmPassword,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Signup failed" };
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      email,
      password,
    });

    if (response.data.tokens) {
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      localStorage.setItem("email", email); // Store email as identifier
    }
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Login failed" };
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("email");
};
