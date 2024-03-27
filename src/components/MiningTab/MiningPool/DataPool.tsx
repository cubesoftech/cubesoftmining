import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

function DataPool() {
  const [ethPrice, setethPrice] = useState(0);
  const [usdtPrice, setusdtPrice] = useState(0);
  const [eth, seteth] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT"
        );
        const { price } = await response.json();
        setethPrice(parseInt(price));
        await fetch("/api/updateToken").then(async (res) => {
          await fetch("/api/siteBalance").then(async (res) => {
            const data = await res.json();
            const { balance, totalUser } = data;
            seteth(balance);
          });
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
    setInterval(() => {
      fetchData();
    }, 10000);
  }, []);
  return (
    <VStack spacing={4} align="stretch">
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        <FormattedMessage id={"Data Pool"} />
      </Text>
      <VStack fontSize={"sm"} spacing={4} align="stretch">
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            <FormattedMessage id={"Total output"} />
          </Text>
          <Text color={"blue.500"}>{eth.toFixed(2)} ETH</Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            <FormattedMessage id={"Valid node"} />
          </Text>
          <Text color={"blue.500"}>3570054</Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            <FormattedMessage id="Participant" />
          </Text>
          <Text color={"gray.400"}>63823</Text>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text color={"gray.400"} fontWeight={"bold"}>
            <FormattedMessage id="User Income" />
          </Text>
          <Text color={"gray.400"}> = {(eth * ethPrice).toFixed(2)} USDT</Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default DataPool;
