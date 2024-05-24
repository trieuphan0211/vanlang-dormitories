import React from "react";
import { CheckIn } from "./CheckIn";
import { currentUser } from "@/lib/auth";
import { getStudentByEmail } from "@/data/student";
import { STUDENT } from "@/types";

const OutInPage = async () => {
  const user = await currentUser();
  const student = (await getStudentByEmail(user?.email as string)) as STUDENT;
  return (
    <div className="flex h-full items-center justify-center">
      <CheckIn student={student} />
    </div>
  );
};

export default OutInPage;
