import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import SubCategoryFormModal from "./SubCategoryFormModal";
import "../adminpages/SubCategoryFormModal.css"
import axios from "axios";

const SubCategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/subcategories");
      setSubcategories(res.data); // backend should return [{_id, name}]
      console.log(res.data, " categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Handle saving category
  const handleSaveCategory = async (data) => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/subcategories", data);
      setSubcategories([...subcategories, res]); // append new category
      console.log("Category saved:", res);

      setShowModal(false);
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };


  // Add new subcategory
//   const handleSave = (data) => {
//     const newSubCategory = { id: Date.now(), name: data.name };
//     setSubcategories([...subcategories, newSubCategory]);
//     setShowModal(false);
//   };

   // Delete product
    const handleDeleteProduct = async (id) => {
      try {
        await axios.delete(`https://smith-server-qpxw.vercel.app/api/subcategories/${id}`);
        setSubcategories(subcategories.filter((p) => p._id !== id));
        console.log("Product deleted:", id);
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    };

  return (
    <div className="subcategory-list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Subcategory List</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add New Subcategory
        </Button>
      </div>

      <Table striped bordered hover responsive className="subcategory-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Subcategory Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories?.map((sub, index) => (
            <tr key={sub.id}>
              <td>{index + 1}</td>
              <td>{sub.name}</td>
              <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    // onClick={() => handleEditProduct(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteProduct(sub._id)}
                  >
                    Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <SubCategoryFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default SubCategoryList;
