import { EnvConfig } from "@/config/env";
import type { File } from "@/interfaces/response.type";
import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { Badge } from "../ui/badge";

interface PlayButtonProps {
  file?: File;
}

export default function PlayButton(props: PlayButtonProps) {
  const file = props.file;
  const isFile = file?.fileName;
  const refAudio = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      <audio className="hidden" ref={refAudio}>
        <source
          src={`${EnvConfig.api_image}/${file?.fileName}`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      {isFile ? (
        <span className="size-12 flex items-center justify-center rounded-full bg-sp-green">
          {isPlaying ? (
            <FaPause
              onClick={() => {
                refAudio.current?.pause();
                setIsPlaying(false);
              }}
            />
          ) : (
            <FaPlay
              onClick={() => {
                refAudio.current?.play();
                setIsPlaying(true);
              }}
            />
          )}
        </span>
      ) : (
        <Badge className="bg-red-500 text-white">No file available</Badge>
      )}
    </div>
  );
}
