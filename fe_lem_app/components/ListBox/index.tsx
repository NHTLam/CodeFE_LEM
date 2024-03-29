import Link from "next/link";
import { FormPopover } from "@/components/Form/form-popover";
import { Board } from "@/models/board";
import { Classroom } from "@/models/classroom";

interface ListBox {
  isRecently: boolean;
  dataBoards: Board[] | null;
  dataClasses: Classroom[] | null;
}

export const ListBox = async ({
  isRecently,
  dataBoards,
  dataClasses,
}: ListBox) => {
  const datas = dataBoards != null ? dataBoards : dataClasses;
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
                href={`/lem/classroom/posts`}
                className="group relative aspect-video h-35 w-60 overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
                style={{ backgroundImage: `url(${data.imageUrl})` }}
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
          <FormPopover sideOffset={10} side="right">
            <div
              role="button"
              className="bg-muted relative flex aspect-video h-35 w-60 flex-col items-center justify-center gap-y-1 rounded-sm border transition hover:opacity-75"
            >
              <p className="text-sm">Create new class</p>
            </div>
          </FormPopover>
        )}
      </div>
    </div>
  );
};
