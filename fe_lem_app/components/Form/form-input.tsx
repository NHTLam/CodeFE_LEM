"use client";

import { forwardRef } from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  register: UseFormRegister<FieldValues>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      register,
    },
    ref,
  ) => {
    // const { pending } = useFormStatus();
    const pending = false;

    return (
      <div>
        <input
          {...register("name")}
          required={required}
          id={id}
          placeholder={label}
          type={type}
          disabled={pending || disabled}
          className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full grow rounded-sm border-b px-2 py-1.5 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
