"use client";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
export const NavClassroom = () => {
  const pathname = usePathname();

  return (
    <div className="mx-25 my-5">
      <ul className="flex border-b">
        <div className="mt-1 flex-1 gap-x-4 pl-3">
          <div className="flex">
            <p className="text-xl font-semibold text-blue-700">Class | </p>
            <p className="my-1.5 ml-2 text-xs text-blue-700">Role: Teacher</p>
          </div>
        </div>
        {pathname === "/lem/classroom/posts" ? (
          <li className="-mb-px mr-1">
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/posts"
            >
              Posts
            </a>
          </li>
        ) : (
          <li className="mr-1">
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/posts"
            >
              Posts
            </a>
          </li>
        )}
        {pathname === "/lem/classroom/class-work" ? (
          <li className="-mb-px mr-1">
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/class-work"
            >
              Class Works
            </a>
          </li>
        ) : (
          <li className="mr-1">
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/class-work"
            >
              Class Works
            </a>
          </li>
        )}

        {pathname === "/lem/classroom/groups" ? (
          <li className="-mb-px mr-1">
            {" "}
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/groups"
            >
              Groups
            </a>{" "}
          </li>
        ) : (
          <li className="mr-1">
            {" "}
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/groups"
            >
              Groups
            </a>
          </li>
        )}

        {pathname === "/lem/classroom/people" ? (
          <li className="-mb-px mr-1">
            {" "}
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/people"
            >
              People
            </a>
          </li>
        ) : (
          <li className="mr-1">
            {" "}
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/people"
            >
              People
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
