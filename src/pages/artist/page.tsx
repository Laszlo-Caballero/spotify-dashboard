import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteArtist, getAllArtist } from "../../services/artistService";
import TableProvider from "@/components/provider/TableProvider";
import Load from "@/components/shared/Load/Load";
import { EnvConfig } from "@/config/env";
import { Badge } from "@/components/ui/badge";
import { cx } from "class-variance-authority";
import ModalAlbum from "@/components/modal/modalAlbum";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";

export default function ArtistPage() {
  const { mutate, isPending } = useMutation<unknown, Error, string>({
    mutationFn: deleteArtist,
    onSuccess: () => {
      toast.success("Artist deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete artist");
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["artists", isPending],
    queryFn: getAllArtist,
  });

  return (
    <div className="flex flex-col h-full">
      {(isLoading || isPending) && <Load />}

      <div className="flex justify-between">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Artists
        </h2>
        <Button asChild>
          <Link to="/artist/create">Add Artist</Link>
        </Button>
      </div>

      <TableProvider
        data={data?.data || []}
        columns={[
          {
            header: "Id",
            cell: (props) => {
              return <div>{props.row.original.artistId}</div>;
            },
          },
          {
            header: "Cover",
            cell: (props) => {
              return (
                <img
                  src={`${EnvConfig.api_image}/${props.row.original.file?.fileName}`}
                  className="w-12 h-12 rounded-full"
                />
              );
            },
          },
          {
            header: "Name",
            cell: (props) => {
              return <div>{props.row.original.name}</div>;
            },
          },
          {
            header: "Description",
            cell: (props) => {
              return (
                <div className="max-w-[500px] text-wrap max-h-[70px] overflow-y-scroll">
                  {props.row.original.description}
                </div>
              );
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
            header: "Albums",
            cell: (props) => {
              return <ModalAlbum album={props.row.original.albums} />;
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
                        <Link
                          to={`/artist/edit/${props.row.original.artistId}`}
                        >
                          <MdEdit />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit artist</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          mutate(props.row.original.artistId.toString());
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete artist</TooltipContent>
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
