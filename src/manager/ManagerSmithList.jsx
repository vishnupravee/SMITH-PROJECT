import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const ManagerSmithList = () => {
  const [smiths, setSmiths] = useState([]);
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
      <div className="col-md-4 pb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      {/* Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact 1</th>
            <th>Contact 2</th>
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

     
    </div>
  );
};

export default ManagerSmithList;