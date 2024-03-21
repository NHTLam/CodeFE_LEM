import { Suspense } from "react";
import { Info } from "@/components/ComponentsUserPage/Infor";
import { ClassListRecents } from "@/components/ComponentsUserPage/ClassListRecents";
import { ClassList } from "@/components/ComponentsUserPage/ClassList";

const HomePage = async () => {
  return (
    <div className="mb-20 w-full">
      <Info />
      <hr className="mr-4 py-2"></hr>

      <div className="px-2 md:px-4">
        <ClassListRecents />
      </div>

      <div className="mt-5 px-2 md:px-4">
        {/* <Suspense fallback={<ClassList.Skeleton />}> */}
        <ClassList />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default HomePage;
