// src/components/CounterSelector.jsx
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const CounterSelector = ({ onSelect }) => {
  const [countertop, setCountertop] = useState({
    material: "",
    edge: "",
    thickness: "",
  });

  const handleChange = (e) => {
    setCountertop({ ...countertop, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelect(countertop);
  };

  return (
    <Card className="p-3 shadow-sm mt-3">
      <h4>Countertop Selector</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Material</Form.Label>
          <Form.Select name="material" value={countertop.material} onChange={handleChange}>
            <option value="">Select Material</option>
            <option value="Granite">Granite</option>
            <option value="Quartz">Quartz</option>
            <option value="Laminate">Laminate</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edge Profile</Form.Label>
          <Form.Select name="edge" value={countertop.edge} onChange={handleChange}>
            <option value="">Select Edge Profile</option>
            <option value="Straight">Straight</option>
            <option value="Beveled">Beveled</option>
            <option value="Bullnose">Bullnose</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Thickness</Form.Label>
          <Form.Select name="thickness" value={countertop.thickness} onChange={handleChange}>
            <option value="">Select Thickness</option>
            <option value="2cm">2 cm</option>
            <option value="3cm">3 cm</option>
            <option value="4cm">4 cm</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">Save Countertop</Button>
      </Form>
    </Card>
  );
};

export default CounterSelector;


