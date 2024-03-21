import { Avatar } from "@nextui-org/react";
import {
  Users,
  GraduationCap,
  UserCog,
  UserRoundX,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";

export const ListUser = async () => {
  const users = [
    {
      Id: 1,
      FullName: "John Doe",
      UserName: "john.doe",
      Email: "john.doe@example.com",
      Phone: "123-456-7890",
      Gender: "Male",
      Password: "hashed_password_1", // Replace with hashed password in real applications
      StatusId: 1, // Define status based on your application logic
      AppUserRoleMappings: [
        {
          Id: 1,
          RoleId: 1, // Teacher role ID
          AppUserId: 1,
          Role: {
            Id: 1,
            Name: "Teacher",
          },
        },
      ],
    },
    {
      Id: 2,
      FullName: "Jane Smith",
      UserName: "jane.smith",
      Email: "jane.smith@example.com",
      Phone: "987-654-3210",
      Gender: "Female",
      Password: "hashed_password_2", // Replace with hashed password in real applications
      StatusId: 1, // Define status based on your application logic
      AppUserRoleMappings: [
        {
          Id: 2,
          RoleId: 2, // Student role ID
          AppUserId: 2,
          Role: {
            Id: 2,
            Name: "Student",
          },
        },
      ],
    },
    {
      Id: 3,
      FullName: "Mike Lee",
      UserName: "mike.lee",
      Email: "mike.lee@example.com",
      Phone: "555-123-4567",
      Gender: "Male",
      Password: "hashed_password_3", // Replace with hashed password in real applications
      StatusId: 1, // Define status based on your application logic
      AppUserRoleMappings: [
        {
          Id: 3,
          RoleId: 3, // Class monitor role ID
          AppUserId: 3,
          Role: {
            Id: 3,
            Name: "Class Monitor",
          },
        },
      ],
    },
    {
      Id: 4,
      FullName: "Alice Young",
      UserName: "alice.young",
      Email: "alice.young@example.com",
      Phone: "888-777-6655",
      Gender: "Female",
      Password: "hashed_password_4", // Replace with hashed password in real applications
      StatusId: 1, // Define status based on your application logic
      AppUserRoleMappings: [
        {
          Id: 4,
          RoleId: 2, // Student role ID
          AppUserId: 4,
          Role: {
            Id: 2,
            Name: "Student",
          },
        },
      ],
    },
    {
      Id: 5,
      FullName: "David Kim",
      UserName: "david.kim",
      Email: "david.kim@example.com",
      Phone: "222-333-4444",
      Gender: "Male",
      Password: "hashed_password_5", // Replace with hashed password in real applications
      StatusId: 1, // Define status based on your application logic
      AppUserRoleMappings: [
        {
          Id: 5,
          RoleId: 2, // Student role ID
          AppUserId: 5,
          Role: {
            Id: 2,
            Name: "Student",
          },
        },
      ],
    },
  ];

  const currentUserId = 1;

  const roles = [
    {
      Id: 1,
      Name: "Teacher",
    },
    {
      Id: 2,
      Name: "Student",
    },
    {
      Id: 3,
      Name: "Class Monitor",
    },
  ];
  return (
    <>
      {roles?.map((role) => (
        <>
          <div className="mx-40 flex">
            <div className="flex items-center text-2xl font-semibold text-blue-500">
              {role.Id === 1 ? (
                <GraduationCap className="mr-2 h-10 w-10" />
              ) : (
                <Users className="mr-2 h-10 w-10" />
              )}
              {role.Name}
            </div>
            <button className="absolute right-45 my-1 flex w-40 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
              Add Member
            </button>
          </div>
          <hr className="mx-40 my-2" />
          {users?.map((user) => (
            <>
              {user.AppUserRoleMappings.map((x) => x.RoleId).includes(
                role.Id,
              ) ? (
                <div className="mx-40 my-2 flex items-center gap-x-4 pb-4 pl-3">
                  <div className="relative">
                    <Avatar className="h-[40px] w-[40px]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-semibold">{user.UserName}</p>
                    <div className="text-muted-foreground flex items-center text-xs">
                      Full name: {user.FullName}, Email: {user.Email}, Phone:{" "}
                      {user.Phone}
                    </div>
                  </div>
                  <div className="absolute right-45 flex gap-2">
                    <button className="my-1 flex w-20 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                      <Link href="">
                        <UserCog className="w-full" />
                      </Link>
                    </button>
                    {user.Id === currentUserId ? (
                      <></>
                    ) : (
                      <button className="my-1 flex w-20 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-rose-600 hover:bg-red-200/5 hover:text-red-600 dark:border-transparent dark:bg-red-200 dark:hover:border-rose-600 dark:hover:bg-red-200/5 dark:hover:text-red-600 dark:hover:shadow-none">
                        <Link href="">
                          <UserRoundX className="w-full" />
                        </Link>
                      </button>
                    )}
                    <button className="my-1 flex w-20 justify-center rounded-sm border border-stroke py-1 text-base outline-none transition-all duration-300 hover:border-lime-800 hover:bg-lime-800/5 hover:text-lime-800 dark:border-transparent dark:bg-lime-800 dark:hover:border-lime-800 dark:hover:bg-lime-800/5 dark:hover:text-lime-800 dark:hover:shadow-none">
                      <Link href="">
                        <MessageCircleMore className="w-full" />
                      </Link>
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
        </>
      ))}
    </>
  );
};
