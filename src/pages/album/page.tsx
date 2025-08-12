import ModalArtist from "@/components/modal/modalArtist";
import ModalSongs from "@/components/modal/modalSongs";
import TableProvider from "@/components/provider/TableProvider";
import Load from "@/components/shared/Load/Load";
import { Button } from "@/components/ui/button";
import { deleteAlbum, getAllAlbums } from "@/services/albumService";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router";
import { EnvConfig } from "@/config/env";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cx } from "class-variance-authority";

export default function AlbumPage() {
  const { mutate, isPending } = useMutation<unknown, Error, string>({
    mutationFn: (id) => deleteAlbum(id),
    onSuccess: () => {
      toast.success("Album deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting album");
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["albums", isPending],
    queryFn: getAllAlbums,
  });

  return (
    <div className="flex flex-col h-full">
      {isLoading && <Load />}

      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Albums
        </h2>
        <Button asChild>
          <Link to="/album/create">Add Album</Link>
        </Button>
      </div>

      <TableProvider
        data={data?.data || []}
        columns={[
          {
            accessorKey: "albumId",
            header: "ID",
          },
          {
            header: "Cover",
            cell: (props) => {
              const { file } = props.row.original;
              const image = file?.fileName || "cover.jpg";

              return (
                <img
                  src={`${EnvConfig.api_image}/${image}`}
                  alt={props.row.original.nameAlbum}
                  className="h-[40px] w-auto"
                />
              );
            },
          },
          {
            accessorKey: "nameAlbum",
            header: "Title",
          },
          {
            header: "Artist",
            cell(props) {
              return <ModalArtist artist={props.row.original.artists} />;
            },
          },
          {
            header: "Songs",
            cell(props) {
              return <ModalSongs songs={props.row.original.songs} />;
            },
          },
          {
            accessorKey: "releaseDate",
            header: "Release Date",
          },
          {
            header: "Status",
            cell: (props) => {
              return (
                <Badge
                  className={cx(
                    props.row.original.status ? "bg-green-500" : "bg-red-500"
                  )}
                >
                  {props.row.original.status ? "Active" : "Inactive"}
                </Badge>
              );
            },
          },
          {
            header: "Actions",
            cell: (props) => {
              return (
                <div className="flex gap-x-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="secondary" asChild>
                        <Link to={`/album/edit/${props.row.original.albumId}`}>
                          <MdEdit />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Album artist</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          mutate(props.row.original.albumId.toString());
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete album</TooltipContent>
                  </Tooltip>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}
