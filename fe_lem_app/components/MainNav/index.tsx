import Image from "next/image";
import Link from "next/link";

const MainNav = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <Image
          src="/images/logo/logo-light.png"
          alt="logo"
          width={119.03}
          height={30}
          className="hidden w-full dark:block"
        />
        <Link
          href="lem/home"
          className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
        >
          Create
        </Link>
        <Link
          href="lem/home"
          className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
        >
          Create
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-x-2">

      </div>
    </nav>
  );
};

export default MainNav;