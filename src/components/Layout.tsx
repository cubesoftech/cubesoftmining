import { VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import MiningTab from "./MiningTab";

function Layout() {
  return (
    <VStack minH={"100vh"} spacing={0} align="stretch">
      <Header />
      <Hero />
      <MiningTab />
    </VStack>
  );
}

export default Layout;
