import { auth } from "@/auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UserTable } from "@/components/Tables/UserTable";
import { getCountUsers, getFilterUsers } from "@/data/users";
import { USER } from "@/types";
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
    role?: string;
    email?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const role = searchParams?.role?.trim() || "";
  const email = searchParams?.email?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const users = (await getFilterUsers(
    query,
    role,
    email,
    currentPage,
    entries,
  )) as USER[];
  const count = await getCountUsers(query, role, email);
  const session = await auth();
  return (
    <div>
      <Breadcrumb
        pageName="Quản lý người dùng"
        link={[{ name: "Người dùng", link: "/admin/user" }]}
      />
      <UserTable
        users={users}
        count={Number(count)}
        currentUserId={session?.user.id}
      />
    </div>
  );
};

export default UserPage;
