import SideBarForConservation from "@/components/SideBar/SideBarForConservation";

export default async function UsersLayout({ children }: { children: React. ReactNode;}) {
    return (
        <SideBarForConservation>
            <div className="h-full">
                {children}
            </div>
        </SideBarForConservation>
    );
};

