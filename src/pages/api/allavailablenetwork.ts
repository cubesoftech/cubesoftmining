import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const networks = await prisma.network.findMany({
    where: {
      enable: true,
    },
  });
  res.json(networks);
}
