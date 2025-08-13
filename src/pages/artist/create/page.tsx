import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArtistSchema, type ArtistType } from "@/schemas/artist.schema";
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
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createArtist } from "@/services/artistService";
import { useNavigate } from "react-router";
import Load from "@/components/shared/Load/Load";
import { toast } from "sonner";
export default function CreatePage() {
  const form = useForm({
    resolver: zodResolver(ArtistSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<unknown, Error, ArtistType>({
    mutationFn: (data) => createArtist(data),
    onSuccess: () => {
      toast.success("Artist created successfully");
      navigate("/artist");
    },
    onError: () => {
      toast.error("Failed to create artist");
    },
  });

  const handleSubmit = (data: ArtistType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col">
      {isPending && <Load />}

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Create Artist
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
          <FormField
            control={form.control}
            name="heroFile"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Hero Cover</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 w-full gap-x-4">
                      <Input
                        placeholder="Enter hero cover name"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />

                      <div className="flex flex-col gap-y-4">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Image Preview
                        </h3>

                        {field.value && (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Hero Cover"
                            className="max-h-32 w-44"
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
          <Button className="w-full mt-4">Create Artist</Button>
        </form>
      </Form>
    </div>
  );
}
