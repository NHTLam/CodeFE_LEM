"use client";
import { useState } from "react";
import { Circle, ClipboardPen, Upload } from "lucide-react";
import { FeedBackTable } from "@/components/ComponentsClassroomPage/FeedbackTable";

const DoMultipleChoicePage = () => {
  return (
    <>
      <div className="mx-5">
        <div className="flex items-center text-2xl font-semibold text-blue-500">
          <ClipboardPen className="mr-2 h-10 w-10" />
          <p>Class work name</p>
        </div>
        <p className="mx-2 mt-5 font-bold">Description:</p>
        <p className="mx-2">
          Dawn broke, dyeing the sky pink. The car rolled away, taking me away
          from the noisy city to the wild mountainous region. Along the road,
          rows of green trees whisper in the wind as if welcoming visitors. The
          terraced fields are softly winding, with silhouettes of people
          diligently cultivating rice. The sound of a gurgling stream echoed
          among the mountains and forests. Each morning ray of sunlight crept
          through the tree canopy, creating shimmering patches of light on the
          ground. The cool breeze gently passed by, dispelling all worries.
        </p>
      </div>
      <hr className="mx-7 my-4" />
      <div className="mx-7 flex justify-between">
        <div className="flex">
          <button className="my-1 mr-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
            View All
          </button>
          <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
            Explain
          </button>
        </div>
        <div className="flex">
          <button className="my-1 mr-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none">
            Cancle
          </button>
          <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
            Submit
          </button>
        </div>
      </div>
      <div className="mx-7 my-5 rounded-md border border-slate-700 px-10 py-10">
        <div className="mb-20 mt-5 border px-2 py-2">
          <div className="grid grid-cols-10">
            <p className="col-span-1">Question 1:</p>
            <p className="col-span-5 justify-start">Content</p>
            <div className="col-span-4 h-40 border">Picture</div>
          </div>
          <div className="mt-5 flex w-full justify-around">
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 1 Answer 1 Answer 1 Answer 1 Answer 1Answer 1</p>
            </div>
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 1 Answer 1 Answer 1 Answer 1 Answer 1Answer 1</p>
            </div>
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 1 Answer 1 Answer 1 Answer 1 Answer 1Answer 1</p>
            </div>
            <div className="flex">
              <Circle className="mr-1 mt-1 h-4 w-4" />
              <p>Answer 1 Answer 1 Answer 1 Answer 1 Answer 1Answer 1</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <FeedBackTable />
      </div>
    </>
  );
};
export default DoMultipleChoicePage;
