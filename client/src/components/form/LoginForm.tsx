"use client";
import {
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/src/api/userApi";

const LoginForm = () => {
    const toast = useToast();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                `${API_URL}/auth/login`,
                { username, password },
                {
                    withCredentials: true,
                }
            );

            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem("weblinksToken", data.token);
            toast({
                title: "Login Success!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 3000,
            });
            router.push(`/${username}`);
        },
        onError: (error: any) => {
            toast({
                title: `Oops! ${error.response.data.error.message}.`,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        },
    });

    return (
        <div className="w-[28rem] bg-[#23232E] flex flex-col items-center p-4 lg:p-8 rounded-xl m-4">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    loginMutation.mutate();
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
                        required
                        _hover={{}}
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        required
                        _hover={{}}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <Button
                    type="submit"
                    w="full"
                    colorScheme="teal"
                    mt={3}
                    isLoading={loginMutation.isLoading}
                    spinnerPlacement="start"
                >
                    Login
                </Button>
            </form>
            <p className="text-sm my-2">
                Dont have an account?{" "}
                <Link href="/register" className="text-blue-500">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
