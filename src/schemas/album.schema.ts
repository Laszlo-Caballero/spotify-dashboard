import z from "zod";

export const AlbumSchema = z.object({
  NameAlbum: z.string("Name Album is required").min(1, "Name is required"),
  releaseDate: z.date("Release Date is required"),
  artists: z
    .array(z.number("Artist is required"))
    .min(1, "At least one artist is required"),
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
});

export type AlbumType = z.infer<typeof AlbumSchema>;
