// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";


// const ProductFormModal = ({ show, onClose, onSave,categories,smiths,subcategories}) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();


  

//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [selectedsubcategories, setselectedSubcategories] = useState([]);
//   const [selectedsmiths, setselectedSmiths] = useState([]);
//   const [previewImage, setPreviewImage] = useState(null);
// const [uploading, setUploading] = useState(false);
//   const cloudName = "djuihd2af";  // ✅ your cloud name
//   const uploadPreset = "rjatlas"; // ✅ replace with the preset you created
//   // const onSubmit = (data) => {
//   //   onSave(data);   // send data back to parent
//   //   reset();
//   // };
//     useEffect(() => {
//       fetchCategories();
//       fetchsubCategories();
//       fetchSmiths();
//     }, []);
     
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("https://smith-server-qpxw.vercel.app/api/categories");
//       setSelectedCategory(res.data.data); // backend should return [{_id, name}]
//       console.log(res.data.data, " categories fetched");
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };
// console.log(selectedCategory,"rrrrrrrr");

//   const fetchsubCategories = async () => {
//     try {
//       const res = await axios.get("https://smith-server-qpxw.vercel.app/api/subcategories");
//       setselectedSubcategories(res.data); // backend should return [{_id, name}]
//       console.log(res.data, " categories fetched");
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   console.log(selectedsubcategories,"sssssssssss");
  

//   const fetchSmiths = async () => {
//     try {
//       const res = await axios.get("https://smith-server-qpxw.vercel.app/api/smiths");
//       setselectedSmiths(res.data.data);
//     } catch (err) {
//       console.error("Error fetching smiths:", err);
//     }
//   };

//   console.log(selectedsmiths,"mmmmmmmmmmmmm");
  


//   // const onSubmit = async (data) => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("smithName", data.smithName);
//   //     formData.append("category", data.category);
//   //     formData.append("subCategory", data.subCategory);
//   //     formData.append("mc", data.mc);
//   //     formData.append("makingDuration", data.makingDuration);
//   //     formData.append("weight", data.weight);

//   //     if (data.image && data.image[0]) {
//   //       formData.append("image", data.image[0]); // product image
//   //     }
      

//   //     const res = await axios.post("https://smith-server-qpxw.vercel.app/api/products", formData, {
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });

//   //     if (res.data.success) {
//   //       alert("✅ Product saved!");
//   //       onSave(res.data.data);
//   //       reset();
//   //       setPreviewImage(null);
//   //       onClose();
//   //     } else {
//   //       alert("❌ " + res.data.message);
//   //     }
//   //   } catch (err) {
//   //     console.error("Error saving product:", err);
//   //     alert("Server error, please try again.");
//   //   }
//   // };

//   // Function to upload image to Cloudinary
//   const uploadImageToCloudinary = async (file) => {
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", uploadPreset);
//     data.append("cloud_name", cloudName);

//     const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//       method: "POST",
//       body: data,
//     });

//     const result = await res.json();
//     return result.secure_url; // ✅ returns uploaded image URL
//   };

// // Submit form
//   const onSubmit = async (data) => {
//     try {
//       setUploading(true);

//       let imageUrl = "";
//       if (data.image && data.image[0]) {
//         imageUrl = await uploadImageToCloudinary(data.image[0]); // upload file
//       }

//       const productData = {
//         smithName: data.smithName,
//         category: data.category,
//         subCategory: data.subCategory,
//         mc: data.mc,
//         makingDuration: data.makingDuration,
//         weight: data.weight,
//         image: imageUrl, // ✅ use Cloudinary image URL
//       };

//       const res = await axios.post("https://smith-server-qpxw.vercel.app/api/products", productData);

//       if (res.data.success) {
//         alert("✅ Product saved!");
//         onSave(res.data.data);
//         reset();
//         setPreviewImage(null);
//         onClose();
//       } else {
//         alert("❌ " + res.data.message);
//       }
//     } catch (err) {
//       console.error("Error saving product:", err);
//       alert("Server error, please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="modal show d-block" tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Add New Product</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleSubmit(onSubmit)}>
//            <div className="mb-3">
//   <label className="form-label">Smith Name</label>
//   <select
//     className="form-select"
//     {...register("smithName", { required: "Smith Name is required" })}
//     onChange={(e) => setselectedSmiths(e.target.value)}
//   >
//     <option value="">-- Select Smith --</option>
//     {smiths.map((smith) => (
//       <option key={smith._id} value={smith.name}>
//         {smith.name}
//       </option>
//     ))}
//   </select>
//   {errors.smithName && (
//     <small className="text-danger">{errors.smithName.message}</small>
//   )}
// </div>
// <div className="mb-3">
//   <label className="form-label">Category</label>
//   <select
//     className="form-select"
//     {...register("category", { required: "Category is required" })}
//     onChange={(e) => setSelectedCategory(e.target.value)}
//   >
//     <option value="">-- Select Category --</option>
//     {categories.map((cat) => (
//       <option key={cat._id} value={cat.name}>
//         {cat.name}
//       </option>
//     ))}
//   </select>
//   {errors.category && (
//     <small className="text-danger">{errors.category.message}</small>
//   )}
// </div>


//               {/* Sub Category */}
//               <div className="mb-3">
//                 <label className="form-label">Sub Category</label>
//                 <select
//                   className="form-select"
//                   {...register("subCategory", { required: "Sub Category is required" })}
//                   onChange={(e) => setselectedSubcategories(e.target.value)}
//                 >
//                   <option value="">-- Select SubCategory --</option>
//                   {subcategories.map((cat, i) => (
//       <option key={cat._id} value={cat.name}>
//         {cat.name}
//       </option>
//     ))}
//                 </select>
//                 {errors.subCategory && (
//                   <small className="text-danger">{errors.subCategory.message}</small>
//                 )}
//               </div>

//               {/* MC Field */}
// <div className="mb-3">
//   <label className="form-label">MC</label>
//   <input
//     type="number"
//     className="form-control"
//     {...register("mc", {
//       required: "MC is required",
//       min: { value: 1, message: "MC must be at least 1" },
//     })}
//   />
//   {errors.mc && (
//     <small className="text-danger">{errors.mc.message}</small>
//   )}
// </div>

// <div className="mb-3">
//   <label className="form-label">Making Duration(in hours)</label>
//   <input
//     type="number"
//     className="form-control"
//     {...register("makingDuration", {
//       required: "Making Duration is required",
//       min: { value: 1, message: "Making Duration must be at least 1" },
//     })}
//   />
//   {errors.makingDuration && (
//     <small className="text-danger">{errors.makingDuration.message}</small>
//   )}
// </div>


//               {/* Weight */}
//               <div className="mb-3">
//                 <label className="form-label">Weight (g)</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   {...register("weight", {
//                     required: "Weight is required",
//                     min: { value: 1, message: "Weight must be at least 1g" },
//                   })}
//                 />
//                 {errors.weight && (
//                   <small className="text-danger">{errors.weight.message}</small>
//                 )}
//               </div>

//                 {/* Image Upload */}
//               <div className="mb-3">
//                 <label className="form-label">Product Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="form-control"
//                   {...register("image", { required: "Product image is required" })}
//                   onChange={(e) =>
//                     setPreviewImage(URL.createObjectURL(e.target.files[0]))
//                   }
//                 />
//                 {errors.image && <small className="text-danger">{errors.image.message}</small>}
//               </div>

//               {/* Image Preview */}
//               {previewImage && (
//                 <div className="mb-3 text-center">
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     className="img-thumbnail"
//                     style={{ maxWidth: "150px" }}
//                   />
//                 </div>
//               )}

//               <div className="d-flex justify-content-end">
//                 <button
//                   type="button"
//                   className="btn btn-secondary me-2"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-success">
//                   Save Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductFormModal;






import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ProductFormModal = ({ show, onClose, onSave, categories, smiths, subcategories }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSmiths, setSelectedSmiths] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Cloudinary config
  const cloudName = "djuihd2af"; 
  const uploadPreset = "rjatlas"; 

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchSmiths();
  }, []);

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/categories");
      setSelectedCategory(res.data.data);
      console.log(res.data.data, " categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // ✅ Fetch SubCategories
  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/subcategories");
      setSelectedSubcategories(res.data);
      console.log(res.data, " subcategories fetched");
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  // ✅ Fetch Smiths
  const fetchSmiths = async () => {
    try {
      const res = await axios.get("https://smith-server-qpxw.vercel.app/api/smiths");
      setSelectedSmiths(res.data.data);
    } catch (err) {
      console.error("Error fetching smiths:", err);
    }
  };

  // ✅ Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url; // uploaded image URL
  };

  // ✅ Handle Submit
  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let imageUrl = "";

      if (data.image && data.image[0]) {
        imageUrl = await uploadImageToCloudinary(data.image[0]); // upload image
      }

      const productData = {
        smithName: data.smithName,
        category: data.category,
        subCategory: data.subCategory,
        mc: data.mc,
        makingDuration: data.makingDuration,
        weight: data.weight,
        image: imageUrl, // ✅ Cloudinary URL
      };

      const res = await axios.post("https://smith-server-qpxw.vercel.app/api/products", productData);

      if (res.data.success) {
        alert("✅ Product saved!");
        onSave(res.data.data.data);
        reset();
        setPreviewImage(null);
        onClose();
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Server error, please try again.");
    } finally {
      setUploading(false);
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
              
              {/* Smith */}
              <div className="mb-3">
                <label className="form-label">Smith Name</label>
                <select
                  className="form-select"
                  {...register("smithName", { required: "Smith Name is required" })}
                >
                  <option value="">-- Select Smith --</option>
                  {selectedSmiths.map((smith) => (
                    <option key={smith._id} value={smith.name}>
                      {smith.name}
                    </option>
                  ))}
                </select>
                {errors.smithName && <small className="text-danger">{errors.smithName.message}</small>}
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  {...register("category", { required: "Category is required" })}
                >
                  <option value="">-- Select Category --</option>
                  {selectedCategory.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <small className="text-danger">{errors.category.message}</small>}
              </div>

              {/* Sub Category */}
              <div className="mb-3">
                <label className="form-label">Sub Category</label>
                <select
                  className="form-select"
                  {...register("subCategory", { required: "Sub Category is required" })}
                >
                  <option value="">-- Select SubCategory --</option>
                  {selectedSubcategories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.subCategory && <small className="text-danger">{errors.subCategory.message}</small>}
              </div>

              {/* MC */}
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
                {errors.mc && <small className="text-danger">{errors.mc.message}</small>}
              </div>

              {/* Making Duration */}
              <div className="mb-3">
                <label className="form-label">Making Duration (hours)</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("makingDuration", {
                    required: "Making Duration is required",
                    min: { value: 1, message: "Making Duration must be at least 1" },
                  })}
                />
                {errors.makingDuration && <small className="text-danger">{errors.makingDuration.message}</small>}
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
                {errors.weight && <small className="text-danger">{errors.weight.message}</small>}
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  {...register("image", { required: "Product image is required" })}
                  onChange={(e) => setPreviewImage(URL.createObjectURL(e.target.files[0]))}
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
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success" disabled={uploading}>
                  {uploading ? "Uploading..." : "Save Product"}
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



// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// const AddProduct = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [previewImage, setPreviewImage] = useState(null);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("smithName", data.smithName);
//       formData.append("category", data.category);
//       formData.append("subCategory", data.subCategory);
//       formData.append("mc", data.mc);
//       formData.append("makingDuration", data.makingDuration);
//       formData.append("weight", data.weight);
//       formData.append("image", data.image[0]); // actual file

//       const res = await fetch("http://localhost:5000/api/products/add-product", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await res.json();
//       if (result.success) {
//         alert("✅ Product added successfully!");
//         console.log("Saved Product:", result.data);
//       } else {
//         alert("❌ " + result.message);
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
//       {/* Smith Name */}
//       <div className="mb-3">
//         <label className="form-label">Smith Name</label>
//         <input
//           type="text"
//           className="form-control"
//           {...register("smithName", { required: "Smith name is required" })}
//         />
//         {errors.smithName && <small className="text-danger">{errors.smithName.message}</small>}
//       </div>

//       {/* Category */}
//       <div className="mb-3">
//         <label className="form-label">Category</label>
//         <input
//           type="text"
//           className="form-control"
//           {...register("category", { required: "Category is required" })}
//         />
//         {errors.category && <small className="text-danger">{errors.category.message}</small>}
//       </div>

//       {/* Sub Category */}
//       <div className="mb-3">
//         <label className="form-label">Sub Category</label>
//         <input
//           type="text"
//           className="form-control"
//           {...register("subCategory", { required: "Sub Category is required" })}
//         />
//         {errors.subCategory && <small className="text-danger">{errors.subCategory.message}</small>}
//       </div>

//       {/* MC */}
//       <div className="mb-3">
//         <label className="form-label">MC</label>
//         <input
//           type="number"
//           className="form-control"
//           {...register("mc", { required: "MC is required" })}
//         />
//         {errors.mc && <small className="text-danger">{errors.mc.message}</small>}
//       </div>

//       {/* Making Duration */}
//       <div className="mb-3">
//         <label className="form-label">Making Duration (days)</label>
//         <input
//           type="number"
//           className="form-control"
//           {...register("makingDuration", { required: "Making Duration is required" })}
//         />
//         {errors.makingDuration && <small className="text-danger">{errors.makingDuration.message}</small>}
//       </div>

//       {/* Weight */}
//       <div className="mb-3">
//         <label className="form-label">Weight (grams)</label>
//         <input
//           type="number"
//           className="form-control"
//           {...register("weight", { required: "Weight is required" })}
//         />
//         {errors.weight && <small className="text-danger">{errors.weight.message}</small>}
//       </div>

//       {/* Image Upload */}
//       <div className="mb-3">
//         <label className="form-label">Product Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           className="form-control"
//           {...register("image", { required: "Product image is required" })}
//           onChange={(e) =>
//             setPreviewImage(URL.createObjectURL(e.target.files[0]))
//           }
//         />
//         {errors.image && (
//           <small className="text-danger">{errors.image.message}</small>
//         )}
//         {previewImage && (
//           <img
//             src={previewImage}
//             alt="Preview"
//             className="mt-2"
//             style={{ width: "150px", borderRadius: "8px" }}
//           />
//         )}
//       </div>

//       <button type="submit" className="btn btn-primary">Add Product</button>
//     </form>
//   );
// };

// export default AddProduct;