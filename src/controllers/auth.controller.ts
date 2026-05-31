import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import * as UserModel from "../models/user.model";

import {
  loginSchema,
  registerSchema
} from "../schemas/auth.schema";

import { formatZodErrors } from "../lib/parseError";

export function loginForm(req: Request, res: Response) {
  res.render("auth/login");
}

export async function loginAction(
  req: Request,
  res: Response
) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.render("auth/login", {
      errors: formatZodErrors(result.error),
      values: req.body
    });
  }

  const { email, password } = result.data;

  const user = await UserModel.findByEmail(email);

  if (!user) {
    return res.render("auth/login", {
      error: "Credenciales incorrectas",
      values: req.body
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return res.render("auth/login", {
      error: "Credenciales incorrectas",
      values: req.body
    });
  }

  req.session.userId = user.id;

  res.redirect("/affiliates");
}

export function registerForm(
  req: Request,
  res: Response
) {
  res.render("auth/register");
}

export async function registerAction(
  req: Request,
  res: Response
) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.render("auth/register", {
      errors: formatZodErrors(result.error),
      values: req.body
    });
  }

  const { email, password } = result.data;

  const existingUser =
    await UserModel.findByEmail(email);

  if (existingUser) {
    return res.render("auth/register", {
      error: "Este email ya está registrado",
      values: req.body
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    email,
    password: hash
  });

  req.session.userId = user.id;

  res.redirect("/affiliates");
}

export function logout(
  req: Request,
  res: Response
) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}