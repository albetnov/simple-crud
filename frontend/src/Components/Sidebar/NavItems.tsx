import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import DomLink from "../DomLink";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
  to: string;
}
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  return (
    <DomLink to={to} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.300",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </DomLink>
  );
};

export default NavItem;
