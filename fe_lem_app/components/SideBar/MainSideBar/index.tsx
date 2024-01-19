"use client";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@nextui-org/react";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./sideItem";

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
      slug: "a",
      imageUrl: "",
      name: "a",
    },
    {
      id: "2",
      slug: "a",
      imageUrl: "",
      name: "a",
    },
    {
      id: "3",
      slug: "a",
      imageUrl: "",
      name: "a",
    },
    
  ];

  const mappedData = fakeUserMemberships.map((membership) => ({
    organization: membership, // Assuming you want the entire membership as "organization"
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
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">
          Workspaces
        </span>
        <Button
          type="button"
          variant="ghost"
          className="ml-auto"
        >
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
    </>
  );
};