import Load from "@/components/shared/Load/Load";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EnvConfig } from "@/config/env";
import { ArtistSchema, type ArtistType } from "@/schemas/artist.schema";
import { getArtistById, updateArtist } from "@/services/artistService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const [isUpdateImage, setIsUpdateImage] = useState(false);

  const form = useForm({
    resolver: zodResolver(ArtistSchema),
  });

  const navigate = useNavigate();

  const { data: artistData } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtistById(id),
  });

  useEffect(() => {
    async function loadArtist() {
      if (artistData) {
        form.setValue("Name", artistData.data.Name);
        form.setValue("description", artistData.data.description);
        form.setValue("fileRes", artistData.data.file);

        if (artistData.data.file) {
          const response = await fetch(
            `${EnvConfig.api_image}/${artistData.data.file.fileName}`
          );
          const blob = await response.blob();
          const file = new File(
            [blob],
            artistData.data.file.fileName || "image.jpg",
            { type: blob.type }
          );

          form.setValue("file", file);
        }
      }
    }
    loadArtist();
  }, [artistData, form]);

  const { mutate, isPending } = useMutation<unknown, Error, ArtistType>({
    mutationFn: (data) => updateArtist({ id, data, isUpdateImage }),
    onSuccess: () => {
      toast.success("Artist update successfully");
      navigate("/artist");
    },
    onError: () => {
      toast.error("Failed to update artist");
    },
  });

  const handleSubmit = (data: ArtistType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col">
      {isPending && <Load />}

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Update Artist
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 bg-white p-4 rounded-2xl"
        >
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter artist name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter artist description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cover Artist</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 w-full gap-x-4">
                      <Input
                        placeholder="Enter cover artist name"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          setIsUpdateImage(true);
                        }}
                      />

                      <div className="flex flex-col gap-y-4">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Image Preview
                        </h3>

                        {field.value && (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Cover Artist"
                            className="size-32"
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button className="w-full mt-4">Update Artist</Button>
        </form>
      </Form>
    </div>
  );
}
