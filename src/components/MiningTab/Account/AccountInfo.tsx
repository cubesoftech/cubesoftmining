import { environment } from "@/utils";
import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import Lottie from "lottie-react";
import animationData from "../../../assets/animation.json";
import { useAccountStore } from "@/utils/accountStorage";
import { withdrawals } from "@prisma/client";
import { FormattedMessage } from "react-intl";

function AccountInfo() {
  const { address } = useAccount();

  const { setAccountData } = useAccountStore();

  const [approveBalance, setApproveBalance] = useState(0);

  const [accumulatedIncome, setAccumulatedIncome] = useState(0);

  const [withdrawals, setWithdrawals] = useState<withdrawals[]>([]);

  const [hash, setHash] = useState(0);

  const { data: symbol } = useContractRead({
    address: environment.token_address,
    abi: erc20ABI,
    functionName: "symbol",
  });

  const getAccountData = async () => {
    fetch("/api/getAccountData", {
      method: "POST",
      body: JSON.stringify({ address, symbol }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data, "data");
        setApproveBalance(parseFloat(data.balance));
        setAccumulatedIncome(parseFloat(data.accumulated));
        setHash(parseFloat(data.hash));
        setAccountData({ lockDate: data.lock });
      })
      .catch((err) => {
        console.log(err, "err");
        setAccumulatedIncome(0);
        setApproveBalance(0);
        setHash(0);
      });
  };

  useEffect(() => {
    setInterval(() => {
      getAccountData();
    }, 10000);
  }, []);
  return (
    <Flex
      bg={"gray.50"}
      padding={5}
      borderRadius={"10px"}
      boxShadow={"2xl"}
      w={"100%"}
      direction={"column"}
      justifyContent={"space-between"}
    >
      {address && (
        <HStack
          w={"100%"}
          spacing={2}
          justifyContent={"center"}
          align="stretch"
          alignItems={"center"}
        >
          <Text lineHeight={"5"} fontSize={"2xs"}>
            <FormattedMessage id="Address" />:
          </Text>
          <Text fontSize={"2xs"} fontWeight={"bold"}>
            {address}
          </Text>
        </HStack>
      )}
      {address && (
        <HStack
          w={"100%"}
          spacing={2}
          justifyContent={"center"}
          align="stretch"
          alignItems={"center"}
        >
          <Text lineHeight={"5"} fontSize={"2xs"}>
            Current Hash Rate :
          </Text>
          <Text fontSize={"2xs"} fontWeight={"bold"}>
            {hash} GH/s
          </Text>
        </HStack>
      )}

      <HStack
        w={"100%"}
        spacing={2}
        mt={5}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <VStack w={"40%"} spacing={2} alignItems={"center"} align="stretch">
          <Text lineHeight={"5"} fontSize={"xs"}>
            <FormattedMessage id="Accumulated Income" />
          </Text>
          <HStack alignItems={"center"} justifyContent={"center"}>
            {address && (
              <Lottie
                style={{ width: "35px", height: "35px" }}
                animationData={animationData}
                loop={true}
              />
            )}

            <Text fontSize={"xs"} color={"blue.500"} fontWeight={"bold"}>
              {address ? accumulatedIncome.toFixed(5) : 0} USDT
            </Text>
          </HStack>
        </VStack>
        <VStack w={"40%"} spacing={2} alignItems={"center"} align="stretch">
          <Text lineHeight={"5"} fontSize={"xs"}>
            <FormattedMessage id="Approve Balance" />
          </Text>
          <Text fontSize={"xs"} color={"blue.500"} fontWeight={"bold"}>
            {address ? approveBalance : 0} USDT
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default AccountInfo;
