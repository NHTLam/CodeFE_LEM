import { Menu } from "@/models/menu";
const menuItems: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Manage Posts",
    newTab: false,
    path: "/posts",
  },
  {
    id: 3,
    title: "Manage Users",
    newTab: false,
    path: "/users",
  },
  {
    id: 4,
    title: "Manage Tutorials",
    newTab: false,
    path: "/tutorials",
  },
];

export default menuItems;