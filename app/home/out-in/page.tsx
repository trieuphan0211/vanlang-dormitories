import { getStudentByEmail } from "@/data/student";
import { currentUser } from "@/lib/auth";
import { Student } from "@prisma/client";
import { CheckIn } from "./CheckIn";

const OutInPage = async () => {
  const user = await currentUser();
  const student = await getStudentByEmail(user?.email as string);
  return (
    <div className="flex h-full items-center justify-center">
      <CheckIn student={student as unknown as Student} />
    </div>
  );
};

export default OutInPage;
