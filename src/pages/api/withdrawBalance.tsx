//api to process withdraw

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

//function that generate random letters
function generateRandomString(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { address, symbol, amount } = req.body;
    const miner = await prisma.miners.findFirst({
      where: {
        address: address,
      },
    });

    if (!miner) {
      res.status(404).json({ status: false, message: "Miner Not Found" });
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
      res.status(404).json({ status: false, message: "Token Not Found" });
      return;
    }
    if (parseFloat(tokenBal.accumulatedAmount) < parseFloat(amount)) {
      res.status(309).json({ status: false, message: "Insufficient Balance" });
      return;
    }

    await prisma.tokenbalance.update({
      where: { id: tokenBal.id },
      data: {
        accumulatedAmount: (
          parseFloat(tokenBal.accumulatedAmount) - parseFloat(amount)
        ).toString(),
      },
    });
    await prisma.miners.update({
      where: { id: id },
      data: {
        lockedPeriod: new Date(),
      },
    });
    await prisma.withdrawals.create({
      data: {
        address,
        amount,
        date: new Date(),
        status: "Pending",
        transactionId: "",
        id: generateRandomString(Math.floor(Math.random() * 10) + 10),
      },
    });
    res.status(200).json({ status: true, message: "Success Withdraw" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
