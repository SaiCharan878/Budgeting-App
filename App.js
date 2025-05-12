// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout"; // Sidebar-based layout
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ExpenseTracker from "./components/ExpenseTracker";
import Trends from "./components/Trends";
import DebtTracker from "./components/DebtTracker";
import TransactionPage from "./components/TransactionPage";
import FinancialGrowthInsights from "./components/FinancialGrowthInsights";
import Subscriptions from "./components/Subscriptions";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* All routes wrapped inside SidebarLayout to maintain persistent sidebar */}
        <Route path="/" element={<SidebarLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="expense-tracker" element={<ExpenseTracker />} />
          <Route path="trends" element={<Trends />} />
          <Route path="debt-tracker" element={<DebtTracker />} />
          <Route path="transaction" element={<TransactionPage />} />
          <Route path="subscriptions" element={<Subscriptions />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
