import ModalArtist from "@/components/modal/modalArtist";
import ModalSongs from "@/components/modal/modalSongs";
import TableProvider from "@/components/provider/TableProvider";
import Load from "@/components/shared/Load/Load";
import { Button } from "@/components/ui/button";
import { getAllAlbums } from "@/services/albumService";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router";
import { EnvConfig } from "@/config/env";

export default function AlbumPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["albums"],
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
            accessorKey: "NameAlbum",
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
                          // mutate(props.row.original.artistId.toString());
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
