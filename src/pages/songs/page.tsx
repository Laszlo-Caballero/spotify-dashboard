import PlayButton from "@/components/buttons/PlayButton";
import ModalAlbum from "@/components/modal/modalAlbum";
import TableProvider from "@/components/provider/TableProvider";
import Load from "@/components/shared/Load/Load";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllSongs } from "@/services/songService";
import { useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router";

export default function SongPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getAllSongs,
  });

  return (
    <div className="flex flex-col h-full">
      {isLoading && <Load />}

      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Songs
        </h2>
        <Button asChild>
          <Link to="/song/create">Add Songs</Link>
        </Button>
      </div>

      <TableProvider
        data={data?.data || []}
        columns={[
          {
            accessorKey: "songId",
            header: "Song ID",
          },
          {
            accessorKey: "title",
            header: "Title",
          },
          {
            header: "Albums",
            cell: (props) => {
              return (
                <ModalAlbum album={props.row.original.albums} withOutSongs />
              );
            },
          },
          {
            header: "views",
            accessorKey: "views",
          },
          {
            header: "Song",
            cell(props) {
              return <PlayButton file={props.row.original?.file} />;
            },
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
                        <Link to={`/song/edit/${props.row.original.songId}`}>
                          <MdEdit />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Create song</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          //   mutate(props.row.original.albumId.toString());
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete song</TooltipContent>
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
