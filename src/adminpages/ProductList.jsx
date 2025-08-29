





// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../adminpages/ProductList.css";
// import ProductFormModal from "./ProductFormModal";

// const ProductList = () => {
//   const [products, setProducts] = useState([
//     { smithName: "Ramesh", category: "Gold", subCategory: "Necklace", weight: "25", productNumber: "P001" },
//     { smithName: "Suresh", category: "Silver", subCategory: "Ring", weight: "10", productNumber: "P002" },
//     { smithName: "Akhil", category: "Platinum", subCategory: "Bracelet", weight: "15", productNumber: "P003" },
//   ]);

//   const [showForm, setShowForm] = useState(false);

//   const categories = {
//     Gold: ["Necklace", "Earrings", "Ring"],
//     Silver: ["Ring", "Bracelet", "Chain"],
//     Platinum: ["Bracelet", "Pendant", "Chain"],
//   };

//   // Handle Save from modal
//   const handleSaveProduct = (data) => {
//     const newProductNumber = `P${String(products.length + 1).padStart(3, "0")}`;
//     const newProduct = {
//       ...data,
//       productNumber: newProductNumber,
//     };

//     setProducts([...products, newProduct]);
//     setShowForm(false);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Product List</h2>
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={() => setShowForm(true)}>
//           + Add New Product
//         </button>
//       </div>

//       {/* Product Table */}
//       <table className="table table-striped table-bordered table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>Smith Name</th>
//             <th>Category</th>
//             <th>Sub Category</th>
//             <th>Weight (g)</th>
//             <th>Product Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((item, index) => (
//             <tr key={index}>
//               <td>{item.smithName}</td>
//               <td>{item.category}</td>
//               <td>{item.subCategory}</td>
//               <td>{item.weight}</td>
//               <td>{item.productNumber}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Separate Modal Component */}
//       <ProductFormModal
//         show={showForm}
//         onClose={() => setShowForm(false)}
//         onSave={handleSaveProduct}
//         categories={categories}
//       />
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../adminpages/ProductList.css";
import ProductFormModal from "./ProductFormModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [smiths, setSmiths] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSmith, setFilterSmith] = useState("");
  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchsubCategories();
    fetchSmiths();
  }, []);

  const fetchsubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/subcategories");
      setSubcategories(res.data); // backend should return [{_id, name}]
      console.log(res.data, " categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data.data); // backend should return [{_id, name}]
      console.log(res.data.data, " categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchSmiths = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/smiths");
      setSmiths(res.data.data);
    } catch (err) {
      console.error("Error fetching smiths:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data.data); 
      console.log(res.data.data," products fetched"); // Log products to verify
      // backend should return array of products
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  console.log(products,"productsssssssss");
  
  // Save new product (POST request)
  const handleSaveProduct = async (data) => {
    try {
      const res = await axios.get("http://localhost:3000/api/products", data);
      setProducts([...products, res.data]);
      console.log("Product saved:", res.data); // Log saved product
      
       // append new product
      setShowForm(false);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

    // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      console.log("Product deleted:", id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

   // Apply search + filter
  const filteredProducts = products.filter((item) => {
    const matchSearch =
      item.smithName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory = filterCategory ? item.category === filterCategory : true;
    const matchSmith = filterSmith ? item.smithName === filterSmith : true;

    return matchSearch && matchCategory && matchSmith;
  });


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product List</h2>
       {/* Search & Filter Options */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, category, product ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterSmith}
            onChange={(e) => setFilterSmith(e.target.value)}
          >
            <option value="">All Smiths</option>
            {smiths.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          </div>
          </div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add New Product
        </button>
      </div>

      {/* Product Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Smith Name</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>MC</th>
            <th>Weight (g)</th>
            <th>Product Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <tr key={index}>
                 <td>{index + 1}</td>
                <td>{item.smithName}</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.mc}</td>
                <td>{item.weight}</td>
                <td>{item.productId}</td>
                 <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    // onClick={() => handleEditProduct(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteProduct(item._id)}
                  >
                    Delete
                  </button>
                </td>

                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Separate Modal Component */}
      <ProductFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveProduct}
        categories={categories}
        smiths={smiths}
        subcategories={subcategories}
      />
    </div>
  );
};

export default ProductList;





