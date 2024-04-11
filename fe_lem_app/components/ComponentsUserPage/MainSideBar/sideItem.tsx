"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Activity,
  CreditCard,
  Layout,
  Settings,
  LibraryBig,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@nextui-org/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Classroom } from "@/models/classroom";

export type classroom = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  classroom: Classroom;
  onExpand: (id: string) => void;
}

export const NavItem = ({ isExpanded, classroom, onExpand }: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="mr-2 h-4 w-4" />,
      href: `/classroom/${classroom.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="mr-2 h-4 w-4" />,
      href: `/classroom/${classroom.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/classroom/${classroom.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      href: `/classroom/${classroom.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={classroom.id.toString()} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(classroom.id.toString())}
        className={
          "flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-sky-500/10 hover:text-sky-700 hover:no-underline"
        }
      >
        <div className="flex h-9 items-center gap-x-2">
          <div className="relative">
            {/* <Avatar isBordered radius="lg" name='Jane' /> */}
            <LibraryBig />
          </div>
          <span className="text-sm font-medium">{classroom.name}</span>
        </div>
      </AccordionTrigger>
      {rendered && (
        <AccordionContent className="pt-1 text-neutral-700">
          {routes.map((route) => (
            <Button
              key={route.href}
              size="sm"
              //onClick={() => onClick(route.href)}
              className={
                "w-full justify-start pb-3 pl-10 pt-3 font-normal hover:bg-sky-500/10 hover:text-sky-700"
              }
              variant="ghost"
            >
              {route.icon}
              {route.label}
            </Button>
          ))}
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

// NavItem.Skeleton = function SkeletonNavItem() {
//   return (
//     <div className="flex items-center gap-x-2">
//       <div className="w-10 h-10 relative shrink-0">
//         <Skeleton className="h-full w-full absolute" />
//       </div>
//       <Skeleton className="h-10 w-full" />
//     </div>
//   );
// };
