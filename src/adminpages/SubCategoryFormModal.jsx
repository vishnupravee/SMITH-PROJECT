import axios from "axios";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SubCategoryFormModal = ({ show, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

//   const onSubmit = (data) => {
//     onSave(data);
//     reset();
//   };
const onSubmit = async (data) => {
  try {
    const res = await fetch("https://smith-server-qpxw.vercel.app/api/subcategories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result) {
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

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Subcategory</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Subcategory Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subcategory name"
              {...register("name", { required: "Subcategory name is required" })}
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
            Save Subcategory
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SubCategoryFormModal;
