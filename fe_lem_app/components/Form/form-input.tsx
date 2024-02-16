"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";

import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
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
  register: UseFormRegister<FieldValues>;
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
  register
}, ref) => {
  // const { pending } = useFormStatus();
  const pending = false;

  return (
    <div>
      <Input    
        {...register("name")}
        required={required}
        id={id}
        placeholder={label}
        type={type}
        disabled={pending || disabled}
        className={`text-sm border w-full h-full`}
      />
      {/* <FormErrors
        id={id}
        errors={errors}
      /> */}
    </div>
  )
});

FormInput.displayName = "FormInput";