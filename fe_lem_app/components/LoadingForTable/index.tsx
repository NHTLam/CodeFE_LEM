"use client";

export const LoadingForTable = () => {
  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4"></td>
      <td className="whitespace-nowrap px-6 py-4 pr-30 text-right">
        <div
          className="text-surface inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4"></td>
      <td className="whitespace-nowrap px-6 py-4"></td>
    </tr>
  );
};
