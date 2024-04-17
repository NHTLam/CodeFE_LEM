"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = (params) => {
  const classroomId = Number(params.classroomId);
  if (typeof window !== "undefined") {
    localStorage.setItem("classroomId", classroomId.toString());
  }

  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="flex items-center gap-x-4">
        <Link href="/lem/home/user/user-home-page">
          <Image
            src="/images/logo/logo-dark.png"
            alt="logo"
            width={100}
            height={0}
            className="h-auto dark:hidden"
          />
        </Link>

        {/* <Link
          href=""
          className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
        >
          Create
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
