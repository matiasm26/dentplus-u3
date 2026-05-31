import { Request, Response } from "express";
import { affiliateSchema } from "../schemas/affiliate.schema";
import { formatZodErrors } from "../lib/parseError";

import {
  getAll,
  getById,
  create,
  update,
  remove,
  calculateDiscount
} from "../models/affiliate.model";

export function createForm(req: Request, res: Response) {
  res.render("affiliates/create");
}

export async function createAction(req: Request, res: Response) {
  const result = affiliateSchema.safeParse(req.body);

  if (!result.success) {
    return res.render("affiliates/create", {
      errors: formatZodErrors(result.error),
      values: req.body
    });
  }

  const userId = req.session.userId!;

  const newAffiliate = await create({
    ...result.data,
    userId
  });

  res.redirect(`/affiliates/${newAffiliate.id}`);
}

export async function index(req: Request, res: Response) {
  const userId = req.session.userId!;

  const affiliates = await getAll(userId);

  res.render("affiliates/index", {
    affiliates
  });
}

export async function show(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const userId = req.session.userId!;

  const affiliate = await getById(id, userId);

  if (!affiliate) {
    return res.status(404).send("Afiliado no encontrado");
  }

  res.render("affiliates/show", {
    affiliate
  });
}

export async function editForm(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const userId = req.session.userId!;

  const affiliate = await getById(id, userId);

  if (!affiliate) {
    return res.status(404).send("Afiliado no encontrado");
  }

  res.render("affiliates/edit", {
    affiliate
  });
}

export async function editAction(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const userId = req.session.userId!;

  const affiliate = await getById(id, userId);

  if (!affiliate) {
    return res.status(404).send("Afiliado no encontrado");
  }

  const result = affiliateSchema.safeParse(req.body);

  if (!result.success) {
    return res.render("affiliates/edit", {
      affiliate,
      errors: formatZodErrors(result.error),
      values: req.body
    });
  }

  const updatedAffiliate = await update(id, userId, result.data);

  if (updatedAffiliate.count === 0) {
    return res.status(404).send("Afiliado no encontrado");
  }

  res.redirect(`/affiliates/${id}`);
}

export async function deleteAction(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const userId = req.session.userId!;

  await remove(id, userId);

  res.redirect("/affiliates");
}

export async function simulateDiscount(req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const userId = req.session.userId!;

  const affiliate = await getById(id, userId);

  if (!affiliate) {
    return res.status(404).send("Afiliado no encontrado");
  }

  const amount = Number(req.body.amount);

  const finalPrice = calculateDiscount(
    affiliate.membershipType as "silver" | "gold" | "platinum",
    amount
  );

  res.render("affiliates/show", {
    affiliate,
    finalPrice,
    amount
  });
}