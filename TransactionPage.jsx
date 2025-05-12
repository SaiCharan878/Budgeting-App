import React, { useState, useEffect } from "react";
import TransactionService from "../api/TransactionService";
import "../css/TransactionPage.css";

const TransactionPage = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchTransactionHistory();
    fetchBalance();
  }, [userId]);

  const fetchTransactionHistory = async () => {
    const response = await TransactionService.transactionHistory(userId);
    setTransactions(response);
  };

  const fetchBalance = async () => {
    const response = await TransactionService.homeBalance(userId);
    setBalance(response);
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    setError("");

    const response =
      type === "deposit"
        ? await TransactionService.deposit(userId, amount)
        : await TransactionService.withdraw(userId, amount);

    try {
      if (response.status === 200) {
        const newTransaction = response.data;
        setTransactions([...transactions, newTransaction]);
        setAmount("");

        const balance = await TransactionService.balance(userId);
        setBalance(balance);
      } else {
        const errorData = response.data;
        setError(errorData.message || "Transaction failed.");
      }
    } catch (error) {
      console.error("Error saving transaction:", error.response);
      throw error;
    }
  };

  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Transaction</h2>

      <div className="transaction-box">
        <div className="balance-display">
          Balance: ${balance}
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleTransaction} className="transaction-form">
          <input
            type="number"
            className="form-input"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select
            className="form-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      <div className="transaction-box">
        <h3 className="history-title">Transaction History</h3>
        <div className="history-list">
          {transactions && transactions.length > 0 ? (
            transactions.map((t, index) => (
              <div key={index} className="history-item">
                <div className="transaction-detail">
                  {t.type.toUpperCase()} - ${t.amount}
                </div>
                <small className="timestamp">{new Date(t.timestamp).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="no-history">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
