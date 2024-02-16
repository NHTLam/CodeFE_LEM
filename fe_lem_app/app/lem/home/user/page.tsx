import { Suspense } from "react";
import { Info } from "@/components/ComponentsUserPage/Infor";
import { BoardList } from "@/components/ComponentsUserPage/BoardList";

const HomePage = async () => {
  const isPro = true;
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro}/>
      <hr className="py-2"></hr>
      <div className="px-2 md:px-4">
        {/* <Suspense fallback={<BoardList.Skeleton />}> */}
          <BoardList />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default HomePage;