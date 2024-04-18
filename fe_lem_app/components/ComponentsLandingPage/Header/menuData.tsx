import { Menu } from "@/models/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/landing-page",
  },
  {
    id: 2,
    title: "Docs",
    newTab: false,
    path: "/landing-page/docs",
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
        path: "/auth/signin",
      },
      {
        id: 34,
        title: "Join a Class",
        newTab: false,
        path: "/auth/signin",
      },
    ],
  },

  {
    id: 4,
    title: "Support",
    newTab: false,
    path: "landing-page/support",
  },
];

export default menuData;
