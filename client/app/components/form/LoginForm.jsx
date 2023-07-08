"use client";
import {
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";

const LoginForm = () => {
    return (
        <div className="w-[28rem]  bg-[#23232E] flex flex-col items-center p-8 rounded-xl">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <FormControl as="form">
                <InputGroup mb={2}>
                    <InputLeftElement pointerEvents="none">
                        <BsFillPersonFill color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        placeholder="Username"
                        variant="filled"
                        bg="gray.700"
                        _focus={{ bg: "gray.700" }}
                        border="none"
                        _hover={false}
                        autoComplete="off"
                    />
                </InputGroup>
                <InputGroup mb={2}>
                    <InputLeftElement pointerEvents="none">
                        <BsShieldLockFill color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="password"
                        placeholder="Password"
                        variant="filled"
                        bg="gray.700"
                        _focus={{ bg: "gray.700" }}
                        border="none"
                        _hover={false}
                    />
                </InputGroup>
                <Button w="full" colorScheme="teal" mt={3}>
                    Login
                </Button>
            </FormControl>
            <p className="text-sm my-2">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-500">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
