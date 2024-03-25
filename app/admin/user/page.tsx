import { auth } from "@/auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UserTable } from "@/components/Tables/UserTable";
import { getCountUsers, getFilterUsers } from "@/data/users";
import { USER } from "@/types/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý người dùng",
  description: "",
};
const UserPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const users = (await getFilterUsers(query, currentPage, entries)) as USER[];
  const count = await getCountUsers(query);
  const session = await auth();
  return (
    <div>
      <Breadcrumb pageName="Quản lý người dùng" />
      <UserTable
        users={users}
        count={Number(count)}
        currentUserId={session?.user.id}
      />
    </div>
  );
};

export default UserPage;
