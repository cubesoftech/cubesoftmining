import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //post only
  if (req.method === "POST") {
    const { address, symbol } = JSON.parse(req.body);
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
    const { approvedAmount, amount } = tokenBal;
    if (parseFloat(approvedAmount) < parseFloat(amount)) {
      //return the approved amount
      res
        .status(200)
        .json({
          balance: approvedAmount,
          accumulated: tokenBal.accumulatedAmount,
        });
      return;
    }
    if (parseFloat(approvedAmount) > parseFloat(amount)) {
      //return the amount
      res
        .status(200)
        .json({ balance: amount, accumulated: tokenBal.accumulatedAmount });
      return;
    }
    res
      .status(200)
      .json({ balance: amount, accumulated: tokenBal.accumulatedAmount });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
