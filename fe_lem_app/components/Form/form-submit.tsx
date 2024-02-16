"use client";

//import { useState, useEffect } from 'react';

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export const FormSubmit = ({
  children,
  disabled,
  className
}: FormSubmitProps) => {
  // const [isPending, setIsPending] = useState(false);
  const isPending = false;

  return (
    <Button
      disabled={isPending || disabled}
      type="submit"
      size="sm"
      color="primary"
      className={cn(className)}
      style={{ 
        marginTop: "10px",
        borderRadius: "0px",
        color: "white",
        padding: "10px"
      }}
    >
      {children}
    </Button>
  );
};