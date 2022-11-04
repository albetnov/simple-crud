import { Alert, AlertIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type AlertVariants = "success" | "info" | "warning" | "error";

interface SetAlertProps {
  message: string;
  variant: AlertVariants;
  showAlert: boolean;
}

type UseAlert = [React.ReactNode, (options: SetAlertProps) => void];

export default function useAlert(timeout: number = 2000): UseAlert {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<AlertVariants>("success");

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

  const setAlert = ({ message, variant, showAlert }: SetAlertProps) => {
    setShowAlert(showAlert);
    setMessage(message);
    setVariant(variant);
  };

  return [element, setAlert];
}
