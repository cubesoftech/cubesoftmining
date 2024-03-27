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
import { FormattedMessage } from "react-intl";

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
    question: <FormattedMessage id="1" />,
    answer: <FormattedMessage id="How do I need to join?" />,
  },
  {
    question: <FormattedMessage id="2" />,
    answer: <FormattedMessage id={"How to withdraw cash?"} />,
  },
  {
    question: <FormattedMessage id="3" />,
    answer: <FormattedMessage id={"How to calculate the income?"} />,
    additional: <TableData />,
  },
  {
    question: <FormattedMessage id="4" />,
    answer: <FormattedMessage id={"Risk Warning"} />,
  },
  {
    question: <FormattedMessage id="5" />,
    answer: <FormattedMessage id={"About Soft Mining"} />,
  },
];

function HelpCenter() {
  return (
    <VStack spacing={2} align="stretch">
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        <FormattedMessage id="Help Center" />
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
