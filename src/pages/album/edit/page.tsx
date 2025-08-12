import Load from "@/components/shared/Load/Load";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EnvConfig } from "@/config/env";
import { AlbumSchema, type AlbumType } from "@/schemas/album.schema";
import { getAlbumById, updateAlbum } from "@/services/albumService";
import { getArtistByName } from "@/services/artistService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function EditAlbumPage() {
  const { id } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);
  const [isUpdateImage, setIsUpdateImage] = useState(false);
  const [searchArtist, setSearchArtist] = useState("");
  const form = useForm({
    resolver: zodResolver(AlbumSchema),
  });
  const { data: albumData, isLoading: isLoadingAlbum } = useQuery({
    queryKey: ["album", id],
    queryFn: () => getAlbumById(id),
  });

  useEffect(() => {
    async function loadAlbum() {
      if (albumData) {
        form.setValue("NameAlbum", albumData.data.nameAlbum);
        form.setValue("fileRes", albumData.data.file);
        form.setValue("releaseDate", new Date(albumData.data.releaseDate));
        form.setValue(
          "artists",
          albumData.data.artists.map((artist) => artist.artistId) || []
        );

        if (albumData.data.file) {
          const response = await fetch(
            `${EnvConfig.api_image}/${albumData.data.file.fileName}`
          );
          const blob = await response.blob();
          const file = new File(
            [blob],
            albumData.data.file.fileName || "image.jpg",
            { type: blob.type }
          );

          form.setValue("file", file);
        }
      }
    }
    loadAlbum();
  }, [albumData, form]);

  const { data: artists, isLoading } = useQuery({
    queryKey: ["artists", searchArtist],
    queryFn: () => getArtistByName(searchArtist),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<unknown, Error, AlbumType>({
    mutationFn: (data) => updateAlbum({ id, data, isUpdateImage }),
    onSuccess: () => {
      toast.success("Album updated successfully!");
      navigate("/album");
    },
    onError: () => {
      toast.error("Error updating album");
    },
  });

  const onSubmit = (data: AlbumType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col">
      {(isLoading || isPending || isLoadingAlbum) && <Load />}

      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Update Album
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-4 rounded-2xl"
        >
          <FormField
            control={form.control}
            name="NameAlbum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Album</FormLabel>
                <FormControl>
                  <Input placeholder="Enter album name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cover Album</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 w-full gap-x-4">
                      <Input
                        placeholder="Enter cover album name"
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

                        {field.value ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Cover Album"
                            className="size-32"
                          />
                        ) : (
                          <span className="size-32 text-nowrap">
                            No image selected
                          </span>
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
            name="artists"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-4">
                      <div className="w-full space-y-4">
                        <Label>Search Artist</Label>
                        <Input
                          placeholder="Search artist..."
                          value={searchArtist}
                          onChange={(e) => setSearchArtist(e.target.value)}
                        />
                      </div>

                      <ScrollArea className="h-72 w-full rounded-md border">
                        <div className="p-4 space-y-4">
                          <h4 className="text-sm leading-none font-medium">
                            Artists List
                          </h4>
                          {(artists?.data?.length || 0) > 0 ? (
                            artists?.data.map((value) => {
                              const findArtist = field.value?.find(
                                (id) => id === value.artistId
                              );
                              return (
                                <Card
                                  key={value.artistId}
                                  className={cx(
                                    "cursor-pointer",
                                    findArtist && "bg-sp-green/50"
                                  )}
                                  onClick={() => {
                                    const values = field.value || [];
                                    if (findArtist) {
                                      field.onChange(
                                        values.filter(
                                          (id) => id !== value.artistId
                                        )
                                      );
                                    } else {
                                      field.onChange([
                                        ...values,
                                        value.artistId,
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
                                      {value.name}
                                    </h3>
                                  </CardContent>
                                </Card>
                              );
                            })
                          ) : (
                            <span>No artists found</span>
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

          <Button className="w-full mt-4">Update Album</Button>
        </form>
      </Form>
    </div>
  );
}
