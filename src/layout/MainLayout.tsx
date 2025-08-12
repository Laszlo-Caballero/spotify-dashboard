import { type PropsWithChildren } from "react";
import Header from "./header/Header";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 p-4 bg-sp-light-gray">{children}</div>
    </div>
  );
}
