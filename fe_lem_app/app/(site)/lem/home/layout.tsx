import MainNav from "@/components/MainNav";

export default function HomeLayout({ children, }: { children: React.ReactNode }) {
    return (
       <>
          <MainNav />
              {children}
       </>
    );
  }