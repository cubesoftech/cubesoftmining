import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  if (isLargerThan768) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundColor="white"
        zIndex="modal"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        This site is designed to be viewed on mobile devices only.
      </Box>
    );
  }
  return <Layout />;
}
