import { Suspense } from "react";
import { Info } from "@/components/ComponentsUserPage/Infor";
import { ClassListRecents } from "@/components/ComponentsUserPage/ClassListRecents";
import { ClassList } from "@/components/ComponentsUserPage/ClassList";
import { Classroom } from "@/models/classroom";
import { ListOwn } from "@/services/class-service";

const HomePage = async () => {
  var currentUserId = "";
  if (typeof window !== "undefined") {
    currentUserId = localStorage.getItem("userId") ?? "";
  }

  var classRecents: Classroom[] | null = [];
  var classRoomData: Classroom[] | null = [];
  if (currentUserId !== "") {
    const data = await ListOwn(currentUserId);
    if (data !== null) {
      classRecents = data;
      classRoomData = data;
      classRecents = classRecents.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
      classRecents = classRecents.slice(0, 5);
    }
  }

  console.log("UserId: " + currentUserId);
  console.log("Classroom data: " + classRoomData);
  console.log("Classroom data 2: " + classRecents);

  return (
    <div className="mb-20 w-full">
      <Info />
      <hr className="mr-4 py-2"></hr>

      <div className="px-2 md:px-4">
        <ClassListRecents classRecents={classRecents} />
      </div>

      <div className="mt-5 px-2 md:px-4">
        {/* <Suspense fallback={<ClassList.Skeleton />}> */}
        <ClassList data={classRoomData} />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default HomePage;
