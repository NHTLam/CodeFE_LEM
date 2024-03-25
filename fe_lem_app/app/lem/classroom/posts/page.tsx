import { ListPost } from "@/components/ComponentsClassroomPage/ListPost";
import { ListPostPinned } from "@/components/ComponentsClassroomPage/ListPostPinned";
import { NavClassroom } from "@/components/ComponentsClassroomPage/NavClassroom";

const Posts = () => {
  return (
    <>
      <NavClassroom />
      <div className="grid grid-cols-3 grid-flow-col gap-4 space-y-4 mt-20">
        <ListPost />
        <ListPostPinned />
      </div>

    </>
  );
};

export default Posts;
