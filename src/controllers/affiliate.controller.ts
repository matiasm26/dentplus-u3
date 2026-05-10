import { Request, Response } from "express";

import {
    getAll,
    getById
} from "../models/affiliate.model";

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