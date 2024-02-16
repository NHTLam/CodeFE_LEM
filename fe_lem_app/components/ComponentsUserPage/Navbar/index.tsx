import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <Image
          src="/images/logo/logo-dark.png"
          alt="logo"
          width={100}
          height={0}
          className="dark:hidden h-auto"
        />
        {/* <Link
          href=""
          className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
        >
          Create
        </Link> */}
      </div>
      <div className="ml-auto flex items-center gap-x-2">

      </div>
    </nav>
  );
};

export default Navbar;