import { Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function useAlert(timeout: number = 2000) {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<"success" | "info" | "warning" | "error">("success");

  useEffect(() => {
    if (showAlert && timeout !== 0) {
      setTimeout(() => {
        setShowAlert(false);
      }, timeout);
    }
  }, [showAlert]);

  let element = <></>;

  if (showAlert) {
    element = (
      <Alert status={variant} rounded="lg">
        <AlertIcon />
        {message}
      </Alert>
    );
  }

  return { setShowAlert, setMessage, element, setVariant };
}
