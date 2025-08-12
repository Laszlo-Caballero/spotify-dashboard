import { useQuery } from "@tanstack/react-query";
import { getAllArtist } from "../../services/artistService";
import TableProvider from "@/components/provider/TableProvider";
import Load from "@/components/shared/Load/Load";
import { EnvConfig } from "@/config/env";
import { Badge } from "@/components/ui/badge";
import { cx } from "class-variance-authority";
import ModalAlbum from "@/components/modal/modalAlbum";

export default function ArtistPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artists"],
    queryFn: getAllArtist,
  });

  console.log(data, isLoading, error);

  return (
    <div className="flex flex-col h-full">
      {isLoading && <Load />}

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Artists
      </h2>

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
              return <div>{props.row.original.Name}</div>;
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
        ]}
      />
    </div>
  );
}
