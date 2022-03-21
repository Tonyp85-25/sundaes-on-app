import React, { SyntheticEvent, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { OrderPhase, OrderProps } from "../../types";

const popover = () => (
  <Popover>
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
);

const SummaryForm = (props: OrderProps) => {
  const { setOrderPhase } = props;
  const [disabled, setDisabled] = useState(true);
  const handleChange = () => setDisabled(!disabled);

  const Terms = () => (
    <>
      <span>I agree to </span>
      <OverlayTrigger placement="right" overlay={popover}>
        <span>Terms and Conditions </span>
      </OverlayTrigger>
    </>
  );

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setOrderPhase(OrderPhase.completed);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label={<Terms />} onChange={handleChange} />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
