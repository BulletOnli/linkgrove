"use client";
import LoginForm from "../components/form/LoginForm";
import { HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

const LoginPage = () => {
    useEffect(() => {
        const token = localStorage.getItem("weblinksToken");
        if (token) {
            redirect("/");
        }
    }, []);

    return (
        <div className="relative w-full flex flex-col justify-center items-center">
            <div className="absolute top-0 w-full lg:w-[70vw] flex items-center justify-between p-6">
                <Link
                    href="/"
                    className="text-xl lg:text-3xl text-[#00CCCC] font-extrabold tracking-wider"
                >
                    LinkGrove
                </Link>
            </div>

            <div className="w-full h-screen flex justify-center items-center">
                <LoginForm />
            </div>

            <footer className="w-full lg:w-[70vw] flex p-6">
                <p className="text-xs lg:text-base">© Gemmuel Dela Pena 2023</p>
                <Spacer />
                <HStack gap={4} fontSize={{ sm: 10, lg: 20 }}>
                    <Link
                        href="https://github.com/BulletOnli"
                        target="_blank"
                        className="hover:text-[#00CCCC]"
                    >
                        <BsGithub />
                    </Link>
                    <Link
                        href="https://www.tiktok.com/@bulletonli"
                        target="_blank"
                        className="hover:text-[#00CCCC]"
                    >
                        <FaTiktok />
                    </Link>
                    <Link
                        href="https://www.instagram.com/gem.muel/"
                        target="_blank"
                        className="hover:text-[#00CCCC]"
                    >
                        <BsInstagram />
                    </Link>
                </HStack>
            </footer>
        </div>
    );
};

export default LoginPage;
