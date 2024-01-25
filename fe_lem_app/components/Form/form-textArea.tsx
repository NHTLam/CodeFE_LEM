"use client";

// import { useFormStatus } from "react-dom";
import { KeyboardEventHandler, forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Textarea } from "@nextui-org/react";

import { FormErrors } from "@/components/Form/form-error";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
  id,
  label,
  placeholder,
  required,
  disabled,
  errors,
  onBlur,
  onClick,
  onKeyDown,
  className,
  defaultValue
}, ref) => {
  //const { pending } = useFormStatus();
  const pending = false;

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full">
        {label ? (
          label
        ) : null}
        <Textarea
          //onKeyDown={onKeyDown}
          onBlur={onBlur}
          onClick={onClick}
          ref={ref}
          required={required}
          placeholder={placeholder}
          name={id}
          id={id}
          disabled={pending || disabled}
          className={cn(
            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
            className
          )}
          aria-describedby={`${id}-error`}
          defaultValue={defaultValue}
        />
      </div>
      <FormErrors
        id={id}
        errors={errors}
      />
    </div>
  )
})

FormTextarea.displayName = "FormTextarea";