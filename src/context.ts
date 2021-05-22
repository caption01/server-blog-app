import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

export const context = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context => ({
  prisma: prisma,
  req,
  res,
});
