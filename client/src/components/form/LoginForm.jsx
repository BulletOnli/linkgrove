"use client";
import {
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useToast,
    FormHelperText,
    FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";
import { loginUser } from "@/src/api/fetcher";

const LoginForm = () => {
    const toast = useToast();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await loginUser("/auth/login", { username, password });
            setIsLoading(false);
            toast({
                title: "Login Success!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 3000,
            });
            router.push(`/${username}`);
        } catch (error) {
            setIsLoading(false);
            toast({
                title: `Oops! ${error.response.data.error.message}.`,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    return (
        <div className="w-[28rem] bg-[#23232E] flex flex-col items-center p-4 lg:p-8 rounded-xl m-4">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <FormControl as="form" onSubmit={handleSubmit}>
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
                        _hover={false}
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
                        _hover={false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <Button
                    type="submit"
                    w="full"
                    colorScheme="teal"
                    mt={3}
                    isLoading={isLoading}
                    spinnerPlacement="start"
                >
                    Login
                </Button>
            </FormControl>
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
