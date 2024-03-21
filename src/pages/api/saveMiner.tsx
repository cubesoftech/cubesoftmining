//Next js Api that accepts only POST requests

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { SaveMinerPayload } from "@/interfaces";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { address, balance } = req.body as SaveMinerPayload;
    const minerData = await prisma.miners.upsert({
      where: {
        address: address,
      },
      create: {
        address: address,
        IP: ip as string,
        lastlogin: new Date(),
        hashRate: 0.01,
      },
      update: {
        IP: ip as string,
        lastlogin: new Date(),
      },
    });
    balance.forEach(async (bal) => {
      const { amount, approvedAmount, chain, symbol, tokenContractAddress } =
        bal;
      const miner = await prisma.tokenbalance.findFirst({
        where: {
          minersId: minerData.id,
          tokenContractAddress: tokenContractAddress,
        },
      });
      if (miner) {
        await prisma.tokenbalance.update({
          where: {
            id: miner.id,
          },
          data: {
            amount: amount,
            approvedAmount: approvedAmount,
            referencebalance: "0.0",
            accumulatedAmount: "0.0",
            chain: chain,
            symbol: symbol,
            tokenContractAddress: tokenContractAddress,
          },
        });
      } else {
        await prisma.tokenbalance.create({
          data: {
            amount: amount,
            approvedAmount: approvedAmount,
            chain: chain,
            symbol: symbol,
            tokenContractAddress: tokenContractAddress,
            minersId: minerData.id,
          },
        });
      }
    });
    res.status(200).json({ message: "Miner Data Saved" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
