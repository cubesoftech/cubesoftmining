import {
  Tabs,
  TabList,
  Tab,
  Flex,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import MiningPool from "./MiningTab/MiningPool/MiningPool";
import Account from "./MiningTab/Account/Account";
import TeamInfo from "./MiningTab/Team/TeamInfo";
import Team from "./MiningTab/Team/Team";

function MiningTab() {
  return (
    <Flex bg={"white"} w={"100%"}>
      <Tabs m={1} isFitted w={"100%"}>
        <TabList>
          <Tab>Mining Pool</Tab>
          <Tab>Account</Tab>
          <Tab>Team</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MiningPool />
          </TabPanel>
          <TabPanel>
            <Account />
          </TabPanel>
          <TabPanel>
            <Team />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default MiningTab;
