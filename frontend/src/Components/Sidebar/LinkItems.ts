import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, to: "/" },
  { name: "Users", icon: FiUser, to: "/users" },
  { name: "Settings", icon: FiSettings, to: "/" },
];

export default LinkItems;
