import { Button, ButtonProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface ButtonLinkProps extends ButtonProps {
  to: string;
}

export default function ButtonLink(props: ButtonLinkProps) {
  return <Button as={RouterLink} {...props} />;
}
