import React, { FormEvent } from "react";
import { Container, Flex } from "@chakra-ui/react";

interface AuthTemplateProps {
  onSubmit: (event: FormEvent) => void;
  children: React.ReactNode;
}

export default function AuthTemplate({ children, onSubmit }: AuthTemplateProps) {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Container
        borderWidth={1}
        borderStyle="solid"
        borderColor="gray.300"
        p={3}
        rounded="lg"
        shadow="base"
        background="whiteAlpha.500"
      >
        <form onSubmit={onSubmit}>{children}</form>
      </Container>
    </Flex>
  );
}
