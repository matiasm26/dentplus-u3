export type MembershipType = "silver" | "gold" | "platinum";

export interface Affiliate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: MembershipType;
}

let affiliates: Affiliate[] = [
  {
    id: 1,
    firstName: "Ana",
    lastName: "Pérez",
    email: "ana@correo.com",
    membershipType: "silver"
  },
  {
    id: 2,
    firstName: "Carlos",
    lastName: "Muñoz",
    email: "carlos@correo.com",
    membershipType: "gold"
  }
];

let nextId = 3;

export function getAll(): Affiliate[] {
  return affiliates;
}

export function getById(id: number): Affiliate | undefined {
  return affiliates.find((affiliate) => affiliate.id === id);
}

export function create(data: Omit<Affiliate, "id">): Affiliate {
  const newAffiliate: Affiliate = {
    id: nextId++,
    ...data
  };

  affiliates.push(newAffiliate);
  return newAffiliate;
}

export function update(id: number, data: Omit<Affiliate, "id">): Affiliate | undefined {
  const affiliate = getById(id);

  if (!affiliate) {
    return undefined;
  }

  affiliate.firstName = data.firstName;
  affiliate.lastName = data.lastName;
  affiliate.email = data.email;
  affiliate.membershipType = data.membershipType;

  return affiliate;
}

export function remove(id: number): boolean {
  const initialLength = affiliates.length;

  affiliates = affiliates.filter((affiliate) => affiliate.id !== id);

  return affiliates.length < initialLength;
}