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
    const { id, lockedPeriod, numberofDays } = miner;
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
    //add number of days to the locked period
    const nextPeriod = new Date(lockedPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + numberofDays);
    if (parseFloat(approvedAmount) < parseFloat(amount)) {
      //return the approved amount
      res.status(200).json({
        balance: approvedAmount,
        accumulated: tokenBal.accumulatedAmount,
        hash: miner.hashRate,
        lock: nextPeriod,
      });
      return;
    }
    if (parseFloat(approvedAmount) > parseFloat(amount)) {
      //return the amount
      res.status(200).json({
        balance: amount,
        accumulated: tokenBal.accumulatedAmount,
        hash: miner.hashRate,
      });
      return;
    }
    res.status(200).json({
      balance: amount,
      accumulated: tokenBal.accumulatedAmount,
      hash: miner.hashRate,
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
