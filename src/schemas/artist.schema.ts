import { z } from "zod";
export const ArtistSchema = z.object({
  Name: z.string("Name is required").min(1, "Name is required"),
  description: z
    .string("Description is required")
    .min(1, "Description is required"),
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    ),
  fileRes: z
    .object({
      fileId: z.number().optional(),
      fileName: z.string().optional(),
    })
    .optional(),
});

export type ArtistType = z.infer<typeof ArtistSchema>;
