// ExpenseTrackerModern.js
import React, { useState, useEffect } from "react";
import ExpenseService from "../api/ExpenseService";
import "../css/ExpenseTracker.css";

const modernCategories = [
  "Food",
  "Transport",
  "Bills",
  "Subscriptions",
  "Health",
  "Entertainment",
  "Others"
];

const ExpenseTracker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [expenses, setExpenses] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (selectedDate) {
      fetchExpensesForDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchExpensesForDate = async (date) => {
    try {
      const response = await ExpenseService.getExpensesForDate(date);
      const data = response.data;

      const fetchedExpenses = modernCategories.reduce((acc, cat) => {
        const match = data.find((item) => item.category === cat);
        acc[cat] = {
          amount: match ? match.amount : "",
          id: match ? match.id : null
        };
        return acc;
      }, {});

      setExpenses(fetchedExpenses);

      const total = data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAmountChange = (category, amount) => {
    setExpenses((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        amount
      }
    }));
  };

  const logExpenses = async () => {
    const entries = Object.entries(expenses).filter(([_, val]) => val.amount !== "");
    if (entries.length === 0) {
      alert("Please enter at least one expense.");
      return;
    }

    const expenseList = entries.map(([category, { amount, id }]) => ({
      expenseDate: selectedDate,
      category,
      amount,
      id
    }));

    try {
      await ExpenseService.saveExpenses(expenseList);
      alert("Expenses saved successfully!");
      fetchExpensesForDate(selectedDate);
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  return (
    <div className="expense-container">
      <h2 style={{marginTop:'0px'}}>Log Your Expenses</h2>

      <div className="form-header">
        <label>Date</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>

      <div className="category-grid">
        {modernCategories.map((cat) => (
          <div className="category-card" key={cat}>
            <label>{cat}</label>
            <input
              type="number"
              placeholder={`Enter ${cat} amount`}
              value={expenses[cat]?.amount || ""}
              onChange={(e) => handleAmountChange(cat, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={logExpenses} className="save-btn" disabled={!selectedDate}>
        Save Expenses
      </button>

      <div className="summary">
        <h3>Total for {selectedDate || "selected date"}:</h3>
        <p>${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ExpenseTracker;
