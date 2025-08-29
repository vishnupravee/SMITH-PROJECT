// src/adminpages/CategoryList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import './CategoryList.css';
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryFormModal from "./CategoryFormModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/categories");
      setCategories(res.data.data); // backend should return [{_id, name}]
      console.log(res.data.data, " categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Handle saving category
  const handleSaveCategory = async (data) => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/categories", data);
      setCategories([...categories, res.data]); // append new category
      console.log("Category saved:", res.data);

      setShowForm(false);
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

      // Delete product
    const handleDeleteProduct = async (id) => {
      try {
        await axios.delete(`https://smith-server-qpxw.vercel.app/api/categories/${id}`);
        setCategories(categories.filter((p) => p._id !== id));
        console.log("Product deleted:", id);
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Category List</h2>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Category
        </button>
      </div>

      {/* Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <tr key={cat._id || index}>
                 <td>{index + 1}</td>
                <td>{cat.name}</td>
                 <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    // onClick={() => handleEditProduct(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteProduct(cat._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
                 
              <td className="text-center">No categories available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Category Form Modal */}
      <CategoryFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default CategoryList;

