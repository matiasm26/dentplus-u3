import prisma from "../lib/prisma";

export function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  });
}

export function create(data: { email: string; password: string }) {
  return prisma.user.create({
    data
  });
}