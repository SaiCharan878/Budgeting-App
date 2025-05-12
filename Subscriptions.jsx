import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center"
  };

  const userId = localStorage.getItem("userId");
  const [newSub, setNewSub] = useState({
    serviceName: "",
    amount: "",
    dueDate: "",
    userId: userId
  });

  const fetchSubscriptions = async () => {
    try {
      const res = await axiosInstance.get(`/api/subscriptions/${userId}`);
      setSubscriptions(res.data);
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handlePay = async (subscriptionId) => {
    try {
      await axiosInstance.put(`/api/subscriptions/${userId}/${subscriptionId}/pay`);
      fetchSubscriptions();
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/api/subscriptions/${userId}/add`, newSub);
      setNewSub({ serviceName: "", amount: "", dueDate: ""});
      fetchSubscriptions();
    } catch (err) {
      console.error("Failed to add subscription", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Subscriptions</h2>
      <table style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px"
        }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Amount</th>
            <th style={cellStyle}>Due Date</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub.id}>
              <td style={cellStyle}>{sub.serviceName}</td>
              <td style={cellStyle}>${sub.amount}</td>
              <td style={cellStyle}>{sub.dueDate}</td>
              <td style={cellStyle}>{sub.status}</td>
              <td style={cellStyle}>
                {sub.status === "Pending" && (
                  <button onClick={() => handlePay(sub.id)}>Pay</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Subscription</h3>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Subscription Name"
          value={newSub.serviceName}
          onChange={(e) => setNewSub({ ...newSub, serviceName: e.target.value, userId })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          style={{marginBottom:'0px'}}
          value={newSub.amount}
          onChange={(e) => setNewSub({ ...newSub, amount: e.target.value, userId })}
          required
        />
        <input
          type="date"
          value={newSub.dueDate}
          onChange={(e) => setNewSub({ ...newSub, dueDate: e.target.value, userId })}
          required
        />
        <button type="submit">Add Subscription</button>
      </form>
    </div>
  );
};

export default Subscription;
