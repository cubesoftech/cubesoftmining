import { VStack } from "@chakra-ui/react";
import React from "react";
import AccountInfo from "./AccountInfo";
import Withdraw from "./Withdraw";

function Account() {
  return (
    <VStack
      paddingBottom={20}
      w={"100%"}
      paddingTop={1}
      spacing={10}
      align="stretch"
    >
      <AccountInfo />
      <Withdraw />
    </VStack>
  );
}

export default Account;
