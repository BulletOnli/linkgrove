"use client";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Profile from "./components/Profile";

const App = ({ children }) => {
    return (
        <ChakraProvider>
            <div className="w-full h-[100rem] text-white flex flex-col bg-[#000000]">
                <Header />
                <div className="w-full h-full flex">
                    <Profile />
                    <div className="w-full p-4">{children}</div>
                </div>
            </div>
        </ChakraProvider>
    );
};

export default App;
