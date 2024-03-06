import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Description is required."),
  description: z.string().min(1).max(65535),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Description is required.")
    .optional(),
  description: z.string().min(1).max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUseId is required.")
    .max(255)
    .optional()
    .nullable(),
});
