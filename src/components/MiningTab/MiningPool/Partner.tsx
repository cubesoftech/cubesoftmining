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
import { FormattedMessage } from "react-intl";

function LogoAuthority({ image }: { image: StaticImageData }) {
  return <Image src={image} alt="authority" width={100} height={100} />;
}

function Partner() {
  const partnerLogos = [coinbase, bybit, fairyproof, okx, metasmask, trust];
  return (
    <VStack spacing={2} align="stretch">
      <Text mt={5} textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        <FormattedMessage id="Partner" />
      </Text>
      <SimpleGrid columns={3} spacing={5} justifyContent={"center"}>
        {partnerLogos.map((logo, index) => (
          <LogoAuthority key={index} image={logo} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default Partner;
