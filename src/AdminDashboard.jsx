// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);
//   const [message, setMessage] = useState('');
//   const token = localStorage.getItem('token');

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('https://new-task-server-rosy.vercel.app/api/admin/users', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUsers(res.data);
//     } catch {
//       setMessage('Failed to load users');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/admin/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage('User deleted');
//       fetchUsers();
//     } catch {
//       setMessage('Error deleting user');
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:3000/api/admin/users/${editUser._id}`,
//         {
//           username: editUser.username,
//           email: editUser.email,
//           status: editUser.status,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessage('User updated');
//       setEditUser(null);
//       fetchUsers();
//     } catch {
//       setMessage('Error updating user');
//     }
//   };

//   const handleInputChange = (e) => {
//     setEditUser({ ...editUser, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>User List</h2>
//       {message && <div className="alert alert-info">{message}</div>}

//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id}>
//               <td>{u.username}</td>
//               <td>{u.email}</td>
//               <td>{u.status}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-primary me-2"
//                   onClick={() => setEditUser(u)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => handleDelete(u._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editUser && (
//         <form onSubmit={handleEditSubmit} className="mt-4">
//           <h4>Edit User</h4>
//           <div className="mb-2">
//             <input
//               className="form-control"
//               name="username"
//               value={editUser.username}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               className="form-control"
//               name="email"
//               type="email"
//               value={editUser.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <select
//               className="form-select"
//               name="status"
//               value={editUser.status}
//               onChange={handleInputChange}
//             >
//               <option value="active">Active</option>
//               <option value="blocked">Blocked</option>
//             </select>
//           </div>
//           <button type="submit" className="btn btn-success me-2">Save</button>
//           <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default UserList;  




import React, { useEffect, useState } from "react";
import "./AdminDashboard.css"; // Assuming you have a CSS file for styles
import ProductList from "./adminpages/ProductList";
import CategoryList from "./adminpages/CategoryList";
import SmithList from "./adminpages/SmithList";
import SubCategoryList from "./adminpages/SubCategoryList";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
// Sidebar items
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "product", label: "Product" },
  { key: "category", label: "Category" },
   { key: "subcategory", label: "SubCategory" },
  { key: "smith", label: "Smith" },
  { key: "reports", label: "Reports" },
];

function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
 const [userGraph, setUserGraph] = useState([]);
  const [orderGraph, setOrderGraph] = useState([]);


    // 👇 States for dashboard stats
  const [stats, setStats] = useState({ userCount: 0, orderCount: 0 });

  useEffect(() => {

    axios.get("https://smith-server-qpxw.vercel.app/api/dashboard/user-graph").then(res => setUserGraph(res.data));
    axios.get("https://smith-server-qpxw.vercel.app/api/dashboard/order-graph").then(res => setOrderGraph(res.data));

    const fetchStats = async () => {
      try {
        const res = await axios.get("https://smith-server-qpxw.vercel.app/api/dashboard/stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

    const formatData = (data) =>
    data.map((d) => ({
      month: new Date(2025, d._id - 1).toLocaleString("default", { month: "short" }),
      count: d.count,
    }));

  const handleSelect = (key) => {
    setActive(key);
    setIsOpen(false);
  };



  return (
    <div className="admin-wrap">
      {/* Top bar */}
      <header className="navbar navbar-light bg-white border-bottom sticky-top">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary d-lg-none"
              aria-label="Toggle sidebar"
              aria-controls="sidebar"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <span className="navbar-brand mb-0 h1">Admin</span>
          </div>
          <div className="d-none d-sm-block small text-muted">
            {NAV_ITEMS.find((n) => n.key === active)?.label}
          </div>
        </div>
      </header>

      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        <nav
          id="sidebar"
          className={`sidebar bg-light border-end ${isOpen ? "open" : ""}`}
          aria-label="Sidebar"
        >
          <div className="p-3 d-flex flex-column h-100">
            <div className="fs-5 fw-semibold mb-3 text-secondary">Menu</div>
            <ul className="nav nav-pills flex-column gap-1">
              {NAV_ITEMS.map((item) => (
                <li className="nav-item" key={item.key}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.key)}
                    className={`nav-link w-100 text-start ${
                      active === item.key ? "active" : ""
                    }`}
                    aria-current={active === item.key ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-auto small text-muted">
              <hr />
              <div>v1.0</div>
            </div>
          </div>
        </nav>

        {/* Clickable backdrop for mobile */}
        {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}

        {/* Main content */}
        <main className="content flex-grow-1">
          <div className="container-fluid py-4">
            <h1 className="h3 mb-3">
              {NAV_ITEMS.find((n) => n.key === active)?.label}
            </h1>

            {/* Sections */}
            {active === "dashboard" && (
              <div className="row g-3">
                <div className="col-md-6 col-xl-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="card-title">Users</div>
                      <div className="display-6">{stats.userCount}</div>
                      {/* <p className="text-muted mb-0">+4.2% this week</p> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="card-title">Orders</div>
                      <div className="display-6">{stats.orderCount}</div>
                      {/* <p className="text-muted mb-0">-1.1% this week</p> */}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="card-title">Overview</div>
                      <p className="mb-0">
                        Welcome to your dashboard. Pick a section from the left
                        to get started.
                      </p>
                    </div>
                  </div>
                </div>
                 {/* Charts */}
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5>User Growth</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formatData(userGraph)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5>Order Growth</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formatData(orderGraph)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
              </div>

              
            )}

  


            {active === "product" && (
              <ProductList />
            )}

            {active === "category" && (
              <CategoryList />
            )}

             {active === "subcategory" && (
              <SubCategoryList />
            )}

            {active === "smith" && (
             <SmithList />
            )}

            {active === "reports" && (
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Reports</div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="border rounded p-3">
                        Sales Report (placeholder)
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border rounded p-3">
                        Traffic Report (placeholder)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ✅ Exporting component
export default AdminDashboard;
