import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function TeamInfo() {
  return (
    <Flex
      bg={"gray.50"}
      padding={5}
      borderRadius={"10px"}
      boxShadow={"2xl"}
      w={"100%"}
      justifyContent={"space-between"}
    >
      <VStack w={"100%"} spacing={4} alignItems={"center"} align="stretch">
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text lineHeight={"5"} fontSize={"xs"}>
            Total Promotion Reward
          </Text>
          <Text fontSize={"xs"} color={"blue.500"} fontWeight={"bold"}>
            0 USDT
          </Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text lineHeight={"5"} fontSize={"xs"}>
            Number of People Invited
          </Text>
          <Text fontSize={"xs"} color={"blue.500"} fontWeight={"bold"}>
            0
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default TeamInfo;
