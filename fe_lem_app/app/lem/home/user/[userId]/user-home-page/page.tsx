"use client";
import { Info } from "@/components/ComponentsUserPage/Infor";
import { ClassListRecents } from "@/components/ComponentsUserPage/ClassListRecents";
import { ClassList } from "@/components/ComponentsUserPage/ClassList";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

const HomePage = () => {
  const dataFromChild = (childrenData: string) => {
    setNewSearchKey(childrenData);
  };
  const [newSearchKey, setNewSearchKey] = useState("");

  return (
    <div className="mb-20 w-full">
      <Info parentCallback={dataFromChild} />
      <hr className="mr-4 py-2"></hr>

      <div className="px-2">
        <ClassListRecents searchKey={newSearchKey} />
      </div>

      <div className="mt-5 px-2">
        <ClassList searchKey={newSearchKey} />
      </div>
    </div>
  );
};

export default HomePage;
