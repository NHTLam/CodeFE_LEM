import { UserControl } from "./user-control";

const OrganizationIdLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <UserControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;