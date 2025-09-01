// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navabar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//       <Link className="navbar-brand" to="/">SMITH LINK</Link>

//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ms-auto">
//           {/* <li className="nav-item">
//             <Link className="nav-link" to="/dashboard">Dashboard</Link>
//           </li> */}

//           <li className="nav-item">
//             <Link className="nav-link" to="/manager-login">Manager</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/admin-login">Admin</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };
// export default Navabar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../src/assets/1000360388-removebg-preview.png";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user")); // 👈 get logged-in user

  useEffect(() => {
    if (user) {
      fetchCartCount();
    }
  }, [user]);

  // ✅ Fetch cart item count
  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`https://smith-server-qpxw.vercel.app/api/cart/${user._id}`);
      setCartCount(res.data.length); // assuming backend returns array of items
    } catch (err) {
      console.error("❌ Error fetching cart count:", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
     
      <Link className="navbar-brand" to="/">
  <img 
    src={logo}   // 👈 place your logo inside public/images/
    alt="Smith Logo" 
    style={{ height: "40px" }} 
  />
</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/manager-login">
              Manager
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin-login">
              Admin
            </Link>
          </li>

          {/* ✅ Cart Button */}
          {user && (
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
