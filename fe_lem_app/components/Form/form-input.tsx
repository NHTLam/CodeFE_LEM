"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";

import { FormErrors } from "./form-error";
// import { useFormStatus } from "react-dom";

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
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  type,
  placeholder,
  required,
  disabled,
  errors,
  className,
  defaultValue = "",
  onBlur
}, ref) => {
  // const { pending } = useFormStatus();
  const pending = false;

  return (
    <div>
      <Input
        required={required}
        name={id}
        id={id}
        placeholder={label}
        type={type}
        disabled={pending || disabled}
        className={`text-sm border ${cn(className, "w-full focus:border-2")}`}
      />
      {/* <FormErrors
        id={id}
        errors={errors}
      /> */}
    </div>
  )
});

FormInput.displayName = "FormInput";