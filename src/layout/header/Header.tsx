import { NavLink } from "react-router";
import SpotifyIcon from "../../assets/icons/SpotifyIcon";
import { headerData } from "../../data/header";

export default function Header() {
  return (
    <div className="flex w-full bg-sp-black justify-between p-4 items-center">
      <div className="gap-x-4 flex items-center">
        <SpotifyIcon className="text-sp-green w-auto h-[40px]" />

        <h2 className="scroll-m-20 text-3xl text-white font-semibold tracking-tight first:mt-0 ">
          Spotify Dashboard
        </h2>
      </div>

      <div className="flex gap-x-8">
        {headerData.map((item) => (
          <NavLink
            to={item.url}
            className="text-white hover:text-sp-green transition-colors text-lg"
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
