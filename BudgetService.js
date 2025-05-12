import axiosInstance from "../axiosConfig";

const API_URL = 'http://localhost:8080/api/budget'; // Replace with your backend URL

// Save budget
const saveBudget = async (budgetData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}`, budgetData);
    return response.data;
  } catch (error) {
    console.error("Error saving budget:", error);
    throw error;
  }
}

// Save Incoming Sources
const saveIncomeSources = async (incomeSources, budgetId) => {
  try {
    // Map over incomeSources to ensure each has the budgetId
    const incomeDTOs = incomeSources.map(income => ({
      id:income.id,
      budgetId: budgetId,
      sourceName: income.sourceName,
      amount: parseFloat(income.amount),
    }));

    const response = await axiosInstance.post(`${API_URL}/${budgetId}/income`, incomeDTOs);
    return response.data;
  } catch (error) {
    console.error("Error saving income sources:", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Save Fixed Expenses
const saveFixedExpenses = async (expenses, budgetId) => {
  try {
    // Map over expenses to ensure each has the budgetId
    const fixedExpenseDTOs = expenses.map(expense => ({
      id:expense.id,
      budgetId: budgetId,
      category: expense.category,
      amount: parseFloat(expense.amount),
    }));

    const response = await axiosInstance.post(`${API_URL}/${budgetId}/fixedExpense`, fixedExpenseDTOs);
    return response.data;
  } catch (error) {
    console.error("Error saving fixed expenses:", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Save Variable Expenses
const saveVariableExpenses = async (expenses, budgetId) => {
  try {
    // Map over expenses to ensure each has the budgetId
    const variableExpenseDTOs = expenses.map(expense => ({
      id:expense.id,
      budgetId: budgetId,
      category: expense.category,
      amount: parseFloat(expense.amount),
    }));

    const response = await axiosInstance.post(`${API_URL}/${budgetId}/variableExpense`, variableExpenseDTOs);
    return response.data;
  } catch (error) {
    console.error("Error saving variable expenses:", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Save Savings Goals
const saveSavingsGoals = async (savings, budgetId) => {
  try {
    // Map over savings to ensure each has the budgetId
    const savingsGoalsDTOs = savings.map(saving => ({
      id:saving.id,
      budgetId: budgetId,
      name: saving.name,
      amount: parseFloat(saving.amount),
    }));

    const response = await axiosInstance.post(`${API_URL}/${budgetId}/savingGoals`, savingsGoalsDTOs);
    return response.data;
  } catch (error) {
    console.error("Error saving savingGoals:", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Get debts by user ID
const getBudgetForMonth = async (month, year) => {
  try {
    console.log("Getting budget for month")
    const userId = localStorage.getItem('userId');
    const response = await axiosInstance.get(`${API_URL}/${userId}/${month}/${year}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
};

export default {
  saveBudget,
  saveIncomeSources,
  saveFixedExpenses,
  saveVariableExpenses,
  saveSavingsGoals,
  getBudgetForMonth
};
