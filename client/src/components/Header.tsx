"use client";
import userStore from "../zustandStore/userStore";
import { Button, Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
    const accountUser = userStore((state) => state.accountUser);

    return (
        <header className="w-full lg:h-screen flex flex-col items-center lg:flex-row p-4 mt-12 gap-6 lg:gap-0">
            <div className="w-full lg:w-[50%] h-full text-[#D1D5DB] flex flex-col items-center justify-center gap-2 lg:p-4">
                <h1 className="text-center text-4xl font-bold">
                    Connect, Share, Discover: <br /> Your Unified Profile
                    Experience
                </h1>
                <p className="text-gray-300 text-center">
                    Discover and share all your important links in one place
                </p>
                <Button
                    as={Link}
                    href={accountUser ? `/${accountUser?.username}` : "/login"}
                    colorScheme="teal"
                    mt={5}
                >
                    {accountUser ? "View Profile" : "Get Started"}
                </Button>
            </div>
            <div className="w-full lg:w-[50%] h-full flex justify-center items-center">
                <Image
                    src="/globe.svg"
                    alt="homepage logo"
                    className="w-[40rem]"
                />
            </div>
        </header>
    );
};

export default Header;
