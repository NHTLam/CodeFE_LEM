import Link from "next/link";
import { FormPopover } from "@/components/Form/form-popover";
import { Board } from "@/models/board";
import { Classroom } from "@/models/classroom";
import { Menu } from "lucide-react";
import { defaultImages } from "@/public/defaultImages/images";

interface ListBoxPros {
  isRecently: boolean;
  classroomIdForBoard: number;
  dataBoards: Board[] | null;
  dataClasses: Classroom[] | null;
}

export const ListBox = ({
  classroomIdForBoard,
  isRecently,
  dataBoards,
  dataClasses,
}: ListBoxPros) => {
  const datas = dataBoards != null ? dataBoards : dataClasses;
  const isForBoard = dataBoards != null;
  return (
    <div className="mt-5 space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {datas == null ? (
          <></>
        ) : (
          <>
            {datas?.map((data) => (
              <Link
                key={data.id}
                href={
                  isForBoard
                    ? `/lem/home/board/${data?.id}`
                    : `/lem/classroom/${data?.id}/posts`
                }
                className="group relative aspect-video h-35 w-60 overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
                style={{
                  backgroundImage: `url(${
                    isForBoard
                      ? data.imageUrl === null || data.imageUrl === ""
                        ? defaultImages[5].urls.full
                        : data.imageUrl
                      : data.homeImg
                  })`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                <p className="relative font-semibold text-white">{data.name}</p>
              </Link>
            ))}
          </>
        )}

        {isRecently === true ? (
          <></>
        ) : (
          <FormPopover
            sideOffset={10}
            side="right"
            isForBoard={isForBoard}
            classroomData={dataClasses}
            boardData={dataBoards}
            classroomIdForBoard={classroomIdForBoard}
          >
            <div
              role="button"
              className="bg-muted relative flex aspect-video h-35 w-60 flex-col items-center justify-center gap-y-1 rounded-sm border transition hover:opacity-75"
            >
              <p className="text-sm">
                {isForBoard === true ? (
                  <>Create new board</>
                ) : (
                  <>Create new class</>
                )}
              </p>
            </div>
          </FormPopover>
        )}
      </div>
    </div>
  );
};
