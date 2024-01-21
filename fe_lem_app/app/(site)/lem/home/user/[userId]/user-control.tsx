"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const useFakeUserList = () => {
    const [activeUser, setActiveUser] = useState<{ User: string } | null>(null);
  
    return {
      // Simulate loading state (optional)
      loading: false,
      error: null,
  
      setActive: setActiveUser,
    };
};

export const UserControl = () => {
  const params = useParams();
  const { setActive } = useFakeUserList();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      User: params.UserId as string,
    });
  }, [setActive, params.UserId]);
  
  return null;
};