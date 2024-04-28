import { ListPost } from "@/components/ComponentsClassroomPage/ListPost";
import { ListPostPinned } from "@/components/ComponentsClassroomPage/ListPostPinned";
import { NavClassroom } from "@/components/ComponentsClassroomPage/NavClassroom";
import Lines from "@/components/Lines";

const Posts = () => {
  return (
    <>
      <Lines />
      <div className="mt-10 grid grid-flow-col grid-cols-3 gap-4 space-y-4">
        <ListPost />
        <ListPostPinned />
      </div>
    </>
  );
};

export default Posts;
