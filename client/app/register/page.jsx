"use client";
import LoginForm from "../components/form/LoginForm";
import { HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import RegisterForm from "../components/form/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="relative w-full flex flex-col justify-center items-center">
            <div className="absolute top-0 w-[70vw] flex items-center justify-between p-6">
                <Link
                    href="/"
                    className="text-3xl text-[#00CCCC] font-extrabold tracking-wider"
                >
                    WebLinks
                </Link>
                <div></div>
            </div>

            <div className="w-full h-screen flex justify-center items-center">
                <RegisterForm />
            </div>

            <footer className="w-[70vw] flex p-6">
                <p>© 2023 Gemmuel Dela Pena </p>
                <Spacer />
                <HStack gap={4} fontSize={20}>
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

export default RegisterPage;
