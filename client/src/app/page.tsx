import { Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Header from "../components/Header";

const HomePage = () => {
    return (
        <div className="w-full flex flex-col items-center p-4">
            <Header />

            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16">
                <div className="w-[15rem]  flex flex-col items-center justify-center p-6 border border-[#FFFFFF31]  rounded-lg">
                    <Image src="/profileicon.png" alt="" />
                    <h1 className="mt-3">Profile</h1>
                    <small className="text-gray-400">
                        Customize your Profile
                    </small>
                </div>
                <div className="w-[15rem]  flex flex-col items-center justify-center p-6 border border-[#FFFFFF31] rounded-lg">
                    <Image src="/socialicon.png" alt="" />
                    <h1 className="mt-3 ">Social Accounts</h1>
                    <small className="text-gray-400">
                        Link all your social accounts
                    </small>
                </div>
                <div className="w-[15rem]  flex flex-col items-center justify-center p-6 border border-[#FFFFFF31]  rounded-lg">
                    <Image src="/linkicon.png" alt="" />
                    <h1 className="mt-3 ">Links</h1>
                    <small className="text-gray-400">
                        Share different links
                    </small>
                </div>
                <div className="w-[15rem] flex flex-col items-center justify-center p-6 border border-[#FFFFFF31] rounded-lg">
                    <Image src="/reactionicon.png" alt="" />
                    <h1 className="mt-3 ">Reactions</h1>
                    <small className="text-gray-400">
                        Gain lots of reactions
                    </small>
                </div>
            </div>
            <footer className="w-full lg:w-[70vw] p-4 border-t border-t-gray-500 grid xl:grid-cols-4 justify-items-center items-center mt-[5rem] lg:mt-[20rem]">
                <div className="w-full h-full flex flex-col justify-center mb-6 lg:mb-0">
                    <Link
                        href="/"
                        className="text-lg lg:text-2xl text-[#00CCCC] font-extrabold tracking-wider"
                    >
                        LinkGrove
                    </Link>
                    <p className="text-sm lg:text-sm text-gray-400 mt-1">
                        © Gemmuel Dela Pena 2023
                    </p>
                </div>
                <Spacer />
                <div className="w-full h-full flex flex-col items-center gap-1">
                    <h2 className=" font-bold mb-1">Socials</h2>
                    <Link
                        href="https://www.facebook.com/Solidbullet/"
                        target="_blank"
                        className="text-gray-400 text-sm"
                    >
                        Facebook
                    </Link>
                    <Link
                        href="https://www.instagram.com/gem.muel/"
                        target="_blank"
                        className="text-gray-400 text-sm"
                    >
                        Instagram
                    </Link>
                    <Link
                        href="https://github.com/BulletOnli"
                        target="_blank"
                        className="text-gray-400 text-sm"
                    >
                        Github
                    </Link>
                </div>
                <div className="w-full h-full flex flex-col items-center gap-1">
                    <h2 className=" font-bold mb-1">Open Source</h2>
                    <Link
                        href="https://github.com/BulletOnli/weblinks"
                        target="_blank"
                        className="text-gray-400 text-sm"
                    >
                        Contribute
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        className="text-gray-400 text-sm"
                    >
                        Bug Report
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        className="text-gray-400 text-sm"
                    >
                        Suggest feature
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
