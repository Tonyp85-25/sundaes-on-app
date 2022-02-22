import { Col } from "react-bootstrap";
import { IceItemProps } from "../../types/props";

export default function ToppingOption(props: IceItemProps) {
  const { name, imagePath } = props;
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http:localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
    </Col>
  );
}
