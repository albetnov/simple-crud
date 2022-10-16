import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link as RouterLink } from "react-router-dom";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
  to: string;
}
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  return (
    <Link to={to} as={RouterLink} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
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
    </Link>
  );
};

export default NavItem;
