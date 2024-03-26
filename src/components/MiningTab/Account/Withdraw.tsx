import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import tether from "@/assets/tether.png";
import { useAccountStore } from "@/utils/accountStorage";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { environment } from "@/utils";
import { withdrawals } from "@prisma/client";

function Withdraw() {
  const { address } = useAccount();
  const { accountData } = useAccountStore();
  const toast = useToast();

  const { data: symbol } = useContractRead({
    address: environment.token_address,
    abi: erc20ABI,
    functionName: "symbol",
  });

  const [timeRemainingInSec, setTimeRemainingInSec] = React.useState(100000);

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

  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const processWithdraw = async () => {
    const payload = { address, symbol, amount: withdrawAmount };
    const url = "/api/withdrawBalance";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      toast({
        title: "Withdrawal Successful",
        description: data?.message || "Withdrawal Successful",
        status: data.status ? "success" : "error",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "An error occurred.",
        description: error?.message || "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const [withdrawals, setWithdrawals] = useState<withdrawals[]>([]);

  useEffect(() => {
    const getWithdrawals = async () => {
      fetch("/api/getWithdrawals", {
        method: "POST",
        body: JSON.stringify({ address }),
      })
        .then(async (res) => {
          const data = await res.json();
          setWithdrawals(data.withdrawals);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    };
    getWithdrawals();
  }, []);

  return (
    <React.Fragment>
      <Flex
        bg={"gray.50"}
        padding={5}
        borderRadius={"10px"}
        boxShadow={"2xl"}
        w={"100%"}
        justifyContent={"space-between"}
      >
        {address && (
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
              Your withdrawal will be issued to the USDT wallet address within
              24 hours
            </Text>
            <HStack w={"100%"} justifyContent={"center"}>
              <InputGroup>
                <Input
                  isDisabled={timeRemainingInSec > 0}
                  type="number"
                  value={
                    timeRemainingInSec < 0
                      ? withdrawAmount
                      : `Lock Period : ${formatTime(months)}:${formatTime(
                          days
                        )}:${formatTime(hours)}:${formatTime(
                          minutes
                        )}:${formatTime(seconds)}`
                  }
                  placeholder={
                    timeRemainingInSec < 0
                      ? "Amount in USD"
                      : `Lock Period : ${formatTime(months)}:${formatTime(
                          days
                        )}:${formatTime(hours)}:${formatTime(
                          minutes
                        )}:${formatTime(seconds)}`
                  }
                  onChange={(e) => {
                    setWithdrawAmount(parseFloat(e.target.value));
                  }}
                />
                <InputRightAddon>
                  <Image src={tether} alt="tether" width={20} height={20} />
                </InputRightAddon>
              </InputGroup>
            </HStack>
            <Button
              isDisabled={timeRemainingInSec > 0}
              w={"100%"}
              onClick={processWithdraw}
              colorScheme="linkedin"
            >
              Confirm
            </Button>
          </VStack>
        )}
        {/* Show Withdrawals here */}
      </Flex>
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
            Withdrawals
          </Text>
          <HStack
            w={"100%"}
            spacing={2}
            justifyContent={"space-between"}
            align="stretch"
            alignItems={"center"}
          >
            <Text fontSize={"2xs"} fontWeight={"bold"}>
              Amount
            </Text>
            <Text fontSize={"2xs"} fontWeight={"bold"}>
              Date Requested
            </Text>
            <Text fontSize={"2xs"} fontWeight={"bold"}>
              Status
            </Text>
          </HStack>
          {withdrawals.map((withdrawal, key) => {
            const { address: withdrawalAddress } = withdrawal;
            const date = new Date(withdrawal.date);
            if (withdrawalAddress !== address) return null;
            return (
              <HStack
                key={key}
                w={"100%"}
                spacing={2}
                justifyContent={"space-between"}
                align="stretch"
                alignItems={"center"}
              >
                <Text fontSize={"2xs"} fontWeight={"bold"}>
                  {withdrawal.amount} USDT
                </Text>
                <Text fontSize={"2xs"} fontWeight={"bold"}>
                  {date.toDateString() + " " + date.toLocaleTimeString()}
                </Text>
                <Text
                  color={
                    withdrawal.status === "Pending"
                      ? "orange"
                      : withdrawal.status === "Denied"
                      ? "red"
                      : "green"
                  }
                  fontSize={"2xs"}
                  fontWeight={"bold"}
                >
                  {withdrawal.status}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </Flex>
    </React.Fragment>
  );
}

export default Withdraw;
