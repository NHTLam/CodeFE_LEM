"use client";
interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const FormSubmit = ({ children, disabled }: FormSubmitProps) => {
  // const [isPending, setIsPending] = useState(false);
  const isPending = false;

  return (
    <button
      disabled={isPending || disabled}
      type="submit"
      color="primary"
      className="my-1 flex w-full justify-center rounded-sm border border-stroke bg-blue-500 py-1 text-base text-white outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
    >
      {children}
    </button>
  );
};
