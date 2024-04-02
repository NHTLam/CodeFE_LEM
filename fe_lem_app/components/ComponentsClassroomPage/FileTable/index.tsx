export const FileTable = () => {
  return (
    <div className="flex flex-col">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="w-24 whitespace-nowrap bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">No</td>
                <td className="whitespace-nowrap px-6 py-4">Name</td>
                <td className="whitespace-nowrap px-6 py-4">Description</td>
                <td className="whitespace-nowrap px-6 py-4">Capacity</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4"></td>
                <td className="whitespace-nowrap px-6 py-4"></td>
                <td className="whitespace-nowrap px-6 py-4">No Data</td>
                <td className="whitespace-nowrap px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
