import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Button,
    Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsFillPersonFill, BsGear } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="absolute w-full flex justify-between py-4 px-6">
            <Link href="/" className="text-2xl font-extrabold tracking-wider">
                WebLinks
            </Link>

            <Menu>
                <MenuButton
                    as={Button}
                    colorScheme="blackAlpha"
                    rightIcon={<ChevronDownIcon />}
                    leftIcon={<Avatar size="xs" />}
                >
                    Gemmuel
                </MenuButton>
                <MenuList bg="#0D1117" fontSize="sm">
                    <Link href="/">
                        <MenuItem
                            bg="#0D1117"
                            _hover={{ bg: "#343541" }}
                            icon={<ImHome size={16} />}
                            iconSpacing={2}
                        >
                            Home
                        </MenuItem>
                    </Link>
                    <Link href="/gemmuel">
                        <MenuItem
                            bg="#0D1117"
                            _hover={{ bg: "#343541" }}
                            icon={<BsFillPersonFill size={18} />}
                            iconSpacing={2}
                        >
                            My Account
                        </MenuItem>
                    </Link>
                    <MenuItem
                        bg="#0D1117"
                        _hover={{ bg: "#343541" }}
                        icon={<BsGear size={18} />}
                        iconSpacing={2}
                    >
                        Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        bg="#0D1117"
                        _hover={{ bg: "#343541" }}
                        icon={<FiLogOut size={18} />}
                        iconSpacing={2}
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};

export default Navbar;
