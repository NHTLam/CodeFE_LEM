import { Sidebar } from "@/components/SideBar/MainSideBar";
import React from "react";

export default function HomePage(){
  return (
    <>
    <main className="pt-20 md:pt-20 px-4 max-w-6xl 2xl:max-w-screen-xl">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        Something
      </div>
    </main>
    </>
  );
};