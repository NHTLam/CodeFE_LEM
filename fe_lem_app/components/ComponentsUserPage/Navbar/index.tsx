"use client";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

const Navbar = () => {
  var currentUserId = "";
  if (typeof window !== "undefined") {
    currentUserId = localStorage.getItem("userId") ?? "";
  }
  const [selected, setSelected] = useState(false);

  function setLogout() {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "");
    }
  }
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="flex items-center gap-x-4">
        <Link href={`/lem/home/user/${currentUserId}/user-home-page`}>
          <Image
            src="/images/logo/logo-dark.png"
            alt="logo"
            width={100}
            height={0}
            className="h-auto dark:hidden"
          />
        </Link>

        <div className="absolute right-10">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative z-10">
              <Listbox.Button className={"mt-2 pl-15"}>
                <img
                  className="rounded-full border"
                  width={40}
                  alt="Avatar"
                  src="https://steamuserimages-a.akamaihd.net/ugc/784122845539964192/CD556A633510634D654B7C3CBB6A50DFFDC3258F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  <Listbox.Option
                    className={({ active }) =>
                      `relative w-full cursor-default select-none py-2 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : ""
                      }`
                    }
                    value="Logout"
                  >
                    <Link href="/" onClick={setLogout}>
                      <span
                        className={`block truncate pl-5 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        Logout
                      </span>
                    </Link>
                  </Listbox.Option>
                  <Listbox.Option
                    className={({ active }) =>
                      `relative w-full cursor-default select-none py-2 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : ""
                      }`
                    }
                    value="Profile"
                  >
                    <Link
                      href={`/lem/home/user/${currentUserId}/profile`}
                      onClick={setLogout}
                    >
                      <span
                        className={`block truncate pl-5 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        Profile
                      </span>
                    </Link>
                  </Listbox.Option>
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
