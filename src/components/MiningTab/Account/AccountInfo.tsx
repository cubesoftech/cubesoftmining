import { Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

function AccountInfo() {
  return (
    <Flex
      bg={"gray.50"}
      padding={5}
      borderRadius={"10px"}
      boxShadow={"2xl"}
      w={"100%"}
      justifyContent={"space-between"}
    >
      <VStack w={"40%"} spacing={2} alignItems={"center"} align="stretch">
        <Text lineHeight={"5"} fontSize={"xs"}>
          Cumulative Income
        </Text>
        <Text fontSize={"xs"} color={"blue.500"} fontWeight={"bold"}>
          0 USDT
        </Text>
      </VStack>
      <VStack w={"40%"} spacing={2} alignItems={"center"} align="stretch">
        <Text lineHeight={"5"} fontSize={"xs"}>
          Pending Balance
        </Text>
        <Text fontSize={"xs"} color={"blue.500"} fontWeight={"bold"}>
          0 USDT
        </Text>
      </VStack>
    </Flex>
  );
}

export default AccountInfo;
