import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone number must be less than 30 characters" })
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .trim()
    .min(2, { message: "Country must be at least 2 characters" })
    .max(100, { message: "Country must be less than 100 characters" }),
  contactMethod: z.enum(["whatsapp", "phone", "email"]),
  message: z
    .string()
    .trim()
    .max(2000, { message: "Message must be less than 2000 characters" })
    .optional()
    .or(z.literal("")),
  budgetRange: z
    .string()
    .max(50, { message: "Budget range is invalid" })
    .optional()
    .or(z.literal("")),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
