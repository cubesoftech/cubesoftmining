import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const balance = await prisma.siteBalance.findFirst();
  if (balance) {
    res.json(balance);
  } else {
    res.json({ balance: 0 });
  }
}
