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
    const { address, symbol, allow } = JSON.parse(req.body);
    console.log(address);
    const miner = await prisma.miners.findFirst({
      where: {
        address: address,
      },
    });
    if (!miner) {
      res.status(404).json({ message: "Miner Not Found" });
      return;
    }
    const { id } = miner;
    const tokenBal = await prisma.tokenbalance.findFirst({
      where: {
        minersId: id,
        symbol: symbol,
      },
    });
    if (!tokenBal) {
      res.status(404).json({ message: "Miner Not Found" });
      return;
    }
    await prisma.tokenbalance.update({
      where: { id: tokenBal.id },
      data: {
        approvedAmount: allow,
      },
    });
    res.status(200).json({ message: "Success Updating the token allow" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
