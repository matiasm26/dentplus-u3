import { Request, Response } from "express";

import {
    getAll,
    getById,
    create
} from "../models/affiliate.model";

export function createForm(req: Request, res: Response) {
  res.render("affiliates/create");
}

export function createAction(req: Request, res: Response) {
  const newAffiliate = create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    membershipType: req.body.membershipType
  });

  res.redirect(`/affiliates/${newAffiliate.id}`);
}

export function index(req: Request, res: Response) {

    const affiliates = getAll();

    res.render("affiliates/index", {
        affiliates
    });
}

export function show(req: Request, res: Response) {

  const id = parseInt(req.params.id as string);

  const affiliate = getById(id);

  if (!affiliate) {
    return res.status(404).send("Afiliado no encontrado");
  }

  res.render("affiliates/show", {
    affiliate
  });
}