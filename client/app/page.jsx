"use client";
import { Button, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useUserStore } from "./zustandStore/userStore";

const HomePage = () => {
    const accountUser = useUserStore((state) => state.accountUser);
    const token = localStorage.getItem("weblinksToken");

    return (
        <div className="w-full flex flex-col items-center p-4">
            <main className="w-full h-screen flex p-4 ">
                <div className="w-[50%] h-full text-[#D1D5DB] flex flex-col items-center justify-center gap-2 p-4">
                    <h1 className="text-center text-4xl font-bold">
                        Connect, Share, Discover: <br /> Your Unified Profile
                        Experience
                    </h1>
                    <p className="text-gray-300">
                        Discover and share all your important links in one place
                    </p>
                    <Button
                        as={Link}
                        href={token ? `/${accountUser?.username}` : "/login"}
                        colorScheme="teal"
                        mt={5}
                    >
                        {token ? "View Profile" : "Get Started"}
                    </Button>
                </div>
                <div className="w-[50%] h-full flex justify-center items-center">
                    <img
                        src="/globe.svg"
                        alt="homepage logo"
                        className="w-[40rem]"
                    />
                </div>
            </main>

            <div className="w-full flex items-center justify-center gap-16">
                <div className="w-[15rem]  flex flex-col items-center justify-center p-6 border border-[#FFFFFF31]  rounded-lg">
                    <img src="/profileicon.png" alt="" />
                    <h1 className="mt-3">Profile</h1>
                    <small className="text-gray-400">
                        Customize your Profile
                    </small>
                </div>
                <div className="w-[15rem]  flex flex-col items-center justify-center p-6 border border-[#FFFFFF31] rounded-lg">
                    <img src="/socialicon.png" alt="" />
                    <h1 className="mt-3 ">Social Accounts</h1>
                    <small className="text-gray-400">
                        Link all your social accounts
                    </small>
                </div>
                <div className="w-[15rem]  flex flex-col items-center justify-center p-6 border border-[#FFFFFF31]  rounded-lg">
                    <img src="/linkicon.png" alt="" />
                    <h1 className="mt-3 ">Links</h1>
                    <small className="text-gray-400">
                        Share different links
                    </small>
                </div>
                <div className="w-[15rem] flex flex-col items-center justify-center p-6 border border-[#FFFFFF31] rounded-lg">
                    <img src="/reactionicon.png" alt="" />
                    <h1 className="mt-3 ">Reactions</h1>
                    <small className="text-gray-400">
                        Gain lots of reactions
                    </small>
                </div>
            </div>
            <footer className="w-[70vw] p-4 border-t border-t-gray-500 grid xl:grid-cols-4 justify-items-center items-center mt-[20rem]">
                <div className="w-full h-full flex flex-col justify-center">
                    <Link
                        href="/"
                        className="text-3xl text-[#00CCCC] font-extrabold tracking-wider"
                    >
                        WebLinks
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">
                        © Gemmuel Dela Pena 2023
                    </p>
                </div>
                <Spacer />
                <div className="w-full h-full flex flex-col items-center gap-1">
                    <h2 className="text-lg font-bold mb-2">Socials</h2>
                    <Link
                        href="https://www.facebook.com/Solidbullet/"
                        target="_blank"
                        className="text-gray-400"
                    >
                        Facebook
                    </Link>
                    <Link
                        href="https://www.instagram.com/gem.muel/"
                        target="_blank"
                        className="text-gray-400"
                    >
                        Instagram
                    </Link>
                    <Link
                        href="https://github.com/BulletOnli"
                        target="_blank"
                        className="text-gray-400"
                    >
                        Github
                    </Link>
                </div>
                <div className="w-full h-full flex flex-col items-center gap-1">
                    <h2 className="text-lg font-bold mb-2">Open Source</h2>
                    <Link
                        href="https://github.com/BulletOnli/weblinks"
                        target="_blank"
                        className="text-gray-400"
                    >
                        Contribute
                    </Link>
                    <Link href="#" target="_blank" className="text-gray-400">
                        Bug Report
                    </Link>
                    <Link href="#" target="_blank" className="text-gray-400">
                        Suggest feature
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
