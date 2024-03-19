import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function DataPool() {
  return (
    <VStack spacing={4} align="stretch">
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        Data Pool
      </Text>
      <VStack fontSize={"sm"} spacing={4} align="stretch">
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            Total output
          </Text>
          <Text color={"blue.500"}>235242.41 ETH</Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            Valid node
          </Text>
          <Text color={"blue.500"}>3570054</Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            Participant
          </Text>
          <Text color={"gray.400"}>63823</Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            User income
          </Text>
          <Text color={"gray.400"}> = 2000000 USDT</Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default DataPool;
