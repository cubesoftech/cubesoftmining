import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import tether from "@/assets/tether.png";

function Withdraw() {
  return (
    <Flex
      bg={"gray.50"}
      padding={5}
      borderRadius={"10px"}
      boxShadow={"2xl"}
      w={"100%"}
      justifyContent={"space-between"}
    >
      <VStack w={"100%"} spacing={2} alignItems={"center"} align="stretch">
        <Text lineHeight={"5"} fontWeight={"bold"} fontSize={"xs"}>
          Withdraw
        </Text>
        <Text
          fontSize={"2xs"}
          textAlign={"center"}
          color={"gray.500"}
          fontWeight={"bold"}
        >
          Your withdrawal will be issued to the USDT wallet address within 24
          hours
        </Text>
        <HStack w={"100%"} justifyContent={"center"}>
          <InputGroup>
            <Input placeholder="Withdrawable 0" />
            <InputRightAddon>
              <Image src={tether} alt="tether" width={20} height={20} />
            </InputRightAddon>
          </InputGroup>
        </HStack>
        <Button w={"100%"} colorScheme="linkedin">
          Confirm
        </Button>
      </VStack>
    </Flex>
  );
}

export default Withdraw;
