import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const ProductFormModal = ({ show, onClose, onSave,categories,smiths,subcategories}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedsubcategories, setselectedSubcategories] = useState([]);
  const [selectedsmiths, setselectedSmiths] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  // const onSubmit = (data) => {
  //   onSave(data);   // send data back to parent
  //   reset();
  // };
    useEffect(() => {
      fetchCategories();
      fetchsubCategories();
      fetchSmiths();
    }, []);
     
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setSelectedCategory(res.data.data); // backend should return [{_id, name}]
      console.log(res.data.data, " categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
console.log(selectedCategory,"rrrrrrrr");

  const fetchsubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/subcategories");
      setselectedSubcategories(res.data); // backend should return [{_id, name}]
      console.log(res.data, " categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  console.log(selectedsubcategories,"sssssssssss");
  

  const fetchSmiths = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/smiths");
      setselectedSmiths(res.data.data);
    } catch (err) {
      console.error("Error fetching smiths:", err);
    }
  };

  console.log(selectedsmiths,"mmmmmmmmmmmmm");
  

// const onSubmit = async (data) => {
//   try {
//     const res = await fetch("http://localhost:3000/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await res.json();
//     if (result.success) {
//       alert("✅ Product saved!");
//       onSave(result.data);  // update parent state
//       reset();
//       onClose();
//     } else {
//       alert("❌ " + result.message);
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };
 // ✅ Submit form
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("smithName", data.smithName);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("mc", data.mc);
      formData.append("makingDuration", data.makingDuration);
      formData.append("weight", data.weight);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]); // product image
      }

      const res = await axios.post("http://localhost:3000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Product saved!");
        onSave(res.data.data);
        reset();
        setPreviewImage(null);
        onClose();
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Server error, please try again.");
    }
  };


  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Product</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
           <div className="mb-3">
  <label className="form-label">Smith Name</label>
  <select
    className="form-select"
    {...register("smithName", { required: "Smith Name is required" })}
    onChange={(e) => setselectedSmiths(e.target.value)}
  >
    <option value="">-- Select Smith --</option>
    {smiths.map((smith) => (
      <option key={smith._id} value={smith.name}>
        {smith.name}
      </option>
    ))}
  </select>
  {errors.smithName && (
    <small className="text-danger">{errors.smithName.message}</small>
  )}
</div>
<div className="mb-3">
  <label className="form-label">Category</label>
  <select
    className="form-select"
    {...register("category", { required: "Category is required" })}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="">-- Select Category --</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat.name}>
        {cat.name}
      </option>
    ))}
  </select>
  {errors.category && (
    <small className="text-danger">{errors.category.message}</small>
  )}
</div>


              {/* Sub Category */}
              <div className="mb-3">
                <label className="form-label">Sub Category</label>
                <select
                  className="form-select"
                  {...register("subCategory", { required: "Sub Category is required" })}
                  onChange={(e) => setselectedSubcategories(e.target.value)}
                >
                  <option value="">-- Select SubCategory --</option>
                  {subcategories.map((cat, i) => (
      <option key={cat._id} value={cat.name}>
        {cat.name}
      </option>
    ))}
                </select>
                {errors.subCategory && (
                  <small className="text-danger">{errors.subCategory.message}</small>
                )}
              </div>

              {/* MC Field */}
<div className="mb-3">
  <label className="form-label">MC</label>
  <input
    type="number"
    className="form-control"
    {...register("mc", {
      required: "MC is required",
      min: { value: 1, message: "MC must be at least 1" },
    })}
  />
  {errors.mc && (
    <small className="text-danger">{errors.mc.message}</small>
  )}
</div>

<div className="mb-3">
  <label className="form-label">Making Duration(in hours)</label>
  <input
    type="number"
    className="form-control"
    {...register("makingDuration", {
      required: "Making Duration is required",
      min: { value: 1, message: "Making Duration must be at least 1" },
    })}
  />
  {errors.makingDuration && (
    <small className="text-danger">{errors.makingDuration.message}</small>
  )}
</div>


              {/* Weight */}
              <div className="mb-3">
                <label className="form-label">Weight (g)</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("weight", {
                    required: "Weight is required",
                    min: { value: 1, message: "Weight must be at least 1g" },
                  })}
                />
                {errors.weight && (
                  <small className="text-danger">{errors.weight.message}</small>
                )}
              </div>

                {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  {...register("image", { required: "Product image is required" })}
                  onChange={(e) =>
                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
                {errors.image && <small className="text-danger">{errors.image.message}</small>}
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="mb-3 text-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
              )}

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;



