"use client";
import { useEffect, useState } from "react";
import { Circle, ClipboardPen, Upload } from "lucide-react";
import Link from "next/link";
import { FeedBackTable } from "@/components/ComponentsClassroomPage/FeedbackTable";
import { FileTable } from "@/components/ComponentsClassroomPage/FileTable";
import { GetClassEvent } from "@/services/classevent-service";
import { FilterData } from "@/models/filter";

interface WorkIdPageProps {
  params: {
    doId: string;
  };
}

const DoEssayPage = ({ params }: WorkIdPageProps) => {

  const [classWork, setClassWork] = useState<any>();
  const [first, setFirst] = useState<any>(true);

  const filter: any = {
    id: parseInt(params.doId),
    code: "",
    name: ""
  };

  useEffect(() => {
    if (first == true) {
      const fetchData = async () => {
        const data = await GetClassEvent(filter);
        setClassWork(data);
      };
      fetchData();
      setFirst(false);
    }
  }, []);

  return (
    <>
      <div className="mx-5">
        <div className="flex items-center justify-between text-2xl font-semibold text-blue-500">
          <div className="flex">
            <ClipboardPen className="mr-2 h-10 w-10" />
            <p>{classWork?.questions[0].name}</p>
          </div>
          <div className="flex">
            <Link href="/lem/classroom/class-work">
              <button className="my-1 mr-10 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none">
                Cancel
              </button>
            </Link>
            <button className="my-1 flex w-30 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
              Submit
            </button>
          </div>
        </div>
        <p className="mx-2 mt-5 font-bold">Description:</p>
        <p className="mx-2">
          {classWork?.questions[0].description}
        </p>
      </div>
      <hr className="mx-7 my-4" />
      <div className="mx-5">
        <p className="mx-2 mt-5 font-bold">Instruction:</p>
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
      <div className="mx-7 my-5 rounded-md">
        <textarea
          rows={20}
          placeholder="Answer"
          className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
        ></textarea>
      </div>
      <div className="mx-8 mb-5">
        <p className="ml-2">Attached file</p>
        <FileTable />
      </div>
      <div className="mb-20">
        <p className="ml-10">FeedBack</p>
        <FeedBackTable />
      </div>
    </>
  );
};
export default DoEssayPage;
