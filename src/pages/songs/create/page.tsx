import PlayButton from "@/components/buttons/PlayButton";
import Load from "@/components/shared/Load/Load";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnvConfig } from "@/config/env";
import { SongsSchema, type SongsType } from "@/schemas/song.schema";
import { getAllAlbums } from "@/services/albumService";
import { createSongs } from "@/services/songService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function SongCreate() {
  const form = useForm({
    resolver: zodResolver(SongsSchema),
    defaultValues: {
      songs: [
        {
          title: "",
          albums: [],
          songFile: null as unknown as File,
        },
      ],
    },
  });

  const [searchArtist, setSearchArtist] = useState("");

  const { data: albums, isLoading } = useQuery({
    queryKey: ["artists", searchArtist],
    queryFn: () => getAllAlbums(searchArtist),
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation<unknown, Error, SongsType>({
    mutationFn: (data) => createSongs(data),
    onSuccess: () => {
      toast.success("Songs create");
      navigate("/song");
    },
    onError() {
      toast.error("Error");
    },
  });

  const onSubmit = (data: SongsType) => {
    mutate(data);
  };

  const formValues = form.watch("songs");

  return (
    <div className="flex flex-col">
      {(isLoading || isPending) && <Load />}

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Create Songs
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-4 rounded-2xl"
        >
          <div className="flex justify-between items-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Add Song
            </h3>
            <Button
              type="button"
              onClick={() => {
                form.setValue("songs", [
                  ...formValues,
                  { title: "", albums: [], songFile: null as unknown as File },
                ]);
              }}
            >
              Add
            </Button>
          </div>

          <Tabs defaultValue="0">
            <TabsList>
              {formValues.map((_, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  Song {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {formValues.map((_, index) => {
              return (
                <TabsContent
                  key={index}
                  value={index.toString()}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name={`songs.${index}.title`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter song title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name={`songs.${index}.albums`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Albums</FormLabel>
                          <FormControl>
                            <div className="flex gap-x-4">
                              <div className="w-full space-y-4">
                                <Label>Search Artist</Label>
                                <Input
                                  placeholder="Search artist..."
                                  value={searchArtist}
                                  onChange={(e) =>
                                    setSearchArtist(e.target.value)
                                  }
                                />
                              </div>
                              <ScrollArea className="h-72 w-full rounded-md border">
                                <div className="p-4 space-y-4">
                                  <h4 className="text-sm leading-none font-medium">
                                    albums List
                                  </h4>
                                  {(albums?.data?.length || 0) > 0 ? (
                                    albums?.data.map((value) => {
                                      const findAlbum = field.value?.find(
                                        (id) => id === value.albumId
                                      );
                                      return (
                                        <Card
                                          key={value.albumId}
                                          className={cx(
                                            "cursor-pointer",
                                            findAlbum && "bg-sp-green/50"
                                          )}
                                          onClick={() => {
                                            const values = field.value || [];
                                            if (findAlbum) {
                                              field.onChange(
                                                values.filter(
                                                  (id) => id !== value.albumId
                                                )
                                              );
                                            } else {
                                              field.onChange([
                                                ...values,
                                                value.albumId,
                                              ]);
                                            }
                                          }}
                                        >
                                          <CardContent className="flex items-center gap-x-12">
                                            <img
                                              src={`${EnvConfig.api_image}/${value.file?.fileName}`}
                                              className="w-12 h-12 rounded-full"
                                            />

                                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                              {value.nameAlbum}
                                            </h3>
                                          </CardContent>
                                        </Card>
                                      );
                                    })
                                  ) : (
                                    <span>No albums found</span>
                                  )}
                                </div>
                              </ScrollArea>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`songs.${index}.songFile`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Song File</FormLabel>
                        <FormControl>
                          <div className="flex gap-x-2">
                            <Input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                              className="max-w-[500px]"
                            />
                            <PlayButton
                              otherUrl={
                                field.value
                                  ? URL.createObjectURL(field.value)
                                  : ""
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              );
            })}
          </Tabs>
          <Button className="w-full">Create Song</Button>
        </form>
      </Form>
    </div>
  );
}
