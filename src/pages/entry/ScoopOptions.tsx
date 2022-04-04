import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IceItemProps } from "../../types/props";

export default function ScoopOptions(props: IceItemProps) {
  const { name, imagePath, updateItemCount } = props;
  const [isValid, setIsValid] = useState(true);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    const currentFloat = parseFloat(currentValue);
    const isValueValid =
      0 <= currentFloat &&
      currentFloat <= 3 &&
      Math.floor(currentFloat) === currentFloat;
    if (isValueValid) {
      updateItemCount(name, currentValue);
    }
    setIsValid(isValueValid);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
        style={{ width: "75%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
