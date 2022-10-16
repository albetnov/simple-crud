import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <Sidebar>
      <Box pt={{ md: 7 }} px={{ md: 5 }}>
        {children}
      </Box>
    </Sidebar>
  );
}
