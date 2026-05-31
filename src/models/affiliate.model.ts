import prisma from "../lib/prisma";

export type MembershipType = "silver" | "gold" | "platinum";

export interface AffiliateInput {
  firstName: string;
  lastName: string;
  email: string;
  membershipType: MembershipType;
}

export function getAll(userId: number) {
  return prisma.affiliate.findMany({
    where: { userId },
    orderBy: { id: "asc" }
  });
}

export function getById(id: number, userId: number) {
  return prisma.affiliate.findFirst({
    where: {
      id,
      userId
    }
  });
}

export function create(data: AffiliateInput & { userId: number }) {
  return prisma.affiliate.create({
    data
  });
}

export function update(
  id: number,
  userId: number,
  data: AffiliateInput
) {
  return prisma.affiliate.updateMany({
    where: {
      id,
      userId
    },
    data
  });
}

export function remove(id: number, userId: number) {
  return prisma.affiliate.deleteMany({
    where: {
      id,
      userId
    }
  });
}

export function calculateDiscount(
  membershipType: MembershipType,
  amount: number
): number {
  let discount = 0;

  if (membershipType === "silver") {
    discount = 0.05;
  }

  if (membershipType === "gold") {
    discount = 0.10;
  }

  if (membershipType === "platinum") {
    discount = 0.20;
  }

  return amount - amount * discount;
}