import type { Song } from "@/interfaces/response.type";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { RxCross2 } from "react-icons/rx";
import TableProvider from "../provider/TableProvider";

interface ModalSongsProps {
  songs: Song[];
}
export default function ModalSongs({ songs }: ModalSongsProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Songs</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed top-0 w-full h-screen z-50 bg-black/50 p-4 flex items-center justify-center left-0">
        <div className="bg-white w-1/2 p-4 flex flex-col gap-y-4">
          <AlertDialogHeader className="flex flex-row justify-between">
            <AlertDialogTitle className="text-2xl font-bold">
              Songs
            </AlertDialogTitle>
            <AlertDialogCancel>
              <RxCross2 />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <TableProvider
            data={songs}
            columns={[
              {
                header: "Id",
                accessorKey: "songId",
              },
            ]}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
