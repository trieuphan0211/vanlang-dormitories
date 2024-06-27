"use server";
import { getAllBranchs } from "@/data/branch";
import {
  createRegisterById,
  getFilterRegister,
  getRegisterByBranchDate,
  getRegisterById,
  updateRegister,
} from "@/data/register";
import { getStudentByEmail, updateStudentInRoom } from "@/data/student";
import { sendRegisterEmail } from "@/lib/mail";
import { REGISTER } from "@/types";

export const cancelRegister = async (id: string) => {
  try {
    const res = await updateRegister(id, {
      status: 2,
    });
    if (res === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Register is canceled!" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred!" };
  }
};
export const createRegister = async (data: any) => {
  try {
    console.log(data);
    const res = await createRegisterById({
      roomId: data.roomId,
      registerdeadline: data.year,
      studentEmail: data.email,
    });
    if (res === null) {
      return { error: "An error occurred!" };
    }
    // send email to student

    if (res?.id === undefined) return { error: "An error occurred!" };
    const register = (await getRegisterById(res.id)) as REGISTER;
    const sendMail = await sendRegisterEmail(register);
    if (sendMail === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Register is created!" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred!" };
  }
};
export const createExtensionRegister = async (data: any) => {
  try {
    const res = await createRegisterById({
      roomId: data.roomId,
      registerdeadline: data.year,
      studentEmail: data.email,
      status: 3,
    });
    if (res === null) {
      return { error: "An error occurred!" };
    }
    const student = await getStudentByEmail(data.email);
    if (student?.id === undefined) {
      return { error: "An error occurred!" };
    }
    const updateDateRoom = await updateStudentInRoom(
      student.id,
      data.roomId,
      new Date(data.allowRegister),
    );
    if (updateDateRoom === null) {
      return { error: "An error occurred!" };
    }
    return { success: "Register is created!" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred!" };
  }
};
export const getRegisterByStatus = async (email: string, status: number) => {
  const student = await getFilterRegister(
    "",
    "",
    "",
    0,
    status,
    "",
    1,
    10,
    email,
  );
  return student;
};

export const getRegisterForDashboard = async (
  branchId?: string,
  startDate?: string,
  finishDate?: string,
) => {
  const year = [] as number[];
  const branchs = [] as string[];
  const getBranch = await getAllBranchs();
  const registers = await getRegisterByBranchDate({
    branchId,
    startDate,
    finishDate,
  });
  registers?.map((register) => {
    if (!year.includes(new Date(register.updateDate).getFullYear())) {
      year.push(new Date(register.updateDate).getFullYear());
    }
  });
  registers?.map((register) => {
    if (!branchs.includes(register.Room.Branch.id)) {
      branchs.push(register.Room.Branch.id);
    }
  });
  const result = [] as {
    month: string;
    branch: string;
    status: {
      CREATED: number;
      APPROVED: number;
      CANCEL: number;
      EXTENSION: number;
    };
  }[];
  branchs?.map((branch) => {
    year.map((year) => {
      Array.from({ length: 12 }).map((z, index) => {
        const newRegisters = registers
          ?.filter(
            (register) => new Date(register.updateDate).getFullYear() === year,
          )
          .filter(
            (register) => new Date(register.updateDate).getMonth() === index,
          )
          .filter((register) => register.Room.Branch.id === branch);
        if ((newRegisters?.length || 0) > 0) {
          result.push({
            month: index + 1 + "/" + year,
            branch:
              getBranch?.filter((item) => item.id === branch)[0].name || "",
            status: {
              CREATED:
                newRegisters?.filter((item) => item.status === 0).length || 0,
              APPROVED:
                newRegisters?.filter((item) => item.status === 1).length || 0,
              CANCEL:
                newRegisters?.filter((item) => item.status === 2).length || 0,
              EXTENSION:
                newRegisters?.filter((item) => item.status === 3).length || 0,
            },
          });
        }
      });
    });
  });
  return result;
};
