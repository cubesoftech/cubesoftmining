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
import React, { useEffect, useState } from "react";
import tether from "@/assets/tether.png";
import { useAccountStore } from "@/utils/accountStorage";

function Withdraw() {
  const { accountData } = useAccountStore();

  const [timeRemainingInSec, setTimeRemainingInSec] = React.useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const lockDate = new Date(accountData.lockDate);
      const diff = lockDate.getTime() - now.getTime();
      const diffInSec = Math.floor(diff / 1000);
      setTimeRemainingInSec(diffInSec);
    }, 1000);
    return () => clearInterval(interval);
  }, [accountData.lockDate]);

  const seconds = Math.floor(timeRemainingInSec % 60);
  const minutes = Math.floor((timeRemainingInSec / 60) % 60);
  const hours = Math.floor((timeRemainingInSec / (60 * 60)) % 24);
  const days = Math.floor((timeRemainingInSec / (60 * 60 * 24)) % 30);
  const months = Math.floor(timeRemainingInSec / (60 * 60 * 24 * 30));

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

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
            <Input
              isDisabled={timeRemainingInSec > 0}
              placeholder={
                timeRemainingInSec < 0
                  ? "Amount in USD"
                  : `Lock Period : ${formatTime(months)}:${formatTime(
                      days
                    )}:${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
                      seconds
                    )}`
              }
            />
            <InputRightAddon>
              <Image src={tether} alt="tether" width={20} height={20} />
            </InputRightAddon>
          </InputGroup>
        </HStack>
        <Button
          isDisabled={timeRemainingInSec > 0}
          w={"100%"}
          colorScheme="linkedin"
        >
          Confirm
        </Button>
      </VStack>
    </Flex>
  );
}

export default Withdraw;
