import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { address } = req.body;
    const miner = await prisma.miners.findFirst({
      where: {
        address: address,
      },
    });

    if (!miner) {
      res.status(404).json({ status: false, message: "Miner Not Found" });
      return;
    }
    const withdrawals = await prisma.withdrawals.findMany({
      where: {
        address: address,
      },
      orderBy: {
        date: "desc",
      },
      select: {
        address: true,
        amount: true,
        date: true,
        status: true,
      },
    });
    res.status(200).json({ status: true, withdrawals });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
