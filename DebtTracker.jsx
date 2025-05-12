import React, { useState, useEffect } from "react";
import DebtService from "../api/DebtService";
import "../css/DebtTracker.css";

const DebtTracker = () => {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    type: "",
    amount: "",
    interestRate: "",
    minPayment: "",
    additionalPayment: "",
    userId: parseInt(localStorage.getItem("userId")),
  });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const userDebts = await DebtService.getDebtsByUserId(localStorage.getItem("userId"));
        setDebts(userDebts);
        generateSuggestions(userDebts);
      } catch (error) {
        console.error("Failed to fetch debts:", error);
      }
    };

    fetchDebts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDebt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formattedDebt = {
    ...newDebt,
    amount: parseFloat(newDebt.amount),
    interestRate: parseFloat(newDebt.interestRate),
    minPayment: parseFloat(newDebt.minPayment),
    additionalPayment: parseFloat(newDebt.additionalPayment || 0),
  };

  const addDebt = async () => {
    try {
      const savedDebt = await DebtService.saveDebt(formattedDebt);
      const updatedDebts = [...debts, savedDebt];
      setDebts(updatedDebts);
      setNewDebt({
        type: "",
        amount: "",
        interestRate: "",
        minPayment: "",
        additionalPayment: "",
        userId: newDebt.userId,
      });
      generateSuggestions(updatedDebts);
    } catch (error) {
      console.error("Failed to save debt:", error);
    }
  };

  const generateSuggestions = (debts) => {
    const totalInterestRate = debts.reduce((acc, debt) => acc + parseFloat(debt.interestRate), 0);
    const newSuggestions = [];

    if (debts.length > 1) {
      newSuggestions.push("Try the Snowball method: focus on smallest debts first.");
    }
    if (totalInterestRate / debts.length > 15) {
      newSuggestions.push("Try the Avalanche method: pay high-interest debts first.");
    }

    setSuggestions(newSuggestions);
  };

  return (
    <div className="debt-tracker">
      <h2 style={{marginTop:'0px'}}>Debt Tracker</h2>

      <div className="debt-card">
        <h3>Add New Debt</h3>
        <input type="text" name="type" placeholder="Debt Type" value={newDebt.type} onChange={handleInputChange} />
        <input type="number" name="amount" placeholder="Debt Amount ($)" value={newDebt.amount} onChange={handleInputChange} />
        <input type="number" name="interestRate" placeholder="Interest Rate (%)" value={newDebt.interestRate} onChange={handleInputChange} />
        <input type="number" name="minPayment" placeholder="Minimum Payment ($)" value={newDebt.minPayment} onChange={handleInputChange} />
        <input type="number" name="additionalPayment" placeholder="Additional Payment ($)" value={newDebt.additionalPayment} onChange={handleInputChange} />
        <button onClick={addDebt}>Add Debt</button>
      </div>

      <div className="debt-card">
        <h3>Current Debts</h3>
        {debts.length > 0 ? (
          <div className="debt-list">
            {debts.map((debt, index) => (
              <div key={index} className="debt-item">
                <strong>{debt.type}</strong>: ${debt.amount} @ {debt.interestRate}%
              </div>
            ))}
          </div>
        ) : (
          <p>No debts added yet.</p>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="debt-card">
          <h3>Repayment Strategies</h3>
          <ul>
            {suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DebtTracker;