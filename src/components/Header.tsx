import {
  Button,
  Flex,
  HStack,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import {
  ResourceUnavailableError,
  useAccount,
  useBalance,
  useConnect,
  useContractWrite,
  useDisconnect,
  useNetwork,
  usePrepareContractWrite,
  useToken,
} from "wagmi";
import { erc20ABI } from "wagmi";
import { languages } from "../utils";
import { ethers } from "ethers";
import { chains } from "@/pages/_app";
import { environment } from "@/utils";
import { SaveMinerPayload } from "@/interfaces";
import { useLanguage } from "@/utils/langauges";
import { FormattedMessage } from "react-intl";

function Header() {
  const toast = useToast({
    containerStyle: {
      height: 10,
      width: 10,
      fontSize: "sm",
      bgSize: "",
    },
    position: "top-right",
    size: "10px",
  });

  const { isConnected, address } = useAccount();

  const { data: accountBalance } = useBalance({
    address: address,
    token: environment.token_address,
  });

  const { disconnectAsync, disconnect } = useDisconnect();

  const handleSaveMiner = async (chainId: number) => {
    const payload: SaveMinerPayload = {
      address: address as string,
      balance: [
        {
          amount: accountBalance?.formatted as string,
          approvedAmount: "0",
          chain: chainId,
          symbol: accountBalance?.symbol as string,
          tokenContractAddress: environment.token_address,
        },
      ],
    };
    try {
      const req = await fetch("/api/saveMiner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const res = await req.json();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const { connectAsync, connectors, isLoading } = useConnect({
    onSuccess(data, variables, context) {
      const { unsupported } = data.chain;
      if (unsupported) {
        toast({
          title: "Unsupported Network",
          description: `Please switch to ${
            chains ? chains[0].name : "Ethereum"
          }`,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        disconnect();
      } else {
        console.log(data.chain.id, "chain id");
        handleSaveMiner(data.chain.id);
      }
    },
    onError(error, variables, context) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
  });

  const connectWallet = async () => {
    try {
      await connectAsync({ connector: connectors[0] });
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnectAsync();
    } catch (error: any) {
      if (error instanceof ResourceUnavailableError) {
        toast({
          title: error.name,
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      console.error(error);
    }
  };

  const { changeLanguage } = useLanguage();

  return (
    <VStack
      spacing={1}
      position={"sticky"}
      top={0}
      p={1}
      zIndex={100}
      bgColor={"whitesmoke"}
    >
      <HStack
        w={"100%"}
        spacing={1}
        padding={2}
        justifyContent={"space-between"}
      >
        <Select
          onChange={(e) => changeLanguage(e.target.value as any)}
          w={"25%"}
          size={"sm"}
        >
          {languages.map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </Select>
        <HStack spacing={4}>
          <Text
            noOfLines={1}
            fontSize={"md"}
            fontWeight={"bold"}
            style={{
              background:
                "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Cube Mining
          </Text>
        </HStack>
        {!isConnected && (
          <Button
            onClick={connectWallet}
            variant={"outline"}
            colorScheme="green"
            size={"sm"}
            w={"30%"}
            isLoading={isLoading}
          >
            <FormattedMessage id="Connect Wallet" />
          </Button>
        )}
      </HStack>
      {/* {isConnected && (
        <HStack
          pl={2}
          pr={2}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"row"}
        >
          <HStack>
            <Text fontSize={"3xs"} textAlign={"center"}>
              Wallet{" "}
            </Text>
            <Text fontSize={"3xs"} textAlign={"center"}>
              {address?.slice(0, 8) + "********" + address?.slice(-8)}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize={"3xs"} textAlign={"center"}>
              Balance{" "}
            </Text>
            <Text fontSize={"3xs"} textAlign={"center"}>
              {data
                ? `${parseInt(data.formatted).toLocaleString()} ${data.symbol}`
                : "0"}
            </Text>
          </HStack>
        </HStack>
      )} */}
    </VStack>
  );
}

export default Header;
