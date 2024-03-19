import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { use, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import certik from "@/assets/certik.png";
import slowmist from "@/assets/slowmist.png";
import binance from "@/assets/binance.png";
import coinbase from "@/assets/coinbase.png";
import bybit from "@/assets/bybit.png";
import fairyproof from "@/assets/fairyproof.png";
import okx from "@/assets/okx.png";
import metasmask from "@/assets/metamask.png";
import trust from "@/assets/trust.png";

function LogoAuthority({ image }: { image: StaticImageData }) {
  return <Image src={image} alt="authority" width={100} height={100} />;
}

function RegulatoryAuthority() {
  const logos = [certik, slowmist, binance];
  const partnerLogos = [coinbase, bybit, fairyproof, okx, metasmask, trust];
  return (
    <VStack spacing={2} align="stretch">
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        Regulatory Authority
      </Text>
      <HStack paddingTop={15} spacing={5} justifyContent={"center"}>
        {logos.map((logo, index) => (
          <LogoAuthority key={index} image={logo} />
        ))}
      </HStack>
    </VStack>
  );
}

export default RegulatoryAuthority;
