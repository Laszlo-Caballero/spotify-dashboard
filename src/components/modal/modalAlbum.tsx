import type { Album } from "@/interfaces/response.type";
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
import ModalSongs from "./modalSongs";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";

interface ModalAlbumProps {
  album: Album[];
}

export default function ModalAlbum({ album }: ModalAlbumProps) {
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
            data={album}
            columns={[
              {
                header: "id",
                accessorKey: "albumId",
              },
              {
                header: "Cover",
                cell: (props) => {
                  const { file } = props.row.original;
                  const image = file?.fileName || "cover.jpg";

                  return (
                    <img
                      src={`${EnvConfig.api_image}/${image}`}
                      alt={props.row.original.NameAlbum}
                      className="h-[40px] w-auto"
                    />
                  );
                },
              },
              {
                header: "Album title",
                accessorKey: "NameAlbum",
              },
              {
                header: "Release Date",
                accessorKey: "releaseDate",
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
              {
                header: "Songs",
                cell(props) {
                  return <ModalSongs songs={props.row.original.songs} />;
                },
              },
            ]}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
