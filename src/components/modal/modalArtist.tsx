import type { Artist } from "@/interfaces/response.type";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { RxCross2 } from "react-icons/rx";
import TableProvider from "../provider/TableProvider";
import { EnvConfig } from "@/config/env";
import { Badge } from "../ui/badge";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";

interface ModalArtistProps {
  artist: Artist[];
}

export default function ModalArtist({ artist }: ModalArtistProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed top-0 w-full h-screen z-50 bg-black/50 p-4 flex items-center justify-center left-0">
        <div className="bg-white w-1/2 p-4 flex flex-col gap-y-4">
          <AlertDialogHeader className="flex flex-row justify-between">
            <AlertDialogTitle className="text-2xl font-bold">
              Albums
            </AlertDialogTitle>
            <AlertDialogCancel>
              <RxCross2 />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <TableProvider
            data={artist}
            columns={[
              {
                header: "id",
                accessorKey: "artistId",
              },
              {
                header: "Cover",
                cell: (props) => {
                  const { file } = props.row.original;
                  const image = file?.fileName || "cover.jpg";

                  return (
                    <img
                      src={`${EnvConfig.api_image}/${image}`}
                      alt={props.row.original.name}
                      className="h-[40px] w-auto"
                    />
                  );
                },
              },
              {
                header: "Name",
                accessorKey: "Name",
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
                cell(props) {
                  return (
                    <Badge>
                      {props.row.original.status ? "Active" : "Inactive"}
                    </Badge>
                  );
                },
              },
            ]}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
