import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
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

const TableData = () => {
  const data = [
    {
      amount: "1000USDT-5000USDT",
      dailyReturnRate: "0.9%~1.1%",
    },
    {
      amount: "5000USDT-10000USDT",
      dailyReturnRate: "1.1%~1.3%",
    },
    {
      amount: "10000USDT-20000USDT",
      dailyReturnRate: "1.3%~1.5%",
    },
    {
      amount: "20000USDT-50000USDT",
      dailyReturnRate: "1.5%~1.9%",
    },
    {
      amount: "50000USDT-100000USDT",
      dailyReturnRate: "1.9%~2.4%",
    },
    {
      amount: "100000USDT-500000USDT",
      dailyReturnRate: "2.4%~3%",
    },
    {
      amount: ">500000USDT",
      dailyReturnRate: "3%~4%",
    },
  ];
  return (
    <TableContainer marginTop={2} borderWidth={1}>
      <Table size={"sm"} variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={"2xs"}>Amount</Th>
            <Th fontSize={"2xs"}>Daily Return Rate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td fontSize={"2xs"}>{item.amount}</Td>
              <Td fontSize={"2xs"}>{item.dailyReturnRate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const helpCenterFAQ = [
  {
    question: "How do I need to join?",
    answer:
      "Participating in non-destructive and non-guaranteed liquidity mining requires an gas fee to receive replacement coupons, and the wallet address only needs to be claimed once. After success, the mining permission is automatically turned on. ",
  },
  {
    question: "How to withdraw cash? ",
    answer:
      "You can initiate a withdrawal of USDT that is produced daily. USDT withdrawals are automatically sent to the wallet address you add to the node, other addresses are not supported.",
  },
  {
    question: "How to calculate the income?",
    answer:
      "When you join successfully, the smart contract starts to calculate your address through the node, and starts to calculate the income. Once the smart contract is successfully bound, the income is calculated by the daily interest, and the daily income is calculated by the node. The benefits vary depending on the size of the economy. Generate mining computing power based on wallet USDT balance.",
    additional: <TableData />,
  },
  {
    question: "Risk Warning",
    answer: `When you create a Wallet account, you will be prompted to back up 12 words, which are your account mnemonics, which are equivalent to your "private key". 
Whoever has these 12 words has coins in his account. 
These 12 words are yours to keep, you can't get them back if you lose them. 
What do I need to know about Custody Code? 
It's best to just copy the mnemonics onto paper or other cold medium (such as the Ice Armor board) to copy them correctly and clearly. 
Keep it in a very safe place in your home. 
Do not store passwords through cell phone photos, computer software, email, websites, collections, or other media. 
Do not wipe Wallet data, factory reset, uninstall Wallet or format your phone to install Wallet, be careful if you have coins in your Wallet account! 
Don't reveal your booster to anyone and don't expose your booster on any online media! 
Do not deposit coins into exposed accounts! 
Anyone asking for your mnemonic phrase is a liar! 
serious! 
If you lose your tokens, if you back up the wrong password, if you uninstall your wallet by mistake, or if you lose your phone with wallet installed, you will not be able to delete your wallet from your wallet 
Get your coins back. 
 wallets are irreversible and anonymous, so once transferred, the chance of getting it back is almost zero`,
  },
  {
    question: "About Cube Soft Mining",
    answer: `Cube Soft Mining ​​was jointly launched by the Ethereum Foundation and Tether to solve the problem of ERC chain node congestion and expensive gas fees, and encourage more people to own USDT. We are a Defi project that automatically distributes rewards to liquidity providers through smart contracts. `,
  },
];

function HelpCenter() {
  return (
    <VStack spacing={2} align="stretch">
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        Help Center
      </Text>
      <FAQ />
    </VStack>
  );
}

function FAQ() {
  return (
    <Accordion allowToggle>
      {helpCenterFAQ.map((faq, index) => (
        <AccordionItem key={index}>
          <AccordionButton>
            <Box fontSize={"xs"} as="span" flex="1" textAlign="left">
              {faq.question}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel
            color={"gray.500"}
            textAlign={"center"}
            fontSize={"xs"}
            pb={4}
          >
            {faq.answer}
            {faq.additional ? faq.additional : null}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
export default HelpCenter;
