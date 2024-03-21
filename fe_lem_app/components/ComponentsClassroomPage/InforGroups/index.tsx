export const InforGroups = () => {
  return (
    <div className="mx-30 grid grid-cols-2 gap-4">
      <div className="">
        <p className="font-semibold">Number of groups in class: 0</p>
        <p className="font-semibold">Number of members who participated: 0</p>
        <p className="font-semibold">Members who have not joined: 0</p>
      </div>

      <div className="border-l pl-10">
        <p className="font-semibold">Number of groups in class: 2</p>
        <div className="flex">
          <p className="mt-1 font-semibold">User: </p>
          <button className="ml-5 flex w-30 rounded-sm border border-stroke px-3 py-1 pl-4 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
            Select User
          </button>
        </div>
        <button className="my-1 flex w-full justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
          Auto Fill classmate in to group
        </button>
      </div>
    </div>
  );
};
