import {
  Button,
  Code,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useAccount } from "wagmi";
import { FaCopy } from "react-icons/fa";

function ShareLink() {
  const { address } = useAccount();
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
        <Text
          textAlign={"left"}
          lineHeight={"5"}
          w={"100%"}
          fontWeight={"bold"}
          fontSize={"xs"}
        >
          My Share Link
        </Text>

        <HStack w={"100%"} justifyContent={"center"}>
          <Code
            textAlign={"center"}
            fontSize={"2xs"}
            variant={"solid"}
            colorScheme="gray"
          >
            {`${location.href}${address?.slice(2, 30)}`}
          </Code>
          <Button
            leftIcon={<FaCopy />}
            size={"xs"}
            variant={"outline"}
            colorScheme="linkedin"
          >
            Copy
          </Button>
        </HStack>

        <Text fontSize={"2xs"} color={"gray"}>
          Share your invitation link. When friends join the node through your
          link, they can get generous token rewards. For details of the event,
          please consult online customer service
        </Text>
      </VStack>
    </Flex>
  );
}

export default ShareLink;
