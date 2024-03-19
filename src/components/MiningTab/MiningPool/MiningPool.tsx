import { VStack } from "@chakra-ui/react";
import React from "react";
import DataPool from "./DataPool";
import Mining from "./Mining";
import HelpCenter from "./HelpCenter";
import RegulatoryAuthority from "./RegulatoryAuthority";
import Partner from "./Partner";

function MiningPool() {
  return (
    <VStack paddingBottom={20} w={"100%"} spacing={4} align="stretch">
      <DataPool />
      <Mining />
      <HelpCenter />
      <RegulatoryAuthority />
      <Partner />
    </VStack>
  );
}

export default MiningPool;
