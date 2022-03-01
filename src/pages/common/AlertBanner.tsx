import { Alert } from "react-bootstrap";
interface AlertBannerProps {
  message?: string;
  variant?: string;
}
export default function AlertBanner(props: AlertBannerProps) {
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
