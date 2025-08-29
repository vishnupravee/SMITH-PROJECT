import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderedList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders");
      setOrders(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

   const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
      setOrders(orders.filter((o) => o._id !== orderId)); // update UI
      alert("✅ Order deleted successfully");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("❌ Failed to delete order");
    }
  };

  // Apply search + filter
  const filteredorder = orders.filter((item) => {
    const matchSearch =
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ;
      return matchSearch;
  });
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ordered List</h2>
         {/* 🔍 Search Bar */}
      <div className="col-md-4 pb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username and productname..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Ordered User</th>
            <th>Email</th>
            <th>Product</th>
            <th>product Qty</th>
            <th>Product ID</th>
            <th>Weight (g)</th>
            <th>MC</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredorder.length > 0 ? (
            filteredorder.map((order, i) => (
              <tr key={i}>
                <td>{i+ 1}</td>
                <td>{order.username}</td>
                <td>{order.email}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.productId}</td>
                <td>{order.weight}</td>
                <td>{order.mc}</td>
                   <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(order._id)}
                >
                  🗑 Delete
                </button>
              </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
