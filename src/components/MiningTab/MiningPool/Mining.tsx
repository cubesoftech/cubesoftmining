import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { use, useEffect, useRef, useState } from "react";
import { walletsEth } from "@/utils";
import { FormattedMessage } from "react-intl";

function Mining() {
  const [wallets, setWallets] = useState<
    Array<{
      address: string;
      amount: string;
    }>
  >([]);

  useEffect(() => {
    const wallets = generateRandomETHWallet();
    setWallets(wallets);
  }, []);

  const generateRandomETHWallet = () => {
    let walletsEthers = walletsEth.map((wallet) => {
      //censored the address
      const censoredAddress =
        wallet.address.slice(0, 5) + "********" + wallet.address.slice(-5);
      return {
        address: censoredAddress,
        amount: `${(Math.random() * 1000).toLocaleString()} USDT`,
      };
    });
    walletsEthers = [...walletsEthers, ...walletsEthers];
    //randomize the wallets
    return walletsEthers;
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          // Reset scrollTop to 0 when scroll position is at the bottom
          scrollRef.current.scrollTop = 0;
        } else {
          scrollRef.current.scrollTop += 1;
        }
      }
    }, 100); // Adjust this to control the speed of the scrolling

    return () => clearInterval(interval);
  }, []);
  return (
    <VStack spacing={0} align="stretch">
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        <FormattedMessage id="User Transactions" />
      </Text>
      <VStack fontSize={"sm"} spacing={1} align="stretch">
        <HStack m={2} w={"100%"} justifyContent={"space-between"}>
          <HStack w={"30%"} justifyContent={"center"}>
            <Text w={"100%"} color={"gray.700"} fontWeight={"bold"}>
              <FormattedMessage id="Address" />
            </Text>
          </HStack>

          <HStack w={"30%"} justifyContent={"center"}>
            <Text color={"gray.700"} fontWeight={"bold"}>
              <FormattedMessage id="Amount" />
            </Text>
          </HStack>
        </HStack>

        <VStack
          ref={scrollRef}
          overflowY={"hidden"} // Change this line
          w={"100%"}
          height={"200px"}
          p={2}
          justifyContent={"space-between"}
          border={"1px solid"}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {wallets.map((wallet, index) => (
            <HStack key={index} w={"100%"} justifyContent={"space-between"}>
              <HStack w={"70%"} justifyContent={"flex-start"}>
                <Text fontSize={"sm"} color={"blue.300"}>
                  {wallet.address}
                </Text>
              </HStack>
              <HStack w={"30%"} justifyContent={"flex-end"}>
                <Text fontSize={"sm"} color={"black"}>
                  {wallet.amount}
                </Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}

export default Mining;
