"use client";
import { FilterData } from "@/models/filter";
import { ListClassEvent } from "@/services/class-event-service";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const NavClassroom = (params) => {
  const pathname = usePathname();
  const classroomId = Number(params.classroomId);
  if (typeof window !== "undefined") {
    localStorage.setItem("classroomId", classroomId.toString());
  }
  const [classEvents, setClassEvents] = useState<any>();
  const filter: FilterData = {
    skip: 0,
    isClassWork: true,
    classroomId: classroomId,
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await ListClassEvent(filter);
      setClassEvents(data);
    };
    fetchData();
  }, []);

  var dynamicUnUsePath: string[] = [];
  if (classEvents !== null && classEvents !== undefined) {
    classEvents.forEach((e) => {
      const path1 = `/lem/classroom/${classroomId}/class-work/edit-class-work/essay/do/${e.id}`;
      const path2 = `/lem/classroom/${classroomId}/class-work/edit-class-work/essay/detail/${e.id}`;
      const path3 = `/lem/classroom/${classroomId}/class-work/edit-class-work/essay/mark/${e.id}`;
      const path4 = `/lem/classroom/${classroomId}/class-work/edit-class-work/multiple-choice/do/${e.id}`;
      const path5 = `/lem/classroom/${classroomId}/class-work/edit-class-work/activity/do/${e.id}`;
      const path6 = `/lem/classroom/${classroomId}/class-work/edit-class-work/activity/detail/${e.id}`;
      const path7 = `/lem/classroom/${classroomId}/class-work/edit-class-work/activity/mark/${e.id}`;
      dynamicUnUsePath.push(path1);
      dynamicUnUsePath.push(path2);
      dynamicUnUsePath.push(path3);
      dynamicUnUsePath.push(path4);
      dynamicUnUsePath.push(path5);
      dynamicUnUsePath.push(path6);
      dynamicUnUsePath.push(path7);
    });
  }

  const unUsePath = [
    `/lem/classroom/${classroomId}/class-work/edit-class-work/essay/make`,
    `/lem/classroom/${classroomId}/class-work/edit-class-work/multiple-choice/make`,
    `/lem/classroom/${classroomId}/class-work/edit-class-work/activity/make`,
  ];
  unUsePath.push(...dynamicUnUsePath);

  if (unUsePath.some((p) => p === pathname)) {
    return <></>;
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

        {pathname === `/lem/classroom/${classroomId}/setting` ? (
          <li className="-mb-px mr-1">
            <a
              className="inline-block rounded-t border-l border-r border-t bg-white px-4 py-2 font-semibold text-blue-700"
              href={`/lem/classroom/${classroomId}/setting`}
            >
              Setting
            </a>
          </li>
        ) : (
          <li className="mr-1">
            <a
              className="inline-block bg-white px-4 py-2 font-semibold hover:text-blue-800"
              href={`/lem/classroom/${classroomId}/setting`}
            >
              Setting
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
