import { environment } from "@/utils";
import { Flex, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractRead } from "wagmi";

function AccountInfo() {
  const { address } = useAccount();

  const [approveBalance, setApproveBalance] = useState(0);

  const [accumulatedIncome, setAccumulatedIncome] = useState(0);

  const { data: symbol } = useContractRead({
    address: environment.token_address,
    abi: erc20ABI,
    functionName: "symbol",
  });

  const getAccountData = async () => {
    fetch("/api/getAccountData", {
      method: "POST",
      body: JSON.stringify({ address, symbol }),
    }).then(async (res) => {
      const data = await res.json();
      console.log(data, "data");
      setApproveBalance(parseFloat(data.balance));
      setAccumulatedIncome(parseFloat(data.accumulated));
    });
  };

  useEffect(() => {
    setInterval(() => {
      getAccountData();
    }, 2000);
  }, []);
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
          {accumulatedIncome.toFixed(5)} USDT
        </Text>
      </VStack>
      <VStack w={"40%"} spacing={2} alignItems={"center"} align="stretch">
        <Text lineHeight={"5"} fontSize={"xs"}>
          Approve Balance
        </Text>
        <Text fontSize={"xs"} color={"blue.500"} fontWeight={"bold"}>
          {approveBalance} USDT
        </Text>
      </VStack>
    </Flex>
  );
}

export default AccountInfo;
