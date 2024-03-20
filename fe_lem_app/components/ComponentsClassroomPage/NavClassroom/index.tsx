"use client";
import { usePathname } from "next/navigation";
export const NavClassroom = () => {
  const pathname = usePathname();

  return (
    <div className="mx-25 my-5">
      <ul className="flex border-b">
        <li className="-mb-px mr-1">
          {pathname === "/lem/classroom/posts" ? (
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/posts"
            >
              Posts
            </a>
          ) : (
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/posts"
            >
              Posts
            </a>
          )}
        </li>
        <li className="mr-1">
          {pathname === "/lem/classroom/class-work" ? (
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/class-work"
            >
              Class Works
            </a>
          ) : (
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/class-work"
            >
              Class Works
            </a>
          )}
        </li>
        <li className="mr-1">
          {pathname === "/lem/classroom/groups" ? (
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/groups"
            >
              Groups
            </a>
          ) : (
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/groups"
            >
              Groups
            </a>
          )}
        </li>
        <li className="mr-1">
          {pathname === "/lem/classroom/people" ? (
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href="/lem/classroom/people"
            >
              People
            </a>
          ) : (
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href="/lem/classroom/people"
            >
              People
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};
