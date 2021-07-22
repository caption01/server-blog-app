import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  userData?: User | any;
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
