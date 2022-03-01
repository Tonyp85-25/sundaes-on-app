import { Col, Form } from "react-bootstrap";
import { IceItemProps } from "../../types/props";

export default function ToppingOption(props: IceItemProps) {
  const { name, imagePath, updateItemCount } = props;
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http:localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? "1" : "0");
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  );
}
