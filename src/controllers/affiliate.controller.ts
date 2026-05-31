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

export function createAction(req: Request, res: Response) {
    const result = affiliateSchema.safeParse(req.body);

    if (!result.success) {
        return res.render("affiliates/create", {
            errors: formatZodErrors(result.error),
            values: req.body
        });
    }

    const newAffiliate = create(result.data);

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

export function editForm(req: Request, res: Response) {

    const id = parseInt(req.params.id as string);

    const affiliate = getById(id);

    if (!affiliate) {
        return res.status(404).send("Afiliado no encontrado");
    }

    res.render("affiliates/edit", {
        affiliate
    });
}

export function editAction(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);

    const affiliate = getById(id);

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

    const updatedAffiliate = update(id, result.data);

    if (!updatedAffiliate) {
        return res.status(404).send("Afiliado no encontrado");
    }

    res.redirect(`/affiliates/${id}`);
}

export function deleteAction(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);

    remove(id);

    res.redirect("/affiliates");
}

export function simulateDiscount(req: Request, res: Response) {

    const id = parseInt(req.params.id as string);

    const affiliate = getById(id);

    if (!affiliate) {
        return res.status(404).send("Afiliado no encontrado");
    }

    const amount = Number(req.body.amount);

    const finalPrice = calculateDiscount(
        affiliate.membershipType,
        amount
    );

    res.render("affiliates/show", {
        affiliate,
        finalPrice,
        amount
    });
}