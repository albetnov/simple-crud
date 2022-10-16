import { Box, BoxProps } from "@chakra-ui/react";

interface CardProps extends BoxProps {
  children: React.ReactNode;
}
export default function Card({ children, ...rest }: CardProps) {
  return (
    <Box p={3} shadow="lg" bg="white" rounded="md" {...rest}>
      {children}
    </Box>
  );
}
