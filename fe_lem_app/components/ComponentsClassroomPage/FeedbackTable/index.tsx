export const FeedBackTable = () => {
  return (
    <div className="flex flex-col">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                  Grade
                </td>
                <td className="whitespace-nowrap px-6 py-4">Nội dung 1</td>
              </tr>
              <tr>
                <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                  Grade on
                </td>
                <td className="whitespace-nowrap px-6 py-4">Nội dung 2</td>
              </tr>
              <tr>
                <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                  Grade by
                </td>
                <td className="whitespace-nowrap px-6 py-4">Nội dung 3</td>
              </tr>
              <tr>
                <td className="w-24 whitespace-nowrap bg-gray-50 px-6 py-4">
                  Feed back
                </td>
                <td className="whitespace-nowrap">
                  <textarea
                    rows={5}
                    className="flex w-full grow rounded-sm border border-stroke px-2 py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
