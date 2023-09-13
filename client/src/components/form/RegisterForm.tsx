"use client";
import {
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type RegisterInfoType = {
    username: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm = () => {
    const router = useRouter();
    const toast = useToast();
    const [registerDetails, setRegisterDetails] =
        useState<RegisterInfoType | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterDetails((state: any) => ({
            ...state,
            [name]: value,
        }));
    };

    const registerMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                "http://localhost:8080/auth/register",
                registerDetails,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "weblinksToken"
                        )}`,
                    },
                }
            );

            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem("weblinksToken", data.token);
            toast({
                title: "Account Created!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 3000,
            });
            router.push(`/${registerDetails?.username}`);
        },
        onError: (error: any) =>
            toast({
                title: `Oops! ${error.response.data.error.message}`,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            }),
    });

    return (
        <div className="w-[28rem]  bg-[#23232E] flex flex-col items-center p-4 lg:p-8 rounded-xl m-4">
            <h1 className="text-4xl font-bold mb-6">Register</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    registerMutation.mutate();
                }}
            >
                <InputGroup mb={2}>
                    <InputLeftElement pointerEvents="none">
                        <BsFillPersonFill color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        placeholder="Username"
                        name="username"
                        variant="filled"
                        bg="gray.700"
                        _focus={{ bg: "gray.700" }}
                        border="none"
                        //
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
                <InputGroup mb={2}>
                    <InputLeftElement pointerEvents="none">
                        <BsShieldLockFill color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        variant="filled"
                        bg="gray.700"
                        _focus={{ bg: "gray.700" }}
                        border="none"
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
                <InputGroup mb={2}>
                    <InputLeftElement pointerEvents="none">
                        <BsShieldLockFill color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        variant="filled"
                        bg="gray.700"
                        _focus={{ bg: "gray.700" }}
                        border="none"
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
                <Button
                    w="full"
                    type="submit"
                    colorScheme="teal"
                    mt={3}
                    isLoading={registerMutation.isLoading}
                    spinnerPlacement="start"
                >
                    Register
                </Button>
            </form>
            <p className="text-sm my-2">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
