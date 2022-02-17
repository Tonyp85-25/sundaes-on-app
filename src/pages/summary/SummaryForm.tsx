import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true);
  const handleChange = () => setDisabled(!disabled);
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="I agree to Terms and Conditions"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disabled}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
