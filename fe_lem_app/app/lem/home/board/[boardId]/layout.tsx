import Navbar from "@/components/ComponentsUserPage/Navbar";

const BoardIdLayout = ({
  children,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default BoardIdLayout;
