import axiosInstance from "../axiosConfig";

const API_URL = 'http://localhost:8080/api/transaction'; // Replace with your backend URL

// Save Deposit
const deposit = async (userId, amount) => {
  try {
    // Map over savings to ensure each has the budgetId
    const request = {
      userId: parseInt(localStorage.getItem('userId')),
      amount: parseFloat(amount),
    };

    const response = await axiosInstance.post(`${API_URL}/deposit`, request);
    return response;
  } catch (error) {
    console.error("Error Depositing:", error);
    throw error; // Re-throw to handle it in the component
  }
};

const withdraw = async (userId, amount) => {
  try {
    // Map over savings to ensure each has the budgetId
    const request = {
      userId: parseInt(localStorage.getItem('userId')),
      amount: parseFloat(amount),
    };

    const response = await axiosInstance.post(`${API_URL}/withdraw`, request);
    return response;
  } catch (error) {
    console.error("Error Withdrawing:", error);
    return error.response; // Re-throw to handle it in the component
  }
};

const balance = async (userId) => {
  try {

    const response = await axiosInstance.get(`${API_URL}/balance/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error; // Re-throw to handle it in the component
  }
};


const homeBalance = async (userId) => {
  try {

    const response = await axiosInstance.get(`${API_URL}/balance/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0; // Re-throw to handle it in the component
  }
};


const transactionHistory = async (userId) => {
  try {

    const response = await axiosInstance.get(`${API_URL}/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return ""; // Re-throw to handle it in the component
  }
};

export default {
  deposit, 
  withdraw,
  balance,
  transactionHistory,
  homeBalance
};
