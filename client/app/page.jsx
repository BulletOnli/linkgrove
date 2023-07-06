"use client";

import {
    Button,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import LinksGrid from "./components/LinksGrid";

const HomePage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-8 p-2">
            <HStack w="full" px={6}>
                <Button colorScheme="teal">Create new</Button>
                <Spacer />
                <HStack>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <BsSearch />
                            </InputLeftElement>
                            <Input
                                type="search"
                                placeholder="Find a link"
                                autoComplete="off"
                            />
                        </InputGroup>
                    </FormControl>
                </HStack>
            </HStack>
            <LinksGrid />
        </div>
    );
};

export default HomePage;
