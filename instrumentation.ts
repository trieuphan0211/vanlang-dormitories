import {
  // removeRoomOfStudentExpired,
  resetPointOfStudents,
} from "./data/student";

export const register = () => {
  console.log("start auto reset point of students");
  console.log("start auto remove student when meetting dealine day");
  setInterval(
    async () => {
      if (new Date().getDate() === 1) {
        await resetPointOfStudents();
        console.log("reset point of students:" + new Date().toISOString());
      }
      // const res = await removeRoomOfStudentExpired();
      console.log(
        `remove student when meetting dealine day:` + new Date().toISOString(),
      );
    },
    1000 * 60 * 60 * 24,
  );
};
