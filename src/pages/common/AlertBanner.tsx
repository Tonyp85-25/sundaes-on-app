import { Alert } from "react-bootstrap";

export default function AlertBanner(props: any) {
  const { message, variant } = props;
  const alertMessage =
    message || "An unexpected error occured. Please try again later";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}
