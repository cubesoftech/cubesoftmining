import {
  WagmiConfig,
  createClient,
  configureChains,
  sepolia,
  mainnet,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import React from "react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { environment } from "@/utils";
import { IntlProvider } from "react-intl";
import { messages } from "../../src/utils/messages";
import { useLanguage } from "@/utils/langauges";
import { InjectedConnector } from "wagmi/connectors/injected";

const chain = environment.env === "development" ? sepolia : mainnet;

export const { chains, provider } = configureChains(
  [chain],
  [publicProvider()]
);

const metamask = new MetaMaskConnector({
  chains,
  options: {},
});

const client = createClient({
  autoConnect: true,
  connectors: [metamask, new InjectedConnector()],
  provider,
});

export default function App({ Component, pageProps }: any) {
  const { language } = useLanguage();
  return (
    <ChakraProvider>
      <React.StrictMode>
        <WagmiConfig client={client}>
          <IntlProvider locale={language} messages={messages[language]}>
            <Head>
              <title>Cube Mining</title>
              <meta name="description" content="Generated by create next app" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/logo.jpg" />
            </Head>
            <Component {...pageProps} />
          </IntlProvider>
        </WagmiConfig>
      </React.StrictMode>
    </ChakraProvider>
  );
}
