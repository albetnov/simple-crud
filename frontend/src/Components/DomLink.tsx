import { Link, LinkProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface DomLinkProps extends LinkProps {
  to: string;
}

export default function DomLink(props: DomLinkProps) {
  return <Link as={RouterLink} {...props} />;
}
