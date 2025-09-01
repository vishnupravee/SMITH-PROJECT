import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CategoryFormModal = ({ show, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  

  // Submit handler
//   const onSubmit = (data) => {
//     onSave(data); // send to parent
//     reset(); // clear form
//   };
const onSubmit = async (data) => {
  try {
    const res = await fetch("https://smith-server-qpxw.vercel.app/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Category saved!");
      onSave(data.data);  // update parent state
      reset();
      onClose();
    } else {
      alert("❌ " + result.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

if (!show) return null;
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              {...register("name", { required: "Category name is required" })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Category
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;
