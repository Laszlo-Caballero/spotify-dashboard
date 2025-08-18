import z from "zod";

export const SongSchema = z.object({
  title: z.string().min(2).max(100),
  albums: z
    .array(z.number(), { message: "At least one album is required" })
    .min(1, {
      message: "At least one album is required",
    }),
  songFile: z.instanceof(File, { message: "Song file is required" }),
});

export const SongsSchema = z.object({
  songs: z.array(SongSchema),
});

export type SongType = z.infer<typeof SongSchema>;
export type SongsType = z.infer<typeof SongsSchema>;
