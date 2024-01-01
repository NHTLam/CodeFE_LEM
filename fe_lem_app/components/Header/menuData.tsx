import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Blog",
    newTab: false,
    path: "/blog",
  },
  {
    id: 2.1,
    title: "Docs",
    newTab: false,
    path: "/docs",
  },
  {
    id: 3,
    title: "Features",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Create Class",
        newTab: false,
        path: "/blog",
      },
      {
        id: 34,
        title: "Join a Class",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 35,
        title: "Create an exam",
        newTab: false,
        path: "/auth/signup",
      },
      {
        id: 35,
        title: "Do an exam",
        newTab: false,
        path: "/docs",
      },
      {
        id: 35.1,
        title: "Create Table",
        newTab: false,
        path: "/support",
      },
      {
        id: 36,
        title: "Join Table",
        newTab: false,
        path: "/error",
      },
    ],
  },

  {
    id: 4,
    title: "Support",
    newTab: false,
    path: "/support",
  },
];

export default menuData;
