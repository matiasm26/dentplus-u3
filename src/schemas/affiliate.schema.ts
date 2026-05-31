import { z } from "zod";

export const affiliateSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),

  lastName: z.string().min(1, "El apellido es requerido"),

  email: z.string().email("Debe ingresar un email válido"),

  membershipType: z.enum(["silver", "gold", "platinum"], {
    message: "Debe seleccionar un tipo de afiliación"
  })
});

export type AffiliateInput = z.infer<typeof affiliateSchema>;