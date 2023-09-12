"use client";
import {
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/fetcher";

const RegisterForm = () => {
    const router = useRouter();
    const toast = useToast();
    const [registerDetails, setRegisterDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterDetails((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await registerUser("/auth/register", registerDetails);
            setIsLoading(false);
            toast({
                title: "Account Created!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 3000,
            });
            router.push(`/${registerDetails.username}`);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast({
                title: `Oops! ${error.response.data.error.message}`,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    };

    return (
        <div className="w-[28rem]  bg-[#23232E] flex flex-col items-center p-4 lg:p-8 rounded-xl m-4">
            <h1 className="text-4xl font-bold mb-6">Register</h1>
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
                        _hover={false}
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
                        _hover={false}
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
                        _hover={false}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
                <Button
                    w="full"
                    type="submit"
                    colorScheme="teal"
                    mt={3}
                    isLoading={isLoading}
                    spinnerPlacement="start"
                >
                    Register
                </Button>
            </FormControl>
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
