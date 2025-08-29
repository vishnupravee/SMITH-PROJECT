import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SmithFormModal from "./SmithFormModal";

const SmithList = () => {
  const [smiths, setSmiths] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchSmiths();
  }, []);

  // Fetch smiths
  const fetchSmiths = async () => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/smiths");
      setSmiths(res.data.data);
    } catch (err) {
      console.error("Error fetching smiths:", err);
    }
  };

  // Add smith
  const handleSaveSmith = async (data) => {
    try {
      await axios.get("https://smith-server-qpxw.vercel.app/api/smiths", data);
      fetchSmiths();
      setShowForm(false);
    } catch (err) {
      console.error("Error adding smith:", err);
    }
  };

    // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://smith-server-qpxw.vercel.app/api/smiths/${id}`);
      setSmiths(smiths.filter((p) => p._id !== id));
      console.log("Product deleted:", id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

// Apply search + filter
  const filteredsmith = smiths.filter((item) => {
    const matchSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ;
      return matchSearch;
  });
 
  
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Smith List</h2>
        {/* 🔍 Search Bar */}
      <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, category, product ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Smith
        </button>
      </div>

      {/* Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact 1</th>
            <th>Contact 2</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredsmith.length > 0 ? (
            filteredsmith.map((smith, index) => (
              <tr key={smith._id || index}>
                 <td>{index + 1}</td>
                <td>{smith.name}</td>
                <td>{smith.contact1}</td>
                <td>{smith.contact2}</td>
                <td>{smith.address}</td>
                 <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    // onClick={() => handleEditProduct(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteProduct(smith._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No smiths available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showForm && (
        <SmithFormModal
          show={showForm}
          onClose={() => setShowForm(false)}
          onSave={handleSaveSmith}
        />
      )}
    </div>
  );
};

export default SmithList;
