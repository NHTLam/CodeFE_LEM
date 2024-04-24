"use client";
import { Info } from "@/components/ComponentsUserPage/Infor";
import { ClassListRecents } from "@/components/ComponentsUserPage/ClassListRecents";
import { ClassList } from "@/components/ComponentsUserPage/ClassList";
import { useEffect, useState } from "react";

const HomePage = () => {
  var searchKey = "";
  const dataFromChild = (childrenData: string) => {
    searchKey = childrenData;
    setNewSearchKey(childrenData);
  };
  const [newSearchKey, setNewSearchKey] = useState(searchKey);

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
