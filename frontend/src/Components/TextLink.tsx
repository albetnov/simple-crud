import { Text } from "@chakra-ui/react";
import DomLink from "./DomLink";

interface TextLinkProps {
  label: string;
  linkLabel: string;
  linkDestination: string;
}

export default function TextLink({ label, linkLabel, linkDestination }: TextLinkProps) {
  return (
    <Text color="white">
      {label}{" "}
      <DomLink to={linkDestination} color="blue.100">
        {linkLabel}
      </DomLink>
    </Text>
  );
}
