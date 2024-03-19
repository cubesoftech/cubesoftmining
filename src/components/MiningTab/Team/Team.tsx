import { VStack } from "@chakra-ui/react";
import React from "react";
import TeamInfo from "./TeamInfo";
import ShareLink from "./ShareLink";

function Team() {
  return (
    <VStack
      paddingBottom={20}
      w={"100%"}
      paddingTop={1}
      spacing={10}
      align="stretch"
    >
      <TeamInfo />
      <ShareLink />
    </VStack>
  );
}

export default Team;
