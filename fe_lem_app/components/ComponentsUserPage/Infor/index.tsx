"use client";

import { Home, CreditCard } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface InfoProps {
  isPro: boolean;
};

// Define the fake data function
const useFakeOrganization = () => {
  const [organization, setOrganization] = useState<{
    id: string;
    name: string;
    imageUrl: string;
  } | null>({
    id: "1",
    name: "Lớp 5A",
    imageUrl: "",
  });

  return {
    organization,
    isLoaded: true, // Assuming fake data is always loaded
  };
};

export const Info = ({
  isPro,
}: InfoProps) => {
  const { organization, isLoaded } = useFakeOrganization();

  if (!isLoaded) {
    return (
      <Info.Skeleton />
    );
  }

  return (
    <div className="flex items-center gap-x-4 pb-4 pl-3">
      <div className="relative">
        <Home className="w-[40px] h-[40px]"/>
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">
          {organization?.name}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};