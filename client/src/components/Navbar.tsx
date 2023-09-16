import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar,
    Text,
    useToast,
    HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsFillPersonFill, BsGear, BsHeart, BsHeartFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useEffect } from "react";
import userStore from "../zustandStore/userStore";
import { usePathname } from "next/navigation";
import { isTokenAvailable } from "../utils/checkAccessToken";

const Navbar = () => {
    const pathname = usePathname();
    const toast = useToast();
    const { accountUser, getAccountUser, logoutUser } = userStore();

    const handleLogout = () => {
        logoutUser();
        toast({
            title: "Logout Success!",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 3000,
        });
    };

    useEffect(() => {
        const checkToken = async () => await isTokenAvailable();

        getAccountUser();
        checkToken();
    }, [pathname]);

    return (
        <div className="absolute z-20 w-full flex justify-between py-4 px-6">
            <Link
                href="/"
                className="text-[#00CCCC] text-2xl font-extrabold tracking-wider"
            >
                LinkGrove
            </Link>

            {accountUser ? (
                <Menu>
                    <MenuButton
                        as={Button}
                        colorScheme="blackAlpha"
                        rightIcon={<ChevronDownIcon />}
                        leftIcon={
                            <Avatar
                                size="sm"
                                name={accountUser.username}
                                src={accountUser?.profilePic?.url}
                            />
                        }
                    >
                        {accountUser?.username}
                    </MenuButton>
                    <MenuList bg="#0D1117" fontSize="sm" zIndex={40}>
                        <MenuItem
                            as={Link}
                            href="/"
                            bg="#0D1117"
                            _hover={{ bg: "#343541" }}
                            icon={<ImHome size={16} />}
                            iconSpacing={2}
                        >
                            Home
                        </MenuItem>
                        <MenuItem
                            as={Link}
                            href={`/${accountUser?.username}`}
                            bg="#0D1117"
                            _hover={{ bg: "#343541" }}
                            icon={<BsFillPersonFill size={18} />}
                            iconSpacing={2}
                        >
                            My Account
                        </MenuItem>
                        <MenuItem
                            as={Link}
                            href="/edit-profile"
                            bg="#0D1117"
                            _hover={{ bg: "#343541" }}
                            icon={<BsGear size={18} />}
                            iconSpacing={2}
                        >
                            Settings
                        </MenuItem>
                        <MenuItem
                            as={Text}
                            bg="#0D1117"
                            _hover={{ bg: "#343541" }}
                            icon={<FiLogOut size={16} />}
                            iconSpacing={2}
                            onClick={handleLogout}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <Link href="/login">
                    <Button colorScheme="teal">Login</Button>
                </Link>
            )}
        </div>
    );
};

export default Navbar;
