// Home.js
import React, { useState, useEffect } from "react";
import TransactionService from "../api/TransactionService";
import "../css/Home.css";

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchBalance();
    fetchTransactionHistory();
  }, [userId]);

  const fetchBalance = async () => {
    const response = await TransactionService.homeBalance(userId);
    setBalance(response);
  };

  const fetchTransactionHistory = async() => {
    const response = await TransactionService.transactionHistory(userId);
    setRecentTransactions(response || []);
  }

  return (
    <div className="home-wrapper">
      <section className="account-summary">
        <h2>Account Summary</h2>
        <p className="balance">Total Balance: ${balance}</p>
      </section>

      <section className="cta-buttons">
        <button style={{marginRight:'20px'}} onClick={() => window.location.href = '/transaction'}>Transfer Money</button>
        <button onClick={() => window.location.href = '/expense-tracker'}>Log Expenses</button>
      </section>

      <section className="recent-transactions">
        <h2>Recent Transactions</h2>
        {recentTransactions.length === 0 ? (
          <p>No recent transactions available.</p>
        ) : (
          <ul>
            {recentTransactions.slice(0, 5).map((txn, index) => (
              <li key={index} className="transaction-item">
                <div className={txn.amount < 0 ? "debit" : "credit"}>
                  ${txn.amount}
                </div>
                <div>
                  <strong>{txn.description}</strong>
                  <small className="timestamp">{new Date(txn.timestamp).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="tips-offers">
        <div className="tips">
          <h3>Financial Tips</h3>
          <ul>
            <li>💡 Save 20% of your income every month.</li>
            <li>💡 Automate your savings to build wealth consistently.</li>
          </ul>
        </div>
        <div className="offers">
          <h3>Current Offers</h3>
          <ul>
            <li>💳 5% cashback on National Bank credit cards</li>
            <li>📈 Special FD interest rate for senior citizens</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
