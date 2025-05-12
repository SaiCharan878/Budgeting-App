// SidebarLayout.js
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../css/SidebarLayout.css";

const SidebarLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar-layout">
      <aside className="sidebar dark-theme">
        <div className="logo">🏦 National Bank</div>
        <nav className="nav-links">
          <NavLink to="/home" activeclassname="active">Home</NavLink>
          <NavLink to="/expense-tracker" activeclassname="active">Expense Tracker</NavLink>
          <NavLink to="/trends" activeclassname="active">Trends</NavLink>
          <NavLink to="/debt-tracker" activeclassname="active">Debt Tracker</NavLink>
          <NavLink to="/transaction" activeclassname="active">Transaction</NavLink>
          <NavLink to="/subscriptions" activeclassname="active">Manage Subscriptions</NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="main-content light-theme">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
