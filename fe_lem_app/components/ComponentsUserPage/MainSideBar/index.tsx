"use client";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@nextui-org/react";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./sideItem";
import Link from "next/link";
import { Plus } from "lucide-react";

interface SidebarProps {
  storageKey?: string;
};

export const Sidebar = ({
  storageKey = "t-sidebar-state",
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  
  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
  }, []);

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };
  
  const fakeActiveOrganization = {
    id: "1",
    slug: "a",
    imageUrl: "",
    name: "a",
  };
  
  const fakeUserMemberships = [
    {
      id: "1",
      slug: "",
      imageUrl: "",
      name: "Lớp 5A",
    },
    {
      id: "2",
      slug: "",
      imageUrl: "",
      name: "Không gian làm việc của tôi",
    },
    {
      id: "3",
      slug: "",
      imageUrl: "",
      name: "Bảng công việc nhóm",
    },
    
  ];

  const mappedData = fakeUserMemberships.map((membership) => ({
    organization: membership,
  }));
  
  const isLoadedOrg = true;
  const isLoadedOrgList = true;

  // if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  //   return (
  //     <>
  //       <div className="flex items-center justify-between mb-2">
  //         <Skeleton className="h-10 w-[50%]" />
  //         <Skeleton className="h-10 w-10" />
  //       </div>
  //       <div className="space-y-2">
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div>
      <div className="font-medium text-xs flex items-center mb-1" suppressHydrationWarning>
        <span className="pl-4">
          Workspaces
        </span>
        <Button isIconOnly color="danger" aria-label="Like" className="ml-auto pt-2 pb-2 pl-4 pr-4">
          <Link href="">
              <Plus
                className="w-4"
              />
            </Link>
        </Button>  
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {mappedData.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={fakeActiveOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </div>
  );
};