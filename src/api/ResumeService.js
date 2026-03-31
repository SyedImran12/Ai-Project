import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/resume"; //http://localhost:8081/api/v1/resume/generate

export const generateResume = async (userDescription) => {
  try {
    const response = await axios.post(
      `${API_URL}/generate`,
      { userDescription },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 120000,
      }
    );

    return response.data;

  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Request failed");
    }
  }
};