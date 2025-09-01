import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SmithFormModal = ({ show, onClose, onSave }) => {
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
    const res = await fetch("https://smith-server-qpxw.vercel.app/api/smiths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ smith saved!");
    //   onSave(result.data);  // update parent state
    onSave(data.data); 
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
        <Modal.Title>Add New Smith</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter smith name"
              {...register("name", { required: "Name is required" })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter primary contact"
              {...register("contact1", { required: "Contact 1 is required" })}
              isInvalid={!!errors.contact1}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact1?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter secondary contact (optional)"
              {...register("contact2")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter address"
              {...register("address", { required: "Address is required" })}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Smith
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SmithFormModal;
