import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ChangePassword from './ChangePassword';
import AdminLogin from './AdminLogin';
import UserList from './AdminDashboard';
import Navabar from './Navabar';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './manager/ManagerDashboard';
import ManagerLogin from './manager/ManagerLogin';
import CartList from './user/CartList';

// Protect private routes (basic token check)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Only allow admins
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'admin' ? children : <Navigate to="/admin-login" />;
};

function App() {
  return (
    

    <Router>
      <Navabar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/cart" element={<CartList />} />
        {/* User Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        {/* manager Routes */}
        <Route path="/manager" element={<AdminRoute><ManagerDashboard /></AdminRoute>} />
        
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


