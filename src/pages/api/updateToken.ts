import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestPrice = await fetch(
    "https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT"
  );
  const { price } = await requestPrice.json();
  const priceUSD = parseFloat(price);
  console.log("priceUSD", priceUSD);
  const balance = await prisma.siteBalance.findFirst();
  if (balance) {
    const { lastUpdate } = balance;
    const now = new Date();
    const diff = (now.getTime() - lastUpdate.getTime()) / (100 * 60);
    //generate random number between 1 and 10
    const random = Math.floor(Math.random() * 10) + 1;
    //multiply the random number by the difference in time in minutes
    const newBalance = balance.balance + (diff * random) / 100;
    const result = await prisma.siteBalance.update({
      where: {
        id: balance.id,
      },
      data: {
        balance: newBalance,
        lastUpdate: now,
        amountUSD: priceUSD * newBalance,
        totalUser: 23432 + random,
      },
    });
    res.json(result);
  } else {
    const result = await prisma.siteBalance.create({
      data: {
        balance: 2352,
        lastUpdate: new Date(),
        amountUSD: priceUSD * 2352,
        totalUser: 23432,
      },
    });
    res.json(result);
  }
}
