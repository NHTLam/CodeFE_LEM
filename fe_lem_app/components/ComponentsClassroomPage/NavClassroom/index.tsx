"use client";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
export const NavClassroom = (params) => {
  const pathname = usePathname();
  const classroomId = Number(params.classroomId);
  if (typeof window !== "undefined") {
    localStorage.setItem("classroomId", classroomId.toString());
  }

  return (
    <div className="mx-25 my-5">
      <ul className="flex border-b">
        <div className="mt-1 flex-1 gap-x-4 pl-3">
          <div className="flex">
            <p className="text-xl font-semibold text-blue-700">Class | </p>
            <p className="my-1.5 ml-2 text-xs text-blue-700">Role: Teacher</p>
          </div>
        </div>
        {pathname === `/lem/classroom/${classroomId}/posts` ? (
          <li className="-mb-px mr-1">
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href={`/lem/classroom/${classroomId}/posts`}
            >
              Posts
            </a>
          </li>
        ) : (
          <li className="mr-1">
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href={`/lem/classroom/${classroomId}/posts`}
            >
              Posts
            </a>
          </li>
        )}
        {pathname === `/lem/classroom/${classroomId}/class-work` ? (
          <li className="-mb-px mr-1">
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href={`/lem/classroom/${classroomId}/class-work`}
            >
              Class Works
            </a>
          </li>
        ) : (
          <li className="mr-1">
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href={`/lem/classroom/${classroomId}/class-work`}
            >
              Class Works
            </a>
          </li>
        )}

        {pathname === `/lem/classroom/${classroomId}/groups` ? (
          <li className="-mb-px mr-1">
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href={`/lem/classroom/${classroomId}/groups`}
            >
              Groups
            </a>
          </li>
        ) : (
          <li className="mr-1">
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href={`/lem/classroom/${classroomId}/groups`}
            >
              Groups
            </a>
          </li>
        )}

        {pathname === `/lem/classroom/${classroomId}/people` ? (
          <li className="-mb-px mr-1">
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href={`/lem/classroom/${classroomId}/people`}
            >
              People
            </a>
          </li>
        ) : (
          <li className="mr-1">
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href={`/lem/classroom/${classroomId}/people`}
            >
              People
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
